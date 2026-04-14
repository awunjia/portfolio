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
      className="relative w-full max-w-[min(100%,480px)] rounded-2xl border border-border bg-surface p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none"
      aria-hidden
    >
      <div className="mx-auto flex h-[min(30vh,200px)] w-full items-center justify-center sm:h-[min(34vh,260px)] lg:h-[min(38vh,300px)]">
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
    </div>
  );
}
