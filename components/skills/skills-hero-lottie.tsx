"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import animationData from "@/assets/lottie/codingPerson.json";

/**
 * Developer typing at a desk (DeveloperFolio coding person).
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
      className="relative flex w-full max-w-[min(100%,280px)] justify-center sm:max-w-[min(100%,320px)]"
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
