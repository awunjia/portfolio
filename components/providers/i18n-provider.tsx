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
import { usePathname, useRouter } from "next/navigation";
import { useCookieConsent } from "@/components/providers/cookie-consent-provider";
import { clearLocaleCookie } from "@/lib/cookies/consent";
import { dictionaries } from "@/lib/i18n/dictionaries";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  type Locale,
} from "@/lib/i18n/locale";
import { replaceLocaleInPathname } from "@/lib/i18n/paths";
import { htmlLangAttribute } from "@/lib/i18n/seo-locale";

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

type I18nProviderProps = {
  children: ReactNode;
  /** Locale from the `/[locale]/...` route (source of truth). */
  locale: Locale;
};

export function I18nProvider({
  children,
  locale: localeFromRoute,
}: I18nProviderProps) {
  const { preferencesEnabled } = useCookieConsent();
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>(localeFromRoute);

  useEffect(() => {
    setLocaleState(localeFromRoute);
    document.documentElement.lang = htmlLangAttribute(localeFromRoute);
  }, [localeFromRoute]);

  const setLocale = useCallback(
    (next: Locale) => {
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
      document.documentElement.lang = htmlLangAttribute(next);
      setLocaleState(next);
      const target = replaceLocaleInPathname(pathname || `/${DEFAULT_LOCALE}`, next);
      if (target !== pathname) {
        router.push(target);
      }
    },
    [pathname, preferencesEnabled, router],
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
