"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import animationData from "@/assets/lottie/skills-hero-stacks.json";

/**
 * Interlocking gears - “stack” / engineering layers metaphor.
 * From xvrh/lottie-flutter examples (`gears.json`); fills mapped to `--accent` / `--skills`.
 */
export function SkillsHeroLottie() {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const inst = lottieRef.current;
    if (!inst) return;
    if (reduceMotion) inst.pause();
    else inst.play();
  }, [reduceMotion]);

  return (
    <div
      className="relative w-full max-w-[min(100%,280px)] rounded-2xl border border-border bg-surface p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none sm:max-w-[min(100%,320px)]"
      aria-hidden
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        className="mx-auto h-auto w-full max-h-[min(40vw,220px)] object-contain sm:max-h-[260px]"
      />
    </div>
  );
}
