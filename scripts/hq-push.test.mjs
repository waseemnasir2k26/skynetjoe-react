/**
 * HQ mirror contract test for every email-capture route.
 *
 * Loads the real route handlers (and the real src/lib/hq-subscriber.ts) through
 * Node's TS type stripping + scripts/hq-push-test/hooks.mjs (resolves "@/" and
 * stubs the CRM/email/sink modules). globalThis.fetch is replaced so the HQ
 * request is captured; nothing leaves the machine.
 *
 * Run: node scripts/hq-push.test.mjs      (needs Node >= 22.6)
 */
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import { createHmac } from "node:crypto";
import { register } from "node:module";
import path from "node:path";

const [maj, min] = process.versions.node.split(".").map(Number);
if (maj < 22 || (maj === 22 && min < 6)) {
  console.log("hq-push.test: skipped (needs Node >= 22.6)");
  process.exit(0);
}

register(pathToFileURL(path.resolve("scripts/hq-push-test/hooks.mjs")).href);

process.env.HQ_SUBSCRIBER_URL = "https://hq.test/api/subscribe";
process.env.HQ_SUBSCRIBER_SECRET = "s3cret";
process.env.GHL_API_TOKEN = "test-token"; // routes only read presence; ghl is stubbed
delete process.env.CALENDLY_WEBHOOK_SECRET;
globalThis.__stub = { ghlConfirm: true };

let hqCalls = [];
let hqMode = "ok"; // ok | 500 | throw
// HQ requires a non-empty slug source and an explicit boolean consent on EVERY push.
const violations = [];
let totalPushes = 0;
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, init) => {
  if (String(url).startsWith("https://hq.test")) {
    const sent = JSON.parse(init.body);
    hqCalls.push(sent);
    totalPushes++;
    if (typeof sent.source !== "string" || !/^[a-z0-9_-]{1,32}$/.test(sent.source)) violations.push(["source", sent]);
    if (typeof sent.consent !== "boolean") violations.push(["consent", sent]);
    if (!/^[a-z0-9-]{1,32}$/.test(sent.site)) violations.push(["site", sent]);
    if (sent.page != null && sent.page.length > 200) violations.push(["page", sent]);
    if (sent.first_name != null && sent.first_name.length > 80) violations.push(["first_name", sent]);
    if (hqMode === "throw") throw new Error("network down");
    return new Response("{}", { status: hqMode === "500" ? 500 : 201 });
  }
  return realFetch(url, init);
};
const origWarn = console.warn;
console.warn = () => {};

const load = (rel) => import(pathToFileURL(path.resolve("src/app/(skynet)/api", rel)).href);
const leadCapture = await load("lead-capture/route.ts");
const leads = await load("leads/route.ts");
const discovery = await load("discovery/route.ts");
const calendly = await load("webhooks/calendly/route.ts");
const feedback = await load("tool-feedback/route.ts");

let ip = 10;
const post = (url, body, headers = {}, raw) =>
  new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": `198.51.100.${ip++}`, ...headers },
    body: raw ?? JSON.stringify(body),
  });
const reset = () => {
  hqCalls = [];
  hqMode = "ok";
  globalThis.__stub.ghlConfirm = true;
};
let passed = 0;
const t = async (name, fn) => {
  reset();
  await fn();
  passed++;
  console.log("ok -", name);
};

