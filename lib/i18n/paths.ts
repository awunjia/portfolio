import {
  SUPPORTED_LOCALES,
  isLocale,
  type Locale,
} from "@/lib/i18n/locale";

/** Join locale + app path → `/en/contact` or `/en` for home. */
export function localizedPath(locale: Locale, path: string = "/"): string {
  const normalized =
    !path || path === "/"
      ? ""
      : path.startsWith("/")
        ? path.replace(/\/+$/, "")
        : `/${path.replace(/\/+$/, "")}`;
  return normalized ? `/${locale}${normalized}` : `/${locale}`;
}

/**
 * Strip a leading locale segment from a pathname.
 * `/en/contact` → `/contact`; `/fr` → `/`; unknown → pathname unchanged (normalized).
 */
export function stripLocaleFromPathname(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  if (!isLocale(parts[0])) {
    const joined = `/${parts.join("/")}`;
    return joined || "/";
  }
  const rest = parts.slice(1);
  if (rest.length === 0) return "/";
  return `/${rest.join("/")}`;
}

/** First path segment if it is a supported locale. */
export function localeFromPathname(pathname: string): Locale | null {
  const first = pathname.split("/").filter(Boolean)[0];
  return isLocale(first) ? first : null;
}

/** Replace locale in pathname, preserving the rest of the path. */
export function replaceLocaleInPathname(
  pathname: string,
  nextLocale: Locale,
): string {
  const bare = stripLocaleFromPathname(pathname);
  return localizedPath(nextLocale, bare);
}

export function isSupportedLocaleSegment(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}
