"use client";
import Image from "next/image";
import Link from "next/link";

type Shot = { src: string; alt: string; href?: string };

const SHOTS: Shot[] = [
  { src: "/events/chaadraatutsbdsoc-150.jpg", alt: "Henna art at Chaad Raat" },
  { src: "/events/GamesNight.jpg", alt: "Board games & strategy" },
  { src: "/events/PHOTOLIA_-171.jpg", alt: "Traditional Holud attire" },
  { src: "/events/zuhayrsoccer-17.jpg", alt: "Soccer match action" },
  { src: "/events/PHOTOLIA_-215.jpg", alt: "Community group photo" },
  { src: "/events/chaadraatutsbdsoc-176.jpg", alt: "Traditional fashion showcase" },
];

export default function GalleryPreview() {
  return (
    <section
      className="relative text-white overflow-hidden bg-[#ea580c] py-24 md:py-32"
      aria-labelledby="gallery-heading"
    >
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      
      <div className="absolute top-0 left-0 right-0 h-px bg-black/10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
               <span className="h-[2px] w-12 bg-black"></span>
               <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/80">The Archives</span>
            </div>
            <h2 id="gallery-heading" className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-sm">
              Captured <span className="text-black">Moments</span>
            </h2>
          </div>
          <p className="text-lg font-medium text-black/80 max-w-sm md:text-right leading-snug">
            Snapshots from our recent events. See the energy of our community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SHOTS.slice(0, 3).map((s, i) => <Tile key={`row1-${i}`} shot={s} index={i} />)}
          <Tile shot={SHOTS[3]} index={3} />
          <div className="lg:col-span-2 relative group"><Tile shot={SHOTS[4]} tall index={4} /></div>
          <Tile shot={SHOTS[5]} index={5} />
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/gallery" className="relative inline-flex items-center justify-center gap-2 bg-black px-8 py-4 text-sm font-bold text-white rounded-full shadow-[4px_4px_0px_0px_white] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_white]">
            View Full Gallery
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Tile({ shot, tall = false, index = 0 }: { shot: Shot; tall?: boolean; index?: number }) {
  return (
    <article
      className={[
        "group relative isolate overflow-hidden bg-white p-2",
        "rounded-xl shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)]",
        // Rotate only on larger screens, straighten on mobile for cleaner stack
        index % 2 === 0 ? "md:rotate-1" : "md:-rotate-1",
        "transition-all duration-300 hover:rotate-0 hover:scale-[1.02] hover:z-10 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.4)]",
        tall ? "aspect-[16/9]" : "aspect-[4/3]",
      ].join(" ")}
    >
      {/* Image Container */}
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // MOBILE: Full Color. DESKTOP: Grayscale -> Color on hover.
          className="object-cover transition-all duration-700 group-hover:scale-110 md:grayscale md:group-hover:grayscale-0"
        />
        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none" />
      </div>

      {/* "Tape" Label */}
      <div className={`
        absolute bottom-4 left-4 right-4 transition-all duration-300
        // MOBILE: Always visible at bottom
        translate-y-0 opacity-100
        // DESKTOP: Hidden -> Slide up on hover
        md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100
      `}>
         <div className="bg-black text-white text-xs font-bold uppercase tracking-wide py-2 px-3 rounded-md inline-block shadow-lg md:transform md:-rotate-2">
            {shot.alt}
         </div>
      </div>

      <Link href="/gallery" className="absolute inset-0" aria-label={`View ${shot.alt}`} />
    </article>
  );
}