"use client";

import { useLottieReady } from "@/components/lottie/lottie-ready";

/** Shimmer stays until the first frame is drawn and a minimum display time has passed. */
export function useJsonLottieLoaded(minDisplayMs?: number) {
  const { loaded, markReady } = useLottieReady(minDisplayMs);

  return {
    loaded,
    onDOMLoaded: markReady,
    onEnterFrame: markReady,
    onDataReady: markReady,
  };
}
