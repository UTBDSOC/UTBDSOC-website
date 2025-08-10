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

const links = [
  { href: "/home", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/dance", label: "Dance" },
  { href: "/sports", label: "Sports" },
  { href: "/gallery", label: "Gallery" },
];

const socials = [
  { href: "https://discord.gg/wQupZgkK", icon: FaDiscord, label: "Discord" },
  { href: "https://github.com/UTBDSOC", icon: FaGithub, label: "GitHub" },
  { href: "https://youtube.com/@utsbdsoc", icon: FaYoutube, label: "YouTube" },
  { href: "https://instagram.com/utsbdsoc", icon: FaInstagram, label: "Instagram" },
  { href: "https://facebook.com/groups/uts.bdsociety", icon: FaFacebookF, label: "Facebook" },
  { href: "https://www.linkedin.com/company/uts-bangladeshi-society", icon: FaLinkedinIn, label: "LinkedIn" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={[
        "fixed top-0 left-0 w-full z-[9999]", // sit above everything
        "supports-[backdrop-filter]:bg-black/10", // subtle tint
      ].join(" ")}
    >
      {/* slim accent bar */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      {/* Nav bar container (gets a tiny blur on hover) */}
      <div className="transition">
        <div className="mx-auto max-w-7xl px-4">
          <nav
            className={[
              "flex h-20 items-center gap-4",
              "supports-[backdrop-filter]:backdrop-blur-0 hover:supports-[backdrop-filter]:backdrop-blur-[2px]",
              "border-b border-transparent hover:border-orange-500/10",
            ].join(" ")}
          >
            {/* Branding (left) */}
            <Link
              href="/"
              className="flex-shrink-0 font-extrabold text-2xl md:text-3xl tracking-tight text-orange-400 hover:text-orange-300 transition"
            >
              UTSBDSOC
            </Link>

            {/* Push everything else to the right */}
            <div className="ml-auto hidden md:flex items-center gap-6">
              {/* Desktop links (right-aligned) */}
              <ul className="flex items-center gap-2 font-medium text-lg">
                {links.map(({ href, label }) => {
                  const active =
                    href === "/" ? pathname === "/" : pathname.startsWith(href);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={[
                          "relative nav-underline rounded-md",
                          "px-2 py-1 -mx-2 -my-1",
                          "transition",
                          // tiny glass hover
                          "hover:bg-white/5 hover:supports-[backdrop-filter]:backdrop-blur-[2px]",
                          active
                            ? "text-orange-300"
                            : "text-orange-200/80 hover:text-orange-200",
                        ].join(" ")}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Divider */}
              <span className="h-6 w-px bg-orange-500/20" />

              {/* Socials (far right) */}
              <div className="flex items-center gap-3">
                {socials.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    aria-label={label}
                    className="rounded-md p-1 text-orange-300/90 hover:text-orange-200 hover:bg-white/5 hover:supports-[backdrop-filter]:backdrop-blur-[2px] transition"
                  >
                    <Icon size={20} />
                  </Link>
                ))}
                <Link
                  href="https://www.activateuts.com.au/clubs/bangladeshi-society"
                  className="ml-1 rounded-full bg-orange-500 px-4 py-2.5 font-semibold text-black shadow hover:bg-orange-400 transition will-change-transform transform-gpu hover:-translate-y-0.5"
                >
                  Membership
                </Link>
              </div>
            </div>

            {/* Mobile: hamburger */}
            <button
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-orange-300 hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <span className="sr-only">Open menu</span>
              <div className="space-y-1.5">
                <span
                  className={[
                    "block h-0.5 w-6 bg-orange-300 transition",
                    open ? "translate-y-2 rotate-45" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "block h-0.5 w-6 bg-orange-300 transition",
                    open ? "opacity-0" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "block h-0.5 w-6 bg-orange-300 transition",
                    open ? "-translate-y-2 -rotate-45" : "",
                  ].join(" ")}
                />
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={[
          "md:hidden fixed inset-x-0 top-20 z-[9999] origin-top bg-[#1b1b1b]/95 border-t border-orange-500/20",
          "transition-transform duration-200 will-change-transform transform-gpu",
          open ? "translate-y-0" : "-translate-y-[120%]",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 py-6">
          <ul className="space-y-4 text-orange-200/90 text-lg font-medium">
            {links.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      "block py-2 rounded-md",
                      "hover:bg-white/5 hover:supports-[backdrop-filter]:backdrop-blur-[2px]",
                      active ? "text-orange-300" : "hover:text-orange-200",
                    ].join(" ")}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex items-center gap-4">
            {socials.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="rounded-md p-1 text-orange-300/90 hover:text-orange-200 hover:bg-white/5 hover:supports-[backdrop-filter]:backdrop-blur-[2px] transition"
              >
                <Icon size={22} />
              </Link>
            ))}
          </div>

          <Link
            href="/membership"
            className="mt-6 inline-flex rounded-full bg-orange-500 px-5 py-3 font-semibold text-black shadow hover:bg-orange-400 transition"
          >
            Membership
          </Link>
        </div>
      </div>

      {/* underline effect */}
      <style jsx global>{`
        .nav-underline::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          height: 2px;
          width: 0%;
          background: linear-gradient(
            90deg,
            rgba(255, 140, 0, 1) 0%,
            rgba(255, 140, 0, 0.2) 100%
          );
          transition: width 200ms ease;
        }
        .nav-underline:hover::after,
        .nav-underline:focus::after {
          width: 100%;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
