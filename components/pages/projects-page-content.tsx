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
    <div className="pb-16">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t("proj.title")}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          {t("proj.intro1")}{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">config/site.ts</code>{" "}
          {t("proj.intro2")}
        </p>
      </div>

      <Section title={t("proj.sectionTitle")} subtitle={t("proj.sectionSubtitle")}>
        <div className="grid gap-8 md:grid-cols-2">
          {displayProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </Section>
    </div>
  );
}
