"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

export default function AboutSection() {
  const photos = useMemo(
    () => [
      { src: "/IMG_3697-1024x683.jpg.webp", alt: "Attendees enjoying a vibrant event" },
      { src: "/Photography-By_Md-Jahangir_0058-1024x681.jpg.webp", alt: "Traditional Bangladeshi cultural performance" },
    ],
    []
  );

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32 bg-[#ea580c]" 
      // ^ FLAT COLOR (Tailwind Orange-600). No gradients.
      aria-labelledby="about-utsbdsoc"
    >
      {/* ------------------------------------------------------
          1. TEXTURE & PATTERN (The "Flat" Fix)
          Since we can't use gradients, we use patterns to break 
          up the solid block of color so it doesn't look cheap.
         ------------------------------------------------------ */}
      
      {/* Noise Texture: Makes the orange look like paper/fabric */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none" 
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
      />

      {/* Dot Pattern: Adds technical detail without shading */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }} 
      />

      {/* Top & Bottom Borders: Defines the edge sharply (Swiss Style) */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20" />

      {/* ------------------------------------------------------
          2. CONTENT
         ------------------------------------------------------ */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-white">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT CONTENT */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-12 bg-black"></span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/80">
                Who We Are
              </span>
            </div>

            <h2
              id="about-utsbdsoc"
              className="text-4xl md:text-6xl font-black tracking-tight leading-[1] mb-8 text-white"
            >
              We act as the <br />
              {/* Black highlight creates "Magazine" look on flat color */}
              <span className="relative inline-block mt-2">
                <span className="absolute inset-0 bg-black -skew-y-2 transform translate-y-1" />
                <span className="relative px-2">Heart of Community</span>
              </span>
            </h2>

            <p className="text-lg text-white font-medium leading-relaxed mb-8 max-w-xl">
              We’re the Bangladeshi Society at UTS — a welcoming hub celebrating culture through food, music, and festivals. Whether you’re Bangladeshi or simply curious, you’re invited to build campus memories with us.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Inclusive, student-led community",
                "Regular cultural nights & socials",
                "Leadership & creative opportunities"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-sm font-bold text-black/80">
                  <div className="flex items-center justify-center w-6 h-6 border-2 border-black rounded-full">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              {/* Black Button on Orange = High Contrast / Industrial Look */}
              <Link
                href="https://www.activateuts.com.au/clubs/bangladeshi-society"
                className="rounded-full bg-black px-8 py-4 text-sm font-bold text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)]"
              >
                Join the Club
              </Link>
              <Link
                href="/about"
                className="group flex items-center gap-2 rounded-full px-6 py-4 text-sm font-bold text-black border-2 border-black hover:bg-black hover:text-white transition-colors"
              >
                Read our Story
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* RIGHT CONTENT: Staggered Images */}
          <div className="relative h-full min-h-[400px] w-full hidden md:block">
             {/* Image 1 */}
            <div className="absolute top-0 left-0 w-[55%] aspect-[3/4] z-10 transform -rotate-2 border-4 border-black bg-black">
               <div className="relative w-full h-full">
                 <Image
                  src={photos[1].src}
                  alt={photos[1].alt}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>
            </div>

            {/* Image 2 */}
            <div className="absolute bottom-8 right-4 w-[60%] aspect-[4/3] z-20 transform translate-y-6 border-4 border-black bg-black">
               <div className="relative w-full h-full">
                 <Image
                  src={photos[0].src}
                  alt={photos[0].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                {/* Flat Badge */}
                 <Link href="/events" className="absolute bottom-0 right-0 bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                   Next Event →
                </Link>
              </div>
            </div>
          </div>
          
          {/* Mobile Image */}
          <div className="md:hidden relative aspect-video w-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
             <Image
              src={photos[0].src}
              alt="Community event"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}