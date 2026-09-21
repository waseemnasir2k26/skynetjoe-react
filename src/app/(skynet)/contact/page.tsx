import type { Metadata } from "next";
import { Clock, Mail } from "lucide-react";
import {
  SITE,
  DEFAULT_OG_IMAGES,
  pageTitle,
  pageDescription,
} from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import ContactBriefForm from "@/components/ContactBriefForm";

/**
 * /contact — ONE page (2026-09-21 simplification).
 *
 * Absorbs the old /discovery-call: the Calendly embed sits at the top, a
 * 3-field brief form below it, then the 8-hour-reply line. Everything
 * /discovery-call did that mattered (book a slot, drop a brief, land on
 * /thank-you) happens here; the 7-step qualifier and the 11-field
 * application are gone. /discovery-call 301s here (next.config.ts).
 */

export const metadata: Metadata = {
  title: pageTitle("Contact — Book a free 30-min call or send a brief"),
  description: pageDescription(
    "Book a free 30-minute call with Waseem Nasir, or send a 3-field brief. Reply within 8 hours on weekdays, fixed-price scope back in 48 hours. Bali, GMT+8.",
  ),
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: "Book a free 30-min call — SkynetLabs",
    description:
      "Pick a slot or send a brief. 8-hour reply on weekdays, fixed scope in 48 hours.",
    url: `${SITE.url}/contact`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact SkynetLabs",
  url: `${SITE.url}/contact`,
  description:
    "Book a free 30-minute call or send a short brief. 8-hour reply on weekdays.",
  inLanguage: "en",
  mainEntity: {
    "@type": "Organization",
    name: SITE.brand,
    url: SITE.url,
    email: SITE.email,
    founder: { "@type": "Person", name: SITE.founder, url: SITE.founderUrl },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: SITE.email,
        availableLanguage: ["English"],
        areaServed: "Worldwide",
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.emailFounder,
        availableLanguage: ["English"],
        areaServed: "Worldwide",
      },
    ],
  },
};

const hubBreadcrumbSchema = breadcrumbSchema([
  { name: "Home", url: SITE.url },
  { name: "Contact", url: `${SITE.url}/contact` },
]);

const eyebrow = (text: string) => (
  <div
    style={{
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.16em",
      color: "var(--terracotta-aa)",
      marginBottom: 14,
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
    }}
  >
    <span
      style={{ width: 28, height: 1, background: "var(--terracotta-aa)" }}
    />
    {text}
  </div>
);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={schema} />
      <JsonLd data={hubBreadcrumbSchema} />

      {/* 1. BOOK — Calendly at the top */}
      <section
        id="book"
        style={{
          background: "var(--cream-3)",
          padding: "clamp(88px, 14vw, 120px) 0 clamp(48px, 8vw, 72px)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
          }}
        >
          <div style={{ maxWidth: 680, marginBottom: 32 }}>
            {eyebrow("Free · 30 minutes · Bali GMT+8, auto-converts")}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(34px, 6vw, 64px)",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.04,
                color: "var(--ink)",
                margin: "0 0 18px",
                wordBreak: "break-word",
              }}
            >
              Book a free{" "}
              <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
                30-min call.
              </span>
            </h1>
            <p
              style={{
                fontSize: "clamp(16px, 3.8vw, 18px)",
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "56ch",
                margin: 0,
              }}
            >
              We share screens, find the one fix that pays off fastest, and you
              get a one-page scope with price and ship date within 48 hours. No
              pitch deck.
            </p>
          </div>
          <CalendlyEmbed />
        </div>
      </section>

      {/* 2. BRIEF — 3-field form */}
      <section
        id="brief"
        style={{
          background: "var(--bg)",
          padding: "clamp(48px, 8vw, 80px) 0",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div
          className="contact-brief"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(28px, 5vw, 56px)",
            alignItems: "start",
          }}
        >
          <style>{`
            @media (min-width: 900px) {
              .contact-brief { grid-template-columns: 1fr 1.2fr !important; }
            }
          `}</style>
          <div>
            {eyebrow("Rather not book yet?")}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(26px, 4vw, 40px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--ink)",
                margin: "0 0 14px",
              }}
            >
              Send a{" "}
              <span style={{ color: "var(--terracotta-aa)", fontWeight: 700 }}>
                three-line brief.
              </span>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "46ch",
                margin: "0 0 18px",
              }}
            >
              Bullet points are fine. Don&apos;t pre-design the solution — just
              say what&apos;s broken and roughly what it costs you.
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--ink-faint)",
                lineHeight: 1.7,
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <Mail style={{ width: 14, height: 14, flex: "none" }} />
              Prefer email?{" "}
              <a
                href={`mailto:${SITE.email}`}
                style={{
                  color: "var(--terracotta-aa)",
                  textDecoration: "none",
                }}
                className="hover:underline"
              >
                {SITE.email}
              </a>
            </p>
          </div>
          <ContactBriefForm />
        </div>
      </section>

      {/* 3. THE 8-HOUR LINE */}
      <section
        style={{
          background: "var(--cream-3)",
          padding: "clamp(32px, 6vw, 48px) 0",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 clamp(16px, 5vw, 24px)",
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <span
            aria-hidden
            style={{
              width: 40,
              height: 40,
              borderRadius: 4,
              background: "rgba(168,69,31,0.08)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "none",
            }}
          >
            <Clock
              style={{ width: 20, height: 20, color: "var(--terracotta-aa)" }}
            />
          </span>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              color: "var(--ink)",
              lineHeight: 1.6,
            }}
          >
            <strong style={{ fontWeight: 700 }}>
              Reply within 8 hours on weekdays.
            </strong>{" "}
            <span style={{ color: "var(--ink-2)" }}>
              Bali is GMT+8 — your morning is my afternoon. Fixed-price scope
              back within 48 hours; 50% deposit starts the build, no hourly
              creep.
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
