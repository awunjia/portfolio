import type { Metadata } from "next";
import { PrivacyPolicyBody } from "@/components/legal/privacy-policy-body";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildLocaleMetadata({
    titleKey: "meta.legal.privacyTitle",
    descriptionKey: "meta.legal.privacyDescription",
    path: "/legal/privacy",
  });
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyBody />;
}
