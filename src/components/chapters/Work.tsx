"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/content/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

type Project = (typeof profile.work.projects)[number];

const STORY_FIELDS: { key: keyof Project; label: string }[] = [
  { key: "problem", label: "The Problem" },
  { key: "challenge", label: "The Challenge" },
  { key: "thinking", label: "Thinking Process" },
  { key: "strategy", label: "Strategy" },
  { key: "execution", label: "Execution" },
  { key: "outcome", label: "Outcome" },
  { key: "lessons", label: "Lessons Learned" },
  { key: "future", label: "Future Improvements" },
];

function CaseStudy({ project, open, onToggle }: { project: Project; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-ink-15">
      <button
        onClick={onToggle}
        data-cursor={open ? "Close" : "Open"}
        className="group grid w-full grid-cols-12 items-center gap-4 py-8 text-left md:py-12"
        aria-expanded={open}
      >
        <span className="col-span-2 font-mono text-sm text-emerald md:col-span-1">{project.index}</span>
        <div className="col-span-10 md:col-span-7">
          <h3 className="font-display text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
            {project.name}
          </h3>
        </div>
        <span className="col-span-8 col-start-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40 md:col-span-3 md:col-start-auto">
          {project.tag}
        </span>
        <span className="col-span-2 flex justify-end md:col-span-1">
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.4 }} className="text-2xl text-emerald">
            +
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-x-10 gap-y-8 pb-14 md:grid-cols-2 md:pl-[8.33%]">
              {STORY_FIELDS.map((f, i) => (
                <motion.div
                  key={f.key as string}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="font-mono text-[10px] text-emerald">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-40">{f.label}</span>
                  </div>
                  <p
                    className={`text-[15px] leading-relaxed ${
                      f.key === "outcome" ? "font-display text-xl text-emerald md:text-2xl" : "text-graphite-soft"
                    }`}
                  >
                    {project[f.key] as string}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Work() {
  const { kicker, title, projects } = profile.work;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="ch5" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="kicker mb-10 text-emerald">{kicker}</Reveal>
        <SplitText text={title} className="display-h1 mb-16 font-display" />

        <div className="border-t border-ink-15">
          {projects.map((p, i) => (
            <CaseStudy key={i} project={p} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
