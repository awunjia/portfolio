import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CookieConsentProvider } from "@/components/providers/cookie-consent-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { RootStructuredData } from "@/components/seo/root-structured-data";
import { siteConfig } from "@/config/site";
import { getBaseUrl } from "@/lib/base-url";
import { siteMetaDescription, siteMetaKeywords } from "@/lib/seo";

/* DeveloperFolio uses a clean geometric sans; Montserrat matches that stack */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  weight: ["400", "500", "600", "700"],
});

const base = getBaseUrl();
const defaultOgImage = new URL(siteConfig.profile.avatarSrc, `${base}/`).toString();
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: `${siteConfig.role} - ${siteConfig.fullName}`,
    template: `%s | ${siteConfig.fullName}`,
  },
  description: siteMetaDescription(),
  applicationName: siteConfig.fullName,
  keywords: siteMetaKeywords(),
  authors: [{ name: siteConfig.fullName, url: siteConfig.domain }],
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: `${base}/en`,
    types: {
      "text/plain": [{ url: `${base}/llms.txt`, title: "llms.txt" }],
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    alternateLocale: ["fi_FI", "sv_SE", "fr_FR", "da_DK"],
    url: `${base}/en`,
    siteName: siteConfig.fullName,
    title: `${siteConfig.role} - ${siteConfig.fullName}`,
    description: siteMetaDescription(),
    images: [
      {
        url: defaultOgImage,
        alt: `${siteConfig.fullName} portrait`,
        width: 880,
        height: 880,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.role} - ${siteConfig.fullName}`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <RootStructuredData />
        <CookieConsentProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
