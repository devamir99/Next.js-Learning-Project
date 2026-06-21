import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { LocalizedCategory } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";

type CategoryIconGridProps = {
  locale: Locale;
  categories: LocalizedCategory[];
  title: string;
  subtitle: string;
};

export function CategoryIconGrid({
  locale,
  categories,
  title,
  subtitle,
}: CategoryIconGridProps) {
  return (
    <section className="border-b border-border bg-card py-6">
      <Container>
        <SectionHeader title={title} subtitle={subtitle} />
        <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${locale}/shop/products/${category.slug}`}
              className="group flex flex-col items-center gap-2.5"
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border bg-accent-soft/30 shadow-sm transition-all group-hover:border-primary group-hover:shadow-md sm:h-20 sm:w-20">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="80px"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="line-clamp-2 text-center text-xs font-medium text-muted-foreground group-hover:text-primary sm:text-sm">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
