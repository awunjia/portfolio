import type { Metadata } from "next";
import { TermsOfUseBody } from "@/components/legal/terms-of-use-body";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";
import { isLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  return buildLocaleMetadata({
    titleKey: "meta.legal.termsTitle",
    descriptionKey: "meta.legal.termsDescription",
    path: "/legal/terms",
    locale: isLocale(raw) ? raw : "en",
  });
}

export default function TermsOfUsePage() {
  return <TermsOfUseBody />;
}
