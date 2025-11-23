"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import TeamGrid from "../components/Team/TeamGrid";
import TeamSpotlight from "../components/Team/TeamSpotlight";
import JoinTeamCTA from "../components/Team/JoinTeamCTA";
import { TEAM } from "../components/Team/team.data";
import { featuredMember } from "../components/Team/team.pure";

export default function TeamsPage() {
  const featured = featuredMember(TEAM);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0b0f14] text-white pt-24 pb-24 relative overflow-hidden">
        
        {/* 1. NOISE TEXTURE */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />

        {/* 2. GRID PATTERN */}
        <div 
          className="absolute inset-0 opacity-[0.1] pointer-events-none"
          style={{ 
            backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />

        {/* 3. TOP BORDER ACCENT */}
        <div className="absolute top-24 left-0 right-0 h-px bg-white/10" />

        <div className="relative z-10">

          {/* HERO HEADER (Industrial Style) */}
          <section className="px-6 md:px-12 py-16 relative max-w-7xl mx-auto text-center border-b-2 border-white/10 mb-12">
             <div className="flex items-center justify-center gap-3 mb-4">
               <span className="h-[2px] w-12 bg-[#ea580c] shadow-[2px_2px_0px_0px_white]"></span>
               <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">
                 Leadership
               </span>
               <span className="h-[2px] w-12 bg-[#ea580c] shadow-[2px_2px_0px_0px_white]"></span>
             </div>
             <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-sm mb-6 uppercase">
               Meet The <span className="text-[#ea580c]">Team</span>
             </h1>
             <p className="max-w-2xl mx-auto text-lg text-gray-400 font-medium leading-relaxed">
               We’re a volunteer committee of students and alumni building culture, events, and community at UTS.
             </p>
          </section>

          {/* Spotlight (President) */}
          {featured && <TeamSpotlight member={featured} />}

          {/* Grid + modal */}
          <TeamGrid members={TEAM} initialVisible={6} />

          {/* CTA */}
          <JoinTeamCTA />

        </div>
      </main>

      <Footer />
    </>
  );
}