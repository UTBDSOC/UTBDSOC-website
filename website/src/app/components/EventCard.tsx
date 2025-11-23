"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useSpring, useMotionTemplate } from "framer-motion";

/* ---------- TYPES ---------- */
export type EventStatus =
  | "UPCOMING"
  | "LIMITED"
  | "SOLD_OUT"
  | "CANCELLED"
  | "LIVE"
  | "ENDED";

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
  layout?: "image-left" | "image-right" | "featured";
  featured?: boolean;
  capacityUsed?: number;
  capacityTotal?: number;
  enableShare?: boolean;
  enableDirections?: boolean;
  enableSeoJsonLd?: boolean;
}

/* ---------- UTILS ---------- */
function getMonthAndDay(iso: string) {
  const d = new Date(iso);
  return {
    month: d.toLocaleString("en-AU", { month: "short" }).toUpperCase(),
    day: d.getDate(),
  };
}

function formatTimeRange(startISO: string, endISO?: string) {
  const start = new Date(startISO);
  const end = endISO ? new Date(endISO) : undefined;
  const opts: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Australia/Sydney",
  };
  const fmt = new Intl.DateTimeFormat("en-AU", opts);
  if (end) return `${fmt.format(start)} – ${fmt.format(end)}`;
  return fmt.format(start);
}

function useCountdown(targetISO: string) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const target = useMemo(() => new Date(targetISO), [targetISO]);
  if (!now) return { days: 0, hours: 0, minutes: 0, seconds: 0, past: false, pending: true } as const;
  const diff = target.getTime() - now.getTime();
  const past = diff <= 0;
  const total = Math.max(diff, 0);
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
    past,
    pending: false,
  } as const;
}

