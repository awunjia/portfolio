"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { Section } from "@/components/section";
import { HomeHero } from "@/components/home-hero";
import { TechMarquee } from "@/components/tech-marquee";
import { ProficiencyShowcase } from "@/components/proficiency-showcase";
import { ProfileSpotlight } from "@/components/profile-spotlight";
import { useI18n } from "@/components/providers/i18n-provider";

const SkillsLottie = dynamic(
  () => import("@/components/devfolio/skills-lottie").then((m) => ({ default: m.SkillsLottie })),
  {
    ssr: false,
    loading: () => (
      <div
        className="skills-image-div relative mx-auto w-full max-w-[min(100%,480px)] shrink-0 animate-pulse rounded-2xl bg-muted/25 lg:mx-0"
        style={{ minHeight: "min(55vh, 520px)" }}
        aria-hidden
      />
    ),
  },
);

const PlatformLottiesShowcase = dynamic(
  () =>
    import("@/components/platform-lotties-showcase").then((m) => ({
      default: m.PlatformLottiesShowcase,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto w-full max-w-5xl animate-pulse rounded-2xl bg-muted/20"
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
        id="skills"
        title={t("home.sectionStackTitle")}
        subtitle={t("home.sectionStackSubtitle")}
        titleSize="compact"
      >
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="flex justify-center lg:col-span-6 lg:justify-start">
            <SkillsLottie />
          </div>
          <div className="min-w-0 space-y-6 lg:col-span-6">
            <TechMarquee />
            <p className="text-center text-sm text-muted lg:text-left">
              <Link
                href="/skills"
                className="font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
              >
                {t("home.skillsLink")}
              </Link>{" "}
              {t("home.skillsLinkSuffix")}
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="proficiency"
        title={t("home.sectionProficiencyTitle")}
        subtitle={t("home.sectionProficiencySubtitle")}
        titleSize="compact"
      >
        <ProficiencyShowcase />
      </Section>

      <Section
        id="products"
        title={t("home.sectionDeliveryTitle")}
        subtitle={t("home.sectionDeliverySubtitle")}
        titleSize="compact"
      >
        <PlatformLottiesShowcase />
      </Section>

      <ProfileSpotlight />

      <section className="border-t border-border bg-surface/60 py-16 dark:bg-surface/30">
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight">{t("home.ctaTitle")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">{t("home.ctaBody")}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex h-11 w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover sm:w-auto sm:max-w-none sm:px-8"
          >
            <HiOutlineChatBubbleLeftRight className="size-4 shrink-0" aria-hidden />
            {t("home.ctaButton")}
          </Link>
        </div>
      </section>

      <section className="border-t border-border bg-background py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {t("home.builtTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted">{t("home.builtIntro")}</p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-xl border border-border bg-surface/70 p-5 dark:bg-white/[0.03]">
              <h3 className="text-sm font-medium text-muted">{t("home.cardStackTitle")}</h3>
              <p className="mt-3 text-sm text-foreground">{t("home.cardStackBody")}</p>
            </article>

            <article className="rounded-xl border border-border bg-surface/70 p-5 dark:bg-white/[0.03]">
              <h3 className="text-sm font-medium text-muted">{t("home.cardHostTitle")}</h3>
              <p className="mt-3 text-sm text-foreground">{t("home.cardHostBody")}</p>
            </article>

            <article className="rounded-xl border border-border bg-surface/70 p-5 dark:bg-white/[0.03]">
              <h3 className="text-sm font-medium text-muted">{t("home.cardSecurityTitle")}</h3>
              <p className="mt-3 text-sm text-foreground">{t("home.cardSecurityBody")}</p>
            </article>

            <article className="rounded-xl border border-border bg-surface/70 p-5 dark:bg-white/[0.03]">
              <h3 className="text-sm font-medium text-muted">{t("home.cardSeoTitle")}</h3>
              <p className="mt-3 text-sm text-foreground">{t("home.cardSeoBody")}</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
