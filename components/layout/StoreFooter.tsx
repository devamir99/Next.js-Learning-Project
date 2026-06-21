import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type StoreFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function StoreFooter({ locale, dictionary }: StoreFooterProps) {
  const { footer, nav, meta } = dictionary;
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
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-xl font-bold text-primary">{meta.title}</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              {footer.tagline}
            </p>
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
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li>{footer.email}</li>
              <li dir="ltr" className="text-start">
                {footer.phone}
              </li>
              <li>{footer.address}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {year} {meta.title}. {footer.rights}
        </div>
      </Container>
    </footer>
  );
}
