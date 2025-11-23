"use client";

import Link from "next/link";

export default function JoinTeamCTA() {
  return (
    <section className="mx-auto max-w-5xl mt-24 mb-24 px-4 md:px-0">
      
      {/* Industrial Box: Orange BG, Black Border, White Hard Shadow */}
      <div className="relative overflow-hidden rounded-xl border-2 border-black bg-[#ea580c] p-8 md:p-16 text-center shadow-[12px_12px_0px_0px_white] transition-transform hover:translate-y-[-2px]">
        
        {/* Texture Overlay (Multiplied for grit) */}
        <div 
          className="absolute inset-0 opacity-[0.15] mix-blend-multiply pointer-events-none" 
          style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
        />
        
        {/* Decorative Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }} 
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          
          {/* Badge */}
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black uppercase tracking-widest bg-black text-white rounded-sm shadow-[4px_4px_0px_0px_white/50]">
            We Want You
          </span>

          {/* Heading */}
          <h3 className="text-4xl md:text-7xl font-black tracking-tighter text-black uppercase mb-6 leading-[0.9]">
            Join The <span className="text-white text-stroke-black">Committee</span>
          </h3>

          {/* Description */}
          <p className="text-black/80 text-lg md:text-xl font-bold max-w-2xl mb-10 leading-relaxed">
            Help us run events, create content, and build community. 
            We open EOI and subcommittee roles throughout the year.
          </p>

          {/* Action Button (Black with White Shadow) */}
          <Link 
            href="/join" 
            className="group relative inline-flex items-center justify-center gap-3 bg-black text-white px-10 py-4 text-sm font-black uppercase tracking-wide transition-transform hover:-translate-y-1 shadow-[6px_6px_0px_0px_white] active:translate-y-0 active:shadow-[2px_2px_0px_0px_white] rounded-full border-2 border-black"
          >
            See Open Roles
            <svg 
              className="w-4 h-4 transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>

        </div>
      </div>
    </section>
  );
}