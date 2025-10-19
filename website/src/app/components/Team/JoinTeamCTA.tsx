"use client";

import Link from "next/link";

export default function JoinTeamCTA() {
  return (
    <section className="mx-auto max-w-6xl mt-14 px-4 md:px-0">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
        <h3 className="text-2xl md:text-3xl font-bold text-orange-50">Join the Committee</h3>
        <p className="mt-3 text-orange-200/85 max-w-2xl">
          Help us run events, create content, and build community. We open EOI and subcommittee roles throughout the year.
        </p>
        <div className="mt-6">
          <Link href="/join" className="rounded-full px-6 py-3 bg-orange-500 text-black font-semibold hover:bg-orange-400">
            See Open Roles
          </Link>
        </div>
      </div>
    </section>
  );
}
