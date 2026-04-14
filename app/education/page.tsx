import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { EducationPageContent } from "@/components/pages/education-page-content";

export const metadata: Metadata = {
  title: "Education",
  description: `Education for ${siteConfig.fullName} - ${siteConfig.degree} at ${siteConfig.school}, and prior studies.`,
  openGraph: {
    title: `Education - ${siteConfig.fullName}`,
    description: `${siteConfig.degree}, ${siteConfig.school}`,
    url: "/education",
  },
};

export default function EducationPage() {
  return <EducationPageContent />;
}
