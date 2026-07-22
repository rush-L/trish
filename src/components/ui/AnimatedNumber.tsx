"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";

/** Counts up to `value` when scrolled into view. Non-numeric values render as-is. */
export function AnimatedNumber({
  value,
  suffix = "",
  className,
}: {
  value: string | number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-20% 0px" });
  const numeric = typeof value === "number" ? value : Number(value);
  const isNumeric = !Number.isNaN(numeric);

  const mv = useMotionValue(0);

  useEffect(() => {
    if (!isNumeric || !inView) return;
    mv.set(0);
    const controls = animate(mv, numeric, { type: "spring", stiffness: 60, damping: 18, mass: 1 });
    const unsub = mv.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, isNumeric, numeric, suffix, mv]);

  if (!isNumeric) {
    return (
      <span ref={ref} className={className}>
        {value}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
