"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { EventItem, EventTag } from "./events.types";
import { formatDT, googleCalLink, isUpcoming, useBodyScrollLock, resolveEventImage } from "./events.utils";

/** estimate current grid columns */
function useGridColumns(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [cols, setCols] = useState(1);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const compute = () => {
      const first = el.querySelector("[data-event-card]") as HTMLElement | null;
      if (!first) return setCols(1);
      const rowWidth = el.clientWidth, cardWidth = first.clientWidth, gutter = 16;
      setCols(Math.max(1, Math.floor((rowWidth + gutter) / (cardWidth + gutter))));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);
  return cols;
}

/** modal */
function EventModal({ event, onClose }: { event: EventItem | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useBodyScrollLock(Boolean(event));
  useEffect(() => {
    if (!event) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [event, onClose]);
  if (!event) return null;
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="fixed inset-0 z-[80] flex items-start md:items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div onClick={stop} className="relative z-[81] w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0e1218] text-orange-50 shadow-2xl">
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
          <img src={resolveEventImage(event)} alt={event.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {event.tags.map((t) => (
              <span key={t} className="rounded-full bg-black/60 text-[10px] uppercase tracking-wide px-2 py-1 border border-white/10">{t}</span>
            ))}
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-orange-100">{event.title}</h2>
            <button ref={closeRef} onClick={onClose} className="ml-auto rounded-full border border-white/15 px-3 py-1.5 text-sm text-orange-200 hover:bg-white/10">✕</button>
          </div>
          <div className="mt-2 text-sm text-orange-200/85">
            <p><span className="font-medium">{formatDT(event.startISO)}</span>{event.endISO ? ` – ${formatDT(event.endISO)}` : ""}</p>
            <p className="mt-0.5">
              <span className="font-medium">Location:</span> {event.location}{" "}
              {event.mapUrl && <a href={event.mapUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:opacity-90">(Map)</a>}
            </p>
          </div>
          <p className="mt-4 text-orange-100/90 leading-relaxed">{event.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={googleCalLink(event)} target="_blank" rel="noreferrer" className="rounded-full px-4 py-2 text-xs font-semibold bg-orange-500 text-black hover:bg-orange-400">Add to Calendar</a>
            {event.rsvpUrl && <Link href={event.rsvpUrl} className="rounded-full px-4 py-2 text-xs font-semibold border border-orange-500 text-orange-400 hover:bg-orange-500/10">RSVP</Link>}
            {event.galleryUrl && <Link href={event.galleryUrl} className="rounded-full px-4 py-2 text-xs font-semibold border border-white/15 text-orange-200 hover:bg-white/5">Gallery</Link>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventsGrid({ items, initialVisible = 6 }: { items: EventItem[]; initialVisible?: number }) {
  const [tab, setTab] = useState<"Upcoming" | "Past" | "All">("Upcoming");
  const [activeTags, setActiveTags] = useState<EventTag[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<EventItem | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  const cols = useGridColumns(gridRef);
  const [visible, setVisible] = useState(initialVisible);

  const allTags = useMemo(() => {
    const s = new Set<EventTag>();
    items.forEach((e) => e.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [items]);

  const filtered = useMemo(() => {
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
    if (activeTags.length) list = list.filter((e) => activeTags.every((t) => e.tags.includes(t)));
    list.sort((a, b) => {
      const da = new Date(a.startISO).getTime();
      const db = new Date(b.startISO).getTime();
      return tab === "Past" ? db - da : da - db;
    });
    return list;
  }, [items, tab, activeTags, query]);

  useEffect(() => { setVisible(initialVisible); }, [tab, activeTags, query, initialVisible]);

  const visibleItems = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;
  const toggleTag = (t: EventTag) => setActiveTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <>
      {/* controls */}
      <section className="px-4 md:px-8 py-6 md:py-8">
        <div className="mx-auto max-w-6xl flex flex-col gap-4">
          <div className="flex items-center gap-2">
            {(["Upcoming", "Past", "All"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)} className={["px-4 py-2 rounded-full text-sm font-medium border transition",
                tab === t ? "bg-orange-500 text-black border-orange-500" : "border-white/15 text-orange-200 hover:bg-white/5"].join(" ")}>
                {t}
              </button>
            ))}
            <div className="ml-auto w-full sm:w-80">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events…"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 outline-none placeholder:text-orange-200/50 focus:border-orange-400" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map((t) => {
              const active = activeTags.includes(t);
              return (
                <button key={t} onClick={() => toggleTag(t)} className={["px-3 py-1.5 rounded-full text-xs font-medium border transition",
                  active ? "bg-orange-500 text-black border-orange-500" : "border-white/15 text-orange-200 hover:bg-white/5"].join(" ")}>
                  {t}
                </button>
              );
            })}
            {activeTags.length > 0 && (
              <button onClick={() => setActiveTags([])} className="px-3 py-1.5 rounded-full text-xs font-medium border border-white/15 text-orange-200/80 hover:bg-white/5">
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* grid */}
      <section className="px-4 md:px-8 pb-10 md:pb-16">
        <div ref={gridRef} className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {visibleItems.map((e) => (
            <article key={e.id} data-event-card role="button" tabIndex={0}
              onClick={() => setSelected(e)}
              onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && (ev.preventDefault(), setSelected(e))}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-orange-400/60 transition">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img src={resolveEventImage(e)} alt={e.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                  {e.tags.map((t) => (
                    <span key={t} className="rounded-full bg-black/60 text-[10px] uppercase tracking-wide px-2 py-1 border border-white/10">{t}</span>
                  ))}
                </div>
              </div>
              <div className="p-4 md:p-5 flex flex-col gap-3">
                <h3 className="text-lg md:text-xl font-semibold text-orange-100">{e.title}</h3>
                <div className="text-sm text-orange-200/80">
                  <p><span className="font-medium">{formatDT(e.startISO)}</span>{e.endISO ? ` – ${formatDT(e.endISO)}` : ""}</p>
                  <p className="truncate">{e.location}</p>
                </div>
                <p className="text-sm text-orange-100/80 line-clamp-3">{e.description}</p>
                <div className="mt-1 flex flex-wrap gap-2" onClick={stop}>
                  <a href={googleCalLink(e)} target="_blank" rel="noreferrer" className="rounded-full px-3 py-1.5 text-xs font-medium bg-orange-500 text-black hover:bg-orange-400">Add to Calendar</a>
                  {e.rsvpUrl && <Link href={e.rsvpUrl} className="rounded-full px-3 py-1.5 text-xs font-medium border border-orange-500 text-orange-400 hover:bg-orange-500/10">RSVP</Link>}
                  {e.mapUrl && <a href={e.mapUrl} target="_blank" rel="noreferrer" className="rounded-full px-3 py-1.5 text-xs font-medium border border-white/15 text-orange-200 hover:bg-white/5">Map</a>}
                  {e.galleryUrl && <Link href={e.galleryUrl} className="rounded-full px-3 py-1.5 text-xs font-medium border border-white/15 text-orange-200 hover:bg-white/5">Gallery</Link>}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && <p className="mx-auto max-w-6xl mt-10 text-orange-200/70">No events match your filters yet.</p>}

        {canLoadMore && (
          <div className="mx-auto max-w-6xl">
            <div className="mt-8 flex justify-center">
              <button onClick={() => setVisible(filtered.length)} className="rounded-full px-6 py-3 bg-white/8 border border-white/15 text-orange-100 hover:bg-white/10 hover:border-orange-400/60">
                View More
              </button>
            </div>
          </div>
        )}
      </section>

      <EventModal event={selected} onClose={() => setSelected(null)} />
    </>
  );
}
