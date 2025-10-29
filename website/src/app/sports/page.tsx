"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ---------------------------- Intersection reveal --------------------------- */
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

/* ----------------------------------- Data ---------------------------------- */
type Program = { name: string; img: string; desc: string; level: "Open" | "Social" | "Competitive"; sign?: string };
type Fixture = { title: string; date: string; time: string; venue: string; maps?: string; sport: string; status?: "UPCOMING" | "RESULT" };
type Captain = { name: string; role: string; img: string; ig?: string };
type Result = { date: string; sport: string; opponent: string; score: string; outcome: "W" | "L" | "D" };
type Venue = { name: string; address: string; maps: string };

const PROGRAMS: Program[] = [
  { name: "Cricket",    img: "/sports/cricket-action.jpg",   desc: "Inter-society friendlies + inter-uni comps.", level: "Competitive", sign: "https://forms.gle/sports-interest" },
  { name: "Futsal",     img: "/sports/futsal.jpg",           desc: "Fast-paced matches, mixed teams, weekly runs.", level: "Social" },
  { name: "Badminton",  img: "/sports/badminton.jpg",        desc: "Casual rallies + ladder nights. All levels.", level: "Open" },
  { name: "Volleyball", img: "/sports/volleyball.jpg",       desc: "Community games + skill drills.", level: "Social" },
  { name: "Table Tennis", img: "/sports/table-tennis.jpg",   desc: "Singles/duos ladder — fun & competitive.", level: "Open" },
  { name: "Running Club", img: "/sports/running.jpg",        desc: "Weekly 5–8km city loops. Beginners welcome.", level: "Open" },
];

const FIXTURES: Fixture[] = [
  { title: "Cricket Friendly vs XYZ SOC", date: "Sat 16 Nov", time: "12:30 pm", venue: "Sydney Park Oval", maps: "https://maps.app.goo.gl/xxxxx", sport: "Cricket", status: "UPCOMING" },
  { title: "Futsal Round Robin",          date: "Tue 19 Nov", time: "7:00 pm",  venue: "UTS Sports Hall",  maps: "https://maps.app.goo.gl/xxxxx", sport: "Futsal", status: "UPCOMING" },
  { title: "Badminton Ladder Night",      date: "Thu 21 Nov", time: "6:00 pm",  venue: "UTS Building 4",   maps: "https://maps.app.goo.gl/xxxxx", sport: "Badminton", status: "UPCOMING" },
];

const CAPTAINS: Captain[] = [
  { name: "Imran H", role: "Cricket Captain", img: "/sports/captains/imran.jpg", ig: "https://instagram.com/" },
  { name: "Rafi S",  role: "Futsal Coordinator", img: "/sports/captains/rafi.jpg" },
  { name: "Sarah A", role: "Badminton Coordinator", img: "/sports/captains/sarah.jpg" },
  { name: "Maya T",  role: "Volleyball Lead", img: "/sports/captains/maya.jpg" },
];

const RESULTS: Result[] = [
  { date: "02 Nov", sport: "Cricket",   opponent: "ABC SOC", score: "152/8 – 149/9", outcome: "W" },
  { date: "29 Oct", sport: "Futsal",    opponent: "XYZ SOC", score: "4 – 5",         outcome: "L" },
  { date: "25 Oct", sport: "Badminton", opponent: "Open Night", score: "Ladder +12", outcome: "W" },
];

const VENUES: Venue[] = [
  { name: "UTS Sports Hall", address: "702-730 Harris St, Ultimo", maps: "https://maps.app.goo.gl/xxxxx" },
  { name: "UTS Building 4",  address: "745 Harris St, Ultimo",     maps: "https://maps.app.goo.gl/xxxxx" },
  { name: "Sydney Park Oval", address: "Sydney Park, St Peters",   maps: "https://maps.app.goo.gl/xxxxx" },
];

