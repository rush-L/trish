"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

export function Contact() {
  const { closing, socials, email, fullName, credential } = profile;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative overflow-hidden bg-obsidian px-6 pb-12 pt-28 text-paper md:px-10 md:pt-40"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[40vw] w-[40vw] -translate-x-1/2 rounded-full bg-emerald/15 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <Reveal className="kicker mb-10 text-cyan">{closing.kicker}</Reveal>

        <h2 className="display-hero max-w-[16ch] font-display">{closing.title}</h2>

        <p className="measure mt-10 text-lg leading-relaxed text-paper/60 md:text-xl">{closing.body}</p>

        <div className="mt-14">
          <Magnetic strength={0.5}>
            <a
              href={`mailto:${email}`}
              data-cursor="Email"
              className="group inline-flex items-center gap-4 rounded-full bg-paper px-8 py-5 font-mono text-sm uppercase tracking-[0.2em] text-graphite transition-colors hover:bg-gold"
            >
              {closing.cta}
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
        </div>

        {/* Oversized signature name that parallaxes up */}
        <motion.div style={{ y }} className="mt-28 select-none border-t border-paper/10 pt-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <span className="font-display text-[13vw] leading-none tracking-tight md:text-[9vw]">
              {fullName}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">{credential}</span>
          </div>
        </motion.div>

        {/* Footer meta */}
        <div className="mt-16 flex flex-col gap-6 border-t border-paper/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-8">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                data-cursor="Visit"
                className="group font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50 transition-colors hover:text-paper"
              >
                {s.label}
                <span className="ml-1 inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            ))}
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-paper/30">
            © {new Date().getFullYear()} {fullName} — {profile.credentialFull}
          </p>
        </div>
      </div>
    </footer>
  );
}
