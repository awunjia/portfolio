"use client";

/**
 * Mobile: dotLottie from LottieFiles ("Mobile App promo") - `public/lottie/mobile-app-promo.lottie`.
 * Web: `platform-web-dashboard.json` - laptop open animation; screen UI is vector layers in the Lottie (see `scripts/patch-laptop-dashboard.mjs` to tweak).
 * https://github.com/xvrh/lottie-flutter/tree/master/example/assets/lottiefiles
 */
import { useEffect, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "framer-motion";
import webDashboardAnimation from "@/assets/lottie/platform-web-dashboard.json";

const MOBILE_APP_DOTLOTTIE_SRC = "/lottie/mobile-app-promo.lottie";

/** Shorter stage so the phone mockup does not read as overly tall */
const lottieStageClassNameMobile =
  "mx-auto flex h-[min(28vh,220px)] w-full max-w-[min(100%,400px)] items-center justify-center";

const lottieStageClassNameWeb =
  "mx-auto flex h-[min(42vh,320px)] w-full max-w-[min(100%,480px)] items-center justify-center";

function PlatformMobileDotLottie({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  const reduceMotion = useReducedMotion();
  const playerRef = useRef<DotLottie | null>(null);

  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    if (reduceMotion) p.pause();
    else p.play();
  }, [reduceMotion]);

  return (
    <figure className="flex h-full flex-col items-center text-center">
      <div className={lottieStageClassNameMobile} aria-hidden>
        <DotLottieReact
          src={MOBILE_APP_DOTLOTTIE_SRC}
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
      <figcaption className="mt-auto max-w-xs shrink-0 px-2 pt-4">
        <p className="text-base font-semibold text-foreground sm:text-lg">
          {label}
        </p>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </figcaption>
    </figure>
  );
}

function PlatformLottie({
  data,
  label,
  description,
  lottieClassName = "mx-auto h-full max-h-full w-full object-contain",
}: {
  data: object;
  label: string;
  description: string;
  lottieClassName?: string;
}) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const inst = lottieRef.current;
    if (!inst) return;
    if (reduceMotion) inst.pause();
    else inst.play();
  }, [reduceMotion]);

  return (
    <figure className="flex h-full flex-col items-center text-center">
      <div className={lottieStageClassNameWeb} aria-hidden>
        <Lottie
          lottieRef={lottieRef}
          animationData={data}
          loop
          className={lottieClassName}
        />
      </div>
      <figcaption className="mt-auto max-w-xs shrink-0 px-2 pt-4">
        <p className="text-base font-semibold text-foreground sm:text-lg">
          {label}
        </p>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </figcaption>
    </figure>
  );
}

export function PlatformLottiesShowcase() {
  return (
    <div className="grid grid-cols-1 items-stretch gap-12 sm:grid-cols-2 sm:gap-10 lg:gap-14">
      <PlatformMobileDotLottie
        label="Mobile apps"
        description="Flutter work when a native-feeling mobile client is the right fit - thoughtful UX and builds that stay practical to ship."
      />
      <PlatformLottie
        data={webDashboardAnimation}
        label="Web apps and dashboards"
        description="Web apps and dashboards with Next.js, REST or GraphQL APIs, auth, and views that stay readable when data piles up."
        lottieClassName="mx-auto h-full max-h-full w-full object-contain"
      />
    </div>
  );
}
