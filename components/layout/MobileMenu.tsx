"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type MobileMenuProps = {
  locale: Locale;
  dictionary: Dictionary;
  navItems: Array<{ href: string; label: string }>;
  categoryLinks?: Array<{ href: string; label: string }>;
};

export function MobileMenu({
  locale,
  dictionary,
  navItems,
  categoryLinks = [],
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const { nav, theme, locale: localeLabels } = dictionary;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={nav.menu}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary md:hidden"
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
            d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
          />
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            aria-label={nav.closeMenu}
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 start-0 w-[min(100%,20rem)] border-e border-border bg-card shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-border px-4">
              <span className="text-lg font-bold text-primary">
                {dictionary.meta.title}
              </span>
              <button
                type="button"
                aria-label={nav.closeMenu}
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground"
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
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="flex max-h-[calc(100vh-8rem)] flex-col gap-1 overflow-y-auto p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent-soft hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/cart`}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent-soft hover:text-primary"
              >
                {nav.cart}
              </Link>

              {categoryLinks.length > 0 ? (
                <>
                  <p className="mt-4 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {nav.allCategories}
                  </p>
                  {categoryLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent-soft hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </>
              ) : null}
            </nav>
            <div className="flex items-center gap-2 border-t border-border p-4">
              <LocaleSwitcher locale={locale} label={localeLabels.switch} />
              <ThemeToggle labels={theme} />
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
