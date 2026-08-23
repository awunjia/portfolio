"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/contact-form";
import { useI18n } from "@/components/providers/i18n-provider";
import { LottieShimmer } from "@/components/lottie/lottie-shimmer";

const ContactHeroLottie = dynamic(
  () =>
    import("@/components/contact/contact-hero-lottie").then((m) => ({
      default: m.ContactHeroLottie,
    })),
  {
    ssr: false,
    loading: () => <LottieShimmer className="h-56 w-full max-w-md" />,
  },
);

export function ContactPageContent() {
  const { t } = useI18n();
  const introParts = t("contact.intro").split("{email}");

  return (
    <div className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-skills/15 via-accent/10 to-transparent dark:from-skills/10 dark:via-accent/8" />
      <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div className="text-center lg:text-left">
            <p className="text-sm font-medium tracking-wide text-accent">
              {t("contact.eyebrow")}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t("contact.title")}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted lg:mx-0">
              {introParts[0]}
              <Link
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-accent underline-offset-4 transition-colors hover:text-accent-hover hover:underline"
              >
                {siteConfig.email}
              </Link>
              {introParts[1] ?? ""}
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <ContactHeroLottie />
            </div>
          </div>

          <div className="rounded-2xl border border-border/80 bg-surface/95 p-6 shadow-sm dark:bg-[#1e2436]/95 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
