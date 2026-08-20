/* ============================================================
   MERIDIAN (SkynetLabs /v9 port) — shared tokens + verbatim copy.
   Self-contained: nothing here is imported by any other route.
   Ported from waseemnasir-react /v/ai-city "MERIDIAN" (components/
   aicity-meridian/tokens.ts) — same day->night mechanic, same key
   names (so SceneObjects.ts / CameraPath.ts / MeridianCanvas.tsx
   are cloned byte-for-byte), palette re-themed from the source's
   cool jade/teal night city to SkynetLabs' warm deep-ink night
   ground + terracotta window/signal accents (cream #f2efe6, ink
   #1a1a1a, rust/terracotta #c66b3f — see app/globals.css). Do not
   invent new copy or numbers here.

   TRUTH GATE: the only numbers anywhere below are 180+, 40+, 9 and
   2019 (the four locked SkynetLabs proof stats) plus the approved
   CTA canon "Book a free 30-min check-up". Every other digit-bearing
   line from the source (fictional clock times, "~20 trips", "0"
   messages, "24/7", "10 vlogs", "BLDG 01") has been rewritten
   number-free — see the porting agent's return notes for the full
   old -> new list.
   ============================================================ */

export const C = {
  // Night sky / haze — warm deep-ink, the state the whole cycle
  // lands on and stays on for every HTML surface.
  skyDark: "#17140F",
  ground: "#241D16",
  paper: "#F2EFE6",
  card: "#211A14",
  ink: "#F2EFE6",
  body: "#CDBEA9",
  mute: "#8C7C69",
  hairline: "rgba(242,239,230,0.14)",
  jade: "#C66B3F", // CTA / base accent — brand terracotta
  jadeBright: "#F0925C", // lit window / signal glow — bright terracotta
  inkJade: "#2B2119", // unlit building / window base
  jadeTint: "rgba(198,107,63,0.18)",
  live: "#C66B3F",
  onDeep: "#F2EFE6",
} as const;

/* Dusk warm ramp — SHADER/CANVAS ONLY. Muted terracotta -> warm dark
   taupe -> ink, never neon-orange "AI-slop sunset" territory, and
   only ever visible for the first ~30% of scroll before the cycle
   folds back into C.skyDark. NEVER reference these in any HTML/
   Scrim/card — those stay on C above. */
export const DUSK = {
  duskA: "#E9C9A6", // warm horizon haze, muted
  duskB: "#C17B52", // mid-sky terracotta, desaturated
  duskC: "#3A2E24", // upper-sky warm dark taupe, folds into skyDark
} as const;

// Internal route — same-origin, no target=_blank (v8 pattern).
export const CTA_URL = "/discovery-call";

/* H1 + subhead — verbatim, mirrored from the live homepage Hero
   (src/lib/site.ts / components/Header.tsx voice). Must stay
   identical to the rest of the site. */
export const H1 =
  "Every hour your team works by hand, your business leaks money.";
export const SUB =
  "Leads ghost. Follow-ups slip. Your team drowns in repetitive ops. I'm Waseem Nasir, founder of SkynetLabs — I find where your business bleeds time and money, then build the systems that stop it.";
// CTA canon per build brief (approved exception to the digit gate).
export const CTA_LABEL = "Book a free 30-min check-up";

/* Hero mono cue — ported from source's "Close the Office" hook, with
   the fictional clock digit ("4:52 PM") removed per the truth gate.
   Ties the scroll affordance to the day/night thesis, no dated claim. */
export const HERO_CUE = "IT'S CLOSING TIME — SCROLL TO CLOSE THE OFFICE";

/* The 4 LOCKED proof numbers — verbatim, single source of truth is
   src/lib/site.ts / ProofBand. Mirrored (not imported) to keep this
   route fully self-contained per scope rules; values must stay
   identical to the rest of the site. */
export const PROOF = [
  { value: 180, suffix: "+", label: "workflows built" },
  { value: 40, suffix: "+", label: "sites shipped" },
  { value: 9, suffix: "", label: "countries served" },
  { value: 2019, suffix: "", label: "in practice since", roll: false },
] as const;

/* THE STACK DISTRICT — 5 landmark towers mapped to real SkynetLabs
   service categories (src/lib/site.ts SERVICE_CATEGORIES). Pitches
   are original one-liners describing real offerings, no invented
   metrics. "10 vlogs in one batch" (source) rewritten number-free. */
export const DISTRICT = [
  {
    id: "switchboard",
    name: "The Switchboard",
    service: "Lead response / inbox automation",
    pitch: "Every lead answered before it goes cold.",
  },
  {
    id: "gatehouse",
    name: "The Gatehouse",
    service: "Per-customer portals",
    pitch: "Each customer sees only their own door.",
  },
  {
    id: "conveyor",
    name: "The Conveyor",
    service: "Ops automation / CRM follow-up",
    pitch: "First touch to close, nothing dropped.",
  },
  {
    id: "radio-mast",
    name: "The Radio Mast",
    service: "Voice agents",
    pitch: "It picks up when you can't.",
  },
  {
    id: "projection-house",
    name: "The Projection House",
    service: "AI video editing / publishing",
    pitch: "Whole videos edited overnight, ready by morning.",
  },
] as const;

/* Work billboards — reused from the site's real client work, claims
   locked to what's true. Dental stays explicitly a demo. Every
   digit-bearing metric from the source ("~20 trips", "0", "24/7")
   rewritten number-free below. */
export const WORK = [
  {
    client: "idea-viaggi / KODIASIMMO",
    outcome: "Per-user trip authorization, delivered.",
    metric: "Trip access",
    note: "each gated so a customer sees only what they booked.",
    mech: "Per-customer trip access",
    status: "DELIVERED" as const,
  },
  {
    client: "Insurance retainer client",
    outcome: "Inbound email, handled for them.",
    metric: "Answered",
    note: "nothing sits in the inbox — triage + auto-reply runs it for them.",
    mech: "Inbox triage + auto-reply",
    status: "LIVE" as const,
  },
  {
    client: "Christelle",
    outcome: "Care intake, handled for them.",
    metric: "Always on",
    note: "first-response handled around the clock.",
    mech: "Care intake, automated",
    status: "LIVE" as const,
  },
  {
    client: "Dental practice",
    outcome: "Front desk, automated — a demo build, not a paid client.",
    metric: "Demo",
    note: "booking + reminders + auto-reply.",
    mech: "Front desk, automated",
    status: "DEMO" as const,
  },
] as const;

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ── The 6 stages of the compressed day. Fictional time-of-day labels
   only (source's numeric clock stamps — "17:42" etc. — dropped
   per the truth gate: they're decorative but still digit-bearing).
   Drives both the clock-strip day nav and each section's header
   stamp. ── */
export const STAGES = [
  { id: "golden", label: "GOLDEN HOUR" },
  { id: "sunset", label: "SUNSET" },
  { id: "dusk", label: "DUSK" },
  { id: "nightfall", label: "NIGHTFALL" },
  { id: "deep", label: "DEEP NIGHT" },
  { id: "midnight", label: "MIDNIGHT" },
] as const;

export type StageId = (typeof STAGES)[number]["id"];
