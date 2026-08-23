"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import { LottieLoadStage } from "@/components/lottie/lottie-load-stage";
import { useJsonLottieLoaded } from "@/components/lottie/json-lottie-utils";
import animationData from "@/assets/lottie/build.json";

export function BuildLottie() {
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
      className="proficiency-lottie-wrap relative mx-auto w-full max-w-[min(100%,520px)] shrink-0 lg:mx-0 lg:ml-auto"
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
