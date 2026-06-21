import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type StoreNavProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function StoreNav({ locale, dictionary }: StoreNavProps) {
  const { nav, theme, locale: localeLabels, meta } = dictionary;

  const navItems = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/shop`, label: nav.shop },
    { href: `/${locale}/blog`, label: nav.blog },
    { href: `/${locale}/about`, label: nav.about },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <MobileMenu
              locale={locale}
              dictionary={dictionary}
              navItems={navItems}
            />
            <Link
              href={`/${locale}`}
              className="text-xl font-bold tracking-tight text-primary"
            >
              {meta.title}
            </Link>
          </div>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/contact`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {nav.contact}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/cart`}
              aria-label={nav.cart}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25h9.75M7.5 14.25 6.106 5.272M7.5 14.25l-1.5 4.5h12.75M18.75 14.25l1.106-8.978M9.75 18.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm7.5 0a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
              </svg>
              <span className="hidden sm:inline">{nav.cart}</span>
            </Link>
            <div className="hidden items-center gap-2 md:flex">
              <LocaleSwitcher locale={locale} label={localeLabels.switch} />
              <ThemeToggle labels={theme} />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
