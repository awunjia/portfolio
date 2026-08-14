import { NotFoundContent } from "@/components/pages/not-found-content";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { DEFAULT_LOCALE } from "@/lib/i18n/locale";

export default function NotFound() {
  return (
    <I18nProvider locale={DEFAULT_LOCALE}>
      <NotFoundContent />
    </I18nProvider>
  );
}
