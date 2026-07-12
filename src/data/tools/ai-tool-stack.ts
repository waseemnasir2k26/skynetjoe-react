/**
 * ai-tool-stack.ts — static role/goal → tool stack mapping for the AI Tool
 * Stack Builder tool.
 *
 * A recommended stack is assembled from two static tables:
 *   1. ROLE_STACKS — a base stack of tools by category for each role.
 *   2. GOAL_ADDONS — 1-2 extra specialized tools + an n8n glue suggestion
 *      layered on top based on the selected goal.
 * Nothing is fetched or generated — pure lookup + merge, entirely client-side.
 */

export type StackRole =
  | "solo-founder"
  | "marketing-content"
  | "sales-outbound"
  | "ops-admin"
  | "agency-owner"
  | "developer";

export type StackGoal =
  | "save-time-repetitive"
  | "content-at-scale"
  | "faster-customer-response"
  | "scale-outbound-sales"
  | "build-internal-agents";

export const ROLE_OPTIONS: { key: StackRole; label: string }[] = [
  { key: "solo-founder", label: "Solo Founder" },
  { key: "marketing-content", label: "Marketing / Content" },
  { key: "sales-outbound", label: "Sales / Outbound" },
  { key: "ops-admin", label: "Ops / Admin" },
  { key: "agency-owner", label: "Agency Owner" },
  { key: "developer", label: "Developer" },
];

export const GOAL_OPTIONS: { key: StackGoal; label: string }[] = [
  { key: "save-time-repetitive", label: "Save time on repetitive tasks" },
  { key: "content-at-scale", label: "Generate content at scale" },
  {
    key: "faster-customer-response",
    label: "Improve customer response time",
  },
  { key: "scale-outbound-sales", label: "Scale outbound / sales" },
  { key: "build-internal-agents", label: "Build internal tools / agents" },
];

export type StackTool = {
  category: string;
  tool: string;
  why: string;
};

export const ROLE_STACKS: Record<StackRole, StackTool[]> = {
  "solo-founder": [
    {
      category: "Chat / reasoning",
      tool: "Claude or ChatGPT",
      why: "Daily thinking partner — drafts, decisions, first-pass research.",
    },
    {
      category: "Automation glue",
      tool: "n8n",
      why: "Wire your CRM, inbox, and forms together without hiring an engineer.",
    },
    {
      category: "CRM / pipeline",
      tool: "GoHighLevel or a lightweight CRM",
      why: "One place for leads, follow-up, and booking — non-negotiable past 10 leads/week.",
    },
    {
      category: "Scheduling",
      tool: "Calendly",
      why: "Removes the back-and-forth on every discovery call.",
    },
  ],
  "marketing-content": [
    {
      category: "Chat / writing",
      tool: "Claude or ChatGPT",
      why: "First-draft copy, outlines, and voice-locked rewrites.",
    },
    {
      category: "Image",
      tool: "Midjourney or an image model inside your chat tool",
      why: "On-brand visuals without a design queue.",
    },
    {
      category: "Video / short-form",
      tool: "CapCut + an AI voice tool (e.g. ElevenLabs)",
      why: "Turns long-form into daily short clips without a video editor.",
    },
    {
      category: "Scheduling / publishing",
      tool: "A social scheduler (Buffer, Later, or your CRM's planner)",
      why: "Batch a week of content in one sitting instead of daily posting.",
    },
  ],
  "sales-outbound": [
    {
      category: "Chat / writing",
      tool: "Claude or ChatGPT",
      why: "Personalizes outreach at a volume a human can't match manually.",
    },
    {
      category: "CRM / pipeline",
      tool: "GoHighLevel or a dedicated CRM",
      why: "Tracks every touch so nothing goes cold.",
    },
    {
      category: "Automation glue",
      tool: "n8n",
      why: "Auto-enriches leads and triggers follow-up sequences.",
    },
    {
      category: "Scheduling",
      tool: "Calendly",
      why: "Converts a warm reply into a booked call in one click.",
    },
  ],
  "ops-admin": [
    {
      category: "Chat / reasoning",
      tool: "Claude or ChatGPT",
      why: "Drafts SOPs, summarizes long threads, answers policy questions.",
    },
    {
      category: "Automation glue",
      tool: "n8n or Zapier/Make",
      why: "Removes copy-paste between spreadsheets, inboxes, and forms.",
    },
    {
      category: "Knowledge base",
      tool: "Notion or a shared drive with clear structure",
      why: "One source of truth so the automations have clean data to read from.",
    },
    {
      category: "Ticketing / support",
      tool: "A helpdesk tool (or CRM inbox)",
      why: "Keeps recurring requests out of email threads.",
    },
  ],
  "agency-owner": [
    {
      category: "Chat / reasoning",
      tool: "Claude or ChatGPT",
      why: "Proposal drafts, client comms, and internal SOPs at speed.",
    },
    {
      category: "Automation glue",
      tool: "n8n",
      why: "Client onboarding, reporting, and handoffs run without a project manager babysitting them.",
    },
    {
      category: "CRM / pipeline",
      tool: "GoHighLevel",
      why: "One system for sales pipeline, client comms, and automations.",
    },
    {
      category: "Reporting",
      tool: "A dashboard tool (Looker Studio or a custom build)",
      why: "Clients see proof of work without a manual report every month.",
    },
  ],
  developer: [
    {
      category: "Chat / coding",
      tool: "Claude Code or an IDE-integrated AI coding tool",
      why: "Pairs on real code changes, not just chat-window snippets.",
    },
    {
      category: "Automation glue",
      tool: "n8n",
      why: "Fastest way to stand up internal tools and webhooks without a full backend.",
    },
    {
      category: "Agent framework",
      tool: "A lightweight agent SDK (e.g. the Claude Agent SDK)",
      why: "Structured tool-use for anything beyond single-shot prompts.",
    },
    {
      category: "Observability",
      tool: "Basic logging + a usage dashboard",
      why: "You can't fix what you can't see — track cost and latency from day one.",
    },
  ],
};

