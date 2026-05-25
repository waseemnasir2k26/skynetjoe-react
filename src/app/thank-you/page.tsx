import type { Metadata } from "next";
import Image from "next/image";
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
  title: "You're in — see what happens next | SkynetLabs",
  description:
    "Your discovery call with Waseem is confirmed. Here's exactly what happens next, what to bring to the call, and what I'll have ready before we talk.",
  alternates: { canonical: `${SITE.url}/thank-you` },
  robots: { index: false, follow: false },
  openGraph: {
    title: "You're in — see what happens next | SkynetLabs",
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
  "manhattan-dental-atelier-flagship",
  "eu-logistics-email-triage-n8n",
  "northeast-recovery-brand-intake-rescue",
] as const;

function firstParam(
  v: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

function formatBookedTime(raw: string | undefined): string {
  if (!raw) return "soon";
  // Calendly typically passes ISO 8601 — graceful fallback if it's anything else.
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
      "Email sequences cap at 2 messages. The deals close on touch 5-7. You're leaking that delta on every campaign.",
      "No CRM segmentation, so re-engagement emails go to closed-won customers (who unsubscribe) and dead leads (who don't).",
      "You're inside Zapier/Make hitting task limits monthly. n8n self-hosted would cut that bill 80% and give you flow logic Zapier physically can't do.",
    ];
  }
  if (bucketKey === "manageable") {
    return [
      "Your funnel works — but only because YOU are the funnel. Step away for 7 days and watch what stops.",
      "Your top of funnel is leaking on the form submit page: no instant confirmation, no priming, no calendar drop. You convert maybe 40% of MQLs to SQLs when the ceiling is 70%+.",
      "Reporting lives in your head. When a client asks 'how's the campaign doing' you tab through 4 dashboards instead of sending one screenshot.",
      "Onboarding is bespoke per client — you re-invent the welcome sequence every time. A 3-template library would cut delivery time by a third.",
    ];
  }
  // "clean" or unknown — light-touch optimization framing
  return generic;
}

