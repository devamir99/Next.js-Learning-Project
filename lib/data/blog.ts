import type { Locale } from "@/lib/i18n/config";
import blogCategoriesData from "@/data/blog-categories.json";
import blogPostsData from "@/data/blog-posts.json";
import { localizeBlogCategory, localizeBlogPost } from "./localize";
import type { BlogCategory, BlogPost, LocalizedBlogCategory, LocalizedBlogPost } from "./types";

const blogCategories = blogCategoriesData as BlogCategory[];
const blogPosts = blogPostsData as BlogPost[];

export function getBlogCategories(locale: Locale): LocalizedBlogCategory[] {
  return blogCategories.map((category) =>
    localizeBlogCategory(category, locale)
  );
}

export function getBlogCategoryBySlug(
  slug: string,
  locale: Locale
): LocalizedBlogCategory | undefined {
  const category = blogCategories.find((item) => item.slug === slug);
  return category ? localizeBlogCategory(category, locale) : undefined;
}

export function getBlogPosts(
  locale: Locale,
  categorySlug?: string
): LocalizedBlogPost[] {
  const filtered = categorySlug
    ? blogPosts.filter((post) => post.categorySlug === categorySlug)
    : blogPosts;

  return filtered
    .map((post) => localizeBlogPost(post, locale))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getFeaturedBlogPosts(locale: Locale): LocalizedBlogPost[] {
  return blogPosts
    .filter((post) => post.featured)
    .map((post) => localizeBlogPost(post, locale))
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getBlogPostBySlug(
  categorySlug: string,
  slug: string,
  locale: Locale
): LocalizedBlogPost | undefined {
  const post = blogPosts.find(
    (item) => item.categorySlug === categorySlug && item.slug === slug
  );

  return post ? localizeBlogPost(post, locale) : undefined;
}

export function getAllBlogPostPaths(): Array<{ categorySlug: string; slug: string }> {
  return blogPosts.map((post) => ({
    categorySlug: post.categorySlug,
    slug: post.slug,
  }));
}

export function getAllBlogCategorySlugs(): string[] {
  return blogCategories.map((category) => category.slug);
}

export { blogCategories as rawBlogCategories, blogPosts as rawBlogPosts };
