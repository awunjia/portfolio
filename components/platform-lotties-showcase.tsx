"use client";

/**
 * Heavy animations stay in `public/lottie/` and load on demand (not in the JS bundle).
 */
import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { DotLottieReact, type DotLottie } from "@lottiefiles/dotlottie-react";
import { useReducedMotion } from "framer-motion";
import { useI18n } from "@/components/providers/i18n-provider";

const MOBILE_APP_DOTLOTTIE_SRC = "/lottie/mobile-app-promo.lottie";
const WEB_DASHBOARD_JSON_SRC = "/lottie/platform-web-dashboard.json";
const API_INTEGRATION_DOTLOTTIE_SRC = "/lottie/api-integration.lottie";
const DATA_SECURITY_DOTLOTTIE_SRC = "/lottie/data-security.lottie";
const DATABASE_DOTLOTTIE_SRC = "/lottie/database-management.lottie";
const IOT_DEVICES_DOTLOTTIE_SRC = "/lottie/iot-devices-connected.lottie";

const lottieStageClassName =
  "mx-auto flex h-[min(22vh,140px)] w-full max-w-[min(100%,360px)] items-center justify-center sm:h-[min(32vh,240px)]";

function useInViewOnce<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return { ref, inView };
}

function PlatformDotLottie({
  src,
  label,
  description,
}: {
  src: string;
  label: string;
  description: string;
}) {
  const reduceMotion = useReducedMotion();
  const playerRef = useRef<DotLottie | null>(null);
  const { ref, inView } = useInViewOnce<HTMLElement>();

  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    if (reduceMotion) p.pause();
    else p.play();
  }, [reduceMotion]);

  return (
    <figure ref={ref} className="flex h-full flex-col items-center text-center">
      <div className={lottieStageClassName} aria-hidden>
        {inView ? (
          <DotLottieReact
            src={src}
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
        ) : (
          <div className="h-full w-full animate-pulse rounded-2xl bg-muted/20" />
        )}
      </div>
      <figcaption className="mt-auto w-full max-w-sm shrink-0 px-1 pt-3 sm:px-2 sm:pt-4">
        <p className="text-sm font-semibold text-foreground sm:text-lg">{label}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">{description}</p>
      </figcaption>
    </figure>
  );
}

function PlatformJsonLottie({
  src,
  label,
  description,
}: {
  src: string;
  label: string;
  description: string;
}) {
  const lottieRef = useRef<LottieRefCurrentProps | null>(null);
  const reduceMotion = useReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLElement>();
  const [data, setData] = useState<object | null>(null);

  useEffect(() => {
    if (!inView || data) return;
    let cancelled = false;
    fetch(src)
      .then((res) => res.json())
      .then((json: object) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        /* leave placeholder */
      });
    return () => {
      cancelled = true;
    };
  }, [inView, data, src]);

  useEffect(() => {
    const inst = lottieRef.current;
    if (!inst) return;
    if (reduceMotion) inst.pause();
    else inst.play();
  }, [reduceMotion, data]);

  return (
    <figure ref={ref} className="flex h-full flex-col items-center text-center">
      <div className={lottieStageClassName} aria-hidden>
        {data ? (
          <Lottie
            lottieRef={lottieRef}
            animationData={data}
            loop
            className="mx-auto h-full max-h-full w-full object-contain"
          />
        ) : (
          <div className="h-full w-full animate-pulse rounded-2xl bg-muted/20" />
        )}
      </div>
      <figcaption className="mt-auto w-full max-w-sm shrink-0 px-1 pt-3 sm:px-2 sm:pt-4">
        <p className="text-sm font-semibold text-foreground sm:text-lg">{label}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">{description}</p>
      </figcaption>
    </figure>
  );
}

export function PlatformLottiesShowcase() {
  const { t } = useI18n();

  return (
    <div className="grid grid-cols-2 items-stretch gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-10">
      <PlatformDotLottie
        src={MOBILE_APP_DOTLOTTIE_SRC}
        label={t("home.delivery.mobileTitle")}
        description={t("home.delivery.mobileBody")}
      />
      <PlatformJsonLottie
        src={WEB_DASHBOARD_JSON_SRC}
        label={t("home.delivery.webTitle")}
        description={t("home.delivery.webBody")}
      />
      <PlatformDotLottie
        src={API_INTEGRATION_DOTLOTTIE_SRC}
        label={t("home.delivery.apiTitle")}
        description={t("home.delivery.apiBody")}
      />
      <PlatformDotLottie
        src={DATA_SECURITY_DOTLOTTIE_SRC}
        label={t("home.delivery.devopsTitle")}
        description={t("home.delivery.devopsBody")}
      />
      <PlatformDotLottie
        src={DATABASE_DOTLOTTIE_SRC}
        label={t("home.delivery.databaseTitle")}
        description={t("home.delivery.databaseBody")}
      />
      <PlatformDotLottie
        src={IOT_DEVICES_DOTLOTTIE_SRC}
        label={t("home.delivery.iotTitle")}
        description={t("home.delivery.iotBody")}
      />
    </div>
  );
}
