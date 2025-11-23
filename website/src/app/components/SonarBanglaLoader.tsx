"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

/* ------- Industrial Theme Palette ------- */
const palette = {
  bg: "bg-[#0a0a0a]",
  textMain: "text-white",
  accent: "text-[#ea580c]",
  cardBorder: "border-white",
  cardShadow: "shadow-[4px_4px_0px_0px_#ea580c]",
};

export default function SonarBanglaLoader() {
  const [leaving, setLeaving] = useState(false);
  const router = useRouter();
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();

  const handleExplore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setLeaving(true);
    setTimeout(() => router.push("/home"), 400);
  };

  return (
    <motion.section
      initial="hidden"
      animate={leaving ? "exit" : "enter"}
      variants={{
        hidden: { opacity: 0 },
        enter: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
      }}
      className={twMerge(
        "relative flex flex-col items-center justify-center min-h-[100svh] w-full overflow-hidden",
        palette.bg
      )}
      aria-label="Hero Loader"
    >
      {/* --- Industrial Background --- */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.08),transparent_70%)] pointer-events-none" />
      
      {/* --- Main Content (Centered) --- */}
      <div className="relative z-50 flex flex-col items-center text-center gap-8 mb-12 md:mb-0">
        
        {/* Animated Headline */}
        <div className="flex flex-col items-center gap-2">
           <div className="flex items-center gap-3 mb-2">
             <span className="h-[2px] w-8 bg-[#ea580c]"></span>
             <span className="text-xs font-black uppercase tracking-[0.3em] text-white/50">Welcome To</span>
             <span className="h-[2px] w-8 bg-[#ea580c]"></span>
           </div>
           <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none drop-shadow-2xl">
             UTS<span className="text-[#ea580c]">BDSOC</span>
           </h1>
        </div>

        {/* Explore Button (Industrial Pill) */}
        <Link
          href="/home"
          onClick={handleExplore}
          className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 text-lg font-black uppercase tracking-wide transition-transform hover:-translate-y-1 shadow-[6px_6px_0px_0px_#ea580c] active:translate-y-0 active:shadow-[2px_2px_0px_0px_#ea580c] rounded-full border-2 border-black z-50"
        >
          Enter Site
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </Link>
      </div>

      {/* --- Cards Layer --- */}
      {/* Desktop: Draggable Scatter | Mobile: Auto-scrolling Marquee */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none md:pointer-events-auto">
         {isMobile ? <MobileMarquee /> : <DesktopCards />}
      </div>

    </motion.section>
  );
}

/* ---------------- DESKTOP SCATTER CARDS ---------------- */

const DesktopCards = React.memo(function DesktopCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maxZRef = useRef(10);

  const bumpZ = (setZ: React.Dispatch<React.SetStateAction<number>>) => {
    maxZRef.current += 1;
    setZ(maxZRef.current);
  };

  const images = [
    { src: "/dhaka-skyline-rickshaws.png", alt: "Dhaka", r: "4deg", t: "10%", l: "10%" },
    { src: "/traditional-bengali-boat.png", alt: "Boat", r: "-6deg", t: "60%", l: "15%" },
    { src: "/sundarbans-tiger.png", alt: "Tiger", r: "8deg", t: "15%", l: "65%" },
    { src: "/coxs-bazar-fishing-boats.png", alt: "Cox's Bazar", r: "-3deg", t: "55%", l: "70%" },
    { src: "/bengali-sweets-food.png", alt: "Sweets", r: "12deg", t: "30%", l: "80%" },
    { src: "/pohela-boishakh-celebration.png", alt: "Boishakh", r: "-8deg", t: "40%", l: "5%" },
  ];

  return (
    <div className="w-full h-full" ref={containerRef}>
      {images.map((img, i) => (
        <Card
          key={i}
          containerRef={containerRef}
          src={img.src}
          alt={img.alt}
          rotate={img.r}
          top={img.t}
          left={img.l}
          className="w-[22rem] xl:w-[28rem]"
          bumpZ={bumpZ}
        />
      ))}
    </div>
  );
});

/* ---------------- MOBILE MARQUEE (Better UX) ---------------- */

const MobileMarquee = () => {
  const images = [
    "/dhaka-skyline-rickshaws.png",
    "/traditional-bengali-boat.png",
    "/sundarbans-tiger.png",
    "/coxs-bazar-fishing-boats.png",
    "/bengali-sweets-food.png",
    "/pohela-boishakh-celebration.png",
  ];

  return (
    <div className="absolute bottom-0 w-full pb-8 overflow-hidden">
       <div className="flex w-[200%] animate-marquee">
          {[...images, ...images].map((src, i) => (
             <div key={i} className="w-40 sm:w-48 aspect-[4/3] shrink-0 mx-2 relative rounded-xl border-2 border-white bg-[#1a1a1a] shadow-[4px_4px_0px_0px_#ea580c] overflow-hidden rotate-1 odd:-rotate-1">
                <Image src={src} alt="Culture" fill className="object-cover grayscale opacity-80" />
             </div>
          ))}
       </div>
       <style jsx>{`
         .animate-marquee {
           animation: marquee 25s linear infinite;
         }
         @keyframes marquee {
           0% { transform: translateX(0); }
           100% { transform: translateX(-50%); }
         }
       `}</style>
    </div>
  );
};

/* ---------------- SHARED CARD COMPONENT ---------------- */

type CardProps = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  src: string;
  alt: string;
  top: string;
  left: string;
  rotate: string;
  className?: string;
  bumpZ: (setter: React.Dispatch<React.SetStateAction<number>>) => void;
};

const Card = React.memo(function Card({
  containerRef,
  src,
  alt,
  top,
  left,
  rotate,
  className,
  bumpZ,
}: CardProps) {
  const [zIndex, setZIndex] = useState(0);

  return (
    <motion.div
      onPointerDown={() => bumpZ(setZIndex)}
      style={{ top, left, rotate, zIndex }}
      className={twMerge(
        "absolute p-2 pb-8 shadow-2xl cursor-grab active:cursor-grabbing",
        "bg-[#1a1a1a] border-2 border-white",
        "shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]", // Hard shadow
        "transition-shadow duration-200",
        className
      )}
      drag
      dragConstraints={containerRef}
      dragElastic={0.2}
      dragMomentum={false}
      whileHover={{ scale: 1.05, rotate: 0, boxShadow: "12px 12px 0px 0px #ea580c", borderColor: "#ea580c" }}
      whileTap={{ scale: 1.02, cursor: "grabbing" }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="pointer-events-none select-none object-cover grayscale hover:grayscale-0 transition-all duration-500"
          draggable={false}
        />
        {/* Inner Shadow */}
        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] pointer-events-none" />
      </div>
      
      {/* Tape Label */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-[#ea580c]/20 skew-x-12" />
    </motion.div>
  );
});

/* ---------------- UTILS ---------------- */

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return isMobile;
}