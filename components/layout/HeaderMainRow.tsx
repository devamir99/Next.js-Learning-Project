"use client";

import Link from "next/link";
import { CartIconLink } from "@/components/cart/CartIconLink";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { SearchDialog } from "@/components/search/SearchDialog";
import { Container } from "@/components/ui/Container";
import type { LocalizedCategory } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type HeaderMainRowProps = {
  locale: Locale;
  dictionary: Dictionary;
  categories: LocalizedCategory[];
};

export function HeaderMainRow({
  locale,
  dictionary,
  categories,
}: HeaderMainRowProps) {
  const { nav, theme, locale: localeLabels, meta, common } = dictionary;

  const navItems = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/shop`, label: nav.shop },
    { href: `/${locale}/blog`, label: nav.blog },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  const categoryLinks = categories.map((category) => ({
    href: `/${locale}/shop/products/${category.slug}`,
    label: category.name,
  }));

  return (
    <Container className="py-3">
      <div className="flex items-center gap-3 lg:gap-4">
        <div className="flex shrink-0 items-center gap-2">
          <MobileMenu
            locale={locale}
            dictionary={dictionary}
            navItems={navItems}
            categoryLinks={categoryLinks}
          />
          <Link
            href={`/${locale}`}
            className="text-xl font-bold tracking-tight text-primary lg:text-2xl"
          >
            {meta.title}
          </Link>
        </div>

        <SearchDialog locale={locale} labels={common} showBar />

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href={`/${locale}/contact`}
            className="hidden flex-col items-center gap-0.5 px-2 py-1 text-muted-foreground transition-colors hover:text-primary sm:flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <span className="max-w-[4.5rem] truncate text-[10px] font-medium leading-none">
              {nav.login}
            </span>
          </Link>

          <CartIconLink locale={locale} label={nav.cart} layout="stacked" />

          <div className="hidden items-center gap-1 lg:flex">
            <LocaleSwitcher locale={locale} label={localeLabels.switch} />
            <ThemeToggle labels={theme} />
          </div>
        </div>
      </div>
    </Container>
  );
}
