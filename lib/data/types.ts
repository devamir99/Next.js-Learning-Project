import type { Locale } from "@/lib/i18n/config";

export type LocalizedString = Record<Locale, string>;

export type ProductBadge = "sale" | "new" | "bestseller";

export type Category = {
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  image: string;
  productCount: number;
};

export type Product = {
  id: string;
  slug: string;
  categorySlug: string;
  subcategorySlug?: string;
  name: LocalizedString;
  shortDescription: LocalizedString;
  description: LocalizedString;
  price: number;
  compareAtPrice?: number;
  currency: "USD";
  images: string[];
  rating: number;
  reviewCount: number;
  badge?: ProductBadge;
  inStock: boolean;
  featured?: boolean;
};

export type BlogCategory = {
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  postCount: number;
};

export type BlogPost = {
  slug: string;
  categorySlug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  content: LocalizedString;
  coverImage: string;
  author: LocalizedString;
  publishedAt: string;
  readTimeMinutes: number;
  featured?: boolean;
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: LocalizedString;
  body: LocalizedString;
  createdAt: string;
};

export type LocalizedProduct = Omit<
  Product,
  "name" | "shortDescription" | "description"
> & {
  name: string;
  shortDescription: string;
  description: string;
};

export type LocalizedBlogPost = Omit<
  BlogPost,
  "title" | "excerpt" | "content" | "author"
> & {
  title: string;
  excerpt: string;
  content: string;
  author: string;
};

export type LocalizedCategory = Omit<Category, "name" | "description"> & {
  name: string;
  description: string;
};

export type LocalizedBlogCategory = Omit<
  BlogCategory,
  "name" | "description"
> & {
  name: string;
  description: string;
};

export type LocalizedReview = Omit<Review, "title" | "body"> & {
  title: string;
  body: string;
};

export type HomeStory = {
  id: string;
  label: LocalizedString;
  href: string;
  image: string;
  ringColor: string;
};

export type HomeSlide = {
  id: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  cta: LocalizedString;
  href: string;
  image: string;
  badge?: LocalizedString;
};

export type QuickAccessIcon =
  | "shop"
  | "sale"
  | "fashion"
  | "mobile"
  | "blog"
  | "cart"
  | "beauty"
  | "sports";

export type QuickAccessItem = {
  id: string;
  label: LocalizedString;
  href: string;
  icon: QuickAccessIcon;
  bgColor: string;
  iconColor: string;
};

export type LocalizedHomeStory = Omit<HomeStory, "label"> & { label: string };
export type LocalizedHomeSlide = Omit<
  HomeSlide,
  "title" | "subtitle" | "cta" | "badge"
> & {
  title: string;
  subtitle: string;
  cta: string;
  badge?: string;
};
export type LocalizedQuickAccessItem = Omit<QuickAccessItem, "label"> & {
  label: string;
};

export type PromoBannerLayout = "grid-4" | "grid-2" | "wide";

export type PromoBannerItem = {
  id: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  href: string;
  image: string;
  accentColor: string;
};

export type PromoBannerSection = {
  id: string;
  layout: PromoBannerLayout;
  items: PromoBannerItem[];
};

export type Brand = {
  id: string;
  name: LocalizedString;
  slug: string;
};

export type LocalizedPromoBannerItem = Omit<
  PromoBannerItem,
  "title" | "subtitle"
> & {
  title: string;
  subtitle: string;
};

export type LocalizedPromoBannerSection = Omit<PromoBannerSection, "items"> & {
  items: LocalizedPromoBannerItem[];
};

export type LocalizedBrand = Omit<Brand, "name"> & {
  name: string;
};
