"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import { LottieLoadStage } from "@/components/lottie/lottie-load-stage";
import { useJsonLottieLoaded } from "@/components/lottie/json-lottie-utils";
import animationData from "@/assets/lottie/codingPerson.json";

export function SkillsHeroLottie() {
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
    <div
      className="relative flex w-full max-w-[min(100%,280px)] justify-center sm:max-w-[min(100%,320px)]"
      aria-hidden
    >
      <LottieLoadStage
        loaded={loaded}
        minHeightClass="min-h-[min(40vw,220px)] sm:min-h-[260px]"
        className="relative h-full w-full"
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop
          onDOMLoaded={onDOMLoaded}
          onEnterFrame={onEnterFrame}
          onDataReady={onDataReady}
          className="mx-auto h-auto w-full max-h-[min(40vw,220px)] object-contain sm:max-h-[260px]"
        />
      </LottieLoadStage>
    </div>
  );
}
