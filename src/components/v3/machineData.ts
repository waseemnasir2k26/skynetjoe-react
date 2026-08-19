/**
 * Shared content for the "THE MACHINE" pinned scroll-scrub beat
 * (MachineBeat.tsx / MachineSceneContent.tsx / MachineStaticFallback.tsx).
 * One source of truth so the 3D node labels, the static-fallback cards and
 * the scrubbed captions never drift out of step with each other.
 *
 * The chain is illustrative of the shape of a real automation build (lead
 * intake -> AI reply -> CRM log -> booking -> follow-up channel) — it does
 * not claim to be a specific client's exact stack, and carries no metric
 * that isn't already stated as illustrative narration ("A lead lands.").
 */
export type MachineNode = {
  id: string;
  index: string; // "01".."05"
  label: string;
  sublabel: string;
};

export const MACHINE_NODES: MachineNode[] = [
  { id: "webhook", index: "01", label: "Webhook", sublabel: "Lead lands" },
  {
    id: "ai-agent",
    index: "02",
    label: "AI Agent",
    sublabel: "Replies in seconds",
  },
  { id: "crm", index: "03", label: "CRM", sublabel: "Logged automatically" },
  { id: "calendar", index: "04", label: "Calendar", sublabel: "Booked" },
  {
    id: "whatsapp",
    index: "05",
    label: "WhatsApp",
    sublabel: "Follow-up sent",
  },
];

// Scrubbed narration captions — 4 short lines, crossfaded as the pinned
// section scrolls. Kept deliberately generic/illustrative (see file header).
export const MACHINE_CAPTIONS: string[] = [
  "A lead lands.",
  "AI answers in seconds.",
  "Booked. Logged. Followed up.",
  "You never touched it.",
];
