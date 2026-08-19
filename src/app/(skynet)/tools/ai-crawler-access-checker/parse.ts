/**
 * parse.ts — real robots.txt + llms.txt parsing for the AI Crawler Access
 * Checker. No network calls live here; this only turns raw text (fetched by
 * the client via /api/tool-proxy) into structured verdicts.
 */

export type RobotsRule = { type: "allow" | "disallow"; path: string };
export type RobotsGroup = { agents: string[]; rules: RobotsRule[] };

/** Standard robots.txt grouping: consecutive User-agent lines share one ruleset; a new User-agent line after rules have started opens a new group. */
export function parseRobotsTxt(text: string): RobotsGroup[] {
  const groups: RobotsGroup[] = [];
  let current: RobotsGroup | null = null;

  const lines = text.split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.split("#")[0].trim();
    if (!line) continue;
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const directive = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();

    if (directive === "user-agent") {
      if (current && current.rules.length > 0) {
        current = null;
      }
      if (!current) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      current.agents.push(value);
    } else if (directive === "allow" || directive === "disallow") {
      if (!current) {
        current = { agents: ["*"], rules: [] };
        groups.push(current);
      }
      current.rules.push({ type: directive, path: value });
    }
  }
  return groups;
}

export type Verdict = "ALLOWED" | "BLOCKED" | "PARTIAL" | "NO_ROBOTS";

export type BotVerdict = {
  ua: string;
  verdict: Verdict;
  matchedGroup: string | null; // which User-agent group applied ("*" if fallback)
  blockedPaths: string[];
};

function findGroupForAgent(
  groups: RobotsGroup[],
  ua: string,
  aliases: string[],
): {
  group: RobotsGroup | null;
  matchedAs: string | null;
} {
  const names = [ua, ...aliases].map((n) => n.toLowerCase());
  for (const g of groups) {
    for (const agent of g.agents) {
      if (names.includes(agent.toLowerCase())) {
        return { group: g, matchedAs: agent };
      }
    }
  }
  const fallback = groups.find((g) => g.agents.some((a) => a === "*"));
  if (fallback) return { group: fallback, matchedAs: "*" };
  return { group: null, matchedAs: null };
}

export function evaluateBot(
  groups: RobotsGroup[],
  ua: string,
  aliases: string[] = [],
): BotVerdict {
  if (groups.length === 0) {
    return { ua, verdict: "NO_ROBOTS", matchedGroup: null, blockedPaths: [] };
  }
  const { group, matchedAs } = findGroupForAgent(groups, ua, aliases);
  if (!group) {
    return { ua, verdict: "ALLOWED", matchedGroup: null, blockedPaths: [] };
  }

  const rootDisallow = group.rules.find(
    (r) => r.type === "disallow" && (r.path === "/" || r.path === ""),
  );
  const rootAllowOverride = group.rules.find(
    (r) => r.type === "allow" && (r.path === "/" || r.path === ""),
  );

  // Root-level Disallow: / with no equally-specific Allow override => fully blocked.
  if (rootDisallow && rootDisallow.path === "/" && !rootAllowOverride) {
    return {
      ua,
      verdict: "BLOCKED",
      matchedGroup: matchedAs,
      blockedPaths: ["/"],
    };
  }

  const specificDisallows = group.rules
    .filter(
      (r) => r.type === "disallow" && r.path.trim() !== "" && r.path !== "/",
    )
    .map((r) => r.path);

  if (specificDisallows.length > 0) {
    return {
      ua,
      verdict: "PARTIAL",
      matchedGroup: matchedAs,
      blockedPaths: Array.from(new Set(specificDisallows)),
    };
  }

  return { ua, verdict: "ALLOWED", matchedGroup: matchedAs, blockedPaths: [] };
}

export type TargetBot = { ua: string; label: string; aliases?: string[] };

export const TARGET_BOTS: TargetBot[] = [
  { ua: "GPTBot", label: "GPTBot — OpenAI training crawler" },
  { ua: "OAI-SearchBot", label: "OAI-SearchBot — ChatGPT search" },
  { ua: "ChatGPT-User", label: "ChatGPT-User — live browsing plugin" },
  { ua: "ClaudeBot", label: "ClaudeBot — Anthropic crawler" },
  {
    ua: "Claude-SearchBot",
    label: "Claude-SearchBot — Anthropic search",
    aliases: ["anthropic-ai"],
  },
  { ua: "PerplexityBot", label: "PerplexityBot — Perplexity search" },
  {
    ua: "Google-Extended",
    label: "Google-Extended — Gemini/AI Overviews training",
  },
  { ua: "Bytespider", label: "Bytespider — ByteDance/TikTok crawler" },
  { ua: "CCBot", label: "CCBot — Common Crawl (feeds many LLM training sets)" },
  {
    ua: "Applebot-Extended",
    label: "Applebot-Extended — Apple Intelligence training",
  },
];

export type LlmsTxtQuality = {
  present: boolean;
  wordCount: number;
  hasH1: boolean;
  hasSections: boolean;
  hasLinks: boolean;
  notes: string[];
};

export function assessLlmsTxt(
  text: string | null,
  status: number | null,
): LlmsTxtQuality {
  if (!text || status !== 200) {
    return {
      present: false,
      wordCount: 0,
      hasH1: false,
      hasSections: false,
      hasLinks: false,
      notes: [
        "No llms.txt found at /llms.txt (or the proxy fetch didn't return 200).",
      ],
    };
  }
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const hasH1 = /^#\s+.+/m.test(text);
  const hasSections = (text.match(/^##\s+.+/gm) || []).length >= 1;
  const hasLinks = /\[[^\]]+\]\(https?:\/\/[^)]+\)/.test(text);

  const notes: string[] = [];
  if (!hasH1)
    notes.push(
      "No top-level H1 (# Title) — llms.txt spec expects one at the top.",
    );
  if (!hasSections)
    notes.push("No H2 sections (## Docs, ## Optional, etc.) found.");
  if (!hasLinks)
    notes.push(
      "No markdown links found — llms.txt is meant to link out to real docs/pages.",
    );
  if (wordCount < 20)
    notes.push("Very short file — likely a stub, not a real content map.");
  if (notes.length === 0)
    notes.push(
      "Has an H1, at least one H2 section, and outbound links — structurally sound.",
    );

  return { present: true, wordCount, hasH1, hasSections, hasLinks, notes };
}
