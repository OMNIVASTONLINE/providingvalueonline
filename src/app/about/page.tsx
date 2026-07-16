import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Compass, Globe2, ShieldCheck, Target } from "lucide-react";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Providing Value's mission to help people around the world find legitimate remote jobs, side hustles, and freelancing opportunities.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Target,
    title: "Practical over theoretical",
    description:
      "Every guide we publish is built around concrete, actionable steps — not vague motivational advice you can't actually apply.",
  },
  {
    icon: ShieldCheck,
    title: "Honesty about what works",
    description:
      "We don't promise overnight riches. We're upfront about realistic timelines, effort, and income potential for every opportunity we cover.",
  },
  {
    icon: Globe2,
    title: "Opportunity without borders",
    description:
      "Remote work and freelancing have opened the door for talented people everywhere. We write for a truly global audience.",
  },
  {
    icon: Compass,
    title: "Editorial independence",
    description:
      "Our recommendations are based on research and reader feedback, not who pays us the most. Trust is the only thing we can't rebuild.",
  },
];

const trustItems = [
  "Operated by a registered Nigerian business.",
  "Practical, research-backed content.",
  "Human-reviewed articles.",
  "Regularly updated resources.",
  "Focused on helping professionals build sustainable careers and income online.",
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Providing Value"
        title="Helping you build a career and income that work on your terms."
        description="We're a small, independent editorial team obsessed with one question: how can everyday people build real, sustainable income online — through remote work, freelancing, and smart side hustles?"
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <article className="prose-article">
          <h2>Who we are</h2>
          <p>
            Providing Value is the educational publishing platform of Providing Value Ventures, a
            Nigerian AI education, workforce development, and business transformation company.
          </p>

          <h2>Our mission</h2>
          <p>
            Our mission is to publish practical, trustworthy, and actionable resources on remote
            work, freelancing, side hustles, digital skills, career growth, and online income
            opportunities while helping professionals prepare for an AI-driven economy.
          </p>

          <h2>Who we help</h2>
          <p>
            Our readers span the full spectrum of career stages: college students exploring their
            first freelance gig, full-time employees testing a side hustle on evenings and
            weekends, and experienced professionals pivoting into fully remote careers. If you're
            trying to earn more, work more flexibly, or future-proof your career in a digital-first
            economy, you're in the right place.
          </p>

          <h2>How we choose what to cover</h2>
          <p>
            Every article starts with a real question our readers are asking — sourced from
            comments, emails, and community discussions. We prioritize topics that have clear,
            measurable outcomes: specific platforms to use, realistic pay ranges, and step-by-step
            processes you can start today, not "someday."
          </p>

          <h2>A note on transparency</h2>
          <p>
            Providing Value may earn a commission from some links to tools or platforms we
            genuinely recommend, and the site displays advertising to keep our content free for
            everyone. Sponsorships and ads never influence our editorial recommendations — read our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
            <Link href="/terms-of-service">Terms of Service</Link> for full details.
          </p>
        </article>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
          <h2 className="text-lg font-bold text-navy-950">Why Trust Providing Value?</h2>
          <ul className="mt-4 space-y-3">
            {trustItems.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {values.map((value) => (
            <div key={value.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <value.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy-950">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-navy-950 p-8 text-center sm:p-10">
          <h2 className="text-xl font-bold text-white">Have a question or a story to share?</h2>
          <p className="mt-2 text-sm text-slate-300">
            We'd love to hear from you — whether it's feedback, a topic request, or a partnership
            inquiry.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-emerald-400"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </main>
  );
}
