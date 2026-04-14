export type Locale = "en" | "fi" | "sv" | "da";

export const LOCALE_STORAGE_KEY = "portfolio-locale";

export const SUPPORTED_LOCALES: readonly Locale[] = ["en", "fi", "sv", "da"] as const;

/** Language name in that language - used in the picker regardless of UI locale. */
export const LOCALE_ENDONYM: Record<Locale, string> = {
  en: "English",
  fi: "Suomi",
  sv: "Svenska",
  da: "Dansk",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "fi" || value === "sv" || value === "da";
}

/** Map BCP47 / raw navigator value to a supported locale (default English). */
export function normalizeLocale(raw: string | null | undefined): Locale {
  const base = raw?.split("-")[0]?.toLowerCase();
  if (base === "fi" || base === "sv" || base === "da") return base;
  return "en";
}

/** First supported language in `navigator.languages`, else English. */
export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const list = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  for (const raw of list) {
    const n = normalizeLocale(raw);
    if (n === "fi" || n === "sv" || n === "da") return n;
  }
  return "en";
}
