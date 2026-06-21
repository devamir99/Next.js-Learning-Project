import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { LocalizedBrand } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";

type BrandStripProps = {
  locale: Locale;
  brands: LocalizedBrand[];
  title: string;
  subtitle: string;
};

export function BrandStrip({
  locale,
  brands,
  title,
  subtitle,
}: BrandStripProps) {
  return (
    <section className="border-y border-border bg-card py-6">
      <Container>
        <SectionHeader title={title} subtitle={subtitle} />
        <div className="scrollbar-hide mt-6 flex gap-3 overflow-x-auto pb-1 sm:gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/${locale}/shop/products`}
              className="group flex h-14 min-w-[7rem] shrink-0 items-center justify-center rounded-xl border border-border bg-background px-4 transition-colors hover:border-primary hover:bg-subnav-hover sm:h-16 sm:min-w-[8rem]"
            >
              <span className="text-sm font-semibold tracking-wide text-muted-foreground transition-colors group-hover:text-primary sm:text-base">
                {brand.name}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
