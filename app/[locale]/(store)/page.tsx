import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const { home } = dictionary;

  return (
    <>
      <section className="border-b border-border bg-accent-soft/40">
        <Container className="py-16 sm:py-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Badge variant="secondary" className="mb-4">
              {home.comingSoon}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {home.heroTitle}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {home.heroSubtitle}
            </p>
            <div className="mt-8">
              <Link href={`/${locale}/shop`}>
                <Button size="lg">{home.heroCta}</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeader
            title={home.comingSoon}
            subtitle={home.heroSubtitle}
            align="center"
            className="mx-auto"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 h-32 rounded-lg bg-accent-soft" />
                <div className="h-4 w-2/3 rounded bg-border" />
                <div className="mt-2 h-3 w-full rounded bg-border/70" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
