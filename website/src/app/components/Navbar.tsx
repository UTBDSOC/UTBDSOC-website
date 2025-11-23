"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaDiscord,
  FaGithub,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTrophy // Icon for the awards
} from "react-icons/fa";

/* -------------------------------- config ------------------------------- */
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
];

const SOCIALS = [
  { href: "https://discord.gg/wQupZgkK", icon: FaDiscord, label: "Discord" },
  { href: "https://github.com/UTBDSOC", icon: FaGithub, label: "GitHub" },
  { href: "https://youtube.com/@utsbdsoc", icon: FaYoutube, label: "YouTube" },
  { href: "https://instagram.com/utsbdsoc", icon: FaInstagram, label: "Instagram" },
  { href: "https://facebook.com/groups/uts.bdsociety", icon: FaFacebookF, label: "Facebook" },
  { href: "https://www.linkedin.com/company/uts-bangladeshi-society", icon: FaLinkedinIn, label: "LinkedIn" },
];

/* -------------------------------- navbar ------------------------------- */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  // Scroll detection for Industrial Mode
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 z-[9999] w-full transition-all duration-300 ease-out",
        scrolled
          ? "bg-[#ea580c] border-b-2 border-black shadow-[0_4px_0px_0px_rgba(0,0,0,0.2)] py-2" // Industrial Orange Mode
          : "bg-transparent py-4", // Transparent Mode
      ].join(" ")}
    >
      {/* Noise Texture Overlay (visible only when scrolled) */}
      {scrolled && (
        <div 
          className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none" 
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
        />
      )}

      <div className="relative mx-auto max-w-7xl px-6">
        <nav className="flex h-14 items-center justify-between">
          
          {/* BRAND */}
          <Link
            href="/"
            className="flex-shrink-0 text-2xl md:text-3xl font-black tracking-tighter text-white drop-shadow-sm hover:text-black transition-colors"
            aria-label="UTSBDSOC Home"
          >
            UTSBDSOC
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={[
                        "relative px-4 py-2 font-bold text-sm uppercase tracking-wide transition-all duration-200 rounded-md",
                        "hover:bg-black hover:text-white",
                        active 
                          ? "bg-black text-white shadow-[2px_2px_0px_0px_white]" 
                          : "text-white"
                      ].join(" ")}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* SOCIALS & ACTIONS */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* === SPECIAL FEATURE: GRAAMY'S VOTE BUTTON === */}
            <Link
              href="/graamys"
              className="relative group flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-black uppercase tracking-widest text-white shadow-[3px_3px_0px_0px_white] border-2 border-white hover:translate-y-px hover:shadow-[1px_1px_0px_0px_white] transition-all"
            >
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              <FaTrophy className="text-[#ea580c]" />
              Vote Now
            </Link>

            <div className="flex items-center gap-2 border-l-2 border-white/20 pl-4">
              {SOCIALS.slice(0, 3).map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white hover:text-black hover:scale-110 transition-transform"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            {/* Membership Button */}
            <a
              href="https://www.activateuts.com.au/clubs/bangladeshi-society"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-5 py-2 text-xs font-black uppercase tracking-widest text-black shadow-[3px_3px_0px_0px_black] hover:translate-y-px hover:shadow-[1px_1px_0px_0px_black] transition-all border-2 border-black"
            >
              Join Us
            </a>
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-black focus:outline-none"
          >
            <div className="space-y-1.5">
              <span
                className={[
                  "block h-0.5 w-6 bg-current transition-transform origin-center",
                  open ? "translate-y-2 rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-0.5 w-6 bg-current transition-opacity",
                  open ? "opacity-0" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-0.5 w-6 bg-current transition-transform origin-center",
                  open ? "-translate-y-2 -rotate-45" : "",
                ].join(" ")}
              />
            </div>
          </button>
        </nav>
      </div>

      {/* MOBILE DRAWER (Industrial Style) */}
      <div
        className={[
          "lg:hidden fixed inset-x-0 top-[60px] z-[9998] origin-top",
          "bg-[#ea580c] border-b-4 border-black shadow-2xl",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-y-0" : "-translate-y-[150%]",
        ].join(" ")}
      >
        <div className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        
        <div className="relative mx-auto px-6 py-8 flex flex-col gap-6">
          
          {/* Mobile Vote Button */}
          <Link
              href="/graamys"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-center rounded-full bg-black py-4 text-sm font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_white] active:translate-y-1 active:shadow-none transition-all border-2 border-white"
            >
              <FaTrophy className="text-[#ea580c]" />
              Vote: The Graamy's
            </Link>

          <ul className="space-y-2">
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={[
                      "block text-3xl font-black uppercase tracking-tighter transition-colors",
                      active ? "text-black underline decoration-4 underline-offset-4" : "text-white hover:text-black/80"
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="h-[2px] w-full bg-black/10"></div>

          <div className="flex items-center gap-6">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white hover:text-black transition-colors"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>

          <a
            href="https://www.activateuts.com.au/clubs/bangladeshi-society"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center rounded-full bg-white text-black py-4 text-sm font-bold uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_black] active:translate-y-1 active:shadow-none transition-all"
          >
            Become a Member
          </a>
        </div>
      </div>
    </header>
  );
}