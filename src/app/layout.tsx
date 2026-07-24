import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/posts";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PV",
    template: `%s | PV`,
  },
  description:
    "Providing Value is your gateway to global job opportunity and career growth — practical guides on side hustles, remote work, freelancing, and digital career growth.",
  keywords: [
    "side hustles",
    "remote jobs",
    "freelancing tips",
    "work from home",
    "career growth",
    "digital nomad jobs",
    "passive income ideas",
  ],
  authors: [{ name: "Providing Value" }],
  creator: "Providing Value",
  publisher: "Providing Value",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      "Practical, no-fluff guides on side hustles, remote work, freelancing, and digital career growth.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      "Practical, no-fluff guides on side hustles, remote work, freelancing, and digital career growth.",
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/providingvaluelogo.png",
    apple: "/providingvaluelogo.png",
  },
  verification: {
    google: "mSA6F-taHiPHcZt-tfkKTQkgCYq80th_LlfA5GNZMwc",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-M40BEXK2L7"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-M40BEXK2L7');
        `}
      </Script>
      <body suppressHydrationWarning className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/providingvaluelogo.png`,
            description: SITE_TAGLINE,
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }}
        />

        {/*
          AdSense global script slot — add after account approval:
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
            crossOrigin="anonymous"
          />
        */}

        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
