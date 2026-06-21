import type { Metadata } from "next";
import { PortfolioCta } from "@/components/portfolio/PortfolioCta";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCatalogStats } from "@/lib/data";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};

  const dictionary = await getDictionary(localeParam);
  return {
    title: dictionary.nav.about,
    description: dictionary.about.subtitle,
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const { about, portfolio } = dictionary;
  const stats = getCatalogStats();

  const values = [
    { title: about.value1Title, body: about.value1Body },
    { title: about.value2Title, body: about.value2Body },
    { title: about.value3Title, body: about.value3Body },
  ];

  const statItems = [
    { value: stats.productCount, label: about.statsProducts },
    { value: stats.categoryCount, label: about.statsCategories },
    { value: stats.blogPostCount, label: about.statsPosts },
    { value: stats.reviewCount, label: about.statsReviews },
  ];

  return (
    <>
    <Container className="py-12">
      <SectionHeader title={dictionary.nav.about} subtitle={about.subtitle} />

      <section className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-foreground">{about.storyTitle}</h2>
        <p className="mt-4 text-base leading-8 text-muted-foreground">
          {about.storyBody}
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-foreground">{about.valuesTitle}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-primary">{value.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-border bg-accent-soft/30 p-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {statItems.map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-3xl font-bold text-primary">{item.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
    <PortfolioCta labels={portfolio} />
    </>
  );
}
