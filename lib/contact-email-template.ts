import { siteConfig } from "@/config/site";
import { dictionaries } from "@/lib/i18n/dictionaries";
import {
  DEFAULT_LOCALE,
  isLocale,
  type Locale,
} from "@/lib/i18n/locale";
import { htmlLangAttribute } from "@/lib/i18n/seo-locale";

type ContactEmailTemplateInput = {
  name: string;
  email: string;
  message: string;
  hasAttachment: boolean;
  /** Retrievable Cloudflare R2 URL when an attachment was stored. */
  attachmentUrl?: string | null;
  attachmentKey?: string | null;
};

type ContactConfirmationInput = {
  name: string;
  message: string;
  hasAttachment: boolean;
  /** Display name on the signature */
  ownerName: string;
  /** Public contact address shown to the sender */
  ownerEmail: string;
  /** Portfolio site URL */
  siteUrl: string;
  /** Optional reference for support (e.g. short id) */
  referenceId?: string;
  /** UI locale from the contact form (sender confirmation language). */
  locale?: Locale;
};

function resolveLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

function emailCopy(locale: Locale, key: string): string {
  return dictionaries[locale][key] ?? dictionaries.en[key] ?? key;
}

function fill(template: string, vars: Record<string, string>): string {
  let out = template;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replaceAll(`{${key}}`, value);
  }
  return out;
}

const BRAND = "#55198b";
const BRAND_DARK = "#3d1166";
const INK = "#111827";
const MUTED = "#6b7280";
const BORDER = "#e5e7eb";
const SURFACE = "#f9fafb";
const CANVAS = "#eef0f5";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function emailShell(opts: {
  preheader: string;
  headerTitle: string;
  headerSubtitle: string;
  bodyHtml: string;
  footerExtraHtml?: string;
  locale?: Locale;
}): string {
  const locale = resolveLocale(opts.locale);
  const t = (key: string) => emailCopy(locale, key);
  const site = siteConfig.domain;
  const privacy = `${site}/${locale}/legal/privacy`;
  const terms = `${site}/${locale}/legal/terms`;
  const address = siteConfig.cvPlaceholders.address;
  const year = new Date().getFullYear();
  const role = t("home.role");
  const kindRegards = t("email.shell.kindRegards");
  const secureTitle = t("email.shell.secureTitle");
  const secureBody = fill(t("email.shell.secureBody"), {
    email: siteConfig.email,
  });
  // Split so the mailto link can sit where "{email}" was.
  const secureParts = secureBody.split(siteConfig.email);
  const secureHtml =
    secureParts.length === 2
      ? `${escapeHtml(secureParts[0])}<a href="mailto:${escapeHtml(siteConfig.email)}" style="color:${BRAND}; text-decoration:none;">${escapeHtml(siteConfig.email)}</a>${escapeHtml(secureParts[1])}`
      : escapeHtml(secureBody);

  return `
<!DOCTYPE html>
<html lang="${htmlLangAttribute(locale)}">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(opts.headerTitle)}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0; padding:0; background:${CANVAS}; -webkit-text-size-adjust:100%;">
  <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
    ${escapeHtml(opts.preheader)}
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${CANVAS}; padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px; background:#ffffff; border:1px solid ${BORDER}; border-radius:16px; overflow:hidden;">
          <tr>
            <td style="background:linear-gradient(135deg, ${BRAND_DARK} 0%, ${BRAND} 100%); padding:28px 32px;">
              <p style="margin:0; font-family:Georgia, 'Times New Roman', serif; font-size:22px; line-height:1.2; color:#ffffff; letter-spacing:0.02em;">
                ${escapeHtml(siteConfig.fullName)}
              </p>
              <p style="margin:8px 0 0; font-family:Arial, Helvetica, sans-serif; font-size:13px; color:rgba(255,255,255,0.88);">
                ${escapeHtml(role)} · ${escapeHtml(siteConfig.city)}, ${escapeHtml(siteConfig.country)}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px; font-family:Arial, Helvetica, sans-serif;">
              <h1 style="margin:0 0 6px; font-size:22px; line-height:1.25; color:${INK}; font-weight:700;">
                ${escapeHtml(opts.headerTitle)}
              </h1>
              <p style="margin:0 0 20px; font-size:14px; color:${MUTED}; line-height:1.5;">
                ${escapeHtml(opts.headerSubtitle)}
              </p>
              ${opts.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 28px; font-family:Arial, Helvetica, sans-serif;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-top:1px solid ${BORDER}; padding-top:20px;">
                <tr>
                  <td>
                    <p style="margin:0 0 4px; font-size:14px; color:${INK}; line-height:1.5;">
                      ${escapeHtml(kindRegards)}<br/>
                      <strong>${escapeHtml(siteConfig.fullName)}</strong>
                    </p>
                    <p style="margin:0 0 16px; font-size:13px; color:${MUTED}; line-height:1.6;">
                      ${escapeHtml(role)}<br/>
                      <a href="mailto:${escapeHtml(siteConfig.email)}" style="color:${BRAND}; text-decoration:none;">${escapeHtml(siteConfig.email)}</a><br/>
                      <a href="${escapeHtml(site)}" style="color:${BRAND}; text-decoration:none;">${escapeHtml(site.replace(/^https?:\/\//, ""))}</a>
                    </p>
                    <p style="margin:0;">
                      <a href="${escapeHtml(siteConfig.linkedin)}" style="display:inline-block; margin-right:12px; font-size:12px; color:${BRAND}; text-decoration:none;">LinkedIn</a>
                      <a href="${escapeHtml(siteConfig.github)}" style="display:inline-block; font-size:12px; color:${BRAND}; text-decoration:none;">GitHub</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:${SURFACE}; border-top:1px solid ${BORDER}; padding:20px 32px; font-family:Arial, Helvetica, sans-serif;">
              <p style="margin:0 0 10px; font-size:11px; line-height:1.55; color:${MUTED};">
                <strong style="color:${INK};">${escapeHtml(secureTitle)}</strong>
                ${secureHtml}
              </p>
              <p style="margin:0 0 10px; font-size:11px; line-height:1.55; color:${MUTED};">
                ${escapeHtml(`${t("email.shell.legalIntro")} `)}
                <a href="${escapeHtml(privacy)}" style="color:${BRAND}; text-decoration:none;">${escapeHtml(t("email.shell.privacy"))}</a>
                ${escapeHtml(` ${t("email.shell.legalAnd")} `)}
                <a href="${escapeHtml(terms)}" style="color:${BRAND}; text-decoration:none;">${escapeHtml(t("email.shell.terms"))}</a>${escapeHtml(t("email.shell.legalOutro"))}
              </p>
              ${opts.footerExtraHtml ?? ""}
              <p style="margin:12px 0 0; font-size:11px; line-height:1.5; color:#9ca3af;">
                © ${year} ${escapeHtml(siteConfig.fullName)} · ${escapeHtml(address)} ·
                <a href="${escapeHtml(site)}" style="color:#9ca3af; text-decoration:underline;">${escapeHtml(site.replace(/^https?:\/\//, ""))}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

export function buildContactEmailTemplate(input: ContactEmailTemplateInput): {
  subject: string;
  text: string;
  html: string;
} {
  const safeName = escapeHtml(input.name);
  const safeEmail = escapeHtml(input.email);
  const safeMessage = escapeHtml(input.message).replaceAll("\n", "<br/>");
  const attachmentLabel = input.hasAttachment ? "Yes" : "No";
  const attachmentUrl = input.attachmentUrl?.trim() || null;
  const attachmentKey = input.attachmentKey?.trim() || null;
  const safeAttachmentUrl = attachmentUrl ? escapeHtml(attachmentUrl) : null;
  const safeAttachmentKey = attachmentKey ? escapeHtml(attachmentKey) : null;

  const subject = `New enquiry from ${input.name} · ${siteConfig.fullName}`;
  const text = [
    "New portfolio contact form enquiry",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Attachment: ${attachmentLabel}`,
    ...(attachmentUrl ? [`Attachment URL: ${attachmentUrl}`] : []),
    ...(attachmentKey ? [`R2 key: ${attachmentKey}`] : []),
    "",
    "Message:",
    input.message,
    "",
    "—",
    "Sent via authenticated contact form. Reply to the sender address above.",
  ].join("\n");

  const attachmentHtml = input.hasAttachment
    ? `<p style="margin:0 0 14px; font-size:14px; color:${INK};"><strong>Attachment:</strong> ${attachmentLabel}${
        safeAttachmentUrl
          ? `<br/><a href="${safeAttachmentUrl}" style="color:${BRAND}; text-decoration:none; word-break:break-all;">Open secure download</a>`
          : ""
      }${
        safeAttachmentKey
          ? `<br/><span style="color:${MUTED}; font-size:12px;">Storage key: ${safeAttachmentKey}</span>`
          : ""
      }</p>`
    : `<p style="margin:0 0 14px; font-size:14px; color:${INK};"><strong>Attachment:</strong> ${attachmentLabel}</p>`;

  const bodyHtml = `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 18px; background:${SURFACE}; border:1px solid ${BORDER}; border-radius:10px;">
      <tr>
        <td style="padding:16px 18px;">
          <p style="margin:0 0 8px; font-size:14px; color:${INK};"><strong>Name:</strong> ${safeName}</p>
          <p style="margin:0 0 8px; font-size:14px; color:${INK};"><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:${BRAND}; text-decoration:none;">${safeEmail}</a></p>
          ${attachmentHtml}
        </td>
      </tr>
    </table>
    <div style="border:1px solid ${BORDER}; border-radius:10px; padding:16px 18px; background:#ffffff;">
      <p style="margin:0 0 8px; font-size:11px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; color:${MUTED};">Message</p>
      <p style="margin:0; font-size:14px; line-height:1.6; color:#374151;">${safeMessage}</p>
    </div>`;

  const html = emailShell({
    preheader: `New enquiry from ${input.name}`,
    headerTitle: "New portfolio enquiry",
    headerSubtitle: "A visitor submitted the contact form on your site.",
    bodyHtml,
  });

  return { subject, text, html };
}

/** Auto-reply confirmation sent to the person who submitted the contact form. */
export function buildContactConfirmationTemplate(
  input: ContactConfirmationInput,
): {
  subject: string;
  text: string;
  html: string;
} {
  const locale = resolveLocale(input.locale);
  const t = (key: string) => emailCopy(locale, key);
  const firstName =
    input.name.trim().split(/\s+/)[0] || input.name.trim() || "there";
  const safeOwnerEmail = escapeHtml(input.ownerEmail);
  const safeSite = escapeHtml(input.siteUrl);
  const safeSiteHost = escapeHtml(input.siteUrl.replace(/^https?:\/\//, ""));
  const safeMessage = escapeHtml(input.message).replaceAll("\n", "<br/>");
  const reference =
    input.referenceId?.trim() ||
    `CF-${Date.now().toString(36).toUpperCase()}`;
  const safeRef = escapeHtml(reference);
  const attachmentNote = input.hasAttachment
    ? t("email.confirm.attachmentNote")
    : "";
  const vars = {
    firstName,
    ownerName: input.ownerName,
    site: input.siteUrl,
    email: input.ownerEmail,
    ref: reference,
  };

  const subject = fill(t("email.confirm.subject"), vars);
  const role = t("home.role");
  const text = [
    fill(t("email.confirm.hello"), vars),
    "",
    fill(t("email.confirm.textThankYou"), vars) + attachmentNote,
    "",
    t("email.confirm.textNext"),
    "",
    `${t("email.confirm.referenceLabel")} ${reference}`,
    "",
    t("email.confirm.forYourRecords"),
    "",
    input.message,
    "",
    fill(t("email.confirm.textAddAnything"), vars),
    "",
    t("email.shell.kindRegards"),
    input.ownerName,
    role,
    input.ownerEmail,
    input.siteUrl,
    "",
    t("email.confirm.securityHeader"),
    fill(t("email.shell.secureBody"), { email: input.ownerEmail }),
    `Privacy: ${input.siteUrl}/${locale}/legal/privacy`,
    `Terms: ${input.siteUrl}/${locale}/legal/terms`,
  ].join("\n");

  const thankYouParts = t("email.confirm.thankYou").split("{site}");
  const thankYouWithLink = `${escapeHtml(thankYouParts[0] ?? "")}<a href="${safeSite}" style="color:${BRAND}; text-decoration:none;">${safeSiteHost}</a>${escapeHtml(thankYouParts.slice(1).join("{site}"))}`;

  const addAnythingParts = t("email.confirm.addAnything").split("{email}");
  const addAnythingHtml = `${escapeHtml(addAnythingParts[0] ?? "")}<a href="mailto:${safeOwnerEmail}" style="color:${BRAND}; text-decoration:none;">${safeOwnerEmail}</a>${escapeHtml(addAnythingParts.slice(1).join("{email}"))}`;

  const bodyHtml = `
    <p style="margin:0 0 14px; font-size:15px; line-height:1.6; color:${INK};">${escapeHtml(fill(t("email.confirm.hello"), vars))}</p>
    <p style="margin:0 0 14px; font-size:15px; line-height:1.6; color:${INK};">
      ${thankYouWithLink}${escapeHtml(attachmentNote)}
    </p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:0 0 18px; background:#f5f3ff; border:1px solid #ddd6fe; border-radius:10px;">
      <tr>
        <td style="padding:14px 16px;">
          <p style="margin:0; font-size:13px; line-height:1.55; color:${INK};">
            <strong>${escapeHtml(t("email.confirm.nextTitle"))}</strong><br/>
            ${escapeHtml(t("email.confirm.nextBody"))}
          </p>
        </td>
      </tr>
    </table>
    <div style="border:1px solid ${BORDER}; border-radius:10px; padding:16px 18px; background:${SURFACE}; margin:0 0 16px;">
      <p style="margin:0 0 8px; font-size:11px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; color:${MUTED};">${escapeHtml(t("email.confirm.yourMessage"))}</p>
      <p style="margin:0; font-size:14px; line-height:1.6; color:#374151;">${safeMessage}</p>
    </div>
    <p style="margin:0 0 8px; font-size:13px; line-height:1.55; color:${MUTED};">
      ${escapeHtml(t("email.confirm.referenceLabel"))} <span style="color:${INK}; font-family:ui-monospace, Menlo, Consolas, monospace;">${safeRef}</span>
    </p>
    <p style="margin:0; font-size:14px; line-height:1.6; color:${INK};">
      ${addAnythingHtml}
    </p>`;

  const footerExtraHtml = `
    <p style="margin:0; font-size:11px; line-height:1.55; color:${MUTED};">
      ${escapeHtml(fill(t("email.confirm.footerRef"), vars))}
    </p>`;

  const html = emailShell({
    locale,
    preheader: fill(t("email.confirm.preheader"), vars),
    headerTitle: t("email.confirm.headerTitle"),
    headerSubtitle: t("email.confirm.headerSubtitle"),
    bodyHtml,
    footerExtraHtml,
  });

  return { subject, text, html };
}
