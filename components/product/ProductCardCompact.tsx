import Link from "next/link";
import Image from "next/image";
import { formatPrice, getDiscountPercent, getProductPath } from "@/lib/data/products";
import type { LocalizedProduct } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";

type ProductCardCompactProps = {
  product: LocalizedProduct;
  locale: Locale;
  discountLabel?: string;
};

export function ProductCardCompact({
  product,
  locale,
  discountLabel,
}: ProductCardCompactProps) {
  const href = getProductPath(locale, product);
  const discount = getDiscountPercent(product);

  return (
    <article className="group w-[9.5rem] shrink-0 snap-start sm:w-[10.5rem]">
      <Link
        href={href}
        className="flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="relative aspect-square overflow-hidden bg-accent-soft/30 p-3">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="168px"
            className="object-contain p-1 transition-transform duration-300 group-hover:scale-105"
          />
          {discount !== null && discountLabel ? (
            <span className="absolute end-2 top-2 rounded-md bg-primary px-1.5 py-0.5 text-[11px] font-bold text-primary-foreground">
              {discountLabel}
            </span>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-3">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-xs leading-5 text-foreground">
            {product.name}
          </h3>
          <div className="mt-auto flex flex-col gap-0.5">
            <span className="text-sm font-bold text-primary">
              {formatPrice(product.price, locale, product.currency)}
            </span>
            {product.compareAtPrice ? (
              <span className="text-[11px] text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice, locale, product.currency)}
              </span>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
