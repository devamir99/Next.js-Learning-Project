import type { Metadata } from "next";
import { ProductListing } from "@/components/shop/ProductListing";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCategories, getProducts } from "@/lib/data";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";

type ProductsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ProductsPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};

  const dictionary = await getDictionary(localeParam);
  return {
    title: dictionary.shop.productsTitle,
    description: dictionary.shop.subtitle,
  };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const products = getProducts(locale);
  const categories = getCategories(locale);

  return (
    <Container className="py-12">
      <Breadcrumb
        items={[
          { label: dictionary.shop.breadcrumbHome, href: `/${locale}` },
          { label: dictionary.shop.breadcrumbShop, href: `/${locale}/shop` },
          { label: dictionary.shop.productsTitle },
        ]}
      />

      <SectionHeader
        title={dictionary.shop.productsTitle}
        subtitle={`${dictionary.shop.subtitle} · ${products.length} ${dictionary.common.products}`}
        className="mt-6"
      />

      <div className="mt-10">
        <ProductListing
          locale={locale}
          products={products}
          categories={categories}
          labels={dictionary.shop}
        />
      </div>
    </Container>
  );
}
