"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

export function Journey() {
  const { kicker, title, intro, stages } = profile.journey;
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const current = stages[active] as {
    year: string;
    role: string;
    org: string;
    honor?: string;
    narrative: string;
    image?: string;
  };

  return (
    <section id="ch2" className="relative bg-obsidian text-paper">
      {/* Intro */}
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
        <Reveal className="kicker mb-16 text-cyan">{kicker}</Reveal>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SplitText text={title} className="display-h1 font-display text-paper" />
          </div>
          <div className="lg:col-span-4 lg:pt-2">
            <Reveal className="text-lg leading-relaxed text-paper/60">{intro}</Reveal>
          </div>
        </div>
      </div>

      {/* Sticky spine + stages */}
      <div ref={ref} className="mx-auto grid max-w-[1400px] gap-0 px-6 md:px-10 lg:grid-cols-12">
        {/* Sticky index */}
        <div className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-0 flex h-screen flex-col justify-center">
            <AnimatePresence mode="wait">
              {current.image && (
                <motion.div
                  key={current.image}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 w-fit border border-paper/15 bg-obsidian-soft p-1.5"
                >
                  <div className="relative aspect-[3/4] w-[220px] overflow-hidden bg-obsidian-soft">
                    <Image
                      src={current.image}
                      alt={`${current.role} at ${current.org}`}
                      fill
                      sizes="220px"
                      className="object-contain"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
              {String(active + 1).padStart(2, "0")} / {String(stages.length).padStart(2, "0")}
            </span>
            <motion.h3
              key={current.role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-4 font-display text-4xl leading-tight md:text-5xl"
            >
              {current.role}
            </motion.h3>
            <motion.p
              key={current.org}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-3 text-paper/50"
            >
              {current.org}
            </motion.p>
            {current.honor && (
              <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {current.honor}
              </span>
            )}
          </div>
        </div>

        {/* Scrolling stages */}
        <div className="relative lg:col-span-8 lg:pl-16">
          {/* progress spine */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-paper/10 lg:block">
            <motion.div
              style={{ scaleY: lineScale }}
              className="h-full w-full origin-top bg-gradient-to-b from-cyan via-emerald-bright to-gold"
            />
          </div>

          {stages.map((s, i) => (
            <motion.div
              key={i}
              onViewportEnter={() => setActive(i)}
              viewport={{ margin: "-50% 0px -50% 0px" }}
              className="relative flex min-h-[80vh] flex-col justify-center py-10"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm text-cyan">{s.year}</span>
                <span className="h-px flex-1 bg-paper/10" />
              </div>
              <h4 className="mt-6 font-display text-3xl md:text-4xl lg:hidden">{s.role}</h4>
              <p className="mt-2 text-paper/50 lg:hidden">{s.org}</p>
              <p className="measure mt-6 text-xl leading-relaxed text-paper/85 md:text-2xl">
                {s.narrative}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="h-24 md:h-40" />
    </section>
  );
}
