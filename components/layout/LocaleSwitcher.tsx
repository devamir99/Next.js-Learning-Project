"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";

type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
};

function swapLocale(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split("/");

  if (segments.length > 1 && locales.includes(segments[1] as Locale)) {
    segments[1] = nextLocale;
    return segments.join("/") || `/${nextLocale}`;
  }

  return `/${nextLocale}`;
}

export function LocaleSwitcher({ locale, label }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const otherLocale = locale === "fa" ? "en" : "fa";
  const href = swapLocale(pathname, otherLocale);

  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className="inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-border px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {otherLocale}
    </Link>
  );
}
