"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

/* ------- Orange + warm charcoal palette ------- */
const palette = {
  bgFrom: "from-[#1b1b1b]",
  bgVia: "via-[#221c19]",
  bgTo: "to-[#2d1f15]",
  textMain: "text-orange-100",
  dot: "bg-orange-400",
  framePrimary: "border-orange-400",
  frameSecondary: "border-orange-300",
  frameSmoke: "border-stone-300/80",
};

export default function SonarBanglaLoader() {
  const [leaving, setLeaving] = useState(false);
  const router = useRouter();
  const prefersReduced = useReducedMotion();

  const handleExplore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setLeaving(true);
    setTimeout(() => router.push("/home"), 350);
  };

  return (
    <motion.section
      initial="hidden"
      animate={leaving ? "exit" : "enter"}
      variants={{
        hidden: { opacity: 0 },
        enter: { opacity: 1, transition: { duration: 0.25 } },
        exit: { opacity: 0, transition: { duration: 0.35 } },
      }}
      className={twMerge(
        "relative grid min-h-screen w-full place-content-center overflow-hidden",
        "bg-background",
        palette.bgFrom,
        palette.bgVia,
        palette.bgTo
      )}
      aria-label="Hero"
    >
      {/* Lightweight radial vignettes (no blur filters) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-transparent" />
        <div className="absolute inset-0 bg-transparent" />
      </div>

      {/* Big animated bilingual headline */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
        <AnimatedWords
          big
          textClass={twMerge(palette.textMain, "tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,.5)]")}
          dotClass={palette.dot}
          disableAnimation={prefersReduced ?? false}
        />
      </div>

      {/* Explore (CSS pulse instead of animated box-shadow) */}
      <div className="absolute bottom-10 left-1/2 z-50 -translate-x-1/2 transform">
        <Link
          href="/home"
          onClick={handleExplore}
          className="relative px-14 py-5 rounded-full font-extrabold text-2xl bg-orange-500 text-black shadow-lg hover:bg-orange-400 transition focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          <span className={prefersReduced ? "" : "pulse-ring"} />
          <span>Explore</span>
        </Link>
      </div>

      {/* Subtle smoke (static SVG path instead of big blurs) */}
      {!prefersReduced && <LightweightSmoke />}

      <Cards />
      <style jsx global>{`
        /* GPU-friendly pulse (scale/opacity only) */
        .pulse-ring {
          position: absolute;
          inset: -10px;
          border-radius: 9999px;
          will-change: transform, opacity;
          animation: pulse 1.6s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: .35; }
          70% { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(1.15); opacity: 0; }
        }
      `}</style>
    </motion.section>
  );
}

/* ---------- Animated bilingual words (lighter) ---------- */

const ONE_SECOND = 1000;
const WORD_WAIT = ONE_SECOND * 2;

