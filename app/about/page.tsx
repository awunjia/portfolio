import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { AboutPageContent } from "@/components/pages/about-page-content";

export const metadata: Metadata = {
  title: "Work experience",
  description: `A friendly walk through work experience for ${siteConfig.fullName} - mostly full-stack web, Laravel, and a little Flutter IoT.`,
  openGraph: {
    title: `Work experience - ${siteConfig.fullName}`,
    description: siteConfig.bio,
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
