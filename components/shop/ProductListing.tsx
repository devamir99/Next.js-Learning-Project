"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import type { LocalizedCategory } from "@/lib/data/types";
import type { LocalizedProduct } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type SortOption = "popular" | "price-asc" | "price-desc" | "newest";
type PriceFilter = "all" | "under-50" | "under-100";

type ProductListingProps = {
  locale: Locale;
  products: LocalizedProduct[];
  categories: LocalizedCategory[];
  labels: Dictionary["shop"];
  initialCategory?: string;
};

export function ProductListing({
  locale,
  products,
  categories,
  labels,
  initialCategory = "all",
}: ProductListingProps) {
  const [category, setCategory] = useState(initialCategory);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [sort, setSort] = useState<SortOption>("popular");

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter((product) => product.categorySlug === category);
    }

    if (inStockOnly) {
      result = result.filter((product) => product.inStock);
    }

    if (priceFilter === "under-50") {
      result = result.filter((product) => product.price < 50);
    } else if (priceFilter === "under-100") {
      result = result.filter((product) => product.price < 100);
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [products, category, inStockOnly, priceFilter, sort]);

  const cardLabels = {
    inStock: labels.inStock,
    outOfStock: labels.outOfStock,
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      <aside className="h-fit rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
          {labels.filtersTitle}
        </h2>

        <div className="mt-5 space-y-5">
          <div>
            <label htmlFor="category-filter" className="mb-2 block text-sm font-medium">
              {labels.filterCategory}
            </label>
            <select
              id="category-filter"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            >
              <option value="all">{labels.allCategories}</option>
              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price-filter" className="mb-2 block text-sm font-medium">
              {labels.filterPrice}
            </label>
            <select
              id="price-filter"
              value={priceFilter}
              onChange={(event) => setPriceFilter(event.target.value as PriceFilter)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            >
              <option value="all">{labels.priceAll}</option>
              <option value="under-50">{labels.priceUnder50}</option>
              <option value="under-100">{labels.priceUnder100}</option>
            </select>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(event) => setInStockOnly(event.target.checked)}
              className="rounded border-border text-primary focus:ring-primary"
            />
            {labels.filterInStock}
          </label>
        </div>
      </aside>

      <div>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {filtered.length} {labels.resultsCount}
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium">
              {labels.sortLabel}
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value as SortOption)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            >
              <option value="popular">{labels.sortPopular}</option>
              <option value="price-asc">{labels.sortPriceAsc}</option>
              <option value="price-desc">{labels.sortPriceDesc}</option>
              <option value="newest">{labels.sortNewest}</option>
            </select>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                locale={locale}
                labels={cardLabels}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            {labels.noResults}
          </div>
        )}
      </div>
    </div>
  );
}