/* -------------------------------- Component -------------------------------- */
export default function SportsPage() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen text-white bg-[linear-gradient(135deg,#ff8c33_0%,#f57c00_100%)]">
        {/* subtle texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)", backgroundSize: "10px 10px" }}
        />

        {/* top glow bridge */}
        <div
          aria-hidden
          className="pointer-events-none mx-auto h-8 max-w-7xl rounded-full opacity-50 mt-2"
          style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(255,140,51,0.35) 0%, rgba(255,140,51,0) 70%)" }}
        />

        {/* HERO */}
        <section className="relative mx-auto max-w-7xl px-4 pt-20 md:pt-24 pb-10">
          <Reveal>
            <div className="grid gap-8 md:grid-cols-[1.15fr_1fr] items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
                  UTSBDSOC Sports
                </h1>
                <p className="mt-4 max-w-2xl text-white/95">
                  Join our competitive and social sports: <b>Cricket, Futsal, Badminton, Volleyball, Table Tennis</b> and more.
                  Make friends, get active, and represent the community.
                </p>

                {/* quick stats */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {["6+ programs", "2 weekly sessions", "Open & social", "Inter-uni comps"].map((t) => (
                    <span key={t} className="inline-flex items-center rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs font-semibold">{t}</span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="https://forms.gle/sports-interest" target="_blank" rel="noopener noreferrer"
                     className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#f57c00] shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-px hover:shadow-[0_10px_34px_rgba(0,0,0,0.28)]">
                    Register Interest
                  </a>
                  <a href="https://discord.gg/wQupZgkK" target="_blank" rel="noopener noreferrer"
                     className="rounded-full border border-white/70 bg-white/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#f57c00]">
                    Join Discord
                  </a>
                  <a href="https://www.instagram.com/utsbdsoc" target="_blank" rel="noopener noreferrer"
                     className="rounded-full border border-white/70 px-5 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#f57c00]">
                    Instagram
                  </a>
                </div>
              </div>

              <div className="relative rounded-2xl border border-white/25 bg-white/10 p-2 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)]">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                  <Image src="/sports/cricket-team.jpg" alt="Sports highlight" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* PROGRAMS */}
        <section className="relative mx-auto max-w-7xl px-4 py-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Programs</h2>
            <p className="mt-2 text-white/90">Pick a sport — we’ll see you on the court, pitch, or track.</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PROGRAMS.map((p) => (
                <article key={p.name} className="group relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)] transition-transform hover:-translate-y-0.5">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                    <Image src={p.img} alt={p.name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-4">
                    <div className="mb-1 flex items-center justify-between">
                      <h3 className="text-lg font-extrabold tracking-tight">{p.name}</h3>
                      <span className="rounded-full bg-white/20 px-2 py-1 text-[11px] font-semibold">{p.level}</span>
                    </div>
                    <p className="text-sm text-white/90">{p.desc}</p>
                    {p.sign && (
                      <div className="mt-3">
                        <a href={p.sign} target="_blank" rel="noopener noreferrer"
                           className="inline-flex items-center rounded-full border border-white/70 bg-white/20 px-4 py-2 text-sm font-semibold hover:bg-white hover:text-[#f57c00]">
                          Join Now →
                        </a>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        {/* UPCOMING FIXTURES */}
        <section className="relative mx-auto max-w-7xl px-4 py-10">
          <Reveal>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Upcoming Fixtures</h2>
                <p className="mt-2 text-white/90">Matches, ladders, and social game nights.</p>
              </div>
              <Link href="/events" className="rounded-full border border-white/70 bg-white/20 px-4 py-2 text-sm font-semibold hover:bg-white hover:text-[#f57c00]">All Events</Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {FIXTURES.map((f, i) => (
                <div key={i} className="rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-extrabold tracking-tight">{f.title}</h3>
                    <span className="rounded-full bg-white/20 px-2 py-1 text-[11px] font-semibold">{f.sport}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/90">{f.date} • {f.time}</p>
                  <p className="text-sm text-white/90">{f.venue}</p>
                  <div className="mt-3 flex gap-2">
                    {f.maps && <a href={f.maps} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/70 bg-white/20 px-3 py-1 text-xs font-semibold hover:bg-white hover:text-[#f57c00]">Maps</a>}
                    <Link href="/events" className="rounded-full border border-white/70 bg-white/20 px-3 py-1 text-xs font-semibold hover:bg-white hover:text-[#f57c00]">Details</Link>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* TEAMS & CAPTAINS */}
        <section className="relative mx-auto max-w-7xl px-4 py-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Teams & Captains</h2>
            <p className="mt-2 text-white/90">Say hi to the people running drills, strategy, and GGs.</p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {CAPTAINS.map((c) => (
                <div key={c.name} className="group relative overflow-hidden rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)]">
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl">
                    <Image src={c.img} alt={c.name} fill sizes="(max-width:1024px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-extrabold tracking-tight">{c.name}</h3>
                    <p className="text-sm text-white/90">{c.role}</p>
                    {c.ig && <a href={c.ig} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex rounded-full border border-white/60 bg-white/20 px-3 py-1 text-xs font-semibold hover:bg-white hover:text-[#f57c00]">Instagram</a>}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* RESULTS / LEADERBOARD */}
        <section className="relative mx-auto max-w-7xl px-4 py-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Recent Results</h2>
            <div className="mt-6 overflow-hidden rounded-2xl border border-white/25 bg-white/10 backdrop-blur-[2px]">
              <table className="w-full text-sm">
                <thead className="text-left text-white/90">
                  <tr className="border-b border-white/15">
                    <th className="p-3">Date</th>
                    <th className="p-3">Sport</th>
                    <th className="p-3">Opponent / Event</th>
                    <th className="p-3">Score</th>
                    <th className="p-3">Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {RESULTS.map((r, i) => (
                    <tr key={i} className="border-b border-white/10 last:border-0">
                      <td className="p-3">{r.date}</td>
                      <td className="p-3">{r.sport}</td>
                      <td className="p-3">{r.opponent}</td>
                      <td className="p-3">{r.score}</td>
                      <td className="p-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          r.outcome === "W" ? "bg-white/25" : r.outcome === "L" ? "bg-black/20" : "bg-white/10"
                        }`}>{r.outcome}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        {/* VENUES */}
        <section className="relative mx-auto max-w-7xl px-4 py-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Venues</h2>
            <p className="mt-2 text-white/90">Where we train and play — tap for maps.</p>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {VENUES.map((v) => (
                <a key={v.name} href={v.maps} target="_blank" rel="noopener noreferrer"
                   className="block rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)] hover:bg-white/15">
                  <h3 className="text-lg font-extrabold tracking-tight">{v.name}</h3>
                  <p className="text-sm text-white/90">{v.address}</p>
                  <span className="mt-2 inline-block text-xs text-white/90 underline decoration-dotted underline-offset-4">Open in Maps</span>
                </a>
              ))}
            </div>
          </Reveal>
        </section>

        {/* PRICING / MEMBERSHIP + CODE */}
        <section className="relative mx-auto max-w-7xl px-4 py-10">
          <Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/25 bg-white/10 p-6 backdrop-blur-[2px]">
                <h3 className="text-2xl font-extrabold tracking-tight">Membership & Pricing</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/90">
                  <li>• UTSBDSOC members get discounted session fees & priority spots.</li>
                  <li>• Most social sessions are free or gold-coin donation.</li>
                  <li>• Competitive comps may have shared team fees.</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link href="/membership" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#f57c00]">Become a Member</Link>
                  <Link href="/events" className="rounded-full border border-white/70 bg-white/20 px-4 py-2 text-sm font-semibold hover:bg-white hover:text-[#f57c00]">See Events</Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/25 bg-white/10 p-6 backdrop-blur-[2px]">
                <h3 className="text-2xl font-extrabold tracking-tight">Code of Conduct (Sports)</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/90">
                  <li>• Respect players, officials, and venues — zero tolerance for abuse.</li>
                  <li>• Play fair: follow rules, prioritise safety, report injuries.</li>
                  <li>• Represent UTSBDSOC positively on and off the field.</li>
                </ul>
                <Link href="/code-of-conduct" className="mt-3 inline-block text-sm underline decoration-dotted underline-offset-4 text-white/90">
                  Read full policy →
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section className="relative mx-auto max-w-7xl px-4 py-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">FAQs</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                { q: "Do I need to be experienced?", a: "No — most programs are open and social. Competitive trials will be listed." },
                { q: "What should I bring?", a: "Comfortable sportswear, appropriate shoes, water bottle. Equipment is shared where possible." },
                { q: "How do I join a team?", a: "Register interest and join Discord. Captains post trials, times, and rosters there." },
                { q: "Are there fees?", a: "Social sessions are often free/cheap. Competition entries may require shared team fees." },
              ].map((f) => (
                <div key={f.q} className="rounded-2xl border border-white/25 bg-white/10 p-5 backdrop-blur-[2px]">
                  <h4 className="text-lg font-extrabold tracking-tight">{f.q}</h4>
                  <p className="mt-2 text-white/90 text-sm">{f.a}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* PARTNERS */}
        <section className="relative mx-auto max-w-7xl px-4 py-10">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Partners & Friends</h2>
            <p className="mt-2 text-white/90">We love collabs — reach out for tournaments or shared sessions.</p>
            <div className="mt-6 grid gap-4 grid-cols-2 md:grid-cols-4">
              {["/logos/partner1.svg", "/logos/partner2.svg", "/logos/partner3.svg", "/logos/partner4.svg"].map((src, i) => (
                <div key={i} className="flex items-center justify-center rounded-xl border border-white/20 bg-white/10 py-6">
                  <Image src={src} alt={`Partner ${i+1}`} width={140} height={40} />
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/partners" className="rounded-full border border-white/70 bg-white/20 px-4 py-2 text-sm font-semibold hover:bg-white hover:text-[#f57c00]">Become a Partner</Link>
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="relative mx-auto max-w-7xl px-4 py-10">
          <Reveal>
            <div className="rounded-2xl border border-white/25 bg-white/10 p-6 backdrop-blur-[2px] shadow-[0_0_24px_rgba(0,0,0,0.18)]">
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">Ready to play?</h3>
              <p className="mt-2 text-white/90">Join a session, trial for a team, or just come say hi.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href="https://forms.gle/sports-interest" target="_blank" rel="noopener noreferrer"
                   className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#f57c00] shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-px hover:shadow-[0_10px_34px_rgba(0,0,0,0.28)]">
                  Register Interest
                </a>
                <a href="mailto:utsbangladeshisoc@gmail.com?subject=Sports%20Enquiry"
                   className="rounded-full border border-white/70 bg-white/20 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#f57c00]">
                  Email Us
                </a>
                <a href="https://discord.gg/wQupZgkK" target="_blank" rel="noopener noreferrer"
                   className="rounded-full border border-white/70 px-5 py-2.5 text-sm font-semibold hover:bg-white hover:text-[#f57c00]">
                  Join Discord
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* bottom glow */}
        <div
          aria-hidden
          className="pointer-events-none mx-auto mb-2 h-8 max-w-7xl rounded-full opacity-50"
          style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(255,140,51,0.35) 0%, rgba(255,140,51,0) 70%)" }}
        />
      </main>

      <Footer />
    </>
  );
}
