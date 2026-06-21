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
