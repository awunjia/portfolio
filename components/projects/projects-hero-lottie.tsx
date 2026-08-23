"use client";

import { useCallback, useEffect, useRef } from "react";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "framer-motion";
import { createDotLottieReadyHandler } from "@/components/lottie/dot-lottie-utils";
import { LottieLoadStage } from "@/components/lottie/lottie-load-stage";
import { useLottieReady } from "@/components/lottie/lottie-ready";

const PROJECTS_HERO_LOTTIE_SRC = "/lottie/business-analyst.lottie";

export function ProjectsHeroLottie() {
  const reduceMotion = useReducedMotion();
  const playerRef = useRef<DotLottie | null>(null);
  const { loaded, markReady } = useLottieReady();

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    if (reduceMotion) player.pause();
    else player.play();
  }, [reduceMotion, loaded]);

  const onPlayer = useCallback(
    (instance: DotLottie | null) => {
      playerRef.current = instance;
      createDotLottieReadyHandler(markReady, reduceMotion, instance);
    },
    [markReady, reduceMotion],
  );

  return (
    <LottieLoadStage
      loaded={loaded}
      minHeightClass="min-h-[min(40vw,220px)] sm:min-h-[260px]"
      className="relative flex w-full max-w-[min(100%,420px)] justify-center md:justify-end"
    >
      <DotLottieReact
        src={PROJECTS_HERO_LOTTIE_SRC}
        loop
        autoplay={reduceMotion !== true}
        dotLottieRefCallback={onPlayer}
        className="mx-auto h-auto w-full max-h-[min(40vw,220px)] object-contain sm:max-h-[260px]"
      />
    </LottieLoadStage>
  );
}
