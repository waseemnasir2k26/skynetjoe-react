/**
 * Content Calendar — idea bank.
 *
 * Each entry is a hook template that interpolates {niche}, {audience} and {n}.
 * Templates are categorised by goal so the calendar can lean on different ones
 * depending on whether the user picked Awareness / Lead-gen / Engagement /
 * Sales / Authority.
 */

export type CalendarGoal =
  | "awareness"
  | "leadgen"
  | "engagement"
  | "sales"
  | "authority";

export type PlatformKey =
  | "linkedin"
  | "x"
  | "instagram"
  | "shorts"
  | "newsletter";

export type AssetKind =
  | "single"
  | "carousel"
  | "video"
  | "email"
  | "thread"
  | "story";

export const PLATFORM_META: Record<
  PlatformKey,
  { label: string; short: string; color: string; bg: string }
> = {
  linkedin: {
    label: "LinkedIn",
    short: "LI",
    color: "#7ee4ff",
    bg: "rgba(126, 228, 255, 0.18)",
  },
  x: {
    label: "X / Twitter",
    short: "X",
    color: "#a5b4fc",
    bg: "rgba(165, 180, 252, 0.18)",
  },
  instagram: {
    label: "Instagram",
    short: "IG",
    color: "#f9a8d4",
    bg: "rgba(249, 168, 212, 0.18)",
  },
  shorts: {
    label: "Shorts / TikTok",
    short: "RL",
    color: "#fde68a",
    bg: "rgba(253, 230, 138, 0.18)",
  },
  newsletter: {
    label: "Email newsletter",
    short: "EM",
    color: "#5eead4",
    bg: "rgba(94, 234, 212, 0.18)",
  },
};

export const GOAL_META: Record<
  CalendarGoal,
  { label: string; mix: Record<"educate" | "story" | "proof" | "cta", number> }
> = {
  awareness: {
    label: "Awareness",
    mix: { educate: 5, story: 3, proof: 1, cta: 1 },
  },
  leadgen: {
    label: "Lead-gen",
    mix: { educate: 3, story: 2, proof: 2, cta: 3 },
  },
  engagement: {
    label: "Engagement",
    mix: { educate: 2, story: 5, proof: 1, cta: 2 },
  },
  sales: {
    label: "Sales",
    mix: { educate: 2, story: 1, proof: 4, cta: 3 },
  },
  authority: {
    label: "Authority-building",
    mix: { educate: 5, story: 2, proof: 3, cta: 0 },
  },
};

export type IdeaKind = "educate" | "story" | "proof" | "cta";

export type IdeaTemplate = {
  kind: IdeaKind;
  /** Hook + 1-line topic */
  hook: string;
  /** Body angle */
  body: string;
  /** CTA */
  cta: string;
  /** Tags (interpolated) */
  tags: string[];
  /** Recommended asset by platform if specified */
  assets?: Partial<Record<PlatformKey, AssetKind>>;
};

