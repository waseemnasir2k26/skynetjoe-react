/**
 * ToolsStrip — cross-promo strip linking to /tools/* utilities.
 * Server component, cream editorial styling.
 *
 * Placement: rendered ONCE per page via Footer.tsx (excluding homepage).
 * Pass `currentSlug` to hide a tool from its own page.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type ToolsStripProps = {
  /** Optional tool slug to hide from the strip (use on /tools/[slug] pages). */
  currentSlug?: string;
  /** Optional heading override. */
  heading?: string;
  /** Optional eyebrow override. */
  eyebrow?: string;
};

type Tool = {
  slug: string;
  name: string;
  blurb: string;
};

// Curated 8 — picked the highest-value mix across calc / quiz / library / generator.
const TOOLS: Tool[] = [
  {
    slug: "revenue-calculator",
    name: "Revenue Calculator",
    blurb: "What automation actually saves you",
  },
  {
    slug: "ai-readiness-score",
    name: "AI Readiness Score",
    blurb: "Score your AI readiness in 90 seconds",
  },
  {
    slug: "agency-stress-quiz",
    name: "Agency Stress Quiz",
    blurb: "How burnt out is your agency stack?",
  },
  {
    slug: "automation-gap-analyzer",
    name: "Automation Gap Analyzer",
    blurb: "Find the 3 workflows costing you sleep",
  },
  {
    slug: "prompt-library",
    name: "Prompt Library",
    blurb: "200+ prompts, ready to ship",
  },
  {
    slug: "content-calendar",
    name: "Content Calendar",
    blurb: "12-month posting plan in 60 sec",
  },
  {
    slug: "voice-persona-builder",
    name: "Voice Persona Builder",
    blurb: "Brand voice doc in 4 steps",
  },
  {
    slug: "video-prompt-generator",
    name: "Video Prompt Generator",
    blurb: "Runway / Pika / Sora / Veo formats",
  },
];

export default function ToolsStrip({
  currentSlug,
  heading = "Open the toolbox",
  eyebrow = "— Free tools · Build something today",
}: ToolsStripProps) {
  const tools = currentSlug ? TOOLS.filter((t) => t.slug !== currentSlug) : TOOLS;
  const visible = tools.slice(0, 8);

  return (
    <section
      aria-label="Free tools"
      style={{
        background: "var(--cream-2)",
        borderTop: "1px solid var(--ink)",
        borderBottom: "1px solid var(--ink)",
      }}
    >
      <div className="container-x px-6 py-14 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-10">
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "var(--terracotta)",
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              {eyebrow}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(28px, 3.5vw, 32px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--ink)",
                margin: 0,
              }}
            >
              {heading}{" "}
              <span style={{ color: "var(--terracotta)", fontStyle: "normal" }}>→</span>
            </h2>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 shrink-0"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--ink)",
              fontWeight: 600,
              borderBottom: "1px solid var(--ink)",
              paddingBottom: 2,
              textDecoration: "none",
            }}
          >
            See all tools <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group tools-strip-card"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 14,
                padding: "18px 20px",
                background: "var(--cream-3)",
                border: "1px solid rgba(26,26,26,0.12)",
                borderRadius: 2,
                textDecoration: "none",
                color: "var(--ink)",
                transition: "border-color 160ms ease, transform 160ms ease",
                minHeight: 112,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                    color: "var(--ink)",
                    marginBottom: 6,
                  }}
                >
                  {tool.name}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: "var(--ink-2)",
                    margin: 0,
                  }}
                >
                  {tool.blurb}
                </p>
              </div>
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "var(--terracotta)",
                  fontWeight: 600,
                }}
              >
                Open
                <ArrowRight
                  className="w-3 h-3 tools-strip-arrow"
                  style={{ transition: "transform 160ms ease" }}
                />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .tools-strip-card:hover {
          border-color: var(--terracotta) !important;
          transform: translateY(-2px);
        }
        .tools-strip-card:hover .tools-strip-arrow {
          transform: translateX(3px);
        }
      `}</style>
    </section>
  );
}
