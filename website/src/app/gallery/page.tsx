"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ========= tiny helpers for persisted state (per image src) ========= */
type CountMap = Record<string, number>;
type CommentMap = Record<string, { text: string; at: number }[]>;

function useLocalCount(key: string, initial: CountMap = {}) {
  const [map, setMap] = useState<CountMap>({});
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      setMap(raw ? JSON.parse(raw) : initial);
    } catch {}
  }, [key]);
  const set = (src: string, delta: number) => {
    setMap(prev => {
      const next = { ...prev, [src]: Math.max(0, (prev[src] || 0) + delta) };
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  };
  return { map, set };
}

function useLocalComments(key: string, initial: CommentMap = {}) {
  const [map, setMap] = useState<CommentMap>({});
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      setMap(raw ? JSON.parse(raw) : initial);
    } catch {}
  }, [key]);
  const add = (src: string, text: string) => {
    if (!text.trim()) return;
    setMap(prev => {
      const next = { ...prev, [src]: [...(prev[src] || []), { text: text.trim(), at: Date.now() }] };
      localStorage.setItem(key, JSON.stringify(next));
      return next;
    });
  };
  return { map, add };
}

export default function GalleryPage() {
  // Image Data
  const images = useMemo(
    () => [
      { src: "/gallery/2025-cultural-night-01.jpg", alt: "Troupe performing traditional Bangladeshi dance on stage", tags: ["dance", "cultural"], event: "Cultural Night", year: 2025, w: 1600, h: 1067, caption: "Spotlight on tradition at Cultural Night." },
      { src: "/gallery/2025-o-week-01.jpg", alt: "Society booth at O-Week with members smiling", tags: ["community", "o-week"], event: "O-Week", year: 2025, w: 1600, h: 1200, caption: "New faces, big smiles — O-Week vibes." },
      { src: "/gallery/2024-workshop-01.jpg", alt: "Beginner dance workshop – circle formation", tags: ["dance", "workshop"], event: "Dance Workshop", year: 2024, w: 1600, h: 1067, caption: "First steps together in our beginner workshop." },
      { src: "/gallery/2024-picnic-01.jpg", alt: "Spring picnic group photo at UTS Alumni Green", tags: ["community", "social"], event: "Spring Picnic", year: 2024, w: 1600, h: 1067, caption: "Sun, snacks, and the best company." },
      { src: "/gallery/2024-culture-02.jpg", alt: "Solo classical performance in orange costume", tags: ["dance", "cultural"], event: "Culture Fest", year: 2024, w: 1600, h: 1067, caption: "Grace in every beat at Culture Fest." },
      { src: "/gallery/2023-sports-01.jpg", alt: "Indoor sports day – badminton doubles mid-rally", tags: ["sports", "community"], event: "Sports Day", year: 2023, w: 1600, h: 1067, caption: "Rallying together on Sports Day." },
    ],
    []
  );

  const uniqueYears = Array.from(new Set(images.map(i => i.year))).sort((a,b)=>b-a);
  const uniqueTags  = Array.from(new Set(images.flatMap(i=>i.tags))).sort();

  const [query, setQuery] = useState("");
  const [year, setYear]   = useState("all");
  const [tag, setTag]     = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // persisted likes & comments
  const { map: likes, set: setLike } = useLocalCount("utsbdsoc.gallery.likes");
  const { map: comments, add: addComment } = useLocalComments("utsbdsoc.gallery.comments");

  const filtered = useMemo(()=>{
    return images.filter(img=>{
      const q=query.trim().toLowerCase();
      const matchesQ   = q ? img.alt.toLowerCase().includes(q) || img.event.toLowerCase().includes(q) || img.caption?.toLowerCase().includes(q) : true;
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
      <motion.section
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative bg-[#ff7a1a] text-white py-16 md:py-20 px-6 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 md:mb-4">Gallery</h1>
          <p className="text-base md:text-lg text-white/90">Showcasing dance, culture, and community moments from UTS Bangladeshi Society.</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]" aria-hidden="true">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1200 120"><path d="M321.39 56.19C175.39 86.5 0 47.72 0 47.72V120h1200V47.72s-140.91 18.27-305.61 2.28c-137.57-12.86-263.72-43.23-397.09-33.69C380.23 23.56 361.33 48.13 321.39 56.19z" fill="#0b0f14"/></svg>
        </div>
      </motion.section>

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

          {/* === Smooth Vertical Snap Feed (fixed 4:5 cards) with motion + reactions === */}
          <VerticalSnapFeed
            items={feedItems}
            likes={likes}
            onLike={(src)=>setLike(src, 1)}
            onOpen={(feedIdx) => {
              const src = feedItems[feedIdx]?.src;
              const idx = filtered.findIndex(i => i.src === src);
              if (idx >= 0) setOpenIndex(idx);
            }}
          />

          {/* Masonry below */}
          <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {filtered.map((img,idx)=>(
              <motion.figure
                key={img.src}
                layout
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35 }}
                className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-[#10161d] border border-white/5 group"
              >
                <button onClick={()=>setOpenIndex(idx)} className="relative block w-full focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]">
                  <Image src={img.src} alt={img.alt} width={img.w} height={img.h} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy"/>
                </button>
                <figcaption className="px-4 py-3 text-sm text-white/80">
                  <div className="flex items-center justify-between">
                    <span className="truncate">{img.event}</span>
                    <span className="text-white/50">{img.year}</span>
                  </div>
                  <p className="text-white/60 mt-1">{img.caption}</p>

                  {/* reactions + comments (compact) */}
                  <div className="mt-3 flex items-center justify-between">
                    <motion.button
                      whileTap={{ scale: 0.92 }}
                      onClick={()=>setLike(img.src, 1)}
                      className="rounded-full bg-white/10 hover:bg-white/15 px-3 py-1 text-xs"
                      aria-label="Like"
                    >
                      ❤️ {likes[img.src] || 0}
                    </motion.button>
                    <OpenInLightboxHint />
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          {openIndex!==null && (
            <Lightbox
              items={filtered}
              index={openIndex}
              onClose={()=>setOpenIndex(null)}
              onNext={()=>setOpenIndex(prev=>(prev!==null ? (prev+1)%filtered.length : 0))}
              onPrev={()=>setOpenIndex(prev=>(prev!==null ? (prev-1+filtered.length)%filtered.length : filtered.length-1))}
              likes={likes}
              onLike={(src)=>setLike(src,1)}
              comments={comments}
              onAddComment={addComment}
            />
          )}
        </div>
      </section>

      {/* Hide scrollbars globally + utility */}
      <style jsx global>{`
        html, body { overflow-y: auto; }
        *::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Footer />
    </>
  );
}

/* =================== Vertical Snap Feed (reduced gap) =================== */

function OpenInLightboxHint() {
  return <span className="text-xs text-white/60">Tap to open</span>;
}

function VerticalSnapFeed({
  items,
  likes,
  onLike,
  onOpen,
}: {
  items: { src:string; alt:string; event:string; year:number; caption?:string }[];
  likes: Record<string, number>;
  onLike: (src: string)=>void;
  onOpen: (index:number)=>void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

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
          h-[86svh] md:h-[86svh]
          max-w-[720px]
          overflow-y-auto
          snap-y snap-mandatory scroll-smooth
          overscroll-contain
          rounded-2xl border border-white/10 bg-[#0e141b]
          [-webkit-overflow-scrolling:touch]
          focus:outline-none focus:ring-1 focus:ring-[#ff7a1a]/50
        "
      >
        {items.map((it, i) => (
          <article
            key={`${it.src}-${i}`}
            className="snap-start [scroll-snap-stop:always] min-h-[86svh] flex flex-col px-3 sm:px-4"
            aria-label={`${it.event} ${it.year}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between pt-2 pb-1">
              <div className="flex items-center gap-2 min-w-0">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="h-8 w-8 rounded-full bg-[#ff7a1a]"
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="text-sm text-white truncate"><strong>{it.event}</strong> • {it.year}</p>
                  <p className="text-xs text-white/60 truncate">{it.alt}</p>
                </div>
              </div>
              <span className="text-xs text-white/50">{i+1}/{items.length}</span>
            </div>

            {/* Media card */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={()=>onOpen(i)}
              className="
                relative mx-auto w-full
                max-w-[640px]
                aspect-[4/5] max-h-[72svh]
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
              {/* Caption overlay */}
              {it.caption && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="absolute inset-x-0 bottom-0 p-3 text-sm text-white/90"
                >
                  <span className="line-clamp-2">{it.caption}</span>
                </motion.div>
              )}
            </motion.button>

            {/* Reactions row */}
            <div className="mx-auto w-full max-w-[640px] px-1 sm:px-0">
              <div className="flex items-center justify-between text-xs text-white/70 py-2">
                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={()=>onLike(it.src)}
                    className="rounded-full bg-white/10 hover:bg-white/15 px-3 py-1.5"
                    aria-label="Like"
                  >
                    ❤️ {likes[it.src] || 0}
                  </motion.button>
                </div>
                <span className="text-white/60">Swipe ↑/↓ • Tap to open</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* =================== Lightbox with likes + comments (unchanged) =================== */

interface LightboxItem {
  src: string;
  alt: string;
  event: string;
  year: number;
  w: number;
  h: number;
  caption?: string;
}

function Lightbox({
  items,
  index,
  onClose,
  onNext,
  onPrev,
  likes,
  onLike,
  comments,
  onAddComment,
}: {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  likes: Record<string, number>;
  onLike: (src: string)=>void;
  comments: Record<string, { text: string; at: number }[]>;
  onAddComment: (src: string, text: string)=>void;
}) {
  const item = items[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const touch = useRef({ startX: 0, startY: 0, dx: 0, dy: 0 });
  const [text, setText] = useState("");

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
  const thread = comments[item.src] || [];

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal
        aria-label={`${item.event} • ${item.year} – ${countLabel}`}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
        onClick={onClose}
        ref={dialogRef}
        onTouchStart={tstart}
        onTouchMove={tmove}
        onTouchEnd={tend}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          layout
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.98, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="relative w-full max-w-6xl max-h-[90vh] bg-[#0b0f14] rounded-2xl border border-white/10 overflow-hidden"
          onClick={(e)=>e.stopPropagation()}
        >
          {/* header */}
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

          {/* content split: media left, thread right */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* media */}
            <div className="md:col-span-2 relative flex items-center justify-center p-4">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.w}
                height={item.h}
                className="max-h-[60vh] md:max-h-[76vh] w-auto h-auto object-contain"
                priority
              />
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 pointer-events-none">
                <button onClick={onPrev} aria-label="Previous" className="pointer-events-auto rounded-full bg-white/10 hover:bg-white/15 p-3">◀</button>
                <button onClick={onNext} aria-label="Next" className="pointer-events-auto rounded-full bg-white/10 hover:bg-white/15 p-3">▶</button>
              </div>
            </div>

            {/* reactions + comments */}
            <div className="border-t md:border-t-0 md:border-l border-white/10 bg-[#0b0f14]/80 flex flex-col min-h-0">
              <div className="p-3 md:p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={()=>onLike(item.src)}
                    className="rounded-full bg-white/10 hover:bg-white/15 px-3 py-1.5 text-sm"
                  >
                    ❤️ {likes[item.src] || 0}
                  </motion.button>
                </div>
                <span className="text-xs text-white/60">{item.caption || ""}</span>
              </div>

              {/* thread */}
              <div className="px-3 md:px-4 flex-1 overflow-y-auto no-scrollbar space-y-3">
                {thread.length === 0 && (
                  <p className="text-white/50 text-sm pt-2">Be the first to comment.</p>
                )}
                {thread.map((c, idx) => (
                  <div key={idx} className="rounded-xl border border-white/10 bg-[#0e141b] p-2.5">
                    <p className="text-sm text-white/90">{c.text}</p>
                  </div>
                ))}
              </div>

              {/* composer */}
              <form
                className="p-3 md:p-4 border-t border-white/10 flex gap-2"
                onSubmit={(e)=>{ e.preventDefault(); onAddComment(item.src, text); setText(""); }}
              >
                <input
                  value={text}
                  onChange={e=>setText(e.target.value)}
                  placeholder="Add a comment…"
                  className="flex-1 rounded-xl bg-[#10161d] border border-white/10 px-3 py-2 text-sm outline-none focus:border-[#ff7a1a] focus:ring-2 focus:ring-[#ff7a1a]/30"
                />
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="rounded-xl bg-[#ff7a1a] text-white px-3 py-2 text-sm"
                  type="submit"
                >
                  Post
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
