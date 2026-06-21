import type { Locale } from "@/lib/i18n/config";
import reviewsData from "@/data/reviews.json";
import { localizeReview } from "./localize";
import type { LocalizedReview, Review } from "./types";

const reviews = reviewsData as Review[];

export function getReviewsByProductId(
  productId: string,
  locale: Locale
): LocalizedReview[] {
  return reviews
    .filter((review) => review.productId === productId)
    .map((review) => localizeReview(review, locale))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export function getReviewCountForProduct(productId: string): number {
  return reviews.filter((review) => review.productId === productId).length;
}

export function getAverageRatingForProduct(productId: string): number | null {
  const productReviews = reviews.filter(
    (review) => review.productId === productId
  );

  if (productReviews.length === 0) {
    return null;
  }

  const total = productReviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / productReviews.length) * 10) / 10;
}

export { reviews as rawReviews };
