import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { getBlogPostBySlug } from "@/lib/data";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
  params: Promise<{ locale: string; category: string; slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale: localeParam, category, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const post = getBlogPostBySlug(category, slug, locale);

  if (!post) notFound();

  const dictionary = await getDictionary(locale);

  return (
    <Container className="py-12">
      <article className="mx-auto max-w-3xl">
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-xl bg-accent-soft/40">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {post.author} · {post.publishedAt} · {post.readTimeMinutes}{" "}
          {dictionary.blog.minRead}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {post.content}
        </p>
      </article>
      <Link
        href={`/${locale}/blog/category/${post.categorySlug}`}
        className="mt-8 inline-block text-primary hover:underline"
      >
        ← {post.categorySlug}
      </Link>
    </Container>
  );
}
