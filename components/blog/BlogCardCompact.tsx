import Image from "next/image";
import Link from "next/link";
import type { LocalizedBlogPost } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";

type BlogCardCompactProps = {
  post: LocalizedBlogPost;
  locale: Locale;
  minReadLabel: string;
  variant?: "carousel" | "grid";
};

export function BlogCardCompact({
  post,
  locale,
  minReadLabel,
  variant = "carousel",
}: BlogCardCompactProps) {
  const href = `/${locale}/blog/category/${post.categorySlug}/${post.slug}`;

  return (
    <article
      className={
        variant === "carousel"
          ? "group w-[17rem] shrink-0 snap-start sm:w-[19rem]"
          : "group w-full"
      }
    >
      <Link
        href={href}
        className="flex h-full overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-accent-soft/40 sm:h-28 sm:w-28">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="112px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 p-3 sm:p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">
            {post.categorySlug}
          </p>
          <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-foreground group-hover:text-primary">
            {post.title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {post.readTimeMinutes} {minReadLabel}
          </p>
        </div>
      </Link>
    </article>
  );
}
