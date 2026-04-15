"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";
import { useCookieConsent } from "@/components/providers/cookie-consent-provider";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { hydrated, preferencesEnabled } = useCookieConsent();
  const lockLight = hydrated && !preferencesEnabled;

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      forcedTheme={lockLight ? "light" : undefined}
      storageKey="portfolio-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
