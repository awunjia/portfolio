"use client";

import {
  HiOutlineAdjustmentsHorizontal,
  HiOutlineEnvelope,
  HiOutlineMapPin,
} from "react-icons/hi2";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
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
        <nav
          className="footer-text mb-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted"
          aria-label={t("footer.legalNav")}
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

        <div className="mb-5 flex flex-col items-center gap-4">
          <p className="inline-flex items-center gap-1.5 text-xs font-medium text-muted">
            <HiOutlineMapPin className="size-3.5 shrink-0 text-accent" aria-hidden />
            {t("footer.location")}
          </p>

          <ul
            className="flex items-center justify-center gap-3"
            aria-label={t("social.ariaGroup")}
          >
            <li>
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/40 hover:text-accent"
                aria-label={t("social.github")}
              >
                <FaGithub className="size-4" aria-hidden />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/40 hover:text-accent"
                aria-label={t("social.linkedin")}
              >
                <FaLinkedinIn className="size-4" aria-hidden />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/40 hover:text-accent"
                aria-label={t("social.email")}
              >
                <HiOutlineEnvelope className="size-4" aria-hidden />
              </a>
            </li>
          </ul>
        </div>

        <p className="footer-text text-sm text-muted dark:text-foreground">
          © {year} {siteConfig.fullName}
        </p>
        <p className="footer-text mt-2 text-xs text-muted/90">{t("footer.tagline")}</p>
      </div>
    </footer>
  );
}
