import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User } from "lucide-react";
import SanityTextBody from "@/components/SanityTextBody";
import ShareButtons from "@/components/ShareButtons";
import PostCard from "@/components/PostCard";
import JsonLd from "@/components/JsonLd";
import {
  CATEGORY_STYLES,
  formatDate,
  SITE_NAME,
  SITE_URL,
} from "@/lib/posts";
import {
  getPostBySlugFromSanity,
  getAllSlugsFromSanity,
  getRelatedPosts,
  type SanityPostWithBody,
} from "@/lib/sanity-helpers";

export async function generateStaticParams() {
  const sanitySlugs = await getAllSlugsFromSanity();
  return sanitySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlugFromSanity(slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: post.mainImage
        ? [{ url: post.mainImage.url, width: 1200, height: 630, alt: post.mainImage.alt }]
        : [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.mainImage ? [post.mainImage.url] : ["/images/og-default.jpg"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlugFromSanity(slug);

  if (!post) {
    notFound();
  }

  return renderPost(post);
}

function renderPost(post: SanityPostWithBody) {
  const style = CATEGORY_STYLES[post.category];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          author: {
            "@type": "Person",
            name: post.author.name,
          },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: {
              "@type": "ImageObject",
              url: `${SITE_URL}/images/og-default.jpg`,
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/blog/${post.slug}`,
          },
        }}
      />

      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-emerald-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to all articles
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_300px]">
        <article>
          <header>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full ${style.bg} ${style.text} px-3 py-1 text-xs font-semibold`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
              {post.category}
            </span>

            {post.mainImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.mainImage.url}
                alt={post.mainImage.alt}
                className="mt-6 w-full rounded-2xl object-cover"
                loading="eager"
              />
            )}

            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-navy-950 sm:text-4xl">
              {post.title}
            </h1>

            <p className="mt-4 text-lg leading-relaxed text-slate-600">{post.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-slate-200 py-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <User className="h-4 w-4" aria-hidden="true" />
                {post.author.name} &middot; {post.author.role}
              </span>
              <time dateTime={post.publishedAt}>Published {formatDate(post.publishedAt)}</time>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {post.readTimeMinutes} min read
              </span>
            </div>

            <div className="mt-4">
              <ShareButtons
                title={post.title}
                url={`${SITE_URL}/blog/${post.slug}`}
                image={post.mainImage?.url}
              />
            </div>
          </header>

          <SanityTextBody value={post.body} />

          <div className="mt-6">
            <ShareButtons
              title={post.title}
              url={`${SITE_URL}/blog/${post.slug}`}
              image={post.mainImage?.url}
            />
          </div>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              About the author
            </p>
            <p className="mt-2 text-sm text-slate-700">
              <span className="font-bold text-navy-950">{post.author.name}</span> is a{" "}
              {post.author.role} at Providing Value, covering practical strategies for online
              income, remote work, and career growth.
            </p>
          </div>
        </article>

        <Sidebar slug={post.slug} category={post.category} />
      </div>

      <RelatedGrid slug={post.slug} category={post.category} />
    </main>
  );
}

async function Sidebar({ slug, category }: { slug: string; category: string }) {
  const relatedPosts = await getRelatedPosts(slug, category, 3);

  return (
    <aside className="space-y-6" aria-label="Sidebar">
      <div className="sticky top-24 space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <h2 className="text-sm font-bold text-navy-950">Related reading</h2>
          <ul className="mt-4 space-y-4">
            {relatedPosts.map((related) => (
              <li key={related.slug}>
                <Link
                  href={`/blog/${related.slug}`}
                  className="block text-sm font-semibold text-slate-700 hover:text-emerald-700"
                >
                  {related.title}
                </Link>
                <span className="text-xs text-slate-400">
                  {related.readTimeMinutes} min read
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

async function RelatedGrid({ slug, category }: { slug: string; category: string }) {
  const relatedPosts = await getRelatedPosts(slug, category, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section aria-labelledby="more-articles" className="mt-16">
      <h2 id="more-articles" className="text-sm font-bold uppercase tracking-wide text-slate-500">
        More articles you might like
      </h2>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((related) => (
          <PostCard key={related.slug} post={related} />
        ))}
      </div>
    </section>
  );
}
