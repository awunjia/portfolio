import type { Metadata } from "next";
import { CookiePolicyBody } from "@/components/legal/cookie-policy-body";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildLocaleMetadata({
    titleKey: "meta.legal.cookiesTitle",
    descriptionKey: "meta.legal.cookiesDescription",
    path: "/legal/cookies",
  });
}

export default function CookiePolicyPage() {
  return <CookiePolicyBody />;
}
