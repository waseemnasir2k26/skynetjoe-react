/**
 * hq-subscriber — mirror an email capture into HQ (hq.skynetjoe.com): the
 * newsletter popup (consent true) and every other form (lead only unless the
 * visitor ticked the opt-in box).
 *
 * Awaited (4s cap) by the lead routes: HQ being down must never fail the
 * visitor's submission. Returns true only when HQ confirmed a row (201/200),
 * so the caller can log the miss. Needs HQ_SUBSCRIBER_URL + HQ_SUBSCRIBER_SECRET;
 * with either unset it is a silent no-op that returns false.
 */

export type HqSubscriber = {
  email: string;
  site: string; // "skynetjoe" | "waseemnasir"
  source?: string; // "popup", "contact", "lp-freight", ... (HQ is making it required)
  first_name?: string | null;
  interest?: string | null;
  page?: string | null;
  /**
   * true = newsletter list + welcome email (popup, or a ticked opt-in box).
   * false/omitted = HQ stores the address as a lead only and never marketing-mails it.
   */
  consent?: boolean;
};

/** HQ validates source as ^[a-z0-9_-]{1,32}$ — clamp any free-form slug to that. */
export function hqSourceSlug(raw: string, fallback = "unknown"): string {
  const s = raw.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 32);
  return s.replace(/-+$/g, "") || fallback;
}

/** First word of a human name, stripped of control chars/angle brackets, max 80 (HQ limit). */
export function hqFirstName(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const cleaned = raw.replace(/[\x00-\x1f\x7f<>]/g, "").trim().split(/\s+/)[0] ?? "";
  return cleaned.slice(0, 80) || null;
}

// Site-wide, in-process caps on what we mirror to HQ (per minute). Two buckets so
// lead-only traffic can never consume the opt-in (email-list) budget: consent
// true pushes draw from the opt-in bucket, everything else from the lead bucket.
const PER_MIN = 120;
function makeBucket(limit: number) {
  let start = 0;
  let count = 0;
  return () => {
    const now = Date.now();
    if (now - start > 60_000) {
      start = now;
      count = 0;
    }
    count += 1;
    return count <= limit;
  };
}
export const hqOptInAllowed = makeBucket(PER_MIN);
export const hqLeadAllowed = makeBucket(PER_MIN);

/**
 * Cap-aware, never-throwing push used by every route. Returns true only when
 * HQ confirmed the row; false covers cap hit, HQ down, or env unset.
 */
export async function pushToHqCapped(s: HqSubscriber, tag: string): Promise<boolean> {
  const allowed = s.consent === true ? hqOptInAllowed() : hqLeadAllowed();
  if (!allowed) {
    console.warn(`[${tag}] HQ mirror site-wide cap hit; skipped`, { source: s.source });
    return false;
  }
  try {
    return await pushSubscriberToHq(s);
  } catch (err) {
    console.warn(`[${tag}] HQ mirror threw`, err);
    return false;
  }
}

export async function pushSubscriberToHq(s: HqSubscriber): Promise<boolean> {
  const url = process.env.HQ_SUBSCRIBER_URL?.trim();
  const secret = process.env.HQ_SUBSCRIBER_SECRET?.trim();
  if (!url || !secret) return false;
  if (!/^https:\/\//.test(url)) return false;
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hq-ingest-secret": secret,
      },
      body: JSON.stringify(s),
      signal: ctrl.signal,
      cache: "no-store",
      // Never re-send the secret header to a redirect target.
      redirect: "error",
    });
    clearTimeout(t);
    if (!res.ok) {
      console.warn(`[hq-subscriber] HQ answered ${res.status}`);
      return false;
    }
    return true;
  } catch (e) {
    console.warn("[hq-subscriber] push failed", e);
    return false;
  }
}
