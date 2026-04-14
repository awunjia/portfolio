"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { GitHubRepoPublic } from "@/lib/github-repos";

type GitHubRepoCardProps = {
  repo: GitHubRepoPublic;
  index?: number;
};

function formatPushedAt(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
}

export function GitHubRepoCard({ repo, index = 0 }: GitHubRepoCardProps) {
  const reduceMotion = useReducedMotion();

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
              Archived
            </span>
          ) : null}
          {repo.isFork ? (
            <span className="rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted">
              Fork
            </span>
          ) : null}
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">
          {repo.description?.trim() || "No description on GitHub yet."}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
          {repo.language ? (
            <span>
              <span className="font-medium text-foreground">{repo.language}</span>
            </span>
          ) : null}
          <span>{repo.stars} stars</span>
          <span>{repo.forks} forks</span>
          <span>Updated {formatPushedAt(repo.pushedAt)}</span>
        </div>
        {repo.topics.length > 0 ? (
          <ul className="flex flex-wrap gap-2" aria-label="Topics">
            {repo.topics.slice(0, 8).map((t) => (
              <li
                key={t}
                className="rounded-full border border-skills/30 bg-skills/10 px-2.5 py-0.5 text-xs font-medium text-card-subtitle dark:text-muted"
              >
                {t}
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
            Repository
          </Link>
          {repo.homepage ? (
            <Link
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
            >
              Website
            </Link>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