export type GoalAddon = {
  tools: StackTool[];
  glue: string;
};

export const GOAL_ADDONS: Record<StackGoal, GoalAddon> = {
  "save-time-repetitive": {
    tools: [
      {
        category: "Automation glue",
        tool: "n8n",
        why: "Automate the exact repetitive task you keep doing by hand.",
      },
    ],
    glue: "n8n glue: trigger on the recurring event (new row, new email, new form submission) → run it through your chat model for any judgment call → write the result back to your CRM or sheet. Most repetitive-task automations are this three-node shape.",
  },
  "content-at-scale": {
    tools: [
      {
        category: "Content ops",
        tool: "A content calendar + batch-writing workflow",
        why: "Batching beats daily improvising for consistency and volume.",
      },
    ],
    glue: "n8n glue: on a schedule trigger, pull your content ideas list → generate a draft via your chat model → drop it into a review queue (Slack, email, or a CRM task) before it ever gets auto-published.",
  },
  "faster-customer-response": {
    tools: [
      {
        category: "Support",
        tool: "An AI chat widget or CRM inbox with AI-assisted replies",
        why: "Cuts first-response time from hours to minutes on common questions.",
      },
    ],
    glue: "n8n glue: incoming message webhook → classify intent with your chat model → auto-reply on common questions, or route to a human with a drafted reply attached for anything ambiguous.",
  },
  "scale-outbound-sales": {
    tools: [
      {
        category: "Outbound",
        tool: "A cold outreach tool paired with your CRM",
        why: "Volume without losing personalization quality.",
      },
    ],
    glue: "n8n glue: enrich each new lead (company, role, recent activity) → generate a personalized opener with your chat model → push into your CRM's sequence, tagged by angle used.",
  },
  "build-internal-agents": {
    tools: [
      {
        category: "Agent framework",
        tool: "A lightweight agent SDK + n8n for tool execution",
        why: "Lets an agent actually take action, not just answer questions.",
      },
    ],
    glue: "n8n glue: expose your internal tools (CRM update, calendar check, doc lookup) as webhooks the agent can call, then wrap the agent loop around those webhooks — keep humans in the approval path for anything that spends money or sends external messages.",
  },
};

export function buildStack(role: StackRole, goal: StackGoal) {
  const base = ROLE_STACKS[role];
  const addon = GOAL_ADDONS[goal];
  const merged = [...base, ...addon.tools];
  return { tools: merged, glue: addon.glue };
}
