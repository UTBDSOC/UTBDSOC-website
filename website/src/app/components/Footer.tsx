"use client";
import React from "react";
import Link from "next/link";

interface FooterLinkProps {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

const FooterLinkSection: React.FC<FooterLinkProps> = ({ title, links }) => (
  <div className="space-y-4">
    {/* Industrial Header Style */}
    <h6 className="text-xs font-black uppercase tracking-[0.2em] text-black/70 border-b-2 border-black/10 pb-2 inline-block">
      {title}
    </h6>
    <ul className="space-y-2.5">
      {links.map((link, index) => {
        const className =
          "text-sm font-bold text-white transition-all duration-200 hover:text-black hover:pl-1";
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
    <footer
      className="relative w-full overflow-hidden text-white mt-[-1px] bg-[#ea580c]"
    >
      {/* ------------------------------------------------------
          TEXTURE LAYER (The "Industrial Paper" Look)
         ------------------------------------------------------ */}
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

      {/* Dot Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }} 
      />

      {/* Top Hard Border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-black/10" />

      {/* ---- Content ---- */}
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
        
        {/* Brand + tagline */}
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-start md:justify-between border-b-2 border-black/10 pb-12">
          <div className="space-y-4 max-w-lg">
            <h5 className="text-3xl md:text-4xl font-black tracking-tight text-white shadow-black drop-shadow-sm">
              UTS BDSOC
            </h5>
            <p className="text-base font-medium text-black/80 leading-relaxed">
              A welcoming student-led community celebrating Bangladeshi culture
              at UTS through food, music, dance, and unity.
            </p>
          </div>

          {/* Social buttons - White Pill with HARD BLACK SHADOW */}
          <div className="flex flex-wrap items-center gap-3">
            {[
              { label: "Email Us", href: "mailto:utsbangladeshisoc@gmail.com" },
              { label: "Instagram", href: "https://www.instagram.com/utsbdsoc" },
              { label: "Discord", href: "https://discord.gg/wQupZgkK" }
            ].map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black shadow-[4px_4px_0px_0px_black] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] active:translate-y-0 active:shadow-[2px_2px_0px_0px_black] border-2 border-black"
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>

        {/* Link sections */}
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4">
          <FooterLinkSection title="Explore" links={explore} />
          <FooterLinkSection title="Our Society" links={ourSociety} />
          <FooterLinkSection title="Get Involved" links={getInvolved} />
          <FooterLinkSection title="Connect" links={connect} />
        </div>

        {/* Bottom row */}
        <div className="mt-20 pt-8 border-t-2 border-black/10 flex flex-col-reverse items-center justify-between gap-6 md:flex-row">
          <p className="text-sm font-bold text-black/60">
            © {year} UTSBDSOC. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-sm font-bold text-white">
            <Link href="/privacy-policy" className="hover:text-black hover:underline decoration-2 underline-offset-4 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-black hover:underline decoration-2 underline-offset-4 transition-colors">
              Terms
            </Link>
            <Link href="/code-of-conduct" className="hover:text-black hover:underline decoration-2 underline-offset-4 transition-colors">
              Code of Conduct
            </Link>
          </div>
        </div>

        {/* Giant Watermark (Industrial Touch) */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 opacity-[0.03] whitespace-nowrap select-none">
           <span className="text-[150px] font-black text-black leading-none">UTSBDSOC</span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;