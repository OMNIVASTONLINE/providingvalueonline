import type { ReactNode } from "react";

/**
 * Shared hero/banner used across all "mandatory" static pages
 * (About, Contact, Privacy Policy, Terms of Service) so every
 * page keeps a consistent, professional, trust-building look.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: ReactNode;
}) {
  return (
    <section className="border-b border-slate-200 bg-gradient-to-b from-navy-950 to-navy-900">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400">
          {eyebrow}
        </span>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">{description}</p>
        ) : null}
      </div>
    </section>
  );
}
