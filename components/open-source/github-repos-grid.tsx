"use client";

import type { GitHubRepoPublic } from "@/lib/github-repos";
import { GitHubRepoCard } from "@/components/open-source/github-repo-card";

export function GitHubReposGrid({ repos }: { repos: GitHubRepoPublic[] }) {
  if (repos.length === 0) {
    return (
      <p className="text-center text-muted">
        No public repositories found for this account.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo, i) => (
        <GitHubRepoCard key={repo.htmlUrl} repo={repo} index={i} />
      ))}
    </div>
  );
}
