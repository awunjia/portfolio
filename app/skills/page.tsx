import type { Metadata } from "next";
import { SkillsStructuredData } from "@/components/seo/skills-structured-data";
import { SkillsPageContent } from "@/components/pages/skills-page-content";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildLocaleMetadata({
    titleKey: "meta.skills.title",
    descriptionKey: "meta.skills.description",
    ogDescriptionKey: "meta.skills.ogDescription",
    path: "/skills",
  });
}

export default function SkillsPage() {
  return (
    <>
      <SkillsStructuredData />
      <SkillsPageContent />
    </>
  );
}
