import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CookieConsentProvider } from "@/components/providers/cookie-consent-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { CookieConsentBanner } from "@/components/cookies/cookie-consent-banner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { RootStructuredData } from "@/components/seo/root-structured-data";
import { siteConfig } from "@/config/site";
import { getBaseUrl } from "@/lib/base-url";
import { isLocale, LOCALE_STORAGE_KEY } from "@/lib/i18n/locale";
import { htmlLangAttribute } from "@/lib/i18n/seo-locale";
import { siteMetaDescription, siteMetaKeywords } from "@/lib/seo";

/* DeveloperFolio uses a clean geometric sans; Montserrat matches that stack */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const base = getBaseUrl();
const defaultOgImage = new URL(siteConfig.profile.avatarSrc, `${base}/`).toString();
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: `${siteConfig.role} — ${siteConfig.fullName}`,
    template: `%s | ${siteConfig.fullName}`,
  },
  description: siteMetaDescription(),
  keywords: siteMetaKeywords(),
  authors: [{ name: siteConfig.fullName, url: siteConfig.domain }],
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  category: "technology",
  referrer: "origin-when-cross-origin",
  alternates: { canonical: `${base}/` },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fi_FI", "sv_SE", "da_DK"],
    url: `${base}/`,
    siteName: siteConfig.fullName,
    title: `${siteConfig.role} — ${siteConfig.fullName}`,
    description: siteMetaDescription(),
    images: [{ url: defaultOgImage, alt: siteConfig.fullName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.role} — ${siteConfig.fullName}`,
    description: siteMetaDescription(),
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2f4" },
    { media: "(prefers-color-scheme: dark)", color: "#171c28" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jar = await cookies();
  const raw = jar.get(LOCALE_STORAGE_KEY)?.value;
  const localeCookie = isLocale(raw) ? raw : "en";

  return (
    <html
      lang={htmlLangAttribute(localeCookie)}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <RootStructuredData />
        <CookieConsentProvider>
          <ThemeProvider>
            <I18nProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <BackToTop />
              <CookieConsentBanner />
            </I18nProvider>
          </ThemeProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
