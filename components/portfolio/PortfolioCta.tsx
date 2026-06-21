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
  variant?: "default" | "compact";
};

export function PortfolioCta({ labels, variant = "default" }: PortfolioCtaProps) {
  if (variant === "compact") {
    return (
      <section className="border-t border-border bg-card py-6 sm:py-8">
        <Container>
          <div className="flex flex-col items-center gap-5 rounded-2xl border border-border bg-gradient-to-r from-primary/5 via-background to-accent-soft/30 p-5 sm:flex-row sm:justify-between sm:gap-6 sm:p-6">
            <div className="text-center sm:text-start">
              <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                {labels.badge}
              </span>
              <h2 className="mt-2 text-lg font-bold text-foreground sm:text-xl">
                {labels.title}
              </h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                {labels.subtitle}
              </p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
              <a
                href={author.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                {labels.visitPortfolio}
              </a>
              <a
                href={`tel:${author.phoneTel}`}
                className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {labels.contactMe}
              </a>
            </div>
          </div>
          <AuthorLinks labels={labels} className="mt-4 justify-center sm:mt-5" />
        </Container>
      </section>
    );
  }

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
            <a
              href={`tel:${author.phoneTel}`}
              className="inline-flex min-w-[200px] items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {labels.contactMe}
            </a>
          </div>
          <AuthorLinks labels={labels} className="mt-8 justify-center" />
        </div>
      </Container>
    </section>
  );
}
