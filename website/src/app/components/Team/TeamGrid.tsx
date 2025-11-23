"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { TeamDept, TeamMember } from "./team.types";
import { filterMembers } from "./team.pure";
import { FiInstagram, FiLinkedin, FiMail, FiX } from "react-icons/fi";

/** estimate current grid columns (reserved in case you want row-based chunking later) */
function useGridColumns(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [cols, setCols] = useState(1);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const compute = () => {
      const first = el.querySelector("[data-team-card]") as HTMLElement | null;
      if (!first) return setCols(1);
      const rowWidth = el.clientWidth, cardWidth = first.clientWidth, gutter = 16;
      setCols(Math.max(1, Math.floor((rowWidth + gutter) / (cardWidth + gutter))));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);
  return cols;
}

/** simple body scroll lock for modal */
function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    const original = document.body.style.overflow;
    if (active) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, [active]);
}

/** Industrial Modal with member details */
function MemberModal({ member, onClose }: { member: TeamMember | null; onClose: () => void }) {
  useBodyScrollLock(Boolean(member));
  
  useEffect(() => {
    if (!member) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [member, onClose]);
  
  if (!member) return null;
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={onClose}>
      <div 
        onClick={stop} 
        className="relative w-full max-w-2xl bg-[#121212] border-2 border-white/10 shadow-[0_0_40px_-10px_rgba(234,88,12,0.3)] rounded-xl overflow-hidden flex flex-col md:flex-row"
      >
         {/* Left: Image */}
         <div className="md:w-2/5 bg-black relative h-64 md:h-auto border-b-2 md:border-b-0 md:border-r-2 border-white/10">
            <img
              src={member.headshot}
              alt={member.name}
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
         </div>

         {/* Right: Content */}
         <div className="flex-1 p-8 md:p-10 flex flex-col justify-center bg-[#121212]">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <h2 className="text-3xl font-black text-white uppercase leading-none">{member.name}</h2>
                  <p className="text-[#ea580c] font-bold text-sm mt-1 uppercase tracking-wide">{member.role}</p>
               </div>
               <button onClick={onClose} className="text-white hover:text-[#ea580c] transition-colors">
                  <FiX size={24} />
               </button>
            </div>

            <div className="w-12 h-[2px] bg-[#ea580c] mb-6"></div>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 font-medium">
               {member.bio || "A dedicated member of the UTS Bangladeshi Society team, contributing to our community and events."}
            </p>

            <div className="mt-auto flex gap-3">
               {member.email && (
                 <a href={`mailto:${member.email}`} className="p-3 bg-[#1a1a1a] border border-white/10 text-white hover:border-[#ea580c] hover:text-[#ea580c] transition-all rounded-md"><FiMail size={18} /></a>
               )}
               {member.instagram && (
                 <a href={member.instagram} target="_blank" rel="noreferrer" className="p-3 bg-[#1a1a1a] border border-white/10 text-white hover:border-[#ea580c] hover:text-[#ea580c] transition-all rounded-md"><FiInstagram size={18} /></a>
               )}
               {member.linkedin && (
                 <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-[#1a1a1a] border border-white/10 text-white hover:border-[#ea580c] hover:text-[#ea580c] transition-all rounded-md"><FiLinkedin size={18} /></a>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}

export default function TeamGrid({
  members,
  initialVisible = 6,
  depts = ["All", "Executive", "Events", "Media", "Sponsorship", "Sports", "Tech", "Community"] as const,
}: {
  members: TeamMember[];
  initialVisible?: number;
  depts?: readonly ("All" | TeamDept)[];
}) {
  const [dept, setDept] = useState<(typeof depts)[number]>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<TeamMember | null>(null);

  const gridRef = useRef<HTMLDivElement>(null);
  useGridColumns(gridRef);
  const [visible, setVisible] = useState(initialVisible);

  const filtered = useMemo(() => filterMembers(members, dept, query), [members, dept, query]);

  useEffect(() => { setVisible(initialVisible); }, [dept, query, initialVisible]);

  const visibleItems = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  return (
    <>
      {/* Filters Section */}
      <section className="px-4 md:px-8 py-8 border-b border-white/10">
        <div className="mx-auto max-w-6xl flex flex-col gap-6">
          
          {/* Search Bar */}
          <div className="w-full">
             <input
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="SEARCH TEAM..."
               className="w-full bg-[#121212] border-2 border-white/10 p-4 text-white font-bold placeholder:text-gray-600 focus:outline-none focus:border-[#ea580c] text-lg uppercase tracking-wider"
             />
          </div>

          {/* Department Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[#ea580c] font-black text-xs uppercase tracking-widest mr-2 border-r-2 border-white/10 pr-4 py-1">
               Department:
            </span>
            {depts.map((d) => (
              <button
                key={d}
                onClick={() => setDept(d)}
                className={[
                  "px-4 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-all border-2",
                  dept === d 
                    ? "bg-[#ea580c] border-[#ea580c] text-white shadow-[2px_2px_0px_0px_white]" 
                    : "bg-transparent border-white/20 text-gray-400 hover:border-white hover:text-white",
                ].join(" ")}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="px-4 md:px-8 py-12 md:py-20 bg-[#0b0f14]">
        <div ref={gridRef} className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((m) => (
            <article
              key={m.id}
              data-team-card
              role="button"
              tabIndex={0}
              onClick={() => setSelected(m)}
              onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && (ev.preventDefault(), setSelected(m))}
              className="group cursor-pointer flex flex-col bg-[#121212] border border-white/10 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#ea580c] hover:border-white/30"
            >
              {/* Image */}
              <div className="relative aspect-[4/4] w-full overflow-hidden border-b border-white/10 bg-black">
                <img 
                  src={m.headshot} 
                  alt={m.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <span className="bg-[#ea580c] text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest shadow-lg">
                     View Profile
                   </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-xl font-black text-white uppercase leading-tight group-hover:text-[#ea580c] transition-colors">
                     {m.name}
                   </h3>
                </div>
                <p className="text-[#ea580c] text-xs font-bold uppercase tracking-wide mb-3">{m.role}</p>
                
                {/* Divider */}
                <div className="w-full h-px bg-white/10 mb-4"></div>

                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                   {m.dept} Department
                </p>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-xl max-w-2xl mx-auto">
             <p className="text-gray-500 font-bold uppercase tracking-widest">No team members found.</p>
          </div>
        )}

        {canLoadMore && (
          <div className="mx-auto max-w-6xl mt-16 flex justify-center">
            <button
              onClick={() => setVisible(filtered.length)}
              className="group px-8 py-3 rounded-full bg-white text-black text-sm font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_#ea580c] hover:-translate-y-1 active:translate-y-0 active:shadow-[2px_2px_0px_0px_#ea580c] transition-all"
            >
              Show All Members
            </button>
          </div>
        )}
      </section>

      <MemberModal member={selected} onClose={() => setSelected(null)} />
    </>
  );
}