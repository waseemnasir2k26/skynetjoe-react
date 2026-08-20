/* ============================================================
   V10 — ALTITUDE ZERO (SkynetLabs edition)
   Ported from waseemnasir-react app/v/ai-city-2 + components/aicity-altitude
   ("Altitude Zero"). Self-contained: nothing here is imported by any other
   route. Same descent-through-districts mechanic and Catmull-Rom camera
   spline as the source, rebranded onto the cream/ink/rust SkynetLabs brand
   (see src/app/globals.css --cream/--ink/--terracotta) with an approved
   "warm deep-ink night ground + terracotta window/signal accents" palette
   translation for the night-descent scenes. Do not invent new copy or
   numbers here — every quantitative claim below is either one of the four
   locked proof numbers (180+ / 40+ / 9 / 2019) or a non-numeric paraphrase
   of a real, already-published case study in src/lib/case-studies.ts.
   ============================================================ */

export const C = {
  // "Night ground" — warm deep ink, not the source's teal/jade night.
  skyDark: "#160F0B",
  ground: "#241A12",
  card: "#221A13",
  // Text on the dark ground — cream, not the source's near-white.
  ink: "#F2EFE6",
  body: "#D9CFC0",
  mute: "#9C8F7E",
  hairline: "rgba(242,239,230,0.14)",
  // Accent — terracotta (brand rust), not the source's jade.
  jade: "#C66B3F", // solid CTA fill, base accent
  jadeBright: "#E38B5C", // bright glow: windows, beacon, active states
  inkJade: "#2E2015", // building base tone
  jadeTint: "rgba(198,107,63,0.18)",
  onDeep: "#F2EFE6",
} as const;

export const CTA_URL = "/discovery-call";
export const CTA_LABEL = "Book a free 30-min check-up";

/* H1 + subhead — verbatim from the live /v8 hero (components/v8/HeroWorkshop.tsx),
   SkynetLabs's canonical pain-hook copy. Must stay identical to that source. */
export const H1_LINE1 = "Stop losing customers";
export const H1_LINE2 = "while you’re busy.";
export const SUB =
  "We set up smart tools that reply to every new customer in seconds, follow up for you automatically, and handle the boring repeat work — so you win more jobs without working more hours.";

/* The 4 LOCKED proof numbers. Single source of truth is src/lib/site.ts
   STATS (180+ workflows shipped, 40+ websites delivered, 9 countries
   served); "2019" is the one pre-approved founding-year figure carried
   over from the sibling waseemnasir concept doc. No other digit appears
   anywhere else in this file. */
export const PROOF_LINE =
  "180+ workflows · 40+ sites · 9 countries · since 2019";

/* Work case cards — non-numeric paraphrases of four real, published,
   anonymized entries in src/lib/case-studies.ts. No personal or client
   names (site-wide anonymization policy — see that file's header
   comment), no invented digits: every metric string below is either a
   direct quote of that file's own qualitative `delta`/`after` field or a
   digit-free rewrite of its `oneLineOutcome`. The dental card keeps the
   spec-demo honesty line intact (never a paid client). */
export const WORK = [
  {
    client: "EU logistics group",
    outcome: "Inbox triage, automated end to end.",
    metric: "Hours → minutes",
    note: "response time on routine threads, once a dispatcher had to read every one by hand.",
    mech: "n8n + AI email triage",
    status: "LIVE" as const,
  },
  {
    client: "US insurance retainer client",
    outcome: "A stalled GoHighLevel install, rebuilt end to end.",
    metric: "Automated",
    note: "manual triage that used to eat a big chunk of the day, now runs itself.",
    mech: "GoHighLevel pipeline rebuild",
    status: "LIVE" as const,
  },
  {
    client: "Wellness practitioner, Ubud",
    outcome: "A five-page brochure, cut to one page that books.",
    metric: "Bookings, roughly doubled",
    note: "on the same Instagram traffic she already had — no paid ads.",
    mech: "Single-page funnel + embedded booking",
    status: "LIVE" as const,
  },
  {
    client: "Dental flagship",
    outcome:
      "Front desk, reframed as flagship craft — a spec build, not a paid client.",
    metric: "Demo",
    note: "booking, process, and pricing transparency, built to show the craft.",
    mech: "Flagship design system",
    status: "DEMO" as const,
  },
] as const;

/* Utilities strip — the real stack, reused verbatim in spirit from the
   sitewide service list (src/lib/site.ts SERVICE_CATEGORIES), framed as
   district utilities per the concept's "five landmark towers, one system"
   language — nothing invented. */
export const UTILITIES = [
  { id: "n8n", tag: "POWER", label: "n8n", sub: "Workflow engine" },
  { id: "whatsapp", tag: "SIGNAL", label: "WhatsApp", sub: "Intake & bots" },
  { id: "wordpress", tag: "ROADS", label: "WordPress", sub: "Client sites" },
  { id: "ghl", tag: "TRANSIT", label: "GoHighLevel", sub: "Pipelines & CRM" },
  { id: "ai", tag: "GRID", label: "AI core", sub: "Agents & automation" },
] as const;

/* The four descent districts — order = fall order. Mapped onto
   SkynetLabs's real service categories (src/lib/site.ts SERVICE_CATEGORIES:
   Automation, AI Content, Development, Consulting). Portal Quarter is the
   FreightOps dispatch flagship — its link is the hard-routed funnel LP,
   never the /services/[slug] page (see getServiceHref() in site.ts).
   Building heights in SceneObjects.ts are explicitly decorative, never
   tied to any of these labels — same honesty rule carried over from the
   source. `survey` used to encode a numeric ALT range per district
   ("DISTRICT 01 · ... · ALT 1700-1200M") — digits, in breach of the
   180+/40+/9/2019-only truth gate. Districts are now lettered A-D, no
   altitude figure, matching v11/tokens.ts SERVICES' DISTRICT A-D convention. */
export const DISTRICTS = [
  {
    id: "signal",
    order: 1,
    name: "Signal Heights",
    survey: "DISTRICT A · SIGNAL HEIGHTS",
    landmark: "The Signal Spire",
    pitch:
      "Lead response & inbox automation: every new customer answered before they go cold.",
    href: "/services/n8n-automation",
    linkLabel: "See n8n Automation",
  },
  {
    id: "pipeline",
    order: 2,
    name: "Pipeline Row",
    survey: "DISTRICT B · PIPELINE ROW",
    landmark: "Pipeline Row HQ",
    pitch: "Ops & CRM follow-up: first touch to close, no manual relay.",
    href: "/services/gohighlevel",
    linkLabel: "See GoHighLevel CRM",
  },
  {
    id: "portal",
    order: 3,
    name: "Portal Quarter",
    survey: "DISTRICT C · PORTAL QUARTER",
    landmark: "FreightOps Dispatch Canvas",
    pitch:
      "A dispatch portal for US small-fleet carriers: site, booking, and an AI voice agent that answers when you can't.",
    href: "/lp/logistics",
    linkLabel: "See FreightOps",
  },
  {
    id: "broadcast",
    order: 4,
    name: "Broadcast Basin",
    survey: "DISTRICT D · BROADCAST BASIN",
    landmark: "The Cutting House",
    pitch:
      "AI video editing & content, shipped on repeat — without sounding like a machine wrote it.",
    href: "/services/ai-video",
    linkLabel: "See AI Video Creation",
  },
] as const;

export const EASE = [0.16, 1, 0.3, 1] as const;
