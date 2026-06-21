import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { LocalizedProduct } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";

type HomeProductSectionProps = {
  locale: Locale;
  title: string;
  subtitle: string;
  viewAllLabel: string;
  viewAllHref: string;
  products: LocalizedProduct[];
  labels: {
    inStock: string;
    outOfStock: string;
  };
};

export function HomeProductSection({
  locale,
  title,
  subtitle,
  viewAllLabel,
  viewAllHref,
  products,
  labels,
}: HomeProductSectionProps) {
  return (
    <section className="py-14">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader title={title} subtitle={subtitle} />
          <Link
            href={viewAllHref}
            className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            {viewAllLabel} →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              labels={labels}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
