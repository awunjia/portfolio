import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ProjectsPageContent } from "@/components/pages/projects-page-content";

export const metadata: Metadata = {
  title: "Projects",
  description: `A small set of projects by ${siteConfig.fullName}, kept in site configuration.`,
  openGraph: {
    title: `Projects - ${siteConfig.fullName}`,
    description: "A few highlighted builds with stacks and links.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
