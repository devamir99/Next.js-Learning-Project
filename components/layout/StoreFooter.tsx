import Link from "next/link";
import { AuthorCredit, AuthorLinks } from "@/components/portfolio/AuthorLinks";
import { Container } from "@/components/ui/Container";
import { author } from "@/lib/site/author";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type StoreFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function StoreFooter({ locale, dictionary }: StoreFooterProps) {
  const { footer, nav, meta, portfolio } = dictionary;
  const year = new Date().getFullYear();

  const links = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/shop`, label: nav.shop },
    { href: `/${locale}/blog`, label: nav.blog },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="text-xl font-bold text-primary">{meta.title}</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              {footer.tagline}
            </p>
            <a
              href={author.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              {portfolio.visitPortfolio} →
            </a>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              {footer.quickLinks}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              {footer.contactTitle}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
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
              <li className="text-muted-foreground">
                {author.location[locale]}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              {footer.connectTitle}
            </h3>
            <AuthorLinks
              labels={portfolio}
              variant="stack"
              className="mt-4"
            />
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-border pt-6 text-center sm:flex-row sm:justify-between sm:text-start">
          <p className="text-sm text-muted-foreground">
            © {year} {meta.title}. {footer.rights}
          </p>
          <AuthorCredit builtByLabel={footer.builtBy} />
        </div>
      </Container>
    </footer>
  );
}
