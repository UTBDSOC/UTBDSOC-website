"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { FaTrophy } from "react-icons/fa"; // 




const colors = {
  brand: "#ea580c",
  ringDim: "stroke-[#ea580c]/30",
  surface: "bg-[#0a0a0a]",
};

const Hero: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden text-neutral-200 bg-black">
      
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/desiball-stage.jpg"
          alt="UTSBDSOC Stage Background"
          fill
          priority
          className="object-cover object-center opacity-60 saturate-0 contrast-125"
        />
        <div className="absolute inset-0 bg-[#ea580c]/10 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/95 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      </div>

      {/* ===== CONTENT GRID ===== */}
      <div className="relative z-10 mx-auto max-w-7xl min-h-[100svh] w-full grid grid-cols-1 md:grid-cols-2 place-content-center gap-8 pb-32 md:pb-0">
        
        {/* === LEFT: HELLO TEXT === */}
        <div className="flex flex-col justify-center px-4 order-1 items-center text-center md:items-start md:text-left">
          
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="font-extrabold leading-none text-7xl sm:text-8xl md:text-[8rem] lg:text-[10rem] tracking-tight shimmer-text drop-shadow-2xl"
            >
              HELLO
            </motion.h1>
          </div>

          <div className="mt-2 md:mt-6 w-full flex justify-center md:justify-start">
            <AnimatedText
              phrases={["Students", "Alumni", "Staff", "Public"]}
              disableAnimation={prefersReduced ?? false}
              fontSizeClasses="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
              lineWidthClass="w-24 md:w-36 lg:w-44"
              heightClass="h-[4rem] md:h-[6rem] lg:h-[7rem]"
            />
          </div>
        </div>

        {/* === RIGHT: LOGO === */}
        <div className="flex items-center justify-center px-4 order-2 w-full">
          <div
            className={`
              relative rounded-full flex items-center justify-center overflow-hidden 
              ${colors.surface} border-2 md:border-4 
              shadow-[0_0_40px_rgba(234,88,12,0.2)] md:shadow-[0_0_80px_rgba(234,88,12,0.25)]
              w-full max-w-[340px] md:max-w-[600px] lg:max-w-[720px]
            `}
            style={{ aspectRatio: "1 / 1", borderColor: colors.brand }}
          >
            <div className="absolute inset-0 w-full h-full">
               {!prefersReduced && <LogoOrbitRing />}
            </div>
            
            <Image
              src="/BDSOC-logo_transparent-2-1.png.webp"
              alt="UTSBDSOC Logo"
              width={800}
              height={800}
              priority
              className="object-contain p-3 md:p-6 z-10"
            />
          </div>
        </div>
      </div>

      {/* ===== FLOATING VOTE BUTTON (NEW ADDITION) ===== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-24 right-4 md:bottom-10 md:right-10 z-50"
      >
        <a
          href="/graamys"
          className="group relative flex items-center gap-3 bg-black border-2 border-white text-white px-5 py-3 md:px-6 md:py-4 rounded-full shadow-[4px_4px_0px_0px_#ea580c] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#ea580c] active:translate-y-0 active:shadow-[2px_2px_0px_0px_#ea580c] transition-all"
        >
          {/* Ping Animation */}
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>

          <FaTrophy className="text-[#ea580c] text-xl md:text-2xl group-hover:scale-110 transition-transform" />
          
          <div className="flex flex-col items-start leading-none">
             <span className="text-[10px] md:text-xs font-bold uppercase text-gray-400 tracking-widest group-hover:text-white transition-colors">Vote Now</span>
             <span className="text-sm md:text-lg font-black uppercase tracking-tighter">The Graamy's</span>
          </div>
        </a>
      </motion.div>

      {/* ===== BOTTOM BUTTONS ===== */}
      <div className="absolute left-0 right-0 bottom-0 pb-[max(2rem,env(safe-area-inset-bottom))] pt-12 px-4 flex justify-center z-30 bg-gradient-to-t from-black via-black/90 to-transparent md:bg-none pointer-events-none">
        <div className="w-full max-w-md flex flex-row gap-3 md:max-w-none md:w-auto md:gap-6 pointer-events-auto">
          <a
            href="/events"
            className="flex-1 md:flex-none relative font-bold rounded-2xl bg-[#ea580c] text-white py-4 text-base md:px-8 md:py-3.5 md:text-lg transition-transform hover:-translate-y-1 shadow-[3px_3px_0px_0px_white] active:translate-y-0 active:shadow-[1px_1px_0px_0px_white] text-center flex items-center justify-center"
          >
            Events
          </a>
          <a
            href="https://www.activateuts.com.au/clubs/bangladeshi-society"
            className="flex-1 md:flex-none relative font-bold rounded-2xl bg-black border-2 border-white text-white py-4 text-base md:px-8 md:py-3.5 md:text-lg transition-colors hover:bg-white hover:text-black text-center flex items-center justify-center"
          >
            Membership
          </a>
        </div>
      </div>

      <style jsx global>{`
        .shimmer-text {
          color: transparent;
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

// ===== HELPER COMPONENTS =====

const ONE_SECOND = 1000;
const WAIT_TIME = ONE_SECOND * 3;

const AnimatedText: React.FC<{
  phrases: string[];
  disableAnimation?: boolean;
  fontSizeClasses?: string;
  lineWidthClass?: string;
  heightClass?: string;
}> = ({ phrases, disableAnimation = false, fontSizeClasses, lineWidthClass, heightClass }) => {
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
    <div className={["relative flex justify-center md:justify-start items-center w-full", heightClass].join(" ")}>
      {phrases.map((phrase, index) => {
        const isActive = disableAnimation ? index === 0 : active === index;
        return (
          <motion.div
            key={phrase}
            initial={false}
            animate={isActive ? "active" : "inactive"}
            variants={{ 
              active: { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" }, 
              inactive: { opacity: 0, y: 20, scale: 0.95, pointerEvents: "none" } 
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={[
              "absolute font-bold text-white left-0 right-0 mx-auto md:mx-0 md:left-auto md:right-auto", 
              fontSizeClasses, 
              "drop-shadow-lg tracking-tight shimmer-text"
            ].join(" ")}
          >
            {phrase.toUpperCase()}
            <span className={["block h-1.5 mt-2 rounded-full mx-auto md:mx-0", lineWidthClass, "bg-[#ea580c] shadow-[2px_2px_0px_0px_white]"].join(" ")} />
          </motion.div>
        );
      })}
    </div>
  );
};

const LogoOrbitRing: React.FC = () => (
  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden>
    <defs>
      <linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
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