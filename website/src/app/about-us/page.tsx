"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

/* ---------------------------- small animation hook --------------------------- */
function useReveal<T extends HTMLElement>(options: IntersectionObserverInit = { threshold: 0.1 }) {
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
      <main className="relative min-h-screen bg-[#ea580c] text-white overflow-hidden pt-24">
        
        {/* ------------------------------------------------------
            TEXTURE & PATTERN (The "Premium Flat" Look)
           ------------------------------------------------------ */}
        
        {/* Noise Texture */}
        <div 
          className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none" 
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
        />

        {/* Dot Pattern - Adds technical detail */}
        <div 
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
            backgroundSize: '32px 32px' 
          }} 
        />

        {/* Top Hard Border */}
        <div className="absolute top-20 left-0 right-0 h-[2px] bg-black/10" />


        {/* HERO SECTION */}
        <section className="relative mx-auto max-w-7xl px-6 pt-14 pb-16 md:pt-20 md:pb-24">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
               <span className="h-[2px] w-12 bg-black"></span>
               <span className="text-xs font-bold uppercase tracking-[0.2em] text-black/80">
                 About Us
               </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-sm mb-6">
              UTS Bangladeshi <span className="text-black">Society</span>
            </h1>
            
            <p className="max-w-3xl text-lg md:text-xl font-medium text-white/90 leading-relaxed border-l-4 border-black pl-6">
              We’re a student-led community celebrating Bangladeshi culture at UTS—through food,
              music, language, festivals and friendship. Whether you’re Bangladeshi or just curious,
              you’re welcome.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://www.activateuts.com.au/clubs/bangladeshi-society"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-8 py-3 text-sm font-bold text-black shadow-[4px_4px_0px_0px_black] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black]"
              >
                Join Now
              </a>
              <Link
                href="/events"
                className="rounded-full border-2 border-black bg-black px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-black"
              >
                See Events
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 grid gap-6 sm:grid-cols-3">
              {SHOTS.map((s, i) => (
                <Link
                  key={i}
                  href={s.href ?? "/gallery"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl border-2 border-black bg-black shadow-[4px_4px_0px_0px_black] transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black]"
                >
                  <div className="aspect-[16/10] w-full">
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale hover:grayscale-0"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 backdrop-blur-sm translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-xs font-bold text-white uppercase tracking-wide">View Gallery</p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>

        {/* WHAT WE DO - Solid Black Section for Contrast */}
        <section className="relative border-y-2 border-black bg-black py-20">
           {/* Noise Texture on Black */}
           <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
           
           <div className="relative mx-auto max-w-7xl px-6">
            <Reveal>
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
                  What We <span className="text-[#ea580c]">Do</span>
                </h2>
                <p className="mt-4 max-w-2xl text-lg text-gray-400">
                  We run cultural nights, socials, skill-building workshops and collaborations across
                  UTS. Expect great food, music, community and opportunities to contribute.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <ValueCard title="Inclusive Community" desc="Open to everyone—members from all backgrounds welcome." />
                <ValueCard title="Culture & Festivals" desc="Pohela Boishakh, Eid socials, film nights and more." />
                <ValueCard title="Collaboration" desc="We partner with UTS clubs and the broader community." />
                <ValueCard title="Leadership" desc="Grow skills via projects and volunteering at events." />
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                <Link
                  href="/partners"
                  className="rounded-full border-2 border-white px-6 py-3 text-sm font-bold hover:bg-white hover:text-black transition-colors"
                >
                  Clubs & Partners
                </Link>
                <Link
                  href="/sponsor-us"
                  className="rounded-full border-2 border-white px-6 py-3 text-sm font-bold hover:bg-white hover:text-black transition-colors"
                >
                  Sponsor Us (Info)
                </Link>
                <a
                  href="mailto:utsbangladeshisoc@gmail.com?subject=Sponsorship%20Enquiry%20-%20UTSBDSOC"
                  className="rounded-full bg-[#ea580c] px-6 py-3 text-sm font-bold text-white shadow-[4px_4px_0px_0px_white] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_white]"
                >
                  Sponsor Us (Email)
                </a>
              </div>
            </Reveal>
           </div>
        </section>

        {/* RECENT HIGHLIGHTS */}
        <section className="relative mx-auto max-w-7xl px-6 py-20">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-sm">
              Recent <span className="text-black">Highlights</span>
            </h2>
            <p className="mt-2 text-black/80 font-bold text-lg">Fresh from our Instagram.</p>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {IG_HIGHLIGHTS.map((h, idx) => (
                <article
                  key={idx}
                  className="group relative flex flex-col overflow-hidden rounded-xl border-2 border-black bg-white shadow-[8px_8px_0px_0px_black] transition-transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_black]"
                >
                  <div className="aspect-[16/9] w-full border-b-2 border-black">
                    <Image
                      src={h.image}
                      alt={h.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-xl font-black tracking-tight text-black uppercase">{h.title}</h3>
                    </div>
                    <p className="text-xs font-bold text-[#ea580c] mb-4">{h.date}</p>
                    
                    {h.tags?.length ? (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {h.tags.map((t) => (
                          <span key={t} className="inline-flex items-center rounded border border-black px-2 py-1 text-[10px] font-bold uppercase text-black/60">
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    
                    <div className="mt-auto">
                      <a
                        href={h.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-bold text-black group-hover:text-[#ea580c] transition-colors"
                      >
                        View Post
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 flex justify-center gap-4">
              <Link
                href="/gallery"
                className="rounded-full bg-black px-8 py-3 text-sm font-bold text-white shadow-[4px_4px_0px_0px_white] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_white]"
              >
                Visit Gallery
              </Link>
            </div>
          </Reveal>
        </section>

        {/* CONTACT - Industrial Box */}
        <section className="relative mx-auto max-w-7xl px-6 pb-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-xl border-2 border-black bg-white p-8 md:p-12 shadow-[8px_8px_0px_0px_black]">
              {/* Decorative diagonal lines */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20" />
              
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-black uppercase">Contact Us</h2>
              <p className="mt-4 text-black/80 font-medium text-lg max-w-2xl">
                Questions, collabs or sponsorships? We’d love to hear from you.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="mailto:utsbangladeshisoc@gmail.com"
                  className="rounded-full bg-[#ea580c] px-6 py-3 text-sm font-bold text-white shadow-[4px_4px_0px_0px_black] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black]"
                >
                  Email Us
                </a>
                <a
                  href="https://www.instagram.com/utsbdsoc"
                  target="_blank"
                  className="rounded-full border-2 border-black px-6 py-3 text-sm font-bold text-black hover:bg-black hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="https://www.activateuts.com.au/clubs/bangladeshi-society"
                  target="_blank"
                  className="rounded-full border-2 border-black px-6 py-3 text-sm font-bold text-black hover:bg-black hover:text-white transition-colors"
                >
                  ActivateUTS Portal
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

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
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function ValueCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-white/20 bg-[#1a1a1a] p-6 shadow-lg hover:border-[#ea580c] transition-colors group">
      <h3 className="text-xl font-black tracking-tight text-white group-hover:text-[#ea580c]">{title}</h3>
      <p className="mt-3 text-sm text-gray-400 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}