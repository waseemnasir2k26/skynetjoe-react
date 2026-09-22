/**
 * JEV shadow-triage contract test.
 *
 * Runs src/lib/jev-triage.ts directly through Node's built-in TypeScript type
 * stripping (Node >= 22.6; this repo requires >= 20.9, so the script skips
 * itself with a clear message on an older runtime rather than failing the
 * suite for the wrong reason). The module has no imports and no `@/` aliases
 * precisely so it can be exercised without a bundler.
 *
 * What it proves:
 *   1. NO-OP: with JEV_TRIAGE_WEBHOOK unset, postTriageShadow performs ZERO
 *      fetch calls and returns synchronously. This is the production path
 *      today, so it is the one that must be proven.
 *   2. It never throws, even when the webhook is set to a URL that refuses.
 *   3. The outbound body contains no email and no phone, and unknown fields
 *      cannot leak in.
 *   4. The secret header is omitted (not sent empty) when JEV_TRIAGE_SECRET
 *      is unset, and present when it is set.
 *   5. A non-https JEV_TRIAGE_WEBHOOK is refused (no fetch at all).
 *   6. Contact data a human typed into the free-text message — an email
 *      address, a phone number — is scrubbed out before the body is built.
 *
 * Run: node scripts/jev-triage.test.mjs
 */
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import path from "node:path";

const [maj, min] = process.versions.node.split(".").map(Number);
if (maj < 22 || (maj === 22 && min < 6)) {
  console.log(
    `SKIP jev-triage.test.mjs — needs Node >= 22.6 for TS type stripping (running ${process.versions.node})`,
  );
  process.exit(0);
}

const modUrl = pathToFileURL(
  path.join(process.cwd(), "src", "lib", "jev-triage.ts"),
).href;

// ---- harness -------------------------------------------------------------
let fetchCalls = [];
const realFetch = globalThis.fetch;
const stubFetch = async (url, init) => {
  fetchCalls.push({ url, init });
  return new Response("{}", { status: 200 });
};
globalThis.fetch = stubFetch;

const flush = () => new Promise((r) => setTimeout(r, 50));
let failures = 0;
async function test(name, fn) {
  fetchCalls = [];
  // Re-arm the recording stub: the "rejecting fetch" case swaps in its own
  // implementation and hands back the REAL fetch, which would silently make
  // every later case hit the network and record nothing.
  globalThis.fetch = stubFetch;
  try {
    await fn();
    console.log(`  PASS  ${name}`);
  } catch (err) {
    failures += 1;
    console.error(`  FAIL  ${name}\n        ${err.message}`);
  }
}

const { postTriageShadow, buildTriageBody, triageIsConfigured, scrubContacts } =
  await import(modUrl);

const SAMPLE = {
  leadId: "lead_abc123",
  source: "discovery-call",
  ts: "2026-09-23T00:00:00.000Z",
  name: "Test Prospect",
  company: "Test Freight Ltd",
  message: "Dispatch email triage is eating our day",
  page: "/contact",
};

console.log("jev-triage contract");

await test("unset JEV_TRIAGE_WEBHOOK => zero fetch calls (no-op)", async () => {
  delete process.env.JEV_TRIAGE_WEBHOOK;
  delete process.env.JEV_TRIAGE_SECRET;
  assert.equal(triageIsConfigured(), false);
  assert.equal(postTriageShadow(SAMPLE), undefined);
  await flush();
  assert.equal(
    fetchCalls.length,
    0,
    `expected 0 fetch calls, got ${fetchCalls.length}`,
  );
});

await test("blank JEV_TRIAGE_WEBHOOK => still a no-op", async () => {
  process.env.JEV_TRIAGE_WEBHOOK = "   ";
  postTriageShadow(SAMPLE);
  await flush();
  assert.equal(fetchCalls.length, 0);
  delete process.env.JEV_TRIAGE_WEBHOOK;
});

await test("configured => one POST, no email, no phone in body", async () => {
  process.env.JEV_TRIAGE_WEBHOOK = "https://triage.invalid/hook";
  postTriageShadow({
    ...SAMPLE,
    // Fields that must NOT survive into the webhook body.
    email: "prospect@example.com",
    phone: "+6281300000000",
  });
  await flush();
  assert.equal(fetchCalls.length, 1);
  const body = JSON.parse(fetchCalls[0].init.body);
  assert.deepEqual(Object.keys(body).sort(), [
    "company",
    "lead_id",
    "message",
    "name",
    "page",
    "source",
    "ts",
  ]);
  const raw = fetchCalls[0].init.body;
  assert.ok(!/prospect@example\.com/.test(raw), "email leaked into body");
  assert.ok(!/6281300000000/.test(raw), "phone leaked into body");
  assert.equal(body.lead_id, "lead_abc123");
  delete process.env.JEV_TRIAGE_WEBHOOK;
});

