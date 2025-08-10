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
