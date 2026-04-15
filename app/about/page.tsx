import type { Metadata } from "next";
import { AboutPageContent } from "@/components/pages/about-page-content";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildLocaleMetadata({
    titleKey: "meta.about.title",
    descriptionKey: "meta.about.description",
    ogDescriptionKey: "meta.about.ogDescription",
    path: "/about",
  });
}

export default function AboutPage() {
  return <AboutPageContent />;
}
