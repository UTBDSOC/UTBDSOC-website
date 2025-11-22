"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

// Updated to the new "Director" Palette
const colors = {
  brand: "#ea580c", // The new deep orange
  ringDim: "stroke-[#ea580c]/30", // Dimmed orange for ring track
  surface: "bg-[#0a0a0a]", // Deepest black
};

const Hero: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative min-h-[100svh] overflow-hidden text-neutral-200 bg-black">
      
      {/* ===== FADED STAGE BACKGROUND (Your Original) ===== */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/desiball-stage.jpg"
          alt="UTSBDSOC Stage Background"
          fill
          priority
          className={`
            object-cover
            [object-position:center_35%]
            opacity-60
            saturate-0
            contrast-125
          `}
        />
        {/* Orange/Warm wash to tie it together */}
        <div className="absolute inset-0 bg-[#ea580c]/10 mix-blend-overlay pointer-events-none" />
        
        {/* Vertical fade to black */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />
        
        {/* Texture overlay (Optional: keeps it consistent with other sections without ruining your look) */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 mx-auto max-w-7xl min-h-[100svh] grid grid-cols-1 md:grid-cols-2 items-center">
        
        {/* LEFT: HELLO + AnimatedText */}
        <div className="flex items-center justify-center p-6 md:p-8 order-2 md:order-1">
          <div className="w-full max-w-3xl">
            <div className="relative inline-block">
              <motion.h1
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                // Added drop-shadow to pop against the new orange theme
                className="font-extrabold leading-none text-7xl md:text-[8rem] lg:text-[10rem] tracking-tight shimmer-text drop-shadow-2xl"
              >
                HELLO
              </motion.h1>
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

        {/* RIGHT: Circular Logo (Your Original Orbit) */}
        <div className="flex items-center justify-center p-6 md:p-8 order-1 md:order-2">
          <div
            className={`relative rounded-full flex items-center justify-center overflow-hidden ${colors.surface} border-4 shadow-[0_0_80px_rgba(234,88,12,0.25)]`}
            style={{ width: "90%", maxWidth: "620px", aspectRatio: "1 / 1", borderColor: colors.brand }}
          >
            {!prefersReduced && <LogoOrbitRing />}
            <Image
              src="/BDSOC-logo_transparent-2-1.png.webp"
              alt="UTSBDSOC Logo"
              width={800}
              height={800}
              priority
              className="object-contain p-6 z-10"
            />
          </div>
        </div>
      </div>

      {/* Bottom CTAs */}
      <div className="absolute left-0 right-0 bottom-8 px-4 pb-[env(safe-area-inset-bottom)] md:bottom-12 md:px-0 flex justify-center z-20">
        <div className="w-full max-w-md flex flex-col gap-3 md:max-w-none md:w-auto md:flex-row md:gap-6">
          
          {/* Events Button: Updated to match the "Hard Shadow" theme but kept your shape */}
          <a
            href="/events"
            className="relative font-bold rounded-2xl bg-[#ea580c] text-white w-full py-4 text-base md:w-auto md:px-8 md:py-3.5 md:text-lg transition-transform hover:-translate-y-1 shadow-[4px_4px_0px_0px_white] active:translate-y-0 active:shadow-[2px_2px_0px_0px_white] text-center"
          >
            Events
          </a>
          
          {/* Membership Button */}
          <a
            href="https://www.activateuts.com.au/clubs/bangladeshi-society"
            className="relative font-bold rounded-2xl bg-black border-2 border-white text-white w-full py-4 text-base md:w-auto md:px-8 md:py-3.5 md:text-lg transition-colors hover:bg-white hover:text-black text-center"
          >
            Membership
          </a>
        </div>
      </div>

      {/* Global styles (Kept your original shimmer, just tweaked color to match) */}
      <style jsx global>{`
        .shimmer-text {
          color: transparent;
          /* Shimmer from White to Orange-White */
          background-color: #ffffff;
          background-image: linear-gradient(90deg, #ffffff 0%, #fdba74 50%, #ffffff 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 4s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: 0% 0; }
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
            className={["absolute font-bold text-white", fontSizeClasses, "drop-shadow-lg tracking-tight shimmer-text"].join(" ")}
          >
            {phrase.toUpperCase()}
            {/* Underline bar updated to Orange */}
            <span className={["block h-1.5 mt-3 rounded-full", lineWidthClass, "bg-[#ea580c] shadow-[2px_2px_0px_0px_white]"].join(" ")} />
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
        {/* Updated Gradient to New Orange */}
        <stop offset="0%" stopColor="#ea580c" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0.5" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="44" className={colors.ringDim} strokeWidth="1.5" fill="none" />
    <circle cx="50" cy="50" r="44" stroke="url(#ringGrad)" strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="60 260">
      <animate attributeName="stroke-dashoffset" values="0;320" dur="8s" repeatCount="indefinite" />
    </circle>
  </svg>
);

export default Hero;