import Link from "next/link";
import type { Metadata } from "next";
import {
  MessageCircle,
  Mail,
  Calendar,
  ArrowRight,
  Clock,
  Zap,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-label="LinkedIn"
    className={className}
  >
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.78C.8 0 0 .77 0 1.73v20.54C0 23.23.8 24 1.78 24h20.44C23.2 24 24 23.23 24 22.27V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-label="GitHub"
    className={className}
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export const metadata: Metadata = {
  title: "Contact — 8-hour reply guarantee from Bali",
  description:
    "Skip the discovery-call dance. Send a brief, get a fixed-price scope back in 48 hours. Email, LinkedIn, live chat, or formal application — pick your channel. Reply within 8h on weekdays.",
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title: "Talk to Waseem — SkynetLabs",
    description:
      "8-hour reply guarantee. No discovery funnels. Fixed scope back in 48 hours.",
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
  {
    icon: Clock,
    title: "8-hour reply",
    body: "On weekdays. Bali is GMT+8 — your morning is my afternoon.",
  },
  {
    icon: Zap,
    title: "48-hour fixed scope",
    body: "Send a brief, get back a one-pager with price and timeline.",
  },
  {
    icon: ShieldCheck,
    title: "No NDA dance",
    body: "I sign yours, you don't sign mine. Or skip it entirely.",
  },
  {
    icon: Globe,
    title: "9 countries served",
    body: "Bali, Pakistan, US, UK, France, Australia, UAE, Singapore, Italy.",
  },
];

const expect = [
  {
    step: "01",
    title: "You send a brief",
    body: "Bullet points are fine. Loom video is great. Don't pre-design — that's my job.",
  },
  {
    step: "02",
    title: "I reply within 8 hours",
    body: "Either a clarifying question or 'this is doable — scope in 48h'.",
  },
  {
    step: "03",
    title: "Fixed scope arrives",
    body: "One pager: deliverables, price, timeline, stack. No surprises.",
  },
  {
    step: "04",
    title: "You say yes/no",
    body: "If yes: 50% deposit, work starts in 24h. If no: file stays useful — yours.",
  },
];

export default function ContactPage() {
  return (
    <div className="sky">
      <JsonLd data={schema} />

      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <Reveal initialVisible>
            <div className="hero-inner">
              <div className="hero-eyebrow">
                <span className="pulse"></span>
                8-hour reply window&nbsp;· <strong>Bali hours GMT+8</strong>
              </div>

              <h1>
                Don&apos;t book a call. <em>Send a brief.</em>
              </h1>

              <p className="hero-sub">
                The fastest way to work with me: skip the discovery dance. Email
                a one-pager, ping me on LinkedIn, or open live chat
                bottom-right. <strong>Reply in 8h · scope in 48h.</strong> If
                I&apos;m not the right fit, I&apos;ll tell you who is.
              </p>

              <div className="cta-row">
                <Link href="/discovery-call" className="btn-primary">
                  {SITE.cta.label} →
                </Link>
                <a href="mailto:info@skynetjoe.com" className="btn-line">
                  Or email info@skynetjoe.com
                </a>
              </div>

              <div className="hero-scarcity">
                <strong>Open for 2 builds</strong>&nbsp;· June 2026 cohort
              </div>

              <div className="featured-in">
                <span className="featured-lbl">Reach</span>
                <span>Email</span>
                <span>LinkedIn</span>
                <span>Live chat</span>
                <span>Apply for a call</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="section tinted">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">Pick your channel</span>
            <h2>
              Four ways to start. <em>One reply guarantee.</em>
            </h2>
            <p className="section-sub">
              All four hit the same inbox. Use whichever feels least like
              homework.
            </p>
          </div>

          <RevealGroup className="feature-row">
            {channels.map((c) => {
              const Icon = c.icon;
              return (
                <RevealItem key={c.name} as="article">
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      c.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="feat-card"
                    style={{ display: "block" }}
                  >
                    <span className="feat-tag">
                      <Icon
                        className="w-4 h-4"
                        style={{
                          display: "inline",
                          verticalAlign: "-2px",
                          marginRight: 6,
                        }}
                      />
                      {c.badge}
                    </span>
                    <div className="feat-title">{c.name}</div>
                    <p className="feat-body">{c.desc}</p>
                    <div
                      className="mono"
                      style={{
                        marginTop: 16,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: "var(--terracotta)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      {c.cta}
                      <ArrowRight style={{ width: 13, height: 13 }} />
                    </div>
                  </a>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">What to expect</span>
            <h2>
              Four steps, <em>zero funnel.</em>
            </h2>
            <p className="section-sub">
              No CRM auto-replies. No discovery-call upsell. No 14-day follow-up
              sequence. Just one human writing back.
            </p>
          </div>

          <RevealGroup className="feature-row">
            {expect.map((e) => (
              <RevealItem key={e.step} as="article">
                <div className="feat-card">
                  <span className="feat-tag">Step {e.step}</span>
                  <div className="feat-title">{e.title}</div>
                  <p className="feat-body">{e.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* GUARANTEES */}
      <section className="section tinted">
        <div className="wrap">
          <div className="section-head">
            <span className="section-kicker">The promise</span>
            <h2>
              What you get <em>every time.</em>
            </h2>
          </div>

          <RevealGroup className="feature-row">
            {guarantees.map((g) => {
              const Icon = g.icon;
              return (
                <RevealItem key={g.title} as="article">
                  <div className="feat-card">
                    <span className="feat-tag">
                      <Icon
                        className="w-4 h-4"
                        style={{ display: "inline", verticalAlign: "-2px" }}
                      />
                    </span>
                    <div className="feat-title">{g.title}</div>
                    <p className="feat-body">{g.body}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* CLOSER */}
      <section className="closer">
        <div className="wrap">
          <span className="closer-scarcity">Still scrolling?</span>
          <h2>
            Just <em>send the brief.</em>
          </h2>
          <p>
            Worst case: you waste 2 minutes. Best case: your CRM, calendar and
            inbox stop fighting each other in 14 days.
          </p>
          <div className="cta-row">
            <Link href="/discovery-call" className="btn-primary">
              {SITE.cta.label} →
            </Link>
            <Link href="/pricing" className="btn-line">
              See public pricing first
            </Link>
            <a
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <GithubIcon className="w-4 h-4" />
              Browse my code
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
