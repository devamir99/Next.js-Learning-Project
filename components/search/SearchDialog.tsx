"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import blogPostsData from "@/data/blog-posts.json";
import productsData from "@/data/products.json";
import { getProductPath } from "@/lib/data/products";
import { pickLocalized } from "@/lib/data/pick-localized";
import type { BlogPost, Product } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";

type SearchDialogProps = {
  locale: Locale;
  labels: {
    search: string;
    searchPlaceholder: string;
    searchNoResults: string;
    searchProducts: string;
    searchPosts: string;
    close: string;
  };
  /** When true, renders both desktop bar and mobile icon triggers */
  showBar?: boolean;
  className?: string;
};

type SearchResult =
  | { type: "product"; href: string; title: string; subtitle: string }
  | { type: "post"; href: string; title: string; subtitle: string };

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
      />
    </svg>
  );
}

export function SearchDialog({
  locale,
  labels,
  showBar = false,
  className = "",
}: SearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const products = (productsData as Product[])
      .map((product) => {
        const name = pickLocalized(product.name, locale);
        const excerpt = pickLocalized(product.shortDescription, locale);
        const haystack = `${name} ${excerpt} ${product.slug}`.toLowerCase();

        if (!haystack.includes(q)) return null;

        return {
          type: "product" as const,
          href: getProductPath(locale, product),
          title: name,
          subtitle: excerpt,
        };
      })
      .filter(Boolean) as SearchResult[];

    const posts = (blogPostsData as BlogPost[])
      .map((post) => {
        const title = pickLocalized(post.title, locale);
        const excerpt = pickLocalized(post.excerpt, locale);
        const haystack = `${title} ${excerpt} ${post.slug}`.toLowerCase();

        if (!haystack.includes(q)) return null;

        return {
          type: "post" as const,
          href: `/${locale}/blog/category/${post.categorySlug}/${post.slug}`,
          title,
          subtitle: excerpt,
        };
      })
      .filter(Boolean) as SearchResult[];

    return [...products, ...posts].slice(0, 8);
  }, [query, locale]);

  const productResults = results.filter((item) => item.type === "product");
  const postResults = results.filter((item) => item.type === "post");

  const iconTrigger = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={labels.search}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      <SearchIcon className="h-4 w-4" />
    </button>
  );

  const barTrigger = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={labels.search}
      className="flex h-11 w-full items-center gap-3 rounded-lg border border-transparent bg-search-bg px-4 text-sm text-muted-foreground transition-colors hover:border-primary/30 focus-visible:border-primary focus-visible:outline-none"
    >
      <SearchIcon className="h-5 w-5 shrink-0 text-primary" />
      <span className="flex-1 truncate text-start">{labels.searchPlaceholder}</span>
      <kbd className="hidden shrink-0 rounded border border-border bg-card px-1.5 py-0.5 text-[10px] text-muted-foreground lg:inline">
        Ctrl K
      </kbd>
    </button>
  );

  return (
    <>
      {showBar ? (
        <>
          <div className={`mx-auto hidden max-w-2xl flex-1 md:flex ${className}`}>
            {barTrigger}
          </div>
          <div className="md:hidden">{iconTrigger}</div>
        </>
      ) : (
        <div className={className}>{iconTrigger}</div>
      )}

      {open ? (
        <div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 p-4 pt-[12vh]">
          <button
            type="button"
            aria-label={labels.close}
            className="absolute inset-0"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-10 w-full max-w-xl rounded-xl border border-border bg-card shadow-2xl">
            <div className="border-b border-border p-4">
              <div className="flex items-center gap-3">
                <SearchIcon className="h-5 w-5 shrink-0 text-primary" />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={labels.searchPlaceholder}
                  className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {query && results.length === 0 ? (
                <p className="p-4 text-sm text-muted-foreground">
                  {labels.searchNoResults}
                </p>
              ) : null}

              {productResults.length > 0 ? (
                <div className="p-2">
                  <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {labels.searchProducts}
                  </p>
                  <ul>
                    {productResults.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2 transition-colors hover:bg-accent-soft"
                        >
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="line-clamp-1 text-sm text-muted-foreground">
                            {item.subtitle}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {postResults.length > 0 ? (
                <div className="p-2">
                  <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {labels.searchPosts}
                  </p>
                  <ul>
                    {postResults.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2 transition-colors hover:bg-accent-soft"
                        >
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="line-clamp-1 text-sm text-muted-foreground">
                            {item.subtitle}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
