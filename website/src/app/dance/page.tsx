"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ---------------------------- small animation hook --------------------------- */
function useReveal<T extends HTMLElement>(options: IntersectionObserverInit = { threshold: 0.15 }) {
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
type Choreo = { name: string; role?: string; img: string; ig?: string; yt?: string };
type Reel = { src: string; alt: string; href?: string };

const CHOREOGRAPHERS: Choreo[] = [
  { name: "Aisha K", role: "Urban / Contemporary", img: "/dance/aisha.jpg", ig: "https://instagram.com/your-handle" },
  { name: "Rafi H", role: "Hip-Hop / Fusion", img: "/dance/rafi.jpg", ig: "https://instagram.com/your-handle" },
  { name: "Sam R", role: "Folk / Semi-classical", img: "/dance/sam.jpg", ig: "https://instagram.com/your-handle" },
];

const REELS: Reel[] = [
  { src: "/Photography-By_Md-Jahangir_0058-1024x681.jpg.webp", alt: "Live performance highlight", href: "/gallery" },
  { src: "/IMG_3697-1024x683.jpg.webp", alt: "Stage moments", href: "/gallery" },
  { src: "/IMG_7204-edited.jpg.webp", alt: "Team after the show", href: "/gallery" },
];

/* -------------------------------- component -------------------------------- */
export default function DancePage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen text-white bg-[#f57c00]">
        {/* subtle texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            backgroundPosition: "0 0, 25px 25px",
          }}
        />
        {/* Orange glow at top */}
        <div
          className="absolute inset-x-0 top-0 h-[300px]"
          style={{
            backgroundImage: [
              "rgba(255,140,51,0)",
              "radial-gradient(100% 100% at 50% 100%, rgba(255,140,51,0.2) 0%, rgba(255,140,51,0) 50%)",
            ].join(","),
          }}
        />

        {/* top orange transition (under navbar) */}
        <div
          aria-hidden
          className="pointer-events-none mx-auto h-8 max-w-7xl rounded-full opacity-50 mt-2"
          style={{
            backgroundImage: [
              "rgba(255,140,51,0)",
              "radial-gradient(100% 100% at 50% 100%, rgba(255,140,51,0.2) 0%, rgba(255,140,51,0) 50%)",
            ].join(","),
          }}
        />

        {/* HERO — show the dance identity */}
        <section className="relative mx-auto max-w-7xl px-4 pt-20 md:pt-24 pb-10">
          <Reveal>
            <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
                  UTSBDSOC Dance
                </h1>
                <p className="mt-4 max-w-2xl text-white/95">
                  We’re the performance heart of the society — bringing Bangladeshi rhythm to campus through
                  <span className="font-semibold"> stage shows, collabs, and reels</span>. Expect Urban, Hip-Hop, Folk,
                  Contemporary and fusion — crafted by our choreographers and performed by our crew.
                </p>

                {/* style chips */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Urban Bangla", "Hip-Hop", "Folk", "Contemporary", "Fusion", "Showcases"].map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href="https://forms.gle/your-audition-form"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#f57c00] shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-px hover:shadow-[0_10px_34px_rgba(0,0,0,0.28)]"
                  >
                    Audition / Register Interest
                  </a>
                  <a
                    href="https://www.activateuts.com.au/clubs/bangladeshi-society"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/70 bg-white/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#f57c00]"
                  >
                    Membership (ActivateUTS)
                  </a>
                  <a
                    href="https://www.instagram.com/utsbdsoc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/70 px-5 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#f57c00]"
                  >
                    Instagram
                  </a>
                </div>

                {/* as-seen-at badges */}
                <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/85">
                  <span className="opacity-90">As seen at:</span>
                  {["UTS Great Hall", "Inter-Society Night", "Cultural Collabs"].map((b) => (
                    <span key={b} className="rounded-full border border-white/30 px-2 py-1">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* hero media */}
              <div className="relative rounded-2xl border border-white/25 bg-white/10 p-2 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)]">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                  <Image
                    src="/Photography-By_Md-Jahangir_0058-1024x681.jpg.webp"
                    alt="Dance highlight"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FEATURED REELS — showcase first */}
        <section className="relative mx-auto max-w-7xl px-4 py-6">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Reels & Highlights</h2>
            <p className="mt-2 text-white/90">On stage & on camera — a glimpse into our performances.</p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {REELS.map((r, i) => (
                <article
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5"
                >
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={r.src}
                      alt={r.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/18" />
                  {r.href && <Link href={r.href} className="absolute inset-0" aria-label={r.alt} />}
                </article>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <Link
                href="/gallery"
                className="rounded-full border border-white/70 bg-white/20 px-4 py-2 text-sm font-semibold hover:bg-white hover:text-[#f57c00]"
              >
                View Full Gallery
              </Link>
            </div>
          </Reveal>
        </section>

        {/* CHOREOGRAPHERS */}
        <section className="relative mx-auto max-w-7xl px-4 py-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Choreographers</h2>
            <p className="mt-2 text-white/90">The leads behind our shows and sets.</p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CHOREOGRAPHERS.map((c) => (
                <div
                  key={c.name}
                  className="group relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)]"
                >
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl">
                    <Image
                      src={c.img}
                      alt={c.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-extrabold tracking-tight">{c.name}</h3>
                    {c.role && <p className="text-sm text-white/90">{c.role}</p>}

                    <div className="mt-3 flex items-center gap-2">
                      {c.ig && (
                        <a
                          href={c.ig}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-white/60 bg-white/20 px-3 py-1 text-xs font-semibold hover:bg-white hover:text-[#f57c00]"
                        >
                          Instagram
                        </a>
                      )}
                      {c.yt && (
                        <a
                          href={c.yt}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full border border-white/60 bg-white/20 px-3 py-1 text-xs font-semibold hover:bg-white hover:text-[#f57c00]"
                        >
                          YouTube
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* PERFORMANCES & SHOWCASES — replacement for session cards */}
        <section className="relative mx-auto max-w-7xl px-4 py-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Performances & Showcases</h2>
            <p className="mt-2 text-white/90">
              A glimpse into where our dancers have lit up the stage — cultural nights, collaborations, and competitions.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1 */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 backdrop-blur-[2px] p-4 shadow-[0_0_24px_rgba(0,0,0,0.18)]">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                  <Image
                    src="/IMG_7204-edited.jpg.webp"
                    alt="UTS Cultural Night Performance"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-extrabold tracking-tight">UTS Cultural Night 2025</h3>
                  <p className="text-sm text-white/90">
                    A high-energy showcase blending Bangladeshi folk and hip-hop — crowd-favourite at UTS Great Hall.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 backdrop-blur-[2px] p-4 shadow-[0_0_24px_rgba(0,0,0,0.18)]">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                  <Image
                    src="/Photography-By_Md-Jahangir_0058-1024x681.jpg.webp"
                    alt="Inter-Society Collaboration"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-extrabold tracking-tight">Inter-Society Collaboration</h3>
                  <p className="text-sm text-white/90">
                    A joint performance with UTS Dance & Music Soc — desi rhythm meets contemporary choreography.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 backdrop-blur-[2px] p-4 shadow-[0_0_24px_rgba(0,0,0,0.18)]">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                  <Image
                    src="/2-copy.png.webp"
                    alt="South Asian Dance Fest entry"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-extrabold tracking-tight">South Asian Dance Fest</h3>
                  <p className="text-sm text-white/90">
                    Representing UTS Bangladeshi Society at a Sydney-wide inter-uni competition.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="relative mx-auto max-w-7xl px-4 py-10">
          <Reveal>
            <div className="rounded-2xl border border-white/25 bg-white/10 p-6 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)]">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Join the Crew</h3>
              <p className="mt-2 text-white/90">
                Perform, create, or help with production. We’re recruiting dancers, choreographers, and media.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="https://forms.gle/your-audition-form"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#f57c00] shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-px hover:shadow-[0_10px_34px_rgba(0,0,0,0.28)]"
                >
                  Audition / Register Interest
                </a>
                <a
                  href="mailto:utsbangladeshisoc@gmail.com?subject=UTSBDSOC%20Dance%20Enquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/70 bg-white/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#f57c00]"
                >
                  Email Us
                </a>
                <a
                  href="https://discord.gg/wQupZgkK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/70 px-5 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#f57c00]"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section className="relative mx-auto max-w-7xl px-4 py-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">FAQs</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Faq q="Do I need prior experience?" a="No—our open classes are beginner-friendly. Auditions are for the performance crew." />
              <Faq q="What should I bring?" a="Comfortable clothes, sneakers or dance shoes, water, and good vibes." />
              <Faq q="How do I join the performance team?" a="Register for auditions (posted on our Instagram and this page). We also welcome production/media volunteers." />
              <Faq q="Are sessions free?" a="Member pricing may apply for special sessions—join via ActivateUTS for priority and best rates." />
            </div>
          </Reveal>
        </section>

        {/* bottom transition */}
        <div
          aria-hidden
          className="pointer-events-none mx-auto mb-2 h-8 max-w-7xl rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(255,140,51,0.35) 0%, rgba(255,140,51,0) 70%)",
          }}
        />
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
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)]">
      <h4 className="text-lg font-extrabold tracking-tight">{q}</h4>
      <p className="mt-2 text-white/90">{a}</p>
    </div>
  );
}
