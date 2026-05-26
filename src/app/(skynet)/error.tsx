"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, MessageCircle } from "lucide-react";

/**
 * Cream editorial pivot 2026-05-25 — error boundary.
 */

const C = {
  cream: "#F2EFE6",
  cream2: "#EDE8DC",
  cream3: "#FAF7F0",
  ink: "#1A1A1A",
  ink2: "#3A3A36",
  inkFaint: "#6B6B65",
  terra: "#C66B3F",
  oxblood: "#6B2C2C",
  rule: "rgba(26,26,26,0.12)",
};

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app error]", error);
  }, [error]);

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        padding: "96px 0 64px",
        background: C.cream3,
        color: C.ink,
      }}
    >
      <div className="container-x px-6 relative z-10">
        <div className="max-w-2xl">
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: C.oxblood,
              fontWeight: 600,
              marginBottom: 22,
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <AlertTriangle style={{ width: 12, height: 12 }} />
            Something broke
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              color: C.ink,
              marginBottom: 16,
            }}
          >
            Our{" "}
            <em style={{ fontStyle: "italic", color: C.oxblood }}>bad.</em>
          </h1>
          <p style={{ fontSize: 17, color: C.ink2, lineHeight: 1.6, marginBottom: 8 }}>
            Something on this page crashed. We&apos;ve been notified automatically.
          </p>
          {error.digest && (
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: C.inkFaint,
                marginBottom: 28,
              }}
            >
              — Error ID: {error.digest}
            </p>
          )}

          <div className="flex flex-wrap gap-3">
            <button
              onClick={reset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 22px",
                background: C.terra,
                color: C.cream3,
                border: "none",
                fontWeight: 600,
                fontSize: 14,
                borderRadius: 2,
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
              }}
            >
              <RotateCcw style={{ width: 14, height: 14 }} />
              Try again
            </button>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 20px",
                background: "transparent",
                border: `1px solid ${C.ink}`,
                color: C.ink,
                fontWeight: 600,
                fontSize: 14,
                borderRadius: 2,
                fontFamily: "var(--font-sans)",
              }}
            >
              <Home style={{ width: 14, height: 14 }} />
              Go home
            </Link>
            <Link
              href="/discovery-call"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 20px",
                background: "transparent",
                border: `1px solid ${C.ink}`,
                color: C.ink,
                fontWeight: 600,
                fontSize: 14,
                borderRadius: 2,
                fontFamily: "var(--font-sans)",
              }}
            >
              <MessageCircle style={{ width: 14, height: 14 }} />
              Tell us about it
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
