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
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-lg font-bold text-primary">{meta.title}</p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {footer.tagline}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              {footer.quickLinks}
            </h3>
            <ul className="mt-3 space-y-2">
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
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {year} {meta.title}. {footer.rights}
        </div>
      </Container>
    </footer>
  );
}
