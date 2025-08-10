"use client";

import Link from "next/link";

export default function MembershipCTA() {
  return (
    <section className="mx-auto max-w-6xl mt-14">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1b1b1b] via-[#221c19] to-[#2d1f15] p-8 md:p-12">
        <h3 className="text-2xl md:text-3xl font-bold text-orange-50">Join UTSBDSOC Today</h3>
        <p className="mt-3 text-orange-200/85 max-w-2xl">
          Members get priority access to tickets, discounts, and a community that feels like home.
        </p>
        <div className="mt-6">
          <Link href="https://www.activateuts.com.au/clubs/bangladeshi-society" className="rounded-full px-6 py-3 bg-orange-500 text-black font-semibold hover:bg-orange-400">
            Become a Member
          </Link>
        </div>
      </div>
    </section>
  );
}
