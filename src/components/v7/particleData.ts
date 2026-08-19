/**
 * V7 "Particle Field" — shape target generators + shared scroll/content
 * constants for the pinned hero-to-proof beat.
 *
 * TECHNIQUE (per build brief): attribute-morph, not GPGPU. Five target
 * position arrays (Float32Array, xyz per particle) are precomputed once on
 * mount for a FIXED particle count N — every particle keeps the same index
 * across all five shapes, so the vertex shader can cross-dissolve between
 * any two adjacent shapes by mixing two attribute buffers with a scroll-
 * driven weight. No FBO ping-pong, no GPGPU pass — proven, debuggable,
 * matches the pattern already used for camera keyframes in
 * src/components/v3/MachineSceneContent.tsx (lerp between fixed waypoints),
 * generalized here to 5 position waypoints instead of 5 camera waypoints.
 *
 * Shapes, in scroll order:
 *   0 FIELD    — loose ambient scatter (hero, no representational claim)
 *   1 GRAPH    — workflow node-graph (9 nodes, 10 edges)
 *   2 BARS     — rising bar chart (9 columns, ascending trend, illustrative
 *                — the real numbers are rendered as HTML in state 3, never
 *                as particles, so nothing numeric is "drawn" by the GPU)
 *   3 WORDMARK — canvas-rasterized glyph sampling of "SKYNETLABS"
 *   4 ARROW    — arrow + converging halo pointing down at the state-4 CTA
 *
 * All generation is deterministic (hash-of-index, not Math.random()) so the
 * same N always produces the same shapes — reproducible screenshots, no
 * per-mount jitter in the composition.
 */

export const PARTICLE_COUNT = 30000;

// Scroll positions (0..1 of the pinned beat) where each shape is at full
// weight (1.0). Between two centers the shader linearly cross-dissolves.
// Shapes 3 (wordmark) and 4 (arrow) both live inside content-state 4
// (0.75..1.0) — wordmark assembles first, then converges into the arrow
// pointing at the CTA, matching "wordmark/arrow -> CTA convergence" in the
// build brief.
export const SHAPE_CENTERS = [0, 0.28, 0.52, 0.78, 0.97];

// Content-state boundaries (4 states) driving the HTML caption crossfade —
// same floor(progress * states.length) pattern as MachineBeat.tsx.
export const STATE_COUNT = 4;

export const CAPTIONS: string[] = [
  "", // state 0 — hero copy is its own SSR block, not a caption line
  "Your leads, answered in seconds.",
  "The receipts, not the pitch.",
  "One system. Every step handled.",
];

// Canonical proof numbers — identical figures to src/components/v3/ProofBand.tsx
// (already published sitewide: about page, HeroFunnel, ProofReceipts). Nothing
// new claimed, nothing particle-drawn — rendered as HTML for legibility.
export const PROOF_STATS = [
  { value: 180, suffix: "+", label: "workflows shipped" },
  { value: 40, suffix: "+", label: "sites delivered" },
  { value: 9, suffix: "", label: "countries served" },
  { value: 2019, suffix: "", label: "shipping since" },
];

// ---------------------------------------------------------------------------
// deterministic hash — same technique as v3/MachineSceneContent.tsx hash(i)
function hash(n: number): number {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ---------------------------------------------------------------------------
// SHAPE 0 — FIELD (ambient scatter, hero)
function buildField(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    out[i * 3] = (hash(i * 2 + 1) - 0.5) * 7.4;
    out[i * 3 + 1] = (hash(i * 2 + 2) - 0.5) * 4.2;
    out[i * 3 + 2] = (hash(i * 2 + 3) - 0.5) * 2.4 - 0.6;
  }
  return out;
}

// ---------------------------------------------------------------------------
// SHAPE 1 — GRAPH (workflow node-graph)
const GRAPH_NODES: [number, number][] = [
  [-3.3, 0.65],
  [-2.1, 1.5],
  [-2.1, -0.45],
  [-0.65, 0.95],
  [-0.65, -0.95],
  [0.85, 0.0],
  [2.25, 1.15],
  [2.25, -1.15],
  [3.4, 0.0],
];
const GRAPH_EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [5, 6],
  [5, 7],
  [6, 8],
  [7, 8],
];

