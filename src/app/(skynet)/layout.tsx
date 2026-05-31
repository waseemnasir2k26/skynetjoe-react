import type { Metadata } from "next";
import { Fraunces, Onest, IBM_Plex_Mono } from "next/font/google";
import { SITE } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics, { GtmNoscript } from "@/components/Analytics";
import AISignals from "@/components/aeo/AISignals";
import LiveChat from "@/components/LiveChat";
// 2026-05-29 — Interrupting popups disabled (kept in repo, re-add JSX to restore):
//   DiscoveryPopup @/components/DiscoveryPopup · StickyBookCallBar @/components/cta/StickyBookCallBar
//   ExitIntentModal @/components/cta/ExitIntentModal · (earlier: IncomingCallPopup, SocialProofPopup)
// LiveChat (passive chat bubble, click-to-open) kept on — smart intent bot rebuilt 2026-05-29.
import "../globals.css";

// Cream editorial pivot 2026-05-25 — distinctive non-generic font stack.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-serif-fraunces",
  display: "swap",
  // opsz only — SOFT/WONK axes were never driven by any CSS (no
  // font-variation-settings references them), so they were dead payload.
  // opsz stays: optical sizing tracks font-size automatically. (P3 perf)
  axes: ["opsz"],
});

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-onest",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-plex",
  display: "swap",
  // Mono is only used for small eyebrow labels / captions — never the
  // LCP element (that's Fraunces). Drop it from the preload set to cut
  // critical font payload on mobile. (P3 perf)
  preload: false,
});

export const metadata: Metadata = {
  // Use assetsUrl (vercel host) for og:image resolution while apex doesn't
  // host the /public assets yet. Canonicals below still use SITE.url.
  metadataBase: new URL(SITE.assetsUrl),
  title: {
    default: `${SITE.brand} — ${SITE.tagline}`,
    template: `%s | ${SITE.brand}`,
  },
  description: SITE.description,
  applicationName: SITE.brand,
  authors: [{ name: SITE.founder, url: SITE.founderUrl }],
  creator: SITE.founder,
  publisher: SITE.brand,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.brand,
    title: `${SITE.brand} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: `${SITE.brand} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brand} — ${SITE.tagline}`,
    description: SITE.description,
    creator: "@Skynetjoe1",
    site: "@Skynetjoe1",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  alternates: { canonical: SITE.url },
};

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`light ${fraunces.variable} ${onest.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Calendly preconnect — speeds iframe load on /discovery-call.
            Ported from WP header-enhanced.php (lines 11, dns-prefetch chain). */}
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />

        <meta name="theme-color" content="#F2EFE6" />
        <Analytics />
        <AISignals />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {/* Skip-link a11y — WCAG 2.1 SC 2.4.1. Ported from WP header.php line 49. */}
        <a href="#main-content" className="skip-link sr-only focus:not-sr-only">
          Skip to main content
        </a>
        <GtmNoscript />
        {/* GA4 noscript fallback — only when GA4 env is set AND GTM is not in play
            (Analytics.tsx wires GA4 only when GTM_ID is empty). */}
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
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        {/* Passive chat bubble only — opens on click, never auto-pops. Interrupting
            popups (Discovery/ExitIntent/StickyBar) stay disabled per 2026-05-29 request. */}
        <LiveChat />
      </body>
    </html>
  );
}
