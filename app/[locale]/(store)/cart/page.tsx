import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";

type PlaceholderPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CartPage({ params }: PlaceholderPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <Container className="py-12">
      <SectionHeader
        title={dictionary.nav.cart}
        subtitle={dictionary.home.comingSoon}
      />
    </Container>
  );
}
