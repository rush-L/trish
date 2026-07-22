"use client";

import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";

// Reads as a continuation of the Hero, not a new chapter — no kicker,
// no chapter number, just the value prop landing before the story begins.
export function Summary() {
  return (
    <section className="relative px-6 pb-20 pt-4 md:px-10 md:pb-28">
      <div className="mx-auto max-w-[1400px] lg:pr-36">
        <Reveal className="measure text-lg leading-relaxed text-paper/70 md:text-xl">
          {profile.summary}
        </Reveal>
      </div>
    </section>
  );
}
