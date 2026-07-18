"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

export function Thinking() {
  const { kicker, title, frameworks, principles } = profile.think;

  return (
    <section id="ch6" className="relative bg-obsidian text-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
        <Reveal className="kicker mb-10 text-cyan">{kicker}</Reveal>
        <SplitText text={title} className="display-h1 mb-20 font-display text-paper" />

        {/* Frameworks */}
        <div className="grid gap-6 lg:grid-cols-3">
          {frameworks.map((f, i) => (
            <Reveal
              key={f.no}
              delay={i * 0.08}
              className="flex flex-col rounded-2xl border border-paper/10 bg-paper/[0.03] p-8 transition-colors duration-500 hover:bg-paper/[0.06] md:p-10"
            >
              <span className="font-mono text-xs text-gold">FRAMEWORK {f.no}</span>
              <h3 className="mt-5 font-display text-2xl leading-tight md:text-3xl">{f.name}</h3>

              {/* step flow */}
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {f.steps.map((s, si) => (
                  <span key={s} className="flex items-center gap-2">
                    <span className="rounded-full border border-cyan/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-cyan">
                      {s}
                    </span>
                    {si < f.steps.length - 1 && <span className="text-paper/25">→</span>}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-[15px] leading-relaxed text-paper/60">{f.text}</p>
            </Reveal>
          ))}
        </div>

        {/* Principles — running manifesto */}
        <div className="mt-24 border-t border-paper/10 pt-16">
          <span className="kicker text-paper/40">Operating principles</span>
          <div className="mt-10 flex flex-col gap-2">
            {principles.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                className="font-display text-2xl leading-snug text-paper/85 md:text-4xl"
              >
                <span className="mr-4 align-super font-mono text-xs text-gold">0{i + 1}</span>
                {p}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
