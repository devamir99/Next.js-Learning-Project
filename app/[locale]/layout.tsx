import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { getDirection, isLocale, locales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

const iranSans = localFont({
  src: "../../public/fonts/IRANSansWeb_UltraLight.woff2",
  variable: "--font-iran-sans",
  weight: "200",
  display: "swap",
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const dictionary = await getDictionary(localeParam);

  return {
    title: {
      default: dictionary.meta.title,
      template: `%s | ${dictionary.meta.title}`,
    },
    description: dictionary.meta.description,
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      type: "website",
      locale: localeParam === "fa" ? "fa_IR" : "en_US",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const direction = getDirection(locale);

  return (
    <html
      lang={locale}
      dir={direction}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${iranSans.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
