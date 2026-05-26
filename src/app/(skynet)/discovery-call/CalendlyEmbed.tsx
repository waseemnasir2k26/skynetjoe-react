"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { Loader2, CalendarClock } from "lucide-react";
import type { QualifierState } from "./Qualifier";

/**
 * Cream editorial pivot 2026-05-25 — Calendly container.
 * Cream-3 paper container with 1px ink border. No gradient, no glow.
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

function buildPrefill(q: QualifierState | null) {
  if (!q) return undefined;
  const businessLabel =
    q.businessType === "other"
      ? q.businessTypeOther || "Other"
      : q.businessType;
  const leakLabel =
    q.biggestLeak === "other" ? q.biggestLeakOther || "Other" : q.biggestLeak;
  const automateList = q.automateTargets
    .map((v) => (v === "other" ? q.automateTargetsOther || "Other" : v))
    .join(", ");

  return {
    customAnswers: {
      a1: businessLabel || "",
      a2: q.teamSize || "",
      a3: leakLabel || "",
      a4: q.monthlyLeads || "",
      a5: automateList,
      a6: q.revenueRange || "",
      a7: q.urgency || "",
    },
  };
}

function buildUtm(leadId: string | null) {
  return {
    utmSource: "skynetjoe",
    utmMedium: "discovery-call",
    utmCampaign: "qualified-funnel",
    utmContent: leadId || "anon",
  };
}

export default function CalendlyEmbed({
  qualification,
  leadId,
  onScheduled,
}: {
  qualification: QualifierState | null;
  leadId: string | null;
  onScheduled?: () => void;
}) {
  const router = useRouter();
  const [scheduled, setScheduled] = useState(false);

  const prefill = useMemo(
    () => buildPrefill(qualification),
    [qualification],
  );
  const utm = useMemo(() => buildUtm(leadId), [leadId]);

  useCalendlyEventListener({
    onEventScheduled: async (e) => {
      if (scheduled) return;
      setScheduled(true);
      const payload = {
        leadId,
        source: "discovery-call",
        qualification: qualification || undefined,
        booking: {
          event: e.data.payload?.event?.uri,
          invitee: e.data.payload?.invitee?.uri,
          scheduledAt: new Date().toISOString(),
        },
        utm: {
          source: utm.utmSource,
          medium: utm.utmMedium,
          campaign: utm.utmCampaign,
        },
        submittedAt: new Date().toISOString(),
      };
      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("[discovery-call] booking POST failed", err);
      }
      if (
        typeof window !== "undefined" &&
        (window as unknown as { dataLayer?: unknown[] }).dataLayer
      ) {
        (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
          event: "discovery_call_scheduled",
          leadId,
        });
      }
      onScheduled?.();
      window.setTimeout(() => {
        router.push("/thank-you?ref=discovery-call");
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
          prefill={prefill}
          utm={utm}
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
