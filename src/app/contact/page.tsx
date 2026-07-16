import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Providing Value team for questions, feedback, guest post pitches, or partnership inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you."
        description="Questions about an article, a topic you want us to cover, or a partnership idea? Send us a message and our editorial team will get back to you."
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_260px]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
            <h2 className="text-lg font-bold text-navy-950">Send us a message</h2>
            <p className="mt-1 text-sm text-slate-500">
              We typically respond within 1–2 business days.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </span>
              <h2 className="mt-3 text-sm font-bold text-navy-950">Email</h2>
              <a
                href="mailto:hello@providingvalue.online"
                className="mt-1 block text-sm text-slate-600 hover:text-emerald-700"
              >
                hello@providingvalue.online
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </span>
              <h2 className="mt-3 text-sm font-bold text-navy-950">Response time</h2>
              <p className="mt-1 text-sm text-slate-600">
                1–2 business days, Monday through Friday.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </span>
              <h2 className="mt-3 text-sm font-bold text-navy-950">Based remotely</h2>
              <p className="mt-1 text-sm text-slate-600">
                Our team works fully remote, across multiple time zones — just like our readers.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
