"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/components/providers/i18n-provider";

const REASON_KEYS = [
  "ownership",
  "fullstack",
  "shipping",
  "communication",
  "contractTeam",
  "homeOffice",
] as const;


export function WhyHireMe() {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  return (
    <ol
      className="grid min-w-0 grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2"
      aria-label={t("home.whyHire.aria")}
    >
      {REASON_KEYS.map((key, index) => (
        <motion.li
          key={key}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-24px" }}
          transition={{
            duration: 0.4,
            delay: reduceMotion ? 0 : index * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="min-w-0 border-l-2 border-accent/40 pl-4"
        >
          <p className="text-xs font-semibold tracking-wide text-accent">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 text-base font-semibold tracking-tight text-foreground sm:text-lg">
            {t(`home.whyHire.${key}.title`)}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {t(`home.whyHire.${key}.body`)}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
