"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import type { Locale } from "@/lib/i18n/config";

type CartIconLinkProps = {
  locale: Locale;
  label: string;
  layout?: "inline" | "stacked";
};

export function CartIconLink({
  locale,
  label,
  layout = "inline",
}: CartIconLinkProps) {
  const { itemCount, isReady } = useCart();

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75M7.5 14.25 6.106 5.272M7.5 14.25l-1.5 4.5h12.75M18.75 14.25l1.106-8.978M9.75 18.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm7.5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
      />
    </svg>
  );

  const badge =
    isReady && itemCount > 0 ? (
      <span className="absolute -end-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-[9px] font-bold text-primary-foreground">
        {itemCount > 99 ? "99+" : itemCount}
      </span>
    ) : null;

  if (layout === "stacked") {
    return (
      <Link
        href={`/${locale}/cart`}
        aria-label={label}
        className="relative flex flex-col items-center gap-0.5 px-2 py-1 text-muted-foreground transition-colors hover:text-primary"
      >
        <span className="relative">{icon}{badge}</span>
        <span className="max-w-[4.5rem] truncate text-[10px] font-medium leading-none">
          {label}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/${locale}/cart`}
      aria-label={label}
      className="relative inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
      {badge}
    </Link>
  );
}
