/**
 * 2026-09-21 site simplification — every URL removed from the public map
 * gets a permanent 301 here. Wired into `next.config.ts` redirects().
 * Kept as a plain data file so it is importable by tests without Next.
 */
export type Redirect = { source: string; destination: string; permanent: true };

const r = (source: string, destination: string): Redirect => ({
  source,
  destination,
  permanent: true,
});

// Non-core services → nearest kept service
export const KILLED_SERVICES: Record<string, string> = {
  "zapier-make": "/services/n8n-automation",
  "social-automation": "/services/n8n-automation",
  "ai-video": "/services/n8n-automation",
  "youtube-automation": "/services/n8n-automation",
  "tiktok-automation": "/services/n8n-automation",
  "facebook-automation": "/services/n8n-automation",
  "ai-content-creation": "/services/n8n-automation",
  "ecommerce-automation": "/services/vibe-coded-sites",
  "branding-design": "/services/vibe-coded-sites",
  "ai-business-systems": "/services/ai-chatbots",
  "strategy-training": "/contact",
};

export const KEPT_TOOLS = [
  "n8n-workflow-generator",
  "ai-cost-calculator",
  "aeo-audit",
  "automation-gap-analyzer",
  "cold-dm-generator",
  "content-calendar",
  "prompt-library",
  "system-prompt-generator",
  "llms-txt-generator",
] as const;

export const KILLED_TOOLS = [
  "webhook-payload-builder",
  "cron-expression-builder",
  "ghl-snapshot-planner",
  "n8n-workflow-linter",
  "chatgpt-visibility-grader",
  "schema-markup-generator",
  "ai-crawler-access-checker",
  "prompt-chain-builder",
  "ai-agent-spec-writer",
  "ai-sop-generator",
  "voice-persona-builder",
  "video-prompt-generator",
  "ai-tool-stack-builder",
  "executive-summary-generator",
  "before-after-slider",
  "speed-to-lead-calculator",
  "webhook-inspector",
  "email-deliverability-checker",
  "domain-trust-lookup",
  "cold-outreach-compliance-checker",
  "automation-readiness-scanner",
  "tech-stack-xray",
  "core-web-vitals-audit",
] as const;

// /news posts promoted to /blog (same slug)
export const PROMOTED_NEWS = [
  "8-hour-reply-rule",
  "aeo-2026-meaning",
  "bali-canggu-coworking-economics",
  "dental-no-show-n8n-flow",
  "public-pricing-ai-builds",
  "small-fleet-paid-tools-2026",
  "weekend-with-claude-code",
  "ai-agents-running-the-shop-2026",
] as const;

export const KILLED_NEWS = [
  "fiverr-10-to-9-country-agency",
  "story-beats-grids-portfolio-redesign",
  "aeo-content-engine-not-seo",
  "23-build-portfolio-weekend",
  "bali-trek-2026-roadmap-reset",
  "claude-code-second-seat-2026",
  "dental-clinic-cafe-breakthrough",
  "whatsapp-silence-loom-funnel",
  "i-deleted-50-page-notion-playbook",
  "riyadh-shoes-checkout-rescue",
  "friday-i-stopped-editing-reels",
  "founder-dm-2am-instagram",
  "chatbot-for-client-who-hates-chatbots",
  "dental-atelier-no-contact-form",
  "three-months-of-claude-citations",
  "brand-kit-reconcile-18-hours",
] as const;

export const SIMPLIFY_REDIRECTS: Redirect[] = [
  // locations (48 states + index) — doorway pages removed
  r("/locations", "/services/n8n-automation"),
  r("/locations/:state", "/services/n8n-automation"),
  r("/services/:svc/in/:state", "/services/:svc"),
  r("/industries/freight-logistics/texas", "/industries/freight-logistics"),

  // work detail pages — portfolio grid links straight to the live build
  r("/work/:slug", "/portfolio"),

  // services
  ...Object.entries(KILLED_SERVICES).map(([slug, dest]) =>
    r(`/services/${slug}`, dest),
  ),

  // tools
  ...KILLED_TOOLS.map((slug) => r(`/tools/${slug}`, "/tools")),

  // news → blog
  r("/news", "/blog"),
  ...PROMOTED_NEWS.map((slug) => r(`/news/${slug}`, `/blog/${slug}`)),
  ...KILLED_NEWS.map((slug) => r(`/news/${slug}`, "/blog")),
  r("/news/n8n-vs-zapier-2026-switch", "/n8n-vs-zapier"),
  r("/blog/n8n-vs-zapier-2026", "/n8n-vs-zapier"),

  // singles
  r("/vibe-coding", "/services/vibe-coded-sites"),
  r("/edit-videos-with-claude", "/blog/edit-videos-with-claude"),
  r("/discovery-call", "/contact"),
];
