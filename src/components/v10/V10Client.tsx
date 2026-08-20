"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import MagneticButton from "@/components/home/MagneticButton";
import {
  C,
  CTA_URL,
  CTA_LABEL,
  H1_LINE1,
  H1_LINE2,
  SUB,
  PROOF_LINE,
  WORK,
  UTILITIES,
  DISTRICTS,
  EASE,
} from "./tokens";

/* ============================================================
   V10 — ALTITUDE ZERO (SkynetLabs edition). Scroll position = altitude.
   You open at 2,400m above a cloud deck and fall through four lit
   service districts to 0m — a street-level doorway, the CTA. Ported
   from waseemnasir-react's app/v/ai-city-2/AltitudeClient.tsx: identical
   architecture (default = static/SSR page, upgraded to a pinned
   scroll-scrubbed 3D descent when eligible), rebranded copy + palette.

   Hold-and-travel pacing lives in PinnedScene's crossfade windows below:
   each band spends its outer ~20%/20% fading text in/out and its middle
   ~60% fully readable — placards are never at full opacity while the
   camera is mid-fall between bands.

   Fonts are NOT loaded here — this route lives under the shared
   app/(skynet)/layout.tsx, which already sets --font-sans / --font-display
   (Inter) and --font-mono (IBM Plex Mono) on <html>; loading a second
   Google Fonts set here would be a duplicate-payload regression the
   source variant (a fully standalone route with its own layout) didn't
   have to avoid.
   ============================================================ */

const DescentCanvas = dynamic(() => import("./DescentCanvas"), {
  ssr: false,
});

type Mode = "static" | "3d";

function supportsWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(
      c.getContext("webgl2") ||
      c.getContext("webgl") ||
      c.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

/* SCENES = the 7 descent bands from the source's approved scroll
   choreography. TRUTH GATE: this build previously carried a live numeric
   altimeter (ALT 2400M, ALT 0M, per-district ALT ranges) — decorative HUD
   flavor, but still digits, and this site's house rule allows only 180+ /
   40+ / 9 / 2019 in any user-facing string. `stage` replaces every one of
   those numbers with a digit-free descent-narrative label (word-only HUD,
   same mono chrome) — the fiction survives as words instead of meters. */
const SCENES = [
  { id: "sky", stage: "ABOVE THE CLOUDS", label: "SKY" },
  { id: "punch", stage: "CLOUD DECK", label: "CLOUD PUNCH" },
  { id: "signal", stage: "UPPER DESCENT", label: "SIGNAL HEIGHTS" },
  { id: "pipeline", stage: "MID DESCENT", label: "PIPELINE ROW" },
  { id: "portal", stage: "LOWER DESCENT", label: "PORTAL QUARTER" },
  { id: "broadcast", stage: "STREET APPROACH", label: "BROADCAST BASIN" },
  { id: "touchdown", stage: "LANDED", label: "TOUCHDOWN" },
] as const;

type SceneId = (typeof SCENES)[number]["id"];
const DISTRICT_SCENE_IDS: SceneId[] = [
  "signal",
  "pipeline",
  "portal",
  "broadcast",
];

export default function V10Client() {
  const reduceOS = !!useReducedMotion();
  const [mode, setMode] = useState<Mode>("static");
  const [canvasFailed, setCanvasFailed] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Decided before paint so there is no visible flash between the SSR
  // static layout and the upgraded 3D layout. queueMicrotask defers the
  // setState call to a microtask (still resolves before the browser's
  // next paint under useLayoutEffect) — same idiom already used sitewide
  // in components/v8/HeroWorkshop.tsx to satisfy the no-synchronous-
  // setState-in-effect lint rule.
  useLayoutEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const noHover = window.matchMedia("(hover: none)").matches;
    const eligible = !reduceOS && !coarsePointer && !noHover && supportsWebGL();
    queueMicrotask(() => setMode(eligible ? "3d" : "static"));
  }, [reduceOS]);

  const is3D = mode === "3d" && !canvasFailed;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const surveyed = useDescentReceipt(is3D ? scrollYProgress : null);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .v10-root { font-synthesis: none; background: ${C.skyDark}; color-scheme: dark; }
        .v10-cta:active { transform: scale(0.97); }
        .v10-link { position: relative; }
        .v10-link::after { content:""; position:absolute; left:0; bottom:-3px; height:1px; width:100%;
          background:${C.jadeBright}; transform:scaleX(0); transform-origin:left; transition:transform .16s ease; }
        .v10-link:hover::after { transform:scaleX(1); }
        .v10-root :focus-visible { outline: 2px solid ${C.jadeBright}; outline-offset: 2px; border-radius: 4px; }
      `,
        }}
      />
      <div
        className="v10-root relative"
        style={{
          background: C.skyDark,
          color: C.body,
          fontFamily: "var(--font-sans)",
          overflowX: "clip",
        }}
      >
        {is3D && (
          <DescentCanvas
            progress={scrollYProgress}
            onContextLost={() => setCanvasFailed(true)}
          />
        )}

        <AltimeterRail progress={is3D ? scrollYProgress : null} />

        {/* One stable DOM node for the whole component lifetime — the
            scroll-progress target for useScroll above. Only its children
            switch between the pinned layout and the plain stacked
            fallback; the node identity never changes across the
            static -> 3d upgrade. */}
        <div
          ref={trackRef}
          style={{
            position: "relative",
            ...(is3D ? { height: `${SCENES.length * 100}vh` } : {}),
          }}
        >
          {is3D ? (
            <PinnedTrack progress={scrollYProgress} surveyed={surveyed} />
          ) : (
            <StaticTrack reduce={reduceOS} />
          )}
        </div>

        <V10Footer />
        <MobileCTA />
      </div>
    </>
  );
}

/* ============================================================
   THE DESCENT RECEIPT — session-only dwell tracker. Reads scroll
   progress every rAF-driven change event and accumulates elapsed time
   inside each district's altitude band. A district only qualifies once
   its dwell crosses 1.5s. No storage, no tracking claims — the value
   resets on refresh and never leaves this component.
   ============================================================ */
function useDescentReceipt(progress: MotionValue<number> | null) {
  const [surveyed, setSurveyed] = useState<SceneId[]>([]);
  const dwellRef = useRef<Record<string, number>>({});
  const lastRef = useRef<{ id: SceneId | null; at: number }>({
    id: null,
    at: 0,
  });

  useEffect(() => {
    if (!progress) return;
    const seg = 1 / SCENES.length;
    const idFor = (p: number): SceneId => {
      const i = Math.min(SCENES.length - 1, Math.floor(p / seg));
      return SCENES[i].id;
    };

    const settle = (now: number) => {
      const { id, at } = lastRef.current;
      if (id && DISTRICT_SCENE_IDS.includes(id)) {
        dwellRef.current[id] = (dwellRef.current[id] ?? 0) + (now - at);
        if (dwellRef.current[id] >= 1500) {
          setSurveyed((prev) => (prev.includes(id) ? prev : [...prev, id]));
        }
      }
    };

    const unsub = progress.on("change", (p) => {
      const now = performance.now();
      const id = idFor(p);
      if (id !== lastRef.current.id) {
        settle(now);
        lastRef.current = { id, at: now };
      }
    });
    return () => {
      settle(performance.now());
      unsub();
    };
  }, [progress]);

  return surveyed;
}

/* MiniNav (the source's own fixed brand + CTA bar) is intentionally NOT
   rendered here — this route lives inside the shared app/(skynet)/layout.tsx,
   which already renders a sitewide fixed Header (logo, nav, CTA) at z-50.
   The route-local MiniNav used to stack a second fixed header at z-40 under
   it, duplicating branding/CTA chrome — same deviation note as v9/v11. */

/* ============================================================
   THE DESCENT RAIL — pure HTML, fixed left edge on desktop. Doubles as
   click-nav: each band is an anchor. Reads a live descent-stage label off
   scroll progress in 3D mode (motionValue only, no re-renders) — word-only
   HUD, no altitude digits (truth gate); in static mode there is no fixed
   rail at all — StaticTrack's in-flow elevation strip covers that case
   instead, per the "no motion, no distraction" static-mode rule.
   ============================================================ */
function AltimeterRail({ progress }: { progress: MotionValue<number> | null }) {
  if (!progress) return null;
  return <AltimeterRailLive progress={progress} />;
}

function AltimeterRailLive({ progress }: { progress: MotionValue<number> }) {
  const stageText = useTransform(progress, (p) => {
    const i = Math.min(
      SCENES.length - 1,
      Math.floor(clampNum(p, 0, 1) * SCENES.length),
    );
    return SCENES[i].stage;
  }) as MotionValue<string>;
  const status = useTransform(progress, (p) =>
    p >= 0.995 ? "LANDED" : "DESCENDING",
  ) as MotionValue<string>;
  return (
    <div
      className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      aria-label="Descent rail — click a district to jump there"
    >
      <div
        className="rounded-2xl px-4 py-3"
        style={{
          fontFamily: "var(--font-mono)",
          background: "rgba(22,15,11,0.72)",
          border: `1px solid ${C.hairline}`,
          backdropFilter: "blur(10px)",
        }}
      >
        <motion.div style={{ color: C.jadeBright, fontSize: "0.85rem" }}>
          {stageText}
        </motion.div>
        <motion.div
          style={{ color: C.mute, fontSize: "0.6rem", letterSpacing: "0.08em" }}
        >
          {status}
        </motion.div>
      </div>
      <nav className="flex flex-col gap-1">
        {SCENES.filter((s) => s.id !== "sky" && s.id !== "punch").map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="v10-link rounded-lg px-3 py-1.5 uppercase transition-colors"
            style={{
              fontFamily: "var(--font-mono)",
              color: C.mute,
              fontSize: "0.62rem",
              letterSpacing: "0.06em",
              border: `1px solid ${C.hairline}`,
              background: "rgba(22,15,11,0.5)",
            }}
          >
            {s.stage} — {s.label}
          </a>
        ))}
      </nav>
    </div>
  );
}

function clampNum(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

/* ============================================================
   3D MODE — tall scroll track, sticky viewport, 7 crossfading HTML
   overlays synced to the same progress value driving the camera. Every
   section's real text stays in the DOM at all times.
   ============================================================ */
function PinnedTrack({
  progress,
  surveyed,
}: {
  progress: MotionValue<number>;
  surveyed: SceneId[];
}) {
  const total = SCENES.length;
  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      {SCENES.map((s, i) => (
        <PinnedScene
          key={s.id}
          id={s.id}
          i={i}
          total={total}
          progress={progress}
        >
          {sceneContent(s.id, surveyed)}
        </PinnedScene>
      ))}
    </div>
  );
}

function PinnedScene({
  id,
  i,
  total,
  progress,
  children,
}: {
  id: string;
  i: number;
  total: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const seg = 1 / total;
  const start = i * seg;
  const end = (i + 1) * seg;
  // Hold-and-travel contract: fade covers ~20% at each edge of the band,
  // leaving the middle ~60% fully readable ("hold") — placards never sit
  // at full opacity while the camera is still fast-falling ("travel").
  const fade = seg * 0.2;
  const opacity = useTransform(
    progress,
    i === 0
      ? [0, end - fade, end]
      : i === total - 1
        ? [start, start + fade, 1]
        : [start, start + fade, end - fade, end],
    i === 0 ? [1, 1, 0] : i === total - 1 ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(
    progress,
    [start, end],
    i === 0 ? [0, -20] : [20, -20],
  );
  // Live subscription (not a one-time progress.get() read at mount) — every
  // scene after the first must un-inert as scroll passes through its band,
  // or its links/CTAs stay unclickable and hidden from AT for the rest of
  // the session.
  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const isActive = (p: number) => p >= start - fade && p < end + fade;
    if (sectionRef.current)
      sectionRef.current.inert = !isActive(progress.get());
    const unsubscribe = progress.on("change", (p) => {
      if (sectionRef.current) sectionRef.current.inert = !isActive(p);
    });
    return unsubscribe;
  }, [progress, start, end, fade]);
  return (
    <motion.section
      id={id}
      aria-label={id}
      className="absolute inset-0 flex items-center"
      style={{ opacity, y, pointerEvents: "none" }}
      ref={sectionRef}
    >
      <div
        className="mx-auto w-full max-w-[1200px] px-5 sm:px-6"
        style={{ pointerEvents: "auto" }}
      >
        {children}
      </div>
    </motion.section>
  );
}

/* ============================================================
   STATIC MODE — the real fallback: normal document flow, no
   sticky/pin, no canvas. Same seven sections, same copy, a
   cross-section elevation strip (deterministic SVG) down the left
   margin whose active district band highlights via
   IntersectionObserver class toggles — CSS only, no JS loop.
   ============================================================ */
function StaticTrack({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative">
      <ElevationStrip />
      {SCENES.map((s) => (
        <section
          key={s.id}
          id={s.id}
          data-scene={s.id}
          className="elevation-watch mx-auto max-w-[1200px] px-5 py-20 sm:px-6 sm:py-24"
        >
          <RevealBlock reduce={reduce}>{sceneContent(s.id, [])}</RevealBlock>
        </section>
      ))}
    </div>
  );
}

/** Cross-section elevation strip — a thin fixed-left SVG column, deterministic
    heights, whose current band lights up on scroll via IntersectionObserver
    toggling a CSS class (no rAF, no motion loop). Hidden on small screens. */
function ElevationStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const bands = Array.from(
      strip.querySelectorAll<HTMLElement>("[data-band]"),
    );
    const sections = SCENES.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const band = bands.find((b) => b.dataset.band === id);
          if (band)
            band.dataset.active = entry.isIntersecting ? "true" : "false";
        });
      },
      { threshold: 0.5 },
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={stripRef}
      aria-hidden
      className="fixed left-2 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-1 lg:flex"
    >
      {SCENES.map((s) => (
        <div
          key={s.id}
          data-band={s.id}
          style={{
            width: 6,
            height: 30,
            borderRadius: 3,
            background: C.hairline,
            transition: "background .25s ease",
          }}
          className="elevation-band"
        />
      ))}
      <style
        dangerouslySetInnerHTML={{
          __html: `.elevation-band[data-active="true"] { background: ${C.jadeBright} !important; }`,
        }}
      />
    </div>
  );
}

function RevealBlock({
  children,
  reduce,
}: {
  children: React.ReactNode;
  reduce: boolean;
}) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 1, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ── shared mono label ── */
function Mono({
  children,
  color = C.mute,
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`uppercase ${className}`}
      style={{
        fontFamily: "var(--font-mono)",
        color,
        fontSize: "0.72rem",
        fontWeight: 500,
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </span>
  );
}

/* ── translucent night scrim + the "lit doorframe" motif: a 2px
   terracotta left border ── */
function Scrim({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        background: "rgba(22,15,11,0.62)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: `1px solid ${C.hairline}`,
        borderLeft: `2px solid ${C.jadeBright}`,
        borderRadius: 24,
      }}
    >
      {children}
    </div>
  );
}

function DistrictHeader({ survey }: { survey: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 10,
          height: 1,
          background: C.jadeBright,
        }}
      />
      <Mono color={C.jadeBright}>{survey}</Mono>
    </div>
  );
}

/* ============================================================
   SCENE CONTENT — identical copy in both modes.
   ============================================================ */
function sceneContent(id: SceneId, surveyed: SceneId[]) {
  switch (id) {
    case "sky":
      return <SkyScene />;
    case "punch":
      return <PunchScene />;
    case "signal":
      return <DistrictScene district={DISTRICTS[0]} />;
    case "pipeline":
      return <DistrictScene district={DISTRICTS[1]} />;
    case "portal":
      return <PortalScene />;
    case "broadcast":
      return <BroadcastScene />;
    case "touchdown":
      return <TouchdownScene surveyed={surveyed} />;
    default:
      return null;
  }
}

function SkyScene() {
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
      <div
        className="lg:col-span-7"
        style={{ paddingTop: "calc(var(--promo-h, 44px) + 4.5rem)" }}
      >
        <Scrim className="px-6 py-7 sm:px-8 sm:py-9">
          <Mono color={C.jadeBright}>AI automation that pays for itself</Mono>
          <h1
            className="mt-5"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)",
              lineHeight: 1.03,
              letterSpacing: "-0.026em",
              color: C.ink,
              maxWidth: "17ch",
            }}
          >
            {H1_LINE1} <span style={{ color: C.jadeBright }}>{H1_LINE2}</span>
          </h1>
          <p
            className="mt-6"
            style={{
              fontSize: "clamp(1rem,1.3vw,1.15rem)",
              lineHeight: 1.6,
              color: C.body,
              maxWidth: "52ch",
            }}
          >
            {SUB}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <MagneticButton>
              <Link
                href={CTA_URL}
                className="v10-cta inline-flex items-center rounded-full font-semibold transition-opacity hover:opacity-90"
                style={{
                  background: C.jade,
                  color: C.onDeep,
                  fontSize: "0.95rem",
                  padding: "0.8rem 1.6rem",
                }}
              >
                {CTA_LABEL}
              </Link>
            </MagneticButton>
            <a
              href="#signal"
              className="v10-link font-semibold"
              style={{ color: C.jadeBright, fontSize: "0.95rem" }}
            >
              See the city ↓
            </a>
          </div>
          <div className="mt-6">
            <Mono color={C.jadeBright}>ABOVE THE CLOUDS · DESCENDING</Mono>
          </div>
        </Scrim>
      </div>
      <div className="lg:col-span-5">
        <CloudIllustration />
      </div>
    </div>
  );
}

/** Decorative SVG cloud-deck-over-skyline graphic — stands in for the 3D
    scene when the canvas isn't mounted. Deterministic (no Math.random in
    JSX) so SSR and hydration render the same markup. */
function CloudIllustration() {
  const heights = [42, 68, 30, 84, 54, 96, 38, 72, 46, 62, 34, 80];
  return (
    <svg
      viewBox="0 0 320 220"
      aria-hidden
      role="presentation"
      style={{
        width: "100%",
        height: "auto",
        maxWidth: 420,
        display: "block",
        margin: "0 auto",
      }}
    >
      <rect x="0" y="0" width="320" height="220" fill={C.skyDark} />
      {heights.map((h, i) => {
        const w = 320 / heights.length;
        const x = i * w;
        const y = 190 - h;
        return (
          <g key={i}>
            <rect
              x={x + 2}
              y={y}
              width={w - 4}
              height={h}
              fill={C.card}
              stroke={C.hairline}
            />
            {Array.from({ length: Math.floor(h / 14) }).map((_, r) => (
              <rect
                key={r}
                x={x + 6}
                y={y + 6 + r * 14}
                width={w - 12}
                height={5}
                fill={(i + r) % 3 === 0 ? C.jadeBright : "transparent"}
                opacity={0.9}
              />
            ))}
          </g>
        );
      })}
      <rect x="0" y="188" width="320" height="2" fill={C.jade} opacity="0.5" />
      {/* cloud deck — two soft translucent bands, purely decorative */}
      <rect x="0" y="40" width="320" height="30" fill={C.ink} opacity="0.14" />
      <rect x="0" y="66" width="320" height="20" fill={C.ink} opacity="0.1" />
    </svg>
  );
}

function PunchScene() {
  return (
    <Scrim className="px-6 py-8 sm:px-8 sm:py-10">
      <DistrictHeader survey="CLOUD DECK · CLOUD PUNCH" />
      <h2
        className="mt-4"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(1.9rem,4vw,3rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.024em",
          color: C.ink,
          maxWidth: "22ch",
        }}
      >
        Through the deck. The systems are real.
      </h2>
      <div className="mt-8">
        <Mono color={C.jadeBright}>{PROOF_LINE}</Mono>
      </div>
    </Scrim>
  );
}

function DistrictScene({ district }: { district: (typeof DISTRICTS)[number] }) {
  return (
    <Scrim className="px-6 py-8 sm:px-8 sm:py-10">
      <DistrictHeader survey={district.survey} />
      <h2
        className="mt-4"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(1.9rem,4vw,3rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.024em",
          color: C.ink,
          maxWidth: "24ch",
        }}
      >
        {district.landmark} — {district.pitch}
      </h2>
      <div className="mt-6">
        <Link
          href={district.href}
          className="v10-link font-semibold"
          style={{
            fontFamily: "var(--font-mono)",
            color: C.jadeBright,
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {district.linkLabel} →
        </Link>
      </div>
      {district.id === "signal" && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {UTILITIES.map((u) => (
            <div
              key={u.id}
              className="flex flex-col gap-1 rounded-2xl px-4 py-5"
              style={{
                background: C.card,
                border: `1px solid ${C.hairline}`,
                boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
              }}
            >
              <Mono color={C.jadeBright}>{u.tag}</Mono>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  color: C.ink,
                  fontSize: "1.05rem",
                }}
              >
                {u.label}
              </span>
              <Mono>{u.sub}</Mono>
            </div>
          ))}
        </div>
      )}
    </Scrim>
  );
}

function PortalScene() {
  const d = DISTRICTS[2];
  // No WorkCard here. The EU logistics inbox-triage case (WORK[0]) used to
  // render inline right below the FreightOps landmark description, which
  // implied that case belonged to the FreightOps spec build — it doesn't;
  // FreightOps is a demo funnel, EU logistics is a separate live client.
  // Every WORK entry (including EU logistics) already appears together,
  // unattributed to any single district, in BroadcastScene's grid below.
  return (
    <Scrim className="px-6 py-8 sm:px-8 sm:py-10">
      <DistrictHeader survey={d.survey} />
      <h2
        className="mt-4"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(1.9rem,4vw,3rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.024em",
          color: C.ink,
          maxWidth: "24ch",
        }}
      >
        {d.landmark} — {d.pitch}
      </h2>
      <div className="mt-6">
        <Link
          href={d.href}
          className="v10-link font-semibold"
          style={{
            fontFamily: "var(--font-mono)",
            color: C.jadeBright,
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {d.linkLabel} →
        </Link>
      </div>
    </Scrim>
  );
}

function BroadcastScene() {
  const d = DISTRICTS[3];
  return (
    <Scrim className="px-6 py-8 sm:px-8 sm:py-10">
      <DistrictHeader survey={d.survey} />
      <h2
        className="mt-4"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: "clamp(1.9rem,4vw,3rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.024em",
          color: C.ink,
          maxWidth: "24ch",
        }}
      >
        {d.landmark} — {d.pitch}
      </h2>
      <div className="mt-6">
        <Link
          href={d.href}
          className="v10-link font-semibold"
          style={{
            fontFamily: "var(--font-mono)",
            color: C.jadeBright,
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {d.linkLabel} →
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {WORK.map((w) => (
          <WorkCard key={w.client} w={w} />
        ))}
      </div>
      <div className="mt-8">
        <Mono>Proof — {PROOF_LINE}</Mono>
      </div>
    </Scrim>
  );
}

function WorkCard({
  w,
  className = "",
}: {
  w: (typeof WORK)[number];
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-2xl p-6 ${className}`}
      style={{
        background: C.card,
        border: `1px solid ${C.hairline}`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <Mono>{w.client}</Mono>
        <span
          className="uppercase"
          style={{
            fontFamily: "var(--font-mono)",
            color: C.jadeBright,
            background: C.jadeTint,
            fontSize: "0.62rem",
            fontWeight: 500,
            letterSpacing: "0.08em",
            borderRadius: 999,
            padding: "0.25rem 0.6rem",
          }}
        >
          {w.status}
        </span>
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "1.5rem",
          color: C.jadeBright,
        }}
      >
        {w.metric}
      </div>
      <p style={{ color: C.body, fontSize: "0.92rem" }}>{w.note}</p>
      <p style={{ color: C.ink, fontWeight: 600, fontSize: "0.98rem" }}>
        {w.outcome}
      </p>
      <Mono color={C.jadeBright}>{w.mech}</Mono>
    </div>
  );
}

