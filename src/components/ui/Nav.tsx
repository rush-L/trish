"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { Magnetic } from "./Magnetic";

const CHAPTERS = [
  { id: "top", label: "Top" },
  { id: "ch1", label: "Philosophy" },
  { id: "ch2", label: "Journey" },
  { id: "ch3", label: "Beyond" },
  { id: "ch4", label: "Numbers" },
  { id: "ch5", label: "Work" },
  { id: "ch6", label: "Thinking" },
  { id: "ch7", label: "Human" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [active, setActive] = useState("top");
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* Top bar */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid ? "glass border-b border-ink-15" : ""
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10">
          <a
            href="#top"
            data-cursor="Top"
            className="font-display text-lg tracking-tight"
          >
            {profile.firstName}
            <span className="text-emerald">.</span>
            <span className="ml-2 align-super font-mono text-[10px] tracking-[0.25em] text-ink-40">
              {profile.credential}
            </span>
          </a>

          <Magnetic strength={0.4}>
            <a
              href="#contact"
              data-cursor="Say hi"
              className="group inline-flex items-center gap-2 rounded-full border border-graphite/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-graphite hover:text-paper"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald transition-colors group-hover:bg-cyan" />
              Available
            </a>
          </Magnetic>
        </div>
      </header>

      {/* Side chapter rail (desktop) */}
      <nav
        aria-label="Chapters"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
      >
        {CHAPTERS.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="group flex items-center gap-2"
            data-cursor={c.label}
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                active === c.id ? "text-graphite opacity-100" : "text-ink-40 opacity-0 group-hover:opacity-100"
              }`}
            >
              {c.label}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                active === c.id ? "w-8 bg-emerald" : "w-4 bg-ink-40 group-hover:w-6"
              }`}
            />
          </a>
        ))}
      </nav>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-emerald"
        style={{ scaleX: progress }}
      />
    </>
  );
}
