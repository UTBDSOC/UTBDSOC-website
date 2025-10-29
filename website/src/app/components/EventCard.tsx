"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type EventStatus = "UPCOMING" | "LIMITED" | "SOLD_OUT" | "CANCELLED" | "LIVE" | "ENDED";

export interface EventCardProps {
  title: string;
  tags?: string[];
  description: string;
  imageUrl: string;
  startISO: string;
  endISO?: string;
  location: string;
  locationUrl?: string;
  status?: EventStatus;
  buttonText: string;
  buttonLink: string;
  hoverTilt?: boolean;
  cardBgClassName?: string;
  layout?: "image-left" | "image-right" | "vertical";
  featured?: boolean;
  capacityUsed?: number;
  capacityTotal?: number;
  enableShare?: boolean;
  enableDirections?: boolean;
  enableSeoJsonLd?: boolean;
}

/* ---------- utils (unchanged) ---------- */
function formatDateRange(startISO: string, endISO?: string) {
  const start = new Date(startISO);
  const end = endISO ? new Date(endISO) : undefined;
  const optsDate: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "Australia/Sydney" };
  const optsTime: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit", timeZone: "Australia/Sydney" };
  const dateFmt = new Intl.DateTimeFormat("en-AU", optsDate);
  const timeFmt = new Intl.DateTimeFormat("en-AU", optsTime);
  if (end && start.toDateString() === end.toDateString()) return `${dateFmt.format(start)} • ${timeFmt.format(start)}–${timeFmt.format(end)}`;
  if (end) return `${dateFmt.format(start)} ${timeFmt.format(start)} → ${dateFmt.format(end)} ${timeFmt.format(end)}`;
  return `${dateFmt.format(start)} • ${timeFmt.format(start)}`;
}

function useCountdown(targetISO: string) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const target = useMemo(() => new Date(targetISO), [targetISO]);
  const diff = target.getTime() - now.getTime();
  const past = diff <= 0;
  const total = Math.max(diff, 0);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { days, hours, minutes, seconds, past };
}

