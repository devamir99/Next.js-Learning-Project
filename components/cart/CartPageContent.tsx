"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type CartPageContentProps = {
  locale: Locale;
  labels: Dictionary["cart"];
};

export function CartPageContent({
  locale,
  labels,
}: CartPageContentProps) {
  const { items, isReady, getProduct, subtotal, shipping, total } = useCart();

  if (!isReady) {
    return (
      <div className="mt-10 rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
        ...
      </div>
    );
  }

  const resolvedItems = items
    .map((item) => ({
      item,
      product: getProduct(item.productId),
    }))
    .filter((entry) => entry.product);

  if (resolvedItems.length === 0) {
    return (
      <div className="mt-10 rounded-xl border border-dashed border-border bg-card p-10 text-center">
        <h2 className="text-xl font-semibold text-foreground">{labels.emptyTitle}</h2>
        <p className="mt-2 text-muted-foreground">{labels.emptyBody}</p>
        <Link href={`/${locale}/shop/products`} className="mt-6 inline-block">
          <Button size="lg">{labels.continueShopping}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        {resolvedItems.map(({ item, product }) =>
          product ? (
            <CartItemRow
              key={item.productId}
              locale={locale}
              product={product}
              quantity={item.quantity}
              labels={labels}
            />
          ) : null
        )}
      </div>

      <div className="space-y-4">
        <CartSummary
          locale={locale}
          labels={labels}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
        />
        <Link href={`/${locale}/checkout`} className="block">
          <Button size="lg" className="w-full">
            {labels.proceedCheckout}
          </Button>
        </Link>
        <Link
          href={`/${locale}/shop/products`}
          className="block text-center text-sm text-primary hover:underline"
        >
          {labels.continueShopping}
        </Link>
      </div>
    </div>
  );
}
