import type { Metadata } from "next";
import { EducationPageContent } from "@/components/pages/education-page-content";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildLocaleMetadata({
    titleKey: "meta.education.title",
    descriptionKey: "meta.education.description",
    ogDescriptionKey: "meta.education.ogDescription",
    path: "/education",
  });
}

export default function EducationPage() {
  return <EducationPageContent />;
}
