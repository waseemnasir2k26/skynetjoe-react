"use client";

import Reveal from "@/components/home/Reveal";
import { MACHINE_NODES } from "./machineData";

/**
 * Premium static composition for mobile/touch, prefers-reduced-motion, and
 * WebGL-unavailable browsers — no pin, no 3D, no JS animation loop beyond
 * Reveal's own reduced-motion-safe fade-up (reused from the sitewide
 * scroll-choreography convention, not a bespoke animation system). Renders
 * the same 5-node chain vertically, in normal document flow.
 */
export default function MachineStaticFallback() {
  return (
    <div
      style={{
        background: "var(--cream-3)",
        border: "1px solid rgba(26,26,26,0.12)",
        borderRadius: 4,
        padding: "clamp(24px, 6vw, 40px) clamp(20px, 5vw, 28px)",
      }}
    >
      <div style={{ position: "relative" }}>
        {/* Connector line behind the stacked cards. */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 19,
            top: 8,
            bottom: 8,
            width: 2,
            background:
              "linear-gradient(180deg, rgba(198,107,63,0.5), rgba(198,107,63,0.15))",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {MACHINE_NODES.map((n, i) => (
            <Reveal key={n.id} delay={i * 0.06}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  position: "relative",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flex: "0 0 40px",
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "var(--cream)",
                    border: "2px solid var(--terracotta)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    fontWeight: 700,
                    color: "var(--terracotta-aa)",
                    zIndex: 1,
                  }}
                >
                  {n.index}
                </span>
                <div style={{ paddingTop: 6 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 17,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    {n.label}
                  </div>
                  <div
                    style={{
                      fontSize: 13.5,
                      color: "var(--ink-2)",
                      marginTop: 2,
                    }}
                  >
                    {n.sublabel}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
