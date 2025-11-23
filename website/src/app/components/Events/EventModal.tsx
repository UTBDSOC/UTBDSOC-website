"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { FiX, FiMapPin, FiCalendar, FiClock } from "react-icons/fi"; 
import { EventItem } from "./events.types";
import { useBodyScrollLock, resolveEventImage, googleCalLink } from "./events.utils";

interface EventModalProps {
  event: EventItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventModal({ event, isOpen, onClose }: EventModalProps) {
  
  useBodyScrollLock(isOpen);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 sm:px-6">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
          >
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            >
              <FiX size={20} />
            </button>

            {/* Scrollable Area */}
            <div className="overflow-y-auto">
              {/* Image Header */}
              <div className="relative h-64 sm:h-80 w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${resolveEventImage(event)})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 -mt-12 relative z-10">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.map((tag) => (
                    <span key={tag} className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 leading-tight">
                  {event.title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-sm text-neutral-300">
                  <div className="flex items-center gap-3">
                    <FiCalendar className="text-orange-500 text-lg" />
                    <span>{format(new Date(event.startISO), "EEEE, MMMM do, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiClock className="text-orange-500 text-lg" />
                    <span>
                      {format(new Date(event.startISO), "h:mm a")} 
                      {event.endISO ? ` - ${format(new Date(event.endISO), "h:mm a")}` : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 sm:col-span-2">
                    <FiMapPin className="text-orange-500 text-lg" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="prose prose-invert prose-orange max-w-none text-neutral-300 mb-8 leading-relaxed text-base">
                  <p>{event.description}</p>
                </div>

                {/* Footer / CTA */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                  <a
                    href={event.rsvpUrl || "#"}
                    className="flex-1 text-center bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-orange-900/20"
                  >
                    Get Tickets / RSVP
                  </a>
                  <a
                    href={googleCalLink(event)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors"
                  >
                    Add to Calendar
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}