"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import animationData from "@/assets/lottie/open-source-hero.json";

/**
 * Browser window with animated “code lines” — public repos / reading source on the web.
 * From LottieFiles samples via xvrh/lottie-flutter (`browser.json`); fills mapped to `--accent` / `--skills`.
 */
export function OpenSourceHeroLottie() {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const inst = lottieRef.current;
    if (!inst) return;
    if (reduceMotion) inst.pause();
    else inst.play();
  }, [reduceMotion]);

  return (
    <div className="relative mx-auto w-full max-w-[min(100%,320px)]" aria-hidden>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        className="mx-auto h-auto w-full max-h-[min(22vh,160px)] object-contain sm:max-h-[min(26vh,200px)]"
      />
    </div>
  );
}
