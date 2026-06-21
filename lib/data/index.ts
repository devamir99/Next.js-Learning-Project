import { rawBlogCategories, rawBlogPosts } from "./blog";
import { rawCategories } from "./categories";
import { rawProducts } from "./products";
import { rawReviews } from "./reviews";

export * from "./types";
export * from "./pick-localized";
export * from "./localize";
export * from "./categories";
export * from "./products";
export * from "./blog";
export * from "./reviews";
export * from "./home";

export function getCatalogStats() {
  return {
    productCount: rawProducts.length,
    categoryCount: rawCategories.length,
    blogPostCount: rawBlogPosts.length,
    blogCategoryCount: rawBlogCategories.length,
    reviewCount: rawReviews.length,
  };
}