export const IDEA_TEMPLATES: IdeaTemplate[] = [
  // ─────── educate ───────
  {
    kind: "educate",
    hook: "{n} mistakes {niche} keep making with their first 90 days",
    body: "Pick the 5 most painful, name them, show the cleaner path. Numbered list.",
    cta: "Which one are you guilty of? Reply with the number.",
    tags: ["{niche}", "{audienceTag}", "operations", "playbook"],
    assets: { linkedin: "carousel", instagram: "carousel", x: "thread" },
  },
  {
    kind: "educate",
    hook: "How to {outcome} in under {n} days — even if you have no team",
    body: "Step-by-step framework. One paragraph per step. End with a checklist.",
    cta: "Save this for the next time it hits.",
    tags: ["{niche}", "framework", "howto"],
    assets: { linkedin: "carousel", shorts: "video" },
  },
  {
    kind: "educate",
    hook: "The {n}-minute weekly ritual that protects {audience} from burnout",
    body: "Walk through the ritual end-to-end. Why each step matters. Include time block.",
    cta: "Steal this ritual. Run it Friday afternoon.",
    tags: ["{niche}", "wellbeing", "ops"],
    assets: { newsletter: "email", instagram: "single" },
  },
  {
    kind: "educate",
    hook: "{n} tools every {niche} operator should know about (and {n2} to never touch)",
    body: "List the tools, what they replace, what they cost, where they fail.",
    cta: "Bookmark — I update this list quarterly.",
    tags: ["{niche}", "tools", "stack"],
    assets: { linkedin: "carousel", x: "thread", newsletter: "email" },
  },
  {
    kind: "educate",
    hook: "Why {audience} should stop {action} immediately",
    body: "Contrarian take. Define the action, show the cost, give a replacement.",
    cta: "Tag a peer who needs to read this.",
    tags: ["{niche}", "contrarian", "{audienceTag}"],
    assets: { linkedin: "single", instagram: "single", x: "thread" },
  },
  {
    kind: "educate",
    hook: "The honest cost-breakdown of running a {niche} business in 2026",
    body: "Real numbers. Real categories. Show monthly + annual. No fluff.",
    cta: "DM me your category breakdown. I'll compare.",
    tags: ["{niche}", "finance", "transparency"],
    assets: { linkedin: "carousel", newsletter: "email" },
  },

  // ─────── story ───────
  {
    kind: "story",
    hook: "The week everything almost broke — and what I learned",
    body: "Set the scene. The mistake. The lesson. Don't over-polish.",
    cta: "What's the worst week your business survived?",
    tags: ["story", "founder", "{niche}"],
    assets: { linkedin: "single", instagram: "story", shorts: "video" },
  },
  {
    kind: "story",
    hook: "I worked with {audience} for {n} years. Here's what nobody tells you.",
    body: "Three brutal truths. Two unexpected joys. One thing you'd never undo.",
    cta: "Which one surprised you most?",
    tags: ["{niche}", "career", "{audienceTag}"],
    assets: { linkedin: "carousel", x: "thread" },
  },
  {
    kind: "story",
    hook: "The day I almost said yes to the wrong client",
    body: "Setup, red flags, gut moment, lesson. Use real dialogue.",
    cta: "Have you ever turned down money? Tell me why.",
    tags: ["{niche}", "boundaries", "client-work"],
    assets: { linkedin: "single", instagram: "single" },
  },
  {
    kind: "story",
    hook: "What {n} years of doing {niche} taught me about saying no",
    body: "5 specific examples of when 'no' paid off. Lessons baked in.",
    cta: "What did you say no to this month?",
    tags: ["{niche}", "leadership"],
    assets: { linkedin: "single", newsletter: "email" },
  },

  // ─────── proof ───────
  {
    kind: "proof",
    hook: "Client win: how a {niche} operator added {outcome} in {n} weeks",
    body: "Problem, what we shipped, the numbers, the lessons. Anonymise if needed.",
    cta: "Want a teardown of your situation? DM 'teardown'.",
    tags: ["{niche}", "case-study", "results"],
    assets: { linkedin: "carousel", instagram: "carousel", newsletter: "email" },
  },
  {
    kind: "proof",
    hook: "Before / after — a {niche} workflow that used to take {n} hours now takes {n2}",
    body: "Old workflow, new workflow, side-by-side. Tools and time saved.",
    cta: "Which workflow eats your week? Reply, I'll diagnose.",
    tags: ["{niche}", "automation", "ops"],
    assets: { linkedin: "carousel", x: "thread", shorts: "video" },
  },
  {
    kind: "proof",
    hook: "{n} numbers from {n2} months of working with {audience}",
    body: "Honest scoreboard — wins, losses, mediocre months. No vanity metrics.",
    cta: "Comment 'numbers' for the full breakdown.",
    tags: ["{niche}", "transparency", "{audienceTag}"],
    assets: { linkedin: "single", newsletter: "email" },
  },
  {
    kind: "proof",
    hook: "A {audience} sent me this screenshot today — I had to share",
    body: "Context, screenshot, what made it land, what it confirms about the playbook.",
    cta: "Want this playbook? Comment 'send'.",
    tags: ["{niche}", "testimonial", "{audienceTag}"],
    assets: { instagram: "single", linkedin: "single" },
  },

  // ─────── cta ───────
  {
    kind: "cta",
    hook: "Open: {n} slots for {audience} in {month}",
    body: "Who it's for, what's included, what's the outcome, what's the price band.",
    cta: "DM 'slot' or book here →",
    tags: ["{niche}", "{audienceTag}", "offer"],
    assets: { linkedin: "single", newsletter: "email" },
  },
  {
    kind: "cta",
    hook: "Free 30-min teardown for {n} {audience} this week",
    body: "What you'll get, how to book, who it's NOT for. Filter aggressively.",
    cta: "Comment 'teardown' or DM.",
    tags: ["{niche}", "{audienceTag}", "audit"],
    assets: { linkedin: "single", instagram: "single", x: "single" },
  },
  {
    kind: "cta",
    hook: "I'm shipping a small thing for {audience}. Want in?",
    body: "Tease the thing, the problem it solves, the price, the cap.",
    cta: "Reply 'in' and I'll send the link.",
    tags: ["{niche}", "launch", "{audienceTag}"],
    assets: { linkedin: "single", newsletter: "email" },
  },
  {
    kind: "cta",
    hook: "{n}-minute call: do you have a problem worth solving?",
    body: "Frame the call, the filter, the agenda, the outcome.",
    cta: "Book here — I read every reply.",
    tags: ["{niche}", "discovery", "{audienceTag}"],
    assets: { linkedin: "single", x: "single" },
  },
];

export const ASSET_LABEL: Record<AssetKind, string> = {
  single: "Single card",
  carousel: "Carousel",
  video: "Short-form video",
  email: "Email newsletter",
  thread: "Thread",
  story: "Story",
};
