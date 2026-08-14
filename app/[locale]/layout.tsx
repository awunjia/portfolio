import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { CookieConsentBanner } from "@/components/cookies/cookie-consent-banner";
import { BackToTop } from "@/components/layout/back-to-top";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { htmlLangAttribute } from "@/lib/i18n/seo-locale";
import { isLocale, type Locale } from "@/lib/i18n/locale";
import { LocaleHtmlLang } from "@/components/providers/locale-html-lang";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams(): { locale: Locale }[] {
  return [
    { locale: "en" },
    { locale: "fi" },
    { locale: "sv" },
    { locale: "fr" },
    { locale: "da" },
  ];
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    notFound();
  }

  return (
    <I18nProvider locale={raw}>
      <LocaleHtmlLang lang={htmlLangAttribute(raw)} />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
      <CookieConsentBanner />
    </I18nProvider>
  );
}
