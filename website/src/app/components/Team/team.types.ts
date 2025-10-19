export type TeamDept =
  | "Executive"
  | "Events"
  | "Media"
  | "Sponsorship"
  | "Sports"
  | "Tech"
  | "Community";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  dept: TeamDept;
  headshot: string; // /public images or remote
  bio?: string;
  email?: string;
  instagram?: string;
  linkedin?: string;
  order?: number; // smaller = earlier in sort for spotlighting
};
