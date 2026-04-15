"use client";

import { useEffect, useRef } from "react";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "framer-motion";

const STUDENT_DOTLOTTIE_SRC = "/lottie/student.lottie";

/** Student illustration (dotLottie from `public/lottie/student.lottie`). */
export function EducationHeroLottie() {
  const reduceMotion = useReducedMotion();
  const playerRef = useRef<DotLottie | null>(null);

  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    if (reduceMotion) p.pause();
    else p.play();
  }, [reduceMotion]);

  return (
    <div
      className="relative mx-auto flex h-[min(30vh,200px)] w-full max-w-[min(100%,480px)] items-center justify-center sm:h-[min(34vh,260px)] lg:h-[min(38vh,300px)]"
      aria-hidden
    >
      <DotLottieReact
        src={STUDENT_DOTLOTTIE_SRC}
        loop
        autoplay={reduceMotion !== true}
        dotLottieRefCallback={(instance) => {
          playerRef.current = instance;
          if (instance) {
            if (reduceMotion) instance.pause();
            else instance.play();
          }
        }}
        className="mx-auto h-full max-h-full w-full object-contain"
      />
    </div>
  );
}
