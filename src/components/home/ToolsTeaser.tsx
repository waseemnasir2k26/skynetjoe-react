"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Workflow, Calculator, SearchCheck } from "lucide-react";
import { TOOLS_REGISTRY } from "@/data/tools-registry";
import Reveal from "./Reveal";

/**
 * "Try the toolkit live" — surfaces 3 of the free tools already live under
 * /tools (buried in the header mega-menu today). Name/oneLiner text is
 * pulled straight from TOOLS_REGISTRY (the single source of truth for the
 * tools hub) so this can never drift from what those pages actually say.
 * The animated bits below are UI-preview motion only — no dollar figures,
 * no site metrics, nothing presented as a claim about SkynetLabs' results.
 */
const FEATURED_SLUGS = [
  "n8n-workflow-generator",
  "ai-cost-calculator",
  "aeo-audit",
] as const;

const ICONS = { Workflow, Calculator, SearchCheck } as const;

function CronTicks() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--terracotta)",
            opacity: 0.35,
            animation: `tool-tick 1.4s ease-in-out ${i * 0.22}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes tool-tick{0%,100%{opacity:.25;transform:scale(1)}40%{opacity:1;transform:scale(1.35)}}`}</style>
    </div>
  );
}

function ScrubGauge() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pct, setPct] = useState(38);

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    let raf = 0;
    const start = performance.now();
    function loop(now: number) {
      const t = (now - start) / 1000;
      setPct(38 + Math.round(22 * Math.sin(t * 1.1)));
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={ref} aria-hidden style={{ width: "100%" }}>
      <div
        style={{
          height: 5,
          borderRadius: 3,
          background: "rgba(26,26,26,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "var(--terracotta)",
            borderRadius: 3,
            transition: "width 0.1s linear",
          }}
        />
      </div>
    </div>
  );
}

function ScanSweep() {
  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        height: 5,
        borderRadius: 3,
        background: "rgba(26,26,26,0.08)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "30%",
          background: "var(--terracotta)",
          borderRadius: 3,
          animation: "tool-sweep 1.8s ease-in-out infinite",
        }}
      />
      <style>{`@keyframes tool-sweep{0%{left:-30%}50%{left:70%}100%{left:-30%}}`}</style>
    </div>
  );
}

export default function ToolsTeaser() {
  const cards = FEATURED_SLUGS.map((slug) =>
    TOOLS_REGISTRY.find((t) => t.slug === slug),
  ).filter((t): t is (typeof TOOLS_REGISTRY)[number] => Boolean(t));

  const demos: Record<string, React.ReactNode> = {
    "n8n-workflow-generator": <CronTicks />,
    "ai-cost-calculator": <ScrubGauge />,
    "aeo-audit": <ScanSweep />,
  };
  const icons: Record<string, keyof typeof ICONS> = {
    "n8n-workflow-generator": "Workflow",
    "ai-cost-calculator": "Calculator",
    "aeo-audit": "SearchCheck",
  };

  return (
    <section
      className="section"
      style={{
        background: "var(--bg)",
        color: "var(--ink)",
        fontFamily: "var(--font-sans)",
        borderBottom: "1px solid rgba(26,26,26,0.12)",
      }}
    >
      <div className="container-x">
        <Reveal className="max-w-2xl mb-10">
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--oxblood)",
              marginBottom: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              style={{
                width: 28,
                height: 1,
                background: "var(--oxblood)",
                display: "inline-block",
              }}
            />
            Free, no signup
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--ink)",
              fontSize: "clamp(26px, 6vw, 40px)",
              margin: 0,
              maxWidth: "24ch",
              wordBreak: "break-word",
            }}
          >
            Try the toolkit{" "}
            <span
              style={{
                fontStyle: "normal",
                color: "var(--terracotta-aa)",
                fontWeight: 700,
              }}
            >
              live.
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((tool, i) => {
            const Icon = ICONS[icons[tool.slug]];
            return (
              <Reveal key={tool.slug} delay={i * 0.08}>
                <Link
                  href={`/tools/${tool.slug}`}
                  className="block group"
                  style={{
                    background: "var(--cream-2)",
                    border: "1px solid rgba(26,26,26,0.12)",
                    padding: "clamp(20px, 5vw, 26px)",
                    textDecoration: "none",
                    color: "inherit",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "border-color 0.18s, transform 0.18s",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 4,
                      background: "rgba(168,69,31,0.08)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    <Icon
                      style={{
                        width: 20,
                        height: 20,
                        color: "var(--terracotta-aa)",
                      }}
                      strokeWidth={2}
                    />
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 8,
                      lineHeight: 1.25,
                    }}
                  >
                    {tool.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--ink-2)",
                      lineHeight: 1.55,
                      marginBottom: 18,
                      flex: 1,
                    }}
                  >
                    {tool.oneLiner}
                  </p>
                  <div style={{ marginBottom: 14 }}>{demos[tool.slug]}</div>
                  <span
                    className="group-hover:underline"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--terracotta-aa)",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontWeight: 600,
                    }}
                  >
                    Try it now
                    <ArrowRight style={{ width: 12, height: 12 }} />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-10">
          <Link
            href="/tools"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              color: "var(--terracotta-aa)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontWeight: 600,
            }}
          >
            See all {TOOLS_REGISTRY.length} free tools
            <ArrowRight style={{ width: 13, height: 13 }} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
