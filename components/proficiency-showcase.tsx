"use client";

import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { BuildLottie } from "@/components/devfolio/build-lottie";
import { useI18n } from "@/components/providers/i18n-provider";

/** Uses `--skills` (theme purple / pink-magenta accent) */
const fillClass = "bg-skills";

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
            <div key={skill.i18nKey}>
              <div className="mb-1 flex items-baseline justify-between gap-4">
                <p className="min-w-0 text-base font-medium text-foreground sm:text-lg">
                  {label}
                </p>
                <p className="shrink-0 text-sm font-semibold tabular-nums text-foreground sm:text-base">
                  {skill.percentage}%
                </p>
              </div>
              <div
                className="h-5 w-full overflow-hidden rounded-full border border-border bg-[rgb(243,239,239)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] dark:border-white/20 dark:bg-white/95 dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)]"
                role="progressbar"
                aria-valuenow={skill.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${label}: ${skill.percentage}%`}
              >
                {reduceMotion ? (
                  <div
                    className={`h-full rounded-l-full rounded-r-md ${fillClass}`}
                    style={{ width: `${skill.percentage}%` }}
                  />
                ) : (
                  <motion.div
                    className={`h-full rounded-l-full rounded-r-md ${fillClass}`}
                    initial={{ width: 0, opacity: 0.9 }}
                    whileInView={{
                      width: `${skill.percentage}%`,
                      opacity: 1,
                    }}
                    viewport={{ once: true, margin: "-60px" }}
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
        })}
      </div>
      <div className="flex justify-center lg:col-span-4 lg:justify-end">
        <BuildLottie />
      </div>
    </div>
  );
}
