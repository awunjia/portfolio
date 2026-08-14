import type { Metadata } from "next";
import { HomePageContent } from "@/components/pages/home-page-content";
import { FaqStructuredData } from "@/components/seo/faq-structured-data";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";
import { isLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  return buildLocaleMetadata({
    titleKey: "meta.home.title",
    descriptionKey: "meta.home.description",
    path: "/",
    locale,
  });
}

export default function HomePage() {
  return (
    <>
      <FaqStructuredData />
      <HomePageContent />
    </>
  );
}
