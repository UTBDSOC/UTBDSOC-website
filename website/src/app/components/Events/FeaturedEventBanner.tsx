"use client";

import Link from "next/link";
import { EventItem } from "./events.types";
import { formatDT, googleCalLink, useCountdown, resolveEventImage } from "./events.utils";

export default function FeaturedEventBanner({ event }: { event: EventItem }) {
  const left = useCountdown(event.startISO);

  return (
    <section className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10">
      <div className="absolute inset-0">
        <img src={resolveEventImage(event)} alt={event.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
      </div>

      <div className="relative z-10 px-6 py-10 md:px-10 md:py-14 text-orange-50">
        <p className="text-xs uppercase tracking-[0.2em] text-orange-300/80">Featured Event</p>
        <h3 className="mt-2 text-2xl md:text-4xl font-bold">{event.title}</h3>

        <div className="mt-3 text-orange-100/90">
          <p className="font-medium">
            {formatDT(event.startISO)}
            {event.endISO ? ` – ${formatDT(event.endISO)}` : ""}
          </p>
          <p className="opacity-90">{event.location}</p>
        </div>

        {left && (
          <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-sm">
            <span className="opacity-90">Starts in</span>
            <span className="font-semibold">{left.d}d</span>
            <span className="font-semibold">{left.h}h</span>
            <span className="font-semibold">{left.m}m</span>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {event.rsvpUrl && (
            <Link href={event.rsvpUrl} className="rounded-full px-5 py-2.5 bg-orange-500 text-black font-semibold hover:bg-orange-400">
              RSVP Now
            </Link>
          )}
          <a href={googleCalLink(event)} target="_blank" rel="noreferrer" className="rounded-full px-5 py-2.5 border border-orange-400/70 text-orange-200 hover:bg-orange-500/10">
            Add to Calendar
          </a>
        </div>
      </div>
    </section>
  );
}
