export type Category =
  | "Side Hustles"
  | "Remote Gigs"
  | "Freelancing"
  | "Career Growth"
  | "Passive Income"
  | "Skill Building"
  | "Jobs";

export interface Post {
  slug: string;
  title: string;
  category: Category;
  excerpt: string;
  readTimeMinutes: number;
  publishedAt: string;
  author: {
    name: string;
    role: string;
  };
  featured?: boolean;
}
