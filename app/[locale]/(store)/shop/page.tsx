import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCategories, getProducts } from "@/lib/data";
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
  const products = getProducts(locale);

  return (
    <Container className="py-12">
      <SectionHeader
        title={dictionary.nav.shop}
        subtitle={`${dictionary.shop.subtitle} · ${products.length} ${dictionary.common.products}`}
      />

      <section className="mt-10">
        <SectionHeader title={dictionary.shop.categoriesTitle} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.slug}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {category.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {category.description}
              </p>
              <p className="mt-3 text-sm font-medium text-primary">
                {category.productCount} {dictionary.common.products}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeader title={dictionary.shop.productsTitle} />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              locale={locale}
              labels={{
                inStock: dictionary.shop.inStock,
                outOfStock: dictionary.shop.outOfStock,
              }}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
