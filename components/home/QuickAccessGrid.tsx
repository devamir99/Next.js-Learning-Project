import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { QuickAccessIconSvg } from "@/components/home/QuickAccessIcon";
import type { LocalizedQuickAccessItem } from "@/lib/data/types";

type QuickAccessGridProps = {
  items: LocalizedQuickAccessItem[];
};

export function QuickAccessGrid({ items }: QuickAccessGridProps) {
  return (
    <section className="border-b border-border bg-card py-4">
      <Container>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8 sm:gap-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col items-center gap-2 rounded-xl p-2 transition-colors hover:bg-subnav-hover"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-105 sm:h-14 sm:w-14"
                style={{
                  backgroundColor: item.bgColor,
                  color: item.iconColor,
                }}
              >
                <QuickAccessIconSvg icon={item.icon} />
              </span>
              <span className="line-clamp-2 text-center text-[11px] font-medium leading-tight text-muted-foreground group-hover:text-primary sm:text-xs">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
