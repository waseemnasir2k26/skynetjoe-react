/**
 * calc.ts — Speed-to-Lead Revenue Calculator math.
 *
 * ONLY two data points are drawn directly from published research:
 *   - 5-minute response  → index 1.00 (baseline / best practice)
 *   - 30-minute response → index 1/21 ≈ 0.0476, per the ~21x qualification-odds
 *     finding in Oldroyd, McElheran & Elkington, "The Short Life of Online
 *     Sales Leads," Harvard Business Review, March 2011 — analysis of roughly
 *     15,000 leads across 2,241 companies, contact data provided by
 *     InsideSales.com. That's a 2011 dataset: directional, not a live
 *     guarantee for any specific business today.
 *
 * Everything between/beyond those two points (the 24-hour anchor and the
 * interpolation) is a straight-line MODEL for illustration, clearly labeled
 * as such in the UI — not an additional independent data point from the
 * study. This file exposes the whole curve so the formula panel can render
 * it verbatim; nothing is hidden behind a black box.
 */

export type QualifyIndexPoint = {
  minutes: number;
  index: number;
  source: string;
};

export const QUALIFY_INDEX_POINTS: QualifyIndexPoint[] = [
  {
    minutes: 5,
    index: 1,
    source: "Baseline — responding within 5 minutes (best-practice anchor)",
  },
  {
    minutes: 30,
    index: 1 / 21,
    source:
      "Oldroyd et al., HBR 2011 — odds of qualifying a lead are ~21x higher within 5 minutes vs. after 30 minutes",
  },
  {
    minutes: 1440, // 24 hours
    index: 0.01,
    source:
      "Modeled floor for a 24-hour+ response — not a measured study data point",
  },
];

/** Piecewise-linear interpolation across QUALIFY_INDEX_POINTS. Clamped flat outside the range. */
export function qualifyIndexForMinutes(minutes: number): number {
  const pts = QUALIFY_INDEX_POINTS;
  if (minutes <= pts[0].minutes) return pts[0].index;
  if (minutes >= pts[pts.length - 1].minutes) return pts[pts.length - 1].index;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    if (minutes >= a.minutes && minutes <= b.minutes) {
      const t = (minutes - a.minutes) / (b.minutes - a.minutes);
      return a.index + t * (b.index - a.index);
    }
  }
  return pts[pts.length - 1].index;
}

export type CalcInputs = {
  leadsPerMonth: number;
  closeRatePct: number; // 0-100
  dealValue: number; // USD
  responseTimeMinutes: number;
};

export type CalcResult = {
  currentIndex: number;
  bestIndex: number;
  upliftRatio: number; // bestIndex / currentIndex
  impliedBestCloseRatePct: number; // capped
  extraDealsPerMonth: number;
  revenueAtRiskPerMonth: number;
  revenueAtRiskPerYear: number;
  ratio5vs60: number;
};

const ABSOLUTE_CLOSE_RATE_CAP_PCT = 95;
const MAX_UPLIFT_PCT_POINTS = 40; // modeling safety cap, not from the study

export function computeSpeedToLead(inputs: CalcInputs): CalcResult {
  const { leadsPerMonth, closeRatePct, dealValue, responseTimeMinutes } =
    inputs;
  const currentIndex = qualifyIndexForMinutes(responseTimeMinutes);
  const bestIndex = qualifyIndexForMinutes(5);
  const upliftRatio =
    currentIndex > 0 ? bestIndex / currentIndex : bestIndex / 0.0001;

  const rawImplied = closeRatePct * upliftRatio;
  const impliedBestCloseRatePct = Math.min(
    rawImplied,
    closeRatePct + MAX_UPLIFT_PCT_POINTS,
    ABSOLUTE_CLOSE_RATE_CAP_PCT,
  );

  const extraDealsPerMonth = Math.max(
    0,
    (leadsPerMonth * (impliedBestCloseRatePct - closeRatePct)) / 100,
  );
  const revenueAtRiskPerMonth = extraDealsPerMonth * dealValue;
  const revenueAtRiskPerYear = revenueAtRiskPerMonth * 12;

  const idx5 = qualifyIndexForMinutes(5);
  const idx60 = qualifyIndexForMinutes(60);
  const ratio5vs60 = idx60 > 0 ? idx5 / idx60 : idx5 / 0.0001;

  return {
    currentIndex,
    bestIndex,
    upliftRatio,
    impliedBestCloseRatePct,
    extraDealsPerMonth,
    revenueAtRiskPerMonth,
    revenueAtRiskPerYear,
    ratio5vs60,
  };
}

export function formatUsd(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function responseTimeLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  if (minutes < 1440) {
    const h = minutes / 60;
    return `${h % 1 === 0 ? h : h.toFixed(1)} hr${h === 1 ? "" : "s"}`;
  }
  const d = minutes / 1440;
  return `${d % 1 === 0 ? d : d.toFixed(1)} day${d === 1 ? "" : "s"}`;
}
