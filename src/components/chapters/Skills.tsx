"use client";

import { Users, MapPinned, GitBranch, ShieldCheck, BarChart3, type LucideIcon } from "lucide-react";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

const ICONS: Record<string, LucideIcon> = {
  Leadership: Users,
  Operations: MapPinned,
  "Project & Process Management": GitBranch,
  "Financial & Compliance": ShieldCheck,
  "Data & Analytics": BarChart3,
};

export function Skills() {
  const { kicker, title, categories } = profile.skills;

  return (
    <section id="skills" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px] lg:pr-36">
        <Reveal className="kicker mb-10 text-gold">{kicker}</Reveal>
        <SplitText text={title} className="display-h1 mb-16 font-display" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => {
            const Icon = ICONS[c.label];
            return (
              <Reveal
                key={c.label}
                delay={0.06 * i}
                className="group relative rounded-2xl border border-paper/10 bg-paper/[0.03] p-8 transition-all duration-500 hover:border-gold/40 hover:bg-paper/[0.06]"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                  {Icon && (
                    <Icon
                      aria-hidden="true"
                      size={22}
                      strokeWidth={1.25}
                      className="text-gold/40 transition-colors duration-500 group-hover:text-gold"
                    />
                  )}
                </div>

                <span className="mt-6 block kicker text-paper/60">{c.label}</span>
                {"proof" in c && c.proof && (
                  <p className="mt-3 font-display text-xl leading-snug">{c.proof}</p>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {c.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-paper/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
