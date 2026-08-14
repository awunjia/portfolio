"use client";

import { useEffect } from "react";

/** Syncs `document.documentElement.lang` for the active locale route. */
export function LocaleHtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}
