import Link from "next/link";
import { CartIconLink } from "@/components/cart/CartIconLink";
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
            <CartIconLink locale={locale} label={nav.cart} />
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
