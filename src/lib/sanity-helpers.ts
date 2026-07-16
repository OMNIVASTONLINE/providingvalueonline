import type { Category, Post } from "./types";
import { posts as localPosts } from "./posts-data";
import { CATEGORY_STYLES } from "./posts";
import {
  fetchSanityPosts,
  fetchSanityFeaturedPosts,
  fetchSanityCategories,
  type SanityPost,
} from "@/sanity/lib/queries";

const VALID_CATEGORIES: Category[] = [
  "Side Hustles",
  "Remote Gigs",
  "Freelancing",
  "Career Growth",
  "Passive Income",
  "Skill Building",
  "Jobs",
];

function mapToCategory(title: string | null | undefined): Category {
  if (!title) return VALID_CATEGORIES[0];
  const match = VALID_CATEGORIES.find(
    (c) => c.toLowerCase() === title.toLowerCase(),
  );
  return match || VALID_CATEGORIES[0];
}

function mapSanityPostToPost(sanityPost: SanityPost): Post {
  return {
    slug: sanityPost.slug,
    title: sanityPost.title,
    category: mapToCategory(sanityPost.category),
    excerpt: sanityPost.excerpt || "",
    readTimeMinutes: sanityPost.readTimeMinutes || 5,
    publishedAt: sanityPost.publishedAt,
    author: {
      name: sanityPost.author?.name || "Unknown",
      role: "Writer",
    },
    featured: sanityPost.featured || false,
    content: [],
  };
}

function sortLocalPosts(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

// ---------------------------------------------------------------------------
// Async helpers — try Sanity first, fall back to posts-data.ts
// ---------------------------------------------------------------------------

export async function getAllPosts(): Promise<Post[]> {
  try {
    const sanityPosts = await fetchSanityPosts();
    if (sanityPosts.length > 0) {
      return sanityPosts.map(mapSanityPostToPost);
    }
  } catch {
    // Sanity unavailable — fall through to local data
  }
  return sortLocalPosts(localPosts);
}

export async function getFeaturedPosts(): Promise<Post[]> {
  try {
    const sanityPosts = await fetchSanityFeaturedPosts();
    if (sanityPosts.length > 0) {
      return sanityPosts.map(mapSanityPostToPost);
    }
  } catch {
    // Fall through
  }
  return sortLocalPosts(localPosts).filter((p) => p.featured);
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const sanityCategories = await fetchSanityCategories();
    if (sanityCategories.length > 0) {
      const mapped = sanityCategories
        .map((c) => mapToCategory(c.title))
        .filter(
          (c, i, arr) => arr.indexOf(c) === i, // deduplicate
        );
      return mapped;
    }
  } catch {
    // Fall through
  }
  return Object.keys(CATEGORY_STYLES) as Category[];
}
