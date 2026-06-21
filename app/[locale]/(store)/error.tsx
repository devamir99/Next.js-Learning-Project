"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { isLocale, type Locale } from "@/lib/i18n/config";

const errorCopy: Record<
  Locale,
  { title: string; body: string; retry: string; goHome: string }
> = {
  fa: {
    title: "خطایی رخ داد",
    body: "متأسفانه مشکلی پیش آمد. دوباره تلاش کنید.",
    retry: "تلاش مجدد",
    goHome: "بازگشت به خانه",
  },
  en: {
    title: "Something went wrong",
    body: "Sorry, something went wrong. Please try again.",
    retry: "Try again",
    goHome: "Go home",
  },
};

type StoreErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function StoreError({ reset }: StoreErrorProps) {
  const params = useParams();
  const localeParam = params.locale;
  const locale = typeof localeParam === "string" && isLocale(localeParam) ? localeParam : "fa";
  const copy = errorCopy[locale];

  return (
    <Container className="py-16 text-center">
      <p className="text-5xl font-bold text-primary">!</p>
      <h1 className="mt-4 text-2xl font-bold text-foreground">{copy.title}</h1>
      <p className="mx-auto mt-2 max-w-md text-muted-foreground">{copy.body}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset}>{copy.retry}</Button>
        <Link href={`/${locale}`}>
          <Button variant="outline">{copy.goHome}</Button>
        </Link>
      </div>
    </Container>
  );
}
