"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import { LottieLoadStage } from "@/components/lottie/lottie-load-stage";
import { useJsonLottieLoaded } from "@/components/lottie/json-lottie-utils";
import animationData from "@/assets/lottie/contact-mail.json";

export function ContactHeroLottie() {
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
      minHeightClass="min-h-[min(38vh,280px)] sm:min-h-[min(42vh,320px)]"
      className="relative mx-auto mt-10 w-full max-w-[min(100%,520px)] sm:mt-12"
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        onDOMLoaded={onDOMLoaded}
        onEnterFrame={onEnterFrame}
        onDataReady={onDataReady}
        className="mx-auto h-auto w-full max-h-[min(38vh,280px)] object-contain sm:max-h-[min(42vh,320px)]"
      />
    </LottieLoadStage>
  );
}
