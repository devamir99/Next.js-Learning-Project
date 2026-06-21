import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getBlogCategories } from "@/lib/data";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";

type BlogCategoriesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function BlogCategoriesPage({
  params,
}: BlogCategoriesPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const categories = getBlogCategories(locale);

  return (
    <Container className="py-12">
      <SectionHeader title={dictionary.blog.categoriesTitle} />
      <ul className="mt-8 space-y-3">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/${locale}/blog/category/${category.slug}`}
              className="text-primary hover:underline"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
