"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_MIN_DISPLAY_MS = 500;

/** Keeps the shimmer up until the animation is ready AND a minimum time has passed. */
export function useLottieReady(minDisplayMs = DEFAULT_MIN_DISPLAY_MS) {
  const [loaded, setLoaded] = useState(false);
  const frameReadyRef = useRef(false);
  const minTimeReadyRef = useRef(false);

  const trySetLoaded = useCallback(() => {
    if (frameReadyRef.current && minTimeReadyRef.current) {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      minTimeReadyRef.current = true;
      trySetLoaded();
    }, minDisplayMs);
    return () => window.clearTimeout(id);
  }, [minDisplayMs, trySetLoaded]);

  const markReady = useCallback(() => {
    if (frameReadyRef.current) return;
    frameReadyRef.current = true;
    trySetLoaded();
  }, [trySetLoaded]);

  return { loaded, markReady };
}

export function createDotLottieReadyHandler(
  markReady: () => void,
  reduceMotion: boolean | null,
  instance: import("@lottiefiles/dotlottie-react").DotLottie | null,
): void {
  if (!instance) return;

  let settled = false;
  const settle = () => {
    if (settled) return;
    settled = true;
    markReady();
  };

  const timeoutId = window.setTimeout(settle, 8000);

  const onFrame = () => {
    window.clearTimeout(timeoutId);
    settle();
  };

  try {
    instance.addEventListener("load", onFrame);
    instance.addEventListener("ready", onFrame);
    instance.addEventListener("frame", onFrame);
  } catch {
    window.clearTimeout(timeoutId);
    settle();
  }

  if (reduceMotion) instance.pause();
  else instance.play();
}
