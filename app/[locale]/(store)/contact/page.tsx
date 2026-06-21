import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { AuthorLinks } from "@/components/portfolio/AuthorLinks";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { author } from "@/lib/site/author";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};

  const dictionary = await getDictionary(localeParam);
  return {
    title: dictionary.nav.contact,
    description: dictionary.contact.subtitle,
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);
  const { contact, portfolio } = dictionary;

  return (
    <Container className="py-12">
      <SectionHeader title={dictionary.nav.contact} subtitle={contact.subtitle} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold text-foreground">
            {contact.formTitle}
          </h2>
          <div className="mt-6">
            <ContactForm labels={contact} />
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">
              {contact.infoTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${author.email}`}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {author.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${author.phoneTel}`}
                  dir="ltr"
                  className="text-start text-muted-foreground transition-colors hover:text-primary"
                >
                  {author.phoneDisplay}
                </a>
              </li>
              <li className="text-muted-foreground">{author.location[locale]}</li>
            </ul>
            <a
              href={author.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              {portfolio.visitPortfolio} →
            </a>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">
              {contact.socialTitle}
            </h2>
            <AuthorLinks labels={portfolio} variant="stack" className="mt-4" />
          </div>
          <div className="rounded-xl border border-border bg-accent-soft/40 p-6">
            <h2 className="text-lg font-semibold text-foreground">
              {contact.hoursTitle}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {contact.hoursBody}
            </p>
          </div>
        </aside>
      </div>
    </Container>
  );
}
