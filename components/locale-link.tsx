"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useI18n } from "@/components/providers/i18n-provider";
import { localizedPath } from "@/lib/i18n/paths";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Locale-agnostic path, e.g. `/contact` or `/` */
  href: string;
};

/** Internal Link that prefixes the active locale. External http(s) hrefs pass through. */
export function LocaleLink({ href, ...rest }: LocaleLinkProps) {
  const { locale } = useI18n();
  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#");
  const resolved = isExternal ? href : localizedPath(locale, href);
  return <Link href={resolved} {...rest} />;
}
