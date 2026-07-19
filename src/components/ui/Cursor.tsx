"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor: a small dot + a lagging ring that grows and labels itself
 * over interactive elements marked with [data-cursor].
 * Disabled on touch / coarse pointers and when reduced-motion is set.
 */
// Dark-grounds (obsidian/navy) sections invert the cursor's resting colors —
// see [data-theme="dark"] on those sections' root elements.
const LIGHT = {
  dot: "rgba(26,28,30,1)", // graphite
  ring: "rgba(26,28,30,0.6)",
  fill: "rgba(138,100,22,0.95)", // gold-ink
  label: "rgb(245,242,236)", // paper
  glow: "rgba(26,28,30,0.25)",
};
const DARK = {
  dot: "rgba(245,242,236,1)", // paper
  ring: "rgba(245,242,236,0.6)",
  fill: "rgba(198,161,91,0.95)", // gold
  label: "rgb(26,28,30)", // graphite
  glow: "rgba(245,242,236,0.3)",
};

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const onDarkRef = useRef(false);

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
      const target = e.target as HTMLElement | null;

      const el = target?.closest<HTMLElement>("[data-cursor]");
      if (el) {
        setActive(true);
        setLabel(el.dataset.cursor || null);
      } else {
        setActive(false);
        setLabel(null);
      }

      const dark = Boolean(target?.closest('[data-theme="dark"]'));
      if (dark !== onDarkRef.current) {
        onDarkRef.current = dark;
        setOnDark(dark);
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("cursor-hidden");
    };
  }, [x, y]);

  if (!enabled) return null;

  const theme = onDark ? DARK : LIGHT;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9998]">
      {/* dot */}
      <motion.div
        className="fixed left-0 top-0 h-3 w-3 rounded-full"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ backgroundColor: theme.dot, boxShadow: `0 0 0 6px ${theme.glow}` }}
        transition={{ duration: 0.25 }}
      />
      {/* ring */}
      <motion.div
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border-2"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: active ? 84 : 42,
          height: active ? 84 : 42,
          backgroundColor: active ? theme.fill : "rgba(0,0,0,0)",
          borderColor: active ? "rgba(0,0,0,0)" : theme.ring,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
      >
        {label && (
          <span
            className="font-mono text-[9px] uppercase tracking-[0.2em]"
            style={{ color: theme.label }}
          >
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
