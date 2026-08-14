import type { Metadata } from "next";
import { CookiePolicyBody } from "@/components/legal/cookie-policy-body";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";
import { isLocale } from "@/lib/i18n/locale";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  return buildLocaleMetadata({
    titleKey: "meta.legal.cookiesTitle",
    descriptionKey: "meta.legal.cookiesDescription",
    path: "/legal/cookies",
    locale: isLocale(raw) ? raw : "en",
  });
}

export default function CookiePolicyPage() {
  return <CookiePolicyBody />;
}
