import type { Metadata } from "next";
import { Suspense } from "react";
import { Lexend, Fraunces, Onest, IBM_Plex_Mono } from "next/font/google";
import { SITE } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics, { GtmNoscript } from "@/components/Analytics";
import AISignals from "@/components/aeo/AISignals";
import LiveChat from "@/components/LiveChat";
import DiscoveryPopup from "@/components/DiscoveryPopup";
import IncomingCallPopup from "@/components/IncomingCallPopup";
import StickyBookCallBar from "@/components/cta/StickyBookCallBar";
import ExitIntentModal from "@/components/cta/ExitIntentModal";
import SocialProofPopup from "@/components/cta/SocialProofPopup";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Cream editorial pivot 2026-05-25 — distinctive non-generic font stack.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  variable: "--font-serif-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
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
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
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
        // /og-default.png does not exist yet — fall back to the founder portrait
        // so social shares don't render a 404. Replace with a 1200x630 OG image
        // when one is produced.
        url: "/waseem-portrait.jpg",
        width: 1200,
        height: 1200,
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
    images: ["/waseem-portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  // apple-icon.png does not exist; rely on /favicon.ico only.
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: SITE.url },
};

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${lexend.variable} ${fraunces.variable} ${onest.variable} ${plexMono.variable} h-full antialiased`}
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
        <LiveChat />
        <Suspense fallback={null}>
          <DiscoveryPopup />
        </Suspense>
        <IncomingCallPopup />
        <StickyBookCallBar />
        <Suspense fallback={null}>
          <ExitIntentModal />
        </Suspense>
        <Suspense fallback={null}>
          <SocialProofPopup />
        </Suspense>
      </body>
    </html>
  );
}
