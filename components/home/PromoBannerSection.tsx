import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type {
  LocalizedPromoBannerItem,
  PromoBannerLayout,
} from "@/lib/data/types";

type PromoBannerSectionProps = {
  layout: PromoBannerLayout;
  items: LocalizedPromoBannerItem[];
};

const layoutClasses: Record<PromoBannerLayout, string> = {
  "grid-4": "grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4",
  "grid-2": "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4",
  wide: "grid grid-cols-1",
};

const imageAspect: Record<PromoBannerLayout, string> = {
  "grid-4": "aspect-[3/2]",
  "grid-2": "aspect-[2/1]",
  wide: "aspect-[21/7] min-h-[120px] sm:min-h-[160px]",
};

function PromoBannerCard({
  item,
  layout,
}: {
  item: LocalizedPromoBannerItem;
  layout: PromoBannerLayout;
}) {
  return (
    <Link
      href={item.href}
      className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div className={`relative overflow-hidden ${imageAspect[layout]}`}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes={
            layout === "wide"
              ? "(max-width: 1280px) 100vw, 1280px"
              : "(max-width: 768px) 50vw, 25vw"
          }
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background: `linear-gradient(to top, ${item.accentColor}ee, ${item.accentColor}55 45%, transparent)`,
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
          <h3
            className={`font-bold text-white ${
              layout === "wide" ? "text-lg sm:text-xl" : "text-sm sm:text-base"
            }`}
          >
            {item.title}
          </h3>
          <p
            className={`mt-0.5 text-white/90 ${
              layout === "wide" ? "text-sm sm:text-base" : "text-xs sm:text-sm"
            }`}
          >
            {item.subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function PromoBannerSection({ layout, items }: PromoBannerSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="py-4">
      <Container>
        <div className={layoutClasses[layout]}>
          {items.map((item) => (
            <PromoBannerCard key={item.id} item={item} layout={layout} />
          ))}
        </div>
      </Container>
    </section>
  );
}
