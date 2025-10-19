// components/FixedFloaters.tsx
"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export type Floater = {
  id: string;
  size: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  z?: number;

  imageSrc: string;   // must exist in /public (e.g. /bubbles/xxx.webp)
  imageAlt?: string;

  ring?: string;       // e.g. "rgba(255,164,92,0.35)"
  floatAmp?: number;   // px
  floatDur?: number;   // s
  floatDelay?: number; // s
};

type Props = {
  children?: React.ReactNode;
  items: Floater[];
  safeArea?: { x: number; y: number; w: number; h: number };
  edgePadding?: number;
  hideOnMobile?: boolean;
  zIndex?: number;
};

export default function FixedFloaters({
  children,
  items,
  safeArea = { x: 26, y: 16, w: 48, h: 60 },
  edgePadding = 16,
  hideOnMobile = false,
  zIndex = 0,
}: Props) {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div
        className={[
          "pointer-events-none absolute inset-0",
          hideOnMobile ? "hidden md:block" : "",
        ].join(" ")}
        style={{ zIndex }}
        aria-hidden
      >
        {items.map((f) => {
          const style = positionToStyle(f, edgePadding);
          nudgeOutOfSafe(style, f.size, safeArea);

          const amp = f.floatAmp ?? 10;
          const dur = f.floatDur ?? 6;
          const delay = f.floatDelay ?? 0;

          const Circle = (
            <div
              className="relative rounded-full overflow-hidden"
              style={{
                width: f.size,
                height: f.size,
                // show a subtle bg so it doesn't look empty if the image 404s
                background: "rgba(255,122,26,0.06)",
                boxShadow: f.ring ? `0 0 0 2px ${f.ring}` : undefined,
              }}
            >
              <Image
                src={f.imageSrc}
                alt={f.imageAlt ?? ""}
                fill
                sizes={`${f.size}px`}
                className="object-cover select-none"
                draggable={false}
                priority={false}
                // If you’re loading from external domain, add it in next.config images.domains
              />
            </div>
          );

          if (prefersReduced) {
            return (
              <div key={f.id} className="absolute" style={{ ...style, zIndex: f.z ?? 1 }}>
                {Circle}
              </div>
            );
          }

          return (
            <motion.div
              key={f.id}
              className="absolute"
              style={{ ...style, zIndex: f.z ?? 1 }}
              initial={{ y: 0 }}
              animate={{ y: [0, -amp, 0, amp, 0] }}
              transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
            >
              {Circle}
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 pointer-events-auto">{children}</div>
    </div>
  );
}

/* helpers */
function positionToStyle(
  f: Pick<Floater, "top" | "left" | "right" | "bottom">,
  pad: number
): React.CSSProperties {
  const style: React.CSSProperties = {};
  if (typeof f.top === "number") style.top = `calc(${f.top}% + ${pad}px)`;
  if (typeof f.left === "number") style.left = `calc(${f.left}% + ${pad}px)`;
  if (typeof f.right === "number") style.right = `calc(${f.right}% + ${pad}px)`;
  if (typeof f.bottom === "number") style.bottom = `calc(${f.bottom}% + ${pad}px)`;
  return style;
}

function nudgeOutOfSafe(
  style: React.CSSProperties,
  size: number,
  safe: { x: number; y: number; w: number; h: number }
) {
  const pct = readPct(style);
  if (!pct) return;
  const whPct = Math.max((size / 1200) * 100, 2);
  const floater = {
    x: pct.left ?? 100 - (pct.right ?? 0) - whPct,
    y: pct.top ?? 100 - (pct.bottom ?? 0) - whPct,
    w: whPct,
    h: whPct,
  };
  const overlap =
    floater.x < safe.x + safe.w &&
    floater.x + floater.w > safe.x &&
    floater.y < safe.y + safe.h &&
    floater.y + floater.h > safe.y;

  if (!overlap) return;

  const nudge = 4;
  if (floater.x + floater.w / 2 < safe.x + safe.w / 2) {
    if (style.left) style.left = bump(style.left as string, -nudge);
    else if (style.right) style.right = bump(style.right as string, nudge);
  } else {
    if (style.right) style.right = bump(style.right as string, -nudge);
    else if (style.left) style.left = bump(style.left as string, nudge);
  }
  if (floater.y + floater.h / 2 < safe.y + safe.h / 2) {
    if (style.top) style.top = bump(style.top as string, -nudge);
    else if (style.bottom) style.bottom = bump(style.bottom as string, nudge);
  } else {
    if (style.bottom) style.bottom = bump(style.bottom as string, -nudge);
    else if (style.top) style.top = bump(style.top as string, nudge);
  }
}

function readPct(style: React.CSSProperties) {
  const take = (v?: string | number) => {
    if (typeof v !== "string") return undefined;
    const m = v.match(/calc\(([\d.]+)%/);
    return m ? parseFloat(m[1]) : undefined;
  };
  return {
    top: take(style.top as string),
    left: take(style.left as string),
    right: take(style.right as string),
    bottom: take(style.bottom as string),
  };
}

function bump(input: string, deltaPct: number) {
  const m = input.match(/calc\(([\d.]+)% \+ ([\d.]+)px\)/);
  if (!m) return input;
  const base = parseFloat(m[1]) + deltaPct;
  const px = m[2];
  return `calc(${Math.max(0, Math.min(100, base))}% + ${px}px)`;
}