/* ============================================================
   THE DESCENT RECEIPT lives inside the touchdown dock card. Degrades to
   the plain locked dock copy when nothing qualifies (fresh session, fast
   scroll-through, or static mode — surveyed is always [] there).
   ============================================================ */
function TouchdownScene({ surveyed }: { surveyed: SceneId[] }) {
  const surveyedNames = useMemo(
    () =>
      DISTRICTS.filter((d) => surveyed.includes(d.id)).map((d) =>
        d.name.toUpperCase(),
      ),
    [surveyed],
  );
  return (
    <div
      className="mx-auto flex max-w-[640px] flex-col items-center gap-6 rounded-[28px] px-6 py-12 text-center sm:px-12"
      style={{
        background: "rgba(22,15,11,0.78)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: `1px solid ${C.hairline}`,
        boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
      }}
    >
      <Mono color={C.jadeBright}>TOUCHDOWN · LANDED</Mono>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(2rem,4.5vw,3.25rem)",
          lineHeight: 1.05,
          letterSpacing: "-0.026em",
          color: C.ink,
          maxWidth: "20ch",
        }}
      >
        Find your leak. We&apos;ll engineer it shut.
      </h2>
      {surveyedNames.length > 0 ? (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            color: C.mute,
            fontSize: "0.72rem",
          }}
        >
          SURVEYED: {surveyedNames.join(" · ")} → BOOK THE CHECK-UP FOR THESE
        </p>
      ) : null}
      <MagneticButton>
        <Link
          href={CTA_URL}
          className="v10-cta inline-flex items-center rounded-full font-semibold transition-opacity hover:opacity-90"
          style={{
            background: C.jade,
            color: C.onDeep,
            fontSize: "1rem",
            padding: "0.9rem 1.8rem",
          }}
        >
          {CTA_LABEL}
        </Link>
      </MagneticButton>
      <Mono>Free · no pitch</Mono>
    </div>
  );
}

/* ── footer — credits SkynetLabs per house rule ── */
function V10Footer() {
  return (
    <footer
      className="relative mt-8 border-t px-5 py-10 text-center sm:px-6"
      style={{ borderColor: C.hairline, background: C.card }}
    >
      <Mono>
        Built by{" "}
        <a
          href="https://waseemnasir.com"
          target="_blank"
          rel="noopener noreferrer"
          className="v10-link"
          style={{ color: C.jadeBright }}
        >
          SkynetLabs · waseemnasir.com
        </a>
      </Mono>
    </footer>
  );
}

function MobileCTA() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const el = document.getElementById("touchdown");
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => setHidden(!!e[0]?.isIntersecting),
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
      style={{
        transform: hidden ? "translateY(120%)" : "translateY(0)",
        transition: "transform .3s ease",
        padding: "10px 14px calc(10px + env(safe-area-inset-bottom))",
        background: "rgba(22,15,11,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: `1px solid ${C.hairline}`,
      }}
    >
      <Link
        href={CTA_URL}
        className="v10-cta flex w-full items-center justify-center rounded-full font-semibold"
        style={{
          background: C.jade,
          color: C.onDeep,
          fontSize: "0.95rem",
          minHeight: 46,
        }}
      >
        {CTA_LABEL}
      </Link>
    </div>
  );
}
