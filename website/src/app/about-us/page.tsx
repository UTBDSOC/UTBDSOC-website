"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
/* ---------------------------- small animation hook --------------------------- */
function useReveal<T extends HTMLElement>(options: IntersectionObserverInit = { threshold: 0.2 }) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && setVisible(true), options);
    io.observe(el);
    return () => io.disconnect();
  }, [options]);
  return { ref, visible };
}

/* ---------------------------------- data ---------------------------------- */
type Shot = { src: string; alt: string; href?: string };
const SHOTS: Shot[] = [
  { src: "/IMG_3697-1024x683.jpg.webp", alt: "Event attendees enjoying the program", href: "/gallery" },
  { src: "/Photography-By_Md-Jahangir_0058-1024x681.jpg.webp", alt: "Traditional cultural performance", href: "/gallery" },
  { src: "/IMG_7204-edited.jpg.webp", alt: "Group photo of participants", href: "/gallery" },
];

const IG_HIGHLIGHTS = [
  {
    title: "Karaoke Night",
    date: "24 Sept 2025",
    href: "https://www.instagram.com/p/DOuXWM1gerY/",
    image: "/events/karaoke-night-2025.jpg",
    tags: ["Social", "Music"],
  },
  {
    title: "Movie Night – Utshob",
    date: "5 Sept 2025",
    href: "https://www.instagram.com/p/DOlKgJnDyRB/",
    image: "/events/movie-night-utshob-2025.jpg",
    tags: ["Film", "Community"],
  },
  {
    title: "Boishakhi Potluck",
    date: "14 Apr 2025",
    href: "https://www.instagram.com/p/DlSzYBrZfxv/",
    image: "/events/boishakhi-potluck-2025.jpg",
    tags: ["Culture", "Food"],
  },
];

/* -------------------------------- component -------------------------------- */
export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-[#f57c00] text-white overflow-hidden pt-20 md:pt-24">
        {/* Top accent */}
        <div className="h-[2px] w-full bg-gradient-to-r from-[#ffd19a]/60 via-white/30 to-transparent" />
        {/* Dot texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />

        {/* HERO */}
        <section className="relative mx-auto max-w-7xl px-4 pt-14 pb-12 md:pt-20 md:pb-16">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
              About UTS Bangladeshi Society
            </h1>
            <p className="mt-4 max-w-3xl text-white/90">
              We’re a student-led community celebrating Bangladeshi culture at UTS—through food,
              music, language, festivals and friendship. Whether you’re Bangladeshi or just curious,
              you’re welcome.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://www.activateuts.com.au/clubs/bangladeshi-society"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#f57c00] shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-px hover:shadow-[0_10px_34px_rgba(0,0,0,0.28)]"
              >
                Join Now
              </a>
              <Link
                href="/events"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/70 bg-white/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#f57c00]"
              >
                See Events
              </Link>
              <a
                href="https://www.activateuts.com.au/clubs/bangladeshi-society"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/70 px-5 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#f57c00]"
              >
                Membership (ActivateUTS)
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {SHOTS.map((s, i) => (
                <Link
                  key={i}
                  href={s.href ?? "/gallery"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)]"
                >
                  <div className="aspect-[16/10] w-full">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <span className="sr-only">{s.alt}</span>
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/18" />
                </Link>
              ))}
            </div>
          </Reveal>
        </section>

        {/* WHAT WE DO */}
        <section className="relative mx-auto max-w-7xl px-4 py-12">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">What we do</h2>
            <p className="mt-3 max-w-3xl text-white/90">
              We run cultural nights, socials, skill-building workshops and collaborations across
              UTS. Expect great food, music, community and opportunities to contribute.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ValueCard title="Inclusive Community" desc="Open to everyone—members from all backgrounds welcome." />
              <ValueCard title="Culture & Festivals" desc="Pohela Boishakh, Eid socials, film nights and more." />
              <ValueCard title="Collaboration" desc="We partner with UTS clubs and the broader community." />
              <ValueCard title="Leadership" desc="Grow skills via projects and volunteering at events." />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/partners"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/70 px-5 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#f57c00]"
              >
                Clubs & Partners
              </Link>
              <Link
                href="/sponsor-us"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/70 px-5 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#f57c00]"
              >
                Sponsor Us (Info)
              </Link>
              <a
                href="mailto:utsbangladeshisoc@gmail.com?subject=Sponsorship%20Enquiry%20-%20UTSBDSOC"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#f57c00] shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-px hover:shadow-[0_10px_34px_rgba(0,0,0,0.28)]"
              >
                Sponsor Us (Email)
              </a>
            </div>
          </Reveal>
        </section>

        {/* RECENT HIGHLIGHTS */}
        <section className="relative mx-auto max-w-7xl px-4 py-12">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Recent Highlights</h2>
            <p className="mt-2 text-white/90">Fresh from our Instagram.</p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {IG_HIGHLIGHTS.map((h, idx) => (
                <article
                  key={idx}
                  className="group relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)]"
                >
                  <div className="aspect-[16/9] w-full">
                    <Image
                      src={h.image}
                      alt={h.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-extrabold tracking-tight">{h.title}</h3>
                    <p className="mt-1 text-sm text-white/90">{h.date}</p>
                    {h.tags?.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {h.tags.map((t) => (
                          <span key={t} className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <div className="mt-4">
                      <a
                        href={h.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full border border-white/70 bg-white/20 px-4 py-2 text-sm font-semibold hover:bg-white hover:text-[#f57c00]"
                      >
                        View Post
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                href="/gallery"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#f57c00] shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-px hover:shadow-[0_10px_34px_rgba(0,0,0,0.28)]"
              >
                Visit Gallery
              </Link>
              <a
                href="https://www.instagram.com/utsbdsoc"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/70 px-5 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#f57c00]"
              >
                Instagram
              </a>
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section className="relative mx-auto max-w-7xl px-4 pb-14">
          <Reveal>
            <div className="rounded-2xl border border-white/25 bg-white/10 p-6 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)]">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Contact</h2>
              <p className="mt-2 text-white/90">
                Questions, collabs or sponsorships? We’d love to hear from you.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="mailto:utsbangladeshisoc@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#f57c00] shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-px hover:shadow-[0_10px_34px_rgba(0,0,0,0.28)]"
                >
                  Email Us
                </a>
                <a
                  href="https://www.instagram.com/utsbdsoc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/70 bg-white/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#f57c00]"
                >
                  Instagram
                </a>
                <a
                  href="https://www.activateuts.com.au/clubs/bangladeshi-society"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/70 px-5 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#f57c00]"
                >
                  ActivateUTS Portal
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Bottom fade */}
        <div
          aria-hidden
          className="pointer-events-none mx-auto mb-2 h-8 max-w-7xl rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(255,140,51,0.35) 0%, rgba(255,140,51,0) 70%)",
          }}
        />
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

/* ------------------------------- subcomponents ------------------------------ */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function ValueCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)]">
      <h3 className="text-lg font-extrabold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-white/90">{desc}</p>
    </div>
  );
}
