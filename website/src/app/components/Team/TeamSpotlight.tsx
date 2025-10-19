"use client";

import { TeamMember } from "./team.types";
import { FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";

export default function TeamSpotlight({ member }: { member: TeamMember }) {
  return (
    <section className="mx-auto max-w-6xl mt-6 px-4 md:px-0">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#141414] via-[#1a1411] to-[#20160f] p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={member.headshot}
            alt={member.name}
            className="size-28 md:size-36 rounded-2xl object-cover border border-white/10"
          />
          <div className="flex-1">
            <p className="text-xs uppercase tracking-[0.2em] text-orange-300/80">Spotlight</p>
            <h3 className="mt-1 text-2xl md:text-3xl font-bold text-orange-50">{member.name}</h3>
            <p className="text-orange-200/90">{member.role} · {member.dept}</p>
            {member.bio && <p className="mt-3 text-orange-100/90 leading-relaxed">{member.bio}</p>}
            <div className="mt-4 flex gap-3 text-orange-300">
              {member.email && <a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"><FiMail /> Email</a>}
              {member.instagram && <a href={member.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"><FiInstagram /> Instagram</a>}
              {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs hover:bg-white/5"><FiLinkedin /> LinkedIn</a>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
