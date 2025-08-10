"use client";

import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion, useReducedMotion } from "framer-motion";
import useMeasure from "react-use-measure";

/** Types for optional custom data */
export type FAQItem = { q: string; a: React.ReactNode };

export default function FAQ({
  title = "Events FAQ",
  items = DEFAULT_ITEMS,
  defaultOpenIndex = 0,
}: {
  title?: string;
  items?: FAQItem[];
  defaultOpenIndex?: number;
}) {
  return (
    <section className="mx-auto max-w-6xl mt-14 mb-6 px-4">
      <h3 className="text-center text-2xl md:text-3xl font-semibold text-orange-100">
        {title}
      </h3>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm divide-y divide-white/10">
        {items.map((it, i) => (
          <Question key={i} title={it.q} defaultOpen={i === defaultOpenIndex}>
            {it.a}
          </Question>
        ))}
      </div>
    </section>
  );
}

/** Single expandable Q */
function Question({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [ref, { height }] = useMeasure();
  const [open, setOpen] = useState(defaultOpen);
  const prefersReduced = useReducedMotion();

  return (
    <motion.div animate={open ? "open" : "closed"} className="px-4 md:px-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5"
        aria-expanded={open}
      >
        <motion.span
          className="text-left text-base md:text-lg font-medium"
          variants={
            prefersReduced
              ? undefined
              : {
                  open: { color: "rgb(255 237 213)" }, // orange-100
                  closed: { color: "rgb(253 186 116)" }, // orange-300
                }
          }
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.span>

        <motion.span
          className="shrink-0"
          variants={
            prefersReduced
              ? undefined
              : {
                  open: { rotate: 180, color: "rgb(251 146 60)" }, // orange-400
                  closed: { rotate: 0, color: "rgb(253 186 116)" }, // orange-300
                }
          }
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          aria-hidden="true"
        >
          <FiChevronDown className="text-2xl" />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{
          height: open ? height : 0,
          marginBottom: open ? 16 : 0,
        }}
        className="overflow-hidden"
      >
        <div
          ref={ref}
          className="pb-4 text-sm md:text-base leading-relaxed text-orange-200/85"
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Default Q&A tuned for UTSBDSOC events */
const DEFAULT_ITEMS: FAQItem[] = [
  {
    q: "Do I need to be Bangladeshi (or a UTS student) to attend?",
    a: (
      <>
        Everyone’s welcome! Most events are open to all universities and the
        public unless marked otherwise. Members‑only events will be clearly
        labelled on the card.
      </>
    ),
  },
  {
    q: "Are events free?",
    a: (
      <>
        Many socials are free. Large cultural nights (venue, catering,
        performers) may be ticketed. Members usually get early access and
        discounted pricing.
      </>
    ),
  },
  {
    q: "How do I RSVP or buy tickets?",
    a: (
      <>
        Open any event card and use the <span className="font-semibold">RSVP</span> or ticket link.
        We use Google Forms or Eventbrite. If it’s full, join the waitlist—extra spots often open.
      </>
    ),
  },
  {
    q: "Where do events usually happen?",
    a: (
      <>
        Mostly on the UTS campus (Buildings 1, 2, 8, 11). Sports/picnics are
        nearby (Centennial Park, Moore Park, indoor courts). Check the map link
        on each event.
      </>
    ),
  },
  {
    q: "What should I bring?",
    a: (
      <>
        Student ID for campus access, water, and good vibes. For sports: runners
        and a small towel. For cultural nights: semi‑formal looks great in pics
        (optional).
      </>
    ),
  },
  {
    q: "I can no longer attend—how do I cancel?",
    a: (
      <>
        Use the confirmation email/form to withdraw, or message us on Instagram.
        Cancel early so we can offer your spot to the waitlist.
      </>
    ),
  },
  {
    q: "How can I volunteer or get involved?",
    a: (
      <>
        Keep an eye on our socials and events page for volunteer callouts, or
        chat to a committee member at any event—always happy to have helping hands.
      </>
    ),
  },
];
