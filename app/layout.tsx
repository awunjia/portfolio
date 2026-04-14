import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { PersonJsonLd } from "@/components/seo/person-json-ld";
import { siteConfig } from "@/config/site";
import { getBaseUrl } from "@/lib/base-url";
import { siteMetaDescription, siteMetaKeywords } from "@/lib/seo";

/* DeveloperFolio uses a clean geometric sans; Montserrat matches that stack */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const base = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: {
    default: `${siteConfig.fullName} - ${siteConfig.role}`,
    template: `%s - ${siteConfig.fullName}`,
  },
  description: siteMetaDescription(),
  keywords: siteMetaKeywords(),
  authors: [{ name: siteConfig.fullName, url: siteConfig.domain }],
  creator: siteConfig.fullName,
  publisher: siteConfig.fullName,
  category: "technology",
  referrer: "origin-when-cross-origin",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: base,
    siteName: siteConfig.fullName,
    title: `${siteConfig.fullName} - ${siteConfig.role}`,
    description: siteMetaDescription(),
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.fullName} - ${siteConfig.role}`,
    description: siteMetaDescription(),
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
        <PersonJsonLd />
        <ThemeProvider>
          <I18nProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <BackToTop />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
