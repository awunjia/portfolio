import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/pages/projects-page-content";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";
import { isLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  return buildLocaleMetadata({
    titleKey: "meta.projects.title",
    descriptionKey: "meta.projects.description",
    path: "/projects",
    locale: isLocale(raw) ? raw : "en",
  });
}

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
