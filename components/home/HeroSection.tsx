import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n/config";

type HeroSectionProps = {
  locale: Locale;
  home: Dictionary["home"];
};

export function HeroSection({ locale, home }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-accent-soft/30">
      <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
        <div className="order-2 lg:order-1">
          <Badge variant="secondary" className="mb-4">
            {home.heroBadge}
          </Badge>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {home.heroTitle}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            {home.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${locale}/shop`}>
              <Button size="lg">{home.heroCta}</Button>
            </Link>
            <Link href={`/${locale}/blog`}>
              <Button size="lg" variant="outline">
                {home.heroSecondaryCta}
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative order-1 aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card shadow-lg lg:order-2 lg:aspect-square">
          <Image
            src="https://picsum.photos/seed/nova-hero/1200/1200"
            alt={home.heroTitle}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
        </div>
      </Container>
    </section>
  );
}
