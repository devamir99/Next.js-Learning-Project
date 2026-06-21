"use client";

import { useCallback, useRef, type ReactNode } from "react";

type ProductCarouselProps = {
  children: ReactNode;
  scrollPrevLabel: string;
  scrollNextLabel: string;
  className?: string;
};

export function ProductCarousel({
  children,
  scrollPrevLabel,
  scrollNextLabel,
  className = "",
}: ProductCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    const isRtl = getComputedStyle(track).direction === "rtl";
    const amount = direction * Math.min(track.clientWidth * 0.85, 320);
    track.scrollBy({ left: isRtl ? -amount : amount, behavior: "smooth" });
  }, []);

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label={scrollPrevLabel}
        className="absolute start-1 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-card text-foreground shadow-md transition-colors hover:bg-accent-soft sm:flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4 rtl:rotate-180"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <div
        ref={trackRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 py-1 sm:gap-4 sm:px-10"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label={scrollNextLabel}
        className="absolute end-1 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-card text-foreground shadow-md transition-colors hover:bg-accent-soft sm:flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4 rtl:rotate-180"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
