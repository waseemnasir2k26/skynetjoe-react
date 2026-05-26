/**
 * USStatesMap — interactive SVG map of the 48 contiguous US states + DC.
 *
 * Server component. Pure inline SVG. Each <path> is wrapped in a Next.js
 * <Link> to /locations/[state-slug]. Hover + focus styling is pure CSS
 * (no client JS needed). Priority states (CA/TX/NY/FL/IL/PA/OH/GA) are
 * filled terracotta; the rest are cream-3 with 1.5px ink borders.
 *
 * Source of path data: src/components/locations/us-states-paths.ts
 * (parsed from Wikipedia Commons "Blank_US_Map_(states_only).svg", PD).
 */
import Link from "next/link";
import { STATES } from "@/lib/states";
import { PRIORITY_STATE_SLUGS } from "@/data/state-priority";
import {
  US_STATES_PATHS,
  US_STATES_SVG_VIEWBOX,
} from "./us-states-paths";

// Build abbr → slug + name map from canonical STATES list.
// (DC isn't in STATES — we still draw it but don't link it.)
const ABBR_TO_STATE = new Map(STATES.map((s) => [s.abbr, s]));
const PRIORITY_ABBRS = new Set(
  STATES.filter((s) => (PRIORITY_STATE_SLUGS as readonly string[]).includes(s.slug)).map(
    (s) => s.abbr,
  ),
);

export default function USStatesMap() {
  return (
    <div className="us-states-map-wrap">
      {/* Scoped CSS — server component compatible. */}
      <style>{`
        .us-states-map-wrap {
          width: 100%;
          max-width: 920px;
          margin: 0 auto;
        }
        .us-states-map-wrap svg {
          width: 100%;
          height: auto;
          display: block;
        }
        .us-states-map-wrap .state-path {
          fill: var(--cream-3);
          stroke: rgba(26, 26, 26, 0.18);
          stroke-width: 1.5;
          stroke-linejoin: round;
          transition: fill 0.18s ease, filter 0.18s ease, stroke 0.18s ease;
          cursor: pointer;
        }
        .us-states-map-wrap .state-path.is-priority {
          fill: var(--terracotta);
          filter: drop-shadow(0 0 3px rgba(198, 107, 63, 0.5));
          stroke: rgba(184, 90, 48, 0.55);
        }
        .us-states-map-wrap .state-path.is-dc {
          fill: var(--ink-faint);
          stroke: rgba(26, 26, 26, 0.18);
          cursor: default;
        }
        .us-states-map-wrap a:hover .state-path,
        .us-states-map-wrap a:focus-visible .state-path {
          fill: var(--ochre);
          filter: drop-shadow(0 0 4px rgba(201, 169, 110, 0.55));
        }
        .us-states-map-wrap a:focus-visible {
          outline: none;
        }
        .us-states-map-wrap a:focus-visible .state-path {
          stroke: var(--sage);
          stroke-width: 2;
        }
        .us-states-map-legend {
          display: flex;
          flex-wrap: wrap;
          gap: 18px 28px;
          justify-content: center;
          margin-top: 24px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--ink-2);
        }
        .us-states-map-legend .swatch {
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-right: 8px;
          vertical-align: middle;
          border-radius: 2px;
          border: 1px solid rgba(26, 26, 26, 0.18);
        }
        .us-states-map-legend .swatch.cream-3 { background: var(--cream-3); }
        .us-states-map-legend .swatch.terracotta {
          background: var(--terracotta);
          border-color: rgba(184, 90, 48, 0.55);
        }
        .us-states-map-legend .swatch.ochre {
          background: var(--ochre);
          border-color: rgba(201, 169, 110, 0.7);
        }
      `}</style>

      <svg
        viewBox={US_STATES_SVG_VIEWBOX}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Interactive map of the 48 contiguous US states served by SkynetLabs. Click any state for local intent landing page."
      >
        <title>SkynetLabs Coverage — 48 US States</title>
        {US_STATES_PATHS.map((p) => {
          const isDC = p.abbr === "DC";
          const state = ABBR_TO_STATE.get(p.abbr);
          const isPriority = PRIORITY_ABBRS.has(p.abbr);
          const classes = [
            "state-path",
            isPriority ? "is-priority" : "",
            isDC ? "is-dc" : "",
          ]
            .filter(Boolean)
            .join(" ");

          // DC has no /locations route — render unlinked.
          if (isDC || !state) {
            return (
              <path key={p.abbr} d={p.d} className={classes}>
                <title>{p.name}</title>
              </path>
            );
          }

          return (
            <Link
              key={p.abbr}
              href={`/locations/${state.slug}`}
              aria-label={`AI Automation in ${state.name}`}
            >
              <path d={p.d} className={classes}>
                <title>
                  {state.name}
                  {isPriority ? " (priority state)" : ""}
                </title>
              </path>
            </Link>
          );
        })}
      </svg>

      <div className="us-states-map-legend" aria-hidden="true">
        <span>
          <span className="swatch terracotta" />
          Priority state
        </span>
        <span>
          <span className="swatch cream-3" />
          Served
        </span>
        <span>
          <span className="swatch ochre" />
          Hover
        </span>
      </div>
    </div>
  );
}
