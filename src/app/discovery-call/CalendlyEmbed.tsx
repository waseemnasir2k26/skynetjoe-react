"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { Loader2, CalendarClock } from "lucide-react";
import type { QualifierState } from "./Qualifier";

const CALENDLY_URL =
  "https://calendly.com/skynetlabs/schedule-a-free-consultation";

// Map qualifier answers into Calendly's customAnswers slots (a1..a10).
// Order is locked so Calendly's intake form receives consistent fields.
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

  // Listen for the calendly.event_scheduled message
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
      // DataLayer event for GTM
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
      // Brief delay so Calendly's success UI flashes before redirect
      window.setTimeout(() => {
        router.push("/thank-you?ref=discovery-call");
      }, 1200);
    },
  });

  return (
    <div
      className="rounded-3xl p-1 md:p-1.5 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1E88E5 0%, #14B8A6 60%, #073846 100%)",
        boxShadow:
          "0 30px 80px -20px rgba(0, 212, 255, 0.35), 0 0 0 1px rgba(126, 228, 255, 0.20)",
      }}
    >
      <div
        className="rounded-[22px] overflow-hidden relative bg-white"
        style={{ minHeight: 720 }}
      >
        <InlineWidget
          url={CALENDLY_URL}
          prefill={prefill}
          utm={utm}
          styles={{ height: "720px", minWidth: "320px" }}
          pageSettings={{
            backgroundColor: "ffffff",
            primaryColor: "1E88E5",
            textColor: "0a2d4a",
            hideEventTypeDetails: false,
            hideGdprBanner: true,
            hideLandingPageDetails: false,
          }}
          iframeTitle="SkynetLabs · Free 30-minute strategy call"
          LoadingSpinner={() => (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white">
              <Loader2 className="w-10 h-10 text-cyan-500 animate-spin mb-3" />
              <p className="text-sm font-semibold text-slate-700">
                Loading calendar…
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Bali hours · GMT+8 · auto-converted to your timezone
              </p>
            </div>
          )}
        />
      </div>

      {scheduled && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/85 backdrop-blur-sm rounded-3xl z-10">
          <div className="text-center px-6">
            <CalendarClock className="w-12 h-12 text-cyan-300 mx-auto mb-4" />
            <p className="text-xl font-extrabold text-white mb-1">
              Slot locked. Redirecting…
            </p>
            <p className="text-sm text-cyan-200">
              Sending your prep notes to Waseem now.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Used by parent to scroll to embed via id
export const CALENDLY_SECTION_ID = "calendly-embed";
