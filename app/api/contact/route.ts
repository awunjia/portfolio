import { randomUUID } from "node:crypto";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { z } from "zod";
import { buildContactEmailTemplate, buildContactConfirmationTemplate } from "@/lib/contact-email-template";
import {
  contactR2ObjectKey,
  isContactR2Configured,
  uploadContactAttachmentToR2,
} from "@/lib/contact-r2";
import { siteConfig } from "@/config/site";
import { isLocale, type Locale } from "@/lib/i18n/locale";
import { verifyTurnstileToken } from "@/lib/verify-turnstile";

export const runtime = "nodejs";

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;

const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const ALLOWED_EXT = new Set([
  "pdf",
  "png",
  "jpg",
  "jpeg",
  "webp",
  "txt",
  "doc",
  "docx",
]);

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5000),
});

function safeOriginalFilename(name: string): string {
  const base = name
    .replace(/^.*[/\\]/, "")
    .replace(/[^\w.\-()+@ ]/g, "_")
    .slice(0, 200);
  return base.length > 0 ? base : "attachment";
}

function extensionOk(filename: string): boolean {
  const ext = filename.split(".").pop()?.toLowerCase();
  return ext !== undefined && ALLOWED_EXT.has(ext);
}

function mimeOk(file: File): boolean {
  if (file.type && ALLOWED_MIME.has(file.type)) {
    return true;
  }
  if (
    (!file.type || file.type === "application/octet-stream") &&
    extensionOk(file.name)
  ) {
    return true;
  }
  return false;
}

function clientIp(request: Request): string | undefined {
  const xf = request.headers.get("x-forwarded-for");
  if (xf) {
    return xf.split(",")[0]?.trim();
  }
  return request.headers.get("x-real-ip") ?? undefined;
}

function smtpPort(): number {
  const raw = process.env.SMTP_PORT?.trim();
  const port = raw ? Number(raw) : 587;
  return Number.isFinite(port) ? port : 587;
}

function smtpSecureFromEnv(): boolean {
  return process.env.SMTP_SECURE?.trim().toLowerCase() === "true";
}

/**
 * Port 465 expects implicit TLS (`secure: true`). Ports 587 / 2525 expect plain
 * connect then STARTTLS (`secure: false`) - using `secure: true` there causes
 * OpenSSL "wrong version number" because the server speaks plain SMTP first.
 */
function smtpTlsMode(port: number): { secure: boolean; requireTLS: boolean } {
  if (port === 465) {
    return { secure: true, requireTLS: false };
  }
  if (port === 587 || port === 2525) {
    return { secure: false, requireTLS: true };
  }
  const envSecure = smtpSecureFromEnv();
  return { secure: envSecure, requireTLS: !envSecure };
}

function smtpDebugResponses(): boolean {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.CONTACT_SMTP_DEBUG?.trim() === "1"
  );
}

function smtpHintFromError(err: unknown): string {
  const message =
    err instanceof Error ? err.message : typeof err === "string" ? err : "";
  const code =
    err && typeof err === "object" && "code" in err
      ? String((err as { code: unknown }).code)
      : "";

  if (/EAUTH|Invalid login|535|authentication failed/i.test(message) || code === "EAUTH") {
    return "SMTP login failed - check SMTP_USER and SMTP_PASS. For Gmail, use an app password and ensure CONTACT_FROM_EMAIL matches the sending account (or an allowed alias).";
  }
  if (
    /ECONNREFUSED|ETIMEDOUT|ENOTFOUND|getaddrinfo/i.test(message) ||
    ["ECONNREFUSED", "ETIMEDOUT", "ENOTFOUND"].includes(code)
  ) {
    return "Could not reach the SMTP host - check SMTP_HOST and SMTP_PORT, and that outbound mail is allowed from this server.";
  }
  if (/wrong version number|tls_validate_record_header/i.test(message)) {
    return "TLS mode does not match the port - use SMTP_PORT=587 with SMTP_SECURE=false (STARTTLS), or SMTP_PORT=465 with SMTP_SECURE=true (implicit TLS). This server picks safe defaults from SMTP_PORT for 465, 587, and 2525.";
  }
  if (/certificate has expired/i.test(message)) {
    return "The SMTP server's TLS certificate has expired (host-side). Switch to another SMTP provider, renew the cert, or for local/dev only set SMTP_TLS_REJECT_UNAUTHORIZED=false.";
  }
  if (/certificate|CERT|SSL|TLS|self signed/i.test(message)) {
    return "TLS or certificate issue - try SMTP_PORT=587 with SMTP_SECURE=false, or fix the host certificate chain. For local/dev against a broken cert, set SMTP_TLS_REJECT_UNAUTHORIZED=false.";
  }
  if (/spam|blocked|550|553|554/i.test(message)) {
    return "The SMTP server rejected the message - check CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL, and your provider's sending rules.";
  }
  return "Check SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_FROM_EMAIL, and CONTACT_TO_EMAIL in your environment.";
}

