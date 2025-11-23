"use client";

import Link from "next/link";
import { EventItem } from "./events.types";
import { formatDT, googleCalLink, useCountdown, resolveEventImage } from "./events.utils";

export default function FeaturedEventBanner({ event }: { event: EventItem }) {
  const left = useCountdown(event.startISO);

  return (
    <section className="relative mx-auto max-w-5xl w-full group overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
      
      {/* === BACKGROUND IMAGE WITH GRADIENT === */}
      <div className="absolute inset-0">
        <img 
          src={resolveEventImage(event)} 
          alt={event.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent" />
      </div>

      {/* === CONTENT === */}
      <div className="relative z-10 p-8 md:p-10 flex flex-col justify-center min-h-[400px]">
        
        {/* Badge Row */}
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-[#ea580c] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
            Featured
          </span>
          {left && (
            <div className="flex gap-2 text-[#ea580c] font-mono text-xs font-bold">
               <span>{left.d}d : {left.h}h : {left.m}m</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight max-w-2xl">
          {event.title}
        </h3>

        {/* Metadata */}
        <div className="flex flex-wrap gap-4 text-sm md:text-base text-gray-300 mb-6 font-medium">
           <div className="flex items-center gap-2">
             <span className="text-[#ea580c]">🗓</span>
             <span>{formatDT(event.startISO)}</span>
           </div>
           <div className="hidden sm:block text-white/20">|</div>
           <div className="flex items-center gap-2">
             <span className="text-[#ea580c]">📍</span>
             <span>{event.location}</span>
           </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm md:text-base max-w-xl mb-8 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Action Buttons (Smaller & Sleeker) */}
        <div className="flex flex-wrap items-center gap-3">
          {event.rsvpUrl && (
            <Link 
              href={event.rsvpUrl} 
              className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-6 py-2.5 text-xs md:text-sm font-bold uppercase tracking-wide transition-transform hover:-translate-y-0.5 shadow-[3px_3px_0px_0px_#ea580c]"
            >
              Get Tickets
              <svg className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          )}
          <a 
            href={googleCalLink(event)} 
            target="_blank" 
            rel="noreferrer" 
            className="rounded-full border border-white/20 text-gray-300 px-5 py-2.5 text-xs md:text-sm font-bold uppercase tracking-wide hover:bg-white/10 hover:text-white transition-colors"
          >
            + Calendar
          </a>
        </div>
      </div>
    </section>
  );
}