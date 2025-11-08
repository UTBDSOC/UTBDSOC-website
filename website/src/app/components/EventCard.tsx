"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

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

/* ---------- utils ---------- */
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

/** ---------- STATUS CHIPS tuned for dark card ---------- */
const statusChip: Record<EventStatus, string> = {
  UPCOMING:  "text-white border-white/15 bg-white/10",
  LIMITED:   "text-amber-200 border-amber-200/20 bg-amber-200/10",
  LIVE:      "text-emerald-200 border-emerald-200/20 bg-emerald-200/10",
  SOLD_OUT:  "text-white/85 border-white/12 bg-white/5",
  CANCELLED: "text-red-200 border-red-200/20 bg-red-200/10",
  ENDED:     "text-white/70 border-white/10 bg-white/5",
};

/* ---------- component (orange → dark flow + animations) ---------- */
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
  // warm/orange-tinted top -> deep dark
  cardBgClassName = "bg-[linear-gradient(180deg,#2a1709_0%,#171b21_35%,#0f1319_70%,#0b0f14_100%)]",
  layout = "image-right",
  featured = false,
  capacityUsed,
  capacityTotal,
  enableShare = true,
  enableDirections = true,
  enableSeoJsonLd = true,
}) => {
  const [icsUrl, setIcsUrl] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, s: 1 });
  const cardRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const cd = useCountdown(startISO);

  // mobile / coarse pointer = disable tilt
  const [canTilt, setCanTilt] = useState(false);
  useEffect(() => {
    const coarse = window.matchMedia?.("(pointer: coarse)").matches;
    setCanTilt(!coarse && hoverTilt);
  }, [hoverTilt]);

  useEffect(() => {
    if (!icsUrl) setIcsUrl(makeICS({ title, description, location, startISO, endISO }));
    return () => { if (icsUrl) URL.revokeObjectURL(icsUrl); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // desktop tilt
  useEffect(() => {
    const node = cardRef.current;
    if (!node || !canTilt) return;
    const handle = (e: MouseEvent) => {
      const r = node.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      setTilt({
        rx: py * -6, // rotateX
        ry: px * 6,  // rotateY
        s: 1.005,
      });
    };
    const leave = () => setTilt({ rx: 0, ry: 0, s: 1 });
    node.addEventListener("mousemove", handle);
    node.addEventListener("mouseleave", leave);
    return () => {
      node.removeEventListener("mousemove", handle);
      node.removeEventListener("mouseleave", leave);
    };
  }, [canTilt]);

  const limitedPct =
    status === "LIMITED" && capacityUsed != null && capacityTotal
      ? Math.max(0, Math.min(100, Math.round((capacityUsed / capacityTotal) * 100)))
      : null;

  const isImageLeft = layout === "image-left";
  const mediaOrder = isImageLeft ? "md:order-1" : "md:order-2";
  const textOrder = isImageLeft ? "md:order-2" : "md:order-1";
  const statusForChip: EventStatus = status ?? (!cd.past ? "UPCOMING" : endISO && new Date() > new Date(endISO) ? "ENDED" : "LIVE");

  /* --------- framer motion variants --------- */
  const spring = { type: "spring", stiffness: 120, damping: 18, mass: 0.6 };
  const fadeUp: any = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: prefersReducedMotion ? ({ duration: 0.2 } as any) : ({ ...spring } as any) },
  };
  const fade: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: prefersReducedMotion ? ({ duration: 0.2 } as any) : ({ duration: 0.5 } as any) },
  };
  const stagger: any = prefersReducedMotion ? {} : { staggerChildren: 0.06, delayChildren: 0.05 };

  return (
    <motion.article
      ref={cardRef}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.15, once: true }}
      variants={fadeUp}
      className={[
        "relative mx-auto max-w-5xl group will-change-transform",
        "rounded-2xl border border-white/10",
        cardBgClassName,
        featured ? "p-8 md:p-12" : "p-6 md:p-8",
        "text-white",
        "shadow-[0_10px_30px_rgba(0,0,0,0.45)]",
      ].join(" ")}
      style={canTilt ? { transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.s})`, transition: "transform 120ms ease-out" } : undefined}
      itemScope
      itemType="https://schema.org/Event"
    >
      {/* Orange halo at the very top */}
      <div className="pointer-events-none absolute inset-x-0 -top-1 h-10 rounded-t-2xl bg-gradient-to-b from-[#f57c00]/22 via-transparent to-transparent" />

      {/* Subtle ring + faint orange edge glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 [box-shadow:0_0_0_1px_rgba(255,122,26,0.06),0_20px_60px_rgba(0,0,0,0.35)]" />

      <motion.div
        className="relative z-10 flex flex-col md:flex-row md:items-stretch md:space-x-8 space-y-6 md:space-y-0"
        variants={stagger as any}
      >
        {/* TEXT */}
        <motion.div className={`flex-1 space-y-5 ${textOrder}`} variants={fadeUp}>
          <header className="space-y-3">
            <motion.h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" itemProp="name" variants={fade}>
              {title}
            </motion.h2>

            {!cd.past && (
              <motion.div className="text-xs text-white/80" suppressHydrationWarning variants={fade}>
                Starts in {cd.days}d {cd.hours}h {cd.minutes}m {cd.seconds}s
              </motion.div>
            )}

            <motion.p className="text-sm text-white/85" itemProp="startDate" content={startISO} variants={fade}>
              {formatDateRange(startISO, endISO)}
            </motion.p>

            <motion.p className="text-sm text-white/85" itemProp="location" itemScope itemType="https://schema.org/Place" variants={fade}>
              {(() => {
                const base = "underline decoration-dotted underline-offset-4 hover:opacity-90";
                if (!locationUrl) return <span itemProp="name">{location}</span>;
                if (locationUrl.startsWith("/")) return <Link href={locationUrl} className={base} itemProp="url"><span itemProp="name">{location}</span></Link>;
                return <a href={locationUrl} target="_blank" rel="noopener noreferrer" className={base} itemProp="url"><span itemProp="name">{location}</span></a>;
              })()}
            </motion.p>

            {limitedPct !== null && (
              <motion.div className="flex items-center gap-2 text-xs text-white/85" variants={fade}>
                <div className="h-2 w-32 rounded-full bg-white/10 border border-white/15 overflow-hidden">
                  <div className="h-full bg-white" style={{ width: `${limitedPct}%` }} />
                </div>
                <span>{limitedPct}% full</span>
              </motion.div>
            )}
          </header>

          {tags.length > 0 && (
            <motion.div className="flex flex-wrap gap-2.5" variants={fade}>
              {tags.map((tag, i) => (
                <motion.span
                  key={`${tag}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={prefersReducedMotion ? { duration: 0.15 } : { duration: 0.35, delay: 0.02 * i }}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium hover:bg-white/8 transition-colors"
                >
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#ff7a1a]" />
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          )}

          <motion.p className="leading-relaxed text-white/95" itemProp="description" variants={fadeUp}>
            {description}
          </motion.p>

          <motion.div className="flex flex-wrap items-center gap-3 pt-1" variants={fade}>
            <Link
              href={buttonLink}
              className={[
                "relative inline-flex items-center justify-center overflow-hidden rounded-full",
                "border border-transparent px-5 py-2.5 text-sm font-semibold",
                "bg-[#ff7a1a] text-black",
                "transition-all hover:brightness-110 hover:shadow-[0_0_24px_rgba(255,122,26,0.45)]",
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
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold hover:bg-white/8 transition-colors"
              >
                Add to Calendar
              </a>
            )}

            {!!locationUrl && (locationUrl.includes("google.com/maps") || locationUrl.includes("maps.apple.com")) && (
              <a
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold hover:bg-white/8 transition-colors"
              >
                Directions
              </a>
            )}

            <button
              onClick={async () => {
                try {
                  const shareData = { title, text: description, url: buttonLink };
                  if (navigator.share) await navigator.share(shareData);
                  else { await navigator.clipboard.writeText(buttonLink); alert("Link copied!"); }
                } catch {}
              }}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold hover:bg-white/8 transition-colors"
            >
              Share
            </button>
          </motion.div>
        </motion.div>

        {/* IMAGE block */}
        <motion.div className={`md:w-1/2 ${mediaOrder}`} variants={fadeUp}>
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0f1319]">
            <div className="absolute left-3 top-3 z-10">
              <span className={["inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide", statusChip[statusForChip]].join(" ")}>
                {statusForChip.replace("_", " ")}
              </span>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />

            <div className="aspect-[16/9] w-full">
              {!imgError ? (
                <motion.div
                  initial={{ scale: 1.03 }}
                  whileInView={{ scale: 1 }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={prefersReducedMotion ? { duration: 0.2 } : { duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={false}
                    onError={() => setImgError(true)}
                  />
                </motion.div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-black/40">
                  <span className="text-3xl font-bold text-white">
                    {title.split(" ").slice(0, 2).map((s) => s[0]).join("").toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* subtle dotted accent in theme orange */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -bottom-6 h-24 w-24 opacity-30"
        style={{ backgroundImage: "radial-gradient(rgba(255,122,26,0.35) 1px, transparent 1px)", backgroundSize: "8px 8px" }}
      />

      {/* SEO JSON-LD */}
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
                (status ?? statusForChip) === "CANCELLED" ? "https://schema.org/EventCancelled"
                : (status ?? statusForChip) === "ENDED" ? "https://schema.org/EventCompleted"
                : undefined,
              location: { "@type": "Place", name: location, url: locationUrl },
              image: imageUrl,
              description,
              url: buttonLink,
            }),
          }}
        />
      )}
    </motion.article>
  );
};

export default EventCard;
