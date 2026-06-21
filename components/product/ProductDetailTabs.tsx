"use client";

import { useState } from "react";
import { RatingStars } from "@/components/ui/RatingStars";
import type { LocalizedReview } from "@/lib/data/types";

type ProductDetailTabsProps = {
  description: string;
  reviews: LocalizedReview[];
  shippingBody: string;
  labels: {
    tabDescription: string;
    tabReviews: string;
    tabShipping: string;
  };
};

type TabKey = "description" | "reviews" | "shipping";

export function ProductDetailTabs({
  description,
  reviews,
  shippingBody,
  labels,
}: ProductDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: "description", label: labels.tabDescription },
    { key: "reviews", label: labels.tabReviews },
    { key: "shipping", label: labels.tabShipping },
  ];

  return (
    <div className="mt-12">
      <div className="flex flex-wrap gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="py-6 text-sm leading-7 text-muted-foreground">
        {activeTab === "description" ? <p>{description}</p> : null}

        {activeTab === "reviews" ? (
          reviews.length > 0 ? (
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li
                  key={review.id}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-foreground">{review.author}</p>
                    <RatingStars rating={review.rating} />
                  </div>
                  <p className="mt-2 font-medium text-foreground">{review.title}</p>
                  <p className="mt-1">{review.body}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>—</p>
          )
        ) : null}

        {activeTab === "shipping" ? <p>{shippingBody}</p> : null}
      </div>
    </div>
  );
}
