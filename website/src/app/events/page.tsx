"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EventsGrid from "../components/Events/EventsGrid";
import FeaturedEventBanner from "../components/Events/FeaturedEventBanner";
import GalleryTeaser from "../components/Events/GalleryTeaser";
import MembershipCTA from "../components/Events/MembershipCTA";

import FAQ from "../components/Events/FAQ";

import { EventItem } from "../components/Events/events.types";
import { nextUpcomingEvent } from "../components/Events/events.utils";

/** ---- demo data (12 events) ---- */
const EVENTS: EventItem[] = [
  {
    id: "games-night-t2-2025",
    title: "Games Night – T2 2025",
    description: "Board games, Valorant 1v1s, Mario Kart brackets, and snacks. Open to all.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
    tags: ["Social", "Games"],
    location: "UTS Building 11, Level 4",
    mapUrl: "https://maps.google.com/?q=UTS+Building+11",
    rsvpUrl: "#",
    startISO: "2025-08-22T18:00:00+10:00",
    endISO: "2025-08-22T21:30:00+10:00",
  },
  {
    id: "shonar-bangla-2025",
    title: "Shonar Bangla Cultural Night 2025",
    description: "Live music, dance, saree/panjabi showcase, and authentic Bangladeshi dinner.",
    image: "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?q=80&w=1200&auto=format&fit=crop",
    tags: ["Cultural", "Music", "Food"],
    location: "UTS Great Hall",
    rsvpUrl: "#",
    startISO: "2025-10-12T17:00:00+11:00",
    endISO: "2025-10-12T21:30:00+11:00",
  },
  {
    id: "sports-day-2025",
    title: "UTSBDSOC Sports Day",
    description: "Cricket tapeball, futsal, and badminton free play. Friendly matches & prizes.",
    image: "https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=1200&auto=format&fit=crop",
    tags: ["Sports", "Social"],
    location: "Moore Park",
    mapUrl: "https://maps.google.com/?q=Moore+Park+Sydney",
    rsvpUrl: "#",
    startISO: "2025-09-05T10:00:00+10:00",
    endISO: "2025-09-05T16:00:00+10:00",
  },
  {
    id: "movie-night-2025",
    title: "Movie Night: Nostalgic Bengali Classics",
    description: "A cozy screening with subtitles, chai, and popcorn. Bring a friend!",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop",
    tags: ["Film", "Social", "Food"],
    location: "UTS Building 2, Theatre 13",
    rsvpUrl: "#",
    startISO: "2025-06-15T18:30:00+10:00",
    endISO: "2025-06-15T21:00:00+10:00",
    galleryUrl: "#",
  },
  {
    id: "pohela-boishakh-2024",
    title: "Pohela Boishakh 2024",
    description: "New Year celebrations with music, food stalls, and performances.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    tags: ["Cultural", "Music", "Food"],
    location: "UTS Alumni Green",
    galleryUrl: "#",
    startISO: "2024-04-20T16:30:00+10:00",
    endISO: "2024-04-20T20:45:00+10:00",
  },
  {
    id: "freshers-welcome-2025",
    title: "Fresher’s Welcome Mixer",
    description: "Meet the committee, play icebreakers, and grab freebies. Perfect for new members.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
    tags: ["Social", "Community"],
    location: "UTS Building 1, Level 5 Concourse",
    rsvpUrl: "#",
    startISO: "2025-08-29T17:30:00+10:00",
    endISO: "2025-08-29T19:30:00+10:00",
  },
  {
    id: "career-panel-tech-2025",
    title: "Career Panel: Tech @ UTS",
    description: "Hear from alumni in software, data, and product. Q&A + networking.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    tags: ["Career", "Social"],
    location: "UTS Building 11, Room 405",
    rsvpUrl: "#",
    startISO: "2025-08-18T18:00:00+10:00",
    endISO: "2025-08-18T20:00:00+10:00",
  },
  {
    id: "charity-bake-sale-2025",
    title: "Charity Bake Sale for Flood Relief",
    description: "Homemade desserts, samosas, and milk tea. All proceeds donated.",
    image: "https://images.unsplash.com/photo-1541781286675-5d53ae17f52b?q=80&w=1200&auto=format&fit=crop",
    tags: ["Food", "Community"],
    location: "UTS Tower Foyer",
    rsvpUrl: "#",
    startISO: "2025-09-20T11:00:00+10:00",
    endISO: "2025-09-20T15:00:00+10:00",
  },
  {
    id: "language-exchange-2025",
    title: "Bangla Language Exchange",
    description: "Practice conversational Bangla with native speakers. Beginner friendly.",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
    tags: ["Language", "Social"],
    location: "UTS Library Collaboration Zone",
    rsvpUrl: "#",
    startISO: "2025-07-10T17:00:00+10:00",
    endISO: "2025-07-10T18:30:00+10:00",
  },
  {
    id: "eid-reunion-2025",
    title: "Eid Reunion Picnic",
    description: "Potluck picnic, casual games, and photo session. Family-friendly.",
    image: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?q=80&w=1200&auto=format&fit=crop",
    tags: ["Food", "Social", "Community"],
    location: "Centennial Park",
    mapUrl: "https://maps.google.com/?q=Centennial+Park+Sydney",
    galleryUrl: "#",
    startISO: "2025-06-28T11:30:00+10:00",
    endISO: "2025-06-28T15:00:00+10:00",
  },
  {
    id: "poetry-night-2024",
    title: "Bengali Poetry & Rabindra Sangeet Night",
    description: "Open mic for poetry and songs; gentle vibes with chai.",
    image: "https://images.unsplash.com/photo-1519681394320-7f785ba6d8a0?q=80&w=1200&auto=format&fit=crop",
    tags: ["Cultural", "Music"],
    location: "UTS Building 8, Room 406",
    galleryUrl: "#",
    startISO: "2024-11-02T18:00:00+11:00",
    endISO: "2024-11-02T20:30:00+11:00",
  },
  {
    id: "film-club-2025",
    title: "Film Club: Modern Bangla Cinema",
    description: "Monthly screening + group discussion. Snacks provided.",
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop",
    tags: ["Film", "Social"],
    location: "UTS Building 2, Theatre 7",
    rsvpUrl: "#",
    startISO: "2025-09-12T18:00:00+10:00",
    endISO: "2025-09-12T20:30:00+10:00",
  },
  {
    id: "futsal-night-2025",
    title: "Casual Futsal Night",
    description: "Friendly futsal runs. BYO water; bibs provided.",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15cf70489?q=80&w=1200&auto=format&fit=crop",
    tags: ["Sports", "Social"],
    location: "The Y Alexandria",
    mapUrl: "https://maps.google.com/?q=The+Y+Alexandria",
    rsvpUrl: "#",
    startISO: "2025-08-25T19:00:00+10:00",
    endISO: "2025-08-25T21:00:00+10:00",
  },
];

