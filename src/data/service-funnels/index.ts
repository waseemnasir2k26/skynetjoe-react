import type { ServiceFunnelContent } from "./types";

import zapierMake from "./zapier-make";
import socialAutomation from "./social-automation";
import aiVideo from "./ai-video";
import youtubeAutomation from "./youtube-automation";
import tiktokAutomation from "./tiktok-automation";
import facebookAutomation from "./facebook-automation";
import ecommerceAutomation from "./ecommerce-automation";
import aiBusinessSystems from "./ai-business-systems";
import strategyTraining from "./strategy-training";
import brandingDesign from "./branding-design";
import aiContentCreation from "./ai-content-creation";
import n8nAutomation from "./n8n-automation";
import gohighlevel from "./gohighlevel";
import aiChatbots from "./ai-chatbots";
import wordpressSeo from "./wordpress-seo";
import vibeCodedSites from "./vibe-coded-sites";

export type { ServiceFunnelContent } from "./types";

/**
 * Data-driven funnel content for all 16 service slugs (2026-08-19: the
 * former top-5 bespoke-LP slugs migrated onto this same data-driven
 * <ServiceFunnel/> template so every service page carries FAQPage schema,
 * pricing tiers, and an honest comparison section).
 * Keyed by slug; consumed by /services/[slug] → <ServiceFunnel/>.
 * zapier-make is the full exemplar; the rest are Phase-B stubs.
 */
export const SERVICE_FUNNELS: Record<string, ServiceFunnelContent> = {
  "zapier-make": zapierMake,
  "social-automation": socialAutomation,
  "ai-video": aiVideo,
  "youtube-automation": youtubeAutomation,
  "tiktok-automation": tiktokAutomation,
  "facebook-automation": facebookAutomation,
  "ecommerce-automation": ecommerceAutomation,
  "ai-business-systems": aiBusinessSystems,
  "strategy-training": strategyTraining,
  "branding-design": brandingDesign,
  "ai-content-creation": aiContentCreation,
  "n8n-automation": n8nAutomation,
  gohighlevel: gohighlevel,
  "ai-chatbots": aiChatbots,
  "wordpress-seo": wordpressSeo,
  "vibe-coded-sites": vibeCodedSites,
};
