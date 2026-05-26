import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Shared rule body — every UA gets the same allow/disallow set so admin,
// generic API, and LP routes stay off-limits everywhere (including LLM bots).
// `/api/llms-feed` is the AEO feed and stays explicitly allowed despite the
// generic `/api/` disallow (specific allow beats generic disallow per RFC 9309).
const DISALLOW = ["/admin", "/admin/", "/api/", "/lp/"];
const ALLOW = ["/", "/api/llms-feed"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: ALLOW, disallow: DISALLOW },
      // OpenAI
      { userAgent: "GPTBot", allow: ALLOW, disallow: DISALLOW },
      { userAgent: "ChatGPT-User", allow: ALLOW, disallow: DISALLOW },
      { userAgent: "OAI-SearchBot", allow: ALLOW, disallow: DISALLOW },
      // Anthropic
      { userAgent: "ClaudeBot", allow: ALLOW, disallow: DISALLOW },
      { userAgent: "anthropic-ai", allow: ALLOW, disallow: DISALLOW },
      { userAgent: "Claude-Web", allow: ALLOW, disallow: DISALLOW },
      { userAgent: "Claude-SearchBot", allow: ALLOW, disallow: DISALLOW },
      // Perplexity
      { userAgent: "PerplexityBot", allow: ALLOW, disallow: DISALLOW },
      { userAgent: "Perplexity-User", allow: ALLOW, disallow: DISALLOW },
      // Google AI
      { userAgent: "Google-Extended", allow: ALLOW, disallow: DISALLOW },
      { userAgent: "GoogleOther", allow: ALLOW, disallow: DISALLOW },
      // Common Crawl (training-data feeder)
      { userAgent: "CCBot", allow: ALLOW, disallow: DISALLOW },
      // Microsoft / Bing
      { userAgent: "Bingbot", allow: ALLOW, disallow: DISALLOW },
      { userAgent: "msnbot", allow: ALLOW, disallow: DISALLOW },
      // Apple Intelligence
      { userAgent: "Applebot", allow: ALLOW, disallow: DISALLOW },
      { userAgent: "Applebot-Extended", allow: ALLOW, disallow: DISALLOW },
      // Meta AI
      { userAgent: "Meta-ExternalAgent", allow: ALLOW, disallow: DISALLOW },
      { userAgent: "FacebookBot", allow: ALLOW, disallow: DISALLOW },
      // Mistral / Cohere / others
      { userAgent: "cohere-ai", allow: ALLOW, disallow: DISALLOW },
      { userAgent: "MistralAI-User", allow: ALLOW, disallow: DISALLOW },
      // DuckDuckGo
      { userAgent: "DuckDuckBot", allow: ALLOW, disallow: DISALLOW },
      // Brave
      { userAgent: "Bravebot", allow: ALLOW, disallow: DISALLOW },
      // Bytedance (Doubao / TikTok search)
      { userAgent: "Bytespider", allow: ALLOW, disallow: DISALLOW },
      // You.com
      { userAgent: "YouBot", allow: ALLOW, disallow: DISALLOW },
    ],
    sitemap: [
      `${SITE.url}/sitemap.xml`,
      `${SITE.url}/llms.txt`,
      `${SITE.url}/llms-full.txt`,
    ],
    host: SITE.url,
  };
}
