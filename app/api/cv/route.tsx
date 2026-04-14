import { renderToBuffer } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { CvPdfDocument } from "@/lib/cv-document";
import { getCvPdfStrings } from "@/lib/i18n/cv-copy";
import { isLocale, type Locale } from "@/lib/i18n/locale";

export const runtime = "nodejs";

function cvFilename(locale: Locale): string {
  const copy = getCvPdfStrings(locale);
  const safe = siteConfig.fullName
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `${safe || "CV"}-${copy.attachmentBasename}.pdf`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const raw = url.searchParams.get("locale");
  const locale: Locale = isLocale(raw) ? raw : "en";
  const buffer = await renderToBuffer(<CvPdfDocument locale={locale} />);
  const name = cvFilename(locale);

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${name}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
