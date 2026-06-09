import type { Metadata } from "next";
import {
  Inter,
  Fraunces,
  IBM_Plex_Mono,
  Bricolage_Grotesque,
} from "next/font/google";
import { SITE } from "@/lib/site";
import Analytics, { GtmNoscript } from "@/components/Analytics";
import "../globals.css";
// skyv3 design system — same import order as the main (skynet) root layout
// (after globals so .sky-scoped rules win the cascade). The /lp/* ad funnels
// reference these CSS custom props + the .fo / .sky tokens.
import "../../styles/skyv3.css";

// ---------------------------------------------------------------------------
// Dedicated ROOT layout for the /lp/* ad-funnel route group.
//
// Why this exists (M14 — double-chrome fix): the /lp/* landing pages render
// their OWN sticky nav + footer (FreightOpsInteractive's `.fo .nav`/`.fo footer`
// and the freight/home-services sticky CTAs). They previously lived under the
// (skynet) group, so they ALSO inherited the global <Header/> + <Footer/> from
// that layout — two navs, two footers. These are paid-traffic conversion pages
// that must stay distraction-free, so they get their own root layout here that
// deliberately OMITS the global Header/Footer/LiveChat/ConsentBanner.
//
// This is the supported Next.js "multiple root layouts" pattern: (skynet) and
// (lp) are two route groups, each with its own root layout rendering <html>/
// <body>. URLs are unchanged (route groups are omitted from the path), so
// /lp/freight, /lp/home-services, /lp/logistics still resolve the same.
//
// Font + globals setup is mirrored from (skynet)/layout.tsx so the lp pages
// keep the same CSS custom props (--terracotta, --ink, --cream, --font-*…).
// ---------------------------------------------------------------------------

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-inter",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
  preload: false,
});

// Fraunces drives --font-serif-fraunces, referenced by the lp scoped CSS.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-serif-fraunces",
  display: "swap",
  axes: ["opsz"],
  preload: false,
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-plex",
  display: "swap",
  preload: false,
});

// Per-page metadata (title/description/OG) is exported from each lp page.
// This layout just supplies the metadataBase so relative OG image paths
// (e.g. /og-default.png) resolve to absolute URLs.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
};

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`light ${inter.variable} ${bricolage.variable} ${fraunces.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#F2EFE6" />
        <Analytics />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <GtmNoscript />
        {GA4_ID && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}&noscript=1`}
              alt=""
              width={1}
              height={1}
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {/* No global Header/Footer here — lp pages bring their own chrome. */}
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
