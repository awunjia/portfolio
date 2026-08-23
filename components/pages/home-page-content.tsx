"use client";

import dynamic from "next/dynamic";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { Section } from "@/components/section";
import { HomeHero } from "@/components/home-hero";
import { WhyHireMe } from "@/components/why-hire-me";
import { ProfileSpotlight } from "@/components/profile-spotlight";
import { HomeWorkShowcase } from "@/components/home-work-showcase";
import { LocaleLink } from "@/components/locale-link";
import { useI18n } from "@/components/providers/i18n-provider";

const PlatformLottiesShowcase = dynamic(
  () =>
    import("@/components/platform-lotties-showcase").then((m) => ({
      default: m.PlatformLottiesShowcase,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto w-full max-w-6xl animate-pulse rounded-2xl bg-muted/20"
        style={{ minHeight: 320 }}
        aria-hidden
      />
    ),
  },
);

export function HomePageContent() {
  const { t } = useI18n();

  return (
    <>
      <section
        className="relative scroll-mt-24 overflow-hidden border-b border-border"
        aria-label={t("home.ariaOverview")}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/18 via-skills/8 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <HomeHero />
        </div>
      </section>

      <Section
        id="why-hire"
        title={t("home.whyHire.title")}
        subtitle={t("home.whyHire.subtitle")}
        titleSize="compact"
      >
        <WhyHireMe />
      </Section>

      <Section
        id="products"
        title={t("home.sectionDeliveryTitle")}
        subtitle={t("home.sectionDeliverySubtitle")}
        titleSize="compact"
      >
        <PlatformLottiesShowcase />
      </Section>

      <section className="border-t border-border bg-surface/60 py-16 dark:bg-surface/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight">{t("home.ctaTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">{t("home.ctaBody")}</p>
          <LocaleLink
            href="/contact"
            className="mt-8 inline-flex h-11 w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover sm:w-auto sm:max-w-none sm:px-8"
          >
            <HiOutlineChatBubbleLeftRight className="size-4 shrink-0" aria-hidden />
            {t("home.ctaButton")}
          </LocaleLink>
        </div>
      </section>

      <ProfileSpotlight />

      <HomeWorkShowcase />
    </>
  );
}
