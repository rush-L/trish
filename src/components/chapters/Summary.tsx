"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";

// Reads as a continuation of the Hero, not a new chapter — no kicker,
// no chapter number, just the value prop landing before the story begins.
export function Summary() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  // Idle at 0, fades in once the page is actually moving either direction
  const fadeOpacity = useTransform(smoothVelocity, [-1200, -80, 0, 80, 1200], [1, 1, 0, 1, 1]);

  return (
    <section id="about" className="relative px-6 pb-20 pt-4 md:px-10 md:pb-28">
      {/* Top fade — blends the Hero's portrait/wedge into this section's
          ground instead of the hard line where Hero's overflow clips it.
          Only visible while scrolling, so it stays out of the way at rest. */}
      <motion.div
        aria-hidden
        style={{ opacity: fadeOpacity }}
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 -translate-y-full bg-gradient-to-t from-obsidian to-transparent md:h-20"
      />
      <div className="mx-auto max-w-[1400px] lg:pr-36">
        <Reveal className="measure text-lg leading-relaxed text-paper/70 md:text-xl">
          {profile.summary}
        </Reveal>
      </div>
    </section>
  );
}
