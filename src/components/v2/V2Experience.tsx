"use client";

import { useRef, type ReactNode } from "react";
import V2SceneLoader from "./V2SceneLoader";

/**
 * Sticky-pinned 3D backdrop + normal-flow content stacked on top of it.
 * This is a real, native-scroll page — the canvas is pinned via
 * `position: sticky` for the height of the whole experience (hero -> final
 * CTA) while `children` scroll over it in ordinary document flow. No
 * virtual/JS-driven scroll, no scroll-hijack: the browser's own scrollbar
 * and scroll speed are untouched.
 *
 * `children` render the actual sections (hero text, "what we automate"
 * cards, proof band, testimonials, final CTA) as real SSR'd HTML. Only
 * sections with a transparent/glass background let the canvas show
 * through; opaque sections (proof, testimonials) simply cover it, which is
 * also how the scene gets visually "paused" from the user's point of view
 * without unmounting it.
 */
export default function V2Experience({ children }: { children: ReactNode }) {
  const experienceRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={experienceRef} id="v2-experience" className="relative">
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <V2SceneLoader experienceRef={experienceRef} />
      </div>
      <div className="relative" style={{ zIndex: 10, marginTop: "-100vh" }}>
        {children}
      </div>
    </div>
  );
}
