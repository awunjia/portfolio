"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { GitHubRepoPublic } from "@/lib/github-repos";
import { useI18n } from "@/components/providers/i18n-provider";
import type { Locale } from "@/lib/i18n/locale";

function localeToBcp47(locale: Locale): string {
  if (locale === "fi") return "fi-FI";
  if (locale === "sv") return "sv-SE";
  if (locale === "fr") return "fr-FR";
  if (locale === "da") return "da-DK";
  return "en-GB";
}

function formatPushedAt(iso: string, locale: Locale): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(localeToBcp47(locale), {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

type GitHubRepoCardProps = {
  repo: GitHubRepoPublic;
  index?: number;
};

export function GitHubRepoCard({ repo, index = 0 }: GitHubRepoCardProps) {
  const reduceMotion = useReducedMotion();
  const { t, locale } = useI18n();
  const updatedLabel = t("oss.repoUpdated").replace(
    "{date}",
    formatPushedAt(repo.pushedAt, locale),
  );

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 0.38,
        delay: reduceMotion ? 0 : index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {repo.name}
          </h3>
          {repo.archived ? (
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted">
              {t("oss.repoArchived")}
            </span>
          ) : null}
          {repo.isFork ? (
            <span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted">
              {t("oss.repoFork")}
            </span>
          ) : null}
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">
          {repo.description?.trim() || t("oss.repoNoDescription")}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          {repo.language ? (
            <span>
              <span className="font-medium text-foreground">{repo.language}</span>
            </span>
          ) : null}
          <span>{t("oss.repoStars").replace("{count}", String(repo.stars))}</span>
          <span>{t("oss.repoForks").replace("{count}", String(repo.forks))}</span>
          <span>{updatedLabel}</span>
        </div>
        {repo.topics.length > 0 ? (
          <ul className="flex flex-wrap gap-2" aria-label={t("oss.repoTopicsAria")}>
            {repo.topics.slice(0, 8).map((topic) => (
              <li
                key={topic}
                className="rounded-full border border-skills/30 bg-skills/10 px-2.5 py-0.5 text-xs font-medium text-card-subtitle dark:text-muted"
              >
                {topic}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="mt-auto flex flex-wrap gap-4 pt-1">
          <Link
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
          >
            {t("oss.repoOpen")}
          </Link>
          {repo.homepage ? (
            <Link
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
            >
              {t("oss.repoWebsite")}
            </Link>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
