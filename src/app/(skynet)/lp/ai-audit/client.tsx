"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import {
  Loader2,
  CalendarClock,
  PhoneMissed,
  Inbox,
  MessageSquare,
  FileText,
  ArrowDown,
} from "lucide-react";

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

const BOOK_ID = "book";

function fireFbq(event: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { fbq?: (...args: unknown[]) => void };
  if (w.fbq) w.fbq("track", event);
}

// /api/leads requires an email; Calendly's scheduled event exposes only URIs.
// So the email is captured in a gate step BEFORE the calendar (same pattern as
// /discovery-call's qualifier): the lead posts to GHL immediately, and the
// calendar opens prefilled. The booking POST then updates the same leadId.
function BookingEmbed({
  lead,
}: {
  lead: { name: string; email: string; leadId: string };
}) {
  const router = useRouter();
  const [scheduled, setScheduled] = useState(false);

  useCalendlyEventListener({
    onEventScheduled: async (e) => {
      if (scheduled) return;
      setScheduled(true);
      fireFbq("Schedule");
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadId: lead.leadId,
            source: "lp-ai-audit",
            email: lead.email,
            booking: {
              event: e.data.payload?.event?.uri,
              invitee: e.data.payload?.invitee?.uri,
              inviteeEmail: lead.email,
              inviteeName: lead.name,
              scheduledAt: new Date().toISOString(),
            },
            utm: {
              source: "meta",
              medium: "paid-social",
              campaign: "ai-audit-2026",
            },
            submittedAt: new Date().toISOString(),
          }),
        });
        if (!res.ok) {
          console.error("[lp-ai-audit] booking POST rejected", {
            status: res.status,
          });
        }
      } catch (err) {
        console.error("[lp-ai-audit] booking POST failed", err);
      }
      window.setTimeout(() => {
        router.push("/thank-you?ref=ai-audit");
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
          prefill={{ name: lead.name, email: lead.email }}
          utm={{
            utmSource: "meta",
            utmMedium: "paid-social",
            utmCampaign: "ai-audit-2026",
          }}
          styles={{ height: "720px", minWidth: "320px" }}
          pageSettings={{
            backgroundColor: "FAF7F0",
            primaryColor: "C66B3F",
            textColor: "1A1A1A",
            hideEventTypeDetails: false,
            hideGdprBanner: true,
            hideLandingPageDetails: false,
          }}
          iframeTitle="SkynetLabs · Free 20-minute AI systems audit"
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
                — times auto-convert to your timezone
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
              — Check your email for the confirmation
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingSection() {
  const [lead, setLead] = useState<{
    name: string;
    email: string;
    leadId: string;
  } | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function unlock(ev: React.FormEvent) {
    ev.preventDefault();
    const n = name.trim();
    const em = email.trim();
    if (!n || !/.+@.+\..+/.test(em)) {
      setErr("A name and a working email — that's all it needs.");
      return;
    }
    setErr("");
    setBusy(true);
    fireFbq("Lead");
    const leadId = `lead_${Date.now().toString(36)}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          source: "lp-ai-audit",
          email: em,
          qualification: {
            email: em,
            firstName: n.split(/\s+/)[0],
            lastName: n.split(/\s+/).slice(1).join(" ") || undefined,
          },
          utm: {
            source: "meta",
            medium: "paid-social",
            campaign: "ai-audit-2026",
          },
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        console.error("[lp-ai-audit] lead POST rejected", {
          status: res.status,
        });
      }
    } catch (e) {
      console.error("[lp-ai-audit] lead POST failed", e);
    }
    // Calendar opens regardless — the booking itself must never be blocked
    // by a CRM hiccup; Calendly's own confirmation is the safety net.
    setLead({ name: n, email: em, leadId });
    setBusy(false);
  }

  if (lead) return <BookingEmbed lead={lead} />;

  return (
    <form
      onSubmit={unlock}
      style={{
        background: C.cream3,
        border: `1px solid ${C.ink}`,
        padding: "34px 28px",
        maxWidth: 520,
        margin: "0 auto",
        boxShadow: "0 18px 48px rgba(26,26,26,0.10)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 18,
          fontWeight: 700,
          margin: "0 0 6px",
        }}
      >
        First, where should the audit summary go?
      </p>
      <p style={{ fontSize: 14, color: C.ink2, margin: "0 0 18px" }}>
        You&apos;ll get the calendar right after — and the written findings land
        in this inbox after the call.
      </p>
      <div style={{ display: "grid", gap: 12 }}>
        <input
          type="text"
          autoComplete="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            border: `1px solid ${C.rule}`,
            padding: "13px 14px",
            fontSize: 15,
            fontFamily: "inherit",
            background: "#fff",
          }}
        />
        <input
          type="email"
          autoComplete="email"
          placeholder="you@yourbusiness.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            border: `1px solid ${C.rule}`,
            padding: "13px 14px",
            fontSize: 15,
            fontFamily: "inherit",
            background: "#fff",
          }}
        />
        {err && (
          <p style={{ color: C.terra, fontSize: 13, margin: 0 }}>{err}</p>
        )}
        <button
          type="submit"
          disabled={busy}
          style={{
            background: C.terra,
            color: "#fff",
            border: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 16,
            padding: "14px 20px",
            cursor: "pointer",
            opacity: busy ? 0.7 : 1,
          }}
        >
          {busy ? "One second…" : "Show me the calendar"}
        </button>
      </div>
    </form>
  );
}

function BookButton({ label }: { label: string }) {
  return (
    <a
      href={`#${BOOK_ID}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: C.terra,
        color: "#fff",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 16,
        padding: "14px 28px",
        textDecoration: "none",
        letterSpacing: "0.01em",
      }}
    >
      {label}
      <ArrowDown style={{ width: 17, height: 17 }} />
    </a>
  );
}

