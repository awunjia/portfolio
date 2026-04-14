import { siteConfig } from "@/config/site";

export type GitHubRepoPublic = {
  name: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  pushedAt: string;
  isFork: boolean;
  archived: boolean;
  homepage: string | null;
};

export type GitHubReposResult =
  | { ok: true; repos: GitHubRepoPublic[] }
  | {
      ok: false;
      repos: GitHubRepoPublic[];
      error: string;
      status?: number;
    };

type GitHubApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  pushed_at: string;
  homepage: string | null;
};

function normalize(repo: GitHubApiRepo): GitHubRepoPublic {
  return {
    name: repo.name,
    description: repo.description,
    htmlUrl: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    topics: Array.isArray(repo.topics) ? repo.topics : [],
    pushedAt: repo.pushed_at,
    isFork: repo.fork,
    archived: repo.archived,
    homepage: repo.homepage?.trim() ? repo.homepage.trim() : null,
  };
}

/**
 * Fetches public repositories for `siteConfig.githubUsername`.
 * Optional `GITHUB_TOKEN` increases rate limits (recommended in production).
 */
export async function getGitHubRepos(): Promise<GitHubReposResult> {
  const username = siteConfig.githubUsername.trim();
  if (!username) {
    return {
      ok: false,
      repos: [],
      error: "GitHub username is missing in site config - add it when you have a moment.",
    };
  }

  const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&type=all`;

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const token = process.env.GITHUB_TOKEN?.trim();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(url, {
      headers,
      next: { revalidate: 900 },
    });
  } catch {
    return {
      ok: false,
      repos: [],
      error: "GitHub could not be reached just now - the network may be having a quiet moment.",
    };
  }

  if (res.status === 403) {
    const body = (await res.json().catch(() => null)) as {
      message?: string;
    } | null;
    const msg = body?.message ?? "GitHub declined this request.";
    return {
      ok: false,
      repos: [],
      error: `${msg} A GITHUB_TOKEN usually helps if you are bumping into rate limits.`,
      status: 403,
    };
  }

  if (res.status === 404) {
    return {
      ok: false,
      repos: [],
      error: `GitHub user "${username}" was not found - double-check the username.`,
      status: 404,
    };
  }

  if (!res.ok) {
    return {
      ok: false,
      repos: [],
      error: `GitHub returned an unexpected status (${res.status}) - try again later.`,
      status: res.status,
    };
  }

  const raw = (await res.json()) as unknown;
  if (!Array.isArray(raw)) {
    return {
      ok: false,
      repos: [],
      error: "GitHub sent back something unexpected - a refresh might help.",
    };
  }

  const repos = raw
    .filter((r): r is GitHubApiRepo => r !== null && typeof r === "object" && "name" in r)
    .map(normalize);

  return { ok: true, repos };
}
