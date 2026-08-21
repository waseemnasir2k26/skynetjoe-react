/**
 * /thank-you — booking confirmation page (post-Calendly + post-quiz funnel).
 *
 * Cream-pivot port 2026-05-25:
 *   - Hero: cream-3 bg, terracotta check SVG, Fraunces H1 with terracotta em
 *   - Portrait: cream-2 frame with mono caption
 *   - Timeline: cream-2 cards, terracotta icon wash, mono eyebrow per step
 *   - AI Audit Preview: cream-2 panel (was dark gradient from-[#0a2d4a])
 *   - Pre-call homework: cream-2 panel with terracotta CTA + ink-outline secondary
 *   - Case study trio: cream-2 cards with terracotta hover
 *   - Referral nudge: cream-2 panel with terracotta gift accent (was amber)
 *   - SVG check animation, ReferralForm, schema, helpers all unchanged.
 *   - Searchparam handling + Calendly redirect parsing unchanged.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { SITE, DEFAULT_OG_IMAGES } from "@/lib/site";
import { CASE_STUDIES } from "@/lib/case-studies";
import JsonLd from "@/components/JsonLd";
import ReferralForm from "./ReferralForm";
import {
  Mail,
  MessageSquareText,
  Calendar,
  FileText,
  Sparkles,
  Video,
  ArrowRight,
  Gift,
} from "lucide-react";

export const metadata: Metadata = {
  title: "You're in — see what happens next",
  description:
    "Your discovery call with Waseem is confirmed. Here's exactly what happens next, what to bring to the call, and what I'll have ready before we talk.",
  alternates: { canonical: `${SITE.url}/thank-you` },
  robots: { index: false, follow: false },
  openGraph: {
    title: "You're in — see what happens next",
    description:
      "Your discovery call with Waseem is confirmed. Here's exactly what happens next.",
    url: `${SITE.url}/thank-you`,
    type: "website",
    images: [...DEFAULT_OG_IMAGES],
  },
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// Featured case studies — highest-ROI proof points to show after booking.
const FEATURED_SLUGS = [
  "bali-wellness-conversion-funnel",
  "eu-logistics-email-triage-n8n",
  "northeast-recovery-brand-intake-rescue",
] as const;

function firstParam(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

function formatBookedTime(raw: string | undefined): string {
  if (!raw) return "soon";
  try {
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return raw;
    return d.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return raw;
  }
}

// Tailor the AI Audit Preview bullets to the stress-quiz bucket if present.
function leakBulletsFor(bucket: string | undefined): string[] {
  const bucketKey = (bucket || "").toLowerCase();
  const generic = [
    "Inbound leads sit unread for 4-12 hours — most have already booked a competitor by the time you reply.",
    "Your follow-up sequence stops at 2 touches. The booked deals usually come from touch 5-7.",
    "You're paying for 3-4 SaaS tools doing 60% of one workflow each, with nothing stitching them together.",
    "Your CRM has 600+ contacts but no segmentation, so every blast email goes to people who already bought (or already said no).",
  ];

  if (bucketKey === "chaos") {
    return [
      "Multiple inboxes (personal Gmail + Slack DM + WhatsApp + IG) all receiving leads — at least one channel hasn't been checked today.",
      "No source-of-truth CRM, so the same lead gets pitched 3 times by different team members with different prices.",
      "Manual proposal writing eating 4-6 hours per week. 80% of it is the same boilerplate.",
      "Zero handoff automation between sales-closed and onboarding, so 1 in 5 paid clients churn before kickoff.",
    ];
  }
  if (bucketKey === "leaking") {
    return [
      "Lead response time is north of 6 hours — every hour past 5 minutes drops conversion roughly 8%.",
      "Email sequences cap at 2 messages. The deals close on touch 5-7. That delta walks out the door on every campaign.",
      "No CRM segmentation, so re-engagement emails go to closed-won customers (who unsubscribe) and dead leads (who don't).",
      "You're inside Zapier/Make hitting task limits monthly. n8n self-hosted would cut that bill 80% and give you flow logic Zapier physically can't do.",
    ];
  }
  if (bucketKey === "manageable") {
    return [
      "Your funnel works — but only because YOU are the funnel. Step away for 7 days and watch what stops.",
      "Your top of funnel stalls on the form submit page: no instant confirmation, no priming, no calendar drop. You convert maybe 40% of MQLs to SQLs when the ceiling is 70%+.",
      "Reporting lives in your head. When a client asks 'how's the campaign doing' you tab through 4 dashboards instead of sending one screenshot.",
      "Onboarding is bespoke per client — you re-invent the welcome sequence every time. A 3-template library would cut delivery time by a third.",
    ];
  }
  return generic;
}

const TIMELINE = [
  {
    icon: Mail,
    when: "right now",
    title: "Confirmation email lands",
    body: "Calendar invite + zoom/meet link in your inbox within 60 seconds.",
  },
  {
    icon: MessageSquareText,
    when: "24h before the call",
    title: "Prep video + reminder",
    body: "I'll send a 2-min Loom walking through what we'll cover so we don't burn time on intros.",
  },
  {
    icon: Calendar,
    when: "call day",
    title: "30-min strategy session",
    body: "Bring your CRM/funnel URL + your last 30 days of lead count. We diagnose live.",
  },
  {
    icon: FileText,
    when: "within 48h after",
    title: "Fixed-price scope document",
    body: "One-pager: deliverables, price, timeline, stack. No 'discovery phase' invoice.",
  },
] as const;

// Shared cream-pivot inline styles
const eyebrow = {
  fontFamily: "var(--font-mono)",
  fontSize: 11 as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.16em",
  color: "var(--terracotta-aa)",
  display: "inline-flex" as const,
  alignItems: "center" as const,
  gap: 12,
};
const eyebrowRule = {
  width: 28,
  height: 1,
  background: "var(--terracotta)",
  display: "inline-block" as const,
};
const h2Style = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  lineHeight: 1.08,
  color: "var(--ink)",
  fontSize: "clamp(28px, 4vw, 44px)",
  marginBottom: 14,
};
const emTerra = {
  fontStyle: "normal" as const,
  color: "var(--terracotta-aa)",
  fontWeight: 700,
};
const cardCream = {
  background: "var(--cream-2)",
  border: "1px solid rgba(26,26,26,0.12)",
  padding: 24,
  borderRadius: 2,
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const ref = firstParam(sp.ref);
  const bucket = firstParam(sp.bucket);
  const score = firstParam(sp.score);
  const startTime =
    firstParam(sp.event_start_time) ||
    firstParam(sp.invitee_event_start_time) ||
    firstParam(sp.start_time);
  const inviteeName = firstParam(sp.invitee_full_name) || firstParam(sp.name);
  const inviteeEmail = firstParam(sp.invitee_email) || firstParam(sp.email);

  const bookedTime = formatBookedTime(startTime);
  const greetingName = inviteeName ? inviteeName.split(" ")[0] : null;
  const leakBullets = leakBulletsFor(bucket);

  const loomSubject = encodeURIComponent("My funnel walkthrough");
  const loomBody = encodeURIComponent(
    `Hey Waseem — Loom link to my funnel walkthrough below.\n\n[paste loom URL here]\n\n${ref ? `Source: ${ref}` : ""}${bucket ? `\nBucket: ${bucket}` : ""}${score ? `\nReadiness score: ${score}` : ""}`,
  );

  const featured = FEATURED_SLUGS.map((slug) =>
    CASE_STUDIES.find((c) => c.slug === slug),
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Discovery call confirmed",
        item: `${SITE.url}/thank-you`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* Reduced-motion overrides — animation tokens re-skinned to terracotta */}
      <style>{`
        @keyframes tyCheckDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes tyCheckPop {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes tyFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ty-check-circle {
          transform-origin: center;
          animation: tyCheckPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .ty-check-path {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: tyCheckDraw 0.6s ease-out 0.55s forwards;
        }
        .ty-step {
          opacity: 0;
          animation: tyFadeUp 0.5s ease-out forwards;
        }
        .ty-step:nth-child(1) { animation-delay: 0.10s; }
        .ty-step:nth-child(2) { animation-delay: 0.25s; }
        .ty-step:nth-child(3) { animation-delay: 0.40s; }
        .ty-step:nth-child(4) { animation-delay: 0.55s; }

        @media (prefers-reduced-motion: reduce) {
          .ty-check-circle,
          .ty-check-path,
          .ty-step {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>

      {/* HERO */}
      <section
        className="relative pt-28 md:pt-36 pb-16"
        style={{
          background: "var(--cream-3)",
          borderBottom: "1px solid rgba(26,26,26,0.10)",
        }}
      >
        <div className="container-x px-6 relative z-10">
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <svg
                  className="ty-check-circle"
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="28"
                    cy="28"
                    r="26"
                    stroke="var(--terracotta)"
                    strokeWidth="3"
                    fill="rgba(198, 107, 63, 0.10)"
                  />
                  <path
                    className="ty-check-path"
                    d="M16 29 L25 38 L40 20"
                    stroke="var(--terracotta)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5"
                  style={{
                    background: "rgba(198, 107, 63, 0.10)",
                    border: "1px solid rgba(198, 107, 63, 0.40)",
                    color: "var(--terracotta-aa)",
                    borderRadius: 9999,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    Booking confirmed
                  </span>
                </div>
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.06,
                  color: "var(--ink)",
                  fontSize: "clamp(40px, 6vw, 64px)",
                  margin: "0 0 20px",
                }}
              >
                {greetingName ? `${greetingName}, ` : ""}you&apos;re in.{" "}
                <em style={emTerra}>Talk to you on {bookedTime}.</em>
              </h1>

              <p
                style={{
                  fontSize: 19,
                  color: "var(--ink-2)",
                  lineHeight: 1.6,
                  marginBottom: 12,
                  maxWidth: "60ch",
                }}
              >
                I&apos;ll personally show up to this call. No SDR, no junior, no
                discovery script. Just me, your funnel on screen, and a working
                doc we&apos;ll build together.
              </p>
              <p
                style={{
                  fontSize: 16,
                  color: "var(--ink-faint)",
                  lineHeight: 1.55,
                  maxWidth: "60ch",
                }}
              >
                Scroll down — there&apos;s 1 small thing I need from you before
                we talk, and a preview of what I&apos;ll likely find inside your
                stack.
              </p>
            </div>

            <div
              className="relative aspect-[4/5] max-w-sm mx-auto md:mx-0 md:justify-self-end w-full overflow-hidden flex items-center justify-center"
              style={{
                border: "1px solid rgba(26,26,26,0.18)",
                borderRadius: 2,
                background: "var(--cream-2)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/waseem-portrait.jpg"
                alt="Waseem Nasir, founder of SkynetLabs"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: "center top" }}
              />
              <div
                className="absolute inset-x-0 bottom-0 p-4"
                style={{
                  background:
                    "linear-gradient(to top, rgba(26,26,26,0.85), rgba(26,26,26,0.35), transparent)",
                }}
              >
                <p
                  style={{
                    color: "var(--cream-3)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: 16,
                    marginBottom: 4,
                  }}
                >
                  Waseem Nasir
                </p>
                <p
                  style={{
                    color: "rgba(242,239,230,0.85)",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                  }}
                >
                  Founder · SkynetLabs · Bali (GMT+8)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section
        className="py-16 md:py-20"
        style={{ background: "var(--cream)" }}
      >
        <div className="container-x px-6">
          <div className="max-w-2xl mb-12">
            <div className="mb-5" style={eyebrow}>
              <span style={eyebrowRule} />
              What happens next
            </div>
            <h2 style={h2Style}>
              From now until your scope doc lands —{" "}
              <em style={emTerra}>4 beats.</em>
            </h2>
          </div>

          <ol className="grid md:grid-cols-4 gap-5 list-none p-0 m-0">
            {TIMELINE.map((step) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="ty-step relative"
                  style={cardCream}
                >
                  <div
                    className="flex items-center justify-center mb-4"
                    style={{
                      width: 44,
                      height: 44,
                      background: "rgba(198,107,63,0.10)",
                      border: "1px solid rgba(198,107,63,0.30)",
                      borderRadius: 2,
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "var(--terracotta)" }}
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.16em",
                      color: "var(--terracotta-aa)",
                      fontWeight: 600,
                      marginBottom: 6,
                    }}
                  >
                    {step.when}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 17,
                      color: "var(--ink)",
                      marginBottom: 10,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.2,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "var(--ink-2)",
                      lineHeight: 1.55,
                    }}
                  >
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* AI AUDIT PREVIEW */}
      <section
        className="py-16 md:py-20"
        style={{ background: "var(--cream-3)" }}
      >
        <div className="container-x px-6">
          <div
            style={{
              ...cardCream,
              padding: "40px 32px",
              border: "1px solid rgba(26,26,26,0.18)",
            }}
          >
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-12">
              <div>
                <div className="mb-5" style={eyebrow}>
                  <span style={eyebrowRule} />
                  While you wait
                </div>
                <h2 style={h2Style}>
                  Here&apos;s what I&apos;ll{" "}
                  <em style={emTerra}>likely find.</em>
                </h2>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--ink-2)",
                    lineHeight: 1.6,
                  }}
                >
                  After 200+ service businesses, the patterns rhyme. I&apos;m
                  not bluffing — these are the 4 we find inside roughly 8 out of
                  every 10 funnels we audit.
                  {bucket ? (
                    <>
                      {" "}
                      <span
                        style={{
                          color: "var(--terracotta-aa)",
                          fontWeight: 600,
                        }}
                      >
                        Tuned for your &quot;{bucket}&quot; bucket from the
                        stress quiz.
                      </span>
                    </>
                  ) : null}
                </p>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {leakBullets.map((bullet, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 12,
                      padding: 16,
                      background: "var(--cream-3)",
                      border: "1px solid rgba(26,26,26,0.10)",
                      borderRadius: 2,
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: 28,
                        height: 28,
                        background: "rgba(198,107,63,0.10)",
                        border: "1px solid rgba(198,107,63,0.30)",
                        color: "var(--terracotta-aa)",
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 2,
                        marginTop: 2,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      style={{
                        color: "var(--ink-2)",
                        fontSize: 15,
                        lineHeight: 1.6,
                      }}
                    >
                      {bullet}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRE-CALL HOMEWORK */}
      <section
        className="py-16 md:py-20 pt-0"
        style={{ background: "var(--cream-3)" }}
      >
        <div className="container-x px-6">
          <div
            style={{
              ...cardCream,
              padding: "40px 32px",
              border: "1px solid rgba(198,107,63,0.30)",
              background: "rgba(198,107,63,0.06)",
            }}
            className="text-center md:text-left"
          >
            <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">
              <div
                className="mx-auto md:mx-0 flex items-center justify-center"
                style={{
                  width: 64,
                  height: 64,
                  background: "rgba(198,107,63,0.10)",
                  border: "1px solid rgba(198,107,63,0.40)",
                  borderRadius: 2,
                }}
              >
                <Video
                  className="w-7 h-7"
                  style={{ color: "var(--terracotta)" }}
                />
              </div>
              <div>
                <div className="mb-3" style={eyebrow}>
                  <span style={eyebrowRule} />1 thing to do before our call
                </div>
                <h2
                  style={{
                    ...h2Style,
                    fontSize: "clamp(22px, 3vw, 32px)",
                    marginBottom: 12,
                  }}
                >
                  Send me ONE Loom of your current funnel.
                </h2>
                <p
                  style={{
                    fontSize: 16,
                    color: "var(--ink-2)",
                    lineHeight: 1.6,
                    maxWidth: "60ch",
                  }}
                >
                  2 minutes max. Just screen-record and walk me through how a
                  lead enters, what tools touch them, and where you think
                  it&apos;s breaking down. I prep against your real funnel — not
                  a generic deck.
                </p>
              </div>
              <div className="flex flex-col gap-3 mx-auto md:mx-0 md:items-end">
                <a
                  href="https://www.loom.com/looms/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2"
                  style={{
                    background: "var(--terracotta)",
                    color: "var(--cream-3)",
                    padding: "14px 22px",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: 14,
                    borderRadius: 2,
                    border: "none",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                  }}
                >
                  Open Loom <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${SITE.emailFounder}?subject=${loomSubject}&body=${loomBody}`}
                  className="inline-flex items-center justify-center gap-2"
                  style={{
                    background: "transparent",
                    color: "var(--ink)",
                    border: "1px solid var(--ink)",
                    padding: "13px 21px",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 600,
                    fontSize: 14,
                    borderRadius: 2,
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                  }}
                >
                  Email Waseem the link
                </a>
              </div>
            </div>
            {inviteeEmail ? (
              <p
                style={{
                  fontSize: 12,
                  color: "var(--ink-faint)",
                  marginTop: 24,
                  fontFamily: "var(--font-mono)",
                }}
              >
                Email pre-filled to send from{" "}
                <strong style={{ color: "var(--terracotta-aa)" }}>
                  {inviteeEmail}
                </strong>
                . If you&apos;d rather drop the Loom in Slack or LinkedIn DM,
                that works too.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* 3 CASE STUDIES */}
      <section
        className="py-16 md:py-20 pt-0"
        style={{ background: "var(--cream-3)" }}
      >
        <div className="container-x px-6">
          <div className="max-w-2xl mb-10">
            <div className="mb-5" style={eyebrow}>
              <span style={eyebrowRule} />
              While you wait
            </div>
            <h2 style={h2Style}>
              See what we built for{" "}
              <em style={emTerra}>3 founders just like you.</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {featured.map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group"
                style={{
                  ...cardCream,
                  textDecoration: "none",
                  transition: "border-color 0.18s",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--terracotta-aa)",
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                >
                  {c.industryTag} · {c.location}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "var(--ink)",
                    marginBottom: 12,
                    letterSpacing: "-0.015em",
                    lineHeight: 1.2,
                  }}
                >
                  {c.clientName}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--ink-2)",
                    lineHeight: 1.55,
                    marginBottom: 16,
                  }}
                >
                  {c.oneLineOutcome}
                </p>
                <div
                  className="inline-flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--terracotta-aa)",
                  }}
                >
                  Read the breakdown <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REFERRAL NUDGE */}
      <section
        className="py-16 md:py-20 pt-0"
        style={{ background: "var(--cream-3)" }}
      >
        <div className="container-x px-6">
          <div style={{ ...cardCream, padding: "40px 32px" }}>
            <div className="grid md:grid-cols-[auto_1fr] gap-5 items-start mb-6">
              <div
                className="flex items-center justify-center"
                style={{
                  width: 48,
                  height: 48,
                  background: "rgba(198,107,63,0.10)",
                  border: "1px solid rgba(198,107,63,0.40)",
                  borderRadius: 2,
                }}
              >
                <Gift
                  className="w-5 h-5"
                  style={{ color: "var(--terracotta)" }}
                />
              </div>
              <div>
                <h2
                  style={{
                    ...h2Style,
                    fontSize: "clamp(22px, 3vw, 30px)",
                    marginBottom: 10,
                  }}
                >
                  Know another founder drowning in manual ops?
                </h2>
                <p
                  style={{
                    fontSize: 15,
                    color: "var(--ink-2)",
                    lineHeight: 1.6,
                    maxWidth: "60ch",
                  }}
                >
                  Send the intro. If they sign for a build, I&apos;ll drop{" "}
                  <strong
                    style={{ color: "var(--terracotta-aa)", fontWeight: 600 }}
                  >
                    $200 credit
                  </strong>{" "}
                  on your next invoice. No expiry, no fine print, no MLM
                  nonsense.
                </p>
              </div>
            </div>
            <ReferralForm />
            <p
              style={{
                fontSize: 12,
                color: "var(--ink-faint)",
                marginTop: 16,
                fontFamily: "var(--font-mono)",
              }}
            >
              I&apos;ll reach out to them within 24h. Your name goes in the
              intro only if you tell me to.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
