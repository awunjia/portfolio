"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/components/providers/i18n-provider";

type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
};

export function GitHubStats() {
  const { t } = useI18n();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const username = siteConfig.githubUsername;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`, {
          headers: { Accept: "application/vnd.github+json" },
        });
        if (!res.ok) return;
        const data = (await res.json()) as GitHubUser;
        if (!cancelled) setUser(data);
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [username]);

  if (!user) return null;

  return (
    <section
      id="github"
      className="scroll-mt-24 mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8"
      aria-label={t("github.statsAria")}
    >
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">{t("github.statsTitle")}</h2>
            <p className="mt-1 text-sm text-muted">
              {t("github.statsIntro").replace("{handle}", `@${username}`)}
            </p>
          </div>
          <Link
            href={siteConfig.github}
            className="text-sm font-medium text-link underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("github.openProfile")}
          </Link>
        </div>
        <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label={t("github.statRepos")} value={user.public_repos} />
          <Stat label={t("github.statFollowers")} value={user.followers} />
          <Stat label={t("github.statFollowing")} value={user.following} />
        </dl>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-background px-4 py-3">
      <dt className="text-xs font-medium text-muted">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums text-foreground">{value}</dd>
    </div>
  );
}
