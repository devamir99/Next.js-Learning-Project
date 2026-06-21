import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryCard } from "@/components/category/CategoryCard";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { HomeProductSection } from "@/components/home/HomeProductSection";
import { QuickAccessGrid } from "@/components/home/QuickAccessGrid";
import { StoryRail } from "@/components/home/StoryRail";
import { PortfolioCta } from "@/components/portfolio/PortfolioCta";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getBestSellerProducts,
  getBlogPosts,
  getCategories,
  getFeaturedBlogPosts,
  getHomeSlides,
  getHomeStories,
  getNewArrivalProducts,
  getQuickAccessItems,
} from "@/lib/data";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const { home, shop, blog, common, portfolio } = dictionary;

  const categories = getCategories(locale);
  const stories = getHomeStories(locale);
  const slides = getHomeSlides(locale);
  const quickAccess = getQuickAccessItems(locale);
  const bestSellers = getBestSellerProducts(locale);
  const newArrivals = getNewArrivalProducts(locale);
  const blogPosts = getFeaturedBlogPosts(locale).slice(0, 3);

  const productLabels = {
    inStock: shop.inStock,
    outOfStock: shop.outOfStock,
  };

  return (
    <>
      <StoryRail stories={stories} />
      <HeroCarousel
        slides={slides}
        labels={{
          carouselPrev: home.carouselPrev,
          carouselNext: home.carouselNext,
          carouselSlide: home.carouselSlide,
        }}
      />
      <QuickAccessGrid items={quickAccess} />

      <section className="py-14">
        <Container>
          <SectionHeader
            title={home.shopByCategory}
            subtitle={home.shopByCategorySubtitle}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                locale={locale}
                productsLabel={common.products}
              />
            ))}
          </div>
        </Container>
      </section>

      <HomeProductSection
        locale={locale}
        title={home.bestSellers}
        subtitle={home.bestSellersSubtitle}
        viewAllLabel={common.viewAll}
        viewAllHref={`/${locale}/shop`}
        products={bestSellers}
        labels={productLabels}
      />

      <div className="bg-accent-soft/20">
        <HomeProductSection
          locale={locale}
          title={home.newArrivals}
          subtitle={home.newArrivalsSubtitle}
          viewAllLabel={common.viewAll}
          viewAllHref={`/${locale}/shop`}
          products={newArrivals}
          labels={productLabels}
        />
      </div>

      <section className="py-14">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              title={home.fromTheBlog}
              subtitle={home.fromTheBlogSubtitle}
            />
            <Link
              href={`/${locale}/blog`}
              className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              {common.viewAll} →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {(blogPosts.length > 0 ? blogPosts : getBlogPosts(locale).slice(0, 3)).map(
              (post) => (
                <BlogCard
                  key={`${post.categorySlug}-${post.slug}`}
                  post={post}
                  locale={locale}
                  minReadLabel={blog.minRead}
                />
              )
            )}
          </div>
        </Container>
      </section>

      <PortfolioCta labels={portfolio} />
    </>
  );
}
