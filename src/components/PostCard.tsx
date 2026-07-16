import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Post } from "@/lib/types";
import { CATEGORY_STYLES, formatDate } from "@/lib/posts";

export default function PostCard({ post, priority = false }: { post: Post; priority?: boolean }) {
  const style = CATEGORY_STYLES[post.category];

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-cardHover">
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full ${style.bg} ${style.text} px-3 py-1 text-xs font-semibold`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
          {post.category}
        </span>
        {priority ? (
          <span className="inline-flex items-center rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-white">
            Featured
          </span>
        ) : null}
      </div>

      <h2 className="mt-4 text-lg font-bold leading-snug text-navy-950">
        <Link href={`/blog/${post.slug}`} className="stretched-link">
          <span className="absolute inset-0" aria-hidden="true" />
          {post.title}
        </Link>
      </h2>

      <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
          {post.readTimeMinutes} min read
        </span>
      </div>

      <span className="pointer-events-none absolute right-6 top-6 flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </article>
  );
}
