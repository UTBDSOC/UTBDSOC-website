"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ========= PERSISTENCE HELPERS ========= */
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

/* ========= DATA: 3 CATEGORIES ========= */
const ALL_IMAGES = [
  // --- 1. MOCK HOLUD (PHOTOLIA) ---
  { src: "/events/PHOTOLIA_-58.jpg", category: "Mock Holud", w: 1600, h: 1067, alt: "Vibrant entrance" },
  { src: "/events/PHOTOLIA_-125.jpg", category: "Mock Holud", w: 1600, h: 1067, alt: "Dance performance" },
  { src: "/events/PHOTOLIA_-145.jpg", category: "Mock Holud", w: 1600, h: 1067, alt: "Crowd cheering" },
  { src: "/events/PHOTOLIA_-152.jpg", category: "Mock Holud", w: 1600, h: 1067, alt: "Traditional rituals" },
  { src: "/events/PHOTOLIA_-158.jpg", category: "Mock Holud", w: 1600, h: 1067, alt: "Group dance sync" },
  { src: "/events/PHOTOLIA_-171.jpg", category: "Mock Holud", w: 1600, h: 1067, alt: "Colorful attire" },
  { src: "/events/PHOTOLIA_-181.jpg", category: "Mock Holud", w: 1600, h: 1067, alt: "Candid smiles" },
  { src: "/events/PHOTOLIA_-196.jpg", category: "Mock Holud", w: 1600, h: 1067, alt: "Stage decor" },
  { src: "/events/PHOTOLIA_-215.jpg", category: "Mock Holud", w: 1600, h: 1067, alt: "Group photo" },
  { src: "/events/PHOTOLIA_-217.jpg", category: "Mock Holud", w: 1600, h: 1067, alt: "Performance close up" },
  { src: "/events/PHOTOLIA_-224.jpg", category: "Mock Holud", w: 1600, h: 1067, alt: "Audience reaction" },
  { src: "/events/PHOTOLIA_-226.jpg", category: "Mock Holud", w: 1600, h: 1067, alt: "Sweets and treats" },
  { src: "/events/PHOTOLIA_-271.jpg", category: "Mock Holud", w: 1600, h: 1067, alt: "Friends gathering" },
  { src: "/events/PHOTOLIA_-418.jpg", category: "Mock Holud", w: 1600, h: 1067, alt: "Evening lights" },
  { src: "/events/PHOTOLIA_-455.jpg", category: "Mock Holud", w: 1600, h: 1067, alt: "Closing ceremony" },
  { src: "/events/PHOTOLIA_-461.jpg", category: "Mock Holud", w: 1600, h: 1067, alt: "Final group shot" },

  // --- 2. GAMES NIGHT ---
  { src: "/events/GamesNight.jpg", category: "Games Night", w: 1600, h: 1067, alt: "Board game strategy" },
  { src: "/events/GamesNight(1).jpg", category: "Games Night", w: 1600, h: 1067, alt: "Card games" },

  // --- 3. CHAAD RAAT ---
  { src: "/events/chaadraatutsbdsoc-150.jpg", category: "Chaad Raat", w: 1600, h: 1067, alt: "Henna art" },
  { src: "/events/chaadraatutsbdsoc-176.jpg", category: "Chaad Raat", w: 1600, h: 1067, alt: "Traditional fashion" },
];

const CATEGORIES = ["Mock Holud", "Games Night", "Chaad Raat"];

