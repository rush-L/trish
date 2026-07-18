"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

export function Human() {
  const { kicker, title, quote, quoteAuthor, facets, learning, lifePhilosophy } = profile.human;

  return (
    <section id="ch7" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="kicker mb-10 text-emerald">{kicker}</Reveal>
        <SplitText text={title} className="display-h1 mb-16 font-display" />

        {/* Pull quote */}
        <Reveal className="mb-20 border-y border-ink-15 py-14">
          <blockquote className="font-display text-3xl italic leading-tight md:text-5xl md:leading-tight">
            {quote}
          </blockquote>
          <cite className="mt-6 block font-mono text-[11px] uppercase not-italic tracking-[0.2em] text-ink-40">
            {quoteAuthor}
          </cite>
        </Reveal>

        {/* Facets grid */}
        <div className="grid gap-px overflow-hidden rounded-2xl border border-ink-15 bg-ink-15 sm:grid-cols-2 lg:grid-cols-3">
          {facets.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="group bg-paper p-8 transition-colors duration-500 hover:bg-paper-dim"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald">{f.label}</span>
              <p className="mt-4 font-display text-xl leading-snug">{f.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Learning + life philosophy */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="kicker text-ink-40">Currently learning</span>
            <div className="mt-6 flex flex-wrap gap-3">
              {learning.map((l) => (
                <span
                  key={l}
                  className="rounded-full border border-graphite/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-graphite-soft"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <span className="kicker text-ink-40">Life philosophy</span>
            <p className="measure mt-6 font-display text-2xl leading-snug md:text-3xl">
              {lifePhilosophy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
