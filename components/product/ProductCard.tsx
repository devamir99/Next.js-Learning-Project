import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { formatPrice } from "@/lib/data/products";
import type { LocalizedProduct } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";

type ProductCardProps = {
  product: LocalizedProduct;
  locale: Locale;
  labels: {
    inStock: string;
    outOfStock: string;
  };
};

const badgeLabels: Record<NonNullable<LocalizedProduct["badge"]>, { fa: string; en: string }> = {
  sale: { fa: "حراج", en: "Sale" },
  new: { fa: "جدید", en: "New" },
  bestseller: { fa: "پرفروش", en: "Best Seller" },
};

export function ProductCard({ product, locale, labels }: ProductCardProps) {
  const badgeLabel = product.badge ? badgeLabels[product.badge][locale] : null;

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-accent-soft/40">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {badgeLabel ? (
          <Badge className="absolute start-3 top-3">{badgeLabel}</Badge>
        ) : null}
      </div>
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.shortDescription}
        </p>
        <div className="flex items-center gap-2">
          <RatingStars rating={product.rating} />
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price, locale, product.currency)}
            </span>
            {product.compareAtPrice ? (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice, locale, product.currency)}
              </span>
            ) : null}
          </div>
          <span
            className={`text-xs font-medium ${product.inStock ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}
          >
            {product.inStock ? labels.inStock : labels.outOfStock}
          </span>
        </div>
      </div>
    </article>
  );
}
