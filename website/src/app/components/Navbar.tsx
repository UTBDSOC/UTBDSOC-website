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
} from "react-icons/fa";

/* -------------------------------- config ------------------------------- */
const NAV_LINKS = [
  { href: "/home", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/dance", label: "Dance" },
  { href: "/sports", label: "Sports" },
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

  // Add scroll detection to trigger glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 z-[9999] w-full transition-all duration-500 ease-in-out",
        scrolled
          ? // after first section → glass effect
            "bg-white/10 backdrop-blur-[10px] shadow-[0_2px_20px_rgba(0,0,0,0.25)]"
          : // before scroll → transparent
            "bg-transparent backdrop-blur-0 shadow-none",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex h-16 md:h-20 items-center gap-4">
          {/* brand */}
          <Link
            href="/"
            className="flex-shrink-0 text-2xl md:text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)] hover:text-[#ffd9a3] transition"
            aria-label="UTSBDSOC Home"
          >
            UTSBDSOC
          </Link>

          {/* desktop links */}
          <div className="ml-auto hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-2 text-lg font-medium">
              {NAV_LINKS.map(({ href, label }) => {
                const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={[
                        "relative nav-underline rounded-full px-3 py-1 transition",
                        "text-white/95 hover:text-white",
                        "hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,140,51,0.25)]",
                        active
                          ? "text-white bg-white/10 shadow-[0_0_12px_rgba(255,140,51,0.3)]"
                          : "",
                      ].join(" ")}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* socials */}
            <div className="ml-2 flex items-center gap-3">
              {SOCIALS.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-md p-1 text-white/90 hover:text-[#ffb066] hover:drop-shadow-[0_0_10px_rgba(255,140,51,0.4)] transition"
                >
                  <Icon size={20} />
                </a>
              ))}

              {/* Membership */}
              <a
                href="https://www.activateuts.com.au/clubs/bangladeshi-society"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 rounded-full bg-white px-4 py-2.5 font-semibold text-[#f57c00] shadow-md hover:bg-[#fff5d9] hover:scale-[1.03] transition-transform"
              >
                Membership
              </a>
            </div>
          </div>

          {/* mobile burger */}
          <button
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:text-[#ffb066] focus:outline-none focus:ring-2 focus:ring-white/60"
          >
            <div className="space-y-1.5">
              <span
                className={[
                  "block h-0.5 w-6 bg-white transition",
                  open ? "translate-y-2 rotate-45" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-0.5 w-6 bg-white transition",
                  open ? "opacity-0" : "",
                ].join(" ")}
              />
              <span
                className={[
                  "block h-0.5 w-6 bg-white transition",
                  open ? "-translate-y-2 -rotate-45" : "",
                ].join(" ")}
              />
            </div>
          </button>
        </nav>
      </div>

      {/* mobile drawer */}
      <div
        className={[
          "md:hidden fixed inset-x-0 top-16 md:top-20 z-[9999] origin-top",
          "bg-[linear-gradient(135deg,#ff8c33_0%,#f57c00_100%)]",
          "transition-transform duration-300 will-change-transform",
          open ? "translate-y-0" : "-translate-y-[120%]",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 py-6">
          <ul className="space-y-4 text-white/95 text-lg font-medium">
            {NAV_LINKS.map(({ href, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      "block rounded-full px-3 py-2 transition",
                      "hover:bg-white/15 hover:shadow-[0_0_10px_rgba(255,140,51,0.35)]",
                      active ? "bg-white/20 shadow-[0_0_12px_rgba(255,140,51,0.4)]" : "",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex items-center gap-4">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-md p-1 text-white/95 transition hover:text-[#ffb066]"
              >
                <Icon size={22} />
              </a>
            ))}
          </div>

          <a
            href="https://www.activateuts.com.au/clubs/bangladeshi-society"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full bg-white px-5 py-3 font-semibold text-[#f57c00] shadow-md hover:bg-[#fff5d9] hover:scale-[1.03] transition-transform"
          >
            Membership
          </a>
        </div>
      </div>

      {/* underline effect */}
      <style jsx global>{`
        .nav-underline::after {
          content: "";
          position: absolute;
          left: 12px;
          right: 12px;
          bottom: -6px;
          height: 2px;
          width: 0%;
          margin: 0 auto;
          background: linear-gradient(
            90deg,
            rgba(255, 140, 51, 1) 0%,
            rgba(255, 210, 154, 0.8) 50%,
            rgba(255, 140, 51, 1) 100%
          );
          box-shadow: 0 0 10px rgba(255, 140, 51, 0.45);
          transition: width 220ms ease;
        }
        .nav-underline:hover::after,
        .nav-underline:focus::after {
          width: calc(100% - 24px);
        }
      `}</style>
    </header>
  );
}
