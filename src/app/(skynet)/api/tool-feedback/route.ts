import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { upsertGhlContact } from "@/lib/ghl";
import { pushToHqCapped } from "@/lib/hq-subscriber";
import { checkRateLimit } from "@/lib/rate-limit";
import { TOOL_SLUGS } from "@/data/tools-registry";

export const runtime = "nodejs";

// ============================================================
// /api/tool-feedback — drop-box for tool-page feedback forms
//
// POST shape (JSON):  { tool, message, email? }
// POST shape (form):  application/x-www-form-urlencoded same keys
//
// Behavior:
//   - Server-side validates tool + message (message >= 4 chars, <= 4000)
//   - If SLACK_FEEDBACK_WEBHOOK env is set → forwards to Slack
//     (block kit + plain text fallback)
//   - Else → appends a JSON line to /tmp/tool-feedback.log (best-effort).
//     Vercel filesystem is read-only outside /tmp, so writes are explicitly
//     pointed at /tmp and failures are swallowed (Slack is the real sink).
//   - If an email is present → also fire-and-forget a GHL contact upsert
//     (source "tool-feedback") so replies land in the CRM. Errors swallowed.
//   - Returns 200 JSON { ok: true } for JSON callers.
//   - For form-encoded callers (no-JS degradation) returns a 303 redirect
//     to /tools?feedback=sent so the browser shows a thank-you screen.
// ============================================================

type Payload = {
  tool?: unknown;
  message?: unknown;
  email?: unknown;
};

const MAX_MESSAGE_LEN = 4000;
const MIN_MESSAGE_LEN = 4;
const TOOL_SLUG_RE = /^[a-z0-9][a-z0-9-]{1,64}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isStr(v: unknown): v is string {
  return typeof v === "string";
}

function sanitize(s: string, max: number): string {
  return s.trim().slice(0, max);
}

async function parseBody(req: Request): Promise<{
  data: { tool?: string; message?: string; email?: string };
  isForm: boolean;
}> {
  const ct = (req.headers.get("content-type") || "").toLowerCase();

  if (ct.includes("application/json")) {
    try {
      const json = (await req.json()) as Payload;
      return {
        data: {
          tool: isStr(json.tool) ? json.tool : undefined,
          message: isStr(json.message) ? json.message : undefined,
          email: isStr(json.email) ? json.email : undefined,
        },
        isForm: false,
      };
    } catch {
      return { data: {}, isForm: false };
    }
  }

  if (
    ct.includes("application/x-www-form-urlencoded") ||
    ct.includes("multipart/form-data")
  ) {
    try {
      const form = await req.formData();
      return {
        data: {
          tool: isStr(form.get("tool"))
            ? (form.get("tool") as string)
            : undefined,
          message: isStr(form.get("message"))
            ? (form.get("message") as string)
            : undefined,
          email: isStr(form.get("email"))
            ? (form.get("email") as string)
            : undefined,
        },
        isForm: true,
      };
    } catch {
      return { data: {}, isForm: true };
    }
  }

  // best-effort — try JSON anyway
  try {
    const json = (await req.json()) as Payload;
    return {
      data: {
        tool: isStr(json.tool) ? json.tool : undefined,
        message: isStr(json.message) ? json.message : undefined,
        email: isStr(json.email) ? json.email : undefined,
      },
      isForm: false,
    };
  } catch {
    return { data: {}, isForm: false };
  }
}

