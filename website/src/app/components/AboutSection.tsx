"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

/**
 * Palette (tuned for contrast on orange)
 * - bg: warm orange gradient
 * - accent: deep navy + cobalt (complements orange)
 * - soft: subtle teal for glows
 */
const PALETTE = {
  bgFrom: "#ff7a1a",
  bgVia: "#ff8c33",
  bgTo: "#ffb56b",
  navy: "#0b1b2b",
  cobalt: "#1a5cff",
  teal: "rgba(28, 164, 173, 0.18)",
};

export default function AboutSection() {
  const photos = useMemo(
    () => [
      { src: "/IMG_3697-1024x683.jpg.webp", alt: "Attendees enjoying a vibrant event" },
      { src: "/Photography-By_Md-Jahangir_0058-1024x681.jpg.webp", alt: "Traditional Bangladeshi cultural performance" },
    ],
    []
  );

  return (
    <section
      className={`relative text-white bg-gradient-to-br from-[${PALETTE.bgFrom}] via-[${PALETTE.bgVia}] to-[${PALETTE.bgTo}]`}
      aria-labelledby="about-utsbdsoc"
    >
      {/* top accent line (cobalt) */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#1a5cff]/70 via-[#2b7bff]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <h2
              id="about-utsbdsoc"
              className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
            >
              About UTSBDSOC
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#fffaf0]/92">
              We’re the Bangladeshi Society at UTS — a welcoming community celebrating
              Bangladeshi culture through food, music, language, and festivals. Whether
              you’re Bangladeshi or simply curious, you’re invited to join our events,
              make friends, and build campus memories together.
            </p>

            <ul className="mt-6 space-y-2 text-[#ffffff]/95">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#0b1b2b]" />
                Inclusive, student-led community open to all backgrounds
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#0b1b2b]" />
                Regular cultural nights, socials, sport, and collabs
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#0b1b2b]" />
                Leadership opportunities and creative projects
              </li>
            </ul>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              {/* Primary: deep navy to pop on orange */}
              <Link
                href="https://www.activateuts.com.au/clubs/bangladeshi-society"
                className="rounded-full bg-[#0b1b2b] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-px hover:shadow-[0_10px_34px_rgba(0,0,0,0.28)] focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                Join Now
              </Link>

              {/* Secondary: cobalt outline, invert on hover */}
              <Link
                href="/about"
                className="rounded-full border border-[#1a5cff] px-5 py-2.5 text-sm font-semibold text-white hover:text-[#0b1b2b] transition hover:bg-white"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right: Images */}
          <div className="relative pb-14 md:pb-0">
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="relative overflow-hidden rounded-xl border border-white/25 bg-white/10 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)]">
                <div className="aspect-[4/3] w-full">
                  <Image
                    src={photos[0].src}
                    alt={photos[0].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    priority={false}
                  />
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative overflow-hidden rounded-xl border border-white/25 bg-white/10 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)]">
                <div className="aspect-[4/3] w-full">
                  <Image
                    src={photos[1].src}
                    alt={photos[1].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    priority={false}
                  />
                </div>
              </div>
            </div>

            {/* Soft complementary glow (teal/cobalt) */}
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl">
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(60%_80%_at_20%_0%,rgba(26,92,255,0.18)_0%,rgba(26,92,255,0)_60%)] blur-xl" />
              <div className="absolute inset-0 rounded-2xl" style={{ background: `radial-gradient(50% 90% at 90% 20%, ${PALETTE.teal} 0%, rgba(0,0,0,0) 60%)` }} />
            </div>

            {/* CTA overlay */}
            <div className="relative mt-4 md:mt-0 md:absolute md:-bottom-4 md:left-1/2 md:-translate-x-1/2 z-10">
              <Link
                href="/events"
                className="block md:inline-block w-full md:w-auto text-center rounded-full border border-white/50 bg-white/15 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#0b1b2b]"
              >
                Join us at our next event →
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>

      {/* Bottom fade to help transition into the next dark section */}
      <div
        aria-hidden
        className="pointer-events-none mx-auto mb-2 h-6 max-w-7xl rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(26,92,255,0.22) 0%, rgba(26,92,255,0) 70%)",
        }}
      />
    </section>
  );
}
