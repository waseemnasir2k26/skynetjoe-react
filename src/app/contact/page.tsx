import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  MessageCircle,
  Mail,
  Calendar,
  ArrowRight,
  Clock,
  CheckCircle2,
  Zap,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn" className={className}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.78 24h20.44C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-label="GitHub" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export const metadata: Metadata = {
  title: "Contact — 8-hour reply guarantee from Bali | SkynetLabs",
  description:
    "Skip the discovery-call dance. Send a brief, get a fixed-price scope back in 48 hours. Email, LinkedIn, live chat, or formal application — pick your channel. Reply within 8h on weekdays.",
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: "Talk to Waseem — SkynetLabs",
    description:
      "8-hour reply guarantee. No discovery funnels. Fixed scope back in 48 hours.",
    url: `${SITE.url}/contact`,
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact SkynetLabs",
  url: `${SITE.url}/contact`,
  description:
    "Multi-channel contact for SkynetLabs. Email, LinkedIn, live chat, discovery-call application. 8-hour reply on weekdays.",
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

const channels = [
  {
    name: "Live chat",
    desc: "Fastest live touch. Pops up bottom-right — answers basics + routes you to a call.",
    cta: "Open the chat",
    href: "#livechat-open",
    icon: MessageCircle,
    badge: "Instant",
  },
  {
    name: "Email",
    desc: "Best for briefs, attachments, async detail.",
    cta: "info@skynetjoe.com",
    href: "mailto:info@skynetjoe.com",
    icon: Mail,
    badge: "48h scope",
  },
  {
    name: "LinkedIn",
    desc: "Connect + DM. I post daily — say hi in comments first.",
    cta: "Open my profile",
    href: "https://www.linkedin.com/in/waseemnasir2k26",
    icon: LinkedInIcon,
    badge: "Daily active",
  },
  {
    name: "Apply for a call",
    desc: "Send a brief. If we're a fit, you get a Cal.com link in your inbox within 8 hours.",
    cta: "Open application form",
    href: "/discovery-call",
    icon: Calendar,
    badge: "Filtered",
  },
];

const guarantees = [
  { icon: Clock, title: "8-hour reply", body: "On weekdays. Bali is GMT+8 — your morning is my afternoon." },
  { icon: Zap, title: "48-hour fixed scope", body: "Send a brief, get back a one-pager with price and timeline." },
  { icon: ShieldCheck, title: "No NDA dance", body: "I sign yours, you don't sign mine. Or skip it entirely." },
  { icon: Globe, title: "9 countries served", body: "Bali, Pakistan, US, UK, France, Australia, UAE, Singapore, Italy." },
];

const expect = [
  { step: "01", title: "You send a brief", body: "Bullet points are fine. Loom video is great. Don't pre-design — that's my job." },
  { step: "02", title: "I reply within 8 hours", body: "Either a clarifying question or 'this is doable — scope in 48h'." },
  { step: "03", title: "Fixed scope arrives", body: "One pager: deliverables, price, timeline, stack. No surprises." },
  { step: "04", title: "You say yes/no", body: "If yes: 50% deposit, work starts in 24h. If no: file stays useful — yours." },
];

