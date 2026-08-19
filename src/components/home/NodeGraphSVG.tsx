import { GRAPH_NODES, HUB, layoutNode } from "./nodeGraphData";

const W = 800;
const H = 480;

/**
 * Server-rendered, always-in-DOM node graph. This is the no-JS and
 * prefers-reduced-motion experience, AND it is what paints first (inside
 * <NodeGraphHero>) before the decorative canvas layer mounts on top of it —
 * so it must look complete and premium on its own, not like a loading state.
 *
 * Every node is a real, keyboard-focusable, screen-reader-visible <a> (via
 * SVG <a>), so hover/keyboard-focus interaction works with zero JS. The
 * canvas layer (see NodeGraphCanvas.tsx) only adds motion around this —
 * it never replaces or hides these anchors.
 */
export default function NodeGraphSVG({ className }: { className?: string }) {
  const hub = { x: 0.5, y: 0.5 };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role="img"
      aria-label="Automation fabric: SkynetLabs connecting Gmail, Sheets, WhatsApp, CRM, AI agents, Calendar, your website, and content — click a node to see that service."
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <g opacity={0.9}>
        {GRAPH_NODES.map((n) => {
          const p = layoutNode(n);
          const x1 = hub.x * W;
          const y1 = hub.y * H;
          const x2 = p.x * W;
          const y2 = p.y * H;
          // Gentle bezier curve, control point pulled toward center for a
          // "flowing" n8n-style edge rather than a straight ruler line.
          const cx = (x1 + x2) / 2 + (y1 - y2) * 0.08;
          const cy = (y1 + y2) / 2 + (x2 - x1) * 0.08;
          return (
            <path
              key={`edge-${n.id}`}
              d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
              fill="none"
              stroke="var(--ink)"
              strokeOpacity={0.14}
              strokeWidth={1.4}
            />
          );
        })}
      </g>

      {/* Hub node */}
      <g transform={`translate(${hub.x * W}, ${hub.y * H})`}>
        <circle
          r={22}
          fill="var(--terracotta)"
          fillOpacity={0.14}
          stroke="var(--terracotta)"
          strokeOpacity={0.5}
        />
        <circle r={5} fill="var(--terracotta)" />
        <text
          y={38}
          textAnchor="middle"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fill: "var(--ink)",
            fontWeight: 700,
          }}
        >
          {HUB.label}
        </text>
      </g>

      {/* Satellite nodes — real links */}
      {GRAPH_NODES.map((n) => {
        const p = layoutNode(n);
        const x = p.x * W;
        const y = p.y * H;
        return (
          <a
            key={n.id}
            href={n.href}
            aria-label={`${n.label} — see this service`}
          >
            <g transform={`translate(${x}, ${y})`} className="graph-node-a11y">
              <circle
                r={14}
                fill="var(--cream-3)"
                stroke="var(--ink)"
                strokeOpacity={0.22}
                strokeWidth={1.2}
              />
              <circle r={3.5} fill="var(--terracotta)" />
              <text
                y={30}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.04em",
                  fill: "var(--ink-2)",
                }}
              >
                {n.label}
              </text>
            </g>
          </a>
        );
      })}
    </svg>
  );
}
