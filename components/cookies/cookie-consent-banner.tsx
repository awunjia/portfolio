"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineCheck,
  HiOutlineDocumentCheck,
  HiOutlineXMark,
} from "react-icons/hi2";
import { useCookieConsent } from "@/components/providers/cookie-consent-provider";
import { useI18n } from "@/components/providers/i18n-provider";

export function CookieConsentBanner() {
  const { t } = useI18n();
  const {
    needsChoice,
    acceptAll,
    rejectNonEssential,
    saveCustom,
    openSettings,
    closeSettings,
    settingsOpen,
    consent,
    preferencesEnabled,
    statisticsEnabled,
  } = useCookieConsent();

  const panelId = useId();
  const [draftP, setDraftP] = useState(preferencesEnabled);
  const [draftS, setDraftS] = useState(statisticsEnabled);

  useEffect(() => {
    if (settingsOpen) {
      setDraftP(preferencesEnabled);
      setDraftS(statisticsEnabled);
    }
  }, [settingsOpen, preferencesEnabled, statisticsEnabled, consent?.at]);

  if (!needsChoice && !settingsOpen) {
    return null;
  }

  return (
    <>
      {needsChoice ? (
        <div
          className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-surface/95 px-4 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md dark:border-white/10 dark:bg-[#171c28]/95 dark:shadow-[0_-8px_30px_rgba(0,0,0,0.45)] sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${panelId}-title`}
          aria-describedby={`${panelId}-desc`}
        >
          <div className="mx-auto flex max-w-5xl flex-col gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div className="min-w-0 flex-1">
              <h2
                id={`${panelId}-title`}
                className="text-base font-semibold tracking-tight text-foreground"
              >
                {t("cookies.bannerTitle")}
              </h2>
              <p id={`${panelId}-desc`} className="mt-2 text-sm leading-relaxed text-muted">
                {t("cookies.bannerBody")}
              </p>
              <p className="mt-2 text-xs text-muted">
                {t("cookies.legalIntro")}{" "}
                <Link href="/legal/cookies" className="font-medium text-accent underline-offset-2 hover:underline">
                  {t("footer.legalCookies")}
                </Link>{" "}
                {t("cookies.and")}{" "}
                <Link href="/legal/privacy" className="font-medium text-accent underline-offset-2 hover:underline">
                  {t("footer.legalPrivacy")}
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <button
                type="button"
                onClick={() => rejectNonEssential()}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <HiOutlineXMark className="size-4 shrink-0" aria-hidden />
                {t("cookies.rejectNonEssential")}
              </button>
              <button
                type="button"
                onClick={() => openSettings()}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <HiOutlineAdjustmentsHorizontal className="size-4 shrink-0" aria-hidden />
                {t("cookies.managePreferences")}
              </button>
              <button
                type="button"
                onClick={() => acceptAll()}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                <HiOutlineCheck className="size-4 shrink-0" aria-hidden />
                {t("cookies.acceptAll")}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {settingsOpen ? (
        <div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-black/50 p-4 sm:items-center"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeSettings();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${panelId}-prefs-title`}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-surface p-6 shadow-xl dark:border-white/10 dark:bg-[#1e2436]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id={`${panelId}-prefs-title`}
              className="text-lg font-semibold tracking-tight text-foreground"
            >
              {t("cookies.managePreferences")}
            </h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="rounded-xl border border-border/80 bg-background/60 p-4 dark:bg-white/[0.04]">
                <p className="font-medium text-foreground">{t("cookies.necessaryTitle")}</p>
                <p className="mt-1 text-muted">{t("cookies.necessaryBody")}</p>
                <p className="mt-2 text-xs font-medium text-accent">{t("cookies.necessaryStatus")}</p>
              </li>
              <li className="rounded-xl border border-border/80 bg-background/60 p-4 dark:bg-white/[0.04]">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-border text-accent"
                    checked={draftP}
                    onChange={(e) => setDraftP(e.target.checked)}
                  />
                  <span>
                    <span className="font-medium text-foreground">{t("cookies.preferencesTitle")}</span>
                    <span className="mt-1 block text-muted">{t("cookies.preferencesBody")}</span>
                  </span>
                </label>
              </li>
              <li className="rounded-xl border border-border/80 bg-background/60 p-4 dark:bg-white/[0.04]">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-border text-accent"
                    checked={draftS}
                    onChange={(e) => setDraftS(e.target.checked)}
                  />
                  <span>
                    <span className="font-medium text-foreground">{t("cookies.statisticsTitle")}</span>
                    <span className="mt-1 block text-muted">{t("cookies.statisticsBody")}</span>
                  </span>
                </label>
              </li>
            </ul>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => closeSettings()}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium"
              >
                <HiOutlineXMark className="size-4 shrink-0" aria-hidden />
                {t("cookies.close")}
              </button>
              <button
                type="button"
                onClick={() => saveCustom(draftP, draftS)}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground hover:bg-accent-hover"
              >
                <HiOutlineDocumentCheck className="size-4 shrink-0" aria-hidden />
                {t("cookies.savePreferences")}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
