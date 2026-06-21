"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice, getProductPath } from "@/lib/data/products";
import type { LocalizedProduct } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type CartItemRowProps = {
  locale: Locale;
  product: LocalizedProduct;
  quantity: number;
  labels: Dictionary["cart"];
};

export function CartItemRow({
  locale,
  product,
  quantity,
  labels,
}: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <article className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
      <Link
        href={getProductPath(locale, product)}
        className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-accent-soft/40"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <div>
          <Link
            href={getProductPath(locale, product)}
            className="line-clamp-2 font-semibold text-foreground transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
          <p className="mt-1 text-sm font-bold text-primary">
            {formatPrice(product.price, locale, product.currency)}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-sm hover:border-primary"
            >
              −
            </button>
            <span className="min-w-8 text-center text-sm font-medium">{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-sm hover:border-primary"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(product.id)}
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {labels.remove}
          </button>
        </div>
      </div>
    </article>
  );
}
