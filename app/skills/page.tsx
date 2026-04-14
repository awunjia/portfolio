import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SkillsPageContent } from "@/components/pages/skills-page-content";

export const metadata: Metadata = {
  title: "Skills",
  description: `A relaxed tour of tools and stacks for ${siteConfig.fullName} - ${siteConfig.role}.`,
  openGraph: {
    title: `Skills - ${siteConfig.fullName}`,
    description: siteConfig.tagline,
    url: "/skills",
  },
};

export default function SkillsPage() {
  return <SkillsPageContent />;
}
