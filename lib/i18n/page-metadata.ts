import type { Metadata } from "next";
import { cookies } from "next/headers";
import { siteConfig } from "@/config/site";
import { getBaseUrl } from "@/lib/base-url";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { isLocale, LOCALE_STORAGE_KEY, type Locale } from "@/lib/i18n/locale";
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

async function readLocaleForMetadata(): Promise<Locale> {
  const jar = await cookies();
  const raw = jar.get(LOCALE_STORAGE_KEY)?.value;
  return isLocale(raw) ? raw : "en";
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
  path: string;
  /** When set, Open Graph `description` uses this key instead of the main description. */
  ogDescriptionKey?: string;
  /** Comma/semicolon-separated extra keywords (merged with site + `meta.keywords`). */
  extraVars?: Record<string, string>;
}): Promise<Metadata> {
  const locale = await readLocaleForMetadata();
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

  const canonical = absoluteUrl(opts.path);
  const brandedSocialTitle = `${sectionTitle} | ${siteConfig.fullName}`;
  const ogImage = defaultOgImage();
  const isHome = opts.path === "/" || opts.path === "";

  return {
    // Root `app/page.tsx` does not reliably inherit `title.template` from the layout; `absolute` fixes the document title.
    title: isHome ? { absolute: brandedSocialTitle } : sectionTitle,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        "x-default": canonical,
      },
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      alternateLocale: openGraphAlternateLocales(locale),
      url: canonical,
      siteName: siteConfig.fullName,
      title: brandedSocialTitle,
      description: ogDescription,
      images: [
        {
          url: ogImage,
          alt: siteConfig.fullName,
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
