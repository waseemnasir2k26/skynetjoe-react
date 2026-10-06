import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
const ROOT = process.env.REPO;
export async function resolve(spec, ctx, next) {
  let target = null;
  if (spec.startsWith("@/")) target = path.join(ROOT, "src", spec.slice(2));
  else if ((spec.startsWith("./") || spec.startsWith("../")) && ctx.parentURL?.startsWith("file:")) {
    target = path.resolve(path.dirname(new URL(ctx.parentURL).pathname.replace(/^\//, "")), spec);
  }
  if (target && !/\.(m?js|ts|tsx|json)$/.test(target)) {
    for (const ext of [".ts", ".tsx", "/index.ts"]) {
      if (fs.existsSync(target + ext)) return { url: pathToFileURL(target + ext).href, shortCircuit: true };
    }
  }
  return next(spec, ctx);
}