await test("no secret => x-triage-secret header omitted entirely", async () => {
  process.env.JEV_TRIAGE_WEBHOOK = "https://triage.invalid/hook";
  delete process.env.JEV_TRIAGE_SECRET;
  postTriageShadow(SAMPLE);
  await flush();
  const headers = fetchCalls[0].init.headers;
  assert.ok(
    !("x-triage-secret" in headers),
    "empty secret header must not be sent",
  );
  process.env.JEV_TRIAGE_SECRET = "s3cr3t";
  postTriageShadow(SAMPLE);
  await flush();
  assert.equal(fetchCalls[1].init.headers["x-triage-secret"], "s3cr3t");
  delete process.env.JEV_TRIAGE_WEBHOOK;
  delete process.env.JEV_TRIAGE_SECRET;
});

await test("a throwing/rejecting fetch never escapes", async () => {
  process.env.JEV_TRIAGE_WEBHOOK = "https://triage.invalid/hook";
  globalThis.fetch = async () => {
    throw new Error("ECONNREFUSED (simulated)");
  };
  // If this rejected unhandled, the process would exit non-zero.
  assert.equal(postTriageShadow(SAMPLE), undefined);
  await flush();
  globalThis.fetch = realFetch;
  delete process.env.JEV_TRIAGE_WEBHOOK;
});

await test("non-https JEV_TRIAGE_WEBHOOK => refused, zero fetch calls", async () => {
  for (const bad of [
    "http://triage.invalid/hook",
    "triage.invalid/hook",
    "ftp://triage.invalid/hook",
    "HTTPS://triage.invalid/hook", // scheme is case-insensitive in URLs, but
    // an env value that isn't literally https:// is a typo we refuse loudly
    // rather than guess at.
  ]) {
    process.env.JEV_TRIAGE_WEBHOOK = bad;
    assert.equal(triageIsConfigured(), false, `${bad} must not be configured`);
    postTriageShadow(SAMPLE);
  }
  await flush();
  assert.equal(
    fetchCalls.length,
    0,
    `expected 0 fetch calls for non-https endpoints, got ${fetchCalls.length}`,
  );
  process.env.JEV_TRIAGE_WEBHOOK = "https://triage.invalid/hook";
  assert.equal(triageIsConfigured(), true, "https endpoint must be accepted");
  delete process.env.JEV_TRIAGE_WEBHOOK;
});

await test("free-text message is scrubbed of email + phone", async () => {
  // Unit level: the scrub itself.
  assert.equal(
    scrubContacts("mail me at Bob.Smith+jobs@example.co.uk please"),
    "mail me at [email] please",
  );
  assert.equal(
    scrubContacts("call +62 813-0000-0000 after 6"),
    "call [phone] after 6",
  );
  assert.equal(scrubContacts("ring 5551234 now"), "ring [phone] now");
  // Short digit runs and money must survive — a triage model needs budget.
  assert.equal(
    scrubContacts("budget is 1497 for Q3 2026"),
    "budget is 1497 for Q3 2026",
  );

  // Body level: it is the built payload that goes on the wire.
  const body = buildTriageBody({
    source: "contact-form",
    message:
      "Hi, I'm Dana - reach me on dana@acme-freight.com or +1 (415) 555-0134, thanks",
  });
  assert.ok(!/dana@acme-freight\.com/.test(body.message), "email survived");
  assert.ok(!/555-?0134/.test(body.message), "phone survived");
  assert.ok(body.message.includes("[email]"), "email placeholder missing");
  assert.ok(body.message.includes("[phone]"), "phone placeholder missing");

  // Wire level: nothing re-introduces it downstream of buildTriageBody.
  process.env.JEV_TRIAGE_WEBHOOK = "https://triage.invalid/hook";
  postTriageShadow({
    ...SAMPLE,
    message: "email me: prospect@example.com / tel 0812 3456 7890",
  });
  await flush();
  const raw = fetchCalls.at(-1).init.body;
  assert.ok(!/prospect@example\.com/.test(raw), "email leaked on the wire");
  assert.ok(!/3456/.test(raw), "phone leaked on the wire");
  delete process.env.JEV_TRIAGE_WEBHOOK;
});

await test("missing leadId => a uuid is minted, nothing is empty", async () => {
  const body = buildTriageBody({ source: "exit-intent" });
  assert.match(
    body.lead_id,
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
  );
  assert.equal(body.name, undefined);
  assert.equal(body.company, undefined);
});

globalThis.fetch = realFetch;
if (failures) {
  console.error(`\njev-triage: ${failures} failing assertion(s)`);
  process.exit(1);
}
console.log("jev-triage: all checks passed");
