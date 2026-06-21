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
  limit = 6
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
  limit = 8
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

export function getDiscountPercent(
  product: Pick<Product, "price" | "compareAtPrice">
): number | null {
  if (!product.compareAtPrice || product.compareAtPrice <= product.price) {
    return null;
  }

  return Math.round((1 - product.price / product.compareAtPrice) * 100);
}

export function getDealProducts(
  locale: Locale,
  limit = 12
): LocalizedProduct[] {
  const saleProducts = getProducts(locale, { badge: "sale" });

  if (saleProducts.length >= limit) {
    return saleProducts.slice(0, limit);
  }

  const withDiscount = getProducts(locale).filter(
    (product) =>
      product.compareAtPrice !== undefined &&
      product.compareAtPrice > product.price &&
      !saleProducts.some((item) => item.id === product.id)
  );

  return [...saleProducts, ...withDiscount].slice(0, limit);
}

export function getPickedForYouProducts(
  locale: Locale,
  limit = 6
): LocalizedProduct[] {
  const featured = getFeaturedProducts(locale);
  const rated = getProducts(locale)
    .filter((product) => product.inStock)
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);

  const picked: LocalizedProduct[] = [];

  for (const product of [...featured, ...rated]) {
    if (picked.some((item) => item.id === product.id)) continue;
    picked.push(product);
    if (picked.length >= limit) break;
  }

  return picked;
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
