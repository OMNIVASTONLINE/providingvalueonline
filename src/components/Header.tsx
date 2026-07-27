import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { SITE_TAGLINE } from "@/lib/posts";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Fully server-rendered header. The mobile menu uses a pure CSS
 * checkbox toggle (no "use client" / no JavaScript) so the entire
 * navigation ships as static HTML for instant crawling and paint.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2.5" aria-label="Providing Value home">
          <Image
            src="/providingvaluelogo.png"
            alt="Providing Value logo"
            width={40}
            height={40}
            className="h-8 w-8 shrink-0 rounded-lg object-contain sm:h-9 sm:w-9"
            priority
          />
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-navy-950 sm:text-lg">
              Providing <span className="text-royal-600">Value</span>
            </span>
            <span className="hidden text-[11px] font-medium text-slate-500 sm:block">
              {SITE_TAGLINE}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Pure-CSS mobile menu toggle — zero client JavaScript */}
        <input type="checkbox" id="mobile-nav-toggle" className="peer hidden" />
        <label
          htmlFor="mobile-nav-toggle"
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-navy-900 hover:bg-slate-100 md:hidden peer-checked:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </label>
        <label
          htmlFor="mobile-nav-toggle"
          className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-navy-900 hover:bg-slate-100 md:hidden peer-checked:flex"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" aria-hidden="true" />
        </label>

        <nav
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full hidden flex-col gap-1 border-b border-slate-200 bg-white px-4 py-3 shadow-lg peer-checked:flex md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
