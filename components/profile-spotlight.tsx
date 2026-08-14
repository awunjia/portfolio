"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineClock,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineEnvelope,
  HiOutlineLanguage,
  HiOutlineMapPin,
  HiOutlinePhone,
} from "react-icons/hi2";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/components/providers/i18n-provider";

function initialsFromName(full: string): string {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[parts.length - 1]![0] ?? ""}`.toUpperCase();
}

export function ProfileSpotlight() {
  const { t } = useI18n();
  const { fullName, profile, email, cvPlaceholders } = siteConfig;
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const showImage = profile.avatarSrc && !avatarFailed;
  const realPhone = cvPlaceholders.phone.trim();
  const maskedPhone = realPhone.replace(/\d(?=(?:\D*\d){2})/g, "•");

  const rows = useMemo(
    () =>
      [
        {
          key: "basedIn",
          Icon: HiOutlineMapPin,
          label: t("profile.basedIn"),
          value: cvPlaceholders.address,
        },
        {
          key: "languages",
          Icon: HiOutlineLanguage,
          label: t("profile.languages"),
          value: t("profile.spokenLanguagesValue"),
        },
        {
          key: "timezone",
          Icon: HiOutlineClock,
          label: t("profile.timezone"),
          value: t("profile.timezoneValue"),
        },
        {
          key: "availability",
          Icon: HiOutlineChatBubbleLeftRight,
          label: t("profile.availability"),
          value: t("profile.availabilityPitch"),
        },
        {
          key: "phone",
          Icon: HiOutlinePhone,
          label: t("profile.phone"),
          value: cvPlaceholders.phone,
        },
        {
          key: "email",
          Icon: HiOutlineEnvelope,
          label: t("profile.email"),
          value: email,
          href: `mailto:${email}`,
        },
      ] as const,
    [
      t,
      cvPlaceholders.address,
      cvPlaceholders.phone,
      email,
    ],
  );

  return (
    <section
      id="profile"
      aria-labelledby="profile-heading"
      className="scroll-mt-24 border-t border-border bg-surface/40 py-16 dark:bg-surface/20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2
          id="profile-heading"
          className="text-center text-sm font-medium tracking-wide text-muted"
        >
          {t("profile.heading")}
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,220px),1fr] md:items-start md:gap-12 lg:gap-16">
          <div className="mx-auto flex w-full max-w-[220px] flex-col items-center justify-self-center text-center">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-skills/25 to-accent/20 ring-1 ring-border shadow-md dark:from-skills/15 dark:to-accent/15">
              {showImage ? (
                <Image
                  key={profile.avatarSrc}
                  src={profile.avatarSrc}
                  alt={t("profile.portraitAlt").replace("{name}", fullName)}
                  fill
                  className="object-cover object-top"
                  sizes="220px"
                  priority
                  onError={() => setAvatarFailed(true)}
                />
              ) : (
                <span
                  className="flex h-full w-full items-center justify-center text-4xl font-semibold tracking-tight text-accent dark:text-white"
                  aria-hidden
                >
                  {initialsFromName(fullName)}
                </span>
              )}
            </div>
            <p className="mt-4 text-lg font-semibold text-foreground">{fullName}</p>
            <p className="text-sm font-medium text-accent">{t("home.role")}</p>
            <p className="mt-2 text-xs text-muted">{t("profile.degreeLine")}</p>
          </div>

          <div className="min-w-0">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((row) => {
                const { key, Icon, label, value } = row;
                const href = "href" in row ? row.href : undefined;
                return (
                  <li
                    key={key}
                    className="flex gap-3 rounded-xl border border-border/80 bg-background/60 px-4 py-3 dark:bg-white/[0.04]"
                  >
                    <Icon
                      className="mt-0.5 h-5 w-5 shrink-0 text-skills"
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-muted">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="mt-0.5 block break-words text-sm font-medium text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                        >
                          {value}
                        </a>
                      ) : key === "phone" ? (
                        <div className="mt-0.5 flex items-center gap-2">
                          <p
                            className={`break-words text-sm font-medium text-foreground ${
                              showPhone ? "" : "select-none blur-[3px]"
                            }`}
                            aria-live="polite"
                          >
                            {showPhone ? realPhone : maskedPhone}
                          </p>
                          <button
                            type="button"
                            onClick={() => setShowPhone((prev) => !prev)}
                            className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-border/80 text-muted transition-colors hover:text-accent"
                            aria-label={
                              showPhone ? t("profile.hidePhone") : t("profile.revealPhone")
                            }
                            aria-pressed={showPhone}
                          >
                            {showPhone ? (
                              <HiOutlineEyeSlash className="h-4 w-4" aria-hidden />
                            ) : (
                              <HiOutlineEye className="h-4 w-4" aria-hidden />
                            )}
                          </button>
                        </div>
                      ) : (
                        <p className="mt-0.5 break-words text-sm font-medium text-foreground">
                          {value}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
