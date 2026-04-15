"use client";

import Link from "next/link";
import { HiOutlineHome } from "react-icons/hi2";
import { useI18n } from "@/components/providers/i18n-provider";

export function NotFoundContent() {
  const { t } = useI18n();

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">{t("notFound.title")}</h1>
      <p className="mt-2 text-muted">{t("notFound.body")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground"
      >
        <HiOutlineHome className="size-4 shrink-0" aria-hidden />
        {t("notFound.home")}
      </Link>
    </div>
  );
}