function AnimatedWords({
  big = false,
  textClass = "",
  dotClass = "",
  disableAnimation = false,
}: {
  big?: boolean;
  textClass?: string;
  dotClass?: string;
  disableAnimation?: boolean;
}) {
  const en = useMemo(() => ["Students", "Alumni", "Staff", "Public"], []);
  const bn = useMemo(() => ["ছাত্রছাত্রী", "প্রাক্তন", "কর্মী", "জনসাধারণ"], []);
  const sequence = useMemo(() => en.flatMap((w, i) => [w, bn[i]]), [en, bn]);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (disableAnimation) return;
    let active = true;
    const id = setInterval(() => {
      if (!active || document.hidden) return; // pause when tab hidden
      setIdx((p) => (p + 1) % sequence.length);
    }, WORD_WAIT);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [sequence.length, disableAnimation]);

  return (
    <div className="relative flex items-center justify-center">
      {sequence.map((word, i) => {
        const active = i === idx || disableAnimation;
        return (
          <motion.div
            key={`${word}-${i}`}
            initial={false}
            animate={active ? "active" : "inactive"}
            variants={{
              active: { opacity: 1, y: 0, scale: 1 },
              inactive: { opacity: 0, y: 20, scale: 0.99 },
            }}
            transition={{ duration: 0.28 }}
            className={twMerge(
              "absolute font-extrabold text-center flex items-center gap-3 will-change-transform transform-gpu",
              big ? "text-[20vw] md:text-[200px] leading-none" : "text-3xl md:text-5xl",
              textClass
            )}
          >
            {word}
            <span
              className={twMerge("inline-block align-middle rounded-md", dotClass)}
              style={{ width: big ? "0.55em" : "0.5em", height: big ? "0.55em" : "0.5em" }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ---------- Cards (optimized) ---------- */

const Cards = React.memo(function Cards() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const maxZRef = useRef(10); // local counter instead of DOM reads

  const bumpZ = (setZ: React.Dispatch<React.SetStateAction<number>>) => {
    maxZRef.current += 1;
    setZ(maxZRef.current);
  };

  return (
    <div className="absolute inset-0 z-40" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src="/dhaka-skyline-rickshaws.png"
        alt="Dhaka cityscape"
        rotate="4deg"
        top="14%"
        left="16%"
        frame="primary"
        className="w-64 md:w-[28rem]"
        isMobile={isMobile}
        bumpZ={bumpZ}
      />
      <Card
        containerRef={containerRef}
        src="/traditional-bengali-boat.png"
        alt="Bengali boat"
        rotate="12deg"
        top="44%"
        left="60%"
        frame="secondary"
        className="w-56 md:w-[24rem]"
        isMobile={isMobile}
        bumpZ={bumpZ}
      />
      <Card
        containerRef={containerRef}
        src="/sundarbans-tiger.png"
        alt="Sundarbans"
        rotate="-6deg"
        top="10%"
        left="40%"
        frame="smoke"
        className="w-80 md:w-[34rem]"
        isMobile={isMobile}
        bumpZ={bumpZ}
      />
      <Card
        containerRef={containerRef}
        src="/coxs-bazar-fishing-boats.png"
        alt="Cox's Bazar beach"
        rotate="6deg"
        top="58%"
        left="30%"
        frame="primary"
        className="w-72 md:w-[30rem]"
        isMobile={isMobile}
        bumpZ={bumpZ}
      />
      <Card
        containerRef={containerRef}
        src="/bengali-sweets-food.png"
        alt="Bengali cuisine"
        rotate="16deg"
        top="18%"
        left="68%"
        frame="secondary"
        className="w-60 md:w-[26rem]"
        isMobile={isMobile}
        bumpZ={bumpZ}
      />
      <Card
        containerRef={containerRef}
        src="/pohela-boishakh-celebration.png"
        alt="Pohela Boishakh"
        rotate="-3deg"
        top="38%"
        left="52%"
        frame="smoke"
        className="w-48 md:w-[22rem]"
        isMobile={isMobile}
        bumpZ={bumpZ}
      />
      <Card
        containerRef={containerRef}
        src="/lalbagh-fort-architecture.png"
        alt="Lalbagh Fort"
        rotate="-10deg"
        top="64%"
        left="14%"
        frame="secondary"
        className="w-56 md:w-[24rem]"
        isMobile={isMobile}
        bumpZ={bumpZ}
      />
      <Card
        containerRef={containerRef}
        src="/bengali-handloom-weaving.png"
        alt="Bengali handloom"
        rotate="14deg"
        top="66%"
        left="72%"
        frame="primary"
        className="w-48 md:w-[22rem]"
        isMobile={isMobile}
        bumpZ={bumpZ}
      />
    </div>
  );
});

type AnyDivRef = React.RefObject<HTMLDivElement | null>;
type FrameTone = "primary" | "secondary" | "smoke";

type CardProps = {
  containerRef: AnyDivRef;
  src: string;
  alt: string;
  top: string;
  left: string;
  rotate: string;
  frame: FrameTone;
  className?: string;
  isMobile: boolean;
  bumpZ: (setter: React.Dispatch<React.SetStateAction<number>>) => void;
};

const Card = React.memo(function Card({
  containerRef,
  src,
  alt,
  top,
  left,
  rotate,
  frame,
  className,
  isMobile,
  bumpZ,
}: CardProps) {
  const [zIndex, setZIndex] = useState(0);

  const frameClass =
    frame === "primary"
      ? palette.framePrimary
      : frame === "secondary"
      ? palette.frameSecondary
      : palette.frameSmoke;

  const mobileFloat = isMobile
    ? {
        animate: { y: [0, -5, 0, 5, 0] },
        transition: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
      }
    : {};

  return (
    <motion.div
      onPointerDown={() => bumpZ(setZIndex)}
      style={{ top, left, rotate, zIndex }}
      className={twMerge(
        "absolute rounded-2xl border-2 p-3 pb-7 shadow-lg",
        "bg-black/10",
        frameClass,
        isMobile ? "cursor-default" : "cursor-grab active:cursor-grabbing",
        "will-change-transform transform-gpu",
        className
      )}
      drag={isMobile ? false : true}
      dragConstraints={containerRef}
      dragElastic={0.55}
      dragMomentum={false}
      whileHover={isMobile ? undefined : { scale: 1.03 }}
      whileTap={{ scale: 1.01 }}
      whileDrag={isMobile ? undefined : { scale: 1.05, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      {...mobileFloat}
    >
      <Image
        src={src}
        alt={alt}
        width={800}
        height={500}
        priority={false}
        sizes="(max-width: 768px) 60vw, 40vw"
        loading="lazy"
        decoding="async"
        className="select-none pointer-events-none rounded-xl"
        draggable={false}
      />
    </motion.div>
  );
});

/* ---------- Very light “smoke” using SVG (no blur) ---------- */
function LightweightSmoke() {
  return (
    <svg className="absolute w-full h-full">
      <defs>
      <linearGradient id="sm1" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#10B981" />
      </linearGradient>
      </defs>
    </svg>
  );
}

/* ---------- Helpers ---------- */
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
