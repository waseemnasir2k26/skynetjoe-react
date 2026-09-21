/**
 * TOOLS_REGISTRY — single source of truth for the /tools hub, the header's
 * Tools mega-menu, and the /api/tool-usage/[slug] slug allow-list.
 *
 * 9 tools across 4 categories after the 2026-09-21 simplification (23 thin
 * tools removed, 301 → /tools; the kept list is `KEPT_TOOLS` in
 * src/lib/simplify-redirects.ts). Count changes as tools ship — read
 * TOOLS_REGISTRY.length, don't hardcode a number. `icon` is a lucide-react export name
 * (string, resolved via an ICONS map at render sites — see
 * ToolsMegaMenu.tsx and tools/page.tsx). `isNew` drives the terracotta
 * "NEW" badge. Keep this in sync when a tool is added/removed/renamed —
 * every consumer reads from here, nothing else hardcodes the list.
 */

export type ToolCategory =
  | "Automation & Workflows"
  | "AEO & AI Visibility"
  | "Prompts & Agents"
  | "Ops & Outbound";

export type ToolEntry = {
  slug: string;
  name: string;
  oneLiner: string;
  category: ToolCategory;
  icon: string;
  isNew?: boolean;
};

export const TOOLS_REGISTRY: ToolEntry[] = [
  {
    slug: "n8n-workflow-generator",
    name: "n8n Workflow Generator",
    oneLiner: "Describe the job, get a ready-to-import n8n workflow JSON.",
    category: "Automation & Workflows",
    icon: "Workflow",
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
    slug: "aeo-audit",
    name: "AEO Audit",
    oneLiner:
      "Score any URL on how well AI answer engines can read and cite it.",
    category: "AEO & AI Visibility",
    icon: "SearchCheck",
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
    slug: "cold-dm-generator",
    name: "Cold DM Generator",
    oneLiner:
      "Personalized cold outreach messages that don't read like a template.",
    category: "Ops & Outbound",
    icon: "Send",
    isNew: true,
  },
  {
    slug: "content-calendar",
    name: "30-Day Content Calendar",
    oneLiner:
      "Niche, cadence, and goal in — 30 days of cross-platform post ideas out.",
    category: "Automation & Workflows",
    icon: "CalendarDays",
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
    slug: "system-prompt-generator",
    name: "System Prompt Generator",
    oneLiner: "Build a production-grade system prompt from a short brief.",
    category: "Prompts & Agents",
    icon: "TerminalSquare",
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
];

export const TOOL_CATEGORIES: ToolCategory[] = [
  "Automation & Workflows",
  "AEO & AI Visibility",
  "Prompts & Agents",
  "Ops & Outbound",
];

export function toolsByCategory(category: ToolCategory): ToolEntry[] {
  return TOOLS_REGISTRY.filter((t) => t.category === category);
}

export const TOOL_SLUGS: string[] = TOOLS_REGISTRY.map((t) => t.slug);
