import type { Locale } from "@/lib/i18n/config";
import productsData from "@/data/products.json";
import { formatPrice, localizeProduct } from "./localize";
import type { LocalizedProduct, Product, ProductBadge } from "./types";

const products = productsData as Product[];

export type ProductFilters = {
  categorySlug?: string;
  subcategorySlug?: string;
  featured?: boolean;
  badge?: ProductBadge;
  inStock?: boolean;
  query?: string;
};

function filterProducts(filters: ProductFilters = {}): Product[] {
  const query = filters.query?.trim().toLowerCase();

  return products.filter((product) => {
    if (filters.categorySlug && product.categorySlug !== filters.categorySlug) {
      return false;
    }

    if (
      filters.subcategorySlug &&
      product.subcategorySlug !== filters.subcategorySlug
    ) {
      return false;
    }

    if (filters.featured !== undefined && product.featured !== filters.featured) {
      return false;
    }

    if (filters.badge && product.badge !== filters.badge) {
      return false;
    }

    if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
      return false;
    }

    if (query) {
      const haystack = [
        product.slug,
        product.name.fa,
        product.name.en,
        product.shortDescription.fa,
        product.shortDescription.en,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(query)) {
        return false;
      }
    }

    return true;
  });
}

export function getProducts(
  locale: Locale,
  filters: ProductFilters = {}
): LocalizedProduct[] {
  return filterProducts(filters).map((product) =>
    localizeProduct(product, locale)
  );
}

export function getProductBySlug(
  slug: string,
  locale: Locale
): LocalizedProduct | undefined {
  const product = products.find((item) => item.slug === slug);
  return product ? localizeProduct(product, locale) : undefined;
}

export function getProductById(
  id: string,
  locale: Locale
): LocalizedProduct | undefined {
  const product = products.find((item) => item.id === id);
  return product ? localizeProduct(product, locale) : undefined;
}

export function getFeaturedProducts(locale: Locale): LocalizedProduct[] {
  return getProducts(locale, { featured: true });
}

export function getBestSellerProducts(
  locale: Locale,
  limit = 4
): LocalizedProduct[] {
  const bestsellers = getProducts(locale, { badge: "bestseller" });

  if (bestsellers.length >= limit) {
    return bestsellers.slice(0, limit);
  }

  const featured = getFeaturedProducts(locale).filter(
    (product) => !bestsellers.some((item) => item.id === product.id)
  );

  return [...bestsellers, ...featured].slice(0, limit);
}

export function getNewArrivalProducts(
  locale: Locale,
  limit = 4
): LocalizedProduct[] {
  const newProducts = getProducts(locale, { badge: "new" });

  if (newProducts.length >= limit) {
    return newProducts.slice(0, limit);
  }

  return getProducts(locale)
    .filter((product) => product.inStock)
    .slice(-limit)
    .reverse();
}

export function getProductPath(
  locale: Locale,
  product: Pick<LocalizedProduct, "categorySlug" | "subcategorySlug" | "slug">
): string {
  if (product.subcategorySlug) {
    return `/${locale}/shop/products/${product.categorySlug}/${product.subcategorySlug}/${product.slug}`;
  }

  return `/${locale}/shop/products/${product.categorySlug}/${product.slug}`;
}

export function getProductsByCategory(
  categorySlug: string,
  locale: Locale
): LocalizedProduct[] {
  return getProducts(locale, { categorySlug });
}

export function getRelatedProducts(
  product: LocalizedProduct,
  locale: Locale,
  limit = 4
): LocalizedProduct[] {
  return getProducts(locale, { categorySlug: product.categorySlug })
    .filter((item) => item.id !== product.id)
    .slice(0, limit);
}

export function getAllProductSlugs(): string[] {
  return products.map((product) => product.slug);
}

export function getProductCount(filters: ProductFilters = {}): number {
  return filterProducts(filters).length;
}

export { formatPrice, products as rawProducts };