export default function GalleryPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { map: likes, set: setLike } = useLocalCount("utsbdsoc.gallery.likes");
  const { map: comments, add: addComment } = useLocalComments("utsbdsoc.gallery.comments");

  // Flattened list for lightbox navigation
  const flattenImages = useMemo(() => ALL_IMAGES, []);

  // --- FEED LOGIC (Mixes all images for the TikTok feed) ---
  const feedItems = useMemo(() => {
    // Copy the list and repeat it to make the scroll feel longer
    const base = [...ALL_IMAGES]; 
    const out: typeof base = [];
    const reps = Math.ceil(24 / Math.max(1, base.length)); // Ensure reasonable scroll length
    for (let i=0;i<reps;i++) out.push(...base);
    return out.slice(0, 30); // Limit to 30 items for performance
  }, []);

  // --- KEYBOARD NAV ---
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (openIndex === null) return;
    if (e.key === "Escape") setOpenIndex(null);
    if (e.key === "ArrowRight") setOpenIndex(prev => (prev == null ? 0 : (prev + 1) % flattenImages.length));
    if (e.key === "ArrowLeft")  setOpenIndex(prev => (prev == null ? 0 : (prev - 1 + flattenImages.length) % flattenImages.length));
  }, [openIndex, flattenImages.length]);

  useEffect(()=>{
    window.addEventListener("keydown",handleKey);
    return()=>window.removeEventListener("keydown",handleKey);
  },[handleKey]);

  const scrollToCategory = (cat: string) => {
    const el = document.getElementById(cat);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />

      {/* --- HERO --- */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-[#0a0a0a] text-white pt-32 pb-16 px-6 text-center overflow-hidden border-b border-white/10"
      >
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
             <span className="h-[3px] w-12 bg-[#ea580c]"></span>
             <span className="text-xs font-black uppercase tracking-[0.3em] text-white/50">
               The Archives
             </span>
             <span className="h-[3px] w-12 bg-[#ea580c]"></span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white">
            GALLERY
          </h1>
          
          {/* Category Quick Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => scrollToCategory(cat)}
                className="px-6 py-2 rounded-full border-2 border-white/20 hover:border-[#ea580c] hover:text-[#ea580c] hover:bg-white/5 text-sm font-bold uppercase tracking-wider transition-all"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- MAIN CONTENT --- */}
      <section className="bg-[#0a0a0a] text-white py-12 px-4 min-h-screen relative">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

        <div className="relative z-10 max-w-7xl mx-auto space-y-24">
          
          {/* === SECTION 1: VERTICAL SCROLL FEED (RESTORED) === */}
          <div className="mb-24 border-b-2 border-white/10 pb-24">
             <div className="flex items-center justify-center gap-3 mb-12">
               <span className="w-3 h-3 bg-[#ea580c] rounded-full animate-pulse"></span>
               <h2 className="text-2xl font-black uppercase tracking-widest text-white">Live Reel</h2>
             </div>
             <VerticalSnapFeed
               items={feedItems}
               likes={likes}
               onLike={(src)=>setLike(src, 1)}
               onOpen={(feedIdx) => {
                 // Find the correct index in the FULL list based on the source url
                 const src = feedItems[feedIdx]?.src;
                 const idx = ALL_IMAGES.findIndex(i => i.src === src);
                 if (idx >= 0) setOpenIndex(idx);
               }}
             />
          </div>

          {/* === SECTION 2: CATEGORIZED GRIDS === */}
          {CATEGORIES.map((category) => {
            const catImages = ALL_IMAGES.filter(img => img.category === category);
            
            return (
              <div key={category} id={category} className="scroll-mt-32">
                {/* Category Header */}
                <div className="flex items-end gap-4 mb-8 border-b-2 border-white/10 pb-4">
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                    {category}
                  </h2>
                  <span className="text-[#ea580c] font-bold text-lg mb-1">/ 2025</span>
                  <span className="ml-auto text-white/40 font-mono text-sm hidden sm:block">
                    {catImages.length} PHOTOS
                  </span>
                </div>

                {/* Masonry Grid for Category */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                  {catImages.map((img) => {
                    // Find global index for lightbox
                    const globalIndex = ALL_IMAGES.findIndex(x => x.src === img.src);
                    
                    return (
                      <motion.figure
                        key={img.src}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.4 }}
                        className="break-inside-avoid group relative bg-white p-1 shadow-[4px_4px_0px_0px_#ea580c] cursor-pointer hover:-translate-y-1 transition-transform"
                        onClick={() => setOpenIndex(globalIndex)}
                      >
                        <div className="relative w-full overflow-hidden bg-black">
                          <Image 
                            src={img.src} 
                            alt={img.alt} 
                            width={img.w} 
                            height={img.h} 
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 grayscale hover:grayscale-0" 
                            loading="lazy"
                          />
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <span className="bg-[#ea580c] text-white px-3 py-1 font-bold uppercase tracking-widest text-xs shadow-md">
                               View
                             </span>
                          </div>
                        </div>
                        <figcaption className="p-3 bg-white flex justify-between items-center">
                          <span className="text-black font-bold text-xs uppercase truncate max-w-[70%]">{img.alt}</span>
                          <button 
                            onClick={(e)=>{e.stopPropagation(); setLike(img.src, 1)}} 
                            className="text-black font-bold text-xs uppercase hover:text-[#ea580c] flex items-center gap-1"
                          >
                            ❤️ {likes[img.src] || 0}
                          </button>
                        </figcaption>
                      </motion.figure>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* === LIGHTBOX === */}
            {openIndex !== null && (
            <Lightbox
              items={flattenImages}
              index={openIndex!}
              onClose={() => setOpenIndex(null)}
              onNext={() => setOpenIndex((openIndex! + 1) % flattenImages.length)}
              onPrev={() => setOpenIndex((openIndex! - 1 + flattenImages.length) % flattenImages.length)}
              likes={likes}
              onLike={(src: string) => setLike(src, 1)}
              comments={comments}
              onAddComment={(src: string, text: string) => addComment(src, text)}
            />
            )}
        </div>
      </section>

      {/* Global Scrollbar Hide */}
      <style jsx global>{`
        html, body { overflow-y: auto; }
        *::-webkit-scrollbar { display: none; }
        * { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Footer />
    </>
  );
}

/* =================== VERTICAL SNAP FEED (INDUSTRIAL STYLE) =================== */

function VerticalSnapFeed({
  items,
  likes,
  onLike,
  onOpen,
}: {
  items: any[];
  likes: Record<string, number>;
  onLike: (src: string)=>void;
  onOpen: (index:number)=>void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard scroll support
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
    <div className="mx-auto w-full max-w-2xl">
      {/* The Scroll Container */}
      <div
        ref={containerRef}
        tabIndex={0}
        className="
          relative mx-auto
          h-[80vh]
          w-full
          overflow-y-auto
          snap-y snap-mandatory scroll-smooth
          overscroll-contain
          rounded-xl border-2 border-white/10 bg-[#111]
          shadow-[0_0_40px_-10px_rgba(0,0,0,0.7)]
          focus:outline-none focus:border-[#ea580c]
        "
      >
        {items.map((it, i) => (
          <article
            key={`${it.src}-${i}`}
            className="snap-start h-full w-full flex items-center justify-center p-4 sm:p-8 relative"
          >
            {/* Card Frame */}
            <div className="relative w-full max-w-[500px] bg-white p-2 shadow-2xl transform transition-transform duration-500 hover:scale-[1.01]">
              
              {/* Header Info (Inside Frame) */}
              <div className="flex justify-between items-center px-2 pb-2 pt-1">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#ea580c] rounded-full"></div>
                    <span className="text-black font-black text-sm uppercase tracking-tight">{it.category}</span>
                 </div>
                 <span className="text-gray-400 font-bold text-xs">2025</span>
              </div>

              {/* Image Clickable Area */}
              <button 
                onClick={()=>onOpen(i)} 
                className="relative w-full aspect-[4/5] overflow-hidden bg-black group"
              >
                <Image
                  src={it.src}
                  alt={it.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  priority={i < 2}
                />
                
                {/* Hard overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="bg-[#ea580c] text-white px-4 py-2 font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_black]">
                     Open
                   </span>
                </div>
              </button>

              {/* Footer Info */}
              <div className="pt-3 px-2 pb-1">
                 <p className="text-gray-600 text-sm font-medium leading-snug line-clamp-2 mb-3">
                   {it.alt}
                 </p>
                 
                 <div className="flex justify-between items-center border-t-2 border-black/5 pt-3">
                    <button 
                      onClick={(e)=>{e.stopPropagation(); onLike(it.src)}}
                      className="flex items-center gap-2 text-black font-bold text-xs uppercase hover:text-[#ea580c] transition-colors"
                    >
                      <span className="text-lg">❤️</span> {likes[it.src] || 0} Likes
                    </button>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      {i + 1} / {items.length}
                    </span>
                 </div>
              </div>

            </div>
          </article>
        ))}
      </div>
      
      {/* Hint */}
      <div className="text-center mt-4">
         <p className="text-white/30 text-xs font-bold uppercase tracking-widest animate-pulse">
           Scroll / Swipe 
         </p>
      </div>
    </div>
  );
}

/* =================== LIGHTBOX (Industrial) =================== */

function Lightbox({ items, index, onClose, onNext, onPrev, likes, onLike, comments, onAddComment }: any) {
  const item = items[index];
  const [text, setText] = useState("");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="flex w-full max-w-6xl h-full max-h-[85vh] bg-[#111] border-2 border-white/10 shadow-2xl overflow-hidden flex-col md:flex-row" onClick={e=>e.stopPropagation()}>
          
          {/* Image */}
          <div className="flex-1 relative bg-black flex items-center justify-center">
             <Image src={item.src} alt={item.alt} fill className="object-contain" />
             <button onClick={onPrev} className="absolute left-4 p-3 bg-white text-black font-bold hover:bg-[#ea580c] hover:text-white transition-colors shadow-[4px_4px_0px_0px_black]">←</button>
             <button onClick={onNext} className="absolute right-4 p-3 bg-white text-black font-bold hover:bg-[#ea580c] hover:text-white transition-colors shadow-[4px_4px_0px_0px_black]">→</button>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-[380px] bg-white flex flex-col border-l-2 border-black">
             <div className="p-5 border-b-2 border-black/10 bg-gray-50">
                <h2 className="text-xl font-black text-black uppercase leading-none">{item.category}</h2>
                <p className="text-[#ea580c] font-bold text-xs mt-1">2025</p>
                <p className="text-gray-600 text-sm mt-3 leading-relaxed">{item.alt}</p>
             </div>

             {/* Comments */}
             <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-white">
                {(comments[item.src] || []).map((c: any, i: number) => (
                   <div key={i} className="bg-gray-100 p-3 border-l-4 border-[#ea580c]">
                      <p className="text-sm text-black font-medium">{c.text}</p>
                   </div>
                ))}
             </div>

             {/* Action */}
             <div className="p-4 bg-gray-50 border-t-2 border-black/10">
                <div className="flex items-center justify-between mb-3">
                   <button onClick={()=>onLike(item.src)} className="text-black font-bold text-xs uppercase flex gap-2 items-center hover:text-[#ea580c]">
                      <span className="text-xl">❤️</span> {likes[item.src] || 0}
                   </button>
                   <button onClick={onClose} className="text-gray-400 hover:text-black text-xs font-bold uppercase">Close</button>
                </div>
                <form className="flex gap-2" onSubmit={(e)=>{e.preventDefault(); onAddComment(item.src, text); setText("");}}>
                   <input 
                     value={text} 
                     onChange={e=>setText(e.target.value)} 
                     placeholder="Add comment..." 
                     className="flex-1 bg-white border-2 border-black/10 px-3 py-2 text-sm text-black font-medium focus:outline-none focus:border-[#ea580c]" 
                   />
                   <button className="bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#ea580c]">Post</button>
                </form>
             </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}