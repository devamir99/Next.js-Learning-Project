import { formatPrice } from "@/lib/data/products";
import type { LocalizedProduct } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";

type PriceTagProps = {
  product: Pick<LocalizedProduct, "price" | "compareAtPrice" | "currency">;
  locale: Locale;
  size?: "sm" | "lg";
};

export function PriceTag({ product, locale, size = "sm" }: PriceTagProps) {
  const priceClass = size === "lg" ? "text-3xl" : "text-lg";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`font-bold text-primary ${priceClass}`}>
        {formatPrice(product.price, locale, product.currency)}
      </span>
      {product.compareAtPrice ? (
        <span className="text-sm text-muted-foreground line-through">
          {formatPrice(product.compareAtPrice, locale, product.currency)}
        </span>
      ) : null}
    </div>
  );
}
