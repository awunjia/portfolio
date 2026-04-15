import { siteConfig, type SiteProject } from "@/config/site";

export type ProjectView = {
  id: string;
  i18nKey?: "portfolio" | "apiToolkit";
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  images: string[];
  createdAt: Date;
  /** Always sourced from `siteConfig.projects` */
  source: "config";
};

function mapProject(p: SiteProject, index: number): ProjectView {
  return {
    id: `project-${index}`,
    i18nKey: p.i18nKey,
    title: p.title,
    description: p.description,
    techStack: [...p.techStack],
    githubUrl: p.githubUrl ?? null,
    liveUrl: p.liveUrl ?? null,
    images: p.images ? [...p.images] : [],
    createdAt: new Date(0),
    source: "config",
  };
}

export function getProjectsForDisplay(limit?: number): {
  projects: ProjectView[];
} {
  const mapped = siteConfig.projects.map(mapProject);
  return {
    projects: limit ? mapped.slice(0, limit) : mapped,
  };
}
