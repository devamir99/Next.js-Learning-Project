"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/Button";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type CheckoutFormProps = {
  locale: Locale;
  cartLabels: Dictionary["cart"];
  labels: Dictionary["checkout"];
};

export function CheckoutForm({ locale, cartLabels, labels }: CheckoutFormProps) {
  const { items, subtotal, shipping, total, clearCart, getProduct } = useCart();
  const [submitted, setSubmitted] = useState(false);

  const hasItems = items.some((item) => getProduct(item.productId));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    clearCart();
  }

  if (!hasItems && !submitted) {
    return (
      <div className="mt-10 rounded-xl border border-dashed border-border bg-card p-10 text-center">
        <h2 className="text-xl font-semibold text-foreground">{cartLabels.emptyTitle}</h2>
        <p className="mt-2 text-muted-foreground">{cartLabels.emptyBody}</p>
        <Link href={`/${locale}/shop/products`} className="mt-6 inline-block">
          <Button size="lg">{cartLabels.continueShopping}</Button>
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mt-10 rounded-xl border border-primary/30 bg-accent-soft p-10 text-center">
        <h2 className="text-2xl font-bold text-primary">{labels.successTitle}</h2>
        <p className="mt-3 text-muted-foreground">{labels.successBody}</p>
        <Link href={`/${locale}/shop/products`} className="mt-6 inline-block">
          <Button size="lg">{cartLabels.continueShopping}</Button>
        </Link>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
      <form onSubmit={handleSubmit} className="space-y-8">
        <p className="text-sm text-muted-foreground">{labels.mockNote}</p>

        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">{labels.shippingTitle}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium">
                {labels.fullNameLabel}
              </label>
              <input id="fullName" required placeholder={labels.fullNamePlaceholder} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="address" className="mb-1.5 block text-sm font-medium">
                {labels.addressLabel}
              </label>
              <input id="address" required placeholder={labels.addressPlaceholder} className={inputClass} />
            </div>
            <div>
              <label htmlFor="city" className="mb-1.5 block text-sm font-medium">
                {labels.cityLabel}
              </label>
              <input id="city" required placeholder={labels.cityPlaceholder} className={inputClass} />
            </div>
            <div>
              <label htmlFor="postalCode" className="mb-1.5 block text-sm font-medium">
                {labels.postalCodeLabel}
              </label>
              <input id="postalCode" required placeholder={labels.postalCodePlaceholder} className={inputClass} />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">{labels.paymentTitle}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="cardNumber" className="mb-1.5 block text-sm font-medium">
                {labels.cardNumberLabel}
              </label>
              <input id="cardNumber" required placeholder={labels.cardNumberPlaceholder} className={inputClass} dir="ltr" />
            </div>
            <div>
              <label htmlFor="expiry" className="mb-1.5 block text-sm font-medium">
                {labels.expiryLabel}
              </label>
              <input id="expiry" required placeholder={labels.expiryPlaceholder} className={inputClass} dir="ltr" />
            </div>
            <div>
              <label htmlFor="cvc" className="mb-1.5 block text-sm font-medium">
                {labels.cvcLabel}
              </label>
              <input id="cvc" required placeholder={labels.cvcPlaceholder} className={inputClass} dir="ltr" />
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <Button type="submit" size="lg">
            {labels.placeOrder}
          </Button>
          <Link href={`/${locale}/cart`}>
            <Button type="button" size="lg" variant="outline">
              {labels.backToCart}
            </Button>
          </Link>
        </div>
      </form>

      <CartSummary
        locale={locale}
        labels={cartLabels}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
      />
    </div>
  );
}
