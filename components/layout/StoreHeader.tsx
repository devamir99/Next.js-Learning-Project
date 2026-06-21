import { CategorySubNav } from "@/components/layout/CategorySubNav";
import { HeaderMainRow } from "@/components/layout/HeaderMainRow";
import { getCategories } from "@/lib/data";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type StoreHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function StoreHeader({ locale, dictionary }: StoreHeaderProps) {
  const categories = getCategories(locale);
  const { nav } = dictionary;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-header/95 shadow-sm backdrop-blur-md">
      <HeaderMainRow
        locale={locale}
        dictionary={dictionary}
        categories={categories}
      />
      <CategorySubNav
        locale={locale}
        categories={categories}
        labels={{
          allCategories: nav.allCategories,
          specialOffers: nav.specialOffers,
          blog: nav.blog,
        }}
      />
    </header>
  );
}
