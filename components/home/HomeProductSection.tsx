import Link from "next/link";
import { ProductCardCompact } from "@/components/product/ProductCardCompact";
import { ProductCarousel } from "@/components/shop/ProductCarousel";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDiscountPercent } from "@/lib/data/products";
import type { LocalizedProduct } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";

type HomeProductSectionProps = {
  locale: Locale;
  title: string;
  subtitle: string;
  viewAllLabel: string;
  viewAllHref: string;
  products: LocalizedProduct[];
  layout?: "grid" | "carousel";
  discountLabel?: string;
  scrollLabels?: {
    prev: string;
    next: string;
  };
  className?: string;
};

export function HomeProductSection({
  locale,
  title,
  subtitle,
  viewAllLabel,
  viewAllHref,
  products,
  layout = "grid",
  discountLabel,
  scrollLabels,
  className = "",
}: HomeProductSectionProps) {
  if (products.length === 0) return null;

  const renderProduct = (product: LocalizedProduct) => {
    const discount = getDiscountPercent(product);
    return (
      <ProductCardCompact
        key={product.id}
        product={product}
        locale={locale}
        variant={layout === "carousel" ? "carousel" : "grid"}
        discountLabel={
          discount !== null && discountLabel
            ? discountLabel.replace("{percent}", String(discount))
            : undefined
        }
      />
    );
  };

  return (
    <section className={`py-6 sm:py-8 ${className}`}>
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

        {layout === "carousel" ? (
          <div className="mt-6">
            <ProductCarousel
              scrollPrevLabel={scrollLabels?.prev ?? "Previous"}
              scrollNextLabel={scrollLabels?.next ?? "Next"}
            >
              {products.map((product) => renderProduct(product))}
            </ProductCarousel>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {products.map((product) => renderProduct(product))}
          </div>
        )}
      </Container>
    </section>
  );
}
