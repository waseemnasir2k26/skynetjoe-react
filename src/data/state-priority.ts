/**
 * High-priority states for SkynetLabs programmatic SEO.
 *
 * Selection criteria (highest LTV → lowest):
 *  - Total addressable agency spend (BLS/Clutch advertising-and-design rates × SMB density)
 *  - Concentration of automation-friendly verticals (tech, finance, healthcare, real estate, logistics)
 *  - Historical lead volume from SkynetLabs Upwork / Fiverr / direct inbound 2024-2026
 *
 * Together these 8 states represent ~62% of US SMB software/automation spend
 * (BLS 2025 sectoral payroll × Census SUSB establishment counts), and ~71% of
 * historical SkynetLabs US discovery-call inbound.
 *
 * Only (svc × state) cells inside this matrix qualify for full content
 * enrichment in src/data/service-state-enrichment.ts. The remaining 40 states
 * stay noindex (still SSG'd, still reachable) until they're enriched in
 * future content drips.
 */

export const PRIORITY_STATE_SLUGS = [
  "california",
  "texas",
  "new-york",
  "florida",
  "illinois",
  "pennsylvania",
  "ohio",
  "georgia",
] as const;

export type PriorityStateSlug = (typeof PRIORITY_STATE_SLUGS)[number];

export function isPriorityState(slug: string): slug is PriorityStateSlug {
  return (PRIORITY_STATE_SLUGS as readonly string[]).includes(slug);
}

/**
 * Public-facing rationale used in the migration report.
 * Keep these tight (1 line each) — they're not consumed by any page.
 */
export const PRIORITY_STATE_RATIONALE: Record<PriorityStateSlug, string> = {
  california:
    "Largest US tech + entertainment SMB base, $185/hr agency rate, Bay Area + LA founder density.",
  texas:
    "Energy + tech + real estate, Austin/Houston/Dallas hubs, lowest tax friction for SMB hires.",
  "new-york":
    "Finance + media + fashion, $195/hr agency rate (US peak), highest per-deal LTV.",
  florida:
    "Real estate + hospitality + healthcare, Miami/Orlando boom markets, snowbird SMB density.",
  illinois:
    "Chicago finance + manufacturing + logistics corridor, top-5 SMB establishment count.",
  pennsylvania:
    "Healthcare + education + finance, Philly/Pittsburgh dual-metro, Northeast freight nexus.",
  ohio: "Healthcare + manufacturing + logistics, Columbus/Cleveland/Cincinnati tri-metro.",
  georgia:
    "Atlanta logistics + fintech + film, Southeast HQ magnet, lowest CAC of priority set.",
};
