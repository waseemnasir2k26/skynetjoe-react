/**
 * Upscale public/case-studies/*.jpg to 1600x900 cream-editorial.
 *
 * Existing files are 1024x576. case-studies/[slug] page renders the hero
 * full-bleed priority — visible upscale blur on retina. Re-render at
 * 1600x900 (sharp resize / cover) + cream tint + q82 mozjpeg + EXIF strip.
 *
 * Note: this is a lossy upscale. If the source is too small to read
 * cleanly we still output 1600w (mozjpeg will smooth slightly). Logs
 * before/after dims so any badly-blurred output can be replaced by hand.
 *
 * Run: node scripts/upscale-case-study-covers.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DIR = path.join(ROOT, "public", "case-studies");

async function main() {
  if (!fs.existsSync(DIR)) {
    console.error(`No case-studies dir: ${DIR}`);
    process.exit(1);
  }
  const files = fs
    .readdirSync(DIR)
    .filter((f) => /\.jpe?g$/i.test(f))
    .map((f) => path.join(DIR, f));

  console.log(`Processing ${files.length} case-study cover(s)...\n`);

  let beforeTotal = 0;
  let afterTotal = 0;
  let okCount = 0;
  let failCount = 0;
  const tooSmall = [];

  for (const file of files) {
    const before = fs.statSync(file).size;
    beforeTotal += before;
    const tmp = `${file}.tmp`;
    const start = Date.now();
    process.stdout.write(`[${files.indexOf(file) + 1}/${files.length}] ${path.basename(file)} ... `);
    try {
      const buf = fs.readFileSync(file);
      const meta = await sharp(buf).metadata();
      const srcW = meta.width || 0;
      const srcH = meta.height || 0;
      if (srcW < 1024) tooSmall.push({ file: path.basename(file), w: srcW, h: srcH });
      await sharp(buf, { failOn: "none" })
        .rotate()
        .resize(1600, 900, { fit: "cover", position: "attention", kernel: "lanczos3" })
        .modulate({ saturation: 0.95 })
        .tint({ r: 245, g: 240, b: 230 })
        .jpeg({ quality: 82, mozjpeg: true })
        .withMetadata({})
        .toFile(tmp);
      fs.renameSync(tmp, file);
      const after = fs.statSync(file).size;
      afterTotal += after;
      const finalMeta = await sharp(file).metadata();
      const ms = Date.now() - start;
      const bKB = (before / 1024).toFixed(1);
      const aKB = (after / 1024).toFixed(1);
      console.log(`OK ${srcW}x${srcH} -> ${finalMeta.width}x${finalMeta.height} ${bKB}KB -> ${aKB}KB ${ms}ms`);
      okCount++;
    } catch (err) {
      if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
      console.log(`FAIL ${err.message}`);
      failCount++;
    }
  }

  const bMB = (beforeTotal / (1024 * 1024)).toFixed(2);
  const aMB = (afterTotal / (1024 * 1024)).toFixed(2);
  console.log(`\nDone. ok=${okCount} fail=${failCount}`);
  console.log(`Before: ${bMB} MB`);
  console.log(`After:  ${aMB} MB`);
  if (tooSmall.length > 0) {
    console.log(`\nWARN: ${tooSmall.length} source(s) <1024w (lossy upscale, consider replacement):`);
    for (const t of tooSmall) console.log(`  - ${t.file} ${t.w}x${t.h}`);
  }
  if (failCount > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
