"use client";

import { motion } from "framer-motion";
import { maskUp, stagger } from "@/lib/motion";

/**
 * Masked, word-by-word headline reveal. Each word rises out of a clipped line.
 * `text` may contain multiple words; pass an array to force explicit line breaks.
 *
 * Renders as a real heading by default (`as="h2"`) — every call site here is a
 * section title, and a bare `<span>` skips screen readers navigating by heading.
 */
export function SplitText({
  text,
  className = "",
  delay = 0,
  once = true,
  as = "h2",
}: {
  text: string | string[];
  className?: string;
  delay?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "span";
}) {
  const lines = Array.isArray(text) ? text : [text];
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={stagger(delay, 0.08)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px" }}
      style={{ display: "block" }}
    >
      {lines.map((line, li) => (
        <span key={li} style={{ display: "block", overflow: "hidden" }}>
          {line.split(" ").map((word, wi) => (
            <span
              key={wi}
              style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
            >
              <motion.span variants={maskUp} style={{ display: "inline-block" }}>
                {word}
              </motion.span>
              {wi < line.split(" ").length - 1 && " "}
            </span>
          ))}
        </span>
      ))}
    </MotionTag>
  );
}
