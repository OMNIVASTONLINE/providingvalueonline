import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";
import PostCard from "@/components/PostCard";
import { SITE_TAGLINE } from "@/lib/posts";
import { getAllCategories, getAllPosts, getFeaturedPosts } from "@/lib/sanity-helpers";
import type { Category } from "@/lib/types";

export const metadata: Metadata = {
  title: "PV",
  description:
    "Discover practical, no-fluff guides on side hustles, remote jobs, freelancing, and digital career growth. New actionable articles published every week.",
  alternates: { canonical: "/" },
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categories = await getAllCategories();
  const allPosts = await getAllPosts();
  const featuredPosts = await getFeaturedPosts();

  const activeCategory: Category | undefined = categories.find((c) => c === category);
  const visiblePosts = activeCategory
    ? allPosts.filter((post) => post.category === activeCategory)
    : allPosts;

  return (
    <main>
      {/* Intro strip — not a distracting landing page, just quick context above the feed */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-navy-950 to-navy-900">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Rocket className="h-3.5 w-3.5" aria-hidden="true" />
            Updated weekly with new opportunities
          </span>
          <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            {SITE_TAGLINE}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
            Practical, no-fluff guides on side hustles, remote work, freelancing, and digital
            career growth — written to help you find real opportunities, not empty hype.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          <div>
            {/* Category filter bar */}
            <nav id="categories" aria-label="Filter articles by category" className="scroll-mt-24">
              <ul className="flex flex-wrap gap-2">
                <li>
                  <Link
                    href="/"
                    className={`inline-flex rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                      !activeCategory
                        ? "border-navy-900 bg-navy-900 text-white"
                        : "border-slate-300 text-slate-600 hover:border-navy-900 hover:text-navy-900"
                    }`}
                  >
                    All Articles
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      href={`/?category=${encodeURIComponent(c)}#categories`}
                      className={`inline-flex rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                        activeCategory === c
                          ? "border-navy-900 bg-navy-900 text-white"
                          : "border-slate-300 text-slate-600 hover:border-navy-900 hover:text-navy-900"
                      }`}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Featured posts (only shown on the unfiltered feed) */}
            {!activeCategory && featuredPosts.length > 0 ? (
              <section aria-labelledby="featured-heading" className="mt-8">
                <h2 id="featured-heading" className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  Featured guides
                </h2>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  {featuredPosts.map((post) => (
                    <PostCard key={post.slug} post={post} priority />
                  ))}
                </div>
              </section>
            ) : null}

            <section aria-labelledby="latest-heading" className="mt-10">
              <div className="flex items-center justify-between">
                <h2 id="latest-heading" className="text-sm font-bold uppercase tracking-wide text-slate-500">
                  {activeCategory ? `${activeCategory} articles` : "Latest articles"}
                </h2>
                <span className="text-xs font-medium text-slate-400">
                  {visiblePosts.length} article{visiblePosts.length === 1 ? "" : "s"}
                </span>
              </div>

              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                {visiblePosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>

              {visiblePosts.length === 0 ? (
                <p className="mt-8 rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                  No articles in this category yet — check back soon.
                </p>
              ) : null}
            </section>

            <div className="mt-10 flex justify-center">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:border-navy-900"
              >
                Learn more about Providing Value
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6" aria-label="Sidebar">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <h2 className="text-sm font-bold text-navy-950">Browse by category</h2>
                <ul className="mt-4 space-y-2">
                  {categories.map((c) => (
                    <li key={c}>
                      <Link
                        href={`/?category=${encodeURIComponent(c)}#categories`}
                        className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        {c}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
                <h2 className="text-sm font-bold text-emerald-900">
                  New to remote work?
                </h2>
                <p className="mt-2 text-sm text-emerald-800">
                  Start with our beginner-friendly guide to landing your first remote job —
                  no experience required.
                </p>
                <Link
                  href="/blog/remote-jobs-no-experience"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
                >
                  Read the guide
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
