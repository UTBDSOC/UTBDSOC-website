export type EventTag =
  | "Cultural" | "Social" | "Sports" | "Film" | "Food" | "Games" | "Music" | "Career" | "Community" | "Language";

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
