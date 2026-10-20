// Node module-resolution hooks for hq-push.test.mjs: resolve "@/..." to src/,
// swap the CRM/email/sink side-effect modules for in-memory stubs, and let
// "next/server" resolve without a file extension.
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const root = process.cwd();
const stubsUrl = pathToFileURL(path.join(root, "scripts", "hq-push-test", "stubs.mjs")).href;
const STUBBED = new Set([
  "@/lib/ghl",
  "@/lib/lead-notify",
  "@/lib/jev-triage",
  "@/lib/lead-sink",
  "@/lib/ma-lead-ping",
  "@/lib/meta-capi",
  "@/data/tools-registry",
]);

export async function resolve(specifier, context, nextResolve) {
  if (specifier === "next/server") return nextResolve("next/server.js", context);
  if (STUBBED.has(specifier)) return { url: stubsUrl, shortCircuit: true };
  if (specifier.startsWith("@/")) {
    const base = path.join(root, "src", specifier.slice(2));
    for (const cand of [base + ".ts", path.join(base, "index.ts")]) {
      if (fs.existsSync(cand)) return { url: pathToFileURL(cand).href, shortCircuit: true };
    }
  }
  return nextResolve(specifier, context);
}
