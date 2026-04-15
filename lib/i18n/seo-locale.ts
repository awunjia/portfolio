import type { Locale } from "@/lib/i18n/locale";
import { SUPPORTED_LOCALES } from "@/lib/i18n/locale";

/** Open Graph `locale` values aligned with site languages. */
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  fi: "fi_FI",
  sv: "sv_SE",
  da: "da_DK",
};

export function openGraphAlternateLocales(locale: Locale): string[] {
  return SUPPORTED_LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]);
}

/** HTML document `lang` (BCP 47). */
export function htmlLangAttribute(locale: Locale): string {
  if (locale === "fi") return "fi";
  if (locale === "sv") return "sv";
  if (locale === "da") return "da";
  return "en";
}
