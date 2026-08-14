import type { Metadata } from "next";
import { PrivacyPolicyBody } from "@/components/legal/privacy-policy-body";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";
import { isLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  return buildLocaleMetadata({
    titleKey: "meta.legal.privacyTitle",
    descriptionKey: "meta.legal.privacyDescription",
    path: "/legal/privacy",
    locale: isLocale(raw) ? raw : "en",
  });
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyBody />;
}
