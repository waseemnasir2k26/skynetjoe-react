/**
 * SkynetLabs keyword universe — strategic SEO depth pass 2026-05-22.
 *
 * 215 keywords mapped across 9 clusters. Drives future programmatic page
 * expansion, content roadmap, and on-page delta application.
 *
 * Companion doc: app/SEO_KEYWORDS_EXPANSION_2026-05-22.md
 *
 * Volume tiers (US-EN monthly est):
 *   high = 5k+/mo, med = 500-5k, low = <500
 *
 * Competition tiers (Ahrefs-style KD):
 *   high = 50+, med = 20-50, low = <20
 */

export type SearchIntent =
  | "informational"
  | "transactional"
  | "comparison"
  | "local";

export type VolumeTier = "high" | "med" | "low";
export type CompetitionTier = "high" | "med" | "low";

export type KeywordCluster =
  | "n8n-longtail"
  | "ghl-funnel"
  | "ai-chatbots-niche"
  | "aeo-geo"
  | "claude-code-vibe"
  | "ai-business-systems"
  | "wordpress-ai-seo"
  | "comparison"
  | "local-state-city";

export type Keyword = {
  /** The query as a user types it */
  term: string;
  cluster: KeywordCluster;
  intent: SearchIntent;
  volume: VolumeTier;
  competition: CompetitionTier;
  /** Target page (existing or NEW marker for future-build) */
  target: string;
  /** Optional notes for content brief */
  notes?: string;
};

