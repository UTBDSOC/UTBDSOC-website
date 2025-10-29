"use client";
import React, { useMemo, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import GalleryPreview from "../components/GalleryPreview";
import PastHighlights from "../components/PastHighlights";
import Footer from "../components/Footer";
import EventCard, { type EventCardProps } from "../components/EventCard";

export default function Home() {
  // Master list (future + past). Sydney offsets:
  // Sep = UTC+10, Oct/Nov/Dec = UTC+11
  const events: EventCardProps[] = [
    {
      title: "Games Night – Trimester 3",
      tags: ["Games", "Social"],
      description:
        "Join us for a night of board games, card games, and video games! Meet new friends and unwind before mid-semester.",
      imageUrl: "/games-night-t3-2025.webp",
      startISO: "2025-09-20T18:00:00+10:00",
      endISO: "2025-09-20T22:00:00+10:00",
      location: "UTS Building 2, Student Lounge",
      locationUrl: "https://maps.app.goo.gl/fr7ErzXpVXbLjw83A",
      status: "UPCOMING",
      buttonText: "Register",
      buttonLink: "https://events.humanitix.com/utsbdsoc-games-night-t3-2025",
    },
    {
      title: "Shondortra 2025",
      tags: ["Cultural", "Performance"],
      description:
        "Experience an evening of captivating performances, cultural showcases, and artistic expression at Shondortra.",
      imageUrl: "/shondortra-2025.webp",
      startISO: "2025-09-25T18:30:00+10:00",
      endISO: "2025-09-25T22:30:00+10:00",
      location: "UTS Great Hall",
      locationUrl: "https://maps.app.goo.gl/fr7ErzXpVXbLjw83A",
      status: "LIMITED",
      capacityUsed: 200,
      capacityTotal: 350,
      buttonText: "Buy Tickets",
      buttonLink: "https://events.humanitix.com/utsbdsoc-shondortra-2025",
    },
    {
      title: "Movie Night",
      tags: ["Movie", "Chill"],
      description:
        "Relax with friends and enjoy a popular Bangladeshi film on the big screen. Free popcorn for all attendees!",
      imageUrl: "/movie-night.jpg",
      startISO: "2025-10-10T18:30:00+11:00",
      endISO: "2025-10-10T21:00:00+11:00",
      location: "UTS Building 6, Room 101",
      locationUrl: "https://maps.app.goo.gl/fr7ErzXpVXbLjw83A",
      status: "UPCOMING",
      buttonText: "Reserve Seat",
      buttonLink: "#",
    },
    {
      title: "Study Jam",
      tags: ["Study", "Support"],
      description:
        "Join our group study session before finals! Snacks, music, and peer support provided.",
      imageUrl: "/study-jam.jpg",
      startISO: "2025-11-01T16:00:00+11:00",
      endISO: "2025-11-01T20:00:00+11:00",
      location: "UTS Library, Level 4",
      locationUrl: "https://maps.app.goo.gl/fr7ErzXpVXbLjw83A",
      status: "UPCOMING",
      buttonText: "Join Study Jam",
      buttonLink: "#",
    },
    {
      title: "Mystery Event",
      tags: ["Surprise", "Mystery", "Timing"],
      description:
        "Stay tuned for details about this special surprise event — more information coming soon.",
      imageUrl: "/placeholder.jpg",
      startISO: "2025-11-15T18:00:00+11:00",
      endISO: "2025-11-15T21:00:00+11:00",
      location: "TBA",
      status: "UPCOMING",
      buttonText: "Learn More",
      buttonLink: "#",
    },
    {
      title: "End of Year Celebration 2025",
      tags: ["Party", "Music", "Food"],
      description:
        "Celebrate the end of the year with live music, great food, and unforgettable memories with the UTS Bangladeshi Society.",
      imageUrl: "/end-of-year-2025.jpg",
      startISO: "2025-12-06T19:00:00+11:00",
      endISO: "2025-12-06T23:59:00+11:00",
      location: "UTS Building 11 Rooftop",
      locationUrl: "https://maps.app.goo.gl/fr7ErzXpVXbLjw83A",
      status: "UPCOMING",
      buttonText: "RSVP",
      buttonLink: "https://events.humanitix.com/utsbdsoc-end-of-year-2025",
    },
  ];

  // Order: upcoming soonest → latest, then any past (most recent → older)
  const ordered = useMemo(() => {
    const now = Date.now();
    const asc = (a: EventCardProps, b: EventCardProps) =>
      +new Date(a.startISO) - +new Date(b.startISO);
    const desc = (a: EventCardProps, b: EventCardProps) =>
      +new Date(b.startISO) - +new Date(a.startISO);

    const upcoming = events.filter(e => +new Date(e.startISO) >= now).sort(asc);
    const past = events.filter(e => +new Date(e.startISO) < now).sort(desc);
    return [...upcoming, ...past];
  }, [events]);

  // Reveal two at a time
  const [visibleCount, setVisibleCount] = useState(2);
  const visible = ordered.slice(0, visibleCount);
  const canLoadMore = visibleCount < ordered.length;

  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />

      {/* Events section fills viewport and grows */}
      <section className="relative min-h-screen bg-[linear-gradient(135deg,#f57c00_0%,#d96812_100%)] text-white py-10">
        {/* subtle texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.28) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
        />
        <div className="relative mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white text-center mb-8">
            Upcoming Events
          </h2>

          {/* Tight grid; wrapper div forces full width without changing EventCard props */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {visible.map((ev) => (
              <div key={`${ev.title}-${ev.startISO}`} className="w-full h-full flex">
                <EventCard
                  {...ev}
                  hoverTilt={false}
                  featured={false}
                  layout="image-right" /* keep images on same side for consistent heights */
                />
              </div>
            ))}
          </div>

          {/* View more → shows two more each click */}
          {canLoadMore && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setVisibleCount(c => Math.min(c + 2, ordered.length))}
                className="inline-flex items-center rounded-full bg-[#0d131b] text-white px-5 py-2.5 text-sm font-semibold transition-all hover:brightness-110 hover:shadow-[0_0_24px_rgba(0,0,0,0.45)]"
              >
                View more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      <GalleryPreview />
      <PastHighlights />
      <Footer />
    </>
  );
}
