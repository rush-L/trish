"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { rise } from "@/lib/motion";

/** Fade + rise on scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