export default function EventsPage() {
  const featured = nextUpcomingEvent(EVENTS);

  return (
    <>
      <Navbar />
     {/* Featured banner (auto-picks next upcoming) */}
        {featured && (
          <div className="px-4 md:px-8">
            <FeaturedEventBanner event={featured} />
          </div>
        )}
      <main className="min-h-screen pt-20 md:pt-24 bg-gradient-to-b from-[#0b0f14] via-[#0d131b] to-[#101820] text-orange-50">
        {/* Hero */}
        <section className="px-4 md:px-8 py-6 md:py-10 border-b border-white/10">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Upcoming &amp; Past Events</h1>
            <p className="mt-3 md:mt-4 text-orange-200/80 max-w-2xl">
              Celebrate culture, connect with friends, and create memories with UTSBDSOC.
            </p>
          </div>
        </section>

        {/* Grid + modal */}
        <EventsGrid items={EVENTS} initialVisible={6} />

       

        {/* Gallery teaser */}
        <div className="px-4 md:px-8">
          <GalleryTeaser
            items={[
              {
                id: 1,
                url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
                category: "Cultural",
                title: "Pohela Boishakh",
                description: "Music, dance, and food stalls on Alumni Green.",
                href: "/gallery/pohela-boishakh-2024",
              },
              {
                id: 2,
                url: "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?q=80&w=1200&auto=format&fit=crop",
                category: "Cultural Night",
                title: "Shonar Bangla",
                description: "Live performances and traditional fashion.",
                href: "/gallery/shonar-bangla-2025",
              },
              {
                id: 3,
                url: "https://images.unsplash.com/photo-1534158914592-062992fbe900?q=80&w=1200&auto=format&fit=crop",
                category: "Sports",
                title: "Sports Day",
                description: "Cricket tapeball, futsal, badminton highlights.",
                href: "/gallery/sports-day-2025",
              },
              {
                id: 4,
                url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop",
                category: "Movie Night",
                title: "Bengali Classics",
                description: "Cozy screening with chai & popcorn.",
                href: "/gallery/movie-night-2025",
              },
              {
                id: 5,
                url: "https://images.unsplash.com/photo-1519681394320-7f785ba6d8a0?q=80&w=1200&auto=format&fit=crop",
                category: "Cultural",
                title: "Poetry & Rabindra Sangeet",
                description: "Open mic night with poetry and songs.",
                href: "/gallery/poetry-night-2024",
              },
            ]}
          />
        </div>

        {/* Membership CTA */}
        <div className="px-4 md:px-8">
          <MembershipCTA />
        </div>

        {/* Newsletter + FAQ */}
        <div className="px-4 md:px-8">
      
          <FAQ />
        </div>
        
      <Footer />
      </main>

    </>
  );
}
