import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getGitHubRepos } from "@/lib/github-repos";
import { OpenSourcePageContent } from "@/components/pages/open-source-page-content";

/** GitHub is fetched at request time (build and CI may block api.github.com). */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Open Source",
  description: `Public GitHub repositories from ${siteConfig.fullName}.`,
  openGraph: {
    title: `Open Source - ${siteConfig.fullName}`,
    description: `Repositories from @${siteConfig.githubUsername} on GitHub.`,
    url: "/open-source",
  },
};

export default async function OpenSourcePage() {
  const result = await getGitHubRepos();
  const profileUrl = siteConfig.github.replace(/\/$/, "");

  return <OpenSourcePageContent result={result} profileUrl={profileUrl} />;
}
