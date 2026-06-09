import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { checkRateLimit, rateLimitedResponse } from "@/lib/rate-limit";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const CAPI_TOKEN = process.env.META_CAPI_TOKEN;
const TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE;

const sha256 = (s: string) =>
  crypto.createHash("sha256").update(s.trim().toLowerCase()).digest("hex");

type CapiBody = {
  event_name:
    | "Lead"
    | "ViewContent"
    | "InitiateCheckout"
    | "CompleteRegistration"
    | "Schedule";
  event_id?: string;
  event_source_url?: string;
  user?: {
    email?: string;
    phone?: string;
    first_name?: string;
    last_name?: string;
    city?: string;
    state?: string;
  };
  custom_data?: Record<string, string | number>;
};

export async function POST(req: NextRequest) {
  const rl = checkRateLimit(req, {
    key: "meta-capi",
    limit: 6,
    windowMs: 60_000,
  });
  if (rl.rateLimited) return rateLimitedResponse(rl);

  if (!PIXEL_ID || !CAPI_TOKEN) {
    return NextResponse.json(
      { error: "Meta CAPI not configured" },
      { status: 503 },
    );
  }

  let body: CapiBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    undefined;
  const userAgent = req.headers.get("user-agent") || undefined;
  const fbp = req.cookies.get("_fbp")?.value;
  const fbc = req.cookies.get("_fbc")?.value;

  const user_data: Record<string, string> = {};
  if (body.user?.email) user_data.em = sha256(body.user.email);
  if (body.user?.phone)
    user_data.ph = sha256(body.user.phone.replace(/\D/g, ""));
  if (body.user?.first_name) user_data.fn = sha256(body.user.first_name);
  if (body.user?.last_name) user_data.ln = sha256(body.user.last_name);
  if (body.user?.city) user_data.ct = sha256(body.user.city);
  if (body.user?.state) user_data.st = sha256(body.user.state);
  if (ip) user_data.client_ip_address = ip;
  if (userAgent) user_data.client_user_agent = userAgent;
  if (fbp) user_data.fbp = fbp;
  if (fbc) user_data.fbc = fbc;

  const event = {
    event_name: body.event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: body.event_id || crypto.randomUUID(),
    event_source_url:
      body.event_source_url || req.headers.get("referer") || undefined,
    action_source: "website",
    user_data,
    custom_data: body.custom_data || {},
  };

  const payload: Record<string, unknown> = {
    data: [event],
    access_token: CAPI_TOKEN,
  };
  if (TEST_EVENT_CODE) payload.test_event_code = TEST_EVENT_CODE;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: "Meta CAPI error", details: data },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, event_id: event.event_id, fb: data });
  } catch (err) {
    return NextResponse.json(
      { error: "Network error", message: String(err) },
      { status: 502 },
    );
  }
}
