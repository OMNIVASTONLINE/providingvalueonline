import { client } from "./client";

export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  category: string | null;
  categories: string[];
  author: {
    name: string;
  } | null;
  excerpt?: string;
  featured?: boolean;
  readTimeMinutes?: number;
}

export interface SanityCategory {
  _id: string;
  title: string;
  slug: string;
}

const POSTS_QUERY = `
  *[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "category": categories[0]->title,
    "categories": categories[]->title,
    "author": author->{
      name,
    },
  }
`;

const FEATURED_POSTS_QUERY = `
  *[_type == "post" && !(_id in path("drafts.**")) && featured == true] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    "category": categories[0]->title,
    "categories": categories[]->title,
    "author": author->{
      name,
    },
  }
`;

const CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
  }
`;

export async function fetchSanityPosts(): Promise<SanityPost[]> {
  return client.fetch(POSTS_QUERY);
}

export async function fetchSanityFeaturedPosts(): Promise<SanityPost[]> {
  return client.fetch(FEATURED_POSTS_QUERY);
}

export async function fetchSanityCategories(): Promise<SanityCategory[]> {
  return client.fetch(CATEGORIES_QUERY);
}
