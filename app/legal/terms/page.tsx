import type { Metadata } from "next";
import { TermsOfUseBody } from "@/components/legal/terms-of-use-body";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildLocaleMetadata({
    titleKey: "meta.legal.termsTitle",
    descriptionKey: "meta.legal.termsDescription",
    path: "/legal/terms",
  });
}

export default function TermsOfUsePage() {
  return <TermsOfUseBody />;
}
