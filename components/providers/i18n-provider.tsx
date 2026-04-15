"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useCookieConsent } from "@/components/providers/cookie-consent-provider";
import { clearLocaleCookie } from "@/lib/cookies/consent";
import { dictionaries } from "@/lib/i18n/dictionaries";
import {
  LOCALE_STORAGE_KEY,
  detectBrowserLocale,
  isLocale,
  type Locale,
} from "@/lib/i18n/locale";

type I18nContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}

function readPersistedLocale(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(raw)) return raw;
  } catch {
    /* ignore */
  }
  return null;
}

function htmlLangFor(locale: Locale): string {
  if (locale === "fi") return "fi";
  if (locale === "sv") return "sv";
  if (locale === "da") return "da";
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const { hydrated, preferencesEnabled, consent } = useCookieConsent();
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    if (!hydrated) return;
    if (preferencesEnabled) {
      const stored = readPersistedLocale();
      const next = stored ?? detectBrowserLocale();
      setLocaleState(next);
      try {
        document.cookie = `${LOCALE_STORAGE_KEY}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
      } catch {
        /* ignore */
      }
      document.documentElement.lang = htmlLangFor(next);
    } else {
      const next = detectBrowserLocale();
      setLocaleState(next);
      clearLocaleCookie();
      document.documentElement.lang = htmlLangFor(next);
    }
  }, [hydrated, preferencesEnabled, consent?.at]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      if (preferencesEnabled) {
        try {
          localStorage.setItem(LOCALE_STORAGE_KEY, next);
        } catch {
          /* ignore */
        }
        try {
          document.cookie = `${LOCALE_STORAGE_KEY}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
        } catch {
          /* ignore */
        }
      } else {
        clearLocaleCookie();
      }
      document.documentElement.lang = htmlLangFor(next);
    },
    [preferencesEnabled],
  );

  const t = useCallback(
    (key: string) => {
      const pack = dictionaries[locale] ?? dictionaries.en;
      const fallback = dictionaries.en;
      return pack[key] ?? fallback[key] ?? key;
    },
    [locale],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