const eyebrow = (text: string, color = "var(--terracotta)") => (
  <div
    style={{
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.16em",
      color,
      marginBottom: 14,
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
    }}
  >
    <span style={{ width: 28, height: 1, background: color }} />
    {text}
  </div>
);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={schema} />

      {/* HERO */}
      <section
        style={{
          background: "var(--cream-3)",
          padding: "112px 0 80px",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 40,
            alignItems: "center",
          }}
          className="contact-hero"
        >
          <style>{`
            @media (min-width: 900px) {
              .contact-hero { grid-template-columns: 1.3fr 1fr !important; }
            }
          `}</style>
          <div>
            {eyebrow("Open for 2 builds — June 2026")}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 6.5vw, 76px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.02,
                color: "var(--ink)",
                margin: "0 0 22px",
              }}
            >
              Don&apos;t book a call.{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)", fontWeight: 500 }}>
                Send a brief.
              </em>
            </h1>
            <p
              style={{
                fontSize: 18,
                color: "var(--ink-2)",
                lineHeight: 1.6,
                maxWidth: "58ch",
                marginBottom: 26,
              }}
            >
              The fastest way to work with me: skip the discovery dance. Email a
              one-pager, ping me on LinkedIn, or open live chat bottom-right —
              I&apos;ll send a fixed-price scope back within{" "}
              <strong style={{ color: "var(--terracotta)" }}>48 hours</strong>. If
              I&apos;m not the right fit, I&apos;ll tell you who is.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link
                href="/discovery-call"
                style={{
                  background: "var(--terracotta)",
                  color: "var(--cream-3)",
                  padding: "14px 24px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 2,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                }}
              >
                <Calendar style={{ width: 14, height: 14 }} />
                Apply for a call
              </Link>
              <a
                href="mailto:info@skynetjoe.com"
                style={{
                  background: "var(--terracotta)",
                  color: "var(--cream-3)",
                  padding: "14px 24px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 2,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                }}
              >
                <Mail style={{ width: 14, height: 14 }} />
                Email me
              </a>
              <a
                href="#livechat-open"
                style={{
                  background: "transparent",
                  color: "var(--ink)",
                  padding: "13px 22px",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 600,
                  fontSize: 14,
                  border: "1px solid var(--ink)",
                  borderRadius: 2,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                }}
              >
                <MessageCircle style={{ width: 14, height: 14 }} />
                Or open live chat
              </a>
            </div>
          </div>

          <div>
            <figure
              style={{
                margin: 0,
                transform: "rotate(-1.2deg)",
                background: "var(--cream-3)",
                padding: 10,
                border: "1px solid rgba(26,26,26,0.14)",
                boxShadow: "0 18px 48px rgba(26,26,26,0.15)",
                maxWidth: 400,
                marginLeft: "auto",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 5",
                  overflow: "hidden",
                  background: "var(--cream-2)",
                }}
              >
                <Image
                  src="/portraits/waseem-bluepolo.jpg"
                  alt="Waseem Nasir, founder of SkynetLabs, available for new builds"
                  fill
                  priority
                  sizes="(min-width: 900px) 400px, 90vw"
                  style={{
                    objectFit: "cover",
                    filter: "sepia(0.10) saturate(0.95)",
                  }}
                />
              </div>
              <figcaption
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.10em",
                  color: "var(--ink-faint)",
                  textAlign: "center",
                  paddingTop: 12,
                }}
              >
                — Waseem · Bali · GMT+8 · open
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* CHANNELS */}
      <section
        style={{ padding: "72px 0", borderBottom: "1px solid rgba(26,26,26,0.10)", position: "relative", zIndex: 2 }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ maxWidth: 700, marginBottom: 32 }}>
            {eyebrow("Pick your channel")}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                margin: "0 0 12px",
                lineHeight: 1.1,
              }}
            >
              Four ways to start.{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>
                One reply guarantee.
              </em>
            </h2>
            <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.6 }}>
              All four hit the same inbox. Use whichever feels least like homework.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {channels.map((c, i) => {
              const Icon = c.icon;
              const rotate = i % 2 === 0 ? "-0.3deg" : "0.3deg";
              return (
                <a
                  key={c.name}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  style={{
                    background: "var(--cream-2)",
                    border: "1px solid rgba(26,26,26,0.12)",
                    padding: "22px",
                    textDecoration: "none",
                    color: "var(--ink)",
                    transform: `rotate(${rotate})`,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      background: "var(--terracotta)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 2,
                      marginBottom: 14,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 18,
                        fontWeight: 600,
                        margin: 0,
                        color: "var(--ink)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {c.name}
                    </h3>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        textTransform: "uppercase",
                        letterSpacing: "0.16em",
                        padding: "3px 7px",
                        background: "var(--cream-3)",
                        color: "var(--terracotta)",
                        border: "1px solid rgba(198,107,63,0.30)",
                        fontWeight: 600,
                      }}
                    >
                      {c.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, margin: "0 0 12px" }}>
                    {c.desc}
                  </p>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      color: "var(--terracotta)",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {c.cta}
                    <ArrowRight style={{ width: 12, height: 12 }} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section
        style={{
          padding: "72px 0",
          background: "var(--cream-3)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ maxWidth: 640, marginBottom: 36 }}>
            {eyebrow("What to expect")}
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                margin: "0 0 12px",
                lineHeight: 1.1,
              }}
            >
              Four steps,{" "}
              <em style={{ fontStyle: "italic", color: "var(--terracotta)" }}>zero funnel.</em>
            </h2>
            <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.6 }}>
              No CRM auto-replies. No discovery-call upsell. No 14-day follow-up
              sequence. Just one human writing back.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {expect.map((e, i) => (
              <div
                key={e.step}
                style={{
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.12)",
                  padding: "22px",
                  transform: i % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.3deg)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: 36,
                    fontWeight: 500,
                    color: "var(--terracotta)",
                    lineHeight: 1,
                    marginBottom: 10,
                  }}
                >
                  {e.step}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 17,
                    fontWeight: 600,
                    color: "var(--ink)",
                    margin: "0 0 6px",
                  }}
                >
                  {e.title}
                </h3>
                <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.6, margin: 0 }}>
                  {e.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEES */}
      <section
        style={{ padding: "72px 0", borderBottom: "1px solid rgba(26,26,26,0.10)", position: "relative", zIndex: 2 }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {guarantees.map((g, i) => {
              const Icon = g.icon;
              return (
                <div
                  key={g.title}
                  style={{
                    background: "var(--cream-2)",
                    border: "1px solid rgba(26,26,26,0.12)",
                    padding: "22px",
                    transform: i % 2 === 0 ? "rotate(-0.2deg)" : "rotate(0.2deg)",
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      background: "var(--terracotta)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 2,
                      marginBottom: 12,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 16,
                      fontWeight: 600,
                      color: "var(--ink)",
                      margin: "0 0 6px",
                    }}
                  >
                    {g.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.6, margin: 0 }}>
                    {g.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CLOSER */}
      <section
        style={{ padding: "88px 0", background: "var(--terracotta)", position: "relative", zIndex: 2 }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <CheckCircle2 style={{ width: 36, height: 36, color: "var(--cream-3)", margin: "0 auto 16px" }} />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4.4vw, 44px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--cream-3)",
              marginBottom: 16,
            }}
          >
            Still scrolling? Just{" "}
            <Link
              href="/discovery-call"
              style={{
                color: "var(--cream-3)",
                textDecoration: "underline",
                textDecorationThickness: "1px",
                textUnderlineOffset: "8px",
                fontStyle: "italic",
              }}
            >
              send the brief
            </Link>
            .
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(250, 247, 240, 0.92)",
              maxWidth: "50ch",
              margin: "0 auto 28px",
              lineHeight: 1.6,
            }}
          >
            Worst case: you waste 2 minutes. Best case: your CRM, calendar and
            inbox stop fighting each other in 14 days.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <Link
              href="/discovery-call"
              style={{
                background: "var(--cream-3)",
                color: "var(--terracotta)",
                padding: "14px 24px",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: 14,
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
              }}
            >
              <Calendar style={{ width: 14, height: 14 }} />
              Apply for a call
            </Link>
            <Link
              href="/pricing"
              style={{
                background: "transparent",
                color: "var(--cream-3)",
                padding: "13px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 14,
                border: "1px solid var(--cream-3)",
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
              }}
            >
              See public pricing first
            </Link>
            <a
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "transparent",
                color: "var(--cream-3)",
                padding: "13px 22px",
                fontFamily: "var(--font-sans)",
                fontWeight: 600,
                fontSize: 14,
                border: "1px solid var(--cream-3)",
                borderRadius: 2,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
              }}
            >
              <GithubIcon className="w-4 h-4" />
              Browse my code
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
