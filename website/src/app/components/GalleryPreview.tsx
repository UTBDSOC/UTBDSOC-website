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
      className="relative bg-gradient-to-br from-[#0b0f14] via-[#0d131b] to-[#101820]"
    >
      {/* optional top accent when not stacked under same-bg section */}
      {!seamlessTop && (
        <div className="h-[2px] w-full bg-gradient-to-r from-[#ff7a1a]/70 via-[#ffa45c]/60 to-transparent" />
      )}
      {/* soft bridge when seamless */}
      {seamlessTop && <div className="h-8 bg-gradient-to-b from-transparent to-black/5" aria-hidden />}

      <div className="mx-auto max-w-7xl px-4 py-14">
        <header className="mb-8 text-center">
          <h2 id="gallery-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#C9D1D9]">
            Gallery
          </h2>
          <p className="mt-2 text-sm text-[#9aa4af]">
            Moments from recent events — see the full collection in our gallery.
          </p>
        </header>

        {/* Grid: 3 up top; second row center spans 2 cols */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SHOTS.slice(0, 3).map((s, i) => <Tile key={`row1-${i}`} shot={s} />)}
          <Tile shot={SHOTS[3]} />
          <div className="lg:col-span-2"><Tile shot={SHOTS[4]} tall /></div>
          <Tile shot={SHOTS[5]} />
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/gallery"
            className="rounded-full border border-[#ff7a1a] px-6 py-3 text-sm font-semibold text-[#ff7a1a] transition hover:bg-[#ff7a1a] hover:text-black"
          >
            View All
          </Link>
        </div>
      </div>

      {/* bottom subtle glow */}
      <div
        aria-hidden
        className="pointer-events-none mx-auto mb-2 h-6 max-w-7xl rounded-full opacity-40"
        style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(255,122,26,0.14) 0%, rgba(255,122,26,0) 70%)" }}
      />
    </section>
  );
}

function Tile({ shot, tall = false }: { shot: Shot; tall?: boolean }) {
  return (
    <article
      className={[
        "group relative overflow-hidden rounded-2xl border border-[#2a2f36] bg-[#151a20]",
        "shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5",
        tall ? "aspect-[16/9]" : "aspect-[16/10]",
      ].join(" ")}
    >
      {/* subtle brand glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ff7a1a]/5 via-[#ffa45c]/4 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#2f353d]" />
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
        <div className="w-full rounded-xl bg-black/0 p-3 opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-black/35 group-hover:opacity-100 group-hover:backdrop-blur-sm">
          <p className="text-sm font-medium text-white/95">{shot.alt}</p>
        </div>
      </div>

      {/* optional link overlay */}
      {shot.href && <Link href={shot.href} className="absolute inset-0" aria-label={shot.alt} />}
    </article>
  );
}
