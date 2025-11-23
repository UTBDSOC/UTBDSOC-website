"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { FiClock, FiMapPin, FiCalendar } from "react-icons/fi";
import { EventItem, EventTag } from "./events.types";
import { isUpcoming, formatDT, googleCalLink, resolveEventImage } from "./events.utils";

interface EventsGridProps {
  items: EventItem[];
  initialVisible?: number;
  onEventClick?: (event: EventItem) => void;
}

export default function EventsGrid({ items, initialVisible = 6, onEventClick }: EventsGridProps) {
  const [tab, setTab] = useState<"Upcoming" | "Past" | "All">("Upcoming");
  const [activeTags, setActiveTags] = useState<EventTag[]>([]);
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(initialVisible);

  const allTags = useMemo(() => {
    const s = new Set<EventTag>();
    items.forEach((e) => e.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    let list = items.slice();

    if (tab === "Upcoming") list = list.filter(isUpcoming);
    if (tab === "Past") list = list.filter((e) => !isUpcoming(e));

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
      );
    }

    if (activeTags.length) {
      list = list.filter((e) => activeTags.every((t) => e.tags.includes(t)));
    }

    list.sort((a, b) => {
      const da = new Date(a.startISO).getTime();
      const db = new Date(b.startISO).getTime();
      return tab === "Past" ? db - da : da - db;
    });

    return list;
  }, [items, tab, activeTags, query]);

  useEffect(() => {
    setVisibleCount(initialVisible);
  }, [tab, activeTags, query, initialVisible]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const toggleTag = (t: EventTag) => {
    setActiveTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  };

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <>
      <section className="px-4 md:px-8 pb-12">
        <div className="mx-auto max-w-6xl flex flex-col gap-8">
          
          {/* Controls Bar (Industrial Style) */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 justify-between border-b-2 border-white/10 pb-8">
            
            {/* Tabs */}
            <div className="flex bg-black border-2 border-white/10 p-1 rounded-lg shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
              {(["Upcoming", "Past", "All"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-6 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${
                    tab === t 
                      ? "bg-[#ea580c] text-white shadow-sm" 
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="w-full md:w-80">
              <input 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="SEARCH EVENTS..."
                className="w-full bg-[#151515] border-2 border-white/10 rounded-none px-4 py-3 text-sm font-bold text-white placeholder:text-gray-600 focus:outline-none focus:border-[#ea580c] uppercase tracking-wide transition-colors" 
              />
            </div>
          </div>

          {/* Tags Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-black text-[#ea580c] uppercase tracking-widest mr-2 border-r-2 border-white/10 pr-4">Filter:</span>
            {allTags.map((t) => {
              const active = activeTags.includes(t);
              return (
                <button key={t} onClick={() => toggleTag(t)} 
                  className={`px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wide border-2 transition-all ${
                    active 
                      ? "bg-white border-white text-black" 
                      : "bg-transparent border-white/20 text-gray-400 hover:border-white hover:text-white"
                  }`}
                >
                  {t}
                </button>
              );
            })}
            {activeTags.length > 0 && (
              <button onClick={() => setActiveTags([])} className="ml-auto text-[10px] font-bold text-red-500 hover:text-red-400 uppercase tracking-wider border-b border-red-500/50 hover:border-red-400 pb-0.5 transition-colors">
                Clear All
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 md:px-8 pb-24">
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((e) => (
              <motion.article 
                layout key={e.id} 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }} transition={{ duration: 0.3 }}
                onClick={() => onEventClick && onEventClick(e)}
                className="group cursor-pointer flex flex-col h-full bg-[#121212] border border-white/10 rounded-xl overflow-hidden hover:shadow-[8px_8px_0px_0px_#ea580c] hover:border-white/30 transition-all duration-300"
              >
                {/* Image Area */}
                <div className="relative h-52 w-full overflow-hidden border-b border-white/10 bg-black">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" style={{ backgroundImage: `url(${resolveEventImage(e)})` }} />
                  
                  {/* Date Badge (Industrial) */}
                  <div className="absolute top-4 left-4 bg-white text-black px-3 py-2 text-center shadow-[4px_4px_0px_0px_black]">
                    <span className="block text-[10px] font-black uppercase tracking-tighter leading-none mb-0.5">{format(new Date(e.startISO), "MMM")}</span>
                    <span className="block text-xl font-black leading-none">{format(new Date(e.startISO), "dd")}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {e.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-[9px] font-bold uppercase tracking-widest text-white/60 bg-white/5 border border-white/10 px-2 py-1 rounded-sm">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black text-white uppercase leading-tight mb-4 group-hover:text-[#ea580c] transition-colors line-clamp-2">
                    {e.title}
                  </h3>

                  {/* Meta Info */}
                  <div className="mt-auto space-y-3 text-xs font-bold text-gray-400 uppercase tracking-wide">
                    <div className="flex items-center gap-3 border-t border-white/5 pt-3">
                       <FiClock className="text-[#ea580c] w-4 h-4" />
                       <span>{formatDT(e.startISO)}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <FiMapPin className="text-[#ea580c] w-4 h-4" />
                       <span className="truncate">{e.location}</span>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="mt-6 pt-4 border-t-2 border-white/5 flex gap-3" onClick={stopPropagation}>
                      <a 
                        href={googleCalLink(e)} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center gap-2 text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
                      >
                        <FiCalendar className="w-3 h-3" /> Add to Cal
                      </a>
                      
                      {e.rsvpUrl && (
                        <Link 
                          href={e.rsvpUrl} 
                          className="ml-auto text-[10px] font-black text-[#ea580c] hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1"
                        >
                          RSVP Now →
                        </Link>
                      )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-24 border-2 border-dashed border-white/10 rounded-xl mx-auto max-w-2xl">
             <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No events match your filters.</p>
             <button onClick={() => { setQuery(""); setActiveTags([]); setTab("All"); }} className="mt-4 text-[#ea580c] text-xs font-bold underline underline-offset-4">
               Reset All Filters
             </button>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="mt-16 flex justify-center">
            <button 
              onClick={() => setVisibleCount((prev) => prev + 6)} 
              className="group px-8 py-3 rounded-full bg-white text-black text-sm font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_#ea580c] hover:-translate-y-1 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#ea580c] transition-all"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </>
  );
}