import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

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
          tool: isStr(form.get("tool")) ? (form.get("tool") as string) : undefined,
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
  const text =
    `*Tool feedback — ${args.tool}*\n` +
    `${args.message}\n` +
    (args.email ? `_from: ${args.email}_` : "_no email — anonymous_");
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

export async function POST(req: Request) {
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
    const slackOk = await forwardSlack({ tool, message, email });
    // Always also append to log as belt-and-suspenders
    await appendLog({ tool, message, email });

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