function makeICS({ title, description, location, startISO, endISO }: { title: string; description: string; location: string; startISO: string; endISO?: string; }) {
  const uid = `${crypto.randomUUID()}@utsbdsoc`;
  const dtStart = new Date(startISO);
  const dtEnd = endISO ? new Date(endISO) : new Date(dtStart.getTime() + 2 * 60 * 60 * 1000);
  const toICS = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const ics = [
    "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//UTSBDSOC//Event//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH","BEGIN:VEVENT",
    `UID:${uid}`,`DTSTAMP:${toICS(new Date())}`,`DTSTART:${toICS(dtStart)}`,`DTEND:${toICS(dtEnd)}`,
    `SUMMARY:${title}`,`DESCRIPTION:${description.replace(/\n/g, "\\n")}`,`LOCATION:${location}`,
    "END:VEVENT","END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  return URL.createObjectURL(blob);
}

/** ---------- STATUS CHIPS tuned for orange background ---------- */
const statusChip: Record<EventStatus, string> = {
  UPCOMING:  "text-white border-white/20 bg-white/10",
  LIMITED:   "text-white border-white/20 bg-white/12",
  LIVE:      "text-black border-transparent bg-white",
  SOLD_OUT:  "text-white/85 border-white/16 bg-black/15",
  CANCELLED: "text-white/85 border-white/16 bg-black/20",
  ENDED:     "text-white/80 border-white/16 bg-black/12",
};

/* ---------- component (only colors changed) ---------- */
const EventCard: React.FC<EventCardProps> = ({
  title,
  tags = [],
  description,
  imageUrl,
  startISO,
  endISO,
  location,
  locationUrl,
  status,
  buttonText,
  buttonLink,
  hoverTilt = true,

  // ORANGE BACKGROUND by default
  cardBgClassName = "bg-[linear-gradient(135deg,#f57c00_0%,#d96812_100%)]",

  layout = "image-right",
  featured = false,
  capacityUsed,
  capacityTotal,
  enableShare = true,
  enableDirections = true,
  enableSeoJsonLd = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [icsUrl, setIcsUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const cd = useCountdown(startISO);

  useEffect(() => setMounted(true), []);

  const derivedStatus: EventStatus = useMemo(() => {
    if (status === "SOLD_OUT" || status === "CANCELLED") return status;
    if (!cd.past) return "UPCOMING";
    const ended = endISO ? new Date() > new Date(endISO) : false;
    return ended ? "ENDED" : "LIVE";
  }, [status, cd.past, endISO]);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setIsVisible(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!icsUrl) setIcsUrl(makeICS({ title, description, location, startISO, endISO }));
    return () => { if (icsUrl) URL.revokeObjectURL(icsUrl); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderLocation = () => {
    const base = "underline decoration-dotted underline-offset-4 hover:opacity-90";
    if (!locationUrl) return <span itemProp="name">{location}</span>;
    if (locationUrl.startsWith("/")) return <Link href={locationUrl} className={base} itemProp="url"><span itemProp="name">{location}</span></Link>;
    return <a href={locationUrl} target="_blank" rel="noopener noreferrer" className={base} itemProp="url"><span itemProp="name">{location}</span></a>;
  };

  const limitedPct =
    status === "LIMITED" && capacityUsed != null && capacityTotal
      ? Math.max(0, Math.min(100, Math.round((capacityUsed / capacityTotal) * 100)))
      : null;

  const isImageLeft = layout === "image-left";
  const mediaOrder = isImageLeft ? "md:order-1" : "md:order-2";
  const textOrder = isImageLeft ? "md:order-2" : "md:order-1";

  const onShare = async () => {
    try {
      const shareData = { title, text: description, url: buttonLink };
      if (navigator.share) await navigator.share(shareData);
      else { await navigator.clipboard.writeText(buttonLink); alert("Link copied!"); }
    } catch {}
  };

  const isMaps = !!locationUrl && (locationUrl.includes("google.com/maps") || locationUrl.includes("maps.apple.com"));
  const statusForChip = status ?? derivedStatus;

  return (
    <article
      ref={cardRef}
      className={[
        "relative mx-auto max-w-5xl group",
        "rounded-2xl border border-white/18",              // lighter border on orange
        cardBgClassName,
        featured ? "p-8 md:p-12" : "p-6 md:p-8",
        "text-white",                                      // white text on orange
        "shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
        "transition-all duration-700 will-change-transform",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        hoverTilt ? "transform-gpu hover:-rotate-[0.25deg] hover:scale-[1.01]" : "",
      ].join(" ")}
      itemScope
      itemType="https://schema.org/Event"
    >
      {/* Hover sheen stays (white glint over orange) */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/10 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/16" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-stretch md:space-x-8 space-y-6 md:space-y-0">
        {/* TEXT */}
        <div className={`flex-1 space-y-5 ${textOrder}`}>
          <header className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" itemProp="name">
              {title}
            </h2>

            {!cd.past && mounted && (
              <div className="text-xs text-white/90" suppressHydrationWarning>
                Starts in {cd.days}d {cd.hours}h {cd.minutes}m {cd.seconds}s
              </div>
            )}

            <p className="text-sm text-white/90" itemProp="startDate" content={startISO}>
              {formatDateRange(startISO, endISO)}
            </p>

            <p className="text-sm text-white/90" itemProp="location" itemScope itemType="https://schema.org/Place">
              {renderLocation()}
            </p>

            {limitedPct !== null && (
              <div className="flex items-center gap-2 text-xs text-white/90">
                <div className="h-2 w-32 rounded-full bg-white/25 border border-white/30 overflow-hidden">
                  <div className="h-full bg-white" style={{ width: `${limitedPct}%` }} />
                </div>
                <span>{limitedPct}% full</span>
              </div>
            )}
          </header>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2.5">
              {tags.map((tag, i) => (
                <span
                  key={`${tag}-${i}`}
                  className="inline-flex items-center rounded-full border border-white/28 bg-white/10 px-3 py-1 text-xs font-medium hover:bg-white/15 transition-colors"
                >
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="leading-relaxed text-white/95" itemProp="description">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            {/* Primary action switches to dark accent for contrast on orange */}
            <Link
              href={buttonLink}
              className={[
                "relative inline-flex items-center justify-center overflow-hidden rounded-full",
                "border border-transparent px-5 py-2.5 text-sm font-semibold",
                "bg-[#0d131b] text-white",
                "transition-all hover:shadow-[0_0_24px_rgba(0,0,0,0.45)] hover:brightness-110",
                status === "SOLD_OUT" || status === "CANCELLED" ? "pointer-events-none opacity-60" : "",
              ].join(" ")}
              aria-disabled={status === "SOLD_OUT" || status === "CANCELLED"}
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-full" />
              <span className="relative flex items-center">
                {buttonText}
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {icsUrl && (
              <a
                download={`${title.replace(/\s+/g, "_")}.ics`}
                href={icsUrl}
                className="inline-flex items-center rounded-full border border-white/28 bg-white/10 px-4 py-2 text-xs font-semibold hover:bg-white/15 transition-colors"
              >
                Add to Calendar
              </a>
            )}

            {enableDirections && isMaps && locationUrl && (
              <a
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/28 bg-white/10 px-4 py-2 text-xs font-semibold hover:bg-white/15 transition-colors"
              >
                Directions
              </a>
            )}

            {enableShare && (
              <button
                onClick={onShare}
                className="inline-flex items-center rounded-full border border-white/28 bg-white/10 px-4 py-2 text-xs font-semibold hover:bg-white/15 transition-colors"
              >
                Share
              </button>
            )}
          </div>
        </div>

        {/* IMAGE + status ribbon (kept as-is; border tone for orange) */}
        <div className={`md:w-1/2 ${mediaOrder}`}>
          <div className="relative overflow-hidden rounded-xl border border-white/22 bg-[#101820]">
            <div className="absolute left-3 top-3 z-10">
              <span className={["inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide", statusChip[statusForChip]].join(" ")}>
                {statusForChip.replace("_", " ")}
              </span>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/18" />

            <div className="aspect-[16/9] w-full">
              {!imgError ? (
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
                  priority={false}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/35">
                  <span className="text-3xl font-bold text-white">
                    {title.split(" ").slice(0, 2).map((s) => s[0]).join("").toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* dotted corner accent in white for orange bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 opacity-35"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.28) 1px, transparent 1px)", backgroundSize: "8px 8px" }}
      />

      {enableSeoJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: title,
              startDate: startISO,
              endDate: endISO ?? undefined,
              eventStatus:
                (status ?? derivedStatus) === "CANCELLED" ? "https://schema.org/EventCancelled" :
                (status ?? derivedStatus) === "ENDED" ? "https://schema.org/EventCompleted" : undefined,
              location: { "@type": "Place", name: location, url: locationUrl },
              image: imageUrl,
              description,
              url: buttonLink,
            }),
          }}
        />
      )}
    </article>
  );
};

export default EventCard;
