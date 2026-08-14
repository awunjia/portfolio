import type { Metadata } from "next";
import { EducationPageContent } from "@/components/pages/education-page-content";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";
import { isLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  return buildLocaleMetadata({
    titleKey: "meta.education.title",
    descriptionKey: "meta.education.description",
    ogDescriptionKey: "meta.education.ogDescription",
    path: "/education",
    locale: isLocale(raw) ? raw : "en",
  });
}

export default function EducationPage() {
  return <EducationPageContent />;
}
