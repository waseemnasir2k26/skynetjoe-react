/**
 * Download + process portfolio card hero images from Pexels stock photos.
 * Reads scripts/portfolio-images-manifest.json, downloads each URL,
 * processes with sharp (cream-editorial filter, 1280x800 cover crop —
 * matches /portfolio card aspect 16:10 — JPEG q82, EXIF stripped) and
 * writes to public/portfolio/<slug>.jpg.
 *
 * This REPLACES live-screenshot duplicates / placeholder cards where the
 * deployed Vercel demo was using the same generic chef-puppet stock photo
 * across many niches (Riverside Internal Med, Sterling CPA, Wrench Auto,
 * Boutique Strength gym, Verdant Acre landscape, Pacific Lane logistics,
 * Sentinel Pest, Cardinal Plumbing, Summit Roofing — all identical hero).
 *
 * Run: node scripts/download-portfolio-images.mjs
 * Re-run safe: overwrites existing files for the slugs in the manifest only.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MANIFEST = path.join(__dirname, "portfolio-images-manifest.json");
const OUT_DIR = path.join(ROOT, "public", "portfolio");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

async function downloadBuffer(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      Accept: "image/avif,image/webp,image/jpeg,image/*,*/*;q=0.8",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return Buffer.from(await res.arrayBuffer());
}

async function processImage(srcBuf, outPath) {
  // Cream-editorial filter (matches news pipeline):
  //   - resize to 1280x800 (16:10 — portfolio card aspect)
  //   - fit cover w/ attention-aware crop
  //   - drop saturation a touch (0.95)
  //   - warm tint toward cream (R245 G240 B230)
  //   - JPEG q82 mozjpeg, strip EXIF/metadata
  await sharp(srcBuf, { failOn: "none" })
    .rotate()
    .resize(1280, 800, { fit: "cover", position: "attention" })
    .modulate({ saturation: 0.95 })
    .tint({ r: 245, g: 240, b: 230 })
    .jpeg({ quality: 82, mozjpeg: true })
    .withMetadata({})
    .toFile(outPath);
}

async function main() {
  ensureDir(OUT_DIR);
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

  // Sanity check — no duplicate Pexels photo IDs across the manifest.
  const ids = manifest.map((e) => {
    const m = e.url.match(/photos\/([0-9]+)/);
    return m ? m[1] : e.url;
  });
  const dupes = ids.filter((v, i, a) => a.indexOf(v) !== i);
  if (dupes.length > 0) {
    console.error(`Duplicate Pexels IDs in manifest: ${dupes.join(", ")}`);
    process.exit(1);
  }
  console.log(`Processing ${manifest.length} entries…\n`);

  let okCount = 0;
  let failCount = 0;
  let totalBytes = 0;

  for (const entry of manifest) {
    const outPath = path.join(OUT_DIR, `${entry.slug}.jpg`);
    const start = Date.now();
    process.stdout.write(
      `[${manifest.indexOf(entry) + 1}/${manifest.length}] ${entry.slug} … `
    );
    try {
      const src = await downloadBuffer(entry.url);
      await processImage(src, outPath);
      const stat = fs.statSync(outPath);
      const kb = (stat.size / 1024).toFixed(1);
      totalBytes += stat.size;
      const ms = Date.now() - start;
      console.log(`OK ${kb}KB ${ms}ms`);
      okCount++;
    } catch (err) {
      console.log(`FAIL ${err.message}`);
      failCount++;
    }
  }

  const totalMB = (totalBytes / (1024 * 1024)).toFixed(2);
  console.log(`\nDone. ok=${okCount} fail=${failCount} total=${totalMB}MB`);
  if (failCount > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
