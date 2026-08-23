"use client";

import { HiOutlineArrowRight } from "react-icons/hi2";
import { ProjectCard } from "@/components/project-card";
import { LocaleLink } from "@/components/locale-link";
import { getProjectsForDisplay } from "@/lib/projects";
import { useI18n } from "@/components/providers/i18n-provider";

const PREVIEW_COUNT = 3;

export function HomeWorkShowcase() {
  const { t } = useI18n();
  const { projects } = getProjectsForDisplay(PREVIEW_COUNT);
  const displayProjects = projects.map((p) => {
    if (!p.i18nKey) return p;
    return {
      ...p,
      title: t(`proj.items.${p.i18nKey}.title`),
      description: t(`proj.items.${p.i18nKey}.description`),
    };
  });

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-24 border-t border-border bg-background py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2
              id="work-heading"
              className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              {t("home.workTitle")}
            </h2>
            <p className="mt-3 text-sm text-muted sm:text-base">{t("home.workSubtitle")}</p>
          </div>
          <LocaleLink
            href="/projects"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors hover:border-accent/40 hover:text-accent dark:bg-white/[0.04]"
          >
            {t("home.workViewAll")}
            <HiOutlineArrowRight className="size-4 shrink-0" aria-hidden />
          </LocaleLink>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
