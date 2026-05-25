import Link from "next/link";
import * as Icons from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/site";

/**
 * Cream editorial pivot 2026-05-25 — services grid.
 * cream-2 cards with 1px ink border + alternating rotation.
 * Fraunces serif headline with italic terracotta accent.
 */

type IconCmp = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

const C = {
  cream2: "#EDE8DC",
  cream3: "#FAF7F0",
  ink: "#1A1A1A",
  ink2: "#3A3A36",
  inkFaint: "#6B6B65",
  terra: "#C66B3F",
  rule: "rgba(26,26,26,0.12)",
};

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container-x">
        <div className="max-w-3xl mb-12">
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: C.terra,
              fontWeight: 600,
              marginBottom: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ width: 28, height: 1, background: C.terra }} />
            What we ship
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              color: C.ink,
              marginBottom: 16,
            }}
          >
            16 services. One operator.{" "}
            <em style={{ fontStyle: "italic", color: C.terra }}>Zero excuses.</em>
          </h2>
          <p style={{ fontSize: 17, color: C.ink2, lineHeight: 1.6 }}>
            Built and run by Waseem Nasir — no agency layers, no offshored juniors,
            no waiting on a project manager. You talk directly to the person doing the work.
          </p>
        </div>

        <div className="space-y-12">
          {SERVICE_CATEGORIES.map((cat) => (
            <div key={cat.name}>
              <h3
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: C.terra,
                  fontWeight: 600,
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ width: 32, height: 1, background: C.terra }} />
                {cat.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cat.services.map((svc, idx) => {
                  const Icon = ((Icons as unknown) as Record<string, IconCmp>)[svc.icon] ?? ((Icons as unknown) as Record<string, IconCmp>).Bot;
                  return (
                    <Link
                      key={svc.slug}
                      href={`/services/${svc.slug}`}
                      className="group relative"
                      style={{
                        display: "block",
                        padding: 24,
                        background: C.cream2,
                        border: `1px solid ${C.rule}`,
                        transition: "border-color 0.18s, transform 0.18s",
                        transform: idx % 2 === 0 ? "rotate(-0.3deg)" : "rotate(0.3deg)",
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          background: C.cream3,
                          border: `1px solid ${C.rule}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: 16,
                        }}
                      >
                        <Icon style={{ width: 20, height: 20, color: C.terra }} />
                      </div>
                      <h4
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 16,
                          fontWeight: 600,
                          color: C.ink,
                          marginBottom: 8,
                          letterSpacing: "-0.005em",
                        }}
                      >
                        {svc.label}
                      </h4>
                      <p style={{ fontSize: 14, color: C.ink2, lineHeight: 1.55, margin: 0 }}>
                        {svc.desc}
                      </p>
                      <Icons.ArrowUpRight
                        className="absolute group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        style={{
                          top: 20,
                          right: 20,
                          width: 16,
                          height: 16,
                          color: C.inkFaint,
                          transition: "all 0.18s",
                        }}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
