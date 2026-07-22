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
      {/* Oversized ghost word — drifts bottom-left on mobile (no portrait to
          sit behind there), sits behind the portrait on the right at lg+ */}
      <motion.span
        aria-hidden
        style={{ x: ghostX }}
        className="pointer-events-none absolute -bottom-[6vw] left-[-4vw] select-none font-display text-[34vw] leading-none text-paper/[0.05] lg:inset-y-0 lg:left-auto lg:right-[-2vw] lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:text-[18vw]"
      >
        RMP
      </motion.span>

      {/* Gold aura */}
      <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[45vw] w-[45vw] rounded-full bg-gold/15 blur-[120px]" />

      {/* Decorative diagonal accent, desktop only */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[18%] top-0 z-0 hidden h-full w-px origin-top rotate-[9deg] bg-gradient-to-b from-transparent via-gold/40 to-transparent lg:block"
      />

      {/* Portrait — cutout, bottom-anchored, desktop only */}
      <motion.div
        style={{ y, opacity }}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.4 }}
        className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[34vw] max-w-[520px] lg:block"
      >
        <Image
          src="/images/profile/portrait-hero-cutout.webp"
          alt={profile.fullName}
          fill
          priority
          unoptimized
          className="object-contain object-bottom"
        />
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
          <div className="relative h-9 w-9 flex-none overflow-hidden rounded-full border border-paper/20 lg:hidden">
            <Image src={profile.media.portrait} alt={profile.fullName} fill sizes="36px" className="object-cover" />
          </div>
          <span aria-hidden="true" className="hidden h-px w-6 bg-gold md:block" />
          <span className="kicker text-paper/60">{profile.title}</span>
        </div>
        <span className="kicker hidden text-paper/60 md:block">{profile.location}</span>
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
                className={`inline-block ${w === "signature." ? "italic text-gold" : ""}`}
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
          className="measure mt-8 text-lg leading-relaxed text-paper/70 md:text-xl"
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
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-obsidian transition-colors hover:bg-paper"
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
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper hover:text-obsidian"
            >
              View Resume
              <span aria-hidden="true">↓</span>
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 1.35 }}
          className="mt-10 flex items-center gap-4"
        >
          <span aria-hidden="true" className="h-8 w-px bg-paper/25" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Scroll to Discover</span>
          <Magnetic strength={0.3}>
            <a
              href="#achievements"
              data-cursor="Scroll"
              aria-label="Scroll to discover"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:border-paper"
            >
              <motion.span
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                ↓
              </motion.span>
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
