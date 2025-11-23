"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventsGrid from "../components/Events/EventsGrid";
import FeaturedEventBanner from "../components/Events/FeaturedEventBanner";
import GalleryTeaser from "../components/Events/GalleryTeaser";
import MembershipCTA from "../components/Events/MembershipCTA";
import FAQ from "../components/Events/FAQ";
import EventModal from "../components/Events/EventModal"; 

import { EventItem } from "../components/Events/events.types";
import { nextUpcomingEvent } from "../components/Events/events.utils";

// --- REAL DATA MAPPING ---
const EVENTS: EventItem[] = [
  {
    id: "graamys-awards-2025",
    title: "The Graamy's Awards Night",
    description: "The wait is finally over! Our most iconic, glamorous, and highly awaited end-of-year awards night. Get ready for surprises, moments, and magic.",
    image: "/events/image_7a273e.jpg", // ✅ Real Poster
    tags: ["Social", "Formal", "Awards", "Party"],
    location: "Bayview Millers Point",
    rsvpUrl: "#",
    startISO: "2025-12-03T17:30:00+11:00",
    endISO: "2025-12-03T22:30:00+11:00",
  },
  {
    id: "karaoke-night-2025",
    title: "Karaoke Night",
    description: "Channel your inner Desi rockstar! A night full of madness, dance, and music to make your stuvac worth it. Tickets live now.",
    image: "/events/GamesNight(1).jpg", // ✅ Real Image (Fun Vibe)
    tags: ["Social", "Music", "Party"],
    location: "UTS Clubhouse",
    rsvpUrl: "#",
    startISO: "2025-09-24T16:00:00+10:00",
    endISO: "2025-09-24T19:00:00+10:00",
  },
  {
    id: "movie-night-utshob-2025",
    title: "Movie Night: 'Utshob'",
    description: "The most awaited Bengali movie night of the year! We are bringing the blockbuster masterpiece 'Utshob' straight to campus. Popcorn included.",
    image: "/events/PHOTOLIA_-158.jpg", // ✅ Real Image (Crowd)
    tags: ["Film", "Cultural", "Relaxed"],
    location: "UTS Building 1 (CB01.04.006)",
    rsvpUrl: "#",
    startISO: "2025-09-05T17:00:00+10:00",
    endISO: "2025-09-05T21:00:00+10:00",
  },
  {
    id: "futsal-friendlies-2025",
    title: "Futsal Friendlies",
    description: "An intense clash of skills, speed, and sportsmanship! Watch or play as UTS battles UNSW in a round-robin futsal competition.",
    image: "/events/zuhayrsoccer-17.jpg", // ✅ Real Image (Soccer)
    tags: ["Sports", "Competition", "Social"],
    location: "UNSW Village Green",
    rsvpUrl: "#",
    startISO: "2025-06-12T11:00:00+10:00",
    endISO: "2025-06-12T16:00:00+10:00",
  },
  {
    id: "boishakhi-potluck-2025",
    title: "Boishakhi Potluck",
    description: "Celebrate Pohela Boishakh (Bengali New Year) with colour and culture! A joint potluck picnic. Bring a dish to share!",
    image: "/events/PHOTOLIA_-171.jpg", // ✅ Real Image (Colorful)
    tags: ["Cultural", "Food", "Collaboration"],
    location: "Pirrama Park, Pyrmont",
    rsvpUrl: "#",
    startISO: "2025-04-14T15:00:00+10:00",
    endISO: "2025-04-14T18:00:00+10:00",
  },
  {
    id: "chaad-raat-2025",
    title: "Chaad Raat: Eid Vibes",
    description: "Remember the excitement of Chaad Raat back home? Join us for an evening filled with tradition, delicious Iftar, Mehedi, crafts, and games.",
    image: "/events/chaadraatutsbdsoc-150.jpg", // ✅ Real Image (Henna)
    tags: ["Cultural", "Food", "Eid"],
    location: "UTS Building 2",
    rsvpUrl: "#",
    startISO: "2025-03-28T18:15:00+11:00",
    endISO: "2025-03-28T21:00:00+11:00",
  },
  {
    id: "welcome-bbq-2025",
    title: "Welcome BBQ",
    description: "The legendary picnic is back! Kickstart the year with good vibes, great company, music, and mouthwatering Halal BBQ.",
    image: "/events/PHOTOLIA_-215.jpg", // ✅ Real Image (Group)
    tags: ["Social", "Food", "Picnic"],
    location: "Jubilee Park, Glebe",
    rsvpUrl: "#", 
    startISO: "2025-02-23T16:00:00+11:00", 
    endISO: "2025-02-23T20:00:00+11:00",
  },
];

