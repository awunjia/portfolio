import { permanentRedirect } from "next/navigation";
import { isLocale } from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/paths";

type PageProps = { params: Promise<{ locale: string }> };

export default async function SkillsRedirectPage({ params }: PageProps) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "en";
  permanentRedirect(localizedPath(locale, "/background"));
}
