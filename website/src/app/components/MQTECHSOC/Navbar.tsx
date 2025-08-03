"use client";

import Link from "next/link";
import { 
  FaDiscord, 
  FaGithub, 
  FaYoutube, 
  FaInstagram, 
  FaFacebookF, 
  FaLinkedinIn 
} from "react-icons/fa";

const Navbar: React.FC = () => {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between h-24">
          {/* Branding */}
          <div className="flex-shrink-0 text-[#10B981] font-bold text-3xl">
            MQtechsoc
          </div>

          {/* Individual Nav Links */}
          <ul className="hidden md:flex space-x-8 text-[#10B981] font-medium text-xl">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/events">Events</Link>
            </li>
            <li>
              <Link href="/team">Team</Link>
            </li>
            <li>
              <Link href="/dance">Dance</Link>
            </li>
            <li>
              <Link href="/sports">Sports</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
          </ul>

          {/* Social Icons & Membership Button */}
          <div className="flex items-center space-x-4">
            <Link href="https://discord.com" className="text-[#10B981] hover:opacity-75">
              <FaDiscord size={28} />
            </Link>
            <Link href="https://github.com" className="text-[#10B981] hover:opacity-75">
              <FaGithub size={28} />
            </Link>
            <Link href="https://youtube.com" className="text-[#10B981] hover:opacity-75">
              <FaYoutube size={28} />
            </Link>
            <Link href="https://instagram.com" className="text-[#10B981] hover:opacity-75">
              <FaInstagram size={28} />
            </Link>
            <Link href="https://facebook.com" className="text-[#10B981] hover:opacity-75">
              <FaFacebookF size={28} />
            </Link>
            <Link href="https://linkedin.com" className="text-[#10B981] hover:opacity-75">
              <FaLinkedinIn size={28} />
            </Link>

            <Link 
              href="/membership"
              className="bg-[#10B981] text-white font-medium py-3 px-5 rounded-full hover:bg-[#059669]"
            >
              Membership
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
