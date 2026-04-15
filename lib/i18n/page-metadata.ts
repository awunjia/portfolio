import type { Metadata } from "next";
import { cookies } from "next/headers";
import { siteConfig } from "@/config/site";
import { dictionaries } from "@/lib/i18n/dictionaries";
import { isLocale, LOCALE_STORAGE_KEY, type Locale } from "@/lib/i18n/locale";

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

async function readLocaleForMetadata(): Promise<Locale> {
  const jar = await cookies();
  const raw = jar.get(LOCALE_STORAGE_KEY)?.value;
  return isLocale(raw) ? raw : "en";
}

export async function buildLocaleMetadata(opts: {
  titleKey: string;
  descriptionKey: string;
  path: string;
  /** When set, Open Graph `description` uses this key instead of the main description. */
  ogDescriptionKey?: string;
  extraVars?: Record<string, string>;
}): Promise<Metadata> {
  const locale = await readLocaleForMetadata();
  const title = t(locale, opts.titleKey);
  const vars: Record<string, string> = {
    name: siteConfig.fullName,
    role: t(locale, "home.role"),
    tagline: t(locale, "home.tagline"),
    degree: t(locale, "profile.degreeLine"),
    school: siteConfig.school,
    bio: t(locale, "about.bio"),
    handle: `@${siteConfig.githubUsername}`,
    ...opts.extraVars,
  };
  const description = fill(t(locale, opts.descriptionKey), vars);
  const ogDescription = opts.ogDescriptionKey
    ? fill(t(locale, opts.ogDescriptionKey), vars)
    : description;

  return {
    title,
    description,
    openGraph: {
      title: `${title} - ${siteConfig.fullName}`,
      description: ogDescription,
      url: opts.path,
    },
  };
}
