"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Point = { label: string; value: number; note?: string };

/** Animated capability radar rendered as pure SVG. */
export function RadarChart({ data, size = 460 }: { data: Point[]; size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.36;
  const n = data.length;
  // Labels sit past the polygon at radiusScale 1.16 and can run long
  // ("Communication"); pad the viewBox so they don't clip against its edge.
  const pad = size * 0.22;
  const rings = [0.25, 0.5, 0.75, 1];

  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, radiusScale: number) => {
    const a = angle(i);
    return [cx + Math.cos(a) * r * radiusScale, cy + Math.sin(a) * r * radiusScale] as const;
  };

  const valuePoints = data.map((d, i) => pt(i, d.value / 100));
  const shape = valuePoints.map((p) => p.join(",")).join(" ");
  const zeroShape = data.map((_, i) => pt(i, 0).join(",")).join(" ");

  return (
    <svg
      ref={ref}
      viewBox={`${-pad} ${-pad} ${size + pad * 2} ${size + pad * 2}`}
      className="h-auto w-full max-w-[520px]"
      role="img"
      aria-label="Capability radar chart"
    >
      {/* grid rings */}
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={data.map((_, i) => pt(i, ring).join(",")).join(" ")}
          fill="none"
          stroke="rgba(245,242,236,0.12)"
          strokeWidth={1}
        />
      ))}
      {/* spokes */}
      {data.map((_, i) => {
        const [x, y] = pt(i, 1);
        return (
          <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(245,242,236,0.1)" strokeWidth={1} />
        );
      })}

      {/* value shape */}
      <motion.polygon
        points={inView ? shape : zeroShape}
        initial={{ points: zeroShape }}
        animate={{ points: inView ? shape : zeroShape }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        fill="rgba(16,131,106,0.22)"
        stroke="#10836a"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* vertices */}
      {valuePoints.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={3.5}
          fill="#c6a15b"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6 + i * 0.06, duration: 0.4 }}
        />
      ))}

      {/* labels */}
      {data.map((d, i) => {
        const [x, y] = pt(i, 1.16);
        const anchor = Math.abs(x - cx) < 8 ? "middle" : x > cx ? "start" : "end";
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            className="font-mono"
            fontSize={11}
            letterSpacing="0.06em"
            fill="rgba(245,242,236,0.7)"
          >
            {d.label}
          </text>
        );
      })}
    </svg>
  );
}
