"use client";

import type { ReactNode } from "react";
import { LottieShimmer } from "@/components/lottie/lottie-shimmer";

type LottieLoadStageProps = {
  loaded: boolean;
  className?: string;
  /** Keeps shimmer visible while the animation mounts (avoids zero-height collapse). */
  minHeightClass?: string;
  children: ReactNode;
};

/** Shimmer overlay stays mounted and fades out once `loaded` is true. */
export function LottieLoadStage({
  loaded,
  className = "",
  minHeightClass = "min-h-40",
  children,
}: LottieLoadStageProps) {
  return (
    <div
      className={`relative w-full ${loaded ? "" : minHeightClass} ${className}`.trim()}
    >
      <div
        aria-hidden={!loaded}
        className={
          loaded
            ? "relative z-0 h-full w-full opacity-100 transition-opacity duration-300"
            : "relative z-0 h-full w-full opacity-0"
        }
      >
        {children}
      </div>
      <LottieShimmer
        className={`absolute inset-0 z-10 transition-opacity duration-300 ${
          loaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
}
