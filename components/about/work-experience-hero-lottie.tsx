"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import animationData from "@/assets/lottie/work-experience.json";

/**
 * Developer at a desk with code on screen (notebook, desk, coffee) — fits “work experience”.
 * Fill / gradient colors are remapped to `--accent` / `--skills` (see `globals.css`).
 * Based on a LottieFiles community asset (Lottie Simple License: https://lottiefiles.com/license).
 */
export function WorkExperienceHeroLottie() {
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
      className="relative flex w-full max-w-[min(100%,480px)] justify-center"
      aria-hidden
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        className="mx-auto h-auto w-full max-h-[min(30vh,220px)] object-contain sm:max-h-[min(36vh,280px)] lg:max-h-[min(42vh,320px)]"
      />
    </div>
  );
}