export default function EventsPage() {
  const featured = nextUpcomingEvent(EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const openModal = (event: EventItem) => setSelectedEvent(event);
  const closeModal = () => setSelectedEvent(null);

  // Map real images to the Gallery Teaser
  const pastEventsForGallery = [
    { 
      id: 1, 
      url: "/events/chaadraatutsbdsoc-150.jpg", 
      category: "Cultural", 
      title: "Chaad Raat", 
      description: "Henna and happiness under the stars." 
    },
    { 
      id: 2, 
      url: "/events/PHOTOLIA_-58.jpg", 
      category: "Sports", 
      title: "Sports Day", 
      description: "Action on the field." 
    },
    { 
      id: 3, 
      url: "/events/GamesNight.jpg", 
      category: "Social", 
      title: "Games Night", 
      description: "Strategy and board games." 
    },
    { 
      id: 4, 
      url: "/events/PHOTOLIA_-171.jpg", 
      category: "Cultural", 
      title: "Mock Holud", 
      description: "Vibrant colors and tradition." 
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* === MAIN LAYOUT: INDUSTRIAL THEME === */}
      <main className="min-h-screen bg-[#0b0f14] text-white pt-24 md:pt-32 relative overflow-hidden">
        
        {/* 1. NOISE TEXTURE */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        
        {/* 2. GRID PATTERN */}
        <div 
          className="absolute inset-0 opacity-[0.1] pointer-events-none"
          style={{ 
            backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />

        {/* 3. TOP BORDER ACCENT */}
        <div className="absolute top-24 left-0 right-0 h-px bg-white/10" />

        {/* CONTENT WRAPPER */}
        <div className="relative z-10">

          {/* Featured Event (Hero) */}
          {featured && (
            <div className="px-6 md:px-12 mb-16 md:mb-24 cursor-pointer relative z-10 max-w-7xl mx-auto" onClick={() => openModal(featured)}>
              <FeaturedEventBanner event={featured} />
            </div>
          )}

          {/* Page Header (Industrial Style) */}
          <section className="px-6 md:px-12 py-12 relative z-10 max-w-7xl mx-auto text-center mb-12 border-b-2 border-white/10 pb-16">
             <div className="flex items-center justify-center gap-3 mb-4">
               <span className="h-[2px] w-12 bg-[#ea580c]"></span>
               <span className="text-xs font-black uppercase tracking-[0.3em] text-white/50">
                 Calendar
               </span>
               <span className="h-[2px] w-12 bg-[#ea580c]"></span>
             </div>
             <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-sm mb-6">
               ALL <span className="text-[#ea580c]">EVENTS</span>
             </h1>
             <p className="max-w-2xl mx-auto text-lg text-gray-400 font-medium">
               From cultural nights to sports showdowns. See what's happening next.
             </p>
          </section>

          {/* Events Grid */}
          <div className="relative z-10 px-4 md:px-8 mb-24">
            <EventsGrid items={EVENTS} initialVisible={6} onEventClick={openModal} />
          </div>

          {/* Gallery Teaser */}
          <div className="px-4 md:px-8 relative z-10 mb-24">
            <GalleryTeaser
              items={pastEventsForGallery.map(item => ({ ...item, href: "/gallery" }))}
              onItemClick={() => {
                 // Optional: Handle click if needed, or just rely on href
              }}
            />
          </div>

          {/* Bottom Section */}
          <div className="px-4 md:px-8 relative z-10 max-w-7xl mx-auto space-y-24 mb-24">
             <MembershipCTA />
             <FAQ />
          </div>
          
        </div>
        
        <Footer />
      </main>

      {/* Global Modal */}
      {selectedEvent && <EventModal event={selectedEvent} isOpen={!!selectedEvent} onClose={closeModal} />}
    </>
  );
}