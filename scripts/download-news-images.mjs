/**
 * Download + process news article hero images from Pexels stock photos.
 * Reads scripts/news-images-manifest.json, downloads each URL,
 * processes with sharp (cream-editorial filter, 1600x1000 cover crop, JPEG q82,
 * EXIF stripped) and writes to public/news/<slug>.jpg.
 *
 * Run: node scripts/download-news-images.mjs
 * Re-run safe: overwrites existing files (delete only if you want to keep an
 * existing variant).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MANIFEST = path.join(__dirname, "news-images-manifest.json");
const OUT_DIR = path.join(ROOT, "public", "news");

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

async function downloadBuffer(url) {
  const res = await fetch(url, {
    headers: {
      // Pexels CDN serves cleaner without a Node user-agent
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      Accept: "image/avif,image/webp,image/jpeg,image/*,*/*;q=0.8",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return Buffer.from(await res.arrayBuffer());
}

async function processImage(srcBuf, outPath) {
  // Cream-editorial filter:
  //   - resize to 1600x1000 (16:10), fit cover w/ attention-aware crop
  //   - drop saturation a touch (0.95)
  //   - warm tint toward cream (R245 G240 B230) — approximates sepia(0.06)
  //   - JPEG q82, strip EXIF/metadata
  await sharp(srcBuf, { failOn: "none" })
    .rotate() // honor EXIF orientation before strip
    .resize(1600, 1000, { fit: "cover", position: "attention" })
    .modulate({ saturation: 0.95 })
    .tint({ r: 245, g: 240, b: 230 })
    .jpeg({ quality: 82, mozjpeg: true })
    .withMetadata({}) // strip everything
    .toFile(outPath);
}

async function main() {
  ensureDir(OUT_DIR);
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  console.log(`Processing ${manifest.length} entries…\n`);

  let okCount = 0;
  let failCount = 0;
  let totalBytes = 0;

  for (const entry of manifest) {
    const outPath = path.join(OUT_DIR, `${entry.slug}.jpg`);
    const start = Date.now();
    process.stdout.write(`[${manifest.indexOf(entry) + 1}/${manifest.length}] ${entry.slug} … `);
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
