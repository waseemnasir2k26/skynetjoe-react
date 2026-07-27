/**
 * PROOF_MODE — single switch for every social-proof visitor/view counter on
 * the site: the sitewide `LiveVisitors` pill and the per-article "reads"
 * counter behind `/api/views/[slug]`.
 *
 * Change the ONE constant below to flip every counter on the site at once.
 * Waseem's options, verbatim from the 2026-07-27 review:
 *   "false visitors are fine... i think 18, or reduce to 7, or each day add
 *   random 5-30." — undecided. Ship 'off' by default; do not pick for him.
 *
 *   'off'    — DEFAULT. Counters render nothing. No presence heartbeat, no
 *              view-count fetch. Zero manufactured numbers ship.
 *   'real'   — Counters show only the true measured count. No floor, no
 *              seed. Hidden below a small honesty threshold (a lonely "1"
 *              or "0" reads worse than no counter).
 *   'seeded' — Counters show a number derived ONLY from today's calendar
 *              date (+ a per-item key, e.g. article slug), range 5-30.
 *              Identical value all day and on every reload/refresh — it
 *              never jumps, which is the tell that separates an honest
 *              "today" figure from a fake "live" one. Any UI running in
 *              this mode MUST NOT use the word "live" anywhere in its
 *              label.
 */

export type ProofMode = "off" | "real" | "seeded";

export const PROOF_MODE: ProofMode = "off";

const SEEDED_MIN = 5;
const SEEDED_MAX = 30;

/**
 * Deterministic 5-30 value derived only from the calendar date (UTC) and an
 * optional per-item key (e.g. an article slug). Same input date+key always
 * produces the same number — no randomness, no drift on refresh.
 */
export function seededProofValue(key = ""): number {
  const day = new Date().toISOString().slice(0, 10); // YYYY-MM-DD, UTC
  const str = `${day}:${key}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  const range = SEEDED_MAX - SEEDED_MIN + 1;
  return SEEDED_MIN + (Math.abs(hash) % range);
}
