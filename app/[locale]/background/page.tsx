import type { Metadata } from "next";
import { SkillsStructuredData } from "@/components/seo/skills-structured-data";
import { BackgroundPageContent } from "@/components/pages/background-page-content";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";
import { isLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  return buildLocaleMetadata({
    titleKey: "meta.background.title",
    descriptionKey: "meta.background.description",
    ogDescriptionKey: "meta.background.ogDescription",
    path: "/background",
    locale: isLocale(raw) ? raw : "en",
  });
}

export default function BackgroundPage() {
  return (
    <>
      <SkillsStructuredData />
      <BackgroundPageContent />
    </>
  );
}
