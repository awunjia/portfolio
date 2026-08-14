import type { Metadata } from "next";
import { AboutPageContent } from "@/components/pages/about-page-content";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";
import { isLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  return buildLocaleMetadata({
    titleKey: "meta.about.title",
    descriptionKey: "meta.about.description",
    ogDescriptionKey: "meta.about.ogDescription",
    path: "/about",
    locale: isLocale(raw) ? raw : "en",
  });
}

export default function AboutPage() {
  return <AboutPageContent />;
}
