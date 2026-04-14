import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ContactPageContent } from "@/components/pages/contact-page-content";

export const metadata: Metadata = {
  title: "Contact",
  description: `A simple way to reach ${siteConfig.fullName} - leave a note from this page.`,
  openGraph: {
    title: `Contact - ${siteConfig.fullName}`,
    description:
      "Share a little context and I will get back when I can - no pressure.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
