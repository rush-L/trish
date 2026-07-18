"use client";

import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { motion } from "framer-motion";

export function Beyond() {
  const { kicker, title, lead, domains } = profile.beyond;

  return (
    <section id="ch3" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal className="kicker mb-10 text-emerald">{kicker}</Reveal>
            <SplitText text={title} className="display-h1 font-display" />
          </div>
          <div className="flex items-end lg:col-span-5">
            <Reveal className="measure text-lg leading-relaxed text-graphite-soft">{lead}</Reveal>
          </div>
        </div>

        {/* Editorial ledger rows */}
        <div className="mt-24 border-t border-ink-15">
          {domains.map((d, i) => (
            <motion.div
              key={d.head}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              data-cursor=""
              className="group grid grid-cols-12 items-center gap-4 border-b border-ink-15 py-8 transition-colors duration-500 hover:bg-paper-dim md:py-10"
            >
              <span className="col-span-2 font-mono text-sm text-ink-40 md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="col-span-10 font-display text-2xl transition-transform duration-500 group-hover:translate-x-2 md:col-span-4 md:text-3xl">
                {d.head}
              </h3>
              <p className="col-span-12 text-[15px] leading-relaxed text-graphite-soft md:col-span-6 md:text-base">
                {d.text}
              </p>
              <span className="col-span-12 hidden justify-self-end text-emerald md:col-span-1 md:block">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="-translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                  <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
