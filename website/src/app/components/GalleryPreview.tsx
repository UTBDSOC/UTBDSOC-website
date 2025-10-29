"use client";
import Image from "next/image";
import Link from "next/link";

type Shot = { src: string; alt: string; href?: string };

const SHOTS: Shot[] = [
  { src: "/2-copy.png.webp", alt: "Abstract design with vibrant colors" },
  { src: "/AR6_3535-1024x683.jpg.webp", alt: "A scenic view of a natural landscape" },
  { src: "/BDSOC-logo_transparent-2-1.png.webp", alt: "BDSOC transparent logo" },
  { src: "/IMG_3697-1024x683.jpg.webp", alt: "Event attendees enjoying the program" },
  { src: "/IMG_7204-edited.jpg.webp", alt: "Group photo of participants" },
  { src: "/Photography-By_Md-Jahangir_0058-1024x681.jpg.webp", alt: "Traditional Bangladeshi cultural performance" },
];

export default function GalleryPreview({ seamlessTop = true }: { seamlessTop?: boolean }) {
  return (
    <section
      aria-labelledby="gallery-heading"
      className="relative text-white bg-[#f57c00] overflow-hidden"
    >
      {/* Top accent line (matches AboutSection) */}
      {seamlessTop ? (
        <div
          aria-hidden
          className="pointer-events-none mx-auto h-8 max-w-7xl rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(255,140,51,0.35) 0%, rgba(255,140,51,0) 70%)",
          }}
        />
      ) : (
        <div className="h-[2px] w-full bg-gradient-to-r from-[#ffd19a]/60 via-white/30 to-transparent" />
      )}

      {/* Subtle dot texture overlay (matches AboutSection) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14">
        <header className="mb-8 text-center">
          <h2
            id="gallery-heading"
            className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
          >
            Gallery
          </h2>
          <p className="mt-2 text-sm text-white/90">
            Moments from recent events — see the full collection in our gallery.
          </p>
        </header>

        {/* Grid: 3 up top; second row center spans 2 cols */}
        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SHOTS.slice(0, 3).map((s, i) => (
            <Tile key={`row1-${i}`} shot={s} />
          ))}

          <Tile shot={SHOTS[3]} />
          <div className="lg:col-span-2">
            <Tile shot={SHOTS[4]} tall />
          </div>
          <Tile shot={SHOTS[5]} />
        </div>

        {/* Buttons (match AboutSection button styling) */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/gallery"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#f57c00] shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-px hover:shadow-[0_10px_34px_rgba(0,0,0,0.28)]"
          >
            View All
          </Link>
        </div>
      </div>

      {/* Bottom: universal orange transition fade (same as AboutSection) */}
      <div
        aria-hidden
        className="pointer-events-none mx-auto mb-2 h-8 max-w-7xl rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(255,140,51,0.35) 0%, rgba(255,140,51,0) 70%)",
        }}
      />
    </section>
  );
}

function Tile({ shot, tall = false }: { shot: Shot; tall?: boolean }) {
  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 backdrop-blur-[2px]",
        "shadow-[0_0_24px_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5",
        tall ? "aspect-[16/9]" : "aspect-[16/10]",
      ].join(" ")}
    >
      {/* gentle glow + ring tuned for orange bg (matching card treatment) */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/12 via-transparent to-white/10 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/18" />
      </div>

      <div className="relative h-full w-full">
        <Image
          src={shot.src}
          alt={shot.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
        />
      </div>

      {/* hover caption */}
      <div className="pointer-events-none absolute inset-0 flex items-end p-4">
        <div className="w-full rounded-xl bg-white/0 p-3 opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-white/15 group-hover:opacity-100 group-hover:backdrop-blur-sm">
          <p className="text-sm font-medium text-white">{shot.alt}</p>
        </div>
      </div>

      {/* optional link overlay */}
      {shot.href && <Link href={shot.href} className="absolute inset-0" aria-label={shot.alt} />}
    </article>
  );
}
