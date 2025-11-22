"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { TeamDept, TeamMember } from "./team.types";
import { filterMembers } from "./team.pure";
import { FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";

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

/** modal with member details */
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
    <div className="fixed inset-0 z-[80] flex items-start md:items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div onClick={stop} className="relative z-[81] w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0e1218] text-orange-50 shadow-2xl">
        <div className="flex gap-4 p-4 md:p-6">
          <img
            src={member.headshot}
            alt={member.name}
            className="size-24 md:size-28 rounded-xl object-cover border border-white/10"
          />
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <h2 className="text-xl md:text-2xl font-semibold text-orange-100">{member.name}</h2>
              <button onClick={onClose} className="ml-auto rounded-full border border-white/15 px-3 py-1.5 text-sm text-orange-200 hover:bg-white/10" aria-label="Close">✕</button>
            </div>
            <p className="text-sm text-orange-300">{member.role} · {member.dept}</p>
            {member.bio && <p className="mt-3 text-orange-100/90 leading-relaxed">{member.bio}</p>}
            <div className="mt-4 flex flex-wrap gap-2">
              {member.email && (
                <a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium border border-white/15 text-orange-200 hover:bg-white/5"><FiMail /> Email</a>
              )}
              {member.instagram && (
                <a href={member.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium border border-white/15 text-orange-200 hover:bg-white/5"><FiInstagram /> Instagram</a>
              )}
              {member.linkedin && (
                <a href={member.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium border border-white/15 text-orange-200 hover:bg-white/5"><FiLinkedin /> LinkedIn</a>
              )}
            </div>
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
      {/* Filters */}
      <section className="px-4 md:px-8 py-6 md:py-8">
        <div className="mx-auto max-w-6xl flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {depts.map((d) => (
              <button
                key={d}
                onClick={() => setDept(d)}
                className={[
                  "px-4 py-2 rounded-full text-sm font-medium border transition",
                  dept === d ? "bg-orange-500 text-black border-orange-500" : "border-white/15 text-orange-200 hover:bg-white/5",
                ].join(" ")}
              >
                {d}
              </button>
            ))}
            <div className="ml-auto w-full sm:w-80">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, role…"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 outline-none placeholder:text-orange-200/50 focus:border-orange-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 md:px-8 pb-10 md:pb-16">
        <div ref={gridRef} className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {visibleItems.map((m) => (
            <article
              key={m.id}
              data-team-card
              role="button"
              tabIndex={0}
              onClick={() => setSelected(m)}
              onKeyDown={(ev) => (ev.key === "Enter" || ev.key === " ") && (ev.preventDefault(), setSelected(m))}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-orange-400/60 transition"
            >
              <div className="relative aspect-[16/12] overflow-hidden">
                <img src={m.headshot} alt={m.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-black/10" />
              </div>
              <div className="p-4 md:p-5">
                <h3 className="text-lg md:text-xl font-semibold text-orange-100">{m.name}</h3>
                <p className="text-sm text-orange-200/80">{m.role} · {m.dept}</p>
                {m.bio && <p className="mt-2 text-sm text-orange-100/80 line-clamp-2">{m.bio}</p>}
                <div className="mt-3 flex items-center gap-3 text-orange-300">
                  {m.instagram && <a href={m.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-orange-200"><FiInstagram /></a>}
                  {m.linkedin && <a href={m.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-orange-200"><FiLinkedin /></a>}
                  {m.email && <a href={`mailto:${m.email}`} aria-label="Email" className="hover:text-orange-200"><FiMail /></a>}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mx-auto max-w-6xl mt-10 text-orange-200/70">No members found.</p>
        )}

        {canLoadMore && (
          <div className="mx-auto max-w-6xl">
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setVisible(filtered.length)} // reveal all on one click
                className="rounded-full px-6 py-3 bg-white/8 border border-white/15 text-orange-100 hover:bg-white/10 hover:border-orange-400/60 transition"
              >
                View More
              </button>
            </div>
          </div>
        )}
      </section>

      <MemberModal member={selected} onClose={() => setSelected(null)} />
    </>
  );
}
