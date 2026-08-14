import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getGitHubRepos } from "@/lib/github-repos";
import { OpenSourcePageContent } from "@/components/pages/open-source-page-content";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";
import { isLocale } from "@/lib/i18n/locale";

/** GitHub is fetched at request time (build and CI may block api.github.com). */
export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  return buildLocaleMetadata({
    titleKey: "meta.oss.title",
    descriptionKey: "meta.oss.description",
    ogDescriptionKey: "meta.oss.ogDescription",
    path: "/open-source",
    locale: isLocale(raw) ? raw : "en",
  });
}

export default async function OpenSourcePage() {
  const result = await getGitHubRepos();
  const profileUrl = siteConfig.github.replace(/\/$/, "");

  return <OpenSourcePageContent result={result} profileUrl={profileUrl} />;
}
