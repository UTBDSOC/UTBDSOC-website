"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

/** --- Fixed theme palette (simple) --- */
const colors = {
  bgGradient: "bg-gradient-to-br from-[#0b0f14] via-[#0d131b] to-[#101820]",
  surface: "bg-[#151a20]",
  brand: "#ff7a1a",
  brandSoft: "#ffa45c",
  ringDim: "stroke-[#ffa45c]/30",
};

const Hero: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <div className={["min-h-screen relative overflow-hidden", colors.bgGradient, "text-neutral-200"].join(" ")}>
      {/* Two-column layout */}
      <div className="mx-auto max-w-7xl min-h-screen grid grid-cols-1 md:grid-cols-2 items-center">
        {/* LEFT: HELLO + Animated Words */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={[
                "font-extrabold leading-none",
                "text-7xl md:text-[8rem] lg:text-[10rem]",
                "tracking-tight",
                "shimmer-text",
              ].join(" ")}
            >
              HELLO
            </motion.h1>

            <div className="mt-6 md:mt-8">
              <AnimatedText
                phrases={["Students", "Alumni", "Staff", "Public"]}
                disableAnimation={prefersReduced ?? false}
                fontSizeClasses="text-4xl md:text-6xl lg:text-7xl"
                lineWidthClass="w-28 md:w-36 lg:w-44"
                heightClass="h-[4.5rem] md:h-[6rem] lg:h-[7rem]"
              />
            </div>
          </div>
        </div>

        {/* RIGHT: Large Circular Logo */}
        <div className="flex items-center justify-center p-8">
          <div
            className={[
              "relative rounded-full flex items-center justify-center overflow-hidden",
              colors.surface,
              "border-4",
              "shadow-[0_0_60px_rgba(255,122,26,.15)]",
            ].join(" ")}
            style={{ width: "90%", maxWidth: "600px", aspectRatio: "1 / 1", borderColor: colors.brand as any }}
          >
            {!prefersReduced && <LogoOrbitRing />}

            <Image
              src="/BDSOC-logo_transparent-2-1.png.webp"
              alt="UTSBDSOC Logo"
              width={800}
              height={800}
              priority
              sizes="(max-width: 768px) 80vw, 600px"
              className="object-contain p-6"
            />
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
        <button
          aria-label="View events"
          className={[
            "relative px-7 py-3.5 font-semibold rounded-full shadow-md transition duration-300",
            "bg-[#ff7a1a] text-black",
            "hover:translate-y-[-1px] hover:shadow-lg",
            "focus:outline-none focus:ring-4 focus:ring-[#ff7a1a]/35",
            "will-change-transform transform-gpu",
            "btn-pulse",
          ].join(" ")}
        >
          Events
        </button>
        <button
          aria-label="View membership"
          className={[
            "px-7 py-3.5 font-semibold rounded-full transition duration-300",
            "bg-transparent text-[#ff7a1a] border border-[#ff7a1a]",
            "hover:bg-[#ff7a1a] hover:text-black",
            "hover:-translate-y-px hover:shadow-lg",
            "focus:outline-none focus:ring-4 focus:ring-[#ff7a1a]/35",
            "will-change-transform transform-gpu",
          ].join(" ")}
        >
          Membership
        </button>
      </div>

      {/* global CSS (theme-aligned) */}
      <style jsx global>{`
        .shimmer-text {
          color: transparent;
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.12) 0%,
            rgba(255, 122, 26, 0.85) 50%,
            rgba(255, 255, 255, 0.12) 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 3.5s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          50% { background-position: 100% 0; }
          100% { background-position: 0% 0; }
        }
        .btn-pulse::after {
          content: "";
          position: absolute;
          inset: -6px;
          border-radius: 9999px;
          pointer-events: none;
          animation: btnpulse 1.8s ease-in-out infinite;
          box-shadow: 0 0 0 rgba(255, 122, 26, 0);
        }
        @keyframes btnpulse {
          0% { transform: scale(1); opacity: 0.35; }
          70% { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(1.15); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

/* AnimatedText */
const ONE_SECOND = 1000;
const WAIT_TIME = ONE_SECOND * 3;

const AnimatedText: React.FC<{
  phrases: string[];
  disableAnimation?: boolean;
  fontSizeClasses?: string;
  lineWidthClass?: string;
  heightClass?: string;
}> = ({
  phrases,
  disableAnimation = false,
  fontSizeClasses = "text-3xl md:text-5xl lg:text-6xl",
  lineWidthClass = "w-24",
  heightClass = "h-16 md:h-20",
}) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (disableAnimation) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setActive((prev) => (prev + 1) % phrases.length);
    }, WAIT_TIME);
    return () => clearInterval(id);
  }, [phrases, disableAnimation]);

  return (
    <div className={["relative flex items-center", heightClass].join(" ")}>
      {phrases.map((phrase, index) => {
        const isActive = disableAnimation ? index === 0 : active === index;
        return (
          <motion.div
            key={phrase}
            initial={false}
            animate={isActive ? "active" : "inactive"}
            variants={{
              active: { opacity: 1, y: 0, scale: 1 },
              inactive: { opacity: 0, y: 16, scale: 0.98 },
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={[
              "absolute font-bold",
              fontSizeClasses,
              "drop-shadow-[0_2px_12px_rgba(0,0,0,.45)]",
              "will-change-transform transform-gpu",
              "tracking-tight",
              "text-[#ff7a1a]",
            ].join(" ")}
          >
            {phrase.toUpperCase()}
            <span className={["block h-1 mt-3 rounded-full", lineWidthClass, "bg-[#ff7a1a]/80"].join(" ")} />
          </motion.div>
        );
      })}
    </div>
  );
};

/* Orbit Ring */
const LogoOrbitRing: React.FC = () => {
  return (
    <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#ff7a1a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="44" className={colors.ringDim} strokeWidth="1.5" fill="none" />
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="url(#ringGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="60 260"
      >
        <animate attributeName="stroke-dashoffset" values="0;320" dur="8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

export default Hero;
