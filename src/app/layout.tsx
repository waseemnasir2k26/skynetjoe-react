import type { Metadata } from "next";
import { Suspense } from "react";
import { Lexend } from "next/font/google";
import { SITE } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics, { GtmNoscript } from "@/components/Analytics";
import AISignals from "@/components/aeo/AISignals";
import LiveChat from "@/components/LiveChat";
import DiscoveryPopup from "@/components/DiscoveryPopup";
import IncomingCallPopup from "@/components/IncomingCallPopup";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: SITE.brand,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brand} — ${SITE.tagline}`,
    description: SITE.description,
    creator: "@Skynetjoe1",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  icons: { icon: "/favicon.ico", apple: "/apple-icon.png" },
  alternates: { canonical: SITE.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lexend.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme');
                if (t === 'light') document.documentElement.classList.add('light');
              } catch (e) {}
            `,
          }}
        />
        <Analytics />
        <AISignals />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <GtmNoscript />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <LiveChat />
        <Suspense fallback={null}>
          <DiscoveryPopup />
        </Suspense>
        <IncomingCallPopup />
      </body>
    </html>
  );
}
