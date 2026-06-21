import Link from "next/link";
import { BlogCardCompact } from "@/components/blog/BlogCardCompact";
import { ProductCarousel } from "@/components/shop/ProductCarousel";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { LocalizedBlogPost } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";

type HomeBlogSectionProps = {
  locale: Locale;
  posts: LocalizedBlogPost[];
  title: string;
  subtitle: string;
  viewAllLabel: string;
  viewAllHref: string;
  minReadLabel: string;
  scrollLabels: {
    prev: string;
    next: string;
  };
};

export function HomeBlogSection({
  locale,
  posts,
  title,
  subtitle,
  viewAllLabel,
  viewAllHref,
  minReadLabel,
  scrollLabels,
}: HomeBlogSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-border bg-card py-6 sm:py-8">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader title={title} subtitle={subtitle} />
          <Link
            href={viewAllHref}
            className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            {viewAllLabel} →
          </Link>
        </div>
        <div className="mt-6">
          <ProductCarousel
            scrollPrevLabel={scrollLabels.prev}
            scrollNextLabel={scrollLabels.next}
          >
            {posts.map((post) => (
              <BlogCardCompact
                key={`${post.categorySlug}-${post.slug}`}
                post={post}
                locale={locale}
                minReadLabel={minReadLabel}
              />
            ))}
          </ProductCarousel>
        </div>
      </Container>
    </section>
  );
}
