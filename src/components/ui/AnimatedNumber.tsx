"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

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
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const numeric = typeof value === "number" ? value : Number(value);
  const isNumeric = !Number.isNaN(numeric);

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18, mass: 1 });

  useEffect(() => {
    if (!isNumeric || !inView) return;
    mv.set(numeric);
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
    });
    return unsub;
  }, [inView, isNumeric, numeric, suffix, mv, spring]);

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
