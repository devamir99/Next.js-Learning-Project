import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import type { LocalizedHomeStory } from "@/lib/data/types";

type StoryRailProps = {
  stories: LocalizedHomeStory[];
};

export function StoryRail({ stories }: StoryRailProps) {
  return (
    <section className="border-b border-border bg-card py-4">
      <Container>
        <div className="scrollbar-hide -mx-1 flex gap-3 overflow-x-auto px-1 pb-1 sm:gap-4">
          {stories.map((story) => (
            <Link
              key={story.id}
              href={story.href}
              className="group flex w-[4.25rem] shrink-0 flex-col items-center gap-2 sm:w-[4.75rem]"
            >
              <div
                className="rounded-full p-[2px] transition-transform group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${story.ringColor}, ${story.ringColor}88)`,
                }}
              >
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-card bg-card sm:h-16 sm:w-16">
                  <Image
                    src={story.image}
                    alt={story.label}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="line-clamp-2 w-full text-center text-[11px] leading-tight text-muted-foreground group-hover:text-primary">
                {story.label}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
