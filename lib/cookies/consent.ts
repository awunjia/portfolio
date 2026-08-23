import { LOCALE_STORAGE_KEY } from "@/lib/i18n/locale";

/**
 * GDPR-oriented consent record stored in a first-party cookie.
 * - `preferences`: theme, language persistence, and similar UX choices.
 * - `statistics`: optional analytics (reserved; not used on this site today).
 * Cloudflare Turnstile on the contact flow is documented as security / abuse
 * prevention (legitimate interests) and is not toggled off via this banner.
 */

export const CONSENT_COOKIE_NAME = "cc_consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

export type ConsentPayload = {
  v: number;
  /** Theme, saved language, etc. */
  p: boolean;
  /** Optional measurement (e.g. analytics) - reserved for future use */
  s: boolean;
  at: string;
};

export function defaultConsentPayload(overrides?: Partial<Pick<ConsentPayload, "p" | "s">>): ConsentPayload {
  return {
    v: CONSENT_VERSION,
    p: overrides?.p ?? false,
    s: overrides?.s ?? false,
    at: new Date().toISOString(),
  };
}

export function parseConsentCookie(raw: string | null | undefined): ConsentPayload | null {
  if (!raw?.trim()) return null;
  try {
    const decoded = decodeURIComponent(raw.trim());
    const data = JSON.parse(decoded) as ConsentPayload;
    if (data.v !== CONSENT_VERSION) return null;
    if (typeof data.p !== "boolean" || typeof data.s !== "boolean") return null;
    return data;
  } catch {
    return null;
  }
}

export function writeConsentCookie(payload: ConsentPayload): void {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(payload));
  const secure = typeof window !== "undefined" && window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

export function readConsentCookieFromDocument(): ConsentPayload | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE_NAME}=([^;]*)`));
  return parseConsentCookie(match?.[1] ? decodeURIComponent(match[1]) : null);
}

export function clearPreferenceStorage(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem("portfolio-theme");
    window.localStorage.removeItem("theme");
    window.localStorage.removeItem(LOCALE_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function clearLocaleCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_STORAGE_KEY}=; Path=/; Max-Age=0; SameSite=Lax`;
}
