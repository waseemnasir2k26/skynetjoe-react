/**
 * cold-dm-scripts.ts — static template library for the Cold DM Generator tool.
 *
 * 15 templates (5 per platform: LinkedIn, Instagram, Email) across 5 proven
 * outreach angles. Each template uses `{{niche}}`, `{{offer}}`, and
 * `{{proof}}` placeholders filled in from the tool's form inputs. Nothing
 * here is sent anywhere — fillTemplate() is pure string interpolation that
 * runs entirely in the browser.
 */

export type DmPlatform = "linkedin" | "instagram" | "email";

export type DmAngle =
  | "problem-first"
  | "proof-first"
  | "curiosity"
  | "direct-ask"
  | "warm-observation";

export const PLATFORMS: { key: DmPlatform; label: string }[] = [
  { key: "linkedin", label: "LinkedIn" },
  { key: "instagram", label: "Instagram" },
  { key: "email", label: "Email" },
];

export const ANGLE_LABELS: Record<DmAngle, string> = {
  "problem-first": "Problem-first",
  "proof-first": "Proof-first",
  curiosity: "Curiosity",
  "direct-ask": "Direct ask",
  "warm-observation": "Warm observation",
};

export type DmTemplate = {
  id: string;
  platform: DmPlatform;
  angle: DmAngle;
  subject?: string; // email only
  body: string;
};

export type DmInputs = {
  platform: DmPlatform;
  niche: string;
  offer: string;
  proof: string;
};

export const DEFAULT_INPUTS: DmInputs = {
  platform: "linkedin",
  niche: "dental clinics",
  offer: "an AI booking assistant that answers calls 24/7",
  proof: "recovered 30+ missed calls a month for a clinic in Austin",
};

