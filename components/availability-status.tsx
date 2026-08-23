"use client";

import { useReducedMotion } from "framer-motion";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { LocaleLink } from "@/components/locale-link";
import { useI18n } from "@/components/providers/i18n-provider";
import { isAvailableForWork } from "@/lib/available-for-work";

export function AvailabilityStatus() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  const available = isAvailableForWork();

  return (
    <div
      className="flex w-full items-center gap-2.5 rounded-md border border-border/80 bg-surface/80 px-3 py-1.5"
      role="status"
      aria-live="polite"
    >
      <span className="relative flex size-2.5 shrink-0" aria-hidden>
        {available && !reduceMotion ? (
          <span className="availability-ping absolute inline-flex size-full rounded-full bg-emerald-500 opacity-75" />
        ) : null}
        <span
          className={`relative inline-flex size-2.5 rounded-full ${
            available ? "bg-emerald-500" : "bg-red-500"
          }`}
        />
      </span>
      <span
        className={`text-sm font-medium ${
          available ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"
        }`}
      >
        {available ? t("home.statusAvailable") : t("home.statusUnavailable")}
      </span>
      <LocaleLink
        href="/contact"
        className="ml-auto text-muted transition-colors hover:text-accent"
        aria-label={t("nav.contact")}
      >
        <HiOutlineChatBubbleLeftRight className="size-4" aria-hidden />
      </LocaleLink>
    </div>
  );
}
