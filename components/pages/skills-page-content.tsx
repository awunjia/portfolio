"use client";

import { siteConfig, type SkillStack } from "@/config/site";
import { Section } from "@/components/section";
import { ProficiencyShowcase } from "@/components/proficiency-showcase";
import { SkillsHeroLottie } from "@/components/skills/skills-hero-lottie";
import { useI18n } from "@/components/providers/i18n-provider";

export function SkillsPageContent() {
  const { t } = useI18n();
  const stacks = siteConfig.skillStacks as readonly SkillStack[];

  return (
    <>
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-skills/15 via-accent/10 to-transparent dark:from-skills/10 dark:via-accent/8" />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-medium tracking-wide text-accent">
            {t("skills.eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("skills.title")}
          </h1>
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-x-10 md:gap-y-8 lg:gap-x-12">
            <div className="min-w-0">
              <p className="text-lg text-muted">{t("skills.intro")}</p>
            </div>
            <div className="flex min-w-0 justify-center md:justify-end">
              <SkillsHeroLottie />
            </div>
          </div>
        </div>
      </div>

      <Section
        id="stacks"
        title={t("skills.stacksTitle")}
        subtitle={t("skills.stacksSubtitle")}
        titleSize="compact"
      >
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {stacks.map((stack) => (
            <article
              key={stack.title}
              className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-white/15"
            >
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                {stack.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {stack.description}
              </p>
              <ul
                className="mt-5 flex flex-wrap gap-2"
                aria-label={t("skills.stackAria").replace("{title}", stack.title)}
              >
                {stack.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-skills/35 bg-skills/10 px-2.5 py-1 text-xs font-medium text-foreground dark:border-skills/25 dark:bg-skills/15 dark:text-muted"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="emphasis"
        title={t("skills.emphasisTitle")}
        subtitle={t("skills.emphasisSubtitle")}
        titleSize="compact"
      >
        <ProficiencyShowcase />
      </Section>
    </>
  );
}