// ---- /api/lead-capture
await t("lead-capture popup: consent true, popup source, existing fields", async () => {
  const res = await leadCapture.POST(
    post("https://x.test/api/lead-capture", {
      email: "a@b.co",
      source: "newsletter-skynetjoe",
      newsletter: { firstName: "Ann", interest: "automation", page: "/blog" },
    }),
  );
  assert.equal(res.status, 200);
  assert.deepEqual(hqCalls, [
    { email: "a@b.co", site: "skynetjoe", source: "popup", consent: true, first_name: "Ann", interest: "automation", page: "/blog" },
  ]);
});
await t("lead-capture LP form: lead only (consent false), slug + Referer path", async () => {
  const res = await leadCapture.POST(
    post("https://x.test/api/lead-capture", { email: "a@b.co", source: "lp-freight" }, { referer: "https://skynetjoe.com/lp/freight?utm=x" }),
  );
  assert.equal(res.status, 200);
  assert.equal(hqCalls.length, 1);
  assert.deepEqual(hqCalls[0], {
    email: "a@b.co", site: "skynetjoe", source: "lp-freight", first_name: null, page: "/lp/freight", consent: false,
  });
});
await t("lead-capture tool gate with opt-in ticked: consent true; colon and >32 chars sanitised", async () => {
  await leadCapture.POST(
    post("https://x.test/api/lead-capture", { email: "a@b.co", source: "Tool:" + "x".repeat(60), newsletterOptIn: true }),
  );
  assert.equal(hqCalls[0].consent, true);
  assert.match(hqCalls[0].source, /^[a-z0-9_-]{1,32}$/);
  assert.equal(hqCalls[0].page, null);
});
await t("lead-capture: newsletterOptIn must be strictly true", async () => {
  await leadCapture.POST(post("https://x.test/a", { email: "a@b.co", source: "lp-home-services", newsletterOptIn: "true" }));
  assert.equal(hqCalls[0].consent, false);
});
await t("lead-capture: honeypot and invalid email push nothing", async () => {
  await leadCapture.POST(post("https://x.test/a", { email: "a@b.co", source: "lp-freight", _honeypot: "bot" }));
  const r = await leadCapture.POST(post("https://x.test/a", { email: "nope", source: "lp-freight" }));
  assert.equal(r.status, 400);
  assert.equal(hqCalls.length, 0);
});
for (const mode of ["500", "throw"]) {
  await t(`lead-capture: HQ ${mode} never changes the response`, async () => {
    hqMode = mode;
    const res = await leadCapture.POST(post("https://x.test/a", { email: "a@b.co", source: "lp-freight" }));
    assert.equal(res.status, 200);
    assert.equal((await res.json()).ok, true);
  });
}
await t("lead-capture: HQ still gets the lead when the visitor sees a 502", async () => {
  globalThis.__stub.ghlConfirm = false;
  const res = await leadCapture.POST(post("https://x.test/a", { email: "a@b.co", source: "lp-freight" }));
  assert.equal(res.status, 502);
  assert.equal(hqCalls.length, 1);
});
await t("lead-capture: HQ env unset is a silent no-op", async () => {
  const u = process.env.HQ_SUBSCRIBER_URL;
  delete process.env.HQ_SUBSCRIBER_URL;
  const res = await leadCapture.POST(post("https://x.test/a", { email: "a@b.co", source: "lp-freight" }));
  process.env.HQ_SUBSCRIBER_URL = u;
  assert.equal(res.status, 200);
  assert.equal(hqCalls.length, 0);
});

// ---- /api/leads
await t("leads: top-level email, first name, consent mapping, site skynetjoe", async () => {
  const res = await leads.POST(
    post("https://x.test/api/leads", {
      source: "discovery-call", email: "q@b.co", firstName: "Quinn Smith", newsletterOptIn: true, qualification: {},
    }, { referer: "https://skynetjoe.com/lp/ai-audit?x=1" }),
  );
  assert.equal(res.status, 200);
  assert.deepEqual(hqCalls[0], {
    email: "q@b.co", site: "skynetjoe", source: "discovery-call", first_name: "Quinn", page: "/lp/ai-audit", consent: true,
  });
});
await t("leads: qualification.email / booking.inviteeEmail resolution", async () => {
  await leads.POST(post("https://x.test/a", { source: "stress-quiz", qualification: { email: "n@b.co", firstName: "Nia" } }));
  await leads.POST(post("https://x.test/a", { booking: { inviteeEmail: "bk@b.co", inviteeName: "Bo Kay" } }));
  assert.equal(hqCalls[0].email, "n@b.co");
  assert.equal(hqCalls[0].first_name, "Nia");
  assert.equal(hqCalls[0].consent, false);
  assert.equal(hqCalls[1].email, "bk@b.co");
  assert.equal(hqCalls[1].first_name, "Bo");
  assert.equal(hqCalls[1].source, "discovery-call");
});
await t("leads: lp-speed-to-lead goes to site skynetlabsai", async () => {
  await leads.POST(post("https://x.test/a", { source: "lp-speed-to-lead", email: "s@b.co", qualification: {} }));
  assert.equal(hqCalls[0].site, "skynetlabsai");
  assert.equal(hqCalls[0].source, "lp-speed-to-lead");
});
await t("leads: referral pushes only the submitting email, never the referred friend", async () => {
  await leads.POST(
    post("https://x.test/a", {
      source: "referral", email: "me@b.co",
      qualification: { customAnswers: { referred_email: "friend@b.co", referrer_email: "me@b.co" } },
    }),
  );
  assert.equal(hqCalls.length, 1);
  assert.equal(hqCalls[0].email, "me@b.co");
  assert.ok(!JSON.stringify(hqCalls).includes("friend@b.co"));
  reset();
  // Resolved address IS the friend: no push at all.
  await leads.POST(
    post("https://x.test/a", {
      source: "referral", qualification: { email: "friend@b.co", customAnswers: { referred_email: "friend@b.co" } },
    }),
  );
  assert.equal(hqCalls.length, 0);
});
for (const mode of ["500", "throw"]) {
  await t(`leads: HQ ${mode} never changes the response`, async () => {
    hqMode = mode;
    const res = await leads.POST(post("https://x.test/a", { email: "q@b.co", qualification: {} }));
    assert.equal(res.status, 200);
    assert.equal((await res.json()).ok, true);
  });
}
await t("leads: ReferralForm payload (referrer top-level email) is accepted and mirrors only the referrer", async () => {
  // Exact body shape ReferralForm.tsx sends.
  const res = await leads.POST(
    post("https://x.test/api/leads", {
      source: "referral",
      email: "referrer@b.co",
      _honeypot: "",
      qualification: {
        businessType: "referral",
        customAnswers: { referred_email: "friend@b.co", referrer_email: "referrer@b.co", referral_origin: "thank-you-page" },
      },
      submittedAt: new Date().toISOString(),
    }),
  );
  assert.equal(res.status, 200);
  assert.equal(hqCalls.length, 1);
  assert.deepEqual(hqCalls[0], {
    email: "referrer@b.co", site: "skynetjoe", source: "referral", first_name: null, page: null, consent: false,
  });
  assert.ok(!JSON.stringify(hqCalls).includes("friend@b.co"));
});
await t("leads: honeypot pushes nothing", async () => {
  await leads.POST(post("https://x.test/a", { email: "q@b.co", qualification: {}, _honeypot: "x" }));
  assert.equal(hqCalls.length, 0);
});

