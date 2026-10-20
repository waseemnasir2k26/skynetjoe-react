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
