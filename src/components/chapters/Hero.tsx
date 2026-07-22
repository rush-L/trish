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
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pb-10 pt-28 md:px-10 lg:px-16"
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
        className="pointer-events-none absolute -bottom-[6vw] left-[-10vw] select-none font-ghost text-[34vw] leading-none tracking-tight text-paper/[0.05] lg:inset-y-0 lg:bottom-auto lg:left-auto lg:right-[41vw] lg:top-1/2 lg:flex lg:-translate-y-1/2 lg:flex-col lg:items-start lg:text-[17vw] lg:leading-[0.82] lg:text-paper/[0.05]"
      >
        <span className="inline-block lg:block">R</span>
        <span className="inline-block translate-y-[2vw] lg:block lg:translate-y-0">M</span>
        <span className="inline-block translate-y-[4vw] lg:block lg:translate-y-0">P</span>
      </motion.span>

      {/* Warm spotlight behind the portrait — full-bleed radial so it fades out
          inside the viewport instead of getting clipped at the edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(circle_at_75%_40%,rgba(201,164,91,0.18),transparent_60%)] lg:block"
      />

      {/* Soft vignette — darkens the edges so the composition holds the center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_120%_100%_at_50%_45%,transparent_60%,rgba(0,0,0,0.35)_100%)]"
      />

      {/* Gold wedge — bottom-right corner accent from the goal mockup */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 z-0 hidden h-[64vh] w-[24vw] bg-gradient-to-tl from-gold/70 via-gold/25 to-transparent [clip-path:polygon(100%_18%,100%_100%,0_100%)] lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[20vw] z-0 hidden h-[60vh] w-px origin-bottom rotate-[32deg] bg-gradient-to-t from-gold/50 to-transparent lg:block"
      />

      {/* Portrait — cutout, bottom-anchored, desktop only. Three nested layers:
          scroll parallax (outer), one-time entrance (middle), continuous gentle
          float (inner) — kept on separate elements so their transforms compose
          instead of one overwriting the other. */}
      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none absolute -bottom-[24vh] top-0 right-[calc(6vw+24px)] z-10 hidden w-[53vw] max-w-[750px] lg:block"
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
              src="/images/profile/portrait-hero-cutout.webp?v=6"
              alt={profile.fullName}
              fill
              priority
              unoptimized
              className="object-contain object-bottom drop-shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
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
          src="/images/profile/portrait-hero-cutout.webp?v=6"
          alt={profile.fullName}
          fill
          priority
          unoptimized
          className="object-contain object-bottom drop-shadow-[0_25px_60px_rgba(0,0,0,0.35)]"
        />
      </motion.div>

      {/* Headline */}
      <motion.div
        style={{ y, opacity }}
        suppressHydrationWarning
        className="relative z-10 my-auto md:ml-[calc(-4rem+max(0px,(100vw-1600px)/2))] lg:pr-[52vw] xl:pr-[720px]"
      >
        {/* Kicker — part of the centered block, sitting just above the headline */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.2 }}
          className="mb-16 flex flex-col gap-1.5"
        >
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-9 bg-gold" />
            <span className="bg-gradient-to-b from-[#F3D78D] via-[#D8B15A] to-[#B67A2E] bg-clip-text pb-[0.2em] font-mono text-xs font-semibold uppercase tracking-[0.32em] text-transparent">
              {profile.title.split(" · ")[0]}
            </span>
          </div>
          <span className="ml-12 font-mono text-[13px] tracking-[0.15em] text-paper/70">
            {profile.title.split(" · ")[1]}
          </span>
        </motion.div>

        <motion.h1
          variants={stagger(0.35, 0.09)}
          initial="hidden"
          animate="show"
          className="font-display text-[clamp(2.8rem,5.8vw,5.25rem)] font-normal leading-[1.02] tracking-[-0.03em] max-w-[14ch]"
        >
          {profile.heroLine.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.15em] pr-[0.18em] align-top">
              <motion.span
                variants={maskUp}
                className={`inline-block ${
                  w === "signature."
                    ? "bg-gradient-to-b from-[#F3D78D] via-[#D8B15A] to-[#B67A2E] bg-clip-text pb-[0.2em] italic text-transparent"
                    : ""
                }`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </motion.h1>
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 1.0 }}
          className="mt-12 block h-px w-10 origin-left bg-gold"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 1.1 }}
          className="mt-14 max-w-[33rem] text-base leading-[1.7] text-paper/70 md:text-lg"
        >
          {profile.heroSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 1.25 }}
          className="mt-14 flex flex-wrap items-center gap-6"
        >
          <Magnetic strength={0.4}>
            <a
              href="#projects"
              data-cursor="View"
              className="group inline-flex h-14 items-center gap-2 rounded-xl bg-gold px-8 font-mono text-[11px] uppercase tracking-[0.2em] text-obsidian transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-gold-highlight hover:shadow-[0_12px_28px_-10px_rgba(198,161,91,0.55)]"
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
              className="inline-flex h-14 items-center gap-2 rounded-xl border border-gold/50 px-8 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:text-gold"
            >
              Download Résumé
              <span aria-hidden="true">↓</span>
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 1.35 }}
          className="mt-12 flex items-center gap-4"
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
