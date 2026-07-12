/**
 * TOOLS_REGISTRY — single source of truth for the /tools hub, the header's
 * Tools mega-menu, and the /api/tool-usage/[slug] slug allow-list.
 *
 * 26 tools across 5 categories. `icon` is a lucide-react export name
 * (string, resolved via an ICONS map at render sites — see
 * ToolsMegaMenu.tsx and tools/page.tsx). `isNew` drives the terracotta
 * "NEW" badge. Keep this in sync when a tool is added/removed/renamed —
 * every consumer reads from here, nothing else hardcodes the list.
 */

export type ToolCategory =
  | "Automation & Workflows"
  | "AEO & AI Visibility"
  | "Prompts & Agents"
  | "Ops & Outbound"
  | "Diagnostics";

export type ToolEntry = {
  slug: string;
  name: string;
  oneLiner: string;
  category: ToolCategory;
  icon: string;
  isNew?: boolean;
};

export const TOOLS_REGISTRY: ToolEntry[] = [
  // ---------------------------------------------------------------
  // Automation & Workflows
  // ---------------------------------------------------------------
  {
    slug: "n8n-workflow-generator",
    name: "n8n Workflow Generator",
    oneLiner: "Describe the job, get a ready-to-import n8n workflow JSON.",
    category: "Automation & Workflows",
    icon: "Workflow",
    isNew: true,
  },
  {
    slug: "webhook-payload-builder",
    name: "Webhook Payload Builder",
    oneLiner:
      "Build, validate, and test JSON payloads before you wire the automation.",
    category: "Automation & Workflows",
    icon: "Webhook",
    isNew: true,
  },
  {
    slug: "cron-expression-builder",
    name: "Cron Expression Builder",
    oneLiner:
      "Plain-English schedule to cron syntax, with a human-readable preview.",
    category: "Automation & Workflows",
    icon: "Clock",
    isNew: true,
  },
  {
    slug: "ghl-snapshot-planner",
    name: "GHL Snapshot Planner",
    oneLiner:
      "Plan your GoHighLevel pipelines, tags, and automations before you build.",
    category: "Automation & Workflows",
    icon: "GitBranch",
    isNew: true,
  },
  {
    slug: "automation-gap-analyzer",
    name: "Automation Gap Analyzer",
    oneLiner:
      "90 seconds, 12 questions — find where your ops lose time and money.",
    category: "Automation & Workflows",
    icon: "Target",
  },
  {
    slug: "content-calendar",
    name: "30-Day Content Calendar",
    oneLiner:
      "Niche, cadence, and goal in — 30 days of cross-platform post ideas out.",
    category: "Automation & Workflows",
    icon: "CalendarDays",
  },

  // ---------------------------------------------------------------
  // AEO & AI Visibility
  // ---------------------------------------------------------------
  {
    slug: "aeo-audit",
    name: "AEO Audit",
    oneLiner:
      "Score any URL on how well AI answer engines can read and cite it.",
    category: "AEO & AI Visibility",
    icon: "SearchCheck",
    isNew: true,
  },
  {
    slug: "chatgpt-visibility-grader",
    name: "ChatGPT Visibility Grader",
    oneLiner:
      "See how your brand shows up (or doesn't) across AI chat answers.",
    category: "AEO & AI Visibility",
    icon: "MessageCircleQuestion",
    isNew: true,
  },
  {
    slug: "llms-txt-generator",
    name: "llms.txt Generator",
    oneLiner:
      "Generate a valid llms.txt so AI crawlers know what your site actually is.",
    category: "AEO & AI Visibility",
    icon: "FileCode2",
    isNew: true,
  },
  {
    slug: "schema-markup-generator",
    name: "Schema Markup Generator",
    oneLiner:
      "Paste your page details, copy out clean JSON-LD structured data.",
    category: "AEO & AI Visibility",
    icon: "Braces",
    isNew: true,
  },

  // ---------------------------------------------------------------
  // Prompts & Agents
  // ---------------------------------------------------------------
  {
    slug: "prompt-chain-builder",
    name: "Prompt Chain Builder",
    oneLiner:
      "Chain multi-step prompts into one reusable, exportable sequence.",
    category: "Prompts & Agents",
    icon: "Link2",
    isNew: true,
  },
  {
    slug: "ai-agent-spec-writer",
    name: "AI Agent Spec Writer",
    oneLiner:
      "Turn a rough agent idea into a build-ready spec — role, tools, guardrails.",
    category: "Prompts & Agents",
    icon: "Bot",
    isNew: true,
  },
  {
    slug: "system-prompt-generator",
    name: "System Prompt Generator",
    oneLiner: "Build a production-grade system prompt from a short brief.",
    category: "Prompts & Agents",
    icon: "TerminalSquare",
    isNew: true,
  },
  {
    slug: "ai-sop-generator",
    name: "AI SOP Generator",
    oneLiner:
      "Turn a messy process into a clean, step-by-step SOP an AI agent can run.",
    category: "Prompts & Agents",
    icon: "ListChecks",
    isNew: true,
  },
  {
    slug: "prompt-library",
    name: "Prompt Library",
    oneLiner:
      "50 production-tested AI prompts across sales, ops, content, and more.",
    category: "Prompts & Agents",
    icon: "Library",
  },
  {
    slug: "voice-persona-builder",
    name: "Brand Voice Persona Builder",
    oneLiner:
      "AI system prompt that makes ChatGPT and Claude sound like your brand.",
    category: "Prompts & Agents",
    icon: "Mic",
  },
  {
    slug: "video-prompt-generator",
    name: "Video Prompt Generator",
    oneLiner:
      "One scene, four formats — Runway, Pika, Sora, and Veo side-by-side.",
    category: "Prompts & Agents",
    icon: "Film",
  },

  // ---------------------------------------------------------------
  // Ops & Outbound
  // ---------------------------------------------------------------
  {
    slug: "cold-dm-generator",
    name: "Cold DM Generator",
    oneLiner:
      "Personalized cold outreach messages that don't read like a template.",
    category: "Ops & Outbound",
    icon: "Send",
    isNew: true,
  },
  {
    slug: "ai-cost-calculator",
    name: "AI Cost Calculator",
    oneLiner:
      "Estimate real monthly spend across the AI tools you're actually running.",
    category: "Ops & Outbound",
    icon: "Calculator",
    isNew: true,
  },
  {
    slug: "ai-tool-stack-builder",
    name: "AI Tool Stack Builder",
    oneLiner:
      "Answer a few questions, get a recommended AI tool stack for your business.",
    category: "Ops & Outbound",
    icon: "LayoutGrid",
    isNew: true,
  },
  {
    slug: "executive-summary-generator",
    name: "Executive Summary Generator",
    oneLiner: "Raw notes in — TL;DR, email, Slack post, and deck slide out.",
    category: "Ops & Outbound",
    icon: "FileText",
  },
  {
    slug: "before-after-slider",
    name: "Before/After Slider",
    oneLiner: "Drag to compare manual workflows against the automated version.",
    category: "Ops & Outbound",
    icon: "ArrowLeftRight",
  },

  // ---------------------------------------------------------------
  // Diagnostics
  // ---------------------------------------------------------------
  {
    slug: "ai-readiness-score",
    name: "AI Readiness Score",
    oneLiner:
      "10 questions, a 0-100 score, and a 4-axis breakdown of what to fix first.",
    category: "Diagnostics",
    icon: "Compass",
  },
  {
    slug: "agency-stress-quiz",
    name: "Agency Stress Quiz",
    oneLiner: "60-second diagnostic — chill operator or full chaos mode.",
    category: "Diagnostics",
    icon: "Activity",
  },
  {
    slug: "revenue-calculator",
    name: "Revenue Recovery Calculator",
    oneLiner:
      "Six sliders — see what missed calls and manual follow-up cost you monthly.",
    category: "Diagnostics",
    icon: "TrendingUp",
  },
  {
    slug: "automation-roi-by-industry",
    name: "Automation ROI by Industry",
    oneLiner:
      "Pick your industry, see typical automation payback and time saved.",
    category: "Diagnostics",
    icon: "BarChart3",
    isNew: true,
  },
];

export const TOOL_CATEGORIES: ToolCategory[] = [
  "Automation & Workflows",
  "AEO & AI Visibility",
  "Prompts & Agents",
  "Ops & Outbound",
  "Diagnostics",
];

export function toolsByCategory(category: ToolCategory): ToolEntry[] {
  return TOOLS_REGISTRY.filter((t) => t.category === category);
}

export const TOOL_SLUGS: string[] = TOOLS_REGISTRY.map((t) => t.slug);
