import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { getAllCategories } from "@/lib/posts";

export default function Footer() {
  const categories = getAllCategories();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-navy-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/providingvaluelogo.png"
              alt="Providing Value logo"
              width={40}
              height={40}
              className="h-9 w-9 rounded-lg object-contain"
            />
            <span className="text-lg font-bold tracking-tight text-white">
              Providing <span className="text-royal-400">Value</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
            Your gateway to global job opportunity and career growth.
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
            Providing Value is the publishing platform of Providing Value Ventures.
          </p>
          <p className="mt-2 text-sm font-medium italic text-slate-400">
            Creating Value Through Intelligence.
          </p>

          <div className="mt-6 space-y-1.5 text-xs text-slate-500">
            <p>Registered Business: Providing Value Ventures</p>
            <p>Business Registration Number: 9396308</p>
            <p>Headquarters: Lagos, Nigeria</p>
          </div>

          <a
            href="mailto:hello@providingvalue.online"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            hello@providingvalue.online
          </a>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Categories</h2>
          <ul className="mt-4 space-y-2.5">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/?category=${encodeURIComponent(category)}#categories`}
                  className="text-sm text-slate-400 hover:text-emerald-400"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-white">Company</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/about" className="text-sm text-slate-400 hover:text-emerald-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-slate-400 hover:text-emerald-400">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-emerald-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="text-sm text-slate-400 hover:text-emerald-400">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="mx-auto max-w-6xl px-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
          &copy; {year} Providing Value Ventures. All rights reserved. Providing Value is a
          publishing platform operated by Providing Value Ventures.
        </p>
      </div>
    </footer>
  );
}
