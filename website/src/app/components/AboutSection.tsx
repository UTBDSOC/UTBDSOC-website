"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

export default function AboutSection() {
  const photos = useMemo(
    () => [
      {
        src: "/IMG_3697-1024x683.jpg.webp",
        alt: "Attendees enjoying a vibrant event",
      },
      {
        src: "/Photography-By_Md-Jahangir_0058-1024x681.jpg.webp",
        alt: "Traditional Bangladeshi cultural performance",
      },
    ],
    []
  );

  return (
    <section
      className="relative bg-[#f57c00] text-white overflow-hidden"
      aria-labelledby="about-utsbdsoc"
    >
      {/* Top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#ffd19a]/60 via-white/30 to-transparent" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-20">
        {/* Subtle dot texture overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />

        <div className="relative grid gap-10 md:grid-cols-2 md:gap-12 items-center">
          {/* Left column */}
          <div>
            <h2
              id="about-utsbdsoc"
              className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
            >
              About UTSBDSOC
            </h2>

            <p className="mt-4 text-base leading-relaxed text-white/90">
              We’re the Bangladeshi Society at UTS — a welcoming community
              celebrating Bangladeshi culture through food, music, language,
              and festivals. Whether you’re Bangladeshi or simply curious,
              you’re invited to join our events, make friends, and build
              campus memories together.
            </p>

            <ul className="mt-6 space-y-2 text-white/95">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white" />
                Inclusive, student-led community open to all backgrounds
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white" />
                Regular cultural nights, socials, sport, and collaborations
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white" />
                Leadership opportunities and creative projects
              </li>
            </ul>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="https://www.activateuts.com.au/clubs/bangladeshi-society"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#f57c00] shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-px hover:shadow-[0_10px_34px_rgba(0,0,0,0.28)]"
              >
                Join Now
              </Link>

              <Link
                href="/about"
                className="rounded-full border border-white px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-[#f57c00] transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right column: images */}
          <div className="relative pb-14 md:pb-0">
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl border border-white/25 bg-white/10 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)]"
                >
                  <div className="aspect-[4/3] w-full">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                      priority={false}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Call-to-action overlay */}
            <div className="relative mt-4 md:mt-0 md:absolute md:-bottom-4 md:left-1/2 md:-translate-x-1/2 z-10">
              <Link
                href="/events"
                className="block md:inline-block w-full md:w-auto text-center rounded-full border border-white/70 bg-white/20 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#f57c00]"
              >
                Join us at our next event →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 🟧 Universal orange transition fade */}
      <div
        aria-hidden
        className="pointer-events-none mx-auto h-8 max-w-7xl rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(255,140,51,0.35) 0%, rgba(255,140,51,0) 70%)",
        }}
      />
    </section>
  );
}
