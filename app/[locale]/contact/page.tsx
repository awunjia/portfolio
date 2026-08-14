import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";
import { isLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  return buildLocaleMetadata({
    titleKey: "meta.contact.title",
    descriptionKey: "meta.contact.description",
    path: "/contact",
    locale: isLocale(raw) ? raw : "en",
  });
}

export default function ContactPage() {
  return <ContactPageContent />;
}
