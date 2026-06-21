import type { Locale } from "@/lib/i18n/config";
import { getCategoryBySlug } from "@/lib/data/categories";
import { localizeProduct } from "@/lib/data/localize";
import {
  getProductBySlug,
  getProducts,
  rawProducts,
} from "@/lib/data/products";
import type { LocalizedProduct } from "@/lib/data/types";

export type ShopRouteType = "category" | "subcategory" | "product";

export type ResolvedShopRoute =
  | {
      type: "category";
      categorySlug: string;
    }
  | {
      type: "subcategory";
      categorySlug: string;
      subcategorySlug: string;
    }
  | {
      type: "product";
      product: LocalizedProduct;
    };

function findProductInCategory(
  categorySlug: string,
  productSlug: string,
  locale: Locale
): LocalizedProduct | undefined {
  const product = rawProducts.find(
    (item) => item.categorySlug === categorySlug && item.slug === productSlug
  );

  return product ? localizeProduct(product, locale) : undefined;
}

function isSubcategoryInCategory(
  categorySlug: string,
  subcategorySlug: string
): boolean {
  return rawProducts.some(
    (product) =>
      product.categorySlug === categorySlug &&
      product.subcategorySlug === subcategorySlug
  );
}

export function resolveShopRoute(
  segments: string[],
  locale: Locale
): ResolvedShopRoute | null {
  if (segments.length === 0) {
    return null;
  }

  const [categorySlug, second, third] = segments;

  if (!getCategoryBySlug(categorySlug, locale)) {
    return null;
  }

  if (segments.length === 1) {
    return { type: "category", categorySlug };
  }

  if (segments.length === 2 && second) {
    const product = findProductInCategory(categorySlug, second, locale);

    if (product) {
      return { type: "product", product };
    }

    if (isSubcategoryInCategory(categorySlug, second)) {
      return {
        type: "subcategory",
        categorySlug,
        subcategorySlug: second,
      };
    }

    return null;
  }

  const productSlug = third ?? second;
  if (!productSlug) {
    return null;
  }

  const product = getProductBySlug(productSlug, locale);

  if (!product || product.categorySlug !== categorySlug) {
    return null;
  }

  if (segments.length >= 3 && second && product.subcategorySlug !== second) {
    return null;
  }

  return { type: "product", product };
}

export function getSubcategoriesForCategory(categorySlug: string): string[] {
  const subcategories = new Set<string>();

  rawProducts
    .filter((product) => product.categorySlug === categorySlug)
    .forEach((product) => {
      if (product.subcategorySlug) {
        subcategories.add(product.subcategorySlug);
      }
    });

  return Array.from(subcategories);
}

export function getProductsForRoute(
  locale: Locale,
  route: Exclude<ResolvedShopRoute, { type: "product" }>
): LocalizedProduct[] {
  if (route.type === "category") {
    return getProducts(locale, { categorySlug: route.categorySlug });
  }

  return getProducts(locale, {
    categorySlug: route.categorySlug,
    subcategorySlug: route.subcategorySlug,
  });
}
