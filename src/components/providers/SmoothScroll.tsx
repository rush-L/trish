"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { frame, cancelFrame } from "framer-motion";
import { lenisController } from "@/lib/lenisController";

/**
 * Lenis smooth-scroll driven by Framer Motion's frame loop so scroll-linked
 * animations stay in sync. Respects prefers-reduced-motion.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      // Lenis still hijacks + preventDefaults wheel events even when its raf
      // loop is never driven, which freezes wheel scrolling entirely for
      // reduced-motion users. Destroy it so native scrolling takes over.
      lenisRef.current?.lenis?.destroy();
      return;
    }

    lenisController.instance = lenisRef.current?.lenis ?? null;

    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }
    frame.update(update, true);
    return () => {
      cancelFrame(update);
      lenisController.instance = null;
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      }}
    >
      {children}
    </ReactLenis>
  );
}
