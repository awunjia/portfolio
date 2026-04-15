import type { Metadata } from "next";
import { HomePageContent } from "@/components/pages/home-page-content";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildLocaleMetadata({
    titleKey: "meta.home.title",
    descriptionKey: "meta.home.description",
    path: "/",
  });
}

export default function HomePage() {
  return <HomePageContent />;
}
