import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { SUPPORTED_LOCALES } from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/paths";
import {
  SITE_ROUTES,
  absoluteSiteUrl,
  sitemapChangeFrequency,
  sitemapPriority,
} from "@/lib/seo/site-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const portrait = absoluteSiteUrl(siteConfig.profile.avatarSrc);
  const entries: MetadataRoute.Sitemap = [];

  for (const route of SITE_ROUTES) {
    for (const locale of SUPPORTED_LOCALES) {
      const path = localizedPath(locale, route.path || "/");
      const entry: MetadataRoute.Sitemap[number] = {
        url: absoluteSiteUrl(path),
        lastModified: new Date(route.lastModified),
        changeFrequency: sitemapChangeFrequency(route.kind),
        priority: sitemapPriority(route.kind),
      };
      if (route.kind === "home" && locale === "en") {
        entry.images = [portrait];
      }
      entries.push(entry);
    }
  }

  return entries;
}
