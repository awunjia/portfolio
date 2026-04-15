import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildLocaleMetadata({
    titleKey: "meta.contact.title",
    descriptionKey: "meta.contact.description",
    path: "/contact",
  });
}

export default function ContactPage() {
  return <ContactPageContent />;
}