function buildGraph(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const nodeCount = GRAPH_NODES.length;
  const edgeCount = GRAPH_EDGES.length;
  for (let i = 0; i < n; i++) {
    const roll = hash(i * 7 + 1);
    if (roll < 0.32) {
      // node blob — uniform-in-disc sample
      const k = Math.min(
        nodeCount - 1,
        Math.floor(hash(i * 7 + 2) * nodeCount),
      );
      const [cx, cy] = GRAPH_NODES[k];
      const ang = hash(i * 7 + 3) * Math.PI * 2;
      const r = Math.sqrt(hash(i * 7 + 4)) * 0.16;
      out[i * 3] = cx + Math.cos(ang) * r;
      out[i * 3 + 1] = cy + Math.sin(ang) * r;
      out[i * 3 + 2] = (hash(i * 7 + 5) - 0.5) * 0.2;
    } else {
      // edge point
      const e = Math.min(
        edgeCount - 1,
        Math.floor(hash(i * 7 + 6) * edgeCount),
      );
      const [a, b] = GRAPH_EDGES[e];
      const [ax, ay] = GRAPH_NODES[a];
      const [bx, by] = GRAPH_NODES[b];
      const t = hash(i * 7 + 7);
      const dx = bx - ax;
      const dy = by - ay;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      const jitter = (hash(i * 7 + 8) - 0.5) * 0.05;
      out[i * 3] = lerp(ax, bx, t) + nx * jitter;
      out[i * 3 + 1] = lerp(ay, by, t) + ny * jitter;
      out[i * 3 + 2] = (hash(i * 7 + 9) - 0.5) * 0.2;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// SHAPE 2 — BARS (rising bar chart — illustrative heights only, no numeric
// claim; the real proof numbers render as HTML in state 3, never as
// particles)
const BAR_COUNT = 9;
const BAR_BASE_Y = -1.7;
const BAR_HEIGHTS: number[] = Array.from({ length: BAR_COUNT }, (_, i) => {
  const trend = i / (BAR_COUNT - 1);
  const wiggle = hash(i * 31 + 3) * 0.18 - 0.05;
  return Math.max(0.35, 0.6 + trend * 2.7 + wiggle);
});
const BAR_SPAN = 6.4;
const BAR_GAP = BAR_SPAN / BAR_COUNT;

function buildBars(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const b = Math.min(BAR_COUNT - 1, Math.floor(hash(i * 11 + 1) * BAR_COUNT));
    const cx = -BAR_SPAN / 2 + BAR_GAP * (b + 0.5);
    const width = BAR_GAP * 0.62;
    out[i * 3] = cx + (hash(i * 11 + 2) - 0.5) * width;
    out[i * 3 + 1] = BAR_BASE_Y + hash(i * 11 + 3) * BAR_HEIGHTS[b];
    out[i * 3 + 2] = (hash(i * 11 + 4) - 0.5) * 0.25;
  }
  return out;
}

// ---------------------------------------------------------------------------
// SHAPE 3 — WORDMARK (canvas-rasterized glyph sampling)
let wordmarkPixelsCache: { x: number; y: number }[] | null = null;

function getWordmarkPixels(): { x: number; y: number }[] {
  if (wordmarkPixelsCache) return wordmarkPixelsCache;
  if (typeof document === "undefined") return [];
  const W = 1024;
  const H = 220;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "700 128px Arial, Helvetica, sans-serif";
  ctx.fillText("SKYNETLABS", W / 2, H / 2);
  const data = ctx.getImageData(0, 0, W, H).data;
  const pts: { x: number; y: number }[] = [];
  // Sample every 2nd pixel — dense enough for a legible silhouette,
  // cheap enough to build once on mount.
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      const a = data[(y * W + x) * 4 + 3];
      if (a > 128) pts.push({ x, y });
    }
  }
  wordmarkPixelsCache = pts.length > 0 ? pts : [{ x: W / 2, y: H / 2 }];
  return wordmarkPixelsCache;
}

