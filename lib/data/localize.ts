import type { Locale } from "@/lib/i18n/config";
import { pickLocalized } from "./pick-localized";
import type {
  BlogCategory,
  BlogPost,
  Category,
  LocalizedBlogCategory,
  LocalizedBlogPost,
  LocalizedCategory,
  LocalizedProduct,
  LocalizedReview,
  Product,
  Review,
} from "./types";

export function localizeCategory(
  category: Category,
  locale: Locale
): LocalizedCategory {
  return {
    ...category,
    name: pickLocalized(category.name, locale),
    description: pickLocalized(category.description, locale),
  };
}

export function localizeProduct(product: Product, locale: Locale): LocalizedProduct {
  return {
    ...product,
    name: pickLocalized(product.name, locale),
    shortDescription: pickLocalized(product.shortDescription, locale),
    description: pickLocalized(product.description, locale),
  };
}

export function localizeBlogCategory(
  category: BlogCategory,
  locale: Locale
): LocalizedBlogCategory {
  return {
    ...category,
    name: pickLocalized(category.name, locale),
    description: pickLocalized(category.description, locale),
  };
}

export function localizeBlogPost(post: BlogPost, locale: Locale): LocalizedBlogPost {
  return {
    ...post,
    title: pickLocalized(post.title, locale),
    excerpt: pickLocalized(post.excerpt, locale),
    content: pickLocalized(post.content, locale),
    author: pickLocalized(post.author, locale),
  };
}

export function localizeReview(review: Review, locale: Locale): LocalizedReview {
  return {
    ...review,
    title: pickLocalized(review.title, locale),
    body: pickLocalized(review.body, locale),
  };
}

export function formatPrice(price: number, locale: Locale, currency = "USD"): string {
  return new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(price);
}
