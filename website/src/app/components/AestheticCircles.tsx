"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * AestheticCircles (with optional images)
 * -------------------------------------------------------------
 * Drop‑in background / decoration composed of animated circles.
 *
 * Design goals:
 * - Looks good out of the box (subtle, layered, soft)
 * - Zero layout shift (absolute, pointer‑events none)
 * - Responsive to container size
 * - Respects reduced‑motion
 * - Highly customizable via props (modes, colors, density)
 * - Can render **images inside circles** for photo‑bubbles
 *
 * Usage:
 * <div className="relative min-h-[60vh]">
 *   <AestheticCircles mode="float" imageSources={["/img1.jpg","/img2.jpg"]} imageFraction={0.6} />
 *   ...your content...
 * </div>
 */

export type AestheticCirclesProps = {
  /** Visual style */
  mode?: "float" | "orbit" | "pack"; // float = drifting, orbit = rings, pack = clustered bubbles
  /** Number of circles to render (float/pack modes). */
  count?: number;
  /** Palette for fills; gradients are auto‑generated. */
  colors?: string[]; // hex or tailwind CSS variables
  /** Optional set of image URLs to render inside circles. */
  imageSources?: string[];
  /** Fraction (0–1) of circles that should use images when imageSources exist. */
  imageFraction?: number;
  /** Opacity (0–1) for color circles */
  opacity?: number;
  /** Min/Max circle size in px (float/pack modes). */
  sizeRange?: [number, number];
  /** How much blur to apply to the soft layer. */
  blurPx?: number;
  /** Whether circles react slightly on hover. */
  interactive?: boolean;
  /** Optional seed for deterministic layout (SSR friendly). */
  seed?: number;
  /** Optional className for container. */
  className?: string;
};

const DEFAULT_COLORS = ["#ff7a1a", "#ffa45c", "#ffd1a4", "#ffe6cc"]; // brand → soft tints

