"use client";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";


import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import AboutSection from "../components/AboutSection";
import PastHighlights from "../components/PastHighlights";
import GalleryPreview from "../components/GalleryPreview";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutSection />

      <div
        className="px-4 py-8 min-h-screen bg-gradient-to-br from-[#0b0f14] via-[#0d131b] to-[#101820]"
        style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}
      >
      <h2
  id="upcoming-events"
  className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#C9D1D9] w-full text-center mb-8"
>
  Upcoming Events
</h2>

        <EventCard
          title="Shonar Bangla Cultural Night 2025"
          tags={["Cultural", "Music", "Food"]}
          description="Celebrate Bangladeshi heritage with a night of music, dance, and authentic food. Open to all UTS students."
          imageUrl="/images/events/shonar-bangla-2025.jpg"
          startISO="2025-10-18T18:00:00+10:00"
          endISO="2025-10-18T22:00:00+10:00"
          location="UTS Building 11, Alumni Green"
          locationUrl="https://maps.app.goo.gl/fr7ErzXpVXbLjw83A"
          status="LIMITED"
          buttonText="RSVP Now"
          buttonLink="https://events.humanitix.com/utsbdsoc-cultural-night-2025"
        />

        <EventCard
          title="Shonar Bangla Cultural Night 2025"
          tags={["Cultural", "Music", "Food"]}
          description="Celebrate Bangladeshi heritage with a night of music, dance, and authentic food. Open to all UTS students."
          imageUrl="/images/events/shonar-bangla-2025.jpg"
          startISO="2025-10-18T18:00:00+10:00"
          endISO="2025-10-18T22:00:00+10:00"
          location="UTS Building 11, Alumni Green"
          status="LIMITED"
          buttonText="RSVP Now"
          buttonLink="https://events.humanitix.com/utsbdsoc-cultural-night-2025"
        />

        <EventCard
          title="Shonar Bangla Cultural Night 2025"
          tags={["Cultural", "Music", "Food"]}
          description="Celebrate Bangladeshi heritage with a night of music, dance, and authentic food. Open to all UTS students."
          imageUrl="/images/events/shonar-bangla-2025.jpg"
          startISO="2025-10-18T18:00:00+10:00"
          endISO="2025-10-18T22:00:00+10:00"
          location="UTS Building 11, Alumni Green"
          status="LIMITED"
          buttonText="RSVP Now"
          buttonLink="https://events.humanitix.com/utsbdsoc-cultural-night-2025"
        />

          <EventCard
          title="Shonar Bangla Cultural Night 2025"
          tags={["Cultural", "Music", "Food"]}
          description="Celebrate Bangladeshi heritage with a night of music, dance, and authentic food. Open to all UTS students."
          imageUrl="/images/events/shonar-bangla-2025.jpg"
          startISO="2025-10-18T18:00:00+10:00"
          endISO="2025-10-18T22:00:00+10:00"
          location="UTS Building 11, Alumni Green"
          status="LIMITED"
          buttonText="RSVP Now"
          buttonLink="https://events.humanitix.com/utsbdsoc-cultural-night-2025"
        />
      </div>

     
      <GalleryPreview />
      <PastHighlights />
     
      <Footer />
    </>
  );
}
