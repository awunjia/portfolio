"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/section";
import { useI18n } from "@/components/providers/i18n-provider";

const WorkExperienceHeroLottie = dynamic(
  () =>
    import("@/components/about/work-experience-hero-lottie").then((m) => ({
      default: m.WorkExperienceHeroLottie,
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

export function AboutPageContent() {
  const { t } = useI18n();

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm font-medium tracking-wide text-accent">{t("about.eyebrow")}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("about.title")}
        </h1>
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-x-10 md:gap-y-8 lg:gap-x-12">
          <div className="min-w-0 space-y-4">
            <p className="text-lg text-muted">{t("about.bio")}</p>
          </div>
          <div className="flex min-w-0 justify-center md:justify-end">
            <WorkExperienceHeroLottie />
          </div>
        </div>
      </div>

      <Section
        id="experience"
        title={t("about.sectionTitle")}
        subtitle={t("about.sectionSubtitle")}
        titleSize="compact"
      >
        <ol className="relative space-y-14 border-l border-border pl-8">
          {siteConfig.experience.map((item) => (
            <li key={`${item.company}-${item.period}`} className="relative">
              <span
                className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full bg-accent"
                aria-hidden
              />
              <div className="ms-3">
                <p className="text-sm font-medium text-accent">{item.period}</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {item.companyUrl ? (
                    <Link
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {item.company}
                    </Link>
                  ) : (
                    <span className="font-medium text-foreground">{item.company}</span>
                  )}
                  {item.location ? (
                    <>
                      {" "}
                      <span className="text-muted">- {item.location}</span>
                    </>
                  ) : null}
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
                  {item.summary}
                </p>
                {item.techStack && item.techStack.length > 0 ? (
                  <ul
                    className="mt-4 flex flex-wrap gap-2"
                    aria-label={t("about.techAria").replace("{company}", item.company)}
                  >
                    {item.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-skills/30 bg-skills/10 px-2.5 py-0.5 text-xs font-medium text-card-subtitle dark:text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
