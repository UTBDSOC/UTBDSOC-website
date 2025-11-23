"use client";

import Image from "next/image";
import Link from "next/link";
import { TeamMember } from "./team.types";
import { FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";

export default function TeamSpotlight({ member }: { member: TeamMember }) {
  return (
    <section className="mx-auto max-w-5xl mt-12 mb-20 px-4 md:px-0">
      
      {/* Industrial Container */}
      <div className="group relative overflow-hidden rounded-2xl border-2 border-white/10 bg-[#121212] shadow-[8px_8px_0px_0px_#ea580c] hover:translate-y-[-2px] transition-transform duration-300">
        
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        
        {/* Diagonal stripe decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row">
          
          {/* Left: Image Column */}
          <div className="md:w-1/3 relative min-h-[300px] md:min-h-full border-b-2 md:border-b-0 md:border-r-2 border-white/10 bg-black">
            <Image
              src={member.headshot}
              alt={member.name}
              fill
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            {/* Image Overlay */}
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none" />
            
            {/* Floating Badge */}
            <div className="absolute top-4 left-4 bg-[#ea580c] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 shadow-[2px_2px_0px_0px_white]">
              Spotlight
            </div>
          </div>

          {/* Right: Content Column */}
          <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
            
            {/* Header */}
            <div className="mb-6">
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase leading-[0.9] mb-2">
                {member.name}
              </h3>
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[#ea580c]"></span>
                <p className="text-[#ea580c] font-bold uppercase tracking-widest text-sm">
                  {member.role} <span className="text-white/30 mx-2">|</span> {member.dept}
                </p>
              </div>
            </div>

            {/* Bio */}
            {member.bio && (
              <p className="text-gray-400 font-medium leading-relaxed text-sm md:text-base mb-8 border-l-2 border-white/10 pl-4">
                {member.bio}
              </p>
            )}

            {/* Social Actions */}
            <div className="flex flex-wrap gap-3 mt-auto">
              {member.email && (
                <a 
                  href={`mailto:${member.email}`} 
                  className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-white/20 text-white text-xs font-bold uppercase tracking-wide hover:bg-[#ea580c] hover:border-[#ea580c] hover:text-black transition-colors"
                >
                  <FiMail size={16} /> Email
                </a>
              )}
              
              {member.instagram && (
                <Link 
                  href={member.instagram} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-white/20 text-white text-xs font-bold uppercase tracking-wide hover:bg-[#ea580c] hover:border-[#ea580c] hover:text-black transition-colors"
                >
                  <FiInstagram size={16} /> Instagram
                </Link>
              )}
              
              {member.linkedin && (
                <Link 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-white/20 text-white text-xs font-bold uppercase tracking-wide hover:bg-[#ea580c] hover:border-[#ea580c] hover:text-black transition-colors"
                >
                  <FiLinkedin size={16} /> LinkedIn
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}