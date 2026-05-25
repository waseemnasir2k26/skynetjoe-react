/**
 * Generate 9 case-study hero images via Pollinations.ai Flux (free, no API key).
 * Saves to public/case-studies/<slug>.jpg at 1600x900 (16:9).
 *
 * Run: node scripts/gen-case-study-images.mjs
 * Re-run safe: skips files that already exist (delete to regenerate).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "case-studies");

const CASES = [
  {
    slug: "eu-logistics-email-triage-n8n",
    prompt:
      "editorial wide photograph of a modern freight logistics operations control center, multiple ultrawide monitors showing email inbox dashboards and workflow diagrams, deep navy and cyan ambient lighting, sleek desk with a notebook, cinematic depth of field, no people, no text, no logos, photorealistic, 16:9",
    seed: 1011,
  },
  {
    slug: "bali-wellness-conversion-funnel",
    prompt:
      "editorial interior photograph of a serene Balinese wellness studio in Ubud, bamboo architecture, soft golden morning light filtering through palm leaves, a wooden table with crystals and a notebook, linen cushions, tropical plants, calm atmosphere, no people, photorealistic, 16:9",
    seed: 1022,
  },
  {
    slug: "manhattan-dental-atelier-flagship",
    prompt:
      "editorial interior photograph of a luxury cosmetic dental atelier in Manhattan, soft warm gold and ivory palette, marble reception counter, modern dental chair in background, fresh white orchids, minimalist editorial interior design, no people, no logos, photorealistic, 16:9",
    seed: 1033,
  },
  {
    slug: "northeast-recovery-brand-intake-rescue",
    prompt:
      "editorial interior photograph of a calm clinical recovery center reception area, soft natural daylight, neutral beige and sage palette, comfortable mid-century seating, large potted plants, healing minimalist space, no people, no text, photorealistic, 16:9",
    seed: 1044,
  },
  {
    slug: "us-insurance-gohighlevel-rebuild",
    prompt:
      "editorial wide photograph of a modern insurance sales operations workspace, large ultrawide monitor showing a clean CRM pipeline visualization with kanban columns, sleek glass desk with leather notebook and pen, blue and teal ambient lighting, no people, no text, no logos, photorealistic, 16:9",
    seed: 1055,
  },
  {
    slug: "internal-carousel-content-engine-200-asset",
    prompt:
      "abstract editorial photograph of a creative content workspace with multiple floating social media carousel slide mockups arranged in a grid above a dark desk, neon cyan and magenta accent lighting, dark mode aesthetic, futuristic content production pipeline, no people, no readable text, photorealistic, 16:9",
    seed: 1066,
  },
  {
    slug: "premium-auto-dealership-network-demo",
    prompt:
      "editorial wide photograph of a premium auto dealership showroom interior at twilight, polished concrete floor, a single sleek luxury sedan silhouette with dramatic rim lighting, glass walls reflecting blue evening sky, minimalist architecture, no people, no logos, no text, photorealistic cinematic, 16:9",
    seed: 1077,
  },
  {
    slug: "ksa-fashion-retailer-shopify-ecommerce",
    prompt:
      "editorial wide photograph of a luxury Middle Eastern footwear boutique interior in Riyadh, marble pedestals displaying premium leather shoes, warm gold and amber lighting, intricate Arabic geometric architectural patterns on the ceiling, no people, no logos, no text, fashion editorial photography, photorealistic, 16:9",
    seed: 1088,
  },
  {
    slug: "saas-multi-channel-aeo-content-engine",
    prompt:
      "editorial wide photograph of a modern SaaS founder workspace, three large monitors displaying different social media analytics dashboards with cyan and magenta neon UI glow, dark mode workspace, sleek black desk with mechanical keyboard, no people, no readable text, no logos, photorealistic cinematic, 16:9",
    seed: 1099,
  },
];

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

async function fetchImage(prompt, seed) {
  const enc = encodeURIComponent(prompt);
  const url = `https://image.pollinations.ai/prompt/${enc}?model=flux&width=1600&height=900&nologo=true&enhance=true&seed=${seed}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for seed ${seed}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  return buf;
}

async function main() {
  ensureDir(OUT_DIR);

  for (const c of CASES) {
    const outPath = path.join(OUT_DIR, `${c.slug}.jpg`);
    if (fs.existsSync(outPath)) {
      console.log(`SKIP ${c.slug} (exists)`);
      continue;
    }
    const start = Date.now();
    process.stdout.write(`GEN  ${c.slug} ... `);
    try {
      const buf = await fetchImage(c.prompt, c.seed);
      fs.writeFileSync(outPath, buf);
      const kb = (buf.length / 1024).toFixed(1);
      const ms = Date.now() - start;
      console.log(`OK ${kb}KB ${ms}ms`);
    } catch (err) {
      console.log(`FAIL ${err.message}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
