/**
 * Generate public/og-default.png — 1200x630 cream-themed Open Graph image.
 *
 * Pure-SVG composite approach (sharp svg-to-png):
 *   - cream #F2EFE6 background
 *   - subtle paper grain (feTurbulence)
 *   - big serif heading "SkynetLabs" with italic terracotta accent on "Labs"
 *   - sans subhead "AI Automation Agency · Bali"
 *   - bottom-left mono eyebrow "— skynetjoe.com · 2026" terracotta
 *   - 1px ink border inset 20px
 *   - small terracotta dot ornament
 *
 * No external font embedding — relies on the rendering of generic serif/sans/mono
 * stacks inside the SVG, which sharp/librsvg picks up from system fonts. The
 * visual we want is editorial cream + terracotta accents, NOT pixel-perfect
 * brand-font matching (social crawler thumbnails are tiny).
 *
 * Run: node scripts/generate-og-default.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = path.join(ROOT, "public", "og-default.png");

const CREAM = "#F2EFE6";
const CREAM_DEEP = "#E8E2D0";
const INK = "#1A1814";
const INK_2 = "#4A463E";
const TERRA = "#C66B3F";

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0"/>
      <feComposite in2="SourceGraphic" operator="in"/>
    </filter>
    <linearGradient id="vignette" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${CREAM}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${CREAM_DEEP}" stop-opacity="1"/>
    </linearGradient>
  </defs>

  <!-- Cream background w/ subtle gradient -->
  <rect width="1200" height="630" fill="url(#vignette)"/>

  <!-- Paper grain overlay -->
  <rect width="1200" height="630" fill="${INK}" filter="url(#grain)" opacity="0.5"/>

  <!-- 1px ink border inset 20px -->
  <rect x="20" y="20" width="1160" height="590" fill="none" stroke="${INK}" stroke-width="1" opacity="0.35"/>

  <!-- Terracotta corner dot ornament (top-right) -->
  <circle cx="1110" cy="90" r="6" fill="${TERRA}"/>
  <circle cx="1080" cy="90" r="2" fill="${TERRA}" opacity="0.6"/>
  <circle cx="1095" cy="105" r="2" fill="${TERRA}" opacity="0.6"/>

  <!-- Top eyebrow -->
  <text x="80" y="105" font-family="ui-monospace, 'IBM Plex Mono', Menlo, Consolas, monospace"
        font-size="18" letter-spacing="2" fill="${TERRA}">— SKYNETLABS · 2026</text>

  <!-- Big heading: "Skynet" upright serif + "Labs" italic terracotta -->
  <text x="80" y="330" font-family="'Fraunces', Georgia, 'Times New Roman', serif"
        font-size="148" font-weight="500" fill="${INK}" letter-spacing="-2">Skynet<tspan font-style="italic" fill="${TERRA}">Labs</tspan></text>

  <!-- Subhead -->
  <text x="80" y="400" font-family="'Onest', system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="34" font-weight="500" fill="${INK_2}">AI Automation Agency · Bali</text>

  <!-- Body line -->
  <text x="80" y="450" font-family="'Onest', system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif"
        font-size="22" font-weight="400" fill="${INK_2}" opacity="0.85">n8n workflows · AEO websites · Chat-first CRM</text>

  <!-- Bottom eyebrow -->
  <text x="80" y="570" font-family="ui-monospace, 'IBM Plex Mono', Menlo, Consolas, monospace"
        font-size="16" letter-spacing="1.5" fill="${TERRA}">— skynetjoe.com · 2026</text>

  <!-- Bottom-right credit -->
  <text x="1120" y="570" font-family="ui-monospace, 'IBM Plex Mono', Menlo, Consolas, monospace"
        font-size="14" letter-spacing="1" fill="${INK_2}" opacity="0.7" text-anchor="end">WASEEM NASIR</text>

  <!-- Thin terracotta accent line under heading -->
  <line x1="80" y1="270" x2="160" y2="270" stroke="${TERRA}" stroke-width="3"/>
</svg>`;

async function main() {
  await sharp(Buffer.from(svg))
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(OUT);
  const stat = fs.statSync(OUT);
  console.log(`OK ${OUT}`);
  console.log(`Size: ${(stat.size / 1024).toFixed(1)} KB`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