function smtpRejectUnauthorized(): boolean {
  // Default: verify TLS certs. Set SMTP_TLS_REJECT_UNAUTHORIZED=false only for
  // local/dev against a provider with a broken or expired certificate.
  return process.env.SMTP_TLS_REJECT_UNAUTHORIZED?.trim().toLowerCase() !== "false";
}

function smtpTransportOptions() {
  const host = process.env.SMTP_HOST?.trim() ?? "";
  const port = smtpPort();
  const { secure, requireTLS } = smtpTlsMode(port);
  const envWantsSecure = smtpSecureFromEnv();
  if (
    envWantsSecure !== secure &&
    (port === 465 || port === 587 || port === 2525)
  ) {
    console.warn(
      `[api/contact] SMTP: ignoring SMTP_SECURE=${envWantsSecure} for port ${port} - using secure=${secure} (implicit TLS on 465 only, STARTTLS on 587/2525).`,
    );
  }
  const rejectUnauthorized = smtpRejectUnauthorized();
  if (!rejectUnauthorized) {
    console.warn(
      "[api/contact] SMTP: TLS certificate verification is disabled (SMTP_TLS_REJECT_UNAUTHORIZED=false). Do not use this in production.",
    );
  }
  return {
    host,
    port,
    secure,
    requireTLS,
    auth: {
      user: process.env.SMTP_USER?.trim(),
      pass: process.env.SMTP_PASS?.trim(),
    },
    tls: {
      rejectUnauthorized,
      // mailhog.site and some relays present a cert for a different hostname
      servername: host || undefined,
    },
  };
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "That form payload looks a little too large or malformed." },
      { status: 400 },
    );
  }

  const turnstileSecret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY?.trim();
  if (turnstileSecret) {
    const token = formData.get("cf-turnstile-response");
    if (typeof token !== "string" || !token) {
      return NextResponse.json(
        { error: "Please complete the security check and try again." },
        { status: 400 },
      );
    }
    const ok = await verifyTurnstileToken(token, clientIp(request));
    if (!ok) {
      return NextResponse.json(
        { error: "The security check did not pass - give it another try." },
        { status: 403 },
      );
    }
  }

  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => ({
      path: i.path.join("."),
      message: i.message,
    }));
    return NextResponse.json(
      { error: "Validation failed.", issues },
      { status: 422 },
    );
  }

  const file = formData.get("attachment");
  let attachmentBuffer: Buffer | null = null;
  let attachmentName: string | null = null;
  let attachmentUrl: string | null = null;
  let attachmentKey: string | null = null;

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json(
        { error: `Attachment must be ${MAX_ATTACHMENT_BYTES / (1024 * 1024)} MB or smaller.` },
        { status: 422 },
      );
    }
    if (!mimeOk(file)) {
      return NextResponse.json(
        {
          error:
            "That file type is not supported here - PDF, Word, images, or plain text work best.",
        },
        { status: 422 },
      );
    }

    if (!isContactR2Configured()) {
      return NextResponse.json(
        {
          error:
            "File uploads are not configured yet - send without an attachment, or try again later.",
        },
        { status: 500 },
      );
    }

    const original = safeOriginalFilename(file.name);
    const stored = `${randomUUID()}-${original}`;
    const key = contactR2ObjectKey(stored);

    try {
      attachmentBuffer = Buffer.from(await file.arrayBuffer());
      attachmentName = original;
      const uploaded = await uploadContactAttachmentToR2({
        key,
        body: attachmentBuffer,
        contentType: file.type || "application/octet-stream",
        originalFilename: original,
      });
      attachmentUrl = uploaded.url;
      attachmentKey = uploaded.key;
    } catch (err) {
      console.error("[api/contact] Cloudflare R2 upload failed:", err);
      return NextResponse.json(
        {
          error:
            "I could not save the attachment to storage - you can try again without a file if that helps.",
        },
        { status: 500 },
      );
    }
  }

  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  const contactTo = process.env.CONTACT_TO_EMAIL?.trim();
  const contactFrom =
    process.env.CONTACT_FROM_EMAIL?.trim() ??
    (smtpUser && smtpUser.includes("@") ? smtpUser : undefined);

  if (!smtpHost || !smtpUser || !smtpPass || !contactTo || !contactFrom) {
    return NextResponse.json(
      { error: "Email is not wired up on this server yet - please try again later." },
      { status: 500 },
    );
  }

  const template = buildContactEmailTemplate({
    name: parsed.data.name,
    email: parsed.data.email,
    message: parsed.data.message,
    hasAttachment: Boolean(attachmentBuffer && attachmentName),
    attachmentUrl,
    attachmentKey,
  });

  const formLocaleRaw = String(formData.get("locale") ?? "");
  const formLocale: Locale = isLocale(formLocaleRaw) ? formLocaleRaw : "en";

  const confirmation = buildContactConfirmationTemplate({
    name: parsed.data.name,
    message: parsed.data.message,
    hasAttachment: Boolean(attachmentBuffer && attachmentName),
    ownerName: siteConfig.fullName,
    ownerEmail: siteConfig.email,
    siteUrl: siteConfig.domain,
    referenceId: `CF-${randomUUID().slice(0, 8).toUpperCase()}`,
    locale: formLocale,
  });

  const transporter = nodemailer.createTransport(smtpTransportOptions());

  try {
    // 1) Notify inbox (contact@ / CONTACT_TO_EMAIL)
    await transporter.sendMail({
      from: contactFrom,
      to: contactTo,
      replyTo: parsed.data.email,
      subject: template.subject,
      text: template.text,
      html: template.html,
      attachments:
        attachmentBuffer && attachmentName
          ? [
              {
                filename: attachmentName,
                content: attachmentBuffer,
              },
            ]
          : undefined,
    });
  } catch (err) {
    console.error("[api/contact] SMTP sendMail failed:", err);
    const hint = smtpHintFromError(err);
    const debug = smtpDebugResponses()
      ? err instanceof Error
        ? err.message.slice(0, 400)
        : String(err).slice(0, 400)
      : undefined;
    return NextResponse.json(
      {
        error:
          "Your note did not send by email - nothing on your side, please try again shortly.",
        hint,
        ...(debug ? { debug } : {}),
      },
      { status: 502 },
    );
  }

  try {
    // 2) Confirmation to the sender (read-receipt style)
    await transporter.sendMail({
      from: `"${siteConfig.fullName}" <${contactFrom}>`,
      to: parsed.data.email,
      replyTo: contactFrom,
      subject: confirmation.subject,
      text: confirmation.text,
      html: confirmation.html,
    });
  } catch (err) {
    // Owner mail already succeeded - do not fail the submission.
    console.error("[api/contact] Confirmation email to sender failed:", err);
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
