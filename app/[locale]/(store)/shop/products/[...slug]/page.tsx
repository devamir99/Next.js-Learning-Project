import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { PriceTag } from "@/components/product/PriceTag";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductDetailTabs } from "@/components/product/ProductDetailTabs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { VariantSelector } from "@/components/product/VariantSelector";
import { ProductListing } from "@/components/shop/ProductListing";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { RatingStars } from "@/components/ui/RatingStars";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCategories, getCategoryBySlug } from "@/lib/data/categories";
import { getRelatedProducts } from "@/lib/data/products";
import { getReviewsByProductId } from "@/lib/data/reviews";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import {
  getProductsForRoute,
  getSubcategoriesForCategory,
  resolveShopRoute,
} from "@/lib/shop/resolve-route";

type CatchAllShopPageProps = {
  params: Promise<{ locale: string; slug: string[] }>;
};

const MOCK_COLORS = ["black", "white", "red"];
const MOCK_SIZES = ["s", "m", "l", "xl"];

export async function generateMetadata({
  params,
}: CatchAllShopPageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};

  const locale = localeParam as Locale;
  const route = resolveShopRoute(slug, locale);

  if (!route || route.type !== "product") {
    return {};
  }

  return {
    title: route.product.name,
    description: route.product.shortDescription,
  };
}

function buildBreadcrumbs(
  locale: Locale,
  dictionary: Awaited<ReturnType<typeof getDictionary>>,
  slug: string[],
  route: NonNullable<ReturnType<typeof resolveShopRoute>>
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: dictionary.shop.breadcrumbHome, href: `/${locale}` },
    { label: dictionary.shop.breadcrumbShop, href: `/${locale}/shop` },
    {
      label: dictionary.shop.productsTitle,
      href: `/${locale}/shop/products`,
    },
  ];

  const categorySlug = slug[0];
  const category = categorySlug
    ? getCategoryBySlug(categorySlug, locale)
    : undefined;

  if (category) {
    items.push({
      label: category.name,
      href: `/${locale}/shop/products/${category.slug}`,
    });
  }

  if (route.type === "subcategory") {
    items.push({ label: route.subcategorySlug });
  }

  if (route.type === "product") {
    if (route.product.subcategorySlug && slug.length >= 3) {
      items.push({
        label: route.product.subcategorySlug,
        href: `/${locale}/shop/products/${route.product.categorySlug}/${route.product.subcategorySlug}`,
      });
    }
    items.push({ label: route.product.name });
  }

  return items;
}

export default async function CatchAllShopPage({ params }: CatchAllShopPageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const route = resolveShopRoute(slug, locale);

  if (!route) notFound();

  if (route.type === "product") {
    const { product } = route;
    const reviews = getReviewsByProductId(product.id, locale);
    const related = getRelatedProducts(product, locale);
    const breadcrumbs = buildBreadcrumbs(locale, dictionary, slug, route);

    const badgeLabels = {
      sale: locale === "fa" ? "حراج" : "Sale",
      new: locale === "fa" ? "جدید" : "New",
      bestseller: locale === "fa" ? "پرفروش" : "Best Seller",
    };

    return (
      <Container className="py-12">
        <Breadcrumb items={breadcrumbs} />

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} productName={product.name} />

          <div>
            {product.badge ? (
              <Badge className="mb-3">{badgeLabels[product.badge]}</Badge>
            ) : null}
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-muted-foreground">{product.shortDescription}</p>

            <div className="mt-4 flex items-center gap-2">
              <RatingStars rating={product.rating} />
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            <div className="mt-6">
              <PriceTag product={product} locale={locale} size="lg" />
            </div>

            <div className="mt-6">
              <VariantSelector
                colorLabel={dictionary.shop.selectColor}
                sizeLabel={dictionary.shop.selectSize}
                colors={MOCK_COLORS}
                sizes={MOCK_SIZES}
              />
            </div>

            <div className="mt-8">
              <AddToCartButton
                productId={product.id}
                disabled={!product.inStock}
                addLabel={dictionary.shop.addToCart}
                addedLabel={dictionary.shop.addedToCart}
              />
              {!product.inStock ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  {dictionary.shop.outOfStock}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <ProductDetailTabs
          description={product.description}
          reviews={reviews}
          shippingBody={dictionary.shop.shippingBody}
          labels={{
            tabDescription: dictionary.shop.tabDescription,
            tabReviews: dictionary.shop.tabReviews,
            tabShipping: dictionary.shop.tabShipping,
          }}
        />

        {related.length > 0 ? (
          <section className="mt-16">
            <SectionHeader title={dictionary.shop.relatedProducts} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  locale={locale}
                  labels={{
                    inStock: dictionary.shop.inStock,
                    outOfStock: dictionary.shop.outOfStock,
                  }}
                />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    );
  }

  const products = getProductsForRoute(locale, route);
  const categories = getCategories(locale);
  const category = getCategoryBySlug(route.categorySlug, locale);

  if (!category) notFound();

  const title =
    route.type === "subcategory"
      ? `${category.name} / ${route.subcategorySlug}`
      : category.name;

  const breadcrumbs = buildBreadcrumbs(locale, dictionary, slug, route);

  const subcategories =
    route.type === "category" ? getSubcategoriesForCategory(route.categorySlug) : [];

  return (
    <Container className="py-12">
      <Breadcrumb items={breadcrumbs} />

      <SectionHeader
        title={title}
        subtitle={category.description}
        className="mt-6"
      />

      {route.type === "category" && subcategories.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {subcategories.map((subcategory) => (
            <Link
              key={subcategory}
              href={`/${locale}/shop/products/${route.categorySlug}/${subcategory}`}
              className="rounded-full border border-border px-3 py-1 text-sm capitalize text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {subcategory}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="mt-10">
        <ProductListing
          locale={locale}
          products={products}
          categories={categories}
          labels={dictionary.shop}
          initialCategory={route.categorySlug}
        />
      </div>
    </Container>
  );
}
