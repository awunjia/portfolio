"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import { LottieLoadStage } from "@/components/lottie/lottie-load-stage";
import { useJsonLottieLoaded } from "@/components/lottie/json-lottie-utils";
import animationData from "@/assets/lottie/work-experience.json";

export function WorkExperienceHeroLottie() {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const reduceMotion = useReducedMotion();
  const { loaded, onDOMLoaded, onEnterFrame, onDataReady } = useJsonLottieLoaded();

  useEffect(() => {
    const inst = lottieRef.current;
    if (!inst) return;
    if (reduceMotion) inst.pause();
    else inst.play();
  }, [reduceMotion, loaded]);

  return (
    <LottieLoadStage
      loaded={loaded}
      minHeightClass="min-h-[min(30vh,220px)] sm:min-h-[min(36vh,280px)] lg:min-h-[min(42vh,320px)]"
      className="relative flex w-full max-w-[min(100%,480px)] justify-center"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        onDOMLoaded={onDOMLoaded}
        onEnterFrame={onEnterFrame}
        onDataReady={onDataReady}
        className="mx-auto h-auto w-full max-h-[min(30vh,220px)] object-contain sm:max-h-[min(36vh,280px)] lg:max-h-[min(42vh,320px)]"
      />
    </LottieLoadStage>
  );
}
