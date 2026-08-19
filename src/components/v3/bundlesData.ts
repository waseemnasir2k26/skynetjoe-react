/**
 * Bundle content for BundlesSection.tsx — 3 problem-first, bundled
 * big-problem-solver offers (replacing the old 5-simple-service-card
 * ServiceStrip). Proof lines are reused VERBATIM from the canonical build
 * brief / src/lib/case-studies.ts source facts:
 *  - bookings-double claim -> case-studies.ts "bali-wellness-conversion-funnel"
 *    (oneLineOutcome + longFormStory: "Bookings doubled inside the first 30
 *    days post-launch, with the same Instagram traffic...").
 *  - 6h->6min claim -> case-studies.ts "eu-logistics-email-triage-n8n"
 *    (oneLineOutcome: "Cut Gmail triage response time from 6 hours to 6
 *    minutes...").
 * Bundle C (AI Visibility Engine) carries NO proof line — no matching real
 * case study exists in case-studies.ts for AEO/schema outcomes, so none is
 * invented.
 *
 * Bundle B ("Inbox Ops Autopilot") is the flagship — the ONLY bundle with a
 * price shown, using the exact canonical numbers from the build brief:
 * $2,750 setup + $395/mo. Bundles A and C link to /pricing instead of
 * stating a number (per brief: "NO prices" for A/C).
 */
export type Bundle = {
  id: string;
  eyebrow: string;
  painHeadline: string;
  name: string;
  whatsInside: string[];
  proofLine?: string;
  flagship?: boolean;
  price?: { setup: string; monthly: string };
  freeEntry?: { label: string; href: string };
};

export const BUNDLES: Bundle[] = [
  {
    id: "speed-to-lead",
    eyebrow: "Bundle 01",
    painHeadline: "Leads go cold while you're on the job.",
    name: "Speed-to-Lead System",
    whatsInside: [
      "Instant AI reply on every channel — site chat, SMS, WhatsApp",
      "Automatic lead qualification before it hits your calendar",
      "n8n follow-up sequence so no lead is left on read",
      "Calendar booking wired straight into the flow",
    ],
    proofLine:
      "Bookings doubled in 30 days on the same traffic — wellness studio, Ubud.",
  },
  {
    id: "inbox-ops-autopilot",
    eyebrow: "Bundle 02 · Flagship",
    painHeadline: "Your inbox eats your day.",
    name: "Inbox Ops Autopilot",
    whatsInside: [
      "Every incoming thread triaged by intent automatically",
      "AI drafts replies in your voice, ready to send",
      "Automatic follow-ups so nothing goes cold",
      "Human escalation gate for anything sensitive",
    ],
    proofLine: "Routine reply time 6 h → 6 min — logistics group (EU).",
    flagship: true,
    price: { setup: "$2,750 setup", monthly: "$395/mo" },
  },
  {
    id: "ai-visibility-engine",
    eyebrow: "Bundle 03",
    painHeadline: "Invisible on Google and AI search.",
    name: "AI Visibility Engine",
    whatsInside: [
      "Technical SEO + schema markup AI crawlers can actually read",
      "AEO-tuned content so ChatGPT and Perplexity cite you by name",
      "Structured-data audit across the whole site",
      "Free entry point: run the AEO audit tool first",
    ],
    freeEntry: { label: "Try the free AEO audit", href: "/tools/aeo-audit" },
  },
];
