"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineArrowDownTray, HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/components/providers/i18n-provider";
import { SocialMedia } from "@/components/devfolio/social-media";

const HeroLottie = dynamic(
  () => import("@/components/devfolio/hero-lottie").then((m) => ({ default: m.HeroLottie })),
  {
    ssr: false,
    loading: () => (
      <div
        className="greeting-image-div relative mx-auto w-full max-w-[420px] shrink-0 animate-pulse rounded-2xl bg-muted/25 lg:mx-0 lg:max-w-[min(34vw,400px)]"
        style={{ minHeight: "min(50vh, 520px)" }}
        aria-hidden
      />
    ),
  },
);

export function HomeHero() {
  const reduceMotion = useReducedMotion();
  const { t, locale } = useI18n();

  return (
    <motion.div
      className="greeting-main flex min-w-0 flex-col gap-10 lg:flex-row lg:items-center lg:gap-8"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="greeting-text-div min-w-0 flex-1">
        <p className="break-words text-sm font-medium tracking-wide text-accent">
          {t("home.role")}
        </p>
        <h1 className="greeting-text mt-4 max-w-3xl break-words text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[70px] lg:leading-[1.1]">
          {siteConfig.fullName}
        </h1>
        <p className="greeting-text-p mt-6 w-full max-w-none break-words text-base leading-relaxed text-muted sm:text-lg md:text-xl md:leading-snug lg:pr-2">
          {t("home.tagline")}
        </p>
        <div className="button-greeting-div mt-10 flex w-full min-w-0 flex-row flex-wrap items-stretch gap-3 sm:items-center">
          <Link
            href="/contact"
            className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover sm:flex-none sm:px-8"
          >
            <HiOutlineChatBubbleLeftRight className="size-4 shrink-0" aria-hidden />
            {t("home.sayHello")}
          </Link>
          <a
            href={`${siteConfig.cvDownloadPath}?locale=${locale}`}
            download
            className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent dark:bg-surface sm:flex-none sm:px-8"
          >
            <HiOutlineArrowDownTray className="size-4 shrink-0" aria-hidden />
            {t("home.downloadCv")}
          </a>
        </div>
        <div className="mt-10">
          <SocialMedia />
        </div>
      </div>
      <HeroLottie />
    </motion.div>
  );
}
