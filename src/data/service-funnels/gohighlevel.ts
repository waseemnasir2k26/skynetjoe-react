import type { ServiceFunnelContent } from "./types";

/**
 * GoHighLevel CRM — migrated from the bespoke GoHighLevelLP component
 * (2026-08-19 thin→rich upgrade) onto the shared <ServiceFunnel/> template.
 * Primary proof swapped to the grounded "us-insurance-gohighlevel-rebuild"
 * case study (src/lib/case-studies.ts) — the old LP's "-70% no-shows, dental
 * flagship" claim had no matching case-studies.ts entry, so it is dropped
 * rather than carried forward unverified (TRUTH-LOCK).
 * Ship windows reconciled to service-pricing.ts (Starter 5-7d / Pro 10-14d).
 */
const content: ServiceFunnelContent = {
  slug: "gohighlevel",
  label: "GoHighLevel CRM",

  hero: {
    eyebrow: "Automation · GoHighLevel · 2026",
    h1: "Stop losing booked customers. Bring them back.",
    sub: "Fewer missed appointments. Fewer leads slipping past. I set up your booking and follow-up around how your team actually sells, with pipeline stages and reminders mapped to your real sales motion — not a stock template nobody uses.",
    primary: { label: "Book a free 30-min check-up", href: "/discovery-call" },
    secondary: { label: "See real builds", href: "/case-studies" },
    trust: [
      "Public pricing",
      "9 countries",
      "SMS + WhatsApp wired",
      "Ship in 5-14 days",
    ],
  },

  pains: [
    {
      title: "A chunk of the calendar ghosts",
      body: "Booking finally works. Then a share of the appointments never show up, and you eat the cost every single time with no recovery flow catching them.",
    },
    {
      title: "Bought, then abandoned by day four",
      body: "Setup got you a starter template. Nobody mapped it to how your team actually sells, so half the automations sit unused.",
    },
    {
      title: "A template, not your sales motion",
      body: "The pipeline stages came from someone else's business. Your reps fight the tool instead of using it, and lead source data goes missing the day you launch.",
    },
  ],

  comparison: {
    heading: "Me vs the agency that set up your GHL instance.",
    cols: ["", "With me", "Typical GHL agency / DIY setup"],
    rows: [
      {
        dimension: "Pipeline design",
        us: "Stages rebuilt around your actual closing motion — usually 4-5 stages, not the 11-stage default template.",
        them: "A copy-pasted starter template that doesn't match how your reps actually sell.",
      },
      {
        dimension: "Pricing",
        us: "Public, fixed tiers on this page. Scope locked in writing within 48 hours of your brief.",
        them: '"Book a call for a quote," plus a monthly management fee on top of the GHL license.',
      },
      {
        dimension: "What you own",
        us: "Your own GHL instance, funnels and automations documented with a Loom SOP — no dependency on the agency staying in business.",
        them: "Logic often undocumented; when the agency's point person leaves, nobody can explain the setup.",
      },
      {
        dimension: "No-show recovery",
        us: "Reminder cadences and rebooking flows wired in from day one, not bolted on after you notice the problem.",
        them: "Booking gets set up; reminders and recovery flows are frequently an afterthought or missing entirely.",
      },
      {
        dimension: "Team size",
        us: "One founder in Bali who builds and hands off every instance personally.",
        them: "A bigger bench, but you rarely speak to whoever actually configured your account.",
      },
    ],
  },

  outcomes: [
    {
      title: "Stages mapped to how reps actually sell",
      body: "Pipeline collapsed from a bloated default template to the handful of stages that match real decision points, so reps actually use it instead of working around it.",
      proof: "Stage count typically cut in half",
    },
    {
      title: "Every automation named, dated, and owner-tagged",
      body: "No more guessing which of a dozen half-on automations is actually live. You get a documented map of what runs, when, and why.",
      proof: "Full automation audit trail",
    },
    {
      title: "Clean lead tracking on every contact",
      body: "Lead source baked into every contact record from first touch, so attribution doesn't require reconstructing it after the fact.",
      proof: "Source-tagged from first touch",
    },
    {
      title: "One screen — pipeline, chat, calendar, notes",
      body: "Reps stop living in four tabs to send one follow-up. Booking, SMS, WhatsApp, and notes live in a single view.",
      proof: "Single-screen rep workflow",
    },
  ],

  process: [
    {
      title: "Audit",
      body: "I map every stage, automation, and calendar link in the existing instance — what's live, what's paused, what's silently broken — before proposing a rebuild.",
    },
    {
      title: "Build",
      body: "Pipeline rebuilt to match the real sales motion, cadences rewritten, SMS/WhatsApp templates voice-locked, calendars relinked — without losing existing contact data.",
    },
    {
      title: "Hand off",
      body: "A Loom team SOP walkthrough and a fix window so the first week of live use doesn't catch your team alone.",
    },
  ],

  toolStack: {
    label: "Tools we use:",
    items: [
      "GoHighLevel",
      "Twilio SMS",
      "WhatsApp",
      "Calendly/Cal.com migration",
    ],
  },

  proof: {
    metric: "11 → 5",
    client: "Insurance retainer client, US (7th GHL engagement)",
    detail:
      "A US insurance operator's GoHighLevel pipeline was collapsed from 11 stages nobody could remember to 5 stages mapped to the real closing motion — adoption was immediate because reps could finally remember what each stage meant.",
  },

  secondaryProof: {
    metric: "4 → 0",
    client: "Insurance retainer client, US",
    detail:
      "The same rebuild retired 4 separate paid SaaS tools the prior agency's setup had bolted on, consolidating everything back into the one GHL instance the client was already paying for.",
  },

  guarantee: {
    title: "Fixed scope before you pay. Fixed for a window after.",
    body: "Scope gets locked in writing within 48 hours of your brief. Every rebuild carries a post-launch fix window — if a cadence or calendar link breaks in week one, I fix it.",
  },

  faqs: [
    {
      q: "I already have a GHL instance set up by another agency — can you fix it instead of rebuilding from scratch?",
      a: "Yes, this is the most common brief. I audit what's live, keep what works, and rebuild what's broken without losing existing contact data or triggering a re-opt-in requirement. The insurance retainer case above is exactly this pattern, run 7 times with the same client.",
    },
    {
      q: "How long does a rebuild take?",
      a: "Starter — account setup plus one funnel and pipeline — ships in 5-7 days. A full ops rebuild with multiple funnels, automations, and a pipeline forensic runs 10-14 days.",
    },
    {
      q: "Do you migrate my existing calendar and contacts?",
      a: "Yes — Calendly and other calendar migrations, plus existing contact data, carry over as part of the rebuild. The goal is zero data loss and no forced re-opt-in for existing contacts.",
    },
    {
      q: "What if my reps won't use whatever gets built?",
      a: "That's usually a pipeline-design problem, not a training problem. The stage rebuild starts from how your reps actually close deals today, not a generic template — adoption follows because the tool finally matches their day.",
    },
    {
      q: "Does this include SMS and WhatsApp, or just email?",
      a: "Both SMS (via Twilio) and WhatsApp are standard in the Pro tier — voice-locked templates written in your actual tone, not generic CRM boilerplate.",
    },
    {
      q: "What does it cost?",
      a: "Public, fixed pricing — see the tiers above. Starter is account setup plus one funnel and pipeline; Pro is a full ops rebuild across up to 3 funnels and 5 automations; the retainer covers ongoing monthly edits and a quarterly strategy call.",
    },
  ],

  finalCta: {
    h2: "Stop losing booked customers to a template that doesn't fit.",
    body: "A free 30-minute check-up. I'll audit the instance, rank where bookings are leaking, and have a fixed-scope rebuild plan back within 48 hours.",
    ctaLabel: "Book the check-up",
  },

  freeTools: {
    label: "Try it free first:",
    items: [
      { label: "GHL Snapshot Planner", href: "/tools/ghl-snapshot-planner" },
    ],
  },
};

export default content;
