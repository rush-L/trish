"use client";

import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

export function Philosophy() {
  const { kicker, title, body, tenets } = profile.philosophy;

  return (
    <section id="ch1" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="kicker mb-16 text-emerald">{kicker}</Reveal>

        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SplitText
              text={title}
              className="display-h1 font-display"
            />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5 lg:pt-3">
            {body.map((p, i) => (
              <Reveal key={i} delay={0.1 * i} className="measure text-lg leading-relaxed text-graphite-soft">
                {p}
              </Reveal>
            ))}
          </div>
        </div>

        {/* Three tenets as an editorial rule-separated row */}
        <div className="mt-24 grid gap-px overflow-hidden rounded-2xl border border-ink-15 bg-ink-15 md:grid-cols-3">
          {tenets.map((t, i) => (
            <Reveal
              key={t.no}
              delay={0.08 * i}
              className="group relative bg-paper p-8 transition-colors duration-500 hover:bg-paper-dim md:p-10"
            >
              <span className="font-mono text-xs text-emerald">{t.no}</span>
              <h3 className="mt-6 font-display text-2xl leading-tight">{t.head}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-graphite-soft">{t.text}</p>
              <span className="mt-8 block h-px w-10 bg-emerald transition-all duration-500 group-hover:w-20" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
