"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: a small dot + a lagging ring that grows and labels itself
 * over interactive elements marked with [data-cursor].
 * Disabled on touch / coarse pointers and when reduced-motion is set.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 34, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 34, mass: 0.6 });

  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    setEnabled(true);
    document.body.classList.add("cursor-hidden");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      if (el) {
        setActive(true);
        setLabel(el.dataset.cursor || null);
      } else {
        setActive(false);
        setLabel(null);
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("cursor-hidden");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9998]">
      {/* dot */}
      <motion.div
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-graphite"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      {/* ring */}
      <motion.div
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-graphite/40"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: active ? 76 : 34,
          height: active ? 76 : 34,
          backgroundColor: active ? "rgba(15,92,76,0.9)" : "rgba(15,92,76,0)",
          borderColor: active ? "rgba(15,92,76,0)" : "rgba(26,28,30,0.35)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        {label && (
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
