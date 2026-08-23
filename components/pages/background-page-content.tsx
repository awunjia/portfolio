"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { siteConfig, type EducationItem, type SkillStack } from "@/config/site";
import { LocaleLink } from "@/components/locale-link";
import { Section } from "@/components/section";
import { useI18n } from "@/components/providers/i18n-provider";

const SkillsHeroLottie = dynamic(
  () =>
    import("@/components/skills/skills-hero-lottie").then((m) => ({
      default: m.SkillsHeroLottie,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[min(52vh,440px)] w-full max-w-[min(100%,420px)] animate-pulse rounded-2xl bg-muted/25"
        aria-hidden
      />
    ),
  },
);

export function BackgroundPageContent() {
  const { t } = useI18n();
  const stacks = siteConfig.skillStacks as readonly SkillStack[];

  return (
    <>
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-skills/15 via-accent/10 to-transparent dark:from-skills/10 dark:via-accent/8" />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-medium tracking-wide text-accent">
            {t("background.eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("background.title")}
          </h1>
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-x-10 md:gap-y-8 lg:gap-x-12">
            <div className="min-w-0 space-y-4">
              <p className="text-lg text-muted">{t("background.intro")}</p>
              <p className="text-sm text-muted">
                {t("background.workHint")}{" "}
                <LocaleLink
                  href="/about"
                  className="font-medium text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {t("background.workLink")}
                </LocaleLink>
                .
              </p>
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
          {stacks.map((stack) => {
            const stackTitle = t(`skills.stack.${stack.i18nKey}.title`);
            const stackDescription = t(`skills.stack.${stack.i18nKey}.description`);
            return (
              <article
                key={stack.i18nKey}
                className="flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:shadow-none dark:hover:border-white/15"
              >
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {stackTitle}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {stackDescription}
                </p>
                <ul
                  className="mt-5 flex flex-wrap gap-2"
                  aria-label={t("skills.stackAria").replace("{title}", stackTitle)}
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
            );
          })}
        </div>
      </Section>

      <Section
        id="programs"
        title={t("edu.sectionTitle")}
        subtitle={t("edu.sectionSubtitle")}
        titleSize="compact"
      >
        <ol className="relative space-y-14 border-l border-education-border/80 pl-8 dark:border-education-border/50">
          {siteConfig.education.map((raw) => {
            const item = raw as EducationItem;
            return (
              <li key={`${item.school}-${item.period}`} className="relative">
                <span
                  className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-accent"
                  aria-hidden
                />
                <div className="ms-3">
                  <p className="text-sm font-medium text-accent">{item.period}</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                    {item.field}
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    {item.schoolUrl ? (
                      <Link
                        href={item.schoolUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                      >
                        {item.school}
                      </Link>
                    ) : (
                      <span className="font-medium text-foreground">{item.school}</span>
                    )}
                    {item.location ? (
                      <>
                        {" "}
                        <span className="text-muted"> - {item.location}</span>
                      </>
                    ) : null}
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                    {item.summary}
                  </p>
                  {item.thesis ? (
                    <aside className="mt-5 max-w-2xl border-l-2 border-accent/70 pl-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                        {t("edu.thesisLabel").replace("{year}", item.thesis.year)}
                      </p>
                      <h4 className="mt-1.5 text-base font-semibold tracking-tight text-foreground">
                        {item.thesis.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {item.thesis.summary}
                      </p>
                      <p className="mt-3">
                        <Link
                          href={item.thesis.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
                        >
                          {t("edu.thesisLink")}
                        </Link>
                      </p>
                    </aside>
                  ) : null}
                  {item.highlights && item.highlights.length > 0 ? (
                    <ul
                      className="mt-4 flex flex-wrap gap-2"
                      aria-label={t("edu.highlightsAria").replace("{school}", item.school)}
                    >
                      {item.highlights.map((h) => (
                        <li
                          key={h}
                          className="rounded-full border border-education-border/50 bg-education-border/10 px-2.5 py-0.5 text-xs font-medium text-card-subtitle dark:border-education-border/35 dark:bg-education-border/15 dark:text-muted"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </Section>
    </>
  );
}
