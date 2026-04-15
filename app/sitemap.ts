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

  return paths.map((path) => {
    const url = `${base}${path || "/"}`;
    const isHome = path === "";
    const isContact = path === "/contact";
    const isLegal = path.startsWith("/legal/");
    return {
      url,
      lastModified: new Date(),
      changeFrequency: isHome ? "weekly" : isContact ? "monthly" : isLegal ? "yearly" : "monthly",
      priority: isHome ? 1 : isContact ? 0.85 : isLegal ? 0.35 : 0.75,
    };
  });
}
