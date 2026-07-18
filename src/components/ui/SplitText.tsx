"use client";

import { motion } from "framer-motion";
import { maskUp, stagger } from "@/lib/motion";

/**
 * Masked, word-by-word headline reveal. Each word rises out of a clipped line.
 * `text` may contain multiple words; pass an array to force explicit line breaks.
 */
export function SplitText({
  text,
  className = "",
  delay = 0,
  once = true,
}: {
  text: string | string[];
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const lines = Array.isArray(text) ? text : [text];

  return (
    <motion.span
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
    </motion.span>
  );
}
