import type { Category } from "./types";

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const CATEGORY_STYLES: Record<Category, { bg: string; text: string; dot: string }> = {
  "Side Hustles": { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  "Remote Gigs": { bg: "bg-navy-50", text: "text-navy-700", dot: "bg-navy-500" },
  Freelancing: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  "Career Growth": { bg: "bg-violet-50", text: "text-violet-700", dot: "bg-violet-500" },
  "Passive Income": { bg: "bg-teal-50", text: "text-teal-700", dot: "bg-teal-500" },
  "Skill Building": { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500" },
  "Jobs": { bg: "bg-sky-50", text: "text-sky-700", dot: "bg-sky-500" },
};

export const SITE_URL = "https://www.providingvalue.online";
export const SITE_NAME = "Providing Value";
export const SITE_TAGLINE = "Your Gateway to Global Job Opportunity and Career Growth.";
