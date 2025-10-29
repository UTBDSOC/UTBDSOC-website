"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function GalleryPage() {
  // Image Data
  const images = useMemo(
    () => [
      { src: "/gallery/2025-cultural-night-01.jpg", alt: "Troupe performing traditional Bangladeshi dance on stage", tags: ["dance", "cultural"], event: "Cultural Night", year: 2025, w: 1600, h: 1067 },
      { src: "/gallery/2025-o-week-01.jpg", alt: "Society booth at O-Week with members smiling", tags: ["community", "o-week"], event: "O-Week", year: 2025, w: 1600, h: 1200 },
      { src: "/gallery/2024-workshop-01.jpg", alt: "Beginner dance workshop – circle formation", tags: ["dance", "workshop"], event: "Dance Workshop", year: 2024, w: 1600, h: 1067 },
      { src: "/gallery/2024-picnic-01.jpg", alt: "Spring picnic group photo at UTS Alumni Green", tags: ["community", "social"], event: "Spring Picnic", year: 2024, w: 1600, h: 1067 },
      { src: "/gallery/2024-culture-02.jpg", alt: "Solo classical performance in orange costume", tags: ["dance", "cultural"], event: "Culture Fest", year: 2024, w: 1600, h: 1067 },
      { src: "/gallery/2023-sports-01.jpg", alt: "Indoor sports day – badminton doubles mid-rally", tags: ["sports", "community"], event: "Sports Day", year: 2023, w: 1600, h: 1067 },
    ],
    []
  );

  const uniqueYears = Array.from(new Set(images.map(i => i.year))).sort((a,b)=>b-a);
  const uniqueTags  = Array.from(new Set(images.flatMap(i=>i.tags))).sort();

  const [query, setQuery] = useState("");
  const [year, setYear]   = useState("all");
  const [tag, setTag]     = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(()=>{
    return images.filter(img=>{
      const q=query.trim().toLowerCase();
      const matchesQ   = q ? img.alt.toLowerCase().includes(q) || img.event.toLowerCase().includes(q) : true;
      const matchesYear= year==="all" ? true : img.year===Number(year);
      const matchesTag = tag==="all" ? true : img.tags.includes(tag);
      return matchesQ && matchesYear && matchesTag;
    });
  },[images,query,year,tag]);

  // feed list (sorted, repeated to feel longer)
  const feedItems = useMemo(() => {
    const base = [...filtered].sort((a,b)=>b.year-a.year);
    const out: typeof base = [];
    const reps = Math.max(1, Math.ceil(24 / Math.max(1, base.length)));
    for (let i=0;i<reps;i++) out.push(...base);
    return out.slice(0, 24);
  }, [filtered]);

  // Lightbox keyboard nav
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (openIndex === null) return;
    if (e.key === "Escape") setOpenIndex(null);
    if (e.key === "ArrowRight") setOpenIndex(prev => (prev == null ? 0 : (prev + 1) % filtered.length));
    if (e.key === "ArrowLeft")  setOpenIndex(prev => (prev == null ? 0 : (prev - 1 + filtered.length) % filtered.length));
  }, [openIndex, filtered.length]);

  useEffect(()=>{
    window.addEventListener("keydown",handleKey);
    return()=>window.removeEventListener("keydown",handleKey);
  },[handleKey]);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#ff7a1a] text-white py-16 md:py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 md:mb-4">Gallery</h1>
          <p className="text-base md:text-lg text-white/90">Showcasing dance, culture, and community moments from UTS Bangladeshi Society.</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]" aria-hidden="true">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 120"><path d="M321.39 56.19C175.39 86.5 0 47.72 0 47.72V120h1200V47.72s-140.91 18.27-305.61 2.28c-137.57-12.86-263.72-43.23-397.09-33.69C380.23 23.56 361.33 48.13 321.39 56.19z" fill="#0b0f14"/></svg>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-[#0b0f14] text-white py-12 md:py-14 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#ff7a1a]">Our Highlights</h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                value={query}
                onChange={e=>setQuery(e.target.value)}
                placeholder="Search events..."
                className="w-full rounded-2xl bg-[#10161d] border border-white/10 px-4 py-2.5 text-sm outline-none focus:border-[#ff7a1a] focus:ring-2 focus:ring-[#ff7a1a]/30"
              />
              <select
                value={tag}
                onChange={e=>setTag(e.target.value)}
                className="rounded-2xl bg-[#10161d] border border-white/10 px-3 py-2.5 text-sm focus:border-[#ff7a1a] focus:ring-2 focus:ring-[#ff7a1a]/30"
              >
                <option value="all">All tags</option>
                {uniqueTags.map(t=>(<option key={t}>{t}</option>))}
              </select>
              <select
                value={year}
                onChange={e=>setYear(e.target.value)}
                className="rounded-2xl bg-[#10161d] border border-white/10 px-3 py-2.5 text-sm focus:border-[#ff7a1a] focus:ring-2 focus:ring-[#ff7a1a]/30"
              >
                <option value="all">All years</option>
                {uniqueYears.map(y=>(<option key={y}>{y}</option>))}
              </select>
            </div>
          </div>

          {/* === Smooth Vertical Swipe Feed (fixed 4:5 cards) === */}
          <VerticalSnapFeed
            items={feedItems}
            onOpen={(feedIdx) => {
              const src = feedItems[feedIdx]?.src;
              const idx = filtered.findIndex(i => i.src === src);
              if (idx >= 0) setOpenIndex(idx);
            }}
          />

          {/* Masonry below (optional keep) */}
          <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {filtered.map((img,idx)=>(
              <figure key={img.src} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-[#10161d] border border-white/5 group">
                <button onClick={()=>setOpenIndex(idx)} className="relative block w-full focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]">
                  <Image src={img.src} alt={img.alt} width={img.w} height={img.h} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy"/>
                </button>
                <figcaption className="px-4 py-3 text-sm text-white/80 flex items-center justify-between">
                  <span>{img.event}</span><span className="text-white/50">{img.year}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          {openIndex!==null && (
            <Lightbox
              items={filtered}
              index={openIndex}
              onClose={()=>setOpenIndex(null)}
              onNext={()=>setOpenIndex(prev=>(prev!==null ? (prev+1)%filtered.length : 0))}
              onPrev={()=>setOpenIndex(prev=>(prev!==null ? (prev-1+filtered.length)%filtered.length : filtered.length-1))}
            />
          )}
        </div>
      </section>

      {/* Hide scrollbars where we use custom scrolling */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Footer />
    </>
  );
}

/* =================== Vertical Snap Feed (smooth, fixed 4:5) =================== */

function VerticalSnapFeed({
  items,
  onOpen,
}: {
  items: { src:string; alt:string; event:string; year:number }[];
  onOpen: (index:number)=>void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Optional keyboard snap (up/down) for desktop power users
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (!["ArrowDown","PageDown","ArrowUp","PageUp"].includes(e.key)) return;
      e.preventDefault();
      const { scrollTop, clientHeight } = el;
      const nextTop = (e.key==="ArrowDown"||e.key==="PageDown") ? scrollTop + clientHeight : scrollTop - clientHeight;
      el.scrollTo({ top: nextTop, behavior: "smooth" });
    };
    el.addEventListener("keydown", onKey as any);
    return () => el.removeEventListener("keydown", onKey as any);
  }, []);

  return (
    <div className="mx-auto w-full">
      <h3 className="text-xl font-semibold text-white/90 mb-4">Swipe feed</h3>

      <div
        ref={containerRef}
        tabIndex={0}
        className="
          no-scrollbar relative mx-auto
          h-[100svh] md:h-[100svh]
          max-w-[720px]
          overflow-y-auto
          snap-y snap-mandatory scroll-smooth
          overscroll-contain
          rounded-2xl border border-white/10 bg-[#0e141b]
          [-webkit-overflow-scrolling:touch]
        "
      >
        {items.map((it, i) => (
          <article
            key={`${it.src}-${i}`}
            className="snap-start [scroll-snap-stop:always] min-h-[100svh] flex flex-col px-3 sm:px-4"
            aria-label={`${it.event} ${it.year}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pt-3 pb-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-8 w-8 rounded-full bg-[#ff7a1a]" aria-hidden />
                <div className="min-w-0">
                  <p className="text-sm text-white truncate"><strong>{it.event}</strong> • {it.year}</p>
                  <p className="text-xs text-white/60 truncate">{it.alt}</p>
                </div>
              </div>
              <span className="text-xs text-white/50">{i+1}/{items.length}</span>
            </div>

            {/* Media card: identical size every post */}
            <button
              onClick={()=>onOpen(i)}
              className="
                relative mx-auto w-full
                max-w-[640px]
                aspect-[4/5]            /* IG portrait */
                rounded-xl overflow-hidden
                bg-[#0b0f14] border border-white/10
                shadow-[0_8px_24px_rgba(0,0,0,0.35)]
                focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]
              "
              aria-label={`Open ${it.event} ${it.year}`}
            >
              <Image
                src={it.src}
                alt={it.alt}
                fill
                sizes="(max-width: 768px) 90vw, 640px"
                className="object-cover will-change-transform"
                priority={i<2}
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />
            </button>

            {/* Footer hint */}
            <div className="mx-auto w-full max-w-[640px] px-1 sm:px-0">
              <div className="flex items-center justify-between text-xs text-white/70 py-3">
                <span>Swipe ↑/↓</span>
                <span>Tap to open</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* =================== Lightbox =================== */

interface LightboxItem {
  src: string;
  alt: string;
  event: string;
  year: number;
  w: number;
  h: number;
}

function Lightbox({
  items,
  index,
  onClose,
  onNext,
  onPrev,
}: {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const item = items[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const touch = useRef({ startX: 0, startY: 0, dx: 0, dy: 0 });

  useEffect(() => {
    const closeButton = dialogRef.current?.querySelector("button[data-close]");
    if (closeButton instanceof HTMLButtonElement) closeButton.focus();
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = originalOverflow; };
  }, []);

  const tstart = (e: React.TouchEvent): void => {
    const t = e.changedTouches[0];
    touch.current = { startX: t.clientX, startY: t.clientY, dx: 0, dy: 0 };
  };
  const tmove = (e: React.TouchEvent): void => {
    const t = e.changedTouches[0];
    touch.current.dx = t.clientX - touch.current.startX;
    touch.current.dy = t.clientY - touch.current.startY;
  };
  const tend = () => {
    const { dx, dy } = touch.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? onNext() : onPrev();
    }
  };

  const downloadName = item.src.split("/").pop() || "image.jpg";
  const countLabel = `${index + 1} / ${items.length}`;

  return (
    <div
      role="dialog"
      aria-modal
      aria-label={`${item.event} • ${item.year} – ${countLabel}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      ref={dialogRef}
      onTouchStart={tstart}
      onTouchMove={tmove}
      onTouchEnd={tend}
    >
      <div
        className="relative w-full max-w-5xl max-h-[88vh] bg-[#0b0f14] rounded-2xl border border-white/10 overflow-hidden"
        onClick={(e)=>e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[#0e141b] border-b border-white/10">
          <div className="min-w-0 flex-1">
            <div className="text-white/90 text-sm md:text-base truncate">
              <strong className="text-white">{item.event}</strong> • {item.year}
            </div>
            <div className="text-white/60 text-xs truncate">{item.alt}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-white/60 text-xs mr-2">{countLabel}</span>
            <a href={item.src} download={downloadName} className="rounded-full px-3 py-1.5 text-sm bg-white/10 hover:bg-white/15 text-white">Download</a>
            <button onClick={onClose} data-close className="rounded-full px-3 py-1.5 text-sm bg-white/10 hover:bg-white/15 text-white">Close</button>
          </div>
        </div>
        <div className="relative flex items-center justify-center p-4">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.w}
            height={item.h}
            className="max-h-[60vh] md:max-h-[68vh] w-auto h-auto object-contain"
            priority
          />
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 pointer-events-none">
            <button onClick={onPrev} aria-label="Previous" className="pointer-events-auto rounded-full bg-white/10 hover:bg-white/15 p-3">◀</button>
            <button onClick={onNext} aria-label="Next" className="pointer-events-auto rounded-full bg-white/10 hover:bg-white/15 p-3">▶</button>
          </div>
        </div>
        <div className="px-3 pb-3 border-t border-white/10 bg-[#0b0f14]/80">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {items.map((thumb,i)=>(
              <button
                key={thumb.src}
                onClick={()=>{
                  if(i===index) return;
                  if(i<index) onPrev(); else onNext();
                }}
                className={`relative h-16 w-24 flex-shrink-0 rounded-lg overflow-hidden border ${i===index?"border-[#ff7a1a]":"border-white/10"}`}
              >
                <Image src={thumb.src} alt={thumb.alt} fill sizes="96px" className="object-cover"/>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
