import type { Category, Post } from "./types";
import {
  fetchSanityPosts,
  fetchSanityFeaturedPosts,
  fetchSanityCategories,
  fetchSanityPostBySlug,
  fetchAllSanitySlugs,
  fetchRelatedPosts,
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
  };
}

// ---------------------------------------------------------------------------
// Async helpers — Sanity is the single source of truth
// ---------------------------------------------------------------------------

export async function getAllPosts(): Promise<Post[]> {
  const sanityPosts = await fetchSanityPosts();
  return sanityPosts.map(mapSanityPostToPost);
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const sanityPosts = await fetchSanityFeaturedPosts();
  return sanityPosts.map(mapSanityPostToPost);
}

export async function getAllCategories(): Promise<Category[]> {
  const sanityCategories = await fetchSanityCategories();
  return sanityCategories
    .map((c) => mapToCategory(c.title))
    .filter((c, i, arr) => arr.indexOf(c) === i);
}

// ---------------------------------------------------------------------------
// Single-post fetcher
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
  const post = await fetchSanityPostBySlug(slug);
  if (!post) return null;
  return mapSanityDetailToResolvedPost(post);
}

export async function getAllSlugsFromSanity(): Promise<string[]> {
  const posts = await fetchAllSanitySlugs();
  return posts.map((p) => p.slug);
}

export async function getRelatedPosts(slug: string, category: string, limit = 3): Promise<Post[]> {
  const posts = await fetchRelatedPosts(slug, category, limit);
  return posts.map(mapSanityPostToPost);
}
