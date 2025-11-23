// src/components/Events/events.types.ts

// Updated: Now accepts any string
export type EventTag = string;

export type EventItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: EventTag[];
  location: string;
  mapUrl?: string;
  rsvpUrl?: string;
  galleryUrl?: string;
  startISO: string;
  endISO?: string;
};