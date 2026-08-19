"use client";

import { useEffect, useRef } from "react";
import { GRAPH_NODES, GRAPH_NODES_MOBILE, layoutNode } from "./nodeGraphData";

type Pulse = { edgeIndex: number; t: number; speed: number };

/**
 * Decorative canvas layer, purely visual — pointer-events: none. Sits behind
 * <NodeGraphSVG>, which stays the real accessible/keyboard layer at all
 * times (never hidden). This canvas only adds: bezier edges, traveling
 * "data pulse" dots, and a soft cursor-proximity glow/attraction on nodes.
 *
 * Perf discipline:
 *  - mounts via requestIdleCallback (after first paint, so it never delays LCP)
 *  - rAF loop is delta-time capped (skips work if a frame took >50ms — tab
 *    was backgrounded) and fully stops on visibilitychange (hidden tab)
 *  - mobile (narrow viewport OR coarse pointer) uses the reduced node set
 *    and skips cursor-attraction math entirely (no real cursor on touch)
 *  - resize is handled via ResizeObserver + devicePixelRatio-aware backing
 *    store, not re-created every frame
 */
export default function NodeGraphCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isCoarse =
      typeof window !== "undefined" &&
      window.matchMedia?.("(pointer: coarse)").matches;
    const isNarrow = window.innerWidth < 768;
    const mobile = isCoarse || isNarrow;
    const nodes = mobile ? GRAPH_NODES_MOBILE : GRAPH_NODES;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Live (spring-eased) display positions per node, keyed by index —
    // this is what cursor attraction perturbs; edges/pulses always read
    // from these, so geometry stays self-consistent.
    const live = nodes.map((n) => {
      const p = layoutNode(n);
      return { baseX: p.x, baseY: p.y, x: p.x, y: p.y, glow: 0 };
    });
    const hubLive = { x: 0.5, y: 0.5 };

    let mouseX = -1;
    let mouseY = -1;
    let hasPointer = false;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.max(1, Math.round(width * dpr));
      canvas!.height = Math.max(1, Math.round(height * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = (e.clientY - rect.top) / rect.height;
      hasPointer = true;
    }
    function onLeave() {
      hasPointer = false;
    }
    if (!mobile) {
      window.addEventListener("mousemove", onMove, { passive: true });
      canvas.addEventListener("mouseleave", onLeave);
    }

    // Data pulses: a few per edge, staggered start, looping t 0->1.
    const pulses: Pulse[] = [];
    nodes.forEach((_, i) => {
      pulses.push({
        edgeIndex: i,
        t: Math.random(),
        speed: 0.16 + Math.random() * 0.1,
      });
      if (Math.random() > 0.5) {
        pulses.push({
          edgeIndex: i,
          t: Math.random(),
          speed: 0.16 + Math.random() * 0.1,
        });
      }
    });

    let raf = 0;
    let last = performance.now();
    let running = true;

    function bezierPoint(
      x1: number,
      y1: number,
      cx: number,
      cy: number,
      x2: number,
      y2: number,
      t: number,
    ) {
      const u = 1 - t;
      const x = u * u * x1 + 2 * u * t * cx + t * t * x2;
      const y = u * u * y1 + 2 * u * t * cy + t * t * y2;
      return { x, y };
    }

    function frame(now: number) {
      if (!running) return;
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.05) dt = 0.05; // clamp — tab was backgrounded / GC pause

      ctx!.clearRect(0, 0, width, height);

      const inkStroke = "rgba(26,26,26,0.16)";
      const rust = "#c66b3f";

      // Cursor proximity: spring live positions toward a subtle attraction
      // offset, and raise glow intensity for nearby nodes.
      live.forEach((node) => {
        let targetX = node.baseX;
        let targetY = node.baseY;
        let targetGlow = mobile
          ? 0.35 + 0.15 * Math.sin(now / 900 + node.baseX * 10)
          : 0;

        if (hasPointer) {
          const dx = mouseX - node.baseX;
          const dy = mouseY - node.baseY;
          const distPx = Math.hypot(dx * width, dy * height);
          const radius = 140; // px
          if (distPx < radius) {
            const strength = 1 - distPx / radius;
            targetX = node.baseX + dx * strength * 0.06;
            targetY = node.baseY + dy * strength * 0.06;
            targetGlow = strength;
          }
        }

        // Spring/lerp toward target — frame-rate independent-ish ease.
        const ease = 1 - Math.pow(0.001, dt);
        node.x += (targetX - node.x) * ease;
        node.y += (targetY - node.y) * ease;
        node.glow += (targetGlow - node.glow) * ease;
      });

      // Edges (bezier, from hub to each live node position).
      const edgeGeom = live.map((node) => {
        const x1 = hubLive.x * width;
        const y1 = hubLive.y * height;
        const x2 = node.x * width;
        const y2 = node.y * height;
        const cx = (x1 + x2) / 2 + (y1 - y2) * 0.08;
        const cy = (y1 + y2) / 2 + (x2 - x1) * 0.08;
        return { x1, y1, cx, cy, x2, y2 };
      });

      edgeGeom.forEach((g, i) => {
        const glow = live[i].glow;
        ctx!.beginPath();
        ctx!.moveTo(g.x1, g.y1);
        ctx!.quadraticCurveTo(g.cx, g.cy, g.x2, g.y2);
        ctx!.strokeStyle =
          glow > 0.05 ? `rgba(198,107,63,${0.18 + glow * 0.5})` : inkStroke;
        ctx!.lineWidth = glow > 0.05 ? 1.4 + glow * 1.2 : 1.2;
        ctx!.stroke();
      });

      // Node glow halos (soft radial), drawn under the SVG's own crisp marker.
      live.forEach((node) => {
        if (node.glow > 0.02) {
          const x = node.x * width;
          const y = node.y * height;
          const r = 26 + node.glow * 16;
          const grad = ctx!.createRadialGradient(x, y, 0, x, y, r);
          grad.addColorStop(0, `rgba(198,107,63,${0.28 * node.glow})`);
          grad.addColorStop(1, "rgba(198,107,63,0)");
          ctx!.fillStyle = grad;
          ctx!.beginPath();
          ctx!.arc(x, y, r, 0, Math.PI * 2);
          ctx!.fill();
        }
      });

      // Traveling data pulses along each edge.
      pulses.forEach((p) => {
        const g = edgeGeom[p.edgeIndex];
        if (!g) return;
        p.t += p.speed * dt;
        if (p.t > 1) p.t -= 1;
        const pt = bezierPoint(g.x1, g.y1, g.cx, g.cy, g.x2, g.y2, p.t);
        const fade = Math.sin(p.t * Math.PI); // fade in/out at ends
        ctx!.beginPath();
        ctx!.fillStyle = rust;
        ctx!.globalAlpha = 0.15 + fade * 0.75;
        ctx!.arc(pt.x, pt.y, 2.4, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalAlpha = 1;
      });

      raf = requestAnimationFrame(frame);
    }

    function onVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    }
    document.addEventListener("visibilitychange", onVisibility);

    raf = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      if (!mobile) {
        window.removeEventListener("mousemove", onMove);
        canvas.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
