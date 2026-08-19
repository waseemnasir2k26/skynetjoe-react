import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ============================================================
// GET /api/psi?url=<target>&strategy=mobile|desktop — thin server-side
// wrapper around Google's PageSpeed Insights (PSI) v5 API, built so the
// optional PSI_API_KEY (higher quota) never ships to the browser.
//
// PSI v5 works keyless too (Google's shared, low, IP-based quota) — if
// PSI_API_KEY is unset we still call the API without a key and pass
// through Google's own quota error if/when it 429s, rather than faking a
// result. Real Google field/lab data only — no invented numbers.
// ============================================================

const PSI_ENDPOINT =
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const ALLOWED_STRATEGIES = new Set(["mobile", "desktop"]);

export async function GET(req: Request) {
  const rl = checkRateLimit(req, {
    limit: 10,
    windowMs: 60_000,
    keyPrefix: "psi",
  });
  if (!rl.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Try again in a minute." },
      { status: 429 },
    );
  }

  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url")?.trim();
  const strategy = searchParams.get("strategy")?.trim() || "mobile";

  if (!targetUrl) {
    return NextResponse.json(
      { ok: false, error: "url is required." },
      { status: 400 },
    );
  }
  if (!ALLOWED_STRATEGIES.has(strategy)) {
    return NextResponse.json(
      { ok: false, error: "strategy must be mobile or desktop." },
      { status: 400 },
    );
  }
  try {
    const parsed = new URL(targetUrl);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return NextResponse.json(
        { ok: false, error: "Only http(s) URLs allowed." },
        { status: 400 },
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "Not a valid URL." },
      { status: 400 },
    );
  }

  const apiUrl = new URL(PSI_ENDPOINT);
  apiUrl.searchParams.set("url", targetUrl);
  apiUrl.searchParams.set("strategy", strategy);
  apiUrl.searchParams.append("category", "performance");
  const key = process.env.PSI_API_KEY;
  if (key) apiUrl.searchParams.set("key", key);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25_000); // PSI can be slow

  try {
    const res = await fetch(apiUrl.toString(), { signal: controller.signal });
    clearTimeout(timer);
    const json = await res.json().catch(() => null);

    if (!res.ok || !json) {
      const quotaExceeded = res.status === 429;
      return NextResponse.json(
        {
          ok: false,
          error: quotaExceeded
            ? "Google's PageSpeed Insights quota was hit for this request. Try again in a bit, or set PSI_API_KEY for a higher quota."
            : json?.error?.message ||
              `PageSpeed Insights returned ${res.status}.`,
        },
        { status: res.status || 502 },
      );
    }

    return NextResponse.json({ ok: true, data: json });
  } catch (err) {
    clearTimeout(timer);
    const aborted = err instanceof Error && err.name === "AbortError";
    return NextResponse.json(
      {
        ok: false,
        error: aborted
          ? "PageSpeed Insights timed out."
          : "Could not reach PageSpeed Insights.",
      },
      { status: 502 },
    );
  }
}
