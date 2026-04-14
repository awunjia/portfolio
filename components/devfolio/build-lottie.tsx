"use client";

/**
 * DeveloperFolio “build” animation (robot arms + UI blocks).
 * https://github.com/saadpasta/developerFolio/blob/master/src/containers/skillProgress/skillProgress.js
 */
import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import animationData from "@/assets/lottie/build.json";

export function BuildLottie() {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const inst = lottieRef.current;
    if (!inst) return;
    if (reduceMotion) {
      inst.pause();
    } else {
      inst.play();
    }
  }, [reduceMotion]);

  return (
    <div
      className="proficiency-lottie-wrap relative mx-auto w-full max-w-[min(100%,520px)] shrink-0 lg:mx-0 lg:ml-auto"
      aria-hidden
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        className="h-auto w-full max-h-[min(50vh,480px)] object-contain object-center lg:object-right"
      />
    </div>
  );
}
