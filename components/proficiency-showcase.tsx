"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/components/providers/i18n-provider";

const BuildLottie = dynamic(
  () => import("@/components/devfolio/build-lottie").then((m) => ({ default: m.BuildLottie })),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[min(52vh,480px)] w-full max-w-[min(100%,420px)] animate-pulse rounded-2xl bg-muted/25"
        aria-hidden
      />
    ),
  },
);

/** Uses `--skills` (theme purple / pink-magenta accent) */
const fillClass = "bg-skills";

type ProficiencyMeterRowProps = {
  label: string;
  percentage: number;
  index: number;
  reduceMotion: boolean | null;
};

/**
 * Observe the full-width track for in-view, not the fill: the fill starts at
 * width 0 so IntersectionObserver often never fires on it and the bar stays empty.
 */
function ProficiencyMeterRow({
  label,
  percentage,
  index,
  reduceMotion,
}: ProficiencyMeterRowProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(trackRef, { once: true, margin: "-60px" });

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between gap-4">
        <p className="min-w-0 text-base font-medium text-foreground sm:text-lg">{label}</p>
        <p className="shrink-0 text-sm font-semibold tabular-nums text-foreground sm:text-base">
          {percentage}%
        </p>
      </div>
      <div
        ref={trackRef}
        className="h-5 w-full overflow-hidden rounded-full border border-border bg-[rgb(243,239,239)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:border-white/20 dark:bg-white/95 dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)]"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${percentage}%`}
      >
        {reduceMotion ? (
          <div
            className={`h-full rounded-l-full rounded-r-md ${fillClass}`}
            style={{ width: `${percentage}%` }}
          />
        ) : (
          <motion.div
            className={`h-full rounded-l-full rounded-r-md ${fillClass}`}
            initial={{ width: 0, opacity: 0.9 }}
            animate={
              isInView ? { width: `${percentage}%`, opacity: 1 } : { width: 0, opacity: 0.9 }
            }
            transition={{
              duration: 0.85,
              delay: 0.12 * index,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        )}
      </div>
    </div>
  );
}

export function ProficiencyShowcase() {
  const reduceMotion = useReducedMotion();
  const { t } = useI18n();
  const items = siteConfig.proficiency;

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="min-w-0 space-y-4 lg:col-span-8">
        {items.map((skill, index) => {
          const label = t(`home.proficiency.${skill.i18nKey}`);
          return (
            <ProficiencyMeterRow
              key={skill.i18nKey}
              label={label}
              percentage={skill.percentage}
              index={index}
              reduceMotion={reduceMotion}
            />
          );
        })}
      </div>
      <div className="flex justify-center lg:col-span-4 lg:justify-end">
        <BuildLottie />
      </div>
    </div>
  );
}