const DOORS = [
  {
    icon: FileText,
    title: "The contact form",
    body: "It lands in an inbox tab. Which one? Who gets told? We find out together — by submitting it.",
  },
  {
    icon: PhoneMissed,
    title: "The missed call",
    body: "What happens to a call that rings out at 7pm? For most businesses: nothing. That's the leak.",
  },
  {
    icon: Inbox,
    title: "The inbox",
    body: "Enquiries mixed in with invoices and newsletters, answered “when there's a minute.”",
  },
  {
    icon: MessageSquare,
    title: "The DMs",
    body: "Instagram and Facebook messages — a fourth door, usually with nobody standing behind it.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "We open your funnel, live",
    body: "Screen share. We visit your website, submit your own contact form, and trace where it goes. We check your Google listing and talk through what happens to a missed call.",
  },
  {
    n: "02",
    title: "I mark every leak",
    body: "Each place an enquiry can die gets named out loud, on screen. Three to five is normal — it's not a judgment, it's a map.",
  },
  {
    n: "03",
    title: "You get the one-thing answer",
    body: "I tell you which single leak I'd fix first, what an AI system would do there — and honestly, whether you need one at all. The findings are yours to keep either way.",
  },
];

const FAQ = [
  {
    q: "Is this actually free?",
    a: "Yes. Twenty minutes, no invoice, no follow-up sequence trap. If a build makes sense you'll hear a fixed price on the call; if not, you keep the findings and we're done.",
  },
  {
    q: "Is this a sales pitch in disguise?",
    a: "The last five minutes are honest about what I'd charge to fix what we find — with a fixed number, on the call. The first fifteen are the audit, and it's yours regardless.",
  },
  {
    q: "What do I need to prepare?",
    a: "Nothing. Your website address and twenty minutes. If you can, know roughly how enquiries reach you today — form, phone, email, DMs.",
  },
  {
    q: "Who runs the call?",
    a: "Waseem Nasir — the builder, not a setter. SkynetLabs designs and builds AI-backed systems: websites, CRMs, and the follow-up automation that connects them.",
  },
];

