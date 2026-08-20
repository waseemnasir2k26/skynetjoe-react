/* ============================================================
   SIGNALGRID (v11) — shared tokens + locked copy, SkynetLabs (skynetjoe.com)
   translation of waseemnasir-react's /v/ai-city-3 "SIGNALGRID" concept.
   Ported per AI-CITY-WAVE1-BLUEPRINT.md "Site B" palette ruling: warm
   deep-ink night ground + terracotta (#c66b3f) window/signal accents on
   the cream/ink/rust brand — same signature mechanic (wireframe city,
   GPU shader pulses, The Leak), new brand skin. Self-contained: nothing
   here is imported by any other route. Do not invent new copy or
   numbers — only 180+ / 40+ / 9 / 2019 may appear anywhere downstream.
   ============================================================ */

export const C = {
  skyDark: "#170F0C",
  ground: "#2B1710",
  paper: "#FBFCFD",
  card: "#241713",
  ink: "#F5EFE6",
  body: "#D9CBBE",
  mute: "#A98D7A",
  hairline: "rgba(245,239,230,0.14)",
  jade: "#C66B3F",
  jadeBright: "#E2854F",
  inkJade: "#2B1710",
  jadeTint: "rgba(198,107,63,0.18)",
  live: "#C66B3F",
  onDeep: "#F5EFE6",

  /* SIGNALGRID additions — additive only, everything else is `C` verbatim */
  signalDim: "rgba(198,107,63,0.22)",
  signalHot: "#FFC392",
  gridHair: "rgba(198,107,63,0.30)",
} as const;

/* In-repo route — this build lives ON skynetjoe.com, so the CTA is a
   relative internal link (no target=_blank), same convention as
   components/v8/HeroWorkshop.tsx. */
export const CTA_URL = "/discovery-call";

/* H1 + subhead. H1 kept verbatim from the approved SIGNALGRID concept
   (plain language, no digits). SUB rewritten to SkynetLabs agency voice
   (this route ships on the agency's own domain, not a personal-founder
   preview) — no new claims, no digits. */
export const H1 =
  "Every hour your team works by hand, your business leaks money.";
export const SUB =
  "Leads ghost. Follow-ups slip. Your team drowns in repetitive busywork. SkynetLabs finds where your business bleeds time and money, then builds the systems that stop it.";
export const CTA_LABEL = "Book a free 30-min check-up";

/* The 4 LOCKED proof numbers — verbatim, same figures published in
   ProofBand.tsx / site.ts STATS. Single allowed source of digits. */
export const PROOF = [
  { value: 180, suffix: "+", label: "workflows shipped" },
  { value: 40, suffix: "+", label: "sites delivered" },
  { value: 9, suffix: "", label: "countries served" },
  { value: 2019, suffix: "", label: "shipping since" },
] as const;

/* STACK — 5 landmark towers, the real tool stack (mirrors FOOTER_COLUMNS
   "Services" — n8n, GHL, WordPress, AI/chatbots — plus WhatsApp intake).
   n8n sits center — the architecture diagram IS the skyline. */
export const STACK = [
  { id: "n8n", label: "n8n", sub: "Workflow engine" },
  { id: "whatsapp", label: "WhatsApp", sub: "Intake & bots" },
  { id: "wordpress", label: "WordPress", sub: "Client sites" },
  { id: "ghl", label: "GHL", sub: "Pipelines & CRM" },
  { id: "ai", label: "AI core", sub: "Agents & automation" },
] as const;

/* SITE B service blocks — the four TOWER FLYBYS district, copy verbatim
   from AI-CITY-WAVE1-BLUEPRINT.md's SIGNALGRID "Site B" table. `id`
   fields stay pinned to the SERVICE_NODES ids in graph.ts so the 3D
   hover/focus mechanic and this copy can never drift. FreightOps is
   named as one offer inside a block, never linked — when it does need a
   link elsewhere it is /lp/logistics only, never /services/freightops-logistics. */
export const SERVICES = [
  {
    id: "exchange",
    district: "DISTRICT A",
    label: "Automation Quarter",
    kicker: "n8n · GHL · Zapier/Make · social · FreightOps",
    pitch: "We wire your tools together so work moves itself.",
  },
  {
    id: "gatehouse",
    district: "DISTRICT B",
    label: "Broadcast Row",
    kicker: "AI video · social publishing, fan-out lanes",
    pitch: "One piece of content goes in, every platform gets it.",
  },
  {
    id: "relayyard",
    district: "DISTRICT C",
    label: "Foundry Block",
    kicker: "WordPress SEO · e-commerce · vibe-coded sites · chatbots",
    pitch: "Sites and bots built fast, owned by you.",
  },
  {
    id: "speaker",
    district: "DISTRICT D",
    label: "The Observatory",
    kicker: "AI business systems · strategy · branding · content",
    pitch:
      "We look at your whole operation and tell you what to automate first.",
  },
] as const;

/* WORK — named clients, WORKS BOULEVARD. Drawn from the real, published
   /case-studies roster, reworded number-free for the truth gate (no
   digit-bearing claims outside 180+/40+/9/2019) — same facts, plainer
   language, nothing invented. `id`s match CLIENT_NODES in graph.ts.
   The dealership entry is a demo build, not a paid client — dashed
   stroke everywhere (3D + SVG), the spec-demo truth rule made visual. */
export const WORK = [
  {
    id: "eu-logistics",
    client: "EU logistics group",
    outcome: "Inbound email, handled for them.",
    metric: "Faster",
    note: "replies draft themselves inside a strict accuracy gate.",
    mech: "Inbox triage + auto-reply",
    status: "LIVE" as const,
    dashed: false,
  },
  {
    id: "insurance-ghl",
    client: "US insurance retainer client",
    outcome: "Pipeline, rebuilt and running.",
    metric: "Live",
    note: "funnels, follow-ups and calendar links run without manual triage.",
    mech: "GHL pipeline rebuild",
    status: "LIVE" as const,
    dashed: false,
  },
  {
    id: "bali-wellness",
    client: "Bali wellness practitioner",
    outcome: "Bookings, without ads.",
    metric: "More",
    note: "a funnel that books the appointment instead of just informing.",
    mech: "Conversion funnel + scheduling",
    status: "LIVE" as const,
    dashed: false,
  },
  {
    id: "auto-dealership-demo",
    client: "Premium auto dealership network",
    outcome: "Front desk, automated — a demo build, not a paid client.",
    metric: "Demo",
    note: "finance gate, inventory grid, and a trade-in flow that skips the login wall.",
    mech: "Dealer site demo",
    status: "DEMO" as const,
    dashed: true,
  },
] as const;

export const EASE = [0.16, 1, 0.3, 1] as const;

/* Honesty layer — locked mono chip copy, carried on every real client
   lane. Rewritten number-free (source read "1 pulse = 1 handled message"). */
export const LANE_HONESTY_CHIP =
  "each pulse marks one handled message (illustrative)";

/* The Leak — the one deliberately broken lane in the entry grid. */
export const LEAK_CHIP = "This is the leak. Manual handoff. Data dies here.";
