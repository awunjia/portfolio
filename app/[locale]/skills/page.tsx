import type { Metadata } from "next";
import { SkillsStructuredData } from "@/components/seo/skills-structured-data";
import { SkillsPageContent } from "@/components/pages/skills-page-content";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";
import { isLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  return buildLocaleMetadata({
    titleKey: "meta.skills.title",
    descriptionKey: "meta.skills.description",
    ogDescriptionKey: "meta.skills.ogDescription",
    path: "/skills",
    locale: isLocale(raw) ? raw : "en",
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
