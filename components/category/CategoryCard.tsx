import Image from "next/image";
import Link from "next/link";
import type { LocalizedCategory } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";

type CategoryCardProps = {
  category: LocalizedCategory;
  locale: Locale;
  productsLabel: string;
};

export function CategoryCard({
  category,
  locale,
  productsLabel,
}: CategoryCardProps) {
  return (
    <Link
      href={`/${locale}/shop/products/${category.slug}`}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-accent-soft/40">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="text-lg font-semibold">{category.name}</h3>
          <p className="mt-1 text-sm text-white/85">
            {category.productCount} {productsLabel}
          </p>
        </div>
      </div>
    </Link>
  );
}
