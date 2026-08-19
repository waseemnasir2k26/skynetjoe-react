import * as THREE from "three";
import { BUNDLES } from "@/components/v3/bundlesData";

/**
 * Shared content + camera choreography for V4 "THE LINE" — a single
 * continuous scroll-scrubbed 3D dolly through a cream/ink/rust
 * automation-factory diorama. One source of truth so the 3D stations, the
 * DOM overlay cards and the static (mobile/reduced-motion/no-WebGL)
 * fallback never drift out of step.
 *
 * Copy provenance: bundle copy re-exported VERBATIM from
 * src/components/v3/bundlesData.ts (no fork, no drift risk). Proof numbers
 * are the same canonical figures already published in ProofBand.tsx /
 * ProofReceipts.tsx / about page — nothing new claimed here.
 */
export { BUNDLES };

export const HERO = {
  eyebrow: "V4 preview · the line",
  headlineA: "Stop losing customers",
  headlineB: "while you're busy.",
  sub: "We set up smart tools that reply to every new customer in seconds, follow up for you automatically, and handle the boring repeat work — so you win more jobs without working more hours.",
  ctaLabel: "Book a free 30-min check-up",
  ctaHref: "/discovery-call",
};

export type ProofStat = { value: number; suffix: string; label: string };

// Canonical proof numbers ONLY — same figures already published in
// ProofBand.tsx / ProofReceipts.tsx / HeroFunnel.tsx / about page: "180+
// workflows, 40+ sites, 9 countries, founded 2019". Nothing new claimed.
export const PROOF_STATS: ProofStat[] = [
  { value: 180, suffix: "+", label: "workflows shipped" },
  { value: 40, suffix: "+", label: "sites delivered" },
  { value: 9, suffix: "", label: "countries served" },
  { value: 2019, suffix: "", label: "shipping since" },
];

export const FINALE = {
  eyebrow: "— Limited audits each month",
  headline: "Find the gaps in 30 minutes.",
  sub: "A free 30-min check-up. We share screens, spot the one fix that pays off fastest, and send you a short build plan. No pitch deck.",
  ctaLabel: "Book a free 30-min check-up",
  ctaHref: "/discovery-call",
  footnote: "— Reply in 8h · scope in 48h · Bali (GMT+8) · 9 countries served",
};

// --- Journey / camera choreography ------------------------------------
//
// The page is one continuous scroll-scrubbed dolly. STATIONS below carve
// the 0..1 scroll progress into 6 bands (entrance, 3 machine stations, the
// data-readout wall, the lit CTA booth). Each band drives which DOM
// overlay card is visible AND is the index used to sample the camera
// CatmullRomCurve3 (see V4SceneContent.tsx) — so the "what you read" and
// "what the camera is looking at" never disagree.
export type StationId =
  | "entrance"
  | "station-a"
  | "station-b"
  | "station-c"
  | "data-wall"
  | "cta-booth";

export const STATIONS: { id: StationId; start: number; end: number }[] = [
  { id: "entrance", start: 0, end: 1 / 6 },
  { id: "station-a", start: 1 / 6, end: 2 / 6 },
  { id: "station-b", start: 2 / 6, end: 3 / 6 },
  { id: "station-c", start: 3 / 6, end: 4 / 6 },
  { id: "data-wall", start: 4 / 6, end: 5 / 6 },
  { id: "cta-booth", start: 5 / 6, end: 1 },
];

// Total scroll length of the journey wrapper, in viewport heights. Six
// bands x 100svh — long enough for each station to hold a comfortable
// scrub window without feeling rushed, short enough it doesn't turn into a
// scroll marathon.
export const JOURNEY_VH = STATIONS.length * 100;

// Camera position waypoints, one per station "center". Z is monotonically
// decreasing (7.5 -> -7.0) so the dolly always reads as continuous forward
// travel down the line, never a backward hitch mid-scrub — each waypoint
// sits ~2.5-3 units in front of that station's STATION_Z world position
// (see below) for a consistent "arriving at the machine" framing. Sampled
// with THREE.CatmullRomCurve3.getPointAt(t) in V4SceneContent.tsx for a
// smooth dolly rather than hard cuts between stations.
export const CAMERA_POSITIONS: THREE.Vector3[] = [
  // entrance — wide establishing shot. x nudged -0.7 (paired with the
  // matching lookAt target below, a pure translate — not a pan) so the
  // gate pillar + station-A icosahedron sit further right on screen,
  // clear of the left-anchored eyebrow/H1 overlay text at 1440 depth-0.
  new THREE.Vector3(-0.7, 2.6, 7.5),
  new THREE.Vector3(-3.2, 1.6, 3.5), // station A — Speed-to-Lead
  new THREE.Vector3(0.2, 1.3, 1.0), // station B — Inbox Ops (flagship, closest pass)
  new THREE.Vector3(3.4, 1.7, -1.5), // station C — AI Visibility
  new THREE.Vector3(0.4, 2.0, -4.0), // data-readout wall
  new THREE.Vector3(0, 1.9, -7.0), // CTA booth — arrival, camera settles just outside
];

// lookAt targets, same count/order as CAMERA_POSITIONS.
export const CAMERA_TARGETS: THREE.Vector3[] = [
  new THREE.Vector3(-0.7, 0.6, 2.5),
  new THREE.Vector3(-3.2, 0.8, 0.4),
  new THREE.Vector3(0.2, 0.9, -1.6),
  new THREE.Vector3(3.4, 0.9, -3.4),
  new THREE.Vector3(0.4, 1.2, -5.6),
  new THREE.Vector3(0, 1.2, -8.5),
];

// World-space Z position of each diorama station along the line — shared
// between V4SceneContent (mesh placement) and the camera target Z values
// above, so the dolly always ends up looking straight down the assembly
// line rather than off into empty space.
export const STATION_Z = {
  entrance: 4.5,
  stationA: 0.5,
  stationB: -2,
  stationC: -4.5,
  dataWall: -6.5,
  ctaBooth: -9,
};
