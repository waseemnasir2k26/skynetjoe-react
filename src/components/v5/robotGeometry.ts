import * as THREE from "three";

/**
 * Deterministic edge list for "THE AUTOMATION MACHINE" wireframe robot drawn
 * in BlueprintHero / RobotSceneContent. Built once (module-level pure
 * function, no randomness) as a flat, ordered vertex-pair array consumed by
 * a single THREE.LineSegments draw call — NOT one <Line> per edge. Long
 * edges are pre-subdivided into short chords so a growing `drawRange` reads
 * as a pen literally travelling along each edge rather than the edge
 * popping in whole, while still costing exactly one draw call for the
 * entire robot.
 *
 * Assembly order (base -> legs -> chassis -> arms -> head -> antenna ->
 * sensor eye) mirrors how a technical drawing is actually built up: support
 * structure first, then the reasoning "head" last, so the reveal reads as
 * "this machine is intake -> processing -> output", matching the callout
 * copy (lead intake / AI triage / auto-reply) plotted over the same parts.
 */

export type RobotPart =
  | "base"
  | "legs"
  | "chassis"
  | "arms"
  | "head"
  | "antenna"
  | "eye";

export type RobotEdgeGroup = {
  part: RobotPart;
  /** Vertex index (not pair index) this group starts at in the flat array. */
  startVertex: number;
  /** Vertex count for this group. */
  vertexCount: number;
};

function subdividedBoxEdges(
  width: number,
  height: number,
  depth: number,
  center: [number, number, number],
  subdiv: number,
): number[] {
  const box = new THREE.BoxGeometry(width, height, depth);
  const edges = new THREE.EdgesGeometry(box);
  const pos = edges.attributes.position.array as ArrayLike<number>;
  const out: number[] = [];
  const pairCount = pos.length / 6;
  for (let p = 0; p < pairCount; p++) {
    const ax = pos[p * 6 + 0] + center[0];
    const ay = pos[p * 6 + 1] + center[1];
    const az = pos[p * 6 + 2] + center[2];
    const bx = pos[p * 6 + 3] + center[0];
    const by = pos[p * 6 + 4] + center[1];
    const bz = pos[p * 6 + 5] + center[2];
    for (let s = 0; s < subdiv; s++) {
      const t0 = s / subdiv;
      const t1 = (s + 1) / subdiv;
      out.push(
        ax + (bx - ax) * t0,
        ay + (by - ay) * t0,
        az + (bz - az) * t0,
        ax + (bx - ax) * t1,
        ay + (by - ay) * t1,
        az + (bz - az) * t1,
      );
    }
  }
  box.dispose();
  edges.dispose();
  return out;
}

function lineChords(
  a: [number, number, number],
  b: [number, number, number],
  subdiv: number,
): number[] {
  const out: number[] = [];
  for (let s = 0; s < subdiv; s++) {
    const t0 = s / subdiv;
    const t1 = (s + 1) / subdiv;
    out.push(
      a[0] + (b[0] - a[0]) * t0,
      a[1] + (b[1] - a[1]) * t0,
      a[2] + (b[2] - a[2]) * t0,
      a[0] + (b[0] - a[0]) * t1,
      a[1] + (b[1] - a[1]) * t1,
      a[2] + (b[2] - a[2]) * t1,
    );
  }
  return out;
}

function circleChords(
  radius: number,
  center: [number, number, number],
  segments: number,
): number[] {
  const out: number[] = [];
  for (let i = 0; i < segments; i++) {
    const a0 = (i / segments) * Math.PI * 2;
    const a1 = ((i + 1) / segments) * Math.PI * 2;
    out.push(
      center[0] + Math.cos(a0) * radius,
      center[1] + Math.sin(a0) * radius,
      center[2],
      center[0] + Math.cos(a1) * radius,
      center[1] + Math.sin(a1) * radius,
      center[2],
    );
  }
  return out;
}

export function buildRobotEdges(): {
  positions: Float32Array;
  /** Total vertex count (2 per chord) — pass to geometry.setDrawRange. */
  totalVertices: number;
  groups: RobotEdgeGroup[];
} {
  const flat: number[] = [];
  const groups: RobotEdgeGroup[] = [];

  const push = (part: RobotPart, chords: number[]) => {
    const startVertex = flat.length / 3;
    flat.push(...chords);
    groups.push({ part, startVertex, vertexCount: chords.length / 3 });
  };

  // Base plate
  push("base", subdividedBoxEdges(1.5, 0.16, 1.0, [0, -1.15, 0], 3));
  // Legs
  push("legs", subdividedBoxEdges(0.14, 0.7, 0.14, [-0.46, -0.78, 0], 2));
  push("legs", subdividedBoxEdges(0.14, 0.7, 0.14, [0.46, -0.78, 0], 2));
  // Chassis (main body)
  push("chassis", subdividedBoxEdges(1.35, 1.0, 0.85, [0, 0.05, 0], 4));
  // Arms
  push("arms", subdividedBoxEdges(0.85, 0.14, 0.14, [-1.05, 0.15, 0], 3));
  push("arms", subdividedBoxEdges(0.85, 0.14, 0.14, [1.05, 0.15, 0], 3));
  // Head
  push("head", subdividedBoxEdges(0.56, 0.46, 0.46, [0, 0.86, 0], 3));
  // Antenna
  push("antenna", lineChords([0, 1.09, 0], [0, 1.52, 0], 4));
  push("antenna", circleChords(0.06, [0, 1.58, 0], 8));
  // Sensor eye (front face of head)
  push("eye", circleChords(0.14, [0, 0.86, 0.235], 20));

  return {
    positions: new Float32Array(flat),
    totalVertices: flat.length / 3,
    groups,
  };
}

/**
 * Anchor points (world space) for the 3 scrolled-in callout labels — placed
 * on the parts that correspond to their copy: base/legs = intake, chassis =
 * triage (the "processing" mass of the machine), head = auto-reply (the
 * output). Consumed by RobotSceneContent's <Html> callouts.
 */
export const ROBOT_CALLOUTS: {
  id: string;
  label: string;
  anchor: [number, number, number];
  /** 0..1 progress at which this callout starts fading in. */
  revealAt: number;
}[] = [
  {
    id: "intake",
    label: "Lead intake",
    anchor: [-0.46, -1.15, 0.5],
    revealAt: 0.18,
  },
  { id: "triage", label: "AI triage", anchor: [0, 0.05, 0.42], revealAt: 0.55 },
  { id: "reply", label: "Auto-reply", anchor: [0, 0.86, 0.23], revealAt: 0.88 },
];
