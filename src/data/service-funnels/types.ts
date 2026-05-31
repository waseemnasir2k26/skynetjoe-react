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
};
