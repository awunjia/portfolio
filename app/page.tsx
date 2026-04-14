import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { HomePageContent } from "@/components/pages/home-page-content";
import { siteMetaDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Overview",
  description: siteMetaDescription(),
  openGraph: {
    title: `${siteConfig.fullName} - ${siteConfig.role}`,
    description: siteMetaDescription(),
    url: "/",
  },
};

export default function HomePage() {
  return <HomePageContent />;
}