// ---- /api/discovery
await t("discovery: first word of name, source contact, newsletterOptIn (NOT consent) drives consent", async () => {
  const res = await discovery.POST(
    post("https://x.test/api/discovery", { name: "Dana Lee", email: "d@b.co", pain: "everything is broken", consent: true, source: "contact" }),
  );
  assert.notEqual(res.status, 400);
  assert.deepEqual(hqCalls[0], { email: "d@b.co", site: "skynetjoe", source: "contact", first_name: "Dana", consent: false });
  reset();
  await discovery.POST(
    post("https://x.test/a", { name: "Dana Lee", email: "d@b.co", pain: "everything is broken", consent: true, newsletterOptIn: true }),
  );
  assert.equal(hqCalls[0].consent, true);
});
await t("discovery: invalid payload pushes nothing; HQ failure keeps status", async () => {
  const bad = await discovery.POST(post("https://x.test/a", { name: "D", email: "bad", pain: "x" }));
  assert.equal(bad.status, 400);
  assert.equal(hqCalls.length, 0);
  const base = await discovery.POST(post("https://x.test/a", { name: "D L", email: "d@b.co", pain: "long enough pain" }));
  reset();
  hqMode = "throw";
  const res = await discovery.POST(post("https://x.test/a", { name: "D L", email: "d@b.co", pain: "long enough pain" }));
  assert.equal(res.status, base.status);
});

// ---- /api/webhooks/calendly
const created = {
  event: "invitee.created",
  payload: { invitee: { name: "Cal Endly", first_name: "Cal", email: "cal@b.co" } },
};
await t("calendly: invitee.created pushes lead-only record", async () => {
  const res = await calendly.POST(post("https://x.test/a", created));
  assert.equal(res.status, 200);
  assert.deepEqual(hqCalls[0], { email: "cal@b.co", site: "skynetjoe", source: "calendly-booking", first_name: "Cal", consent: false });
});
await t("calendly: canceled / bad signature push nothing; good signature pushes", async () => {
  await calendly.POST(post("https://x.test/a", { ...created, event: "invitee.canceled" }));
  assert.equal(hqCalls.length, 0);
  process.env.CALENDLY_WEBHOOK_SECRET = "whsec";
  const raw = JSON.stringify(created);
  const bad = await calendly.POST(post("https://x.test/a", null, { "calendly-webhook-signature": "t=1,v1=00" }, raw));
  assert.equal(bad.status, 401);
  assert.equal(hqCalls.length, 0);
  const tsec = Math.floor(Date.now() / 1000);
  const sig = createHmac("sha256", "whsec").update(`${tsec}.${raw}`).digest("hex");
  const ok = await calendly.POST(post("https://x.test/a", null, { "calendly-webhook-signature": `t=${tsec},v1=${sig}` }, raw));
  delete process.env.CALENDLY_WEBHOOK_SECRET;
  assert.equal(ok.status, 200);
  assert.equal(hqCalls.length, 1);
});
await t("calendly: HQ throw never changes the response", async () => {
  hqMode = "throw";
  const res = await calendly.POST(post("https://x.test/a", created));
  assert.equal(res.status, 200);
});

// ---- /api/tool-feedback
await t("tool-feedback: email present -> lead-only push; absent -> none", async () => {
  const res = await feedback.POST(post("https://x.test/a", { tool: "aeo-audit", message: "works great", email: "f@b.co" }));
  assert.equal(res.status, 200);
  assert.deepEqual(hqCalls[0], { email: "f@b.co", site: "skynetjoe", source: "tool-feedback", consent: false });
  reset();
  await feedback.POST(post("https://x.test/a", { tool: "aeo-audit", message: "works great" }));
  assert.equal(hqCalls.length, 0);
});
await t("tool-feedback: HQ throw never changes the response", async () => {
  hqMode = "throw";
  const res = await feedback.POST(post("https://x.test/a", { tool: "aeo-audit", message: "works great", email: "f@b.co" }));
  assert.equal(res.status, 200);
});

console.warn = origWarn;
assert.ok(totalPushes >= 20, `expected many HQ pushes, saw ${totalPushes}`);
assert.deepEqual(violations, [], "every HQ push needs a slug source + boolean consent");
console.log(`hq-push: ${totalPushes} pushes all carried a slug source + boolean consent`);
console.log(`hq-push.test: ${passed} tests passed`);
process.exit(0);
