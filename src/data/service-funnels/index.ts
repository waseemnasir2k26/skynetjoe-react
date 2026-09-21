import type { ServiceFunnelContent } from "./types";

import n8nAutomation from "./n8n-automation";
import gohighlevel from "./gohighlevel";
import aiChatbots from "./ai-chatbots";
import wordpressSeo from "./wordpress-seo";
import vibeCodedSites from "./vibe-coded-sites";

export type { ServiceFunnelContent } from "./types";

/**
 * Data-driven funnel content for the 5 core service slugs (2026-09-21:
 * the 11 non-core funnels were deleted; their URLs 301 via
 * src/lib/simplify-redirects.ts). Keyed by slug; consumed by
 * /services/[slug] → <ServiceFunnel/>.
 */
export const SERVICE_FUNNELS: Record<string, ServiceFunnelContent> = {
  "n8n-automation": n8nAutomation,
  gohighlevel: gohighlevel,
  "ai-chatbots": aiChatbots,
  "wordpress-seo": wordpressSeo,
  "vibe-coded-sites": vibeCodedSites,
};
