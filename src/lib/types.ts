export type Category =
  | "Side Hustles"
  | "Remote Gigs"
  | "Freelancing"
  | "Career Growth"
  | "Passive Income"
  | "Skill Building"
  | "Jobs";

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string };

export interface Post {
  slug: string;
  title: string;
  category: Category;
  excerpt: string;
  readTimeMinutes: number;
  publishedAt: string; // ISO date
  updatedAt?: string; // ISO date
  author: {
    name: string;
    role: string;
  };
  featured?: boolean;
  content: ContentBlock[];
}
