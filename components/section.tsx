"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type SectionProps = {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  /** `compact` = smaller title + semibold (skills / proficiency style) */
  titleSize?: "display" | "compact";
};

const titleDisplayClass =
  "text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl md:leading-[1.1] lg:text-[56px] lg:leading-[1.1]";

const titleCompactClass =
  "text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl md:leading-tight lg:text-[2.5rem] lg:leading-tight";

/**
 * Section titles: default `display` matches DeveloperFolio ~56px skills heading;
 * use `compact` for smaller, bolder headings.
 */
export function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
  titleSize = "display",
}: SectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className={`scroll-mt-24 mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 ${className}`}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-10 max-w-3xl">
          <h2
            id={id ? `${id}-heading` : undefined}
            className={`break-words ${
              titleSize === "compact" ? titleCompactClass : titleDisplayClass
            }`}
          >
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 max-w-2xl break-words text-sm leading-relaxed text-muted">
              {subtitle}
            </p>
          ) : null}
        </div>
        {children}
      </motion.div>
    </section>
  );
}
