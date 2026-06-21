import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getBlogCategoryBySlug, getBlogPosts } from "@/lib/data";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";

type BlogCategoryPageProps = {
  params: Promise<{ locale: string; category: string }>;
};

export default async function BlogCategoryPage({ params }: BlogCategoryPageProps) {
  const { locale: localeParam, category: categorySlug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const category = getBlogCategoryBySlug(categorySlug, locale);

  if (!category) notFound();

  const dictionary = await getDictionary(locale);
  const posts = getBlogPosts(locale, categorySlug);

  return (
    <Container className="py-12">
      <SectionHeader
        title={category.name}
        subtitle={category.description}
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            post={post}
            locale={locale}
            minReadLabel={dictionary.blog.minRead}
          />
        ))}
      </div>
      <Link
        href={`/${locale}/blog`}
        className="mt-8 inline-block text-primary hover:underline"
      >
        ← {dictionary.nav.blog}
      </Link>
    </Container>
  );
}
