import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getBaseUrl } from "@/lib/base-url";
import { dictionaries } from "@/lib/i18n/dictionaries";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type Locale,
} from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/paths";
import { OG_LOCALE, openGraphAlternateLocales } from "@/lib/i18n/seo-locale";
import { siteMetaKeywords } from "@/lib/seo";

function t(locale: Locale, key: string): string {
  const pack = dictionaries[locale] ?? dictionaries.en;
  return pack[key] ?? dictionaries.en[key] ?? key;
}

function fill(template: string, vars: Record<string, string>): string {
  let out = template;
  for (const [k, v] of Object.entries(vars)) {
    out = out.split(`{${k}}`).join(v);
  }
  return out;
}

function parseKeywordCsv(raw: string): string[] {
  return raw
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function absoluteUrl(path: string): string {
  const base = getBaseUrl();
  if (path === "/" || path === "") return `${base}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

function defaultOgImage(): string {
  return new URL(siteConfig.profile.avatarSrc, `${getBaseUrl()}/`).toString();
}

export async function buildLocaleMetadata(opts: {
  titleKey: string;
  descriptionKey: string;
  /** Locale-agnostic path, e.g. `/contact` or `/` */
  path: string;
  locale: Locale;
  /** When set, Open Graph `description` uses this key instead of the main description. */
  ogDescriptionKey?: string;
  extraVars?: Record<string, string>;
}): Promise<Metadata> {
  const locale = opts.locale;
  const sectionTitle = t(locale, opts.titleKey);
  const vars: Record<string, string> = {
    name: siteConfig.fullName,
    role: t(locale, "home.role"),
    tagline: t(locale, "home.tagline"),
    degree: t(locale, "profile.degreeLine"),
    school: siteConfig.school,
    bio: t(locale, "about.bio"),
    handle: `@${siteConfig.githubUsername}`,
    hiringPhrase: t(locale, "seo.hiringMetaLine"),
    ...opts.extraVars,
  };
  const legal = opts.path.startsWith("/legal");
  const baseDescription = fill(t(locale, opts.descriptionKey), vars);
  const hiringSuffix = legal ? "" : ` ${vars.hiringPhrase}`;
  const description = `${baseDescription}${hiringSuffix}`.trim();
  const ogDescription = opts.ogDescriptionKey
    ? `${fill(t(locale, opts.ogDescriptionKey), vars)}${hiringSuffix}`.trim()
    : description;

  const keywordsCsv = fill(t(locale, "meta.keywords"), vars);
  const keywords = [
    ...new Set([...parseKeywordCsv(keywordsCsv), ...siteMetaKeywords()]),
  ];

  const localized = localizedPath(locale, opts.path);
  const canonical = absoluteUrl(localized);
  const brandedSocialTitle = `${sectionTitle} | ${siteConfig.fullName}`;
  const ogImage = defaultOgImage();
  const isHome = opts.path === "/" || opts.path === "";

  const languages: Record<string, string> = {
    "x-default": absoluteUrl(localizedPath(DEFAULT_LOCALE, opts.path)),
  };
  for (const loc of SUPPORTED_LOCALES) {
    languages[loc] = absoluteUrl(localizedPath(loc, opts.path));
  }

  return {
    title: isHome ? { absolute: brandedSocialTitle } : sectionTitle,
    description,
    keywords,
    alternates: {
      canonical,
      languages,
      types: {
        "text/plain": [{ url: absoluteUrl("/llms.txt"), title: "llms.txt" }],
      },
    },
    openGraph: {
      type: isHome ? "profile" : "website",
      locale: OG_LOCALE[locale],
      alternateLocale: openGraphAlternateLocales(locale),
      url: canonical,
      siteName: siteConfig.fullName,
      title: brandedSocialTitle,
      description: ogDescription,
      images: [
        {
          url: ogImage,
          alt: `${siteConfig.fullName} portrait`,
          width: 880,
          height: 880,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedSocialTitle,
      description: ogDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
