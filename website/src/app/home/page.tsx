"use client";
import React, { useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import GalleryPreview from "../components/GalleryPreview";
import PastHighlights from "../components/PastHighlights";
import Footer from "../components/Footer";
import EventCard, { type EventCardProps } from "../components/EventCard";

export default function Home() {
  // --- EVENT DATA ---
  const events: EventCardProps[] = [
    {
      title: "The Graamy's Awards – End of Year Party",
      tags: ["Formal", "Awards", "Party"],
      description:
        "Join UTS BDSOC for a night of glamour and celebration at our prestigious End of Year Party. Experience the red carpet, awards ceremony, and a stunning evening at Bayview Millers Point.",
      imageUrl: "/events/image_7a273e.jpg", 
      startISO: "2025-12-03T17:30:00+11:00",
      endISO: "2025-12-03T22:30:00+11:00",
      location: "Bayview Millers Point",
      locationUrl: "https://goo.gl/maps/YOUR_MAP_LINK_HERE", 
      status: "UPCOMING",
      buttonText: "Get Tickets",
      buttonLink: "#",
      featured: true,
    },
  ];

  // Sort logic
  const ordered = useMemo(() => {
    const now = Date.now();
    const asc = (a: EventCardProps, b: EventCardProps) =>
      +new Date(a.startISO) - +new Date(b.startISO);
    const desc = (a: EventCardProps, b: EventCardProps) =>
      +new Date(b.startISO) - +new Date(a.startISO);

    const upcoming = events.filter(e => +new Date(e.startISO) >= now).sort(asc);
    const past = events.filter(e => +new Date(e.startISO) < now).sort(desc);
    return [...upcoming, ...past];
  }, [events]);

  const [visibleCount, setVisibleCount] = useState(2);
  const visible = ordered.slice(0, visibleCount);
  const canLoadMore = visibleCount < ordered.length;

  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />

      {/* Events Section */}
      <section
        className="relative min-h-screen text-white py-24 overflow-hidden bg-[#0a0a0a]"
      >
        {/* 1. NOISE TEXTURE */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        
        {/* 2. GRADIENT GLOW (The Atmosphere) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(234,88,12,0.15),_transparent_60%)] pointer-events-none" />

        {/* 3. SQUARE GRID PATTERN (The "Gradient Squares") */}
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{ 
            backgroundImage: `
              linear-gradient(to right, #333 1px, transparent 1px),
              linear-gradient(to bottom, #333 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
          }} 
        />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          
          {/* Industrial Header */}
          <div className="flex flex-col items-center text-center mb-16">
             <div className="flex items-center gap-3 mb-4">
               <span className="h-[2px] w-12 bg-[#ea580c]"></span>
               <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                 Calendar
               </span>
               <span className="h-[2px] w-12 bg-[#ea580c]"></span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white drop-shadow-sm">
               Upcoming <span className="text-[#ea580c]">Events</span>
             </h2>
          </div>

          {/* Events Grid */}
          <div className="flex flex-col gap-12">
            {visible.map((ev) => (
              <div key={`${ev.title}-${ev.startISO}`} className="w-full">
                <EventCard
                  {...ev}
                  hoverTilt={false}
                  layout="featured"
                  cardBgClassName="bg-[#121212]" 
                />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {canLoadMore && (
            <div className="mt-16 flex justify-center">
              <button
                onClick={() => setVisibleCount((c) => Math.min(c + 2, ordered.length))}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-8 py-3 text-sm font-bold transition-all hover:-translate-y-1 shadow-[4px_4px_0px_0px_#ea580c] active:translate-y-0 active:shadow-[2px_2px_0px_0px_#ea580c]"
              >
                View More Events
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      <GalleryPreview />
      <PastHighlights />
      <Footer />
    </>
  );
}