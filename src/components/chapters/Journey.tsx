"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { Carousel } from "@/components/ui/Carousel";

// Flattened (non-union) shape so optional fields narrow predictably —
// `(typeof profile.journey.stages)[number]` is a union of per-stage literal
// types, which makes control-flow narrowing on `image`/`honor` collapse to `never`.
type Stage = {
  [K in keyof (typeof profile.journey.stages)[number]]: (typeof profile.journey.stages)[number][K];
} & {
  image?: string;
  honor?: string;
};

function StageCard({ stage, index }: { stage: Stage; index: number }) {
  const [open, setOpen] = useState(false);
  const s = stage;
  const panelId = `stage-narrative-${index}`;

  return (
    <div className="group flex h-full w-[85vw] max-w-md flex-col overflow-hidden rounded-2xl border border-paper/10 bg-paper/[0.03] transition-colors duration-500 hover:bg-paper/[0.06] sm:w-[440px]">
      {s.image ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-obsidian-soft">
          <Image
            src={s.image}
            alt={`${s.role} at ${s.org}`}
            fill
            sizes="(min-width: 640px) 440px, 85vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-5">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
              {String(index + 1).padStart(2, "0")} · {s.year}
            </span>
            {s.honor && (
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-obsidian/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {s.honor}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4 px-8 pt-8 md:px-10 md:pt-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            {String(index + 1).padStart(2, "0")} · {s.year}
          </span>
          {s.honor && (
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              {s.honor}
            </span>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-8 md:p-10">
        <h3
          className={
            s.image
              ? "font-display text-2xl leading-tight md:text-3xl"
              : "mt-6 font-display text-2xl leading-tight md:text-3xl"
          }
        >
          {s.role}
        </h3>
        <p className="mt-1 text-sm text-paper/50">{s.org}</p>

        <ul className="mt-5 flex-1 space-y-2">
          {s.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-[14px] leading-relaxed text-paper/75">
              <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-paper/40" />
              {b}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          data-cursor={open ? "Close" : "Read"}
          aria-expanded={open}
          aria-controls={panelId}
          className="-mx-2 -my-3 mt-3 self-start px-2 py-3 font-mono text-[11px] uppercase tracking-[0.15em] text-cyan transition-colors hover:text-paper"
        >
          {open ? "Show less" : "Read more"}
          <span aria-hidden="true"> {open ? "−" : "+"}</span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <p className="mt-4 border-t border-paper/10 pt-4 text-[14px] leading-relaxed text-paper/60">
                {s.narrative}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Journey() {
  const { kicker, title, intro, stages } = profile.journey;

  return (
    <section
      id="experience"
      data-theme="dark"
      className="relative bg-obsidian bg-[linear-gradient(to_bottom,var(--color-navy),var(--color-obsidian)_240px)] text-paper"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40 lg:pr-36">
        <Reveal className="kicker mb-16 text-cyan">{kicker}</Reveal>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SplitText text={title} className="display-h1 font-display text-paper" />
          </div>
          <div className="lg:col-span-4 lg:pt-2">
            <Reveal className="text-lg leading-relaxed text-paper/60">{intro}</Reveal>
          </div>
        </div>

        <div className="mt-20">
          <Carousel label="Career timeline" accent="bg-gold" dot="bg-paper/15" arrow="border-paper/20 text-paper hover:border-paper/50">
            {stages.map((s, i) => (
              <StageCard key={i} stage={s} index={i} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
