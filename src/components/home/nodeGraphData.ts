/**
 * Shared data for the hero "live automation fabric" node graph.
 *
 * Single source of truth consumed by both the SSR/no-JS <NodeGraphSVG>
 * fallback and the decorative <NodeGraphCanvas> animation layer, so the two
 * never drift out of sync. Every href below is a real, currently-routed
 * page in this repo (verified against src/lib/site.ts SERVICE_CATEGORIES) —
 * no placeholder links.
 */

export type GraphNode = {
  id: string;
  label: string;
  href: string;
  /** Angle in the ring, 0 = due right, increases clockwise (radians). */
  angle: number;
  /**
   * Optional explicit normalized (0..1) position override, used instead of
   * the even-ring angle/ellipse math for a handful of nodes whose default
   * ring position lands under the hero copy column (see layoutNode below).
   */
  pos?: { x: number; y: number };
};

// Center "hub" node — the SkynetLabs node every service connects back to.
export const HUB = { id: "hub", label: "SkynetLabs" } as const;

// 8 satellite nodes = the real service categories this graph represents.
// angle spacing = 2π / 8, offset by -π/2 so the first node sits at 12 o'clock.
const N = 8;
const step = (Math.PI * 2) / N;
const start = -Math.PI / 2;

export const GRAPH_NODES: GraphNode[] = [
  {
    id: "inbox",
    label: "Gmail / Inbox",
    href: "/services/n8n-automation",
    angle: start + step * 0,
  },
  {
    id: "sheets",
    label: "Sheets",
    href: "/services/n8n-automation",
    angle: start + step * 1,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "/services/social-automation",
    angle: start + step * 2,
  },
  {
    id: "crm",
    label: "CRM",
    href: "/services/gohighlevel",
    angle: start + step * 3,
  },
  {
    id: "ai",
    label: "AI Agent",
    href: "/services/ai-chatbots",
    angle: start + step * 4,
  },
  {
    id: "calendar",
    label: "Calendar",
    href: "/discovery-call",
    angle: start + step * 5,
    // Default ring position (~0.20, 0.78) sits directly under the hero's
    // CTA row at 1440, and drifts even lower relative to the (much taller,
    // stacked) mobile copy at 768 where it lands mid-H1 instead. The hero
    // graph box is pinned to the TOP of the section with a fixed aspect
    // ratio (see NodeGraphHero.tsx) — it never stretches to the section's
    // full height — so at every breakpoint the copy column runs eyebrow
    // -> H1 -> body -> CTA with no vertical gap wide enough to fit a node
    // beneath y ~0.26. The only band that stays clear above the eyebrow at
    // all three breakpoints is the very top of the box, so this node moves
    // there (next to "Content") instead of trying to find open space lower
    // down the left column.
    pos: { x: 0.32, y: 0.05 },
  },
  {
    id: "website",
    label: "Website",
    href: "/services/wordpress-seo",
    angle: start + step * 6,
  },
  {
    id: "content",
    label: "Content",
    href: "/services/ai-content-creation",
    angle: start + step * 7,
    // Default ring position (~0.20, 0.22) sits directly under the hero
    // eyebrow line at 1440/768. Pulled up toward the top-left corner,
    // level with "Gmail / Inbox" instead of into the copy column.
    pos: { x: 0.1, y: 0.06 },
  },
];

// Reduced set for mobile / low-power canvas animation (perf budget). The
// SVG fallback still renders the full GRAPH_NODES set — this subset only
// throttles the canvas's per-frame workload (fewer edges/pulses to update).
export const GRAPH_NODES_MOBILE: GraphNode[] = GRAPH_NODES.filter((n) =>
  ["inbox", "whatsapp", "ai", "crm"].includes(n.id),
);

/** Normalized (0..1) layout: hub at center, satellites on an ellipse ring. */
export function layoutNode(node: GraphNode, rx = 0.42, ry = 0.4) {
  if (node.pos) return node.pos;
  return {
    x: 0.5 + Math.cos(node.angle) * rx,
    y: 0.5 + Math.sin(node.angle) * ry,
  };
}
