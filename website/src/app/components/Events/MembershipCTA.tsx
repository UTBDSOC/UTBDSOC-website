"use client";

import Link from "next/link";

export default function MembershipCTA() {
  return (
    <section className="mx-auto max-w-5xl mt-20 mb-20 px-4 md:px-0">
      <div className="relative overflow-hidden rounded-xl border-2 border-white/10 bg-[#121212] p-8 md:p-16 text-center shadow-2xl">
        
        {/* Texture & Grid */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ea580c 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* Industrial Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#ea580c]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#ea580c]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#ea580c]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#ea580c]" />

        <div className="relative z-10 flex flex-col items-center">
          
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black uppercase tracking-widest bg-[#ea580c] text-white rounded-sm shadow-[3px_3px_0px_0px_white]">
            Join The Club
          </span>

          {/* Heading */}
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-6 leading-[0.9]">
            Become a <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Member</span>
          </h3>

          {/* Description */}
          <p className="mt-2 text-gray-400 max-w-2xl text-lg font-medium leading-relaxed mb-10">
            Get priority access to tickets, exclusive discounts, and join a community that feels like home. Don't miss out on the chaos.
          </p>

          {/* Action Button */}
          <Link 
            href="https://www.activateuts.com.au/clubs/bangladeshi-society" 
            className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-4 text-sm font-black uppercase tracking-wide transition-transform hover:-translate-y-1 shadow-[6px_6px_0px_0px_#ea580c] active:translate-y-0 active:shadow-[2px_2px_0px_0px_#ea580c] rounded-full border-2 border-white"
          >
            Sign Up Now
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}