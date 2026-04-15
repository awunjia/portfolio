"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { HiOutlineArrowPath, HiOutlinePaperAirplane } from "react-icons/hi2";
import { useI18n } from "@/components/providers/i18n-provider";

type FormState = "idle" | "submitting" | "success" | "error";

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
const ACCEPT_ATTR =
  ".pdf,.png,.jpg,.jpeg,.webp,.txt,.doc,.docx,application/pdf,image/*";

const turnstileSiteKey =
  process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ?? "";

/** Must be referentially stable — inline `{ appendTo: "body" }` re-runs inject logic every render and can break Turnstile (cf. Next.js + explicit render issues). */
const TURNSTILE_SCRIPT_OPTIONS = { appendTo: "body" as const };

export function ContactForm() {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileIssue, setTurnstileIssue] = useState<string | null>(null);
  const [fileLabel, setFileLabel] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const turnstileOptions = useMemo(
    () =>
      ({
        theme: "auto",
        size: "flexible",
      }) as const,
    [],
  );

  const requireTurnstile = Boolean(turnstileSiteKey);
  const canSubmit =
    !requireTurnstile || (turnstileToken !== null && turnstileToken.length > 0);

  const onTurnstileSuccess = useCallback((token: string) => {
    setTurnstileIssue(null);
    setTurnstileToken(token);
  }, []);

  const onTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const onTurnstileError = useCallback(
    (code: string) => {
      setTurnstileToken(null);
      // Defer updates so we do not re-render synchronously inside Turnstile's error path (avoids bad re-entrancy with the widget).
      queueMicrotask(() => {
        setTurnstileIssue(t("form.turnstileError").replace("{code}", String(code)));
      });
    },
    [t],
  );

  const retryTurnstile = useCallback(() => {
    setTurnstileIssue(null);
    turnstileRef.current?.reset();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    if (requireTurnstile && !turnstileToken) {
      setErrorMessage(t("form.security"));
      setState("error");
      return;
    }

    setState("submitting");
    const form = e.currentTarget;
    const fileInput = form.querySelector<HTMLInputElement>("#attachment");
    const file = fileInput?.files?.[0];

    if (file && file.size > MAX_ATTACHMENT_BYTES) {
      setErrorMessage(
        t("form.fileTooLarge").replace(
          "{size}",
          String(MAX_ATTACHMENT_BYTES / (1024 * 1024)),
        ),
      );
      setState("error");
      return;
    }

    const data = new FormData(form);
    if (turnstileToken) {
      data.set("cf-turnstile-response", turnstileToken);
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });
      const body = (await res.json().catch(() => ({}))) as {
        error?: string;
        hint?: string;
        debug?: string;
        issues?: { path: string; message: string }[];
      };

      if (!res.ok) {
        if (body.issues?.length) {
          setErrorMessage(body.issues.map((i) => i.message).join(" "));
        } else {
          const parts = [
            body.error ?? t("form.genericError"),
            body.hint,
            body.debug ? `${t("form.errorDetailsPrefix")} ${body.debug}` : undefined,
          ].filter(Boolean);
          setErrorMessage(parts.join(" "));
        }
        setState("error");
        turnstileRef.current?.reset();
        setTurnstileToken(null);
        return;
      }

      form.reset();
      setFileLabel(null);
      setState("success");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } catch {
      setErrorMessage(t("form.networkError"));
      setState("error");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xl space-y-5"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      encType="multipart/form-data"
    >
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          {t("form.name")}{" "}
          <span className="text-accent" aria-hidden>
            *
          </span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={120}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
          aria-describedby="contact-hint"
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          {t("form.email")}{" "}
          <span className="text-accent" aria-hidden>
            *
          </span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
          aria-describedby="contact-hint"
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          {t("form.message")}{" "}
          <span className="text-accent" aria-hidden>
            *
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
          aria-describedby="contact-hint"
          aria-required="true"
        />
      </div>
      <div>
        <label htmlFor="attachment" className="mb-1.5 block text-sm font-medium">
          {t("form.attachment")}
        </label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          accept={ACCEPT_ATTR}
          className="block w-full cursor-pointer text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-2 file:text-sm file:font-medium file:text-accent-foreground hover:file:bg-accent-hover"
          onChange={(ev) => {
            const f = ev.target.files?.[0];
            setFileLabel(f ? f.name : null);
          }}
        />
        <p className="mt-1 text-xs text-muted">
          {t("form.attachmentHelp").replace(
            "{size}",
            String(MAX_ATTACHMENT_BYTES / (1024 * 1024)),
          )}
          {fileLabel ? (
            <span className="mt-0.5 block break-all text-foreground">
              {t("form.selectedFile").replace("{name}", fileLabel)}
            </span>
          ) : null}
        </p>
      </div>

      {turnstileSiteKey ? (
        <div className="flex min-w-0 max-w-full flex-col gap-2 sm:items-start">
          {turnstileIssue ? (
            <div className="space-y-2">
              <p
                role="status"
                className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-950 dark:text-amber-100"
              >
                {turnstileIssue}
              </p>
              <button
                type="button"
                onClick={retryTurnstile}
                className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <HiOutlineArrowPath className="size-4 shrink-0" aria-hidden />
                {t("form.turnstileRetry")}
              </button>
            </div>
          ) : null}
          <div className="flex min-h-[65px] min-w-[300px] w-full max-w-full shrink-0 justify-center overflow-x-auto sm:justify-start">
            <Turnstile
              ref={turnstileRef}
              siteKey={turnstileSiteKey}
              onSuccess={onTurnstileSuccess}
              onExpire={onTurnstileExpire}
              onError={onTurnstileError}
              options={turnstileOptions}
              scriptOptions={TURNSTILE_SCRIPT_OPTIONS}
            />
          </div>
        </div>
      ) : null}

      <p id="contact-hint" className="text-xs text-muted">
        {t("form.hint")}
      </p>

      {errorMessage ? (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-200"
        >
          {errorMessage}
        </p>
      ) : null}

      {state === "success" ? (
        <p
          role="status"
          className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-800 dark:text-emerald-200"
        >
          {t("form.success")}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "submitting" || !canSubmit}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "submitting" ? (
          <HiOutlineArrowPath className="size-4 shrink-0 animate-spin" aria-hidden />
        ) : (
          <HiOutlinePaperAirplane className="size-4 shrink-0" aria-hidden />
        )}
        {state === "submitting" ? t("form.sending") : t("form.send")}
      </button>
    </motion.form>
  );
}
