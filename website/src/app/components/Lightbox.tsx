"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

export type LightboxItem = {
  src: string;
  alt: string;
  event: string;
  year: number;
  w: number;
  h: number;
};

export interface LightboxProps {
  items: LightboxItem[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ items, index, onClose, onNext, onPrev }: LightboxProps) {
  const item = items[index];
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const touch = useRef({ startX: 0, startY: 0, dx: 0, dy: 0 });

  useEffect(() => {
    dialogRef.current?.querySelector<HTMLButtonElement>("button[data-close]")?.focus();
  }, []);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    touch.current = { startX: t.clientX, startY: t.clientY, dx: 0, dy: 0 };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const t = e.changedTouches[0];
    touch.current.dx = t.clientX - touch.current.startX;
    touch.current.dy = t.clientY - touch.current.startY;
  };
  const onTouchEnd = () => {
    const { dx, dy } = touch.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) onNext();
      else onPrev();
    }
  };

  const downloadName = item.src.split("/").pop() || "image.jpg";
  const countLabel = `${index + 1} / ${items.length}`;

  return (
    <div
      role="dialog"
      aria-modal
      aria-label={`${item.event} • ${item.year} – ${countLabel}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      ref={dialogRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="relative w-full max-w-5xl max-h-[88vh] bg-[#0b0f14] rounded-2xl border border-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 bg-[#0e141b] border-b border-white/10">
          <div className="min-w-0 flex-1">
            <div className="text-white/90 text-sm md:text-base truncate">
              <strong className="text-white">{item.event}</strong> • {item.year}
            </div>
            <div className="text-white/60 text-xs truncate">{item.alt}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-white/60 text-xs mr-2">{countLabel}</span>
            <a
              href={item.src}
              download={downloadName}
              className="rounded-full px-3 py-1.5 text-sm bg-white/10 hover:bg-white/15 text-white focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]"
            >
              Download
            </a>
            <button
              onClick={onClose}
              data-close
              className="rounded-full px-3 py-1.5 text-sm bg-white/10 hover:bg-white/15 text-white focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]"
            >
              Close
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative flex items-center justify-center p-4">
          <Image
            src={item.src}
            alt={item.alt}
            width={item.w}
            height={item.h}
            className="max-h-[60vh] md:max-h-[68vh] w-auto h-auto object-contain"
            priority
          />

          {/* Prev / Next controls */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 pointer-events-none">
            <button
              onClick={onPrev}
              aria-label="Previous"
              className="pointer-events-auto rounded-full bg-white/10 hover:bg-white/15 p-3 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]"
            >
              ◀
            </button>
            <button
              onClick={onNext}
              aria-label="Next"
              className="pointer-events-auto rounded-full bg-white/10 hover:bg-white/15 p-3 backdrop-blur focus:outline-none focus:ring-2 focus:ring-[#ff7a1a]"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="px-3 pb-3 border-t border-white/10 bg-[#0b0f14]/80">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {items.map((thumb, i) => (
              <button
                key={thumb.src}
                onClick={() => {
                  if (i < index) onPrev();
                  if (i > index) onNext();
                }}
                className={`relative h-16 w-24 flex-shrink-0 rounded-lg overflow-hidden border ${i === index ? "border-[#ff7a1a]" : "border-white/10"}`}
                aria-label={`Go to ${i + 1}`}
              >
                <Image src={thumb.src} alt={thumb.alt} fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
