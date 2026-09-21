"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { Loader2, CalendarClock } from "lucide-react";

/**
 * Cream editorial pivot 2026-05-25 — Calendly container.
 * Cream-3 paper container with 1px ink border. No gradient, no glow.
 *
 * 2026-09-21: moved from app/(skynet)/discovery-call/ to components/ when
 * /discovery-call was folded into /contact. The 7-question qualifier that
 * used to prefill Calendly custom answers went with that page; the embed is
 * now a plain booking widget. On a confirmed booking it fires the dataLayer
 * event and forwards to /thank-you; the lead is written by the Calendly
 * webhook route (/api/webhooks/calendly), not from the browser.
 */

const C = {
  cream2: "#EDE8DC",
  cream3: "#FAF7F0",
  ink: "#1A1A1A",
  ink2: "#3A3A36",
  inkFaint: "#6B6B65",
  terra: "#C66B3F",
  rule: "rgba(26,26,26,0.12)",
};

const CALENDLY_URL =
  "https://calendly.com/skynetlabs/schedule-a-free-consultation";

const UTM = {
  utmSource: "skynetjoe",
  utmMedium: "contact",
  utmCampaign: "book-a-call",
} as const;

export default function CalendlyEmbed({
  onScheduled,
}: {
  onScheduled?: () => void;
} = {}) {
  const router = useRouter();
  const [scheduled, setScheduled] = useState(false);

  useCalendlyEventListener({
    onEventScheduled: () => {
      if (scheduled) return;
      setScheduled(true);
      // The lead itself is recorded server-side by /api/webhooks/calendly
      // (invitee.created carries the email; the browser event does not), so
      // there is no client POST here — the old one only worked because the
      // qualifier had already captured the email.
      if (
        typeof window !== "undefined" &&
        (window as unknown as { dataLayer?: unknown[] }).dataLayer
      ) {
        (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
          event: "discovery_call_scheduled",
        });
      }
      onScheduled?.();
      window.setTimeout(() => {
        router.push("/thank-you?ref=contact");
      }, 1200);
    },
  });

  return (
    <div
      style={{
        background: C.cream3,
        border: `1px solid ${C.ink}`,
        padding: 6,
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 18px 48px rgba(26,26,26,0.10)",
      }}
    >
      <div
        style={{
          overflow: "hidden",
          position: "relative",
          background: "#fff",
          minHeight: 720,
        }}
      >
        <InlineWidget
          url={CALENDLY_URL}
          utm={UTM}
          styles={{ height: "720px", minWidth: "320px" }}
          pageSettings={{
            backgroundColor: "FAF7F0",
            primaryColor: "C66B3F",
            textColor: "1A1A1A",
            hideEventTypeDetails: false,
            hideGdprBanner: true,
            hideLandingPageDetails: false,
          }}
          iframeTitle="SkynetLabs · Free 30-minute strategy call"
          LoadingSpinner={() => (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: C.cream3,
              }}
            >
              <Loader2
                style={{
                  width: 36,
                  height: 36,
                  color: C.terra,
                  marginBottom: 12,
                }}
                className="animate-spin"
              />
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 15,
                  fontWeight: 600,
                  color: C.ink,
                  margin: 0,
                }}
              >
                Loading calendar…
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: C.inkFaint,
                  marginTop: 6,
                }}
              >
                — Bali · GMT+8 · auto-converts to your timezone
              </p>
            </div>
          )}
        />
      </div>

      {scheduled && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(250, 247, 240, 0.94)",
            zIndex: 10,
          }}
        >
          <div style={{ textAlign: "center", padding: "0 24px" }}>
            <CalendarClock
              style={{
                width: 48,
                height: 48,
                color: C.terra,
                margin: "0 auto 16px",
              }}
            />
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 600,
                color: C.ink,
                marginBottom: 6,
                letterSpacing: "-0.01em",
              }}
            >
              Slot locked. Redirecting…
            </p>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: C.inkFaint,
                margin: 0,
              }}
            >
              — Sending your prep notes to Waseem now
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export const CALENDLY_SECTION_ID = "calendly-embed";