// 4-step "what happens next" timeline
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

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const ref = firstParam(sp.ref);
  const bucket = firstParam(sp.bucket);
  const score = firstParam(sp.score);
  // Calendly redirect params (best-effort — may or may not be present)
  const startTime =
    firstParam(sp.event_start_time) ||
    firstParam(sp.invitee_event_start_time) ||
    firstParam(sp.start_time);
  const inviteeName =
    firstParam(sp.invitee_full_name) || firstParam(sp.name);
  const inviteeEmail =
    firstParam(sp.invitee_email) || firstParam(sp.email);

  const bookedTime = formatBookedTime(startTime);
  const greetingName = inviteeName ? inviteeName.split(" ")[0] : null;
  const leakBullets = leakBulletsFor(bucket);

  const loomSubject = encodeURIComponent("My funnel walkthrough");
  const loomBody = encodeURIComponent(
    `Hey Waseem — Loom link to my funnel walkthrough below.\n\n[paste loom URL here]\n\n${ref ? `Source: ${ref}` : ""}${bucket ? `\nBucket: ${bucket}` : ""}${score ? `\nReadiness score: ${score}` : ""}`,
  );

  const featured = FEATURED_SLUGS
    .map((slug) => CASE_STUDIES.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

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

      {/* Reduced-motion overrides — defined inline so this page is self-contained */}
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
        className="relative overflow-hidden pt-24 md:pt-32 pb-16"
        style={{
          background:
            "linear-gradient(135deg, #061827 0%, #0a2d4a 45%, #073846 100%)",
        }}
      >
        <span
          className="orb"
          style={{
            width: 540,
            height: 540,
            background: "#1E88E5",
            top: -90,
            left: -130,
            opacity: 0.55,
          }}
        />
        <span
          className="orb"
          style={{
            width: 580,
            height: 580,
            background: "#00D4FF",
            top: 80,
            right: -160,
            opacity: 0.45,
            animationDelay: "-7s",
          }}
        />

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
                    stroke="#5EEAD4"
                    strokeWidth="3"
                    fill="rgba(94, 234, 212, 0.12)"
                  />
                  <path
                    className="ty-check-path"
                    d="M16 29 L25 38 L40 20"
                    stroke="#5EEAD4"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
                  style={{
                    background: "rgba(94, 234, 212, 0.14)",
                    border: "1px solid rgba(94, 234, 212, 0.40)",
                    color: "#9ff5dc",
                  }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium tracking-wider uppercase">
                    Booking confirmed
                  </span>
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.06] tracking-tight mb-5 text-white">
                {greetingName ? `${greetingName}, ` : ""}you&apos;re in.{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(120deg, #7ee4ff 0%, #5eead4 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Talk to you on {bookedTime}.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-3">
                I&apos;ll personally show up to this call. No SDR, no junior, no
                discovery script. Just me, your funnel on screen, and a working
                doc we&apos;ll build together.
              </p>
              <p className="text-base text-gray-300 leading-relaxed">
                Scroll down — there&apos;s 1 small thing I need from you before we
                talk, and a preview of what I&apos;ll likely find inside your
                stack.
              </p>
            </div>

            <div className="relative aspect-[4/5] max-w-sm mx-auto md:mx-0 md:justify-self-end w-full rounded-3xl overflow-hidden border border-cyan-400/20 shadow-2xl shadow-cyan-500/10">
              <Image
                src="/portraits/waseem-rooftop-smile.jpg"
                alt="Waseem Nasir, founder of SkynetLabs"
                fill
                priority
                sizes="(max-width: 768px) 80vw, 360px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <p className="text-white font-semibold text-sm">Waseem Nasir</p>
                <p className="text-cyan-200 text-xs">
                  Founder · SkynetLabs · Bali (GMT+8)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section">
        <div className="container-x px-6">
          <div className="max-w-2xl mb-12">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              What happens next
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              From now until your scope doc lands —{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                4 beats.
              </span>
            </h2>
          </div>

          <ol className="grid md:grid-cols-4 gap-5 list-none p-0 m-0">
            {TIMELINE.map((step) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="ty-step relative p-5 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400/25 to-teal-400/25 flex items-center justify-center mb-4 border border-cyan-400/30">
                    <Icon className="w-5 h-5 text-cyan-200" />
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-300/90 font-semibold mb-1">
                    {step.when}
                  </p>
                  <h3 className="text-white font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* AI AUDIT PREVIEW */}
      <section className="section pt-0">
        <div className="container-x px-6">
          <div className="rounded-3xl bg-gradient-to-br from-[#0a2d4a]/80 via-[#073846]/60 to-[#0a2d4a]/80 border border-cyan-400/20 p-8 md:p-12 backdrop-blur-md">
            <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 md:gap-12">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
                  While you wait
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
                  Here&apos;s what I&apos;ll{" "}
                  <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                    likely find.
                  </span>
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  After 200+ service businesses, the leak patterns rhyme. I&apos;m
                  not bluffing — these are the 4 we find inside roughly 8 out
                  of every 10 funnels we audit.
                  {bucket ? (
                    <>
                      {" "}
                      <span className="text-cyan-200">
                        Tuned for your &quot;{bucket}&quot; bucket from the stress
                        quiz.
                      </span>
                    </>
                  ) : null}
                </p>
              </div>

              <ul className="space-y-4">
                {leakBullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-md bg-cyan-400/15 border border-cyan-400/30 text-cyan-200 text-xs font-bold flex items-center justify-center mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-gray-200 leading-relaxed text-[15px]">
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
      <section className="section pt-0">
        <div className="container-x px-6">
          <div
            className="rounded-3xl p-8 md:p-12 text-center md:text-left relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(30, 136, 229, 0.18) 0%, rgba(20, 184, 166, 0.18) 100%)",
              border: "1px solid rgba(94, 234, 212, 0.30)",
            }}
          >
            <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">
              <div className="w-16 h-16 mx-auto md:mx-0 rounded-2xl bg-cyan-400/15 border border-cyan-400/40 flex items-center justify-center">
                <Video className="w-7 h-7 text-cyan-200" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-2">
                  1 thing to do before our call
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3">
                  Send me ONE Loom of your current funnel.
                </h2>
                <p className="text-gray-200 leading-relaxed max-w-2xl">
                  2 minutes max. Just screen-record and walk me through how a
                  lead enters, what tools touch them, and where you think
                  it&apos;s leaking. I prep against your real funnel — not a
                  generic deck.
                </p>
              </div>
              <div className="flex flex-col gap-3 mx-auto md:mx-0 md:items-end">
                <a
                  href="https://www.loom.com/looms/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 transition whitespace-nowrap"
                >
                  Open Loom <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${SITE.emailFounder}?subject=${loomSubject}&body=${loomBody}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-cyan-100 border border-cyan-400/40 hover:bg-cyan-400/10 transition whitespace-nowrap"
                >
                  Email Waseem the link
                </a>
              </div>
            </div>
            {inviteeEmail ? (
              <p className="text-xs text-cyan-200/70 mt-6">
                Email pre-filled to send from <strong>{inviteeEmail}</strong>.
                If you&apos;d rather drop the Loom in Slack or LinkedIn DM, that
                works too.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      {/* 3 CASE STUDIES */}
      <section className="section pt-0">
        <div className="container-x px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-300 font-semibold mb-3">
              While you wait
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              See what we built for{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                3 founders just like you.
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {featured.map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/10 transition"
              >
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-300/90 font-semibold mb-3">
                  {c.industryTag} · {c.location}
                </div>
                <h3 className="text-white font-bold text-lg mb-3 leading-snug">
                  {c.clientName}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {c.oneLineOutcome}
                </p>
                <div className="inline-flex items-center gap-2 text-cyan-200 text-sm font-semibold group-hover:gap-3 transition-all">
                  Read the breakdown <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* REFERRAL NUDGE */}
      <section className="section pt-0">
        <div className="container-x px-6">
          <div className="rounded-3xl p-8 md:p-10 bg-white/5 border border-white/10">
            <div className="grid md:grid-cols-[auto_1fr] gap-5 items-start mb-6">
              <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center">
                <Gift className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">
                  Know another founder drowning in manual ops?
                </h2>
                <p className="text-gray-300 leading-relaxed max-w-2xl">
                  Send the intro. If they sign for a build, I&apos;ll drop{" "}
                  <strong className="text-amber-200">$200 credit</strong> on
                  your next invoice. No expiry, no fine print, no MLM nonsense.
                </p>
              </div>
            </div>
            <ReferralForm />
            <p className="text-xs text-gray-400 mt-4">
              I&apos;ll reach out to them within 24h. Your name goes in the
              intro only if you tell me to.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
