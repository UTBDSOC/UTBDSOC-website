import { useEffect, useState } from "react";
import { EventItem } from "./events.types";

/** Formats a date string to: "Mon, 23 Sep, 04:00 PM" */
export const formatDT = (iso: string) =>
  new Date(iso).toLocaleString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

/** Checks if an event is in the future */
export const isUpcoming = (e: EventItem) => {
  const end = e.endISO ? new Date(e.endISO) : new Date(e.startISO);
  return end.getTime() >= Date.now();
};

/** Finds the single closest upcoming event */
export function nextUpcomingEvent(items: EventItem[]) {
  const upcoming = items.filter(isUpcoming).sort(
    (a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime()
  );
  return upcoming[0] ?? null;
}

/** Generates a Google Calendar Add-to-Calendar link */
export function googleCalLink(e: EventItem) {
  const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  
  const start = formatDate(new Date(e.startISO));
  const end = e.endISO
    ? formatDate(new Date(e.endISO))
    : formatDate(new Date(new Date(e.startISO).getTime() + 2 * 60 * 60 * 1000)); // Default 2 hours

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${start}/${end}`,
    details: e.description,
    location: e.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** * Returns the image path. 
 * Updated to prioritize the explicit image set in the data. 
 */
export function resolveEventImage(e: EventItem): string {
  // 1. If the event data has a specific image (which our data does), use it.
  if (e.image) return e.image;

  // 2. Fallback logic (Optional: keep this only if you have events without images)
  const title = e.title.toLowerCase();
  const tags = (e.tags || []).map((t) => t.toLowerCase());

  if (title.includes("game") || tags.includes("games")) return "/events/GamesNight.jpg";
  if (title.includes("futsal") || tags.includes("sports")) return "/events/zuhayrsoccer-17.jpg";
  if (title.includes("eid") || title.includes("chaad")) return "/events/chaadraatutsbdsoc-176.jpg";
  if (title.includes("boishakh") || tags.includes("cultural")) return "/events/PHOTOLIA_-271.jpg";
  
  return "/events/PHOTOLIA_-125.jpg"; // Ultimate fallback
}

/** Hook: Countdown timer */
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

/** Hook: Locks body scroll when modal is open */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    const original = document.body.style.overflow;
    if (active) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [active]);
}