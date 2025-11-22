import { EventItem } from "./events.types";

/** date/time */
export const formatDT = (iso: string) =>
  new Date(iso).toLocaleString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

export const isUpcoming = (e: EventItem) => new Date(e.startISO).getTime() >= Date.now();

/** calendar link */
export function googleCalLink(e: EventItem) {
  const start = new Date(e.startISO).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const end = e.endISO
    ? new Date(e.endISO).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
    : new Date(new Date(e.startISO).getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${start}/${end}`,
    details: e.description,
    location: e.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** next upcoming */
export function nextUpcomingEvent(items: EventItem[]) {
  const upcoming = items.filter(isUpcoming).sort(
    (a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime()
  );
  return upcoming[0] ?? null;
}

/** countdown hook */
import { useEffect, useState } from "react";
export function useCountdown(targetISO?: string) {
  const [left, setLeft] = useState<{ d: number; h: number; m: number } | null>(null);
  useEffect(() => {
    if (!targetISO) return;
    const target = new Date(targetISO).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      setLeft({ d, h, m });
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [targetISO]);
  return left;
}

/** body scroll lock */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    const original = document.body.style.overflow;
    if (active) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [active]);
}

/** image resolver: prefer local /public/events assets when appropriate */
export function resolveEventImage(e: EventItem): string {
  const title = e.title.toLowerCase();
  const tags = (e.tags || []).map((t) => t.toLowerCase());

  // Keyword to local image mappings
  if (title.includes("game") || tags.includes("games")) {
    return "/events/GamesNight.jpg";
  }
  if (title.includes("futsal") || title.includes("sports") || tags.includes("sports")) {
    return "/events/zuhayrsoccer-17.jpg";
  }
  if (title.includes("eid") || title.includes("chaand") || title.includes("chaad")) {
    return "/events/chaadraatutsbdsoc-176.jpg";
  }
  if (title.includes("shonar") || title.includes("boishakh") || tags.includes("cultural")) {
    return "/events/PHOTOLIA_-271.jpg";
  }
  if (title.includes("film") || title.includes("movie")) {
    return "/events/PHOTOLIA_-181.jpg";
  }
  if (tags.includes("food")) {
    return "/events/PHOTOLIA_-196.jpg";
  }

  // Default fallback to first known local image
  return "/events/PHOTOLIA_-125.jpg";
}
