"use client";

import { siteConfig } from "@/config/site";
import { useI18n } from "@/components/providers/i18n-provider";

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer className="footer-div mt-auto border-t border-border pb-6 pt-8 dark:border-white/10">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="footer-text text-sm text-muted dark:text-foreground">
          © {year} {siteConfig.fullName}
        </p>
        <p className="footer-text mt-2 text-xs text-muted/90">{t("footer.tagline")}</p>
      </div>
    </footer>
  );
}
