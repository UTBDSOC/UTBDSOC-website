"use client";
import React from "react";
import Link from "next/link";

interface FooterLinkProps {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

const FooterLinkSection: React.FC<FooterLinkProps> = ({ title, links }) => (
  <div className="space-y-3">
    <h6 className="text-sm font-semibold tracking-wide text-white/90">{title}</h6>
    <ul className="space-y-2">
      {links.map((link, index) => {
        const className =
          "text-sm text-white/90 hover:text-white transition-colors duration-200";
        return (
          <li key={index}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className={className}>
                {link.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  /* Updated, cleaner link structure */
  const explore = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
  ];

  const ourSociety = [
    { label: "Dance", href: "/dance" },
    { label: "Sports", href: "/sports" },
    { label: "Team", href: "/team" },
    { label: "Community & Culture", href: "/community" },
  ];

  const getInvolved = [
    { label: "Membership", href: "/membership" },
    { label: "Join the Committee", href: "/get-involved" },
    { label: "Sponsor Us", href: "/sponsor-us" },
    { label: "Collaborate / Partner", href: "/partners" },
  ];

  const connect = [
    { label: "Instagram", href: "https://www.instagram.com/utsbdsoc", external: true },
    { label: "Discord", href: "https://discord.gg/wQupZgkK", external: true },
    { label: "YouTube", href: "https://www.youtube.com/@utsbdsoc", external: true },
    { label: "ActivateUTS Portal", href: "https://activateuts.com.au/clubs", external: true },
    { label: "Email Us", href: "mailto:utsbangladeshisoc@gmail.com", external: true },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-[#f57c00] text-white">
      {/* Top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#ffd19a]/60 via-white/30 to-transparent" />

      {/* Subtle dot texture overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12">
        {/* Brand + blurb */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h5 className="text-lg font-bold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
              UTS Bangladeshi Society
            </h5>
            <p className="max-w-xl text-sm text-white/90">
              A welcoming student-led community celebrating Bangladeshi culture at UTS through food, music,
              dance, and unity. Everyone is invited to join our journey.
            </p>
          </div>

          {/* Social pills */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:utsbangladeshisoc@gmail.com"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#f57c00] shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-px hover:shadow-[0_10px_34px_rgba(0,0,0,0.28)]"
            >
              Email Us
            </a>
            <a
              href="https://www.instagram.com/utsbdsoc"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/70 bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#f57c00]"
            >
              Instagram
            </a>
            <a
              href="https://discord.gg/wQupZgkK"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/70 bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-[#f57c00]"
            >
              Discord
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <FooterLinkSection title="Explore" links={explore} />
          <FooterLinkSection title="Our Society" links={ourSociety} />
          <FooterLinkSection title="Get Involved" links={getInvolved} />
          <FooterLinkSection title="Connect" links={connect} />
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-white/90 md:flex-row">
          <p>© {year} UTSBDSOC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/code-of-conduct" className="hover:text-white transition-colors">
              Code of Conduct
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom glow */}
      <div
        aria-hidden
        className="pointer-events-none mx-auto mb-2 h-6 max-w-7xl rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(255,140,51,0.35) 0%, rgba(255,140,51,0) 70%)",
        }}
      />
    </footer>
  );
};

export default Footer;
