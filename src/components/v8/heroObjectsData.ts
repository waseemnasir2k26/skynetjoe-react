/**
 * The 5 hero "stack" objects — geometric primitives standing in for the
 * automation stack, each labeled with an HTML tag (drei <Html>). Shapes map
 * 1:1 to a rapier collider type so the physics body is exact, not an
 * approximation:
 *  - inbox    -> cuboid   (tray)
 *  - calendar -> cuboid   (flat slab)
 *  - chat     -> ball     (bubble)
 *  - gear     -> cylinder (disc)
 *  - lightning-> cone     (bolt)
 *
 * Spawn positions are deliberately on the right two-thirds of the scene
 * (x >= -0.4) — the left column is reserved for the SSR H1/sub/CTA and is
 * additionally hard-blocked by the invisible keep-out wall collider in
 * HeroPhysicsScene.tsx, so objects can physically never end up resting under
 * the copy.
 */
// Shared keep-out boundary: nothing may cross left of this world-x, ever —
// enforced by both the fixed wall collider (gravity/settle/collision, see
// HeroPhysicsScene.tsx) AND a hard clamp in HeroObject's drag handler
// (kinematic drag bodies bypass colliders entirely — a dragged object can be
// teleported anywhere unless the target position is clamped in code too).
export const HERO_KEEPOUT_X = -0.3;

export type HeroShape = "box" | "ball" | "cylinder" | "cone";

export type HeroObjectDef = {
  id: string;
  label: string;
  shape: HeroShape;
  /** box: [w,h,d] halfExtents*2 args. ball: [radius]. cylinder: [radius,height]. cone: [radius,height]. */
  args: number[];
  color: string;
  accent?: boolean;
  spawn: [number, number, number];
  spawnRot: [number, number, number];
};

export const HERO_OBJECTS: HeroObjectDef[] = [
  {
    id: "inbox",
    label: "Inbox",
    shape: "box",
    args: [0.62, 0.42, 0.42],
    color: "#f2efe6",
    spawn: [1.1, 5.2, -0.4],
    spawnRot: [0.4, 0.2, 0.1],
  },
  {
    id: "calendar",
    label: "Calendar",
    shape: "box",
    args: [0.5, 0.5, 0.12],
    color: "#eae5d6",
    spawn: [2.4, 6.4, 0.2],
    spawnRot: [0.1, 0.6, 0.3],
  },
  {
    id: "chat",
    label: "Chat",
    shape: "ball",
    args: [0.32],
    color: "#c66b3f",
    accent: true,
    spawn: [1.8, 4.4, -0.9],
    spawnRot: [0, 0, 0],
  },
  {
    id: "gear",
    label: "Automations",
    shape: "cylinder",
    args: [0.34, 0.26],
    color: "#1a1a1a",
    accent: true,
    spawn: [3.1, 5.8, -0.2],
    spawnRot: [0.3, 0.1, 0.5],
  },
  {
    id: "lightning",
    label: "Instant reply",
    shape: "cone",
    args: [0.28, 0.6],
    color: "#c66b3f",
    accent: true,
    spawn: [2.1, 7.2, 0.5],
    spawnRot: [0.2, 0.4, 0.9],
  },
];