export default function AiAuditClient() {
  return (
    <main style={{ background: C.cream2, color: C.ink }}>
      {/* HERO */}
      <section
        style={{
          maxWidth: 880,
          margin: "0 auto",
          padding: "84px 20px 56px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: C.terra,
            marginBottom: 18,
          }}
        >
          Free · 20 minutes · on Zoom · for business owners
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(34px, 6vw, 58px)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontWeight: 700,
            margin: "0 0 20px",
          }}
        >
          What happened to the last enquiry you never answered?
        </h1>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.65,
            color: C.ink2,
            maxWidth: 620,
            margin: "0 auto 30px",
          }}
        >
          Most businesses take enquiries through four doors at once — the form,
          the phone, the inbox, the DMs — and nobody is standing behind all
          four. On a free 20-minute audit call we walk through <em>your</em>{" "}
          funnel together, find where enquiries leak, and map what an AI system
          would do at each hole. You keep the findings either way.
        </p>
        <BookButton label="Book your free audit" />
      </section>

      {/* FOUR DOORS */}
      <section
        style={{
          background: C.cream3,
          borderTop: `1px solid ${C.rule}`,
          borderBottom: `1px solid ${C.rule}`,
        }}
      >
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "56px 20px" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              textAlign: "center",
              margin: "0 0 34px",
            }}
          >
            Four doors. We check who&apos;s standing behind each one.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: 16,
            }}
          >
            {DOORS.map((d) => (
              <div
                key={d.title}
                style={{
                  background: "#fff",
                  border: `1px solid ${C.rule}`,
                  padding: "22px 20px",
                }}
              >
                <d.icon
                  style={{
                    width: 26,
                    height: 26,
                    color: C.terra,
                    marginBottom: 12,
                  }}
                />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 16,
                    fontWeight: 700,
                    margin: "0 0 8px",
                  }}
                >
                  {d.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: C.ink2,
                    margin: 0,
                  }}
                >
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW THE CALL RUNS */}
      <section
        style={{ maxWidth: 880, margin: "0 auto", padding: "60px 20px" }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            letterSpacing: "-0.02em",
            fontWeight: 700,
            textAlign: "center",
            margin: "0 0 34px",
          }}
        >
          How the 20 minutes run
        </h2>
        <div style={{ display: "grid", gap: 14 }}>
          {STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                display: "flex",
                gap: 20,
                background: C.cream3,
                border: `1px solid ${C.rule}`,
                padding: "22px 24px",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 13,
                  color: C.terra,
                  fontWeight: 700,
                  paddingTop: 3,
                }}
              >
                {s.n}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 17,
                    fontWeight: 700,
                    margin: "0 0 6px",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: C.ink2,
                    margin: 0,
                  }}
                >
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <BookButton label="Pick a slot — it takes a minute" />
        </div>
      </section>

      {/* BOOKING */}
      <section
        id={BOOK_ID}
        style={{
          background: C.cream3,
          borderTop: `1px solid ${C.rule}`,
        }}
      >
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "60px 20px" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              letterSpacing: "-0.02em",
              fontWeight: 700,
              textAlign: "center",
              margin: "0 0 10px",
            }}
          >
            Book your free audit
          </h2>
          <p
            style={{
              textAlign: "center",
              fontSize: 15,
              color: C.ink2,
              margin: "0 0 28px",
            }}
          >
            Pick a time below — you&apos;ll get an instant confirmation email
            with the Zoom link.
          </p>
          <BookingSection />
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{ maxWidth: 760, margin: "0 auto", padding: "60px 20px 80px" }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 24,
            letterSpacing: "-0.02em",
            fontWeight: 700,
            textAlign: "center",
            margin: "0 0 26px",
          }}
        >
          Fair questions
        </h2>
        <div style={{ display: "grid", gap: 12 }}>
          {FAQ.map((f) => (
            <details
              key={f.q}
              style={{
                background: "#fff",
                border: `1px solid ${C.rule}`,
                padding: "16px 20px",
              }}
            >
              <summary
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 15.5,
                  cursor: "pointer",
                }}
              >
                {f.q}
              </summary>
              <p
                style={{
                  fontSize: 14.5,
                  lineHeight: 1.65,
                  color: C.ink2,
                  margin: "10px 0 0",
                }}
              >
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
