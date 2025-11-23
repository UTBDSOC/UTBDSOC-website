"use client";

import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export type FAQItem = { q: string; a: React.ReactNode };

export default function FAQ({
  title = "Events FAQ",
  items = DEFAULT_ITEMS,
}: {
  title?: string;
  items?: FAQItem[];
}) {
  // Track open state by index (null = all closed)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-4xl mt-24 mb-24 px-4 md:px-0">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
         <span className="h-[3px] w-12 bg-[#ea580c]"></span>
         <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white">
           {title}
         </h3>
      </div>

      {/* FAQ List */}
      <div className="flex flex-col gap-4">
        {items.map((it, i) => (
          <Question 
            key={i} 
            title={it.q} 
            isOpen={i === openIndex} 
            onClick={() => setOpenIndex(i === openIndex ? null : i)}
          >
            {it.a}
          </Question>
        ))}
      </div>
    </section>
  );
}

function Question({
  title,
  children,
  isOpen,
  onClick,
}: {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div 
      className={`
        border-2 border-white/10 bg-[#121212] transition-colors duration-300
        ${isOpen ? "border-[#ea580c] shadow-[4px_4px_0px_0px_#ea580c]" : "hover:border-white/30"}
      `}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className={`text-base md:text-lg font-bold uppercase tracking-wide transition-colors ${isOpen ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
          {title}
        </span>

        <span 
          className={`flex items-center justify-center w-8 h-8 border-2 transition-all duration-300 ${isOpen ? "bg-[#ea580c] border-[#ea580c] text-black rotate-180" : "border-white/20 text-white rotate-0"}`}
        >
          {isOpen ? <FiMinus size={18} strokeWidth={4} /> : <FiPlus size={18} strokeWidth={4} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 text-gray-400 font-medium leading-relaxed text-sm md:text-base border-t border-white/5 mt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const DEFAULT_ITEMS: FAQItem[] = [
  {
    q: "Do I need to be Bangladeshi to attend?",
    a: "Everyone is welcome! Most events are open to all universities and the public unless marked otherwise. Members-only events will be clearly labelled.",
  },
  {
    q: "Are events free?",
    a: "Many socials are free. Large cultural nights (venue, catering, performers) may be ticketed. Members usually get early access and discounted pricing.",
  },
  {
    q: "How do I RSVP or buy tickets?",
    a: "Open any event card above and use the RSVP or ticket link. We use Humanitix or Google Forms. If it’s full, join the waitlist—spots often open up.",
  },
  {
    q: "Where do events usually happen?",
    a: "Mostly on the UTS campus (Buildings 1, 2, 8, 11). Sports and picnics are nearby (Centennial Park, Moore Park). Check the map link on each event card.",
  },
  {
    q: "What should I bring?",
    a: "Student ID for campus access, water, and good vibes. For sports: runners and a small towel. For cultural nights: semi-formal or traditional attire looks great.",
  },
  {
    q: "I can no longer attend—how do I cancel?",
    a: "Use the confirmation email to withdraw, or message us on Instagram. Canceling early helps us offer your spot to someone on the waitlist.",
  },
  {
    q: "How can I volunteer?",
    a: "Keep an eye on our socials for volunteer callouts, or chat to a committee member at any event—we are always happy to have helping hands.",
  },
];