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

      <main className="min-h-screen pt-20 md:pt-24 bg-gradient-to-b from-[#0b0f14] via-[#0d131b] to-[#101820] text-orange-50">
        {/* Hero */}
        <section className="px-4 md:px-8 py-6 md:py-10 border-b border-white/10">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Meet the Team</h1>
            <p className="mt-3 md:mt-4 text-orange-200/80 max-w-2xl">
              We’re a volunteer committee of students and alumni building culture, events, and community at UTS.
            </p>
          </div>
        </section>

        {/* Spotlight (President) */}
        {featured && <TeamSpotlight member={featured} />}

        {/* Grid + modal */}
        <TeamGrid members={TEAM} initialVisible={6} />

        {/* CTA */}
        <JoinTeamCTA />
      </main>

      <Footer />
    </>
  );
}
