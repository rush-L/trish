"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Native scroll-snap carousel. IntersectionObserver (not scroll-offset math)
 * tracks the active slide so it stays correct regardless of slide width/gap.
 */
export function Carousel({
  children,
  slideClassName = "",
  accent = "bg-gold-ink",
  dot = "bg-current/15",
  arrow = "border-current/20 text-current hover:border-current/50",
  label = "carousel",
}: {
  children: ReactNode;
  slideClassName?: string;
  accent?: string;
  dot?: string;
  arrow?: string;
  label?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Track visibility ratio per slide rather than "last entry in this batch" —
    // several slides can report isIntersecting at once (wide viewport, initial
    // mount), and batch order isn't guaranteed to match slide order.
    const ratios = new Map<number, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = slideRefs.current.findIndex((el) => el === entry.target);
          if (idx !== -1) ratios.set(idx, entry.intersectionRatio);
        });
        let bestIdx = 0;
        let bestRatio = -1;
        ratios.forEach((ratio, idx) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIdx = idx;
          }
        });
        setActive(bestIdx);
      },
      { root: track, threshold: [0, 0.25, 0.5, 0.6, 0.75, 1] }
    );
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [items.length]);

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(items.length - 1, i));
    slideRefs.current[clamped]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((child, i) => (
          <div
            key={i}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className={`snap-start shrink-0 ${slideClassName}`}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={active === i}
              className={`h-1.5 rounded-full transition-all duration-300 ${active === i ? `w-8 ${accent}` : `w-1.5 ${dot}`}`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous slide"
            data-cursor=""
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 disabled:opacity-25 disabled:hover:border-current/20 ${arrow}`}
          >
            <ChevronLeft aria-hidden="true" size={18} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={active === items.length - 1}
            aria-label="Next slide"
            data-cursor=""
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 disabled:opacity-25 disabled:hover:border-current/20 ${arrow}`}
          >
            <ChevronRight aria-hidden="true" size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
