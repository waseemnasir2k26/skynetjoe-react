import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // OpenAI
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      // Anthropic
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      // Perplexity
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      // Google AI
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "GoogleOther", allow: "/" },
      // Common Crawl (training-data feeder)
      { userAgent: "CCBot", allow: "/" },
      // Microsoft / Bing
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "msnbot", allow: "/" },
      // Apple Intelligence
      { userAgent: "Applebot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      // Meta AI
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "FacebookBot", allow: "/" },
      // Mistral / Cohere / others
      { userAgent: "cohere-ai", allow: "/" },
      { userAgent: "MistralAI-User", allow: "/" },
      // DuckDuckGo
      { userAgent: "DuckDuckBot", allow: "/" },
      // Brave
      { userAgent: "Bravebot", allow: "/" },
      // Bytedance (Doubao / TikTok search)
      { userAgent: "Bytespider", allow: "/" },
      // You.com
      { userAgent: "YouBot", allow: "/" },
    ],
    sitemap: [
      `${SITE.url}/sitemap.xml`,
      `${SITE.url}/llms.txt`,
      `${SITE.url}/llms-full.txt`,
    ],
    host: SITE.url,
  };
}
