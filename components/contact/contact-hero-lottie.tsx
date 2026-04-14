"use client";

import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import animationData from "@/assets/lottie/contact-mail.json";

export function ContactHeroLottie() {
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
      className="relative mx-auto mt-10 w-full max-w-[min(100%,520px)] sm:mt-12"
      aria-hidden
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        className="mx-auto h-auto w-full max-h-[min(38vh,280px)] object-contain sm:max-h-[min(42vh,320px)]"
      />
    </div>
  );
}
