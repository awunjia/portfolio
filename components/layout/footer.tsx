"use client";

import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { siteConfig } from "@/config/site";
import { LocaleLink } from "@/components/locale-link";
import { useCookieConsent } from "@/components/providers/cookie-consent-provider";
import { useI18n } from "@/components/providers/i18n-provider";

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useI18n();
  const { hydrated, consent, openSettings } = useCookieConsent();

  return (
    <footer className="footer-div mt-auto border-t border-border pb-6 pt-8 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="footer-text text-sm text-muted dark:text-foreground">
          © {year} {siteConfig.fullName}
        </p>
        <p className="footer-text mt-2 text-xs text-muted/90">{t("footer.tagline")}</p>
        <nav
          className="footer-text mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted"
          aria-label="Legal"
        >
          <LocaleLink
            href="/legal/cookies"
            className="font-medium text-accent underline-offset-2 transition-colors hover:text-accent-hover hover:underline"
          >
            {t("footer.legalCookies")}
          </LocaleLink>
          <LocaleLink
            href="/legal/privacy"
            className="font-medium text-accent underline-offset-2 transition-colors hover:text-accent-hover hover:underline"
          >
            {t("footer.legalPrivacy")}
          </LocaleLink>
          <LocaleLink
            href="/legal/terms"
            className="font-medium text-accent underline-offset-2 transition-colors hover:text-accent-hover hover:underline"
          >
            {t("footer.legalTerms")}
          </LocaleLink>
          {hydrated && consent !== null ? (
            <button
              type="button"
              onClick={() => openSettings()}
              className="inline-flex items-center gap-1.5 font-medium text-accent underline-offset-2 transition-colors hover:text-accent-hover hover:underline"
            >
              <HiOutlineAdjustmentsHorizontal className="size-3.5 shrink-0" aria-hidden />
              {t("footer.cookieSettings")}
            </button>
          ) : null}
        </nav>
      </div>
    </footer>
  );
}
