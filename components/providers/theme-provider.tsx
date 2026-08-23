"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";
import { useCookieConsent } from "@/components/providers/cookie-consent-provider";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { hydrated, preferencesEnabled } = useCookieConsent();
  /** Without preference cookies, theme is not persisted - keep a fixed default. */
  const forceDefaultTheme = hydrated && !preferencesEnabled;

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      forcedTheme={forceDefaultTheme ? "dark" : undefined}
      storageKey="portfolio-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
