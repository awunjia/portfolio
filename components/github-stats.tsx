import Link from "next/link";
import { siteConfig } from "@/config/site";

type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
};

async function fetchUser(username: string): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as GitHubUser;
  } catch {
    return null;
  }
}

export async function GitHubStats() {
  const username = siteConfig.githubUsername;
  const user = await fetchUser(username);
  if (!user) return null;

  return (
    <section
      id="github"
      className="scroll-mt-24 mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8"
      aria-label="GitHub statistics"
    >
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              GitHub at a glance
            </h2>
            <p className="mt-1 text-sm text-muted">
              Public counts for @{username}, cached for about an hour so the page
              stays snappy.
            </p>
          </div>
          <Link
            href={siteConfig.github}
            className="text-sm font-medium text-link underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open GitHub profile
          </Link>
        </div>
        <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat label="Public repositories" value={user.public_repos} />
          <Stat label="Followers" value={user.followers} />
          <Stat label="Following" value={user.following} />
        </dl>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-background px-4 py-3">
      <dt className="text-xs font-medium text-muted">
        {label}
      </dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums text-foreground">
        {value}
      </dd>
    </div>
  );
}
