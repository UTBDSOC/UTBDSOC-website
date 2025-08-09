"use client";
import Image from "next/image";
import Link from "next/link";

type Highlight = {
  title: string;
  date: string;
  stats?: string;          // e.g., "220+ attendees"
  href: string;            // link to gallery / recap
  image: string;           // /public path
  tags?: string[];         // e.g., ["Cultural", "Music"]
};

const HIGHLIGHTS: Highlight[] = [
  {
    title: "Pohela Boishakh 2024",
    date: "20 Apr 2024",
    stats: "300+ attendees",
    href: "/gallery/pohela-boishakh-2024",
    image: "/images/highlights/pohela-2024.jpg",
    tags: ["Cultural", "Food", "Dance"],
  },
  {
    title: "Games Night – Trimester 1",
    date: "15 Mar 2025",
    stats: "120+ attendees",
    href: "/gallery/games-night-t1-2025",
    image: "/images/highlights/games-t1-2025.jpg",
    tags: ["Social", "Networking"],
  },
  {
    title: "Shondartara 2023",
    date: "28 Sep 2023",
    stats: "Sold Out",
    href: "/gallery/shondartara-2023",
    image: "/images/highlights/shondartara-2023.jpg",
    tags: ["Music", "Dance"],
  },
];

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-[#2f353d] bg-[#121821] px-2.5 py-1 text-[11px] font-medium text-[#8B949E]">
    {children}
  </span>
);

export default function PastHighlights() {
  return (
    <section
      className="relative border-t border-[#2a2f36] bg-gradient-to-br from-[#0b0f14] via-[#0d131b] to-[#101820]"
      aria-labelledby="past-highlights"
    >
      {/* top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#ff7a1a]/70 via-[#ffa45c]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 id="past-highlights" className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#C9D1D9]">
            Past Event Highlights
          </h2>
          <Link
            href="/gallery"
            className="rounded-full border border-[#ff7a1a] px-4 py-2 text-sm font-semibold text-[#ff7a1a] hover:bg-[#ff7a1a] hover:text-black transition"
          >
            View Full Gallery
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((h, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-[#2a2f36] bg-[#151a20] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5"
            >
              {/* subtle glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ff7a1a]/6 via-[#ffa45c]/5 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#2f353d]" />
              </div>

              {/* image */}
              <div className="relative">
                <div className="aspect-[16/9] w-full">
                  <Image
                    src={h.image}
                    alt={h.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              {/* copy */}
              <div className="relative z-10 p-5 space-y-3 text-[#C9D1D9]">
                <h3 className="text-xl font-extrabold tracking-tight">{h.title}</h3>
                <p className="text-sm text-[#9aa4af]">{h.date}{h.stats ? ` • ${h.stats}` : ""}</p>

                {h.tags && h.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {h.tags.map((t, idx) => (
                      <Chip key={idx}>{t}</Chip>
                    ))}
                  </div>
                )}

                <div className="pt-1">
                  <Link
                    href={h.href}
                    className="inline-flex items-center rounded-full border border-[#ff7a1a]/60 px-4 py-2 text-sm font-semibold text-[#ffa45c] hover:bg-[#ff7a1a] hover:text-black transition"
                  >
                    View Photos
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* divider */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-[#2a2f36] to-transparent" />
      </div>

      {/* bottom subtle glow */}
      <div
        aria-hidden
        className="pointer-events-none mx-auto mb-2 h-6 max-w-7xl rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(255,122,26,0.18) 0%, rgba(255,122,26,0) 70%)",
        }}
      />
    </section>
  );
}
