"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { RadarChart } from "@/components/ui/RadarChart";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

function TrajectoryChart({ data }: { data: { period: string; index: number }[] }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const w = 720;
  const h = 240;
  const pad = 32;
  const max = 100;
  const stepX = (w - pad * 2) / (data.length - 1);
  const px = (i: number) => pad + i * stepX;
  const py = (v: number) => h - pad - (v / max) * (h - pad * 2);
  const line = data.map((d, i) => `${i === 0 ? "M" : "L"}${px(i)},${py(d.index)}`).join(" ");
  const area = `${line} L${px(data.length - 1)},${h - pad} L${px(0)},${h - pad} Z`;

  return (
    <svg ref={ref} viewBox={`0 0 ${w} ${h}`} className="h-auto w-full" role="img" aria-label="Growth trajectory">
      <defs>
        <linearGradient id="traj" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10836a" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10836a" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 25, 50, 75, 100].map((g) => (
        <line key={g} x1={pad} y1={py(g)} x2={w - pad} y2={py(g)} stroke="rgba(26,28,30,0.08)" strokeWidth={1} />
      ))}
      <motion.path
        d={area}
        fill="url(#traj)"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="#0f5c4c"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {data.map((d, i) => (
        <g key={i}>
          <motion.circle
            cx={px(i)}
            cy={py(d.index)}
            r={4}
            fill="#c6a15b"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.18, duration: 0.4 }}
          />
          <text x={px(i)} y={h - pad + 20} textAnchor="middle" fontSize={10} className="font-mono" fill="rgba(26,28,30,0.45)">
            {d.period}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function Dashboard() {
  const { kicker, title, note, competencies, kpis, trajectory } = profile.dashboard;

  return (
    <section id="ch4" className="relative bg-navy text-paper">
      <div className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal className="kicker mb-8 text-cyan">{kicker}</Reveal>
            <SplitText text={title} className="display-h2 max-w-[20ch] font-display text-paper" />
          </div>
          <Reveal className="font-mono text-[11px] uppercase tracking-[0.15em] text-paper/40">
            {note}
          </Reveal>
        </div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 md:grid-cols-4">
          {kpis.map((k) => (
            <Reveal key={k.label} className="bg-navy p-6 md:p-8">
              <div className="font-display text-4xl text-gold md:text-5xl">
                <AnimatedNumber value={k.value} suffix={k.suffix} />
              </div>
              <div className="mt-3 text-sm font-medium text-paper/85">{k.label}</div>
              <div className="mt-1 text-xs text-paper/45">{k.sub}</div>
            </Reveal>
          ))}
        </div>

        {/* Radar + competency ledger */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="flex items-center justify-center rounded-2xl border border-paper/10 bg-navy-soft/40 p-8 lg:col-span-6">
            <RadarChart data={competencies as unknown as { label: string; value: number }[]} />
          </div>

          <div className="rounded-2xl border border-paper/10 bg-navy-soft/40 p-8 lg:col-span-6 md:p-10">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
              Capability breakdown
            </h3>
            <div className="mt-8 flex flex-col">
              {competencies.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ delay: i * 0.06, duration: 0.6 }}
                  className="border-b border-paper/10 py-4"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-lg">{c.label}</span>
                    <span className="font-mono text-sm text-gold">
                      <AnimatedNumber value={c.value} />
                    </span>
                  </div>
                  <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-paper/10">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-bright to-cyan"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: c.value / 100 }}
                      viewport={{ once: true, margin: "-10% 0px" }}
                      transition={{ duration: 1.1, delay: 0.2 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      style={{ transformOrigin: "left" }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-paper/40">{c.note}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Trajectory */}
        <div className="mt-6 rounded-2xl border border-paper/10 bg-navy-soft/40 p-8 md:p-10">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
              Growth trajectory
            </h3>
            <span className="font-mono text-[11px] text-paper/40">capability index</span>
          </div>
          <TrajectoryChart data={trajectory as unknown as { period: string; index: number }[]} />
        </div>
      </div>
    </section>
  );
}
