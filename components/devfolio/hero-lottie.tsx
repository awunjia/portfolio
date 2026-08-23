"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import { LottieLoadStage } from "@/components/lottie/lottie-load-stage";
import { useJsonLottieLoaded } from "@/components/lottie/json-lottie-utils";
import animationData from "@/assets/lottie/landingPerson.json";

/**
 * Same hero animation asset as DeveloperFolio (landingPerson.json) + lottie-react.
 * https://github.com/saadpasta/developerFolio/blob/master/src/containers/greeting/Greeting.js
 */
export function HeroLottie() {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const reduceMotion = useReducedMotion();
  const { loaded, onDOMLoaded, onEnterFrame, onDataReady } = useJsonLottieLoaded(650);

  useEffect(() => {
    const inst = lottieRef.current;
    if (!inst) return;
    if (reduceMotion) inst.pause();
    else inst.play();
  }, [reduceMotion, loaded]);

  return (
    <LottieLoadStage
      loaded={loaded}
      minHeightClass="min-h-[min(50vh,520px)]"
      className="greeting-image-div relative mx-auto w-full max-w-[420px] shrink-0 lg:mx-0 lg:max-w-[min(34vw,400px)]"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        onDOMLoaded={onDOMLoaded}
        onEnterFrame={onEnterFrame}
        onDataReady={onDataReady}
        className="h-auto w-full max-h-[min(50vh,520px)] object-contain"
      />
    </LottieLoadStage>
  );
}
