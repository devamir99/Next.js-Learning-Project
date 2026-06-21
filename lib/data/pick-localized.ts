import type { Locale } from "@/lib/i18n/config";
import type { LocalizedString } from "./types";

export function pickLocalized(
  value: LocalizedString,
  locale: Locale,
  fallbackLocale: Locale = "en"
): string {
  return value[locale] ?? value[fallbackLocale] ?? Object.values(value)[0] ?? "";
}
