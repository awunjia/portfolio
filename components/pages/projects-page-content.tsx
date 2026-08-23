"use client";

import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";
import { getProjectsForDisplay } from "@/lib/projects";
import { useI18n } from "@/components/providers/i18n-provider";

export function ProjectsPageContent() {
  const { t } = useI18n();
  const { projects } = getProjectsForDisplay();
  const displayProjects = projects.map((p) => {
    if (!p.i18nKey) return p;
    const title = t(`proj.items.${p.i18nKey}.title`);
    const description = t(`proj.items.${p.i18nKey}.description`);
    return { ...p, title, description };
  });

  return (
    <>
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-skills/15 via-accent/10 to-transparent dark:from-skills/10 dark:via-accent/8" />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-medium tracking-wide text-accent">{t("proj.eyebrow")}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("proj.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{t("proj.intro")}</p>
        </div>
      </div>

      <Section title={t("proj.sectionTitle")} subtitle={t("proj.sectionSubtitle")}>
        <div className="grid gap-8 md:grid-cols-2">
          {displayProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
