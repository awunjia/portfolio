import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/base-url";

/**
 * Crawl policy: index public pages; keep APIs private.
 * Explicit allow for major search + answer-engine bots (AEO).
 */
export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();
  const disallowApi = ["/api/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowApi,
      },
      // Search
      { userAgent: "Googlebot", allow: "/", disallow: disallowApi },
      { userAgent: "Bingbot", allow: "/", disallow: disallowApi },
      // Answer / AI assistants (AEO) - welcome citation of public pages
      { userAgent: "GPTBot", allow: "/", disallow: disallowApi },
      { userAgent: "ChatGPT-User", allow: "/", disallow: disallowApi },
      { userAgent: "Google-Extended", allow: "/", disallow: disallowApi },
      { userAgent: "ClaudeBot", allow: "/", disallow: disallowApi },
      { userAgent: "anthropic-ai", allow: "/", disallow: disallowApi },
      { userAgent: "PerplexityBot", allow: "/", disallow: disallowApi },
      { userAgent: "Applebot-Extended", allow: "/", disallow: disallowApi },
      { userAgent: "Bytespider", allow: "/", disallow: disallowApi },
      { userAgent: "CCBot", allow: "/", disallow: disallowApi },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ""),
  };
}
