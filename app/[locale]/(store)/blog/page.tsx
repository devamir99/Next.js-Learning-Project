import { BlogCard } from "@/components/blog/BlogCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getBlogCategories, getBlogPosts } from "@/lib/data";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";

type BlogPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const categories = getBlogCategories(locale);
  const posts = getBlogPosts(locale);

  return (
    <Container className="py-12">
      <SectionHeader
        title={dictionary.nav.blog}
        subtitle={`${dictionary.blog.subtitle} · ${posts.length} posts`}
      />

      <section className="mt-10">
        <SectionHeader title={dictionary.blog.categoriesTitle} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category.slug}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {category.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {category.description}
              </p>
              <p className="mt-3 text-sm font-medium text-primary">
                {category.postCount} posts
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeader title={dictionary.blog.latestPosts} />
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={`${post.categorySlug}-${post.slug}`}
              post={post}
              locale={locale}
              minReadLabel={dictionary.blog.minRead}
            />
          ))}
        </div>
      </section>
    </Container>
  );
}
