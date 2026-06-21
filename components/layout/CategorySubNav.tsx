import Link from "next/link";
import type { LocalizedCategory } from "@/lib/data/types";
import type { Locale } from "@/lib/i18n/config";

type CategorySubNavProps = {
  locale: Locale;
  categories: LocalizedCategory[];
  labels: {
    allCategories: string;
    specialOffers: string;
    blog: string;
  };
};

export function CategorySubNav({
  locale,
  categories,
  labels,
}: CategorySubNavProps) {
  const links = [
    {
      href: `/${locale}/shop/products`,
      label: labels.allCategories,
      highlight: false,
    },
    ...categories.map((category) => ({
      href: `/${locale}/shop/products/${category.slug}`,
      label: category.name,
      highlight: false,
    })),
    {
      href: `/${locale}/shop/products`,
      label: labels.specialOffers,
      highlight: true,
    },
    {
      href: `/${locale}/blog`,
      label: labels.blog,
      highlight: false,
    },
  ];

  return (
    <nav
      aria-label={labels.allCategories}
      className="border-t border-border bg-header"
    >
      <div className="scrollbar-hide flex items-center gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-1">
          {links.map((link) => (
            <Link
              key={`${link.href}-${link.label}`}
              href={link.href}
              className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-subnav-hover hover:text-primary ${
                link.highlight
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
