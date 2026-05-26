/**
 * Compress raw portrait JPEGs in public/portraits to webish sizes.
 *
 * - Iterates public/portraits/*.jpg
 * - Resizes to max 1600px wide (keep aspect)
 * - Same cream-editorial tint as news pipeline:
 *     .modulate({ saturation: 0.95 }).tint({ r: 245, g: 240, b: 230 })
 * - JPEG q82 mozjpeg, EXIF stripped
 * - Overwrites the original (always)
 *
 * Run: node scripts/compress-portraits.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DIR = path.join(ROOT, "public", "portraits");

async function main() {
  if (!fs.existsSync(DIR)) {
    console.error(`No portraits dir: ${DIR}`);
    process.exit(1);
  }
  const files = fs
    .readdirSync(DIR)
    .filter((f) => /\.jpe?g$/i.test(f))
    .map((f) => path.join(DIR, f));

  console.log(`Processing ${files.length} portrait(s)...\n`);

  let beforeTotal = 0;
  let afterTotal = 0;
  let okCount = 0;
  let failCount = 0;

  for (const file of files) {
    const before = fs.statSync(file).size;
    beforeTotal += before;
    const tmp = `${file}.tmp`;
    const start = Date.now();
    process.stdout.write(`[${files.indexOf(file) + 1}/${files.length}] ${path.basename(file)} ... `);
    try {
      const buf = fs.readFileSync(file);
      await sharp(buf, { failOn: "none" })
        .rotate() // honor EXIF before strip
        .resize({ width: 1600, withoutEnlargement: true })
        .modulate({ saturation: 0.95 })
        .tint({ r: 245, g: 240, b: 230 })
        .jpeg({ quality: 82, mozjpeg: true })
        .withMetadata({}) // strip
        .toFile(tmp);
      fs.renameSync(tmp, file);
      const after = fs.statSync(file).size;
      afterTotal += after;
      const ms = Date.now() - start;
      const bKB = (before / 1024).toFixed(1);
      const aKB = (after / 1024).toFixed(1);
      console.log(`OK ${bKB}KB -> ${aKB}KB ${ms}ms`);
      okCount++;
    } catch (err) {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
      console.log(`FAIL ${err.message}`);
      failCount++;
    }
  }

  const bMB = (beforeTotal / (1024 * 1024)).toFixed(2);
  const aMB = (afterTotal / (1024 * 1024)).toFixed(2);
  const savedMB = ((beforeTotal - afterTotal) / (1024 * 1024)).toFixed(2);
  console.log(`\nDone. ok=${okCount} fail=${failCount}`);
  console.log(`Before: ${bMB} MB`);
  console.log(`After:  ${aMB} MB`);
  console.log(`Saved:  ${savedMB} MB`);
  if (failCount > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
