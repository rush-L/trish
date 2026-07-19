"use client";

import Image from "next/image";
import { FileText } from "lucide-react";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Carousel } from "@/components/ui/Carousel";

export function Achievements() {
  const { kicker, title, kpis, credentialsKicker } = profile.achievements;

  return (
    <section id="achievements" data-theme="dark" className="relative bg-navy text-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40 lg:pr-36">
        <div className="mb-16">
          <Reveal className="kicker mb-8 text-cyan">{kicker}</Reveal>
          <SplitText text={title} className="display-h2 max-w-[20ch] font-display text-paper" />
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 md:grid-cols-5">
          {kpis.map((k) => (
            <Reveal key={k.label} className="bg-navy p-6 md:p-8">
              <div className="font-display text-3xl text-gold md:text-4xl">
                <AnimatedNumber value={k.value} suffix={k.suffix} />
              </div>
              <div className="mt-3 text-sm font-medium text-paper/85">{k.label}</div>
              <div className="mt-1 text-xs text-paper/45">{k.sub}</div>
            </Reveal>
          ))}
        </div>

        {/* Credential proof */}
        <div className="mt-16">
          <span className="kicker text-paper/40">{credentialsKicker}</span>
          <div className="mt-6">
            <Carousel
              label="Credentials"
              accent="bg-gold"
              dot="bg-paper/15"
              arrow="border-paper/20 text-paper hover:border-paper/50"
              slideClassName="w-[70vw] max-w-[280px] sm:w-[260px]"
            >
              {profile.media.credentials.map((c, i) => {
                const isPdf = c.src.toLowerCase().endsWith(".pdf");
                return (
                <a
                  key={c.label}
                  href={c.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="View"
                  className="group block h-full overflow-hidden border border-paper/15 bg-obsidian-soft"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-obsidian-soft">
                    {isPdf ? (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
                        <FileText aria-hidden="true" size={40} strokeWidth={1.25} className="text-paper/50" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-paper/45">
                          PDF Document
                        </span>
                      </div>
                    ) : (
                      <Image
                        src={c.src}
                        alt={c.label}
                        fill
                        sizes="280px"
                        className="object-contain p-3 transition-transform duration-700 group-hover:scale-105"
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : "auto"}
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="font-display text-lg leading-snug text-paper">{c.label}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-paper/45">
                      {c.issuer}
                    </p>
                  </div>
                </a>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
