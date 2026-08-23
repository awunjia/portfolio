import { getBaseUrl } from "@/lib/base-url";

export type SiteRouteKind = "home" | "primary" | "contact" | "legal";

export type SiteRoute = {
  /** Path without origin; empty string = home */
  path: string;
  kind: SiteRouteKind;
  /** Stable content revision date (YYYY-MM-DD) for sitemap lastmod */
  lastModified: string;
  /** Short label for humans / llms.txt */
  title: string;
  /** One-line summary for answer engines */
  summary: string;
};

/**
 * Canonical public HTML routes for sitemap.xml, robots, and llms.txt.
 * Keep in sync when adding pages.
 */
export const SITE_ROUTES: readonly SiteRoute[] = [
  {
    path: "",
    kind: "home",
    lastModified: "2026-08-14",
    title: "Home",
    summary:
      "Overview of Awunjia Serge - full-stack software engineer in Helsinki, stack highlights, and contact CTAs.",
  },
  {
    path: "/background",
    kind: "primary",
    lastModified: "2026-08-23",
    title: "Background",
    summary:
      "Skills stacks by layer plus education (Novia UAS Information Technology, RFID thesis on Theseus, and prior studies).",
  },
  {
    path: "/projects",
    kind: "primary",
    lastModified: "2026-08-23",
    title: "My Work",
    summary:
      "Selected websites and products: personal portfolio, Aeco Limited, CurNext, AsaTek, SBO Tech internal RFID attendance, and smart-home stack.",
  },
  {
    path: "/about",
    kind: "primary",
    lastModified: "2026-08-14",
    title: "Work experience",
    summary:
      "Professional roles (newest first): Groweo, Sbotech, Aeco Limited, and Wicon Technologies.",
  },
  {
    path: "/contact",
    kind: "contact",
    lastModified: "2026-08-14",
    title: "Contact",
    summary:
      "Contact form and email for hiring, applications, and professional enquiries.",
  },
  {
    path: "/legal/cookies",
    kind: "legal",
    lastModified: "2026-08-14",
    title: "Cookie policy",
    summary: "How cookies and similar technologies are used on this site.",
  },
  {
    path: "/legal/privacy",
    kind: "legal",
    lastModified: "2026-08-14",
    title: "Privacy & GDPR",
    summary: "Personal data processing, GDPR rights, and contact for data requests.",
  },
  {
    path: "/legal/terms",
    kind: "legal",
    lastModified: "2026-08-14",
    title: "Terms of use",
    summary: "Terms governing use of this website and its contact features.",
  },
] as const;

export function absoluteSiteUrl(path: string): string {
  const base = getBaseUrl();
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function sitemapChangeFrequency(
  kind: SiteRouteKind,
): "weekly" | "monthly" | "yearly" {
  if (kind === "home") return "weekly";
  if (kind === "legal") return "yearly";
  return "monthly";
}

export function sitemapPriority(kind: SiteRouteKind): number {
  if (kind === "home") return 1;
  if (kind === "contact") return 0.9;
  if (kind === "legal") return 0.3;
  return 0.8;
}
