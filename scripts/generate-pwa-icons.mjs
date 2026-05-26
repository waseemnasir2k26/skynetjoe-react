/**
 * Generate PWA icons + apple-touch-icon from a single SVG source.
 *
 * Outputs:
 *   public/icon-192.png        (192x192)
 *   public/icon-512.png        (512x512)
 *   public/apple-touch-icon.png (180x180)
 *
 * Source: hand-coded SVG — cream background square, big serif "S" with italic
 * terracotta accent dot. Matches OG image color contract (cream / ink / terra).
 *
 * Run: node scripts/generate-pwa-icons.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public");

const CREAM = "#F2EFE6";
const INK = "#1A1814";
const TERRA = "#C66B3F";

/**
 * Source SVG, rendered at 1024 then resampled down to each target size.
 * Bigger source -> cleaner downscale.
 */
const srcSize = 1024;
function buildSvg(size) {
  const r = Math.round(size * 0.16); // rounded corners
  const cx = size / 2;
  const cy = size / 2;
  const fontSize = Math.round(size * 0.68);
  const dotR = Math.round(size * 0.05);
  const dotCx = cx + Math.round(size * 0.22);
  const dotCy = cy + Math.round(size * 0.24);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="${CREAM}"/>
  <text x="${cx}" y="${cy + fontSize * 0.36}" text-anchor="middle"
        font-family="'Fraunces', Georgia, 'Times New Roman', serif"
        font-style="italic" font-weight="600" font-size="${fontSize}" fill="${INK}">S</text>
  <circle cx="${dotCx}" cy="${dotCy}" r="${dotR}" fill="${TERRA}"/>
</svg>`;
}

const targets = [
  { size: 192, name: "icon-192.png" },
  { size: 512, name: "icon-512.png" },
  { size: 180, name: "apple-touch-icon.png" },
];

async function main() {
  for (const t of targets) {
    const svg = buildSvg(srcSize);
    const outPath = path.join(OUT_DIR, t.name);
    await sharp(Buffer.from(svg))
      .resize(t.size, t.size, { fit: "contain" })
      .png({ quality: 92, compressionLevel: 9 })
      .toFile(outPath);
    const stat = fs.statSync(outPath);
    console.log(`OK ${t.name} (${t.size}x${t.size}) ${(stat.size / 1024).toFixed(1)} KB`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
