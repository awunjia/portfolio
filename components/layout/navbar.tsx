"use client";

/**
 * Header layout & behavior inspired by DeveloperFolio Header.scss / Header.js
 * https://github.com/saadpasta/developerFolio/blob/master/src/components/header/Header.scss
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { siteConfig } from "@/config/site";
import { DevfolioThemeToggle } from "@/components/devfolio/devfolio-theme-toggle";
import { LanguageMenu } from "@/components/layout/language-menu";
import { useI18n } from "@/components/providers/i18n-provider";

const navLinkDefs: { href: string; labelKey: string; external?: boolean }[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/skills", labelKey: "nav.skills" },
  { href: "/education", labelKey: "nav.education" },
  { href: "/about", labelKey: "nav.work" },
  { href: "/open-source", labelKey: "nav.opensource" },
  { href: "/contact", labelKey: "nav.contact" },
];

function normalizePath(p: string): string {
  if (!p || p === "/") return "/";
  const trimmed = p.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/** True when this nav item should show as the current page (or section root). */
function linkActive(pathname: string, href: string, external?: boolean): boolean {
  if (external) return false;
  const raw = href.split("#")[0];
  const hrefPath = normalizePath(raw ?? "/");
  const current = normalizePath(pathname || "/");

  if (hrefPath === "/") {
    return current === "/";
  }
  if (current === hrefPath) return true;
  return current.startsWith(`${hrefPath}/`);
}

const navItemClass =
  "block px-5 py-[15px] text-sm transition-colors hover:bg-header-hover dark:hover:bg-accent dark:hover:text-white";

const navItemInactiveClass = "font-normal text-foreground no-underline";

const navItemActiveClass =
  "font-semibold text-accent underline decoration-accent/40 decoration-2 underline-offset-[10px] dark:text-white dark:decoration-white/40";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  const navLinks = navLinkDefs.map((l) => ({
    href: l.href,
    label: t(l.labelKey),
    external: l.external,
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface dark:border-white/10 dark:bg-[#171c28]">
      <div className="mx-auto max-w-[100%] px-5 py-[15px] lg:max-w-6xl">
        <div className="flex w-full flex-wrap items-center justify-between gap-x-2 gap-y-2">
          <Link
            href="/"
            title={siteConfig.fullName}
            className="devfolio-logo order-1 min-w-0 flex-1 truncate text-left text-lg leading-tight text-foreground no-underline md:flex-none md:max-w-none md:overflow-visible md:whitespace-normal md:text-2xl md:leading-normal"
            onClick={() => setOpen(false)}
          >
            {siteConfig.fullName}
          </Link>

          <div className="order-2 flex shrink-0 items-center gap-2 sm:gap-3 md:order-3">
            <DevfolioThemeToggle />
            <LanguageMenu />
            <button
              type="button"
              className="inline-flex cursor-pointer items-center justify-center py-2 pl-3 text-[#333] md:hidden dark:text-white"
              aria-expanded={open}
              aria-controls="devfolio-menu"
              aria-label={open ? t("nav.menuClose") : t("nav.menuOpen")}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <HiOutlineXMark className="size-6 shrink-0" aria-hidden />
              ) : (
                <HiOutlineBars3 className="size-6 shrink-0" aria-hidden />
              )}
            </button>
          </div>

          <nav
            id="devfolio-menu"
            className={`order-3 w-full basis-full overflow-hidden transition-[max-height] duration-200 ease-out md:order-2 md:flex md:basis-auto md:w-auto md:max-h-none md:overflow-visible ${
              open ? "max-h-[28rem]" : "max-h-0 md:max-h-none"
            }`}
            aria-label={t("nav.primary")}
          >
            <ul className="m-0 list-none p-0 md:flex md:flex-row md:items-center md:justify-end">
              {navLinks.map((l) => {
                const active = linkActive(pathname, l.href, l.external);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`${navItemClass} ${active ? navItemActiveClass : navItemInactiveClass}`}
                      aria-current={active ? "page" : undefined}
                      {...(l.external
                        ? {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                      onClick={() => setOpen(false)}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
