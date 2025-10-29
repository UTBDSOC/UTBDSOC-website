"use client";
import Image from "next/image";
import Link from "next/link";

type Highlight = {
  title: string;
  date: string;
  stats?: string;
  href: string;
  image: string;
  tags?: string[];
};

const HIGHLIGHTS: Highlight[] = [
  {
    title: "Karaoke Night",
    date: "24 Sept 2025",
    href: "https://www.instagram.com/p/DOuXWM1gerY/", // IG link
    image: "/events/karaoke-night-2025.jpg", // replace with actual file path
    tags: ["Social", "Music", "Dance"],
  },
  {
    title: "Movie Night – Utshob",
    date: "5 Sept 2025",
    href: "https://www.instagram.com/p/DOlKgJnDyRB/",
    image: "/events/movie-night-utshob-2025.jpg",
    tags: ["Film", "Cultural", "Community"],
  },
  {
    title: "Boishakhi Potluck",
    date: "14 Apr 2025",
    href: "https://www.instagram.com/p/DlSzYBrZfxv/",
    image: "/events/boishakhi-potluck-2025.jpg",
    tags: ["Cultural", "Food", "Festival"],
  },
];

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/90">
    {children}
  </span>
);

export default function PastHighlights() {
  return (
    <section
      className="relative overflow-hidden bg-[#f57c00] text-white"
      aria-labelledby="past-highlights"
    >
      {/* top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#ffd19a]/60 via-white/30 to-transparent" />

      {/* subtle dot texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2
            id="past-highlights"
            className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
          >
            Past Event Highlights
          </h2>
          <Link
            href="https://www.instagram.com/utsbdsoc"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#f57c00] shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-px hover:shadow-[0_10px_34px_rgba(0,0,0,0.28)]"
          >
            View on Instagram
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((h, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5"
            >
              {/* glow + ring */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/12 via-transparent to-white/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/18" />
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
              <div className="relative z-10 space-y-3 p-5">
                <h3 className="text-xl font-extrabold tracking-tight">
                  {h.title}
                </h3>
                <p className="text-sm text-white/90">{h.date}</p>

                {h.tags?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {h.tags.map((t, idx) => (
                      <Chip key={idx}>{t}</Chip>
                    ))}
                  </div>
                ) : null}

                <div className="pt-1">
                  <Link
                    href={h.href}
                    target="_blank"
                    className="inline-flex items-center rounded-full border border-white/70 bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#f57c00]"
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
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      </div>

      {/* bottom orange transition fade */}
      <div
        aria-hidden
        className="pointer-events-none mx-auto mb-2 h-6 max-w-7xl rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(255,140,51,0.35) 0%, rgba(255,140,51,0) 70%)",
        }}
      />
    </section>
  );
}
