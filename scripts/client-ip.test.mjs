/**
 * Client-IP extractor test (src/lib/rate-limit.ts, no @/ imports).
 * Needs Node >= 22.6 type stripping; skips cleanly on older runtimes.
 * Run: node scripts/client-ip.test.mjs
 */
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";
import path from "node:path";

const [maj, min] = process.versions.node.split(".").map(Number);
if (maj < 22 || (maj === 22 && min < 6)) {
  console.log("client-ip.test: skipped (needs Node >= 22.6)");
  process.exit(0);
}
const mod = await import(
  pathToFileURL(path.resolve("src/lib/rate-limit.ts")).href
);
const { getClientIp, checkRateLimit, maskIp, UNKNOWN_IP } = mod;
const mk = (h) => new Request("https://x.test/", { headers: h });

// 1. Spoofed leftmost XFF must not change the key.
const real = "203.0.113.7";
const a = getClientIp(mk({ "x-forwarded-for": `${real}` }));
const b = getClientIp(mk({ "x-forwarded-for": `1.1.1.1, ${real}` }));
const c = getClientIp(mk({ "x-forwarded-for": `9.9.9.9, 8.8.8.8, ${real}` }));
assert.equal(a, real);
assert.equal(b, real);
assert.equal(c, real);

// 2. Garbage rightmost entry -> skip to the next valid one from the right.
assert.equal(getClientIp(mk({ "x-forwarded-for": `${real}, not-an-ip` })), real);
// 3. Ports / IPv6 / brackets.
assert.equal(getClientIp(mk({ "x-forwarded-for": "1.2.3.4:5555" })), "1.2.3.4");
assert.equal(getClientIp(mk({ "x-forwarded-for": "[2001:db8::1]:443" })), "2001:db8::1");
// 4. x-real-ip only used when XFF absent.
assert.equal(getClientIp(mk({ "x-real-ip": real })), real);
assert.equal(getClientIp(mk({ "x-forwarded-for": real, "x-real-ip": "6.6.6.6" })), real);
// 5. Nothing usable -> sentinel.
assert.equal(getClientIp(mk({})), UNKNOWN_IP);
assert.equal(getClientIp(mk({ "x-forwarded-for": "junk" })), UNKNOWN_IP);
// 6. CLIENT_IP_HEADER override wins, falls through if invalid/missing.
process.env.CLIENT_IP_HEADER = "x-edge-ip";
assert.equal(getClientIp(mk({ "x-edge-ip": "5.5.5.5", "x-forwarded-for": real })), "5.5.5.5");
assert.equal(getClientIp(mk({ "x-forwarded-for": real })), real);
delete process.env.CLIENT_IP_HEADER;
// 7. Masking.
assert.equal(maskIp("203.0.113.7"), "203.0.113.0/24");
assert.equal(maskIp("2001:db8:1:2::1"), "2001:db8:1::/48");

// 8. Rate limit: rotating a spoofed leftmost entry cannot bypass the quota.
const opts = { limit: 3, windowMs: 60_000, keyPrefix: "t1" };
const res = [];
for (let i = 0; i < 6; i++) {
  res.push(checkRateLimit(mk({ "x-forwarded-for": `10.0.0.${i}, ${real}` }), opts).allowed);
}
assert.deepEqual(res, [true, true, true, false, false, false]);

// 9. No IP: shared bucket is generous (20x), not blocked at the normal limit,
//    but still finite.
const o2 = { limit: 3, windowMs: 60_000, keyPrefix: "t2" };
let ok = 0;
for (let i = 0; i < 100; i++) if (checkRateLimit(mk({}), o2).allowed) ok++;
assert.equal(ok, 60);

console.log("client-ip.test: all assertions passed");