async function forwardSlack(args: {
  tool: string;
  message: string;
  email?: string;
}): Promise<boolean> {
  const url = process.env.SLACK_FEEDBACK_WEBHOOK;
  if (!url) return false;
  // Escape Slack mrkdwn control chars so user text can't inject
  // <!channel>/<!here> pings or disguised <url|label> links.
  const esc = (x: string) =>
    x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const text =
    `*Tool feedback — ${esc(args.tool)}*\n` +
    `${esc(args.message)}\n` +
    (args.email ? `_from: ${esc(args.email)}_` : "_no email — anonymous_");
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function appendLog(args: {
  tool: string;
  message: string;
  email?: string;
}): Promise<void> {
  // Vercel: /tmp is writable, ephemeral. Local dev: also writable.
  // We swallow all errors — Slack is the real durable sink.
  try {
    const dir = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), ".data");
    await fs.mkdir(dir, { recursive: true });
    const line =
      JSON.stringify({
        ts: new Date().toISOString(),
        tool: args.tool,
        message: args.message,
        email: args.email ?? null,
      }) + "\n";
    await fs.appendFile(path.join(dir, "tool-feedback.log"), line, "utf8");
  } catch {
    // swallow
  }
}

const MAX_BODY_BYTES = 16 * 1024;

export async function POST(req: Request) {
  // Abuse guards: this route posts to Slack, appends to a log file and can
  // create GHL contacts, so cap request size and per-IP rate.
  const declaredLen = Number(req.headers.get("content-length") || 0);
  if (declaredLen > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "payload too large" },
      { status: 413 },
    );
  }
  if (
    !checkRateLimit(req, {
      limit: 5,
      windowMs: 60_000,
      keyPrefix: "tool-feedback",
    }).allowed
  ) {
    return NextResponse.json(
      { ok: false, error: "too many requests" },
      { status: 429 },
    );
  }

  const { data, isForm } = await parseBody(req);

  const tool = data.tool ? sanitize(data.tool, 80) : "";
  const message = data.message ? sanitize(data.message, MAX_MESSAGE_LEN) : "";
  const emailRaw = data.email ? sanitize(data.email, 200) : "";
  const email = emailRaw && EMAIL_RE.test(emailRaw) ? emailRaw : undefined;

  if (!tool || !TOOL_SLUG_RE.test(tool)) {
    if (isForm) {
      return NextResponse.redirect(
        new URL("/tools?feedback=invalid", req.url),
        303,
      );
    }
    return NextResponse.json(
      { ok: false, error: "tool is required and must be a valid slug" },
      { status: 400 },
    );
  }

  if (!message || message.length < MIN_MESSAGE_LEN) {
    if (isForm) {
      return NextResponse.redirect(
        new URL("/tools?feedback=invalid", req.url),
        303,
      );
    }
    return NextResponse.json(
      { ok: false, error: "message is required (min 4 chars)" },
      { status: 400 },
    );
  }

  try {
    // HQ lead record (consent false) starts first and is awaited last, so it
    // overlaps the Slack/log work and adds no latency. Never throws; 4s cap
    // inside pushSubscriberToHq.
    const hqPush = email
      ? pushToHqCapped(
          {
            email,
            site: "skynetjoe",
            source: "tool-feedback",
            consent: false,
          },
          "tool-feedback",
        )
      : Promise.resolve(false);

    const slackOk = await forwardSlack({ tool, message, email });
    // Always also append to log as belt-and-suspenders
    await appendLog({ tool, message, email });

    // Email present → fire-and-forget GHL upsert so replies land in the CRM.
    // upsertGhlContact never throws (dev-skips on missing env / API failure);
    // the extra catch is belt-and-suspenders so feedback never 500s on GHL.
    if (email) {
      // Only known tool slugs become GHL tags (tags can trigger workflows).
      const tags = TOOL_SLUGS.includes(tool)
        ? [tool, "tool-feedback"]
        : ["tool-feedback"];
      void upsertGhlContact(
        { email, source: "tool-feedback" },
        null,
        tags,
      ).catch(() => {
        // swallow — Slack/log already have the feedback
      });
    }
    await hqPush;

    if (isForm) {
      return NextResponse.redirect(
        new URL("/tools?feedback=sent", req.url),
        303,
      );
    }

    return NextResponse.json({ ok: true, slack: slackOk });
  } catch {
    if (isForm) {
      return NextResponse.redirect(
        new URL("/tools?feedback=error", req.url),
        303,
      );
    }
    return NextResponse.json(
      { ok: false, error: "internal error" },
      { status: 500 },
    );
  }
}
