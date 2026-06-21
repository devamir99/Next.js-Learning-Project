import Link from "next/link";
import { CategoryCard } from "@/components/category/CategoryCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCategories } from "@/lib/data";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";

type ShopPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ShopPage({ params }: ShopPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const categories = getCategories(locale);

  return (
    <Container className="py-12">
      <SectionHeader
        title={dictionary.nav.shop}
        subtitle={dictionary.shop.subtitle}
      />

      <div className="mt-8">
        <Link
          href={`/${locale}/shop/products`}
          className="inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
        >
          {dictionary.shop.productsTitle} →
        </Link>
      </div>

      <section className="mt-12">
        <SectionHeader title={dictionary.shop.categoriesTitle} />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              locale={locale}
              productsLabel={dictionary.common.products}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
