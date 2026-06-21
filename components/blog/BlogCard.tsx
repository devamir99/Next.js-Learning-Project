import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { LocalizedBlogPost } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";

type BlogCardProps = {
  post: LocalizedBlogPost;
  locale: Locale;
  minReadLabel: string;
};

export function BlogCard({ post, locale, minReadLabel }: BlogCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/9] overflow-hidden bg-accent-soft/40">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-4">
        <Badge variant="secondary">{post.categorySlug}</Badge>
        <h3 className="line-clamp-2 text-lg font-semibold text-foreground">
          <Link
            href={`/${locale}/blog/category/${post.categorySlug}/${post.slug}`}
            className="transition-colors hover:text-primary"
          >
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{post.author}</span>
          <span>
            {post.readTimeMinutes} {minReadLabel}
          </span>
        </div>
      </div>
    </article>
  );
}
