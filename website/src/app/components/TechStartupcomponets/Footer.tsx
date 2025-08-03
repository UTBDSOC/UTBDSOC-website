import React from 'react';
import Link from 'next/link';

interface FooterLinkProps {
  title: string;
  links: { label: string; href: string }[];
}

const FooterLinkSection: React.FC<FooterLinkProps> = ({ title, links }) => (
  <div className="space-y-2">
    <h6 className="footer-title font-semibold text-[#87CEEB]">{title}</h6>
    {links.map((link, index) => (
      <Link
        key={index}
        href={link.href}
        className="link link-hover text-[#B0C4DE] hover:text-[#87CEEB] block transition duration-300"
      >
        {link.label}
      </Link>
    ))}
  </div>
);

const Footer: React.FC = () => {
  const serviceLinks = [
    { label: "Website Development", href: "/services/websiteDevelopment" },
    { label: "SEO Optimization", href: "/services/seoOptimization" },
    { label: "Social Media Management", href: "/services/socialMediaManagement" },
    { label: "Content Creation", href: "/services/contentCreation" },
    { label: "Email Marketing", href: "/services/emailMarketing" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Press Kit", href: "/press-kit" },
  ];

  const legalLinks = [
    { label: "Terms of Use", href: "/terms-of-use" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ];

  return (
    <footer className="w-full bg-black text-[#B0C4DE] border-t border-[#1E90FF]">
      {/* Footer Links */}
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between gap-8 p-10">
        <FooterLinkSection title="Services" links={serviceLinks} />
        <FooterLinkSection title="Company" links={companyLinks} />
        <FooterLinkSection title="Legal" links={legalLinks} />
      </div>

      {/* Bottom Text */}
      <div className="mt-8 text-center text-sm text-[#87CEEB]">
        © 2024 Rank2Revenue. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
