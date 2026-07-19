"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { profile } from "@/content/profile";
import { Magnetic } from "@/components/ui/Magnetic";
import { EASE_OUT_EXPO, maskUp, stagger } from "@/lib/motion";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const ghostX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pb-10 pt-28 md:px-10"
    >
      {/* Oversized ghost word drifting in the background */}
      <motion.span
        aria-hidden
        style={{ x: ghostX }}
        className="pointer-events-none absolute -bottom-[6vw] left-[-4vw] select-none font-display text-[34vw] leading-none text-graphite/[0.04]"
      >
        RMP
      </motion.span>

      {/* Gold aura */}
      <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[45vw] w-[45vw] rounded-full bg-gold/15 blur-[120px]" />

      {/* Portrait — framed, desktop only */}
      <motion.div
        style={{ y, opacity }}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.4 }}
        className="pointer-events-none absolute right-6 top-28 z-10 hidden w-[21vw] max-w-[320px] md:right-10 lg:block"
      >
        <div className="group relative border border-graphite/15 bg-paper-dim p-3 shadow-[0_40px_80px_-24px_rgba(26,28,30,0.3)] transition-shadow duration-500">
          <span className="absolute -left-px -top-px h-6 w-6 border-l-2 border-t-2 border-gold-ink" aria-hidden />
          <span className="absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-gold-ink" aria-hidden />
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={profile.media.portrait}
              alt={profile.fullName}
              fill
              priority
              sizes="320px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/15 via-transparent to-transparent" />
          </div>
        </div>
        <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
          {profile.fullName} · {profile.credential}
        </span>
      </motion.div>

      {/* Top meta row */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.2 }}
        className="relative z-10 flex items-center justify-between lg:pr-[340px]"
      >
        <div className="flex items-center gap-3">
          {/* Small circular portrait — mobile/tablet only; desktop keeps the framed print */}
          <div className="relative h-9 w-9 flex-none overflow-hidden rounded-full border border-graphite/20 lg:hidden">
            <Image src={profile.media.portrait} alt={profile.fullName} fill sizes="36px" className="object-cover" />
          </div>
          <span className="kicker text-ink-muted">{profile.title}</span>
        </div>
        <span className="kicker hidden text-ink-muted md:block">{profile.location}</span>
      </motion.div>

      {/* Headline */}
      <motion.div
        style={{ y, opacity }}
        suppressHydrationWarning
        className="relative z-10 my-auto lg:pr-[360px] xl:pr-[400px]"
      >
        <motion.h1
          variants={stagger(0.35, 0.09)}
          initial="hidden"
          animate="show"
          className="display-mega max-w-[14ch]"
        >
          {profile.heroLine.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pr-[0.18em] align-top">
              <motion.span
                variants={maskUp}
                className={`inline-block ${w === "signature." ? "italic text-gold-ink" : ""}`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 1.1 }}
          className="measure mt-8 text-lg leading-relaxed text-graphite-soft md:text-xl"
        >
          {profile.heroSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 1.25 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic strength={0.4}>
            <a
              href="#projects"
              data-cursor="View"
              className="group inline-flex items-center gap-2 rounded-full bg-gold-ink px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-graphite"
            >
              View My Work
              <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <a
              href={profile.resumeUrl}
              download
              data-cursor="Download"
              className="inline-flex items-center gap-2 rounded-full border border-graphite/25 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-graphite transition-colors hover:bg-graphite hover:text-paper"
            >
              Download Résumé
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Bottom row: name + scroll cue */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="relative z-10 flex items-end justify-between"
      >
        <div className="flex items-baseline gap-3">
          <span className="font-display text-2xl md:text-3xl">{profile.fullName}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold-ink">
            {profile.credential}
          </span>
        </div>
        <a
          href="#ch1"
          data-cursor="Read"
          className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted"
        >
          Scroll
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block h-8 w-px bg-graphite/40"
          />
        </a>
      </motion.div>
    </section>
  );
}
