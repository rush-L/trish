"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
          <cite className="mt-6 block font-mono text-[11px] uppercase not-italic tracking-[0.2em] text-ink-muted">
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

        {/* Credentials gallery */}
        <div className="mt-16">
          <span className="kicker text-ink-muted">Proof, not just claims</span>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {profile.media.credentials.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.src}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="View"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                className="group block overflow-hidden border border-ink-15 bg-paper-dim"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-paper-dim">
                  <Image
                    src={c.src}
                    alt={c.label}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain p-3 transition-transform duration-700 group-hover:scale-105"
                    loading={i === 0 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                  />
                </div>
                <div className="p-5">
                  <p className="font-display text-lg leading-snug">{c.label}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted">
                    {c.issuer}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Learning + life philosophy */}
        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="kicker text-ink-muted">Recent credentials</span>
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
            <span className="kicker text-ink-muted">Life philosophy</span>
            <p className="measure mt-6 font-display text-2xl leading-snug md:text-3xl">
              {lifePhilosophy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
