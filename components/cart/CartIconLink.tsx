"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import type { Locale } from "@/lib/i18n/config";

type CartIconLinkProps = {
  locale: Locale;
  label: string;
};

export function CartIconLink({ locale, label }: CartIconLinkProps) {
  const { itemCount, isReady } = useCart();

  return (
    <Link
      href={`/${locale}/cart`}
      aria-label={label}
      className="relative inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75M7.5 14.25 6.106 5.272M7.5 14.25l-1.5 4.5h12.75M18.75 14.25l1.106-8.978M9.75 18.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm7.5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
      </svg>
      <span className="hidden sm:inline">{label}</span>
      {isReady && itemCount > 0 ? (
        <span className="absolute -end-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </Link>
  );
}
