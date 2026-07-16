import type { Category, Post } from "./types";
import { posts as localPosts } from "./posts-data";
import { CATEGORY_STYLES } from "./posts";
import {
  fetchSanityPosts,
  fetchSanityFeaturedPosts,
  fetchSanityCategories,
  fetchSanityPostBySlug,
  fetchAllSanitySlugs,
  type SanityPost,
  type SanityPostDetail,
} from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

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

// ---------------------------------------------------------------------------
// Single-post fetcher — tries Sanity first, falls back to local data
// ---------------------------------------------------------------------------

export interface SanityPostWithBody {
  source: "sanity";
  slug: string;
  title: string;
  category: Category;
  excerpt: string;
  readTimeMinutes: number;
  publishedAt: string;
  featured: boolean;
  author: {
    name: string;
    role: string;
    imageRef?: string;
  };
  body: unknown[];
  mainImage?: {
    url: string;
    alt: string;
  };
}

export type ResolvedPost = SanityPostWithBody | Post;

function mapSanityDetailToResolvedPost(d: SanityPostDetail): SanityPostWithBody {
  return {
    source: "sanity",
    slug: d.slug,
    title: d.title,
    category: mapToCategory(d.category),
    excerpt: d.excerpt || "",
    readTimeMinutes: d.readTimeMinutes || 5,
    publishedAt: d.publishedAt,
    featured: d.featured || false,
    author: {
      name: d.author?.name || "Unknown",
      role: "Writer",
      imageRef: d.author?.image?.asset?._ref,
    },
    body: d.body ?? [],
    mainImage: d.mainImage?.asset?._ref
      ? { url: urlFor(d.mainImage).width(1200).url(), alt: d.mainImage.alt || d.title }
      : undefined,
  };
}

export async function getPostBySlugFromSanity(slug: string): Promise<SanityPostWithBody | null> {
  try {
    const post = await fetchSanityPostBySlug(slug);
    if (!post) return null;
    return mapSanityDetailToResolvedPost(post);
  } catch {
    return null;
  }
}

export async function getAllSlugsFromSanity(): Promise<string[]> {
  try {
    return await fetchAllSanitySlugs();
  } catch {
    return [];
  }
}
