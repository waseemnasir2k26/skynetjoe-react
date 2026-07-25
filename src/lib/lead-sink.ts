import fs from "node:fs/promises";
import path from "node:path";

/**
 * Last-resort durable lead sink: append-only JSONL on disk.
 *
 * WHY THIS EXISTS. The lead routes were changed to stop reporting success over
 * a discarded submission. That was right, but it left a worse failure mode in
 * production: with GHL_API_TOKEN and RESEND_API_KEY both unset — which is the
 * current state of this deployment — every form would answer 502 and prospects
 * would see the form visibly fail. "Honest error" is better than "silent loss",
 * but "the lead is actually captured" is better than both.
 *
 * skynetjoe runs as a Next standalone app on Hostinger, which has a real
 * persistent filesystem — the view counter at api/views/[slug] already relies on
 * it. So a file append is a genuine save here, not a pretend one. Same dataDir
 * strategy as that route, including the /tmp escape hatch if this is ever run on
 * Vercel (where /tmp is ephemeral and this sink would NOT be durable — see the
 * `durable` flag).
 *
 * ORDER OF PREFERENCE in the routes: GHL write → Resend email → this sink →
 * 502. Only a confirmed write, a sent email, or a durable append is allowed to
 * return success.
 *
 * Read the captured leads with:
 *   cat .data/leads.jsonl
 */

export type SinkLead = {
  email: string;
  source: string;
  capturedAt: string;
  reason: string;
  payload?: unknown;
};

function dataDir(): string {
  if (process.env.LEAD_DATA_DIR) return process.env.LEAD_DATA_DIR;
  // On Vercel the filesystem is ephemeral, so this is a trace, not a save.
  if (process.env.VERCEL) return "/tmp";
  return path.join(process.cwd(), ".data");
}

/** True when the sink directory actually survives a restart on this host. */
export function sinkIsDurable(): boolean {
  return !process.env.VERCEL;
}

/**
 * Append one lead. Never throws — a failing sink must not turn into a 500 on
 * top of an already-degraded path.
 *
 * @returns `written` = the append succeeded. `durable` = it will survive a
 *          restart on this host. A caller should only treat the lead as saved
 *          when BOTH are true.
 */
export async function appendLeadToSink(
  lead: SinkLead,
): Promise<{ written: boolean; durable: boolean; file?: string }> {
  const dir = dataDir();
  const file = path.join(dir, "leads.jsonl");
  const durable = sinkIsDurable();
  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(
      file,
      JSON.stringify({ ...lead, sinkWrittenAt: new Date().toISOString() }) +
        "\n",
      "utf8",
    );
    return { written: true, durable, file };
  } catch (err) {
    console.error("[lead-sink] append failed — lead not persisted", {
      file,
      email: lead.email,
      source: lead.source,
      err: err instanceof Error ? err.message : String(err),
    });
    return { written: false, durable };
  }
}
