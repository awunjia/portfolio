import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/base-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const paths = [
    "",
    "/about",
    "/education",
    "/skills",
    "/projects",
    "/open-source",
    "/contact",
    "/legal/cookies",
    "/legal/privacy",
    "/legal/terms",
  ] as const;

  return paths.map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
