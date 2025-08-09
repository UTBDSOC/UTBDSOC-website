"use client";
import React from "react";
import Link from "next/link";

interface FooterLinkProps {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

const FooterLinkSection: React.FC<FooterLinkProps> = ({ title, links }) => (
  <div className="space-y-3">
    <h6 className="text-sm font-semibold tracking-wide text-[#ffa45c]">{title}</h6>
    <ul className="space-y-2">
      {links.map((link, index) => {
        const className =
          "text-sm text-[#9aa4af] hover:text-[#ff7a1a] transition-colors duration-200";
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
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "News & Updates", href: "/news" },
    { label: "About UTSBDSOC", href: "/about" },
  ];

  const getInvolved = [
    { label: "Membership", href: "/membership" },
    { label: "Join the Committee", href: "/get-involved" },
    { label: "Clubs & Partners", href: "/partners" },
    { label: "Sponsorships", href: "/sponsor-us" },
  ];

  const resources = [
    { label: "FAQs", href: "/faq" },
    { label: "Constitution", href: "/documents/constitution" },
    { label: "Brand Assets", href: "/brand" },
    { label: "Press Kit", href: "/press-kit" },
  ];

  const contact = [
    { label: "Email", href: "mailto:utsbangladeshisoc@gmail.com", external: true },
    { label: "Instagram", href: "https://www.instagram.com/utsbdsoc", external: true },
    { label: "UTS Clubs Portal", href: "https://activateuts.com.au/clubs", external: true },
  ];

  return (
    <footer
      className={[
        "w-full border-t",
        "bg-gradient-to-br from-[#0b0f14] via-[#0d131b] to-[#101820]",
        "border-[#2a2f36]",
      ].join(" ")}
    >
      {/* top accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-[#ff7a1a]/70 via-[#ffa45c]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* brand + blurb */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h5 className="text-lg font-bold tracking-tight text-[#C9D1D9]">
              UTS Bangladeshi Society
            </h5>
            <p className="text-sm text-[#9aa4af] max-w-xl">
              Celebrating Bangladeshi culture at UTS through food, music, language,
              and community — open to everyone.
            </p>
          </div>

          {/* social pills */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:utsbangladeshisoc@gmail.com"
              className="rounded-full border border-[#2f353d] bg-[#151a20] px-4 py-2 text-sm font-medium text-[#cbd5e1] hover:border-[#ffa45c]/50 hover:text-[#ffa45c] transition-colors"
            >
              Email Us
            </a>
            <a
              href="https://www.instagram.com/utsbdsoc"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#ff7a1a]/60 bg-[#ff7a1a]/10 px-4 py-2 text-sm font-medium text-[#ffa45c] hover:bg-[#ff7a1a] hover:text-black transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* link columns */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <FooterLinkSection title="Explore" links={explore} />
          <FooterLinkSection title="Get Involved" links={getInvolved} />
          <FooterLinkSection title="Resources" links={resources} />
          <FooterLinkSection title="Contact" links={contact} />
        </div>

        {/* divider */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-[#2a2f36] to-transparent" />

        {/* bottom row */}
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-[#9aa4af] md:flex-row">
          <p>© {year} UTSBDSOC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-[#ff7a1a] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#ff7a1a] transition-colors">
              Terms
            </Link>
            <Link href="/code-of-conduct" className="hover:text-[#ff7a1a] transition-colors">
              Code of Conduct
            </Link>
          </div>
        </div>
      </div>

      {/* subtle glow */}
      <div
        aria-hidden
        className="pointer-events-none mx-auto mb-2 h-6 max-w-7xl rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 0%, rgba(255,122,26,0.18) 0%, rgba(255,122,26,0) 70%)",
        }}
      />
    </footer>
  );
};

export default Footer;
