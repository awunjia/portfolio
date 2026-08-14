import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  detectLocaleFromAcceptLanguage,
  isLocale,
  type Locale,
} from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/paths";

const PUBLIC_FILE = /\.(.*)$/;

function preferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_STORAGE_KEY)?.value;
  if (isLocale(cookie)) return cookie;
  return detectLocaleFromAcceptLanguage(
    request.headers.get("accept-language"),
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/.well-known") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt" ||
    pathname === "/llms.txt" ||
    pathname === "/favicon.ico" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && isLocale(first)) {
    return NextResponse.next();
  }

  // Bare path without locale (e.g. /contact) → /{locale}/contact
  const locale = preferredLocale(request);
  const barePath =
    segments.length === 0 ? "/" : `/${segments.join("/")}`;
  const url = request.nextUrl.clone();
  url.pathname = localizedPath(locale, barePath);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
