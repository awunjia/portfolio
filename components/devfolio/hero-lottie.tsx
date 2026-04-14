"use client";

/**
 * Same hero animation asset as DeveloperFolio (landingPerson.json) + lottie-react.
 * https://github.com/saadpasta/developerFolio/blob/master/src/containers/greeting/Greeting.js
 */
import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import animationData from "@/assets/lottie/landingPerson.json";

export function HeroLottie() {
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
      className="greeting-image-div relative mx-auto w-full max-w-[420px] shrink-0 lg:mx-0 lg:max-w-[min(34vw,400px)]"
      aria-hidden
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        className="h-auto w-full max-h-[min(50vh,520px)] object-contain"
      />
    </div>
  );
}
