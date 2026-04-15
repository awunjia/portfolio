import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getGitHubRepos } from "@/lib/github-repos";
import { OpenSourcePageContent } from "@/components/pages/open-source-page-content";
import { buildLocaleMetadata } from "@/lib/i18n/page-metadata";

/** GitHub is fetched at request time (build and CI may block api.github.com). */
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildLocaleMetadata({
    titleKey: "meta.oss.title",
    descriptionKey: "meta.oss.description",
    ogDescriptionKey: "meta.oss.ogDescription",
    path: "/open-source",
  });
}

export default async function OpenSourcePage() {
  const result = await getGitHubRepos();
  const profileUrl = siteConfig.github.replace(/\/$/, "");

  return <OpenSourcePageContent result={result} profileUrl={profileUrl} />;
}