export const DM_TEMPLATES: DmTemplate[] = [
  // ---------------------------------------------------------------
  // LinkedIn
  // ---------------------------------------------------------------
  {
    id: "li-problem",
    platform: "linkedin",
    angle: "problem-first",
    body: "Hey {{firstName}} — quick one. Most {{niche}} owners I talk to are losing leads to missed calls and slow follow-up, not lack of demand. Built {{offer}} for exactly that. {{proof}}. Worth a 15-min look?",
  },
  {
    id: "li-proof",
    platform: "linkedin",
    angle: "proof-first",
    body: "{{proof}}. I do this for {{niche}} specifically — {{offer}}. Saw your profile and figured it was worth a direct message instead of a cold pitch. Open to a quick chat this week?",
  },
  {
    id: "li-curiosity",
    platform: "linkedin",
    angle: "curiosity",
    body: "Random question — how are you currently handling after-hours inquiries for your {{niche}} business? Ask because I built {{offer}} and it's changed the math for a few operators like you. Happy to show you in 2 minutes if useful.",
  },
  {
    id: "li-direct",
    platform: "linkedin",
    angle: "direct-ask",
    body: "Hi {{firstName}}, I help {{niche}} businesses with {{offer}}. {{proof}}. If that's relevant to where you're at, I've got 15 minutes open this week — want the link?",
  },
  {
    id: "li-warm",
    platform: "linkedin",
    angle: "warm-observation",
    body: "Noticed your {{niche}} business has been growing — congrats. That usually means the manual stuff (calls, follow-up, scheduling) starts costing real time. I built {{offer}} for that exact stage. {{proof}}. Open to comparing notes?",
  },

  // ---------------------------------------------------------------
  // Instagram
  // ---------------------------------------------------------------
  {
    id: "ig-problem",
    platform: "instagram",
    angle: "problem-first",
    body: "hey! saw your page — quick q, are you still handling DMs/calls manually for your {{niche}} business? built {{offer}} that fixes that. {{proof}} 🙌 want a 60-sec demo?",
  },
  {
    id: "ig-proof",
    platform: "instagram",
    angle: "proof-first",
    body: "{{proof}} 🔥 doing this for other {{niche}} accounts too with {{offer}}. thought of you when I saw your latest post — worth a quick chat?",
  },
  {
    id: "ig-curiosity",
    platform: "instagram",
    angle: "curiosity",
    body: "random q — what's eating the most time in your {{niche}} business right now? been solving that exact thing with {{offer}} for a few people this month 👀",
  },
  {
    id: "ig-direct",
    platform: "instagram",
    angle: "direct-ask",
    body: "hey {{firstName}}! I build {{offer}} for {{niche}} businesses — {{proof}}. got 15 min this week to see if it fits your setup?",
  },
  {
    id: "ig-warm",
    platform: "instagram",
    angle: "warm-observation",
    body: "love what you're building with your {{niche}} page. once it gets busy the manual back-and-forth adds up fast — built {{offer}} for exactly that stage. {{proof}}. open to a quick look?",
  },

  // ---------------------------------------------------------------
  // Email
  // ---------------------------------------------------------------
  {
    id: "em-problem",
    platform: "email",
    angle: "problem-first",
    subject: "Quick question about {{niche}} follow-up",
    body: "Hi {{firstName}},\n\nMost {{niche}} businesses I talk to aren't losing on demand — they're losing on follow-up speed. I built {{offer}} to close that gap. {{proof}}.\n\nWorth 15 minutes to see if it fits?\n\nWaseem",
  },
  {
    id: "em-proof",
    platform: "email",
    angle: "proof-first",
    subject: "{{proof}}",
    body: "Hi {{firstName}},\n\n{{proof}}. I do this specifically for {{niche}} businesses with {{offer}}.\n\nHappy to send the exact numbers if you're curious, or grab 15 minutes this week.\n\nWaseem",
  },
  {
    id: "em-curiosity",
    platform: "email",
    angle: "curiosity",
    subject: "How is {{niche}} handled after hours?",
    body: "Hi {{firstName}},\n\nCurious how your team currently handles inquiries outside business hours. I ask because I built {{offer}} for {{niche}} businesses and it's changed the math for a few of them recently.\n\nOpen to a quick look?\n\nWaseem",
  },
  {
    id: "em-direct",
    platform: "email",
    angle: "direct-ask",
    subject: "15 minutes this week?",
    body: "Hi {{firstName}},\n\nI help {{niche}} businesses with {{offer}}. {{proof}}.\n\nIf that's relevant right now, I've got time Wednesday or Thursday — want the link?\n\nWaseem",
  },
  {
    id: "em-warm",
    platform: "email",
    angle: "warm-observation",
    subject: "Saw your {{niche}} business growing",
    body: "Hi {{firstName}},\n\nNoticed your {{niche}} business has been picking up — that's great, and it usually means the manual side (calls, scheduling, follow-up) starts costing real hours. I built {{offer}} for exactly that stage. {{proof}}.\n\nOpen to comparing notes for 15 minutes?\n\nWaseem",
  },
];

export function fillTemplate(t: DmTemplate, inputs: DmInputs): string {
  const map: Record<string, string> = {
    "{{niche}}": inputs.niche.trim() || "your niche",
    "{{offer}}": inputs.offer.trim() || "your offer",
    "{{proof}}": inputs.proof.trim() || "a proof point from a past client",
    "{{firstName}}": "[FirstName]",
  };
  let out = t.body;
  for (const [k, v] of Object.entries(map)) {
    out = out.split(k).join(v);
  }
  return out;
}

export function fillSubject(
  t: DmTemplate,
  inputs: DmInputs,
): string | undefined {
  if (!t.subject) return undefined;
  const map: Record<string, string> = {
    "{{niche}}": inputs.niche.trim() || "your niche",
    "{{offer}}": inputs.offer.trim() || "your offer",
    "{{proof}}": inputs.proof.trim() || "a proof point from a past client",
    "{{firstName}}": "[FirstName]",
  };
  let out = t.subject;
  for (const [k, v] of Object.entries(map)) {
    out = out.split(k).join(v);
  }
  return out;
}

export function templatesForPlatform(platform: DmPlatform): DmTemplate[] {
  return DM_TEMPLATES.filter((t) => t.platform === platform);
}