export const KEYWORDS: Keyword[] = [
  // ── Cluster A — n8n automation long-tail (42)
  { term: "n8n alternative", cluster: "n8n-longtail", intent: "comparison", volume: "high", competition: "high", target: "NEW /n8n-alternatives" },
  { term: "n8n vs zapier pricing", cluster: "n8n-longtail", intent: "comparison", volume: "med", competition: "high", target: "/n8n-vs-zapier#pricing" },
  { term: "n8n self hosted setup", cluster: "n8n-longtail", intent: "informational", volume: "med", competition: "med", target: "NEW /blog/n8n-self-hosted-setup-guide" },
  { term: "n8n templates for ecommerce", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "NEW /blog/n8n-templates-ecommerce" },
  { term: "n8n templates for real estate", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "NEW /blog/n8n-templates-real-estate" },
  { term: "n8n templates for dental", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "NEW /blog/n8n-templates-dental" },
  { term: "n8n templates for agencies", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "NEW /blog/n8n-templates-agencies" },
  { term: "hire n8n developer", cluster: "n8n-longtail", intent: "transactional", volume: "med", competition: "low", target: "/services/n8n-automation" },
  { term: "hire n8n freelancer", cluster: "n8n-longtail", intent: "transactional", volume: "med", competition: "low", target: "/services/n8n-automation" },
  { term: "n8n agency", cluster: "n8n-longtail", intent: "transactional", volume: "low", competition: "low", target: "/services/n8n-automation" },
  { term: "n8n consultant", cluster: "n8n-longtail", intent: "transactional", volume: "low", competition: "low", target: "/services/n8n-automation" },
  { term: "n8n expert", cluster: "n8n-longtail", intent: "transactional", volume: "low", competition: "low", target: "/services/n8n-automation" },
  { term: "n8n vs make", cluster: "n8n-longtail", intent: "comparison", volume: "med", competition: "med", target: "NEW /blog/n8n-vs-make-honest-comparison" },
  { term: "n8n vs activepieces", cluster: "n8n-longtail", intent: "comparison", volume: "low", competition: "low", target: "NEW /blog/n8n-vs-activepieces" },
  { term: "n8n vs windmill", cluster: "n8n-longtail", intent: "comparison", volume: "low", competition: "low", target: "NEW /blog/n8n-vs-windmill" },
  { term: "n8n vs node-red", cluster: "n8n-longtail", intent: "comparison", volume: "low", competition: "low", target: "NEW /blog/n8n-vs-node-red" },
  { term: "n8n vs power automate", cluster: "n8n-longtail", intent: "comparison", volume: "low", competition: "med", target: "NEW /blog/n8n-vs-power-automate" },
  { term: "n8n cloud vs self hosted", cluster: "n8n-longtail", intent: "comparison", volume: "low", competition: "low", target: "NEW /blog/n8n-cloud-vs-self-hosted" },
  { term: "n8n docker setup", cluster: "n8n-longtail", intent: "informational", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "n8n kubernetes deployment", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "n8n hipaa compliant", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "med", target: "NEW /blog/is-n8n-hipaa-compliant" },
  { term: "n8n gdpr compliance", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "med", target: "NEW blog post" },
  { term: "n8n openai integration", cluster: "n8n-longtail", intent: "informational", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "n8n claude integration", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "n8n whatsapp integration", cluster: "n8n-longtail", intent: "informational", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "n8n airtable workflow", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "n8n notion integration", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "n8n shopify automation", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "n8n stripe webhook", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "n8n custom node tutorial", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "n8n credentials encryption", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "n8n queue mode setup", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "n8n license terms", cluster: "n8n-longtail", intent: "informational", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "n8n pricing 2026", cluster: "n8n-longtail", intent: "informational", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "n8n vs zapier cost calculator", cluster: "n8n-longtail", intent: "comparison", volume: "low", competition: "low", target: "/n8n-vs-zapier (add widget)" },
  { term: "n8n error handling best practices", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "n8n migrate from zapier", cluster: "n8n-longtail", intent: "informational", volume: "med", competition: "low", target: "NEW /blog/migrate-zapier-to-n8n" },
  { term: "n8n migrate from make", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "n8n consultant rates", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "/pricing (add n8n row)" },
  { term: "n8n agency near me", cluster: "n8n-longtail", intent: "local", volume: "med", competition: "low", target: "/locations (add n8n variant)" },
  { term: "hire n8n developer remote", cluster: "n8n-longtail", intent: "transactional", volume: "low", competition: "low", target: "/services/n8n-automation" },
  { term: "best n8n templates 2026", cluster: "n8n-longtail", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },

  // ── Cluster B — GoHighLevel deep funnel (30)
  { term: "gohighlevel agency", cluster: "ghl-funnel", intent: "transactional", volume: "high", competition: "high", target: "/services/gohighlevel" },
  { term: "gohighlevel snapshot", cluster: "ghl-funnel", intent: "informational", volume: "high", competition: "high", target: "NEW /blog/best-gohighlevel-snapshots-2026" },
  { term: "gohighlevel snapshot for dental", cluster: "ghl-funnel", intent: "transactional", volume: "med", competition: "low", target: "NEW /blog/gohighlevel-snapshot-dental-practice" },
  { term: "gohighlevel snapshot for real estate", cluster: "ghl-funnel", intent: "transactional", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "gohighlevel snapshot for med spa", cluster: "ghl-funnel", intent: "transactional", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "gohighlevel snapshot for chiropractor", cluster: "ghl-funnel", intent: "transactional", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "gohighlevel snapshot for law firm", cluster: "ghl-funnel", intent: "transactional", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "gohighlevel whatsapp integration", cluster: "ghl-funnel", intent: "informational", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "gohighlevel sms compliance", cluster: "ghl-funnel", intent: "informational", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "gohighlevel a2p 10dlc setup", cluster: "ghl-funnel", intent: "informational", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "gohighlevel vs hubspot", cluster: "ghl-funnel", intent: "comparison", volume: "high", competition: "high", target: "NEW /blog/gohighlevel-vs-hubspot" },
  { term: "gohighlevel vs activecampaign", cluster: "ghl-funnel", intent: "comparison", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "gohighlevel vs clickfunnels", cluster: "ghl-funnel", intent: "comparison", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "gohighlevel vs keap", cluster: "ghl-funnel", intent: "comparison", volume: "low", competition: "med", target: "NEW blog post" },
  { term: "gohighlevel vs kajabi", cluster: "ghl-funnel", intent: "comparison", volume: "low", competition: "med", target: "NEW blog post" },
  { term: "gohighlevel saas mode pricing", cluster: "ghl-funnel", intent: "informational", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "gohighlevel white label setup", cluster: "ghl-funnel", intent: "informational", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "gohighlevel workflow tutorial", cluster: "ghl-funnel", intent: "informational", volume: "high", competition: "med", target: "NEW blog post" },
  { term: "gohighlevel api integration", cluster: "ghl-funnel", intent: "informational", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "gohighlevel calendar automation", cluster: "ghl-funnel", intent: "informational", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "gohighlevel pipeline best practices", cluster: "ghl-funnel", intent: "informational", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "hire gohighlevel expert", cluster: "ghl-funnel", intent: "transactional", volume: "med", competition: "low", target: "/services/gohighlevel" },
  { term: "gohighlevel consultant", cluster: "ghl-funnel", intent: "transactional", volume: "med", competition: "low", target: "/services/gohighlevel" },
  { term: "gohighlevel setup cost", cluster: "ghl-funnel", intent: "informational", volume: "med", competition: "low", target: "/pricing" },
  { term: "gohighlevel for dental practice", cluster: "ghl-funnel", intent: "transactional", volume: "med", competition: "low", target: "/services/gohighlevel (add H2)" },
  { term: "gohighlevel for chiropractor", cluster: "ghl-funnel", intent: "transactional", volume: "low", competition: "low", target: "/services/gohighlevel" },
  { term: "gohighlevel no show automation", cluster: "ghl-funnel", intent: "informational", volume: "low", competition: "low", target: "/blog/ghl-no-show-automation-case-study" },
  { term: "gohighlevel review 2026", cluster: "ghl-funnel", intent: "comparison", volume: "high", competition: "high", target: "NEW honest review post" },
  { term: "gohighlevel migration service", cluster: "ghl-funnel", intent: "transactional", volume: "low", competition: "low", target: "/services/gohighlevel" },
  { term: "gohighlevel agency partner", cluster: "ghl-funnel", intent: "transactional", volume: "low", competition: "low", target: "/services/gohighlevel" },

  // ── Cluster C — AI chatbots niche-specific (30)
  { term: "dental ai chatbot", cluster: "ai-chatbots-niche", intent: "transactional", volume: "med", competition: "low", target: "NEW /services/ai-chatbots/dental" },
  { term: "real estate whatsapp bot", cluster: "ai-chatbots-niche", intent: "transactional", volume: "med", competition: "low", target: "NEW /services/ai-chatbots/real-estate" },
  { term: "law firm ai chatbot", cluster: "ai-chatbots-niche", intent: "transactional", volume: "med", competition: "low", target: "NEW /services/ai-chatbots/law-firm" },
  { term: "med spa whatsapp bot", cluster: "ai-chatbots-niche", intent: "transactional", volume: "low", competition: "low", target: "NEW niche page" },
  { term: "clinic appointment chatbot", cluster: "ai-chatbots-niche", intent: "transactional", volume: "med", competition: "low", target: "NEW niche page" },
  { term: "chiropractor whatsapp bot", cluster: "ai-chatbots-niche", intent: "transactional", volume: "low", competition: "low", target: "NEW niche page" },
  { term: "restaurant whatsapp ordering bot", cluster: "ai-chatbots-niche", intent: "transactional", volume: "med", competition: "low", target: "NEW niche page" },
  { term: "salon booking chatbot", cluster: "ai-chatbots-niche", intent: "transactional", volume: "med", competition: "low", target: "NEW niche page" },
  { term: "ecommerce whatsapp bot", cluster: "ai-chatbots-niche", intent: "transactional", volume: "med", competition: "med", target: "NEW niche page" },
  { term: "shopify whatsapp chatbot", cluster: "ai-chatbots-niche", intent: "transactional", volume: "med", competition: "low", target: "NEW niche page" },
  { term: "whatsapp business api setup", cluster: "ai-chatbots-niche", intent: "informational", volume: "high", competition: "high", target: "NEW /blog/whatsapp-business-api-setup-guide" },
  { term: "whatsapp template message approval", cluster: "ai-chatbots-niche", intent: "informational", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "whatsapp business solution provider", cluster: "ai-chatbots-niche", intent: "transactional", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "manychat alternative", cluster: "ai-chatbots-niche", intent: "comparison", volume: "med", competition: "med", target: "NEW comparison post" },
  { term: "manychat vs chatfuel", cluster: "ai-chatbots-niche", intent: "comparison", volume: "low", competition: "med", target: "NEW blog post" },
  { term: "ai voice agent for clinics", cluster: "ai-chatbots-niche", intent: "transactional", volume: "low", competition: "low", target: "NEW niche page" },
  { term: "ai receptionist for dentists", cluster: "ai-chatbots-niche", intent: "transactional", volume: "low", competition: "low", target: "NEW niche page" },
  { term: "ai phone agent vs human", cluster: "ai-chatbots-niche", intent: "comparison", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "retell ai vs vapi", cluster: "ai-chatbots-niche", intent: "comparison", volume: "low", competition: "low", target: "NEW comparison post" },
  { term: "vapi alternative", cluster: "ai-chatbots-niche", intent: "comparison", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "hire ai chatbot developer", cluster: "ai-chatbots-niche", intent: "transactional", volume: "med", competition: "low", target: "/services/ai-chatbots" },
  { term: "custom gpt for business", cluster: "ai-chatbots-niche", intent: "transactional", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "claude chatbot integration", cluster: "ai-chatbots-niche", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "openai assistants api tutorial", cluster: "ai-chatbots-niche", intent: "informational", volume: "high", competition: "high", target: "NEW blog post" },
  { term: "rag chatbot for small business", cluster: "ai-chatbots-niche", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "langchain agency", cluster: "ai-chatbots-niche", intent: "transactional", volume: "low", competition: "low", target: "NEW niche page" },
  { term: "crewai consultant", cluster: "ai-chatbots-niche", intent: "transactional", volume: "low", competition: "low", target: "NEW niche page" },
  { term: "chatbot for service business", cluster: "ai-chatbots-niche", intent: "transactional", volume: "med", competition: "low", target: "/services/ai-chatbots (H2)" },
  { term: "whatsapp bot for clinic", cluster: "ai-chatbots-niche", intent: "transactional", volume: "low", competition: "low", target: "NEW niche page" },
  { term: "conversational ai agency", cluster: "ai-chatbots-niche", intent: "transactional", volume: "med", competition: "med", target: "/services/ai-chatbots" },

  // ── Cluster D — AEO/GEO emerging queries (22)
  { term: "how to rank in chatgpt", cluster: "aeo-geo", intent: "informational", volume: "high", competition: "low", target: "/aeo-guide", notes: "Already on-topic, add H2" },
  { term: "claude citations seo", cluster: "aeo-geo", intent: "informational", volume: "low", competition: "low", target: "/aeo-guide (Claude H2)" },
  { term: "perplexity ranking", cluster: "aeo-geo", intent: "informational", volume: "med", competition: "low", target: "/aeo-guide" },
  { term: "answer engine optimization checklist", cluster: "aeo-geo", intent: "informational", volume: "med", competition: "low", target: "NEW /blog/aeo-checklist-2026" },
  { term: "aeo vs seo", cluster: "aeo-geo", intent: "comparison", volume: "med", competition: "low", target: "NEW /blog/aeo-vs-seo-honest-comparison" },
  { term: "llms.txt explained", cluster: "aeo-geo", intent: "informational", volume: "med", competition: "low", target: "NEW /blog/llms-txt-explained" },
  { term: "how to write for llms", cluster: "aeo-geo", intent: "informational", volume: "med", competition: "low", target: "/aeo-guide (add H2 + HowTo)" },
  { term: "generative engine optimization", cluster: "aeo-geo", intent: "informational", volume: "high", competition: "med", target: "NEW /geo-guide pillar" },
  { term: "geo vs seo", cluster: "aeo-geo", intent: "comparison", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "optimize for google sge", cluster: "aeo-geo", intent: "informational", volume: "high", competition: "med", target: "NEW blog post" },
  { term: "bing chat ranking factors", cluster: "aeo-geo", intent: "informational", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "gemini search optimization", cluster: "aeo-geo", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "get cited by chatgpt", cluster: "aeo-geo", intent: "informational", volume: "high", competition: "low", target: "NEW blog post" },
  { term: "get cited by perplexity", cluster: "aeo-geo", intent: "informational", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "get cited by claude", cluster: "aeo-geo", intent: "informational", volume: "low", competition: "low", target: "NEW blog post", notes: "Likely page-1 ready" },
  { term: "structured data for ai search", cluster: "aeo-geo", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "faqpage schema generator", cluster: "aeo-geo", intent: "informational", volume: "med", competition: "high", target: "/tools (add widget)" },
  { term: "howto schema example 2026", cluster: "aeo-geo", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "answer engine ranking tools", cluster: "aeo-geo", intent: "informational", volume: "low", competition: "low", target: "/tools" },
  { term: "brand mention tracking llm", cluster: "aeo-geo", intent: "transactional", volume: "low", competition: "low", target: "NEW blog post + citation-monitor landing" },
  { term: "aeo agency", cluster: "aeo-geo", intent: "transactional", volume: "low", competition: "low", target: "/aeo-guide + /services" },
  { term: "aeo consultant", cluster: "aeo-geo", intent: "transactional", volume: "low", competition: "low", target: "NEW niche page" },

  // ── Cluster E — Claude Code / vibe coding (24) — HIGHEST LEVERAGE
  { term: "claude code agency", cluster: "claude-code-vibe", intent: "transactional", volume: "med", competition: "low", target: "/services/vibe-coded-sites (rename H1)" },
  { term: "hire claude code developer", cluster: "claude-code-vibe", intent: "transactional", volume: "med", competition: "low", target: "/services/vibe-coded-sites" },
  { term: "vibe coding services", cluster: "claude-code-vibe", intent: "transactional", volume: "med", competition: "low", target: "/services/vibe-coded-sites" },
  { term: "vibe coding agency", cluster: "claude-code-vibe", intent: "transactional", volume: "low", competition: "low", target: "/services/vibe-coded-sites" },
  { term: "ai pair programming consultant", cluster: "claude-code-vibe", intent: "transactional", volume: "low", competition: "low", target: "NEW niche page" },
  { term: "cursor vs claude code", cluster: "claude-code-vibe", intent: "comparison", volume: "high", competition: "low", target: "NEW /blog/cursor-vs-claude-code" },
  { term: "cursor vs windsurf", cluster: "claude-code-vibe", intent: "comparison", volume: "high", competition: "med", target: "NEW comparison post" },
  { term: "cursor vs github copilot", cluster: "claude-code-vibe", intent: "comparison", volume: "high", competition: "med", target: "NEW comparison post" },
  { term: "claude code vs cursor", cluster: "claude-code-vibe", intent: "comparison", volume: "high", competition: "low", target: "NEW blog post" },
  { term: "claude code best practices", cluster: "claude-code-vibe", intent: "informational", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "claude code agents tutorial", cluster: "claude-code-vibe", intent: "informational", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "claude code mcp servers", cluster: "claude-code-vibe", intent: "informational", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "claude code hooks", cluster: "claude-code-vibe", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "vibe coding tutorial", cluster: "claude-code-vibe", intent: "informational", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "vibe coding for non programmers", cluster: "claude-code-vibe", intent: "informational", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "v0 vs bolt vs lovable", cluster: "claude-code-vibe", intent: "comparison", volume: "high", competition: "med", target: "NEW comparison post" },
  { term: "bolt new alternative", cluster: "claude-code-vibe", intent: "comparison", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "lovable dev review", cluster: "claude-code-vibe", intent: "comparison", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "replit agent vs claude code", cluster: "claude-code-vibe", intent: "comparison", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "windsurf vs cursor", cluster: "claude-code-vibe", intent: "comparison", volume: "high", competition: "med", target: "NEW blog post" },
  { term: "aider vs claude code", cluster: "claude-code-vibe", intent: "comparison", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "nextjs ai development agency", cluster: "claude-code-vibe", intent: "transactional", volume: "low", competition: "low", target: "/services/vibe-coded-sites" },
  { term: "claude code for startups", cluster: "claude-code-vibe", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "claude code project setup", cluster: "claude-code-vibe", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },

  // ── Cluster F — AI business systems consulting (25)
  { term: "ai consultant for small business", cluster: "ai-business-systems", intent: "transactional", volume: "high", competition: "high", target: "/services/ai-business-systems" },
  { term: "ai transformation consultant", cluster: "ai-business-systems", intent: "transactional", volume: "med", competition: "high", target: "/services/ai-business-systems" },
  { term: "ai operations consultant", cluster: "ai-business-systems", intent: "transactional", volume: "low", competition: "med", target: "NEW niche page" },
  { term: "ai workflow audit", cluster: "ai-business-systems", intent: "informational", volume: "low", competition: "low", target: "NEW /blog/ai-workflow-audit-template" },
  { term: "ai readiness assessment", cluster: "ai-business-systems", intent: "informational", volume: "med", competition: "med", target: "NEW pillar post" },
  { term: "ai roi calculator", cluster: "ai-business-systems", intent: "informational", volume: "med", competition: "high", target: "/tools (add calculator)" },
  { term: "ai automation roadmap", cluster: "ai-business-systems", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "ai sop generator", cluster: "ai-business-systems", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "ai for service business", cluster: "ai-business-systems", intent: "informational", volume: "med", competition: "med", target: "NEW pillar post" },
  { term: "ai for solo founders", cluster: "ai-business-systems", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "ai stack for agencies", cluster: "ai-business-systems", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "ai integration consultant", cluster: "ai-business-systems", intent: "transactional", volume: "low", competition: "low", target: "/services/ai-business-systems" },
  { term: "ai automation for clinics", cluster: "ai-business-systems", intent: "transactional", volume: "low", competition: "low", target: "NEW niche page" },
  { term: "ai automation for law firms", cluster: "ai-business-systems", intent: "transactional", volume: "low", competition: "low", target: "NEW niche page" },
  { term: "ai automation for ecommerce", cluster: "ai-business-systems", intent: "transactional", volume: "med", competition: "med", target: "NEW niche page" },
  { term: "fractional ai officer", cluster: "ai-business-systems", intent: "transactional", volume: "low", competition: "low", target: "NEW niche page" },
  { term: "ai cost optimization", cluster: "ai-business-systems", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "openai vs claude for business", cluster: "ai-business-systems", intent: "comparison", volume: "high", competition: "med", target: "NEW comparison post" },
  { term: "gpt-4o vs claude opus pricing", cluster: "ai-business-systems", intent: "comparison", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "ai stack 2026", cluster: "ai-business-systems", intent: "informational", volume: "med", competition: "med", target: "NEW pillar post" },
  { term: "claude api integration consultant", cluster: "ai-business-systems", intent: "transactional", volume: "low", competition: "low", target: "NEW niche page" },
  { term: "ai automation case study", cluster: "ai-business-systems", intent: "informational", volume: "med", competition: "low", target: "/case-studies (TOC)" },
  { term: "ai sales automation", cluster: "ai-business-systems", intent: "transactional", volume: "med", competition: "med", target: "NEW niche page" },
  { term: "ai marketing automation", cluster: "ai-business-systems", intent: "transactional", volume: "high", competition: "high", target: "NEW niche page (low-priority)" },
  { term: "ai customer service automation", cluster: "ai-business-systems", intent: "transactional", volume: "med", competition: "high", target: "NEW niche page" },

  // ── Cluster G — WordPress AI / SEO automation (15)
  { term: "wordpress ai content plugin", cluster: "wordpress-ai-seo", intent: "informational", volume: "med", competition: "high", target: "/services/wordpress-seo" },
  { term: "wordpress seo automation", cluster: "wordpress-ai-seo", intent: "informational", volume: "med", competition: "high", target: "/services/wordpress-seo" },
  { term: "wordpress aeo plugin", cluster: "wordpress-ai-seo", intent: "informational", volume: "low", competition: "low", target: "NEW blog post + /tools listing" },
  { term: "wordpress llms.txt plugin", cluster: "wordpress-ai-seo", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "wordpress schema markup automation", cluster: "wordpress-ai-seo", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "rankmath vs yoast 2026", cluster: "wordpress-ai-seo", intent: "comparison", volume: "high", competition: "high", target: "NEW comparison post" },
  { term: "wordpress internal linking ai", cluster: "wordpress-ai-seo", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "wordpress content engine setup", cluster: "wordpress-ai-seo", intent: "informational", volume: "low", competition: "low", target: "/services/wordpress-seo" },
  { term: "hire wordpress seo expert", cluster: "wordpress-ai-seo", intent: "transactional", volume: "med", competition: "high", target: "/services/wordpress-seo" },
  { term: "wordpress maintenance and seo", cluster: "wordpress-ai-seo", intent: "transactional", volume: "low", competition: "med", target: "/services/wordpress-seo" },
  { term: "wordpress to nextjs migration", cluster: "wordpress-ai-seo", intent: "informational", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "headless wordpress seo", cluster: "wordpress-ai-seo", intent: "informational", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "wordpress ai blog generator", cluster: "wordpress-ai-seo", intent: "informational", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "wordpress aeo content writer", cluster: "wordpress-ai-seo", intent: "transactional", volume: "low", competition: "low", target: "NEW niche page" },
  { term: "wordpress speed optimization for seo", cluster: "wordpress-ai-seo", intent: "informational", volume: "high", competition: "high", target: "NEW blog post (low-priority)" },

  // ── Cluster H — Comparison queries (20)
  { term: "best automation agency 2026", cluster: "comparison", intent: "comparison", volume: "med", competition: "med", target: "NEW /blog/best-automation-agencies-2026" },
  { term: "upwork vs hiring an agency", cluster: "comparison", intent: "comparison", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "fiverr vs agency for n8n", cluster: "comparison", intent: "comparison", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "in-house vs agency for ai automation", cluster: "comparison", intent: "comparison", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "freelancer vs agency cost", cluster: "comparison", intent: "comparison", volume: "high", competition: "high", target: "NEW blog post (low-priority)" },
  { term: "bali agency vs us agency", cluster: "comparison", intent: "comparison", volume: "low", competition: "low", target: "NEW blog post (founder-positioning)" },
  { term: "nextjs vs astro for marketing site", cluster: "comparison", intent: "comparison", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "vercel vs netlify 2026", cluster: "comparison", intent: "comparison", volume: "high", competition: "high", target: "NEW blog post (low-priority)" },
  { term: "tailwind vs chakra 2026", cluster: "comparison", intent: "comparison", volume: "med", competition: "high", target: "NEW blog post (low-priority)" },
  { term: "shopify vs woocommerce 2026", cluster: "comparison", intent: "comparison", volume: "high", competition: "high", target: "NEW blog post (low-priority)" },
  { term: "calendly vs cal.com", cluster: "comparison", intent: "comparison", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "airtable vs notion for ops", cluster: "comparison", intent: "comparison", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "retool vs softr", cluster: "comparison", intent: "comparison", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "typeform vs tally", cluster: "comparison", intent: "comparison", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "n8n vs pipedream", cluster: "comparison", intent: "comparison", volume: "med", competition: "low", target: "NEW blog post" },
  { term: "zapier vs make 2026", cluster: "comparison", intent: "comparison", volume: "high", competition: "high", target: "NEW blog post" },
  { term: "ghl vs gohighlevel saas", cluster: "comparison", intent: "comparison", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "wpautomatic vs aiomatic", cluster: "comparison", intent: "comparison", volume: "low", competition: "low", target: "NEW blog post" },
  { term: "botpress vs voiceflow", cluster: "comparison", intent: "comparison", volume: "med", competition: "med", target: "NEW blog post" },
  { term: "hubspot vs gohighlevel for agencies", cluster: "comparison", intent: "comparison", volume: "med", competition: "med", target: "NEW blog post" },

  // ── Cluster I — Local + state combos (20 sample city-tier; state-tier auto-covered by 768 programmatic)
  { term: "n8n automation in los angeles", cluster: "local-state-city", intent: "local", volume: "low", competition: "low", target: "future /services/n8n-automation/in/los-angeles" },
  { term: "n8n automation in new york", cluster: "local-state-city", intent: "local", volume: "low", competition: "low", target: "future city page" },
  { term: "n8n developer in austin", cluster: "local-state-city", intent: "local", volume: "low", competition: "low", target: "future city page" },
  { term: "gohighlevel agency in miami", cluster: "local-state-city", intent: "local", volume: "low", competition: "low", target: "future city page" },
  { term: "gohighlevel consultant in chicago", cluster: "local-state-city", intent: "local", volume: "low", competition: "low", target: "future city page" },
  { term: "ai chatbot agency in san francisco", cluster: "local-state-city", intent: "local", volume: "low", competition: "low", target: "future city page" },
  { term: "whatsapp bot developer in dallas", cluster: "local-state-city", intent: "local", volume: "low", competition: "low", target: "future city page" },
  { term: "ai automation agency near me", cluster: "local-state-city", intent: "local", volume: "high", competition: "low", target: "/locations (add geo block)" },
  { term: "best automation agency in [STATE_CAPITAL]", cluster: "local-state-city", intent: "local", volume: "low", competition: "low", target: "each state page (add H2)" },
  { term: "hire n8n developer in seattle", cluster: "local-state-city", intent: "local", volume: "low", competition: "low", target: "future city page" },
  { term: "vibe coding agency in austin", cluster: "local-state-city", intent: "local", volume: "low", competition: "low", target: "future city page" },
  { term: "claude code consultant in nyc", cluster: "local-state-city", intent: "local", volume: "low", competition: "low", target: "future city page" },
  { term: "ai consultant in boston", cluster: "local-state-city", intent: "local", volume: "med", competition: "med", target: "future city page" },
  { term: "ai consultant in atlanta", cluster: "local-state-city", intent: "local", volume: "med", competition: "med", target: "future city page" },
  { term: "wordpress seo agency in denver", cluster: "local-state-city", intent: "local", volume: "low", competition: "low", target: "future city page" },
  { term: "shopify expert in nashville", cluster: "local-state-city", intent: "local", volume: "low", competition: "low", target: "future city page" },
  { term: "ai chatbot for dentist in [STATE_CAPITAL]", cluster: "local-state-city", intent: "local", volume: "low", competition: "low", target: "future combo page" },
  { term: "gohighlevel coach in phoenix", cluster: "local-state-city", intent: "local", volume: "low", competition: "low", target: "future city page" },
  { term: "ai automation consultant remote", cluster: "local-state-city", intent: "transactional", volume: "med", competition: "low", target: "/locations (add H2)" },
  { term: "global ai automation agency", cluster: "local-state-city", intent: "transactional", volume: "low", competition: "low", target: "/about (Bali angle)" },
];

/** Convenience helpers */

export function keywordsByCluster(cluster: KeywordCluster): Keyword[] {
  return KEYWORDS.filter((k) => k.cluster === cluster);
}

export function keywordsByIntent(intent: SearchIntent): Keyword[] {
  return KEYWORDS.filter((k) => k.intent === intent);
}

/** Low-competition page-1 candidates (90-day plays) */
export function ninetyDayPlays(): Keyword[] {
  return KEYWORDS.filter((k) => k.competition === "low");
}

/** Head-term traps to avoid for a new domain */
export function brutalCompetition(): Keyword[] {
  return KEYWORDS.filter(
    (k) => k.competition === "high" && k.volume === "high"
  );
}

export const KEYWORD_COUNT = KEYWORDS.length;