export default function AestheticCircles({
  mode = "float",
  count = 18,
  colors = DEFAULT_COLORS,
  imageSources,
  imageFraction = 0.5,
  opacity = 0.25,
  sizeRange = [36, 140],
  blurPx = 12,
  interactive = true,
  seed,
  className,
}: AestheticCirclesProps) {
  const prefersReduced = useReducedMotion();

  // Lightweight seeded RNG for stable SSR/client rendering
  const rand = useMemo(() => makeRNG(typeof seed === "number" ? seed : 1337), [seed]);

  const circles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = lerp(sizeRange[0], sizeRange[1], rand());
      const x = rand() * 100; // percentage
      const y = rand() * 100; // percentage
      const hue = colors[Math.floor(rand() * colors.length)] || DEFAULT_COLORS[0];
      const drift = 6 + rand() * 10; // px drift radius
      const duration = 6 + rand() * 8; // seconds
      const delay = rand() * 2;
      const z = rand() > 0.6 ? 10 : rand() > 0.3 ? 5 : 0; // simple depth buckets
      const useImage = !!imageSources?.length && rand() < imageFraction;
      const imgSrc = useImage ? imageSources![Math.floor(rand() * imageSources!.length)] : undefined;
      return { id: i, size, x, y, hue, drift, duration, delay, z, useImage, imgSrc };
    });
  }, [count, colors, sizeRange, rand, imageSources, imageFraction]);

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        className || "",
      ].join(" ")}
    >
      {/* SOFT BACK LAYER (blurred, larger, slower) */}
      <div className="absolute inset-0">
        {circles.map((c) => (
          <motion.div
            key={"soft-" + c.id}
            className="absolute rounded-full"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: c.size * 1.4,
              height: c.size * 1.4,
              background: `radial-gradient( circle at 30% 30%, ${withAlpha(
                c.hue,
                opacity
              )}, transparent 60%)`,
              filter: `blur(${blurPx}px)`,
              transform: "translate(-50%, -50%)",
              zIndex: c.z,
            }}
            initial={false}
            animate={prefersReduced ? undefined : motionVariant(mode, c)}
            transition={{
              duration: c.duration * 1.3,
              delay: c.delay,
              repeat: prefersReduced ? 0 : Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            whileHover={interactive ? { scale: 1.03 } : undefined}
          />
        ))}
      </div>

      {/* CRISP FRONT LAYER (smaller, sharper, subtle ring OR image) */}
      <div className="absolute inset-0">
        {circles.map((c) => (
          <motion.div
            key={"front-" + c.id}
            className="absolute rounded-full overflow-hidden"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: c.size,
              height: c.size,
              transform: "translate(-50%, -50%)",
              zIndex: c.z + 1,
              outline: c.useImage ? `1px solid ${withAlpha("#000", 0.08)}` : `1px solid ${withAlpha(c.hue, 0.25)}`,
              boxShadow: c.useImage
                ? `0 6px 28px ${withAlpha("#000", 0.12)}, 0 0 40px ${withAlpha("#000", 0.05)}`
                : `0 0 40px ${withAlpha(c.hue, 0.15)}`,
              background: c.useImage
                ? undefined
                : `radial-gradient(circle at 35% 35%, ${withAlpha(
                    c.hue,
                    Math.min(opacity + 0.15, 0.6)
                  )}, transparent 70%)`,
            }}
            initial={false}
            animate={prefersReduced ? undefined : motionVariant(mode, c as any, 0.6)}
            transition={{
              duration: (c as any).duration,
              delay: (c as any).delay,
              repeat: prefersReduced ? 0 : Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
            whileHover={interactive ? { scale: 1.05 } : undefined}
          >
            {c.useImage && (
              <>
                {/* Use native img to avoid Next/Image constraints inside arbitrary backgrounds */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.imgSrc}
                  alt="circle"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  loading="lazy"
                  decoding="async"
                />
                {/* Soft vignette for polish */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 70% 30%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.28) 88%)",
                    mixBlendMode: "multiply",
                  }}
                />
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* OPTIONAL: ORBIT MODE RINGS */}
      {mode === "orbit" && (
        <div className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <OrbitRing key={i} index={i} color={colors[i % colors.length] || DEFAULT_COLORS[0]} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------------------------- helpers ----------------------------- */

function makeRNG(seed: number) {
  let t = seed >>> 0;
  return function () {
    // xorshift32
    t ^= t << 13;
    t ^= t >>> 17;
    t ^= t << 5;
    return ((t >>> 0) / 4294967296) || Math.random();
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function withAlpha(hex: string, a = 1) {
  // Supports hex like #rrggbb or CSS vars.
  if (hex.startsWith("#") && (hex.length === 7 || hex.length === 4)) {
    const [r, g, b] = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return hex; // fallback for CSS vars e.g. var(--brand)
}

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

function motionVariant(
  mode: "float" | "orbit" | "pack",
  c: { x: number; y: number; drift: number },
  intensity = 1
) {
  switch (mode) {
    case "orbit":
      // gentle elliptical orbits around their own center
      return {
        x: [0, c.drift * intensity, 0, -c.drift * intensity, 0],
        y: [0, -c.drift * 0.6 * intensity, 0, c.drift * 0.6 * intensity, 0],
      } as any;
    case "pack":
      // tiny jitter like a packed bubble layout breathing
      return {
        x: [0, c.drift * 0.25 * intensity, 0, -c.drift * 0.25 * intensity, 0],
        y: [0, -c.drift * 0.2 * intensity, 0, c.drift * 0.2 * intensity, 0],
        scale: [1, 1.015, 1, 1.02, 1],
      } as any;
    default:
    case "float":
      // lazy drifting clouds
      return {
        x: [0, c.drift * intensity, 0, -c.drift * intensity, 0],
        y: [0, -c.drift * 0.8 * intensity, 0, c.drift * 0.8 * intensity, 0],
      } as any;
  }
}

/* ----------------------------- OrbitRing ----------------------------- */
function OrbitRing({ index, color }: { index: number; color: string }) {
  const prefersReduced = useReducedMotion();
  const radius = 35 + index * 12; // in vmin for responsiveness
  const dash = 50;
  const gap = 280 - index * 30;
  const dur = 12 + index * 4;

  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id={`g-${index}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.85" />
          <stop offset="100%" stopColor={color} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r={radius} strokeWidth="0.6" fill="none" stroke={withAlpha(color, 0.25)} />
      <motion.circle
        cx="50"
        cy="50"
        r={radius}
        strokeWidth="1.8"
        fill="none"
        stroke={`url(#g-${index})`}
        strokeDasharray={`${dash} ${gap}`}
        animate={prefersReduced ? undefined : { strokeDashoffset: [0, 360] }}
        transition={{ duration: dur, repeat: prefersReduced ? 0 : Infinity, ease: "linear" }}
      />
    </svg>
  );
}
