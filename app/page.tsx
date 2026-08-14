import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  detectLocaleFromAcceptLanguage,
  isLocale,
} from "@/lib/i18n/locale";
import { localizedPath } from "@/lib/i18n/paths";

/** `/` → preferred locale home (`/en`, …). */
export default async function RootPage() {
  const jar = await cookies();
  const cookieLocale = jar.get(LOCALE_STORAGE_KEY)?.value;
  if (isLocale(cookieLocale)) {
    redirect(localizedPath(cookieLocale, "/"));
  }
  const accept = (await headers()).get("accept-language");
  const detected = detectLocaleFromAcceptLanguage(accept);
  redirect(localizedPath(detected || DEFAULT_LOCALE, "/"));
}
