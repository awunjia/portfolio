export type Locale = "en" | "fi" | "sv" | "fr" | "da";

export const LOCALE_STORAGE_KEY = "portfolio-locale";

export const DEFAULT_LOCALE: Locale = "en";

/** Menu order: English, Finnish, Swedish, French, Danish. */
export const SUPPORTED_LOCALES: readonly Locale[] = ["en", "fi", "sv", "fr", "da"] as const;

/** Language name in that language - used in the picker regardless of UI locale. */
export const LOCALE_ENDONYM: Record<Locale, string> = {
  en: "English",
  fi: "Suomi",
  sv: "Svenska",
  fr: "Français",
  da: "Dansk",
};

export function isLocale(value: string | null | undefined): value is Locale {
  return (
    value === "en" ||
    value === "fi" ||
    value === "sv" ||
    value === "fr" ||
    value === "da"
  );
}

/** Map BCP47 / raw navigator value to a supported locale (default English). */
export function normalizeLocale(raw: string | null | undefined): Locale {
  const base = raw?.split("-")[0]?.toLowerCase();
  if (base === "fi" || base === "sv" || base === "fr" || base === "da") return base;
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
    if (n === "fi" || n === "sv" || n === "fr" || n === "da") return n;
  }
  return "en";
}

/** Parse Accept-Language header into a supported locale. */
export function detectLocaleFromAcceptLanguage(
  header: string | null | undefined,
): Locale {
  if (!header) return DEFAULT_LOCALE;
  const parts = header.split(",").map((p) => p.trim().split(";")[0] ?? "");
  for (const raw of parts) {
    const n = normalizeLocale(raw);
    if (n === "fi" || n === "sv" || n === "fr" || n === "da") return n;
  }
  for (const raw of parts) {
    if (/^en\b/i.test(raw.trim())) return DEFAULT_LOCALE;
  }
  return DEFAULT_LOCALE;
}
