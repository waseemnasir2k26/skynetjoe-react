/**
 * Resize Bali trek 2026-05-24 batch into web-ready JPGs.
 *
 * Source: C:\Users\info\OneDrive\Desktop\ISB\latest TREK IMAGES BALI
 * Output: public/bali-trek/<short-name>.jpg
 *
 * Uses sharp (already a transitive dep of next).
 * Rotates per EXIF orientation. Caps at 1600px wide, JPEG q82.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = "C:\\Users\\info\\OneDrive\\Desktop\\ISB\\latest TREK IMAGES BALI";
const OUT = path.join(__dirname, "..", "public", "bali-trek");

const PICKS = [
  { src: "WhatsApp Image 2026-05-25 at 11.47.02 AM.jpeg", dst: "heart-frame-group.jpg", alt: "Heart-shaped viewpoint with the Bali trek crew" },
  { src: "WhatsApp Image 2026-05-25 at 11.47.02 AM (1).jpeg", dst: "heart-frame-wide.jpg", alt: "Heart frame, jungle vista behind" },
  { src: "WhatsApp Image 2026-05-25 at 11.47.01 AM.jpeg", dst: "cafe-group.jpg", alt: "Cafe meetup with the Bali community" },
  { src: "WhatsApp Image 2026-05-25 at 11.47.03 AM.jpeg", dst: "selfie-friend.jpg", alt: "Selfie at the viewpoint with a friend" },
  { src: "DJI_20260524083715_0202_D.JPG", dst: "villa-arrival.jpg", alt: "Morning at the Bali villa before the trek" },
  { src: "DJI_20260524110432_0242_D.JPG", dst: "trek-path-palms.jpg", alt: "Trek path through Balinese palms" },
  { src: "DJI_20260524111854_0258_D.JPG", dst: "mountain-vista.jpg", alt: "Mountain vista from the Bali trek" },
  { src: "DJI_20260524115416_0285_D.JPG", dst: "river-rocks.jpg", alt: "River rocks rest stop, mid-trek" },
  { src: "DJI_20260524132043_0368_D.JPG", dst: "jungle-stairs.jpg", alt: "Jungle stairs near the waterfall" },
];

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

async function main() {
  ensureDir(OUT);
  for (const pick of PICKS) {
    const inPath = path.join(SRC, pick.src);
    const outPath = path.join(OUT, pick.dst);
    if (!fs.existsSync(inPath)) {
      console.log(`MISS ${pick.src}`);
      continue;
    }
    if (fs.existsSync(outPath)) {
      console.log(`SKIP ${pick.dst} (exists)`);
      continue;
    }
    const start = Date.now();
    process.stdout.write(`PROC ${pick.dst} ... `);
    try {
      await sharp(inPath)
        .rotate() // honor EXIF orientation
        .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(outPath);
      const stat = fs.statSync(outPath);
      console.log(`OK ${(stat.size / 1024).toFixed(1)}KB ${Date.now() - start}ms`);
    } catch (err) {
      console.log(`FAIL ${err.message}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
