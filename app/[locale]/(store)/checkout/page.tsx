import type { Metadata } from "next";
import { CheckoutForm } from "@/components/cart/CheckoutForm";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { notFound } from "next/navigation";

type CheckoutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: CheckoutPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};

  const dictionary = await getDictionary(localeParam);
  return {
    title: dictionary.checkout.title,
    description: dictionary.checkout.subtitle,
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dictionary = await getDictionary(locale);

  return (
    <Container className="py-12">
      <SectionHeader
        title={dictionary.checkout.title}
        subtitle={dictionary.checkout.subtitle}
      />
      <CheckoutForm
        locale={locale}
        cartLabels={dictionary.cart}
        labels={dictionary.checkout}
      />
    </Container>
  );
}
