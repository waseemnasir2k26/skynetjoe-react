/**
 * ServiceFunnelContent — the data contract that drives <ServiceFunnel/>.
 *
 * One module per non-top-5 service slug exports a default of this shape.
 * The funnel template (src/components/services/ServiceFunnel.tsx) renders it as
 * a full zero-bounce conversion funnel:
 *   hero → pain → outcomes (+ mid CTA) → process → proof → pricing → FAQ → final CTA.
 *
 * Pricing is NOT held here — it comes from findServicePricing(slug) so there is
 * a single source of truth for tiers/addons (src/lib/service-pricing.ts).
 */

export type FunnelCta = { label: string; href: string };

export type ServiceFunnelContent = {
  slug: string;
  label: string;
  /** Hero — h1 is an OUTCOME promise, not a feature list. */
  hero: {
    eyebrow: string;
    h1: string;
    sub: string;
    primary: FunnelCta;
    secondary: FunnelCta;
    /** Short mono trust chips rendered under the dual CTA. */
    trust: string[];
  };
  /** 3-4 pains — agitate the cost of NOT solving this. */
  pains: { title: string; body: string }[];
  /** 3-4 outcomes — the after-state / what they get, with optional proof line. */
  outcomes: { title: string; body: string; proof?: string }[];
  /** Exactly 3 steps — de-risk "how it works". */
  process: { title: string; body: string }[];
  /** One mini case receipt. */
  proof: { metric: string; client: string; detail: string };
  /** 4-6 objection-handling FAQs (also emitted as FAQPage JSON-LD). */
  faqs: { q: string; a: string }[];
  /** Closing terracotta CTA section. */
  finalCta: { h2: string; body: string; ctaLabel: string };

  // ── OPTIONAL MODULAR SECTIONS ────────────────────────────────────────────
  // Each funnel opts into a TASTEFUL SUBSET (≈2-3) so the 11 funnels feel
  // bespoke instead of templated. Every field is optional — the template
  // renders a section only when its data is present, in a fixed slot order:
  //   outcomes → [comparison] → process → [toolStack] → [fitCheck]
  //   → proof → [secondaryProof] → pricing → [guarantee] → faqs → finalCta
  // PROOF RULE: any metric/client in `secondaryProof` (and `comparison` claims)
  // must ground to a real entry in src/lib/case-studies.ts, OR be clearly
  // labelled a representative/internal SkynetLabs build. Never fabricate.

  /** "Us vs typical {agency|DIY SaaS|freelancer}" — 3-5 honest rows. */
  comparison?: {
    /** Section H2, e.g. "Me vs the agency you almost hired." */
    heading: string;
    /** Column headers: [dimension-col (usually ""), us, them]. */
    cols: [string, string, string];
    rows: { dimension: string; us: string; them: string }[];
  };

  /** Lead-qualification block — disqualifying honestly raises close rate. */
  fitCheck?: {
    /** 3-4 "you, if…" lines. */
    forYou: string[];
    /** 2-3 "not us, if…" lines — real disqualifiers, not humble-brags. */
    notForYou: string[];
  };

  /** Tool/stack credibility strip — the actual tools the build runs on. */
  toolStack?: { label: string; items: string[] };

  /** Risk-reversal block — solo-safe guarantees (fixed-scope-48h, fix window). */
  guarantee?: { title: string; body: string };

  /** A SECOND mini proof receipt for proof variety. MUST ground to a real
   *  case study or be labelled representative (see PROOF RULE above). */
  secondaryProof?: { metric: string; client: string; detail: string };

  /** "Try it free" cross-link strip to the matching /tools/* utilities —
   *  closes the hub↔spoke↔money loop. Renders after the FAQ, before final CTA. */
  freeTools?: {
    label: string;
    items: { label: string; href: string }[];
  };
};
