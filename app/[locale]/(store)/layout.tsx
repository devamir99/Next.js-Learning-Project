import { StoreFooter } from "@/components/layout/StoreFooter";
import { StoreNav } from "@/components/layout/StoreNav";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";

type StoreLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function StoreLayout({
  children,
  params,
}: StoreLayoutProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <StoreNav locale={locale} dictionary={dictionary} />
      <main className="flex-1">{children}</main>
      <StoreFooter locale={locale} dictionary={dictionary} />
    </div>
  );
}
