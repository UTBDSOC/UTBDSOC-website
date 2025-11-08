"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";

export default function AboutSection({ variant = "orange" }: { variant?: "orange" | "black" }) {
  const isOrange = variant === "orange";

  const photos = useMemo(
    () => [
      { src: "/IMG_3697-1024x683.jpg.webp", alt: "Attendees enjoying a vibrant event" },
      { src: "/Photography-By_Md-Jahangir_0058-1024x681.jpg.webp", alt: "Traditional Bangladeshi cultural performance" },
    ],
    []
  );

  return (
    <section
      className={[
        "relative text-white overflow-hidden",
        // 🔶 Bright orange -> burnt orange -> deep dark (plan)
        isOrange
          ? "bg-gradient-to-b from-[#f57c00] via-[#b24f00] to-[#0b0f14]"
          : "bg-black",
      ].join(" ")}
      aria-labelledby="about-utsbdsoc"
    >
      {/* Top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#ffcc80]/70 via-white/30 to-transparent" />

      {/* Soft dot texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          {/* Left column */}
          <div>
            <h2
              id="about-utsbdsoc"
              className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
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
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/90" />
                Inclusive, student-led community open to all backgrounds
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/90" />
                Regular cultural nights, socials, sport, and collaborations
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-white/90" />
                Leadership opportunities and creative projects
              </li>
            </ul>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="https://www.activateuts.com.au/clubs/bangladeshi-society"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#b24f00] shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition hover:-translate-y-px hover:shadow-[0_10px_34px_rgba(0,0,0,0.35)]"
              >
                Join Now
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-white/80 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white hover:text-[#b24f00] transition"
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
                  className="relative overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.25)]"
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
                className="block md:inline-block w-full md:w-auto text-center rounded-full border border-white/60 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#b24f00]"
              >
                Join us at our next event →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
