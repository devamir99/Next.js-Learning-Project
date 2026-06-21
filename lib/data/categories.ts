import type { Locale } from "@/lib/i18n/config";
import categoriesData from "@/data/categories.json";
import { localizeCategory } from "./localize";
import type { Category, LocalizedCategory } from "./types";

const categories = categoriesData as Category[];

export function getCategories(locale: Locale): LocalizedCategory[] {
  return categories.map((category) => localizeCategory(category, locale));
}

export function getCategoryBySlug(
  slug: string,
  locale: Locale
): LocalizedCategory | undefined {
  const category = categories.find((item) => item.slug === slug);
  return category ? localizeCategory(category, locale) : undefined;
}

export function getAllCategorySlugs(): string[] {
  return categories.map((category) => category.slug);
}

export { categories as rawCategories };
