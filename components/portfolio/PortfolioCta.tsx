import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { author } from "@/lib/site/author";
import { AuthorLinks } from "./AuthorLinks";

type PortfolioCtaProps = {
  labels: {
    badge: string;
    title: string;
    subtitle: string;
    visitPortfolio: string;
    contactMe: string;
    website: string;
    email: string;
    linkedin: string;
    github: string;
    telegram: string;
    phone: string;
  };
  contactHref: string;
};

export function PortfolioCta({ labels, contactHref }: PortfolioCtaProps) {
  return (
    <section className="border-t border-border bg-gradient-to-br from-primary/10 via-background to-accent-soft/30 py-16">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {labels.badge}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {labels.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            {labels.subtitle}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={author.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[200px] items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover"
            >
              {labels.visitPortfolio}
            </a>
            <Link
              href={contactHref}
              className="inline-flex min-w-[200px] items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {labels.contactMe}
            </Link>
          </div>
          <AuthorLinks
            labels={labels}
            className="mt-8 justify-center"
          />
        </div>
      </Container>
    </section>
  );
}
