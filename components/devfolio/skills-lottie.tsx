"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import { LottieLoadStage } from "@/components/lottie/lottie-load-stage";
import { useJsonLottieLoaded } from "@/components/lottie/json-lottie-utils";
import animationData from "@/assets/lottie/codingPerson.json";

export function SkillsLottie() {
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
      className="skills-image-div relative mx-auto w-full max-w-[min(100%,480px)] shrink-0 lg:mx-0"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        onDOMLoaded={onDOMLoaded}
        onEnterFrame={onEnterFrame}
        onDataReady={onDataReady}
        className="mx-auto h-auto w-full max-h-[min(52vh,480px)] object-contain"
      />
    </LottieLoadStage>
  );
}
