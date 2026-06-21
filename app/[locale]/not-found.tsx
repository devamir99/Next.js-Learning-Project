"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { isLocale, type Locale } from "@/lib/i18n/config";

const copy: Record<
  Locale,
  { title: string; body: string; goHome: string; browseShop: string }
> = {
  fa: {
    title: "صفحه پیدا نشد",
    body: "آدرسی که وارد کرده‌اید وجود ندارد یا منتقل شده است.",
    goHome: "بازگشت به خانه",
    browseShop: "مشاهده فروشگاه",
  },
  en: {
    title: "Page not found",
    body: "The page you are looking for does not exist or has been moved.",
    goHome: "Go home",
    browseShop: "Browse shop",
  },
};

export default function LocaleNotFound() {
  const params = useParams();
  const localeParam = params.locale;
  const locale =
    typeof localeParam === "string" && isLocale(localeParam) ? localeParam : "fa";
  const labels = copy[locale];

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Container className="py-16 text-center">
        <p className="text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-2xl font-bold text-foreground">{labels.title}</h1>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">{labels.body}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/${locale}`}
            className="inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            {labels.goHome}
          </Link>
          <Link
            href={`/${locale}/shop/products`}
            className="inline-flex rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {labels.browseShop}
          </Link>
        </div>
      </Container>
    </div>
  );
}
