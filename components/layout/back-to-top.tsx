"use client";

import { useCallback, useEffect, useState } from "react";
import { HiOutlineArrowUp } from "react-icons/hi2";
import { useI18n } from "@/components/providers/i18n-provider";

const SCROLL_THRESHOLD_PX = 400;

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTop = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={goTop}
      className="fixed bottom-6 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:right-6"
      aria-label={t("a11y.backToTop")}
    >
      <HiOutlineArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