function buildWordmark(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  const pixels = getWordmarkPixels();
  const W = 1024;
  const H = 220;
  const scale = 6.8 / W; // fit ~6.8 world units wide
  for (let i = 0; i < n; i++) {
    const idx = Math.min(
      pixels.length - 1,
      Math.floor(hash(i * 41 + 1) * pixels.length),
    );
    const p = pixels[idx];
    const jx = (hash(i * 41 + 2) - 0.5) * 1.4;
    const jy = (hash(i * 41 + 3) - 0.5) * 1.4;
    out[i * 3] = (p.x - W / 2 + jx) * scale;
    out[i * 3 + 1] = -(p.y - H / 2 + jy) * scale;
    out[i * 3 + 2] = (hash(i * 41 + 4) - 0.5) * 0.15;
  }
  return out;
}

// ---------------------------------------------------------------------------
// SHAPE 4 — ARROW (converging into the state-4 CTA, pointing down)
type Seg = { a: [number, number]; b: [number, number] };
const ARROW_SEGMENTS: Seg[] = [
  { a: [0, 1.35], b: [0, -0.55] }, // shaft
  { a: [-0.62, 0.15], b: [0, -0.55] }, // left head
  { a: [0.62, 0.15], b: [0, -0.55] }, // right head
];
const ARROW_TIP: [number, number] = [0, -1.75];
const ARROW_RING_R = 0.32;

function buildArrow(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const roll = hash(i * 53 + 1);
    if (roll < 0.72) {
      const s = Math.min(
        ARROW_SEGMENTS.length - 1,
        Math.floor(hash(i * 53 + 2) * ARROW_SEGMENTS.length),
      );
      const seg = ARROW_SEGMENTS[s];
      const t = hash(i * 53 + 3);
      const jitter = (hash(i * 53 + 4) - 0.5) * 0.045;
      out[i * 3] = lerp(seg.a[0], seg.b[0], t) + jitter;
      out[i * 3 + 1] = lerp(seg.a[1], seg.b[1], t) + jitter;
      out[i * 3 + 2] = (hash(i * 53 + 5) - 0.5) * 0.15;
    } else {
      // converging halo ring at the tip, above the on-canvas CTA
      const ang = hash(i * 53 + 6) * Math.PI * 2;
      const r = ARROW_RING_R + (hash(i * 53 + 7) - 0.5) * 0.08;
      out[i * 3] = ARROW_TIP[0] + Math.cos(ang) * r;
      out[i * 3 + 1] = ARROW_TIP[1] + Math.sin(ang) * r * 0.6 - 0.15;
      out[i * 3 + 2] = (hash(i * 53 + 8) - 0.5) * 0.15;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
export function buildShapeTargets(n: number = PARTICLE_COUNT): {
  targets: Float32Array[];
  seeds: Float32Array;
} {
  const targets = [
    buildField(n),
    buildGraph(n),
    buildBars(n),
    buildWordmark(n),
    buildArrow(n),
  ];
  const seeds = new Float32Array(n);
  for (let i = 0; i < n; i++) seeds[i] = hash(i * 3 + 1);
  return { targets, seeds };
}

/**
 * Weight vector (length = centers.length, sums to 1) for a given scroll
 * progress — piecewise-linear (smoothstep-eased) crossfade between the two
 * adjacent shape centers straddling `progress`. Same lerp-between-waypoints
 * idea as MachineSceneContent's `beatFor`, generalized from one interpolated
 * value to a full weight vector so the vertex shader can mix N attribute
 * buffers instead of 2 camera vectors.
 */
export function computeShapeWeights(
  progress: number,
  centers: number[] = SHAPE_CENTERS,
): number[] {
  const p = Math.min(1, Math.max(0, progress));
  const w = new Array(centers.length).fill(0);
  if (p <= centers[0]) {
    w[0] = 1;
    return w;
  }
  if (p >= centers[centers.length - 1]) {
    w[centers.length - 1] = 1;
    return w;
  }
  for (let i = 0; i < centers.length - 1; i++) {
    if (p >= centers[i] && p <= centers[i + 1]) {
      const local = (p - centers[i]) / (centers[i + 1] - centers[i]);
      const eased = local * local * (3 - 2 * local); // smoothstep
      w[i] = 1 - eased;
      w[i + 1] = eased;
      return w;
    }
  }
  return w;
}
