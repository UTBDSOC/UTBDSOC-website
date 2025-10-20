// app/components/Hero.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import FixedFloaters, { Floater } from "../components/FixedFloaters";

const colors = {
  brand: "#ff7a1a",
  ringDim: "stroke-[#ffa45c]/30",
  surface: "bg-[#151a20]",
};

const Hero: React.FC = () => {
  const prefersReduced = useReducedMotion();

  const FLOATERS: Floater[] = [
    { id: "tl-1", size: 200, top: 6, left: 6, imageSrc: "/bubbles/image-1-1024x768.jpg.webp", ring: "rgba(255,164,92,0.35)", floatAmp: 10, floatDur: 8, floatDelay: 0.1 },
    { id: "tl-2", size: 150, top: 14, left: 14, imageSrc: "/bubbles/IMG_0357-1-edited-1.jpeg.webp", ring: "rgba(255,122,26,0.35)", floatAmp: 10, floatDur: 8, floatDelay: 0.3 },
    { id: "tr-1", size: 200, top: 8, right: 8, imageSrc: "/bubbles/IMG_3698-1024x683.jpg.webp", ring: "rgba(255,164,92,0.35)", floatAmp: 10, floatDur: 8, floatDelay: 0.25 },
    { id: "tr-2", size: 150, top: 50, right: 14, imageSrc: "/bubbles/AR6_3535-1024x683.jpg.webp", ring: "rgba(255,164,92,0.35)", floatAmp: 10, floatDur: 8, floatDelay: 0.45 },
    { id: "bl-1", size: 110, bottom: 10, left: 8, imageSrc: "/bubbles/IMG_0880-1024x681.jpg.webp", ring: "rgba(255,164,92,0.35)", floatAmp: 10, floatDur: 8, floatDelay: 0.5 },
    { id: "bl-2", size: 110, bottom: 18, left: 14, imageSrc: "/bubbles/Photography-By_Md-Jahangir_0071-1024x681.jpg.webp", ring: "rgba(255,122,26,0.35)", floatAmp: 10, floatDur: 8, floatDelay: 0.7 },
    { id: "br-1", size: 220, bottom: 8, right: 10, imageSrc: "/bubbles/IMG_1867-e1722353135831-1024x652.jpg.webp", ring: "rgba(255,164,92,0.35)", floatAmp: 10, floatDur: 8, floatDelay: 0.65 },
    { id: "br-2", size: 110, bottom: 16, right: 16, imageSrc: "/bubbles/Photography-By_Md-Jahangir_0155-1024x681.jpg.webp", ring: "rgba(255,122,26,0.35)", floatAmp: 10, floatDur: 8, floatDelay: 0.85 },
  ];

  return (
    <div className="relative min-h-[100svh] overflow-hidden text-neutral-200">
      {/* ===== FADED STAGE BACKGROUND ===== */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/desiball-stage.jpg" // make sure this path exists in /public
          alt="UTSBDSOC Stage Background"
          fill
          priority
          className={`
            object-cover
            [object-position:center_35%]
            opacity-70
            saturate-90
            contrast-105
          `}
        />
        {/* green/gold wash */}
        <div
          className={`
            absolute inset-0
            bg-[radial-gradient(60%_50%_at_50%_25%,rgba(17,44,33,0.28)_0%,rgba(8,14,12,0)_55%)]
            mix-blend-multiply
            pointer-events-none
          `}
        />
        {/* vertical fade */}
        <div
          className={`
            absolute inset-0
            bg-gradient-to-b from-black/15 via-transparent to-black/35
            pointer-events-none
          `}
        />
        {/* vignette */}
        <div
          className={`
            absolute inset-0
            bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.45)_100%)]
            pointer-events-none
          `}
        />
      </div>

      {/* ===== FLOATERS + CONTENT ===== */}
      <FixedFloaters items={FLOATERS} safeArea={{ x: 22, y: 14, w: 56, h: 64 }} edgePadding={18} zIndex={1}>
        <div className="relative z-10 mx-auto max-w-7xl min-h-[100svh] grid grid-cols-1 md:grid-cols-2 items-center">
          {/* LEFT: HELLO + AnimatedText */}
          <div className="flex items-center justify-center p-6 md:p-8">
            <div className="w-full max-w-3xl">
              <div className="relative inline-block">
                <motion.h1
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="font-extrabold leading-none text-7xl md:text-[8rem] lg:text-[10rem] tracking-tight shimmer-text"
                >
                  HELLO
                </motion.h1>
                <span
                  className="absolute inset-[-12px] rounded-md border border-white/30 md:inset-[-16px]"
                  aria-hidden
                />
              </div>

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

          {/* RIGHT: Circular Logo */}
          <div className="flex items-center justify-center p-6 md:p-8">
            <div
              className={`relative rounded-full flex items-center justify-center overflow-hidden ${colors.surface} border-4 shadow-[0_0_60px_rgba(255,122,26,.15)]`}
              style={{ width: "90%", maxWidth: "620px", aspectRatio: "1 / 1", borderColor: colors.brand }}
            >
              {!prefersReduced && <LogoOrbitRing />}
              <Image
                src="/BDSOC-logo_transparent-2-1.png.webp"
                alt="UTSBDSOC Logo"
                width={800}
                height={800}
                priority
                className="object-contain p-6"
              />
            </div>
          </div>
        </div>
      </FixedFloaters>

      {/* Bottom CTAs */}
      <div className="absolute left-0 right-0 bottom-4 px-4 pb-[env(safe-area-inset-bottom)] md:bottom-8 md:px-0 flex justify-center z-20">
        <div className="w-full max-w-md flex flex-col gap-3 md:max-w-none md:w-auto md:flex-row md:gap-4">
          <a
            href="/events"
            className="relative font-semibold rounded-2xl shadow-lg transition bg-[#ff7a1a] text-black w-full py-4 text-base md:w-auto md:px-7 md:py-3.5 md:text-sm hover:translate-y-[-1px] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#ff7a1a]/35 transform-gpu btn-pulse text-center"
          >
            Events
          </a>
          <a
            href="https://www.activateuts.com.au/clubs/bangladeshi-society"
            className="relative font-semibold rounded-2xl transition border border-[#ff7a1a] text-[#ff7a1a] bg-white/0 w-full py-4 text-base md:w-auto md:px-7 md:py-3.5 md:text-sm hover:bg-[#ff7a1a] hover:text-black hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#ff7a1a]/35 transform-gpu text-center"
          >
            Membership
          </a>
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        .shimmer-text {
          color: transparent;
          background-image: linear-gradient(90deg, #b2b874 0%, #f8f8f8 50%, #b2b874 100%);
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

const ONE_SECOND = 1000;
const WAIT_TIME = ONE_SECOND * 3;

const AnimatedText: React.FC<{
  phrases: string[];
  disableAnimation?: boolean;
  fontSizeClasses?: string;
  lineWidthClass?: string;
  heightClass?: string;
}> = ({ phrases, disableAnimation = false, fontSizeClasses = "text-3xl md:text-5xl lg:text-6xl", lineWidthClass = "w-24", heightClass = "h-16 md:h-20" }) => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (disableAnimation) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setActive((p) => (p + 1) % phrases.length);
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
            variants={{ active: { opacity: 1, y: 0, scale: 1 }, inactive: { opacity: 0, y: 16, scale: 0.98 } }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={["absolute font-bold", fontSizeClasses, "drop-shadow-[0_2px_12px_rgba(0,0,0,.45)] tracking-tight text-[#ff7a1a]"].join(" ")}
          >
            {phrase.toUpperCase()}
            <span className={["block h-1 mt-3 rounded-full", lineWidthClass, "bg-[#ff7a1a]/80"].join(" ")} />
          </motion.div>
        );
      })}
    </div>
  );
};

const LogoOrbitRing: React.FC = () => (
  <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
    <defs>
      <linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#ff7a1a" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0.1" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="44" className={colors.ringDim} strokeWidth="1.5" fill="none" />
    <circle cx="50" cy="50" r="44" stroke="url(#ringGrad)" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="60 260">
      <animate attributeName="stroke-dashoffset" values="0;320" dur="8s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default Hero;
