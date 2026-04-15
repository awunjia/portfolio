import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/pages/projects-page-content";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildLocaleMetadata({
    titleKey: "meta.projects.title",
    descriptionKey: "meta.projects.description",
    path: "/projects",
  });
}

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
