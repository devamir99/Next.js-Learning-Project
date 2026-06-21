import Link from "next/link";
import { DealCountdown } from "@/components/home/DealCountdown";
import { ProductCardCompact } from "@/components/product/ProductCardCompact";
import { ProductCarousel } from "@/components/shop/ProductCarousel";
import { Container } from "@/components/ui/Container";
import { getDiscountPercent } from "@/lib/data/products";
import type { LocalizedProduct } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";

type AmazingDealsSectionProps = {
  locale: Locale;
  products: LocalizedProduct[];
  endsAt: string;
  labels: {
    title: string;
    endsIn: string;
    viewAll: string;
    discount: string;
    scrollPrev: string;
    scrollNext: string;
    countdownHours: string;
    countdownMinutes: string;
    countdownSeconds: string;
  };
  viewAllHref: string;
};

export function AmazingDealsSection({
  locale,
  products,
  endsAt,
  labels,
  viewAllHref,
}: AmazingDealsSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-4">
      <Container>
        <div className="overflow-hidden rounded-2xl bg-primary shadow-sm">
          <div className="flex flex-col md:flex-row">
            <aside className="flex shrink-0 flex-row items-center justify-between gap-4 border-b border-white/15 p-4 md:w-44 md:flex-col md:items-stretch md:justify-center md:border-b-0 md:border-e md:p-5 lg:w-52">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-white/80">
                  {labels.endsIn}
                </p>
                <h2 className="mt-1 text-lg font-bold leading-tight text-white md:text-xl">
                  {labels.title}
                </h2>
              </div>
              <DealCountdown
                endsAt={endsAt}
                labels={{
                  hours: labels.countdownHours,
                  minutes: labels.countdownMinutes,
                  seconds: labels.countdownSeconds,
                }}
              />
              <Link
                href={viewAllHref}
                className="hidden text-sm font-semibold text-white underline-offset-4 transition-colors hover:underline md:inline"
              >
                {labels.viewAll} →
              </Link>
            </aside>

            <div className="min-w-0 flex-1 bg-white/10 p-3 md:p-4">
              <ProductCarousel
                scrollPrevLabel={labels.scrollPrev}
                scrollNextLabel={labels.scrollNext}
              >
                {products.map((product) => {
                  const discount = getDiscountPercent(product);
                  return (
                    <ProductCardCompact
                      key={product.id}
                      product={product}
                      locale={locale}
                      discountLabel={
                        discount !== null
                          ? labels.discount.replace("{percent}", String(discount))
                          : undefined
                      }
                    />
                  );
                })}
              </ProductCarousel>
              <div className="mt-2 text-center md:hidden">
                <Link
                  href={viewAllHref}
                  className="text-sm font-semibold text-white underline-offset-4 hover:underline"
                >
                  {labels.viewAll} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function getDealDeadline(): string {
  const end = new Date();
  end.setHours(23, 59, 59, 0);
  return end.toISOString();
}
