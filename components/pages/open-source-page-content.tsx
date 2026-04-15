"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import type { GitHubReposResult } from "@/lib/github-repos";
import { GitHubReposGrid } from "@/components/open-source/github-repos-grid";
import { useI18n } from "@/components/providers/i18n-provider";

const OpenSourceHeroLottie = dynamic(
  () =>
    import("@/components/open-source/open-source-hero-lottie").then((m) => ({
      default: m.OpenSourceHeroLottie,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[min(52vh,440px)] w-full max-w-[min(100%,420px)] animate-pulse rounded-2xl bg-muted/25"
        aria-hidden
      />
    ),
  },
);

type Props = {
  result: GitHubReposResult;
  profileUrl: string;
};

export function OpenSourcePageContent({ result, profileUrl }: Props) {
  const { t } = useI18n();
  const handle = `@${siteConfig.githubUsername}`;

  return (
    <>
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-skills/15 via-accent/10 to-transparent dark:from-skills/10 dark:via-accent/8" />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <p className="text-sm font-medium tracking-wide text-accent">{t("oss.eyebrow")}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t("oss.title")}
          </h1>
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-x-10 md:gap-y-8 lg:gap-x-12">
            <div className="min-w-0">
              <p className="text-lg text-muted">
                {t("oss.introBefore")}{" "}
                <Link
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
                >
                  {handle}
                </Link>
                {t("oss.introAfter")}
              </p>
            </div>
            <div className="flex min-w-0 justify-center md:justify-end">
              <OpenSourceHeroLottie />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {!result.ok ? (
          <div
            role="alert"
            className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-amber-950 dark:text-amber-100"
          >
            <p className="font-semibold">{t("oss.errorTitle")}</p>
            <p className="mt-2 text-amber-900/90 dark:text-amber-50/90">{result.error}</p>
            <p className="mt-3 text-xs text-amber-900/80 dark:text-amber-100/80">
              {t("oss.errorHintBefore")}{" "}
              <code className="rounded bg-amber-500/20 px-1 py-0.5 font-mono">GITHUB_TOKEN</code>{" "}
              {t("oss.errorHintAfter")}
            </p>
            <Link
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-accent hover:text-accent-hover hover:underline"
            >
              {t("oss.viewGithub")}
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {t("oss.reposHeading").replace("{count}", String(result.repos.length))}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">{t("oss.reposBody")}</p>
            <div className="mt-10">
              <GitHubReposGrid repos={result.repos} />
            </div>
          </>
        )}
      </div>
    </>
  );
}
