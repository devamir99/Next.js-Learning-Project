import { AmazingDealsSection, getDealDeadline } from "@/components/home/AmazingDealsSection";
import { BrandStrip } from "@/components/home/BrandStrip";
import { CategoryIconGrid } from "@/components/home/CategoryIconGrid";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { HomeBlogSection } from "@/components/home/HomeBlogSection";
import { HomeProductSection } from "@/components/home/HomeProductSection";
import { PromoBannerSection } from "@/components/home/PromoBannerSection";
import { QuickAccessGrid } from "@/components/home/QuickAccessGrid";
import { StoryRail } from "@/components/home/StoryRail";
import { PortfolioCta } from "@/components/portfolio/PortfolioCta";
import {
  getBestSellerProducts,
  getBlogPosts,
  getBrands,
  getCategories,
  getDealProducts,
  getFeaturedBlogPosts,
  getHomeBannerSection,
  getHomeSlides,
  getHomeStories,
  getNewArrivalProducts,
  getPickedForYouProducts,
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
  const { home, blog, common, portfolio } = dictionary;

  const categories = getCategories(locale);
  const stories = getHomeStories(locale);
  const slides = getHomeSlides(locale);
  const quickAccess = getQuickAccessItems(locale);
  const dealProducts = getDealProducts(locale);
  const promoGrid4 = getHomeBannerSection(locale, "promo-grid-4");
  const promoWide = getHomeBannerSection(locale, "promo-wide");
  const promoGrid2 = getHomeBannerSection(locale, "promo-grid-2");
  const brands = getBrands(locale);
  const bestSellers = getBestSellerProducts(locale);
  const newArrivals = getNewArrivalProducts(locale);
  const pickedForYou = getPickedForYouProducts(locale);
  const blogPosts = (
    getFeaturedBlogPosts(locale).length > 0
      ? getFeaturedBlogPosts(locale)
      : getBlogPosts(locale)
  ).slice(0, 6);

  const scrollLabels = {
    prev: home.productScrollPrev,
    next: home.productScrollNext,
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

      <AmazingDealsSection
        locale={locale}
        products={dealProducts}
        endsAt={getDealDeadline()}
        viewAllHref={`/${locale}/shop/products`}
        labels={{
          title: home.amazingDealsTitle,
          endsIn: home.amazingDealsEndsIn,
          viewAll: home.amazingDealsViewAll,
          discount: home.amazingDealsDiscount,
          scrollPrev: home.productScrollPrev,
          scrollNext: home.productScrollNext,
          countdownHours: home.countdownHours,
          countdownMinutes: home.countdownMinutes,
          countdownSeconds: home.countdownSeconds,
        }}
      />

      {promoGrid4 ? (
        <PromoBannerSection layout={promoGrid4.layout} items={promoGrid4.items} />
      ) : null}

      <CategoryIconGrid
        locale={locale}
        categories={categories}
        title={home.shopByCategory}
        subtitle={home.shopByCategorySubtitle}
      />

      <HomeProductSection
        locale={locale}
        title={home.bestSellers}
        subtitle={home.bestSellersSubtitle}
        viewAllLabel={common.viewAll}
        viewAllHref={`/${locale}/shop/products`}
        products={bestSellers}
        layout="grid"
        discountLabel={home.amazingDealsDiscount}
        scrollLabels={scrollLabels}
      />

      {promoWide ? (
        <PromoBannerSection layout={promoWide.layout} items={promoWide.items} />
      ) : null}

      <div className="bg-accent-soft/20">
        <HomeProductSection
          locale={locale}
          title={home.newArrivals}
          subtitle={home.newArrivalsSubtitle}
          viewAllLabel={common.viewAll}
          viewAllHref={`/${locale}/shop/products`}
          products={newArrivals}
          layout="carousel"
          discountLabel={home.amazingDealsDiscount}
          scrollLabels={scrollLabels}
        />
      </div>

      <HomeProductSection
        locale={locale}
        title={home.pickedForYou}
        subtitle={home.pickedForYouSubtitle}
        viewAllLabel={common.viewAll}
        viewAllHref={`/${locale}/shop/products`}
        products={pickedForYou}
        layout="grid"
        discountLabel={home.amazingDealsDiscount}
        scrollLabels={scrollLabels}
      />

      {promoGrid2 ? (
        <PromoBannerSection layout={promoGrid2.layout} items={promoGrid2.items} />
      ) : null}

      <BrandStrip
        locale={locale}
        brands={brands}
        title={home.brandsTitle}
        subtitle={home.brandsSubtitle}
      />

      <HomeBlogSection
        locale={locale}
        posts={blogPosts}
        title={home.fromTheBlog}
        subtitle={home.fromTheBlogSubtitle}
        viewAllLabel={common.viewAll}
        viewAllHref={`/${locale}/blog`}
        minReadLabel={blog.minRead}
        scrollLabels={{
          prev: home.blogScrollPrev,
          next: home.blogScrollNext,
        }}
      />

      <PortfolioCta labels={portfolio} />
    </>
  );
}
