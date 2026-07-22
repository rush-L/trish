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
          sit behind there), sits behind the portrait on the right at lg+.
          Fades in last in the load sequence, well after the foreground copy. */}
      <motion.span
        aria-hidden
        style={{ x: ghostX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE_OUT_EXPO, delay: 1.6 }}
        className="pointer-events-none absolute -bottom-[6vw] left-[-4vw] select-none font-display text-[34vw] leading-none tracking-tight text-paper/[0.08] lg:inset-y-0 lg:left-auto lg:right-[-1vw] lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:text-[20vw]"
      >
        RMP
      </motion.span>

      {/* Gold aura — soft spotlight behind the portrait, kept extremely subtle.
          Kept fully inboard of the viewport: this used to bleed off the right
          edge, so the section's overflow-hidden was clipping through its solid
          interior (not just the blur's faded tail), leaving a visible hard seam
          in the background. */}
      <div className="pointer-events-none absolute right-[10%] top-[14%] hidden h-[34vw] w-[34vw] rounded-full bg-gold/8 blur-[140px] lg:block" />

      {/* Decorative diagonal accent, desktop only — structural divider, not a focal element */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[45vw] top-0 z-0 hidden h-full w-px origin-top rotate-[6deg] bg-gradient-to-b from-transparent via-gold/12 to-transparent lg:block"
      />

      {/* Portrait — cutout, bottom-anchored, desktop only. Three nested layers:
          scroll parallax (outer), one-time entrance (middle), continuous gentle
          float (inner) — kept on separate elements so their transforms compose
          instead of one overwriting the other. */}
      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none absolute inset-y-0 right-[3vw] z-10 hidden w-[44vw] max-w-[600px] lg:block"
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.5 }}
          className="relative h-full w-full"
        >
          <motion.div
            animate={{ y: [0, -3, 0, 3, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="relative h-full w-full"
          >
            <Image
              src="/images/profile/portrait-hero-cutout.webp?v=4"
              alt={profile.fullName}
              fill
              priority
              unoptimized
              className="object-contain object-bottom"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Mobile/tablet portrait — sits above the hero copy, in normal flex flow;
          desktop instead uses the large absolutely-positioned cutout above. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.3 }}
        className="relative z-10 mx-auto mb-6 aspect-[624/873] w-[52vw] max-w-[240px] lg:hidden"
      >
        <Image
          src="/images/profile/portrait-hero-cutout.webp?v=4"
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
        className="relative z-10 flex items-center justify-between lg:pr-[49vw] xl:pr-[680px]"
      >
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-6 bg-gold" />
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-paper">
              {profile.title.split(" · ")[0]}
            </span>
            <span className="font-mono text-[11px] tracking-[0.15em] text-paper/50">
              {profile.title.split(" · ")[1]}
            </span>
          </div>
        </div>
        <span className="kicker hidden text-paper/60 md:block">{profile.location}</span>
      </motion.div>

      {/* Headline */}
      <motion.div
        style={{ y, opacity }}
        suppressHydrationWarning
        className="relative z-10 my-auto lg:pr-[49vw] xl:pr-[680px]"
      >
        <motion.h1
          variants={stagger(0.35, 0.09)}
          initial="hidden"
          animate="show"
          className="display-mega max-w-[12ch]"
        >
          {profile.heroLine.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pr-[0.18em] align-top">
              <motion.span
                variants={maskUp}
                className={`inline-block ${
                  w === "signature."
                    ? "bg-gradient-to-r from-gold to-gold-highlight bg-clip-text italic text-transparent"
                    : ""
                }`}
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
          className="measure mt-10 text-lg leading-[1.7] text-paper/70 md:text-xl"
        >
          {profile.heroSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 1.25 }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <Magnetic strength={0.4}>
            <a
              href="#projects"
              data-cursor="View"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-obsidian transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-gold-highlight hover:shadow-[0_12px_28px_-10px_rgba(198,161,91,0.55)]"
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
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:text-gold"
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
          className="mt-14 flex items-center gap-4"
        >
          <span aria-hidden="true" className="h-6 w-px bg-paper/25" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-paper/50">Scroll to Discover</span>
          <Magnetic strength={0.3}>
            <a
              href="#achievements"
              data-cursor="Scroll"
              aria-label="Scroll to discover"
              className="group flex h-8 w-8 items-center justify-center rounded-full border border-paper/20 text-paper/70 transition-colors duration-300 hover:border-gold hover:text-gold"
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
