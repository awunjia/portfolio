"use client";

/**
 * DeveloperFolio skills illustration (person at desk + cat).
 * https://github.com/saadpasta/developerFolio/blob/master/src/containers/skills/Skills.js
 */
import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useReducedMotion } from "framer-motion";
import animationData from "@/assets/lottie/codingPerson.json";

export function SkillsLottie() {
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
      className="skills-image-div relative mx-auto w-full max-w-[min(100%,480px)] shrink-0 lg:mx-0"
      aria-hidden
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop
        className="h-auto w-full max-h-[min(55vh,520px)] object-contain object-left"
      />
    </div>
  );
}
