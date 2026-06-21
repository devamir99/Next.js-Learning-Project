"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { LocalizedHomeSlide } from "@/lib/data/types";

type HeroCarouselProps = {
  slides: LocalizedHomeSlide[];
  labels: {
    carouselPrev: string;
    carouselNext: string;
    carouselSlide: string;
  };
};

const AUTOPLAY_MS = 5000;

export function HeroCarousel({ slides, labels }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (slides.length === 0) return;
      const next = (index + slides.length) % slides.length;
      setActiveIndex(next);
    },
    [slides.length]
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused || slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [reducedMotion, paused, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[activeIndex];
  const fadeClass = reducedMotion
    ? ""
    : "transition-opacity duration-500 motion-reduce:transition-none";

  return (
    <section className="border-b border-border bg-background py-4">
      <Container>
        <div
          className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            className="relative aspect-[21/8] min-h-[160px] w-full sm:min-h-[200px] md:min-h-[260px]"
            aria-roledescription="carousel"
            aria-label={slide.title}
          >
            {slides.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 ${fadeClass} ${
                  index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
                aria-hidden={index !== activeIndex}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              </div>
            ))}

            <div className="relative z-10 flex h-full flex-col justify-center p-6 sm:p-8 md:max-w-lg md:p-10">
              {slide.badge ? (
                <Badge className="mb-3 w-fit bg-primary text-primary-foreground">
                  {slide.badge}
                </Badge>
              ) : null}
              <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl md:text-3xl">
                {slide.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-white/85 sm:text-base">
                {slide.subtitle}
              </p>
              <div className="mt-5">
                <Link href={slide.href}>
                  <Button size="lg">{slide.cta}</Button>
                </Link>
              </div>
            </div>
          </div>

          {slides.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                aria-label={labels.carouselPrev}
                className="absolute start-3 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md transition-colors hover:bg-card sm:flex"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 rtl:rotate-180" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                aria-label={labels.carouselNext}
                className="absolute end-3 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground shadow-md transition-colors hover:bg-card sm:flex"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 rtl:rotate-180" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
                </svg>
              </button>

              <div className="absolute bottom-3 start-1/2 z-20 flex -translate-x-1/2 gap-1.5">
                {slides.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`${labels.carouselSlide} ${index + 1}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    className={`h-2 rounded-full motion-reduce:transition-none ${
                      reducedMotion ? "" : "transition-all"
                    } ${
                      index === activeIndex
                        ? "w-6 bg-primary"
                        : "w-2 bg-white/70 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
