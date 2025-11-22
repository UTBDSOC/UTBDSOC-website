"use client";
import Image from "next/image";
import Link from "next/link";

type Highlight = {
  title: string;
  date: string;
  href: string;
  image: string;
  tags?: string[];
};

const HIGHLIGHTS: Highlight[] = [
  {
    title: "Karaoke Night",
    date: "24 Sept 2025",
    href: "https://www.instagram.com/p/DOuXWM1gerY/",
    image: "/events/karaoke-night-2025.jpg",
    tags: ["Social", "Music", "Dance"],
  },
  {
    title: "Movie Night – Utshob",
    date: "5 Sept 2025",
    href: "https://www.instagram.com/p/DOlKgJnDyRB/",
    image: "/events/movie-night-utshob-2025.jpg",
    tags: ["Film", "Cultural", "Community"],
  },
  {
    title: "Boishakhi Potluck",
    date: "14 Apr 2025",
    href: "https://www.instagram.com/p/DlSzYBrZfxv/",
    image: "/events/boishakhi-potluck-2025.jpg",
    tags: ["Cultural", "Food", "Festival"],
  },
];

export default function PastHighlights() {
  return (
    <section
      className="relative overflow-hidden text-white mt-[-1px] py-24"
      style={{ background: "#0b0f14" }}
      aria-labelledby="past-highlights"
    >
      {/* ------------------------------------------------------
          TEXTURE & PATTERN LAYER
         ------------------------------------------------------ */}
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{ 
          backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Top Line Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

      {/* --- MAIN CONTENT --- */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
               <span className="h-[2px] w-12 bg-[#ea580c]"></span>
               <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                 Throwback
               </span>
            </div>
            <h2
              id="past-highlights"
              className="text-3xl md:text-4xl font-black tracking-tight text-white"
            >
              Past Event <span className="text-[#ea580c]">Highlights</span>
            </h2>
          </div>
          
          <Link
            href="https://www.instagram.com/utsbdsoc"
            target="_blank"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black shadow-[4px_4px_0px_0px_#ea580c] transition-transform hover:-translate-y-1 active:translate-y-0 active:shadow-none"
          >
            <svg className="w-4 h-4 text-[#ea580c]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            View on Instagram
          </Link>
        </div>

        {/* CARD GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((h, i) => (
            <article
              key={i}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#ea580c] hover:border-white/30"
            >
              
              {/* Image Section */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/10">
                <Image
                  src={h.image}
                  alt={h.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-110 grayscale hover:grayscale-0"
                />
                {/* Date Badge (Industrial Style) */}
                <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-lg">
                  {h.date}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-black tracking-tight text-white mb-2 group-hover:text-[#ea580c] transition-colors">
                  {h.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {h.tags?.map((t, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-400 border border-white/10 bg-[#1a1a1a]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Link Button */}
                <div className="mt-auto pt-4 border-t border-white/5">
                  <Link
                    href={h.href}
                    target="_blank"
                    className="inline-flex items-center text-sm font-bold text-white transition-colors hover:text-[#ea580c]"
                  >
                    See Post
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}