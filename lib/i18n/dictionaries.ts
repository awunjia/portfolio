import type { Locale } from "@/lib/i18n/locale";
import { englishMessages } from "@/lib/i18n/strings-en";
import { finnishOverrides } from "@/lib/i18n/strings-fi";
import { swedishOverrides } from "@/lib/i18n/strings-sv";
import { danishOverrides } from "@/lib/i18n/strings-da";

function mergeMessages(
  base: Record<string, string>,
  overrides: Record<string, string>,
): Record<string, string> {
  return { ...base, ...overrides };
}

export const dictionaries: Record<Locale, Record<string, string>> = {
  en: englishMessages,
  fi: mergeMessages(englishMessages, finnishOverrides),
  sv: mergeMessages(englishMessages, swedishOverrides),
  da: mergeMessages(englishMessages, danishOverrides),
};
