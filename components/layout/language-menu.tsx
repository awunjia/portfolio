"use client";

import { useEffect, useRef, useState } from "react";
import { HiOutlineCheck, HiOutlineChevronDown, HiOutlineLanguage } from "react-icons/hi2";
import { useI18n } from "@/components/providers/i18n-provider";
import { LOCALE_ENDONYM, type Locale } from "@/lib/i18n/locale";

const LANGUAGES: readonly Locale[] = ["en", "fi", "sv", "da"] as const;

export function LanguageMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const { locale, setLocale, t } = useI18n();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, [open]);

  return (
    <div className="relative ms-3" ref={rootRef}>
      <button
        type="button"
        className="inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-lg border border-border px-2 text-foreground transition-colors hover:bg-header-hover dark:hover:bg-accent/20 dark:hover:text-white"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="language-menu-list"
        aria-label={t("lang.menu")}
        onClick={() => setOpen((v) => !v)}
      >
        <HiOutlineLanguage className="size-[1.125rem] shrink-0" aria-hidden />
        <HiOutlineChevronDown
          className={`size-3 shrink-0 opacity-80 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div
          id="language-menu-list"
          role="menu"
          aria-label={t("lang.menu")}
          className="absolute right-0 z-[60] mt-2 min-w-[11rem] rounded-lg border border-border bg-surface py-1 shadow-lg dark:border-white/10 dark:bg-[#1e2436]"
        >
          {LANGUAGES.map((id) => (
            <button
              key={id}
              type="button"
              role="menuitem"
              onClick={() => {
                setLocale(id);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-header-hover dark:hover:bg-white/10 ${
                locale === id
                  ? "font-semibold text-accent dark:text-white"
                  : "text-foreground"
              }`}
            >
              <span className="flex w-4 shrink-0 justify-center" aria-hidden>
                {locale === id ? (
                  <HiOutlineCheck className="size-4 text-accent dark:text-white" />
                ) : null}
              </span>
              {LOCALE_ENDONYM[id]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