function makeICS({
  title,
  description,
  location,
  startISO,
  endISO,
}: {
  title: string;
  description: string;
  location: string;
  startISO: string;
  endISO?: string;
}) {
  const uid = `${crypto.randomUUID()}@utsbdsoc`;
  const dtStart = new Date(startISO);
  const dtEnd = endISO
    ? new Date(endISO)
    : new Date(dtStart.getTime() + 2 * 60 * 60 * 1000);

  const toICS = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//UTSBDSOC//Event//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toICS(new Date())}`,
    `DTSTART:${toICS(dtStart)}`,
    `DTEND:${toICS(dtEnd)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, "\\n")}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  return URL.createObjectURL(blob);
}

/* ---------- ICONS ---------- */
const Icons = {
  MapPin: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Clock: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Share: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
      <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
    </svg>
  ),
  CalendarPlus: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
      <line x1="12" y1="14" x2="12" y2="18"></line>
      <line x1="10" y1="16" x2="14" y2="16"></line>
    </svg>
  )
};

/* ---------- STATUS STYLES ---------- */
const statusConfig: Record<EventStatus, { text: string; color: string }> = {
  UPCOMING: { text: "UPCOMING", color: "bg-[#1e40af] text-white border-[#1e3a8a]" },
  LIMITED: { text: "LIMITED SPOTS", color: "bg-[#b45309] text-white border-[#92400e]" },
  LIVE: { text: "LIVE NOW", color: "bg-[#047857] text-white border-[#065f46]" },
  SOLD_OUT: { text: "SOLD OUT", color: "bg-[#374151] text-gray-300 border-[#1f2937]" },
  CANCELLED: { text: "CANCELLED", color: "bg-[#991b1b] text-white border-[#7f1d1d]" },
  ENDED: { text: "ENDED", color: "bg-[#262626] text-white/40 border-[#171717]" },
};

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
  cardBgClassName,
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
  const cardRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const cd = useCountdown(startISO);

  // Tilt Logic
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  const isFeaturedLayout = featured || layout === "featured";
  const isReversed = layout === "image-left";

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (isFeaturedLayout || !hoverTilt || prefersReducedMotion) return;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }
  
  function onMouseLeave() {
    if (isFeaturedLayout || !hoverTilt || prefersReducedMotion) return;
    mouseX.set(0);
    mouseY.set(0);
  }

  const transform = useMotionTemplate`perspective(1000px) rotateX(${useSpring(useMotionTemplate`${mouseY} / -20`)}deg) rotateY(${useSpring(useMotionTemplate`${mouseX} / 20`)}deg)`;

  useEffect(() => {
    if (!icsUrl) setIcsUrl(makeICS({ title, description, location, startISO, endISO }));
    return () => { if (icsUrl) URL.revokeObjectURL(icsUrl); };
  }, []);

  const { month, day } = getMonthAndDay(startISO);
  const limitedPct = status === "LIMITED" && capacityUsed != null && capacityTotal ? Math.max(0, Math.min(100, Math.round((capacityUsed / capacityTotal) * 100))) : null;
  const computedStatus: EventStatus = status ?? (!cd.past ? "UPCOMING" : (endISO && new Date() > new Date(endISO) ? "ENDED" : "LIVE"));
  
  // Variants
  const containerVar = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } } };
  const itemVar = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

  const wrapperClasses = isFeaturedLayout
    ? "w-full max-w-7xl p-0 border-b-2 border-[#ea580c] pb-12 mb-12 bg-transparent shadow-none"
    : `group relative mx-auto w-full max-w-5xl rounded-2xl border border-white/10 bg-[#121212] 
       transition-all duration-300 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#ea580c] hover:border-white/30
       ${cardBgClassName || ""}`;

  const innerClasses = isFeaturedLayout
    ? "relative lg:grid lg:grid-cols-12 lg:gap-16 lg:items-start"
    : `relative flex flex-col gap-6 overflow-hidden p-6 md:p-8 ${isReversed ? "md:flex-row-reverse" : "md:flex-row"}`;

  return (
    <motion.article
      ref={cardRef}
      initial="hidden"
      whileInView="show"
      viewport={{ amount: 0.2, once: true }}
      variants={containerVar}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={!isFeaturedLayout && hoverTilt && !prefersReducedMotion ? { transform, transformStyle: "preserve-3d" } : undefined}
      className={`text-white transition-all duration-500 ${wrapperClasses}`}
      itemScope
      itemType="https://schema.org/Event"
    >
      {!isFeaturedLayout && (
        <div className="absolute inset-0 rounded-3xl opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
      )}

      <div className={innerClasses}>
        
        {/* LEFT COLUMN (Text) */}
        <div className={`
          flex flex-col justify-between gap-6
          ${isFeaturedLayout ? "lg:col-span-7 lg:order-1 lg:py-4" : "flex-1"}
        `}>
          
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              
              {isFeaturedLayout && (
                <div className="flex items-center gap-3">
                   <span className="bg-[#ea580c] text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-sm shadow-[2px_2px_0px_0px_white]">
                     Featured Event
                   </span>
                   <span className={`px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wide border ${statusConfig[computedStatus].color}`}>
                      {statusConfig[computedStatus].text}
                   </span>
                </div>
              )}

              {!isFeaturedLayout && (
                 <motion.div 
                  variants={itemVar}
                  className="flex flex-col items-center justify-center rounded-lg bg-[#ea580c] px-3 py-2 text-center min-w-[60px] shadow-sm text-black" 
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">{month}</span>
                  <span className="text-2xl font-black leading-none">{day}</span>
                </motion.div>
              )}

              {!isFeaturedLayout && (
                <motion.div variants={itemVar} className="flex flex-wrap justify-end gap-2 ml-auto">
                   <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${statusConfig[computedStatus].color}`}>
                      {statusConfig[computedStatus].text}
                   </span>
                </motion.div>
              )}
            </div>

            <motion.div variants={itemVar}>
              <h2 className={`font-black tracking-tighter text-white mb-4 group-hover:text-[#ea580c] transition-colors ${isFeaturedLayout ? "text-3xl md:text-5xl leading-[0.9] drop-shadow-lg" : "text-2xl md:text-3xl"}`} itemProp="name">
                {title}
              </h2>
              
              {isFeaturedLayout && (
                <div className="flex flex-col gap-2 mb-6 pl-1 border-l-4 border-[#ea580c]">
                  <div className="flex items-center gap-3 text-[#ea580c] font-bold text-lg uppercase tracking-widest">
                     <span>{month} {day}</span>
                     <span className="text-white/20">|</span>
                     <span className="text-white">{formatTimeRange(startISO, endISO)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 font-medium text-sm uppercase tracking-wide">
                     <Icons.MapPin className="w-4 h-4" />
                     {locationUrl ? (
                       <a href={locationUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-white/20 underline-offset-4">{location}</a>
                     ) : (
                       <span>{location}</span>
                     )}
                  </div>
                </div>
              )}

              {!isFeaturedLayout && (
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-gray-400 mb-5 font-bold uppercase tracking-wide">
                  <div className="flex items-center gap-2">
                     <Icons.Clock className="w-4 h-4 text-[#ea580c]" />
                     <span>{formatTimeRange(startISO, endISO)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Icons.MapPin className="w-4 h-4 text-[#ea580c]" />
                     <span>{location}</span>
                  </div>
                </div>
              )}

              <p className={`leading-relaxed text-gray-300 ${isFeaturedLayout ? "text-xl font-medium max-w-2xl" : "text-base line-clamp-3"}`}>
                {description}
              </p>
            </motion.div>
          </div>

          {tags.length > 0 && !isFeaturedLayout && (
            <motion.div variants={itemVar} className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-gray-400 border border-white/10 bg-[#1a1a1a]">
                  {tag}
                </span>
              ))}
            </motion.div>
          )}

          <motion.div variants={itemVar} className={`space-y-8 pt-6 ${!isFeaturedLayout ? "border-t border-white/5" : ""}`}>
            
            {/* Countdown */}
            {!cd.past && !(cd as any).pending ? (
               <div className={`flex gap-px overflow-hidden rounded-sm border-2 border-white/10 bg-black/50 ${isFeaturedLayout ? "py-3 max-w-md" : ""}`} suppressHydrationWarning>
                 {['days', 'hours', 'minutes', 'seconds'].map((unit, i) => (
                   <div key={unit} className={`flex-1 flex flex-col items-center justify-center py-2 ${i !== 0 && 'border-l border-white/10'}`}>
                      <span className={`font-mono font-black text-white ${isFeaturedLayout ? "text-3xl" : "text-lg"}`}>
                        {String((cd as any)[unit]).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] uppercase font-bold tracking-widest text-white/40">{unit.substr(0,1)}</span>
                   </div>
                 ))}
               </div>
            ) : null}

            <div className="flex flex-wrap items-center gap-5">
              <Link
                href={buttonLink}
                className={`group/btn inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-black uppercase tracking-wide transition-transform hover:-translate-y-1 shadow-[4px_4px_0px_0px_#ea580c] active:translate-y-0 active:shadow-[2px_2px_0px_0px_#ea580c] ${isFeaturedLayout ? "px-12 py-4 text-lg border-2 border-white" : "px-8 py-3 text-sm"}`}
              >
                <span>{buttonText}</span>
                <svg className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </Link>

              {/* RESTORED CALENDAR BUTTON */}
              {icsUrl && (
                <a 
                  href={icsUrl} 
                  download="event.ics" 
                  className={`rounded-full border-2 border-[#333] text-gray-400 hover:border-white hover:text-white hover:bg-white/5 transition-colors ${isFeaturedLayout ? "p-4" : "p-3"}`} 
                  title="Add to Calendar"
                >
                   <Icons.CalendarPlus className="w-5 h-5" />
                </a>
              )}

              {enableShare && (
                <button 
                  onClick={() => {
                    if (navigator.share) navigator.share({ title, text: description, url: buttonLink });
                    else navigator.clipboard.writeText(buttonLink);
                  }}
                  className={`rounded-full border-2 border-[#333] text-gray-400 hover:border-white hover:text-white hover:bg-white/5 transition-colors ${isFeaturedLayout ? "p-4" : "p-3"}`}
                  title="Share"
                >
                   <Icons.Share className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN (Image) */}
        <div className={`
          shrink-0 relative
          ${isFeaturedLayout ? "lg:col-span-5 lg:order-2 h-full min-h-[400px]" : "md:w-[40%]"}
        `}>
           <motion.div 
             className={`
               relative w-full h-full overflow-hidden
               ${isFeaturedLayout ? "rounded-2xl shadow-[8px_8px_0px_0px_#333] border-2 border-white/10" : "rounded-xl border-b border-white/10"}
               ${isFeaturedLayout ? "aspect-[3/4] lg:aspect-auto" : "aspect-[4/5] md:aspect-[4/4]"}
             `}
             variants={itemVar}
           >
             {!imgError ? (
               <Image
                 src={imageUrl}
                 alt={title}
                 fill
                 className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                 onError={() => setImgError(true)}
               />
             ) : (
               <div className="flex h-full w-full items-center justify-center bg-[#1a1a1a] text-white/20 font-bold text-4xl">
                 {title.slice(0, 2).toUpperCase()}
               </div>
             )}
             <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.4)] pointer-events-none" />
           </motion.div>
        </div>

      </div>
      
      {enableSeoJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: title,
              startDate: startISO,
              endDate: endISO,
              eventStatus: computedStatus === "CANCELLED" ? "https://schema.org/EventCancelled" : undefined,
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