"use client";

import { formatPrice } from "@/lib/data/products";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type CartSummaryProps = {
  locale: Locale;
  labels: Dictionary["cart"];
  subtotal: number;
  shipping: number;
  total: number;
};

export function CartSummary({
  locale,
  labels,
  subtotal,
  shipping,
  total,
}: CartSummaryProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">{labels.orderSummary}</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">{labels.subtotal}</dt>
          <dd className="font-medium text-foreground">
            {formatPrice(subtotal, locale)}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">{labels.shipping}</dt>
          <dd className="font-medium text-foreground">
            {shipping === 0 ? labels.shippingFree : formatPrice(shipping, locale)}
          </dd>
        </div>
        <div className="border-t border-border pt-3 flex items-center justify-between">
          <dt className="font-semibold text-foreground">{labels.total}</dt>
          <dd className="text-lg font-bold text-primary">
            {formatPrice(total, locale)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
