import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  whatsapp?: string;
  company?: string;
  website?: string;
  role?: string;
  budget?: string;
  timeline?: string;
  stack?: string[];
  pain?: string;
  heard?: string;
  consent?: boolean;
};

const BUDGET_LABELS: Record<string, string> = {
  "under-500": "Under $500",
  "500-2000": "$500 – $2,000",
  "2000-5000": "$2,000 – $5,000",
  "5000-plus": "$5,000+",
};
const TIMELINE_LABELS: Record<string, string> = {
  "this-week": "This week",
  "this-month": "This month",
  "1-3-months": "1–3 months",
  exploring: "Just exploring",
};

function score(budget?: string, timeline?: string): "HOT" | "WARM" | "COLD" {
  if (budget === "5000-plus" || (budget === "2000-5000" && timeline === "this-week")) return "HOT";
  if (budget === "2000-5000" || (budget === "500-2000" && timeline !== "exploring")) return "WARM";
  return "COLD";
}

async function sendToGhl(payload: Payload, lead: "HOT" | "WARM" | "COLD") {
  const url = process.env.GHL_DISCOVERY_WEBHOOK_URL;
  if (!url) return { ok: false, skipped: true };

  const body = {
    source: "skynetjoe.com /discovery-call",
    lead_score: lead,
    first_name: (payload.name || "").split(" ")[0] || "",
    last_name: (payload.name || "").split(" ").slice(1).join(" ") || "",
    email: payload.email,
    phone: payload.whatsapp,
    company_name: payload.company,
    website: payload.website,
    role: payload.role,
    budget: BUDGET_LABELS[payload.budget || ""] || payload.budget,
    timeline: TIMELINE_LABELS[payload.timeline || ""] || payload.timeline,
    stack: (payload.stack || []).join(", "),
    pain_description: payload.pain,
    heard_from: payload.heard,
    tags: ["discovery-apply", `budget:${payload.budget}`, `timeline:${payload.timeline}`, `score:${lead}`],
    submitted_at: new Date().toISOString(),
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { ok: res.ok, status: res.status };
}

async function sendEmailFallback(payload: Payload, lead: "HOT" | "WARM" | "COLD") {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_NOTIFY_EMAIL || "waseem@skynetjoe.com";
  const fromEmail = process.env.RESEND_FROM || "leads@skynetjoe.com";
  if (!apiKey) return { ok: false, skipped: true };

  const stackList = (payload.stack || []).join(", ") || "—";
  const subject = `[${lead}] New discovery brief — ${payload.name || "Anon"} (${BUDGET_LABELS[payload.budget || ""] || "no budget"})`;
  const html = `
    <div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:600px;margin:0 auto;padding:20px;background:#0a2d4a;color:#fff;">
      <div style="background:linear-gradient(135deg,#1E88E5,#14B8A6);padding:20px;border-radius:12px;margin-bottom:20px;">
        <h1 style="margin:0;font-size:22px;">New discovery brief — ${lead}</h1>
        <p style="margin:6px 0 0;opacity:0.9;">${new Date().toUTCString()}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        ${row("Name", payload.name)}
        ${row("Email", payload.email)}
        ${row("Signal", payload.whatsapp)}
        ${row("Role", payload.role)}
        ${row("Company", payload.company)}
        ${row("Website", payload.website)}
        ${row("Budget", BUDGET_LABELS[payload.budget || ""] || payload.budget)}
        ${row("Timeline", TIMELINE_LABELS[payload.timeline || ""] || payload.timeline)}
        ${row("Stack", stackList)}
        ${row("Heard from", payload.heard)}
      </table>
      <div style="margin-top:20px;padding:16px;background:rgba(255,255,255,0.06);border-radius:8px;border-left:3px solid #00D4FF;">
        <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#7ee4ff;margin-bottom:8px;">Main pain</div>
        <div style="white-space:pre-wrap;line-height:1.5;">${(payload.pain || "—").replace(/</g, "&lt;")}</div>
      </div>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: payload.email,
      subject,
      html,
    }),
  });
  return { ok: res.ok, status: res.status };
}

function row(label: string, value?: string) {
  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.08);font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#7ee4ff;width:120px;">${label}</td>
    <td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.08);">${(value || "—").replace(/</g, "&lt;")}</td>
  </tr>`;
}

export async function POST(req: Request) {
  let payload: Payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!payload.name || !payload.email || !payload.budget || !payload.timeline || !payload.pain || !payload.consent) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const lead = score(payload.budget, payload.timeline);

  const [ghlRes, emailRes] = await Promise.allSettled([
    sendToGhl(payload, lead),
    sendEmailFallback(payload, lead),
  ]);

  const ghlOk = ghlRes.status === "fulfilled" && (ghlRes.value.ok || ghlRes.value.skipped);
  const emailOk = emailRes.status === "fulfilled" && (emailRes.value.ok || emailRes.value.skipped);

  if (!ghlOk && !emailOk) {
    console.error("[discovery] both GHL + email failed", { ghlRes, emailRes });
    return NextResponse.json(
      { error: "Couldn't deliver brief. Email waseem@skynetjoe.com directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    lead_score: lead,
    ghl: ghlOk,
    email: emailOk,
  });
}
