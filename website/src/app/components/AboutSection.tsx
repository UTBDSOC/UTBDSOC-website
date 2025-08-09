"use client";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

export default function AboutSection() {
  const photos = useMemo(
    () => [
      { src: "/images/about/group-1.jpg", alt: "UTSBDSOC group photo at Alumni Green" },
      { src: "/images/about/group-2.jpg", alt: "Students enjoying cultural night" },
    ],
    []
  );

  return (
    <section
      className="relative border-t border-[#2a2f36] bg-gradient-to-br from-[#0b0f14] via-[#0d131b] to-[#101820]"
      aria-labelledby="about-utsbdsoc"
    >
      {/* top accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#ff7a1a]/70 via-[#ffa45c]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 items-center">
          {/* Left: Copy */}
          <div>
            <h2
              id="about-utsbdsoc"
              className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#C9D1D9]"
            >
              About UTSBDSOC
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#9aa4af]">
              We’re the Bangladeshi Society at UTS — a welcoming community celebrating
              Bangladeshi culture through food, music, language, and festivals. Whether
              you’re Bangladeshi or simply curious, you’re invited to join our events,
              make friends, and build campus memories together.
            </p>

            <ul className="mt-6 space-y-2 text-[#cbd5e1]">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#ff7a1a]" />
                Inclusive, student‑led community open to all backgrounds
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#ff7a1a]" />
                Regular cultural nights, socials, sport, and collabs
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[#ff7a1a]" />
                Leadership opportunities and creative projects
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/membership"
                className="rounded-full bg-[#ff7a1a] px-5 py-2.5 text-sm font-semibold text-black shadow-md transition hover:-translate-y-px hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#ff7a1a]/35"
              >
                Join Now
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-[#ff7a1a] px-5 py-2.5 text-sm font-semibold text-[#ff7a1a] transition hover:bg-[#ff7a1a] hover:text-black"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right: Images + overlay CTA */}
          <div className="relative pb-14 md:pb-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-xl border border-[#2a2f36] bg-[#151a20]">
                <div className="aspect-[4/3] w-full">
                  <Image
                    src={photos[0].src}
                    alt={photos[0].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 will-change-transform hover:scale-[1.03]"
                    priority={false}
                  />
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl border border-[#2a2f36] bg-[#151a20]">
                <div className="aspect-[4/3] w-full">
                  <Image
                    src={photos[1].src}
                    alt={photos[1].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 will-change-transform hover:scale-[1.03]"
                    priority={false}
                  />
                </div>
              </div>
            </div>

            {/* Glow (non-blocking) */}
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ff7a1a]/6 via-[#ffa45c]/5 to-transparent blur-xl" />
            </div>

            {/* CTA: inline on mobile, absolute on md+ */}
            <div className="relative mt-4 md:mt-0 md:absolute md:-bottom-4 md:left-1/2 md:-translate-x-1/2 z-10">
              <Link
                href="/events"
                className="block md:inline-block w-full md:w-auto text-center rounded-full border border-[#ff7a1a]/60 bg-[#ff7a1a]/10 px-5 py-3 text-sm font-semibold text-[#ffa45c] backdrop-blur-sm transition hover:bg-[#ff7a1a] hover:text-black"
              >
                Join us at our next event →
              </Link>
            </div>
          </div>
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
