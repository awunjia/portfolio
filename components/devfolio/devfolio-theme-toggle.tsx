"use client";

/**
 * Slider control matching DeveloperFolio ToggleSwitch
 * https://github.com/saadpasta/developerFolio/blob/master/src/components/ToggleSwitch/ToggleSwitch.scss
 */
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useCookieConsent } from "@/components/providers/cookie-consent-provider";
import { useI18n } from "@/components/providers/i18n-provider";

export function DevfolioThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const { t } = useI18n();
  const { preferencesEnabled } = useCookieConsent();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <label
      className={`relative inline-block h-[26px] w-[50px] shrink-0 ${preferencesEnabled ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
    >
      <span className="sr-only">{t("theme.toggle")}</span>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={isDark}
        onChange={() => setTheme(isDark ? "light" : "dark")}
        disabled={!mounted || !preferencesEnabled}
        title={preferencesEnabled ? undefined : t("cookies.themeLockedHint")}
      />
      <span
        className="absolute inset-0 rounded-full bg-neutral-300 ring-1 ring-black/[0.07] transition-colors duration-300 peer-checked:bg-neutral-600 peer-checked:ring-black/10 dark:bg-neutral-600 dark:ring-white/[0.08] dark:peer-checked:bg-neutral-800 dark:peer-checked:ring-white/[0.06] peer-focus-visible:ring-2 peer-focus-visible:ring-accent/40 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background dark:peer-focus-visible:ring-accent/50 dark:peer-focus-visible:ring-offset-[#171c28]"
        aria-hidden
      />
      <span
        className="absolute left-0 top-0 flex h-[26px] w-[28px] translate-x-0 items-center justify-center rounded-full bg-white text-neutral-700 shadow-sm ring-1 ring-black/12 transition-transform duration-300 peer-checked:translate-x-[22px] peer-checked:text-neutral-800 dark:bg-neutral-200 dark:ring-white/10 dark:peer-checked:bg-neutral-100 dark:peer-checked:ring-white/15"
        aria-hidden
      >
        {mounted ? (
          isDark ? (
            <HiOutlineMoon className="size-3.5 shrink-0" strokeWidth={2} />
          ) : (
            <HiOutlineSun className="size-3.5 shrink-0" strokeWidth={2} />
          )
        ) : null}
      </span>
    </label>
  );
}
