/**
 * hq-subscriber — mirror a newsletter sign-up into HQ (hq.skynetjoe.com).
 *
 * Awaited (4s cap) by the lead routes: HQ being down must never fail the
 * visitor's subscribe. Returns true only when HQ confirmed a row (201/200),
 * so the caller can log the miss. Needs HQ_SUBSCRIBER_URL + HQ_SUBSCRIBER_SECRET;
 * with either unset it is a silent no-op that returns false.
 */

export type HqSubscriber = {
  email: string;
  site: string; // "skynetjoe" | "waseemnasir"
  source?: string; // "popup" (default)
  first_name?: string | null;
  interest?: string | null;
  page?: string | null;
};

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
