"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clearPreferenceStorage,
  defaultConsentPayload,
  readConsentCookieFromDocument,
  writeConsentCookie,
  type ConsentPayload,
} from "@/lib/cookies/consent";

function migrateOrphanPreferences(): void {
  if (typeof document === "undefined") return;
  if (readConsentCookieFromDocument()) return;
  clearPreferenceStorage();
}

type CookieConsentContextValue = {
  /** True after reading document cookie (client). */
  hydrated: boolean;
  /** Parsed consent from cookie, or null if no valid record. */
  consent: ConsentPayload | null;
  preferencesEnabled: boolean;
  statisticsEnabled: boolean;
  /** User has not yet accepted or rejected (hydrated and no cookie). */
  needsChoice: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  saveCustom: (preferences: boolean, statistics: boolean) => void;
  openSettings: () => void;
  closeSettings: () => void;
  settingsOpen: boolean;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [consent, setConsent] = useState<ConsentPayload | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useLayoutEffect(() => {
    migrateOrphanPreferences();
    setConsent(readConsentCookieFromDocument());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: ConsentPayload) => {
    writeConsentCookie(next);
    setConsent(next);
  }, []);

  const acceptAll = useCallback(() => {
    persist(defaultConsentPayload({ p: true, s: true }));
    setSettingsOpen(false);
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    clearPreferenceStorage();
    persist(defaultConsentPayload({ p: false, s: false }));
    setSettingsOpen(false);
  }, [persist]);

  const saveCustom = useCallback(
    (preferences: boolean, statistics: boolean) => {
      if (!preferences) {
        clearPreferenceStorage();
      }
      persist(defaultConsentPayload({ p: preferences, s: statistics }));
      setSettingsOpen(false);
    },
    [persist],
  );

  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  const preferencesEnabled = Boolean(consent?.p);
  const statisticsEnabled = Boolean(consent?.s);
  const needsChoice = hydrated && consent === null;

  const value = useMemo(
    () => ({
      hydrated,
      consent,
      preferencesEnabled,
      statisticsEnabled,
      needsChoice,
      acceptAll,
      rejectNonEssential,
      saveCustom,
      openSettings,
      closeSettings,
      settingsOpen,
    }),
    [
      hydrated,
      consent,
      preferencesEnabled,
      statisticsEnabled,
      needsChoice,
      acceptAll,
      rejectNonEssential,
      saveCustom,
      openSettings,
      closeSettings,
      settingsOpen,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
  );
}
