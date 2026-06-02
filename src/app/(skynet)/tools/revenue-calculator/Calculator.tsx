"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronRight, Sparkles } from "lucide-react";

type SliderKey = "leads" | "deal" | "close" | "missed" | "hours" | "rate";

type SliderConfig = {
  key: SliderKey;
  label: string;
  unit: "count" | "usd" | "pct" | "hours";
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  description: string;
};

const SLIDERS: SliderConfig[] = [
  {
    key: "leads",
    label: "Monthly leads / inquiries",
    unit: "count",
    min: 10,
    max: 2000,
    step: 10,
    defaultValue: 50,
    description: "Total inbound leads or calls across all channels per month.",
  },
  {
    key: "deal",
    label: "Average deal size",
    unit: "usd",
    min: 50,
    max: 50000,
    step: 50,
    defaultValue: 500,
    description: "Average revenue per closed customer or job.",
  },
  {
    key: "close",
    label: "Current close rate",
    unit: "pct",
    min: 1,
    max: 80,
    step: 1,
    defaultValue: 12,
    description: "Percent of leads who become paying customers today.",
  },
  {
    key: "missed",
    label: "Percent of calls / leads missed",
    unit: "pct",
    min: 0,
    max: 80,
    step: 1,
    defaultValue: 35,
    description:
      "After-hours, lost-queue, never-followed-up. Honest estimate beats hopeful one.",
  },
  {
    key: "hours",
    label: "Hours per week on manual follow-ups",
    unit: "hours",
    min: 0,
    max: 60,
    step: 1,
    defaultValue: 12,
    description: "Time you or staff spend chasing leads, drafting replies, updating the CRM.",
  },
  {
    key: "rate",
    label: "Your hourly value",
    unit: "usd",
    min: 25,
    max: 500,
    step: 5,
    defaultValue: 75,
    description: "What an hour of your time is actually worth, not minimum wage.",
  },
];

const RECOVERY_RATE = 0.8; // 80% of missed leads recoverable
const HOURS_REDUCTION = 0.7; // 70% reduction of manual hours
const WEEKS_PER_MONTH = 4.33;

const fmtUSD = (v: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(v));

const fmtNum = (v: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    Math.round(v)
  );

function formatBySliderUnit(unit: SliderConfig["unit"], v: number): string {
  if (unit === "usd") return fmtUSD(v);
  if (unit === "pct") return `${v}%`;
  if (unit === "hours") return `${v} hrs`;
  return fmtNum(v);
}

function clampNum(v: number, min: number, max: number): number {
  if (Number.isNaN(v)) return min;
  return Math.max(min, Math.min(max, v));
}

function parseFromParams(
  params: URLSearchParams
): Record<SliderKey, number> {
  const out = {} as Record<SliderKey, number>;
  for (const s of SLIDERS) {
    const raw = params.get(s.key);
    const parsed = raw == null ? s.defaultValue : Number(raw);
    out[s.key] = clampNum(parsed, s.min, s.max);
  }
  return out;
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/**
 * Animated counter that smooth-interpolates to `value` over `duration` ms
 * using requestAnimationFrame. Snaps to value if prefers-reduced-motion.
 */
function CountUp({
  value,
  duration = 600,
  format,
  className,
}: {
  value: number;
  duration?: number;
  format: (v: number) => string;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    fromRef.current = display;
    startRef.current = null;

    const animate = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(1, elapsed / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const next = fromRef.current + (value - fromRef.current) * eased;
      setDisplay(next);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // We intentionally exclude `display` from deps so the animation starts from
    // the previous display value each time `value` changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration, reduced]);

  return <span className={className}>{format(display)}</span>;
}

export default function Calculator({ calUrl }: { calUrl: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRef = useRef(parseFromParams(searchParams));
  const [values, setValues] = useState<Record<SliderKey, number>>(
    initialRef.current
  );

  // Debounced URL sync — replace state, no scroll jump, no history pollution.
  const urlTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (urlTimer.current) clearTimeout(urlTimer.current);
    urlTimer.current = setTimeout(() => {
      const params = new URLSearchParams();
      for (const s of SLIDERS) {
        if (values[s.key] !== s.defaultValue) {
          params.set(s.key, String(values[s.key]));
        }
      }
      const qs = params.toString();
      router.replace(qs ? `?${qs}` : "?", { scroll: false });
    }, 250);
    return () => {
      if (urlTimer.current) clearTimeout(urlTimer.current);
    };
  }, [values, router]);

  const onChange = useCallback((key: SliderKey, raw: number) => {
    setValues((prev) => ({ ...prev, [key]: raw }));
  }, []);

  // LIVE MATH
  const math = useMemo(() => {
    const leads = values.leads;
    const dealSize = values.deal;
    const closeRate = values.close / 100;
    const missedRate = values.missed / 100;
    const manualHours = values.hours;
    const hourlyValue = values.rate;

    const currentMonthlyRevenue = leads * closeRate * dealSize;
    const missedRevenueMo = leads * missedRate * closeRate * dealSize;
    const wastedLaborMo = manualHours * WEEKS_PER_MONTH * hourlyValue;
    const totalMonthlyLeak = missedRevenueMo + wastedLaborMo;

    const recoveredRevenueMo = missedRevenueMo * RECOVERY_RATE;
    const savedLaborMo = wastedLaborMo * HOURS_REDUCTION;
    const totalMonthlyGain = recoveredRevenueMo + savedLaborMo;
    const annualGain = totalMonthlyGain * 12;

    return {
      currentMonthlyRevenue,
      missedRevenueMo,
      wastedLaborMo,
      totalMonthlyLeak,
      recoveredRevenueMo,
      savedLaborMo,
      totalMonthlyGain,
      annualGain,
    };
  }, [values]);

  // color tier based on annual gain
  const tier: "neutral" | "green" | "gold" =
    math.annualGain > 500_000
      ? "gold"
      : math.annualGain > 100_000
        ? "green"
        : "neutral";

  const tierGradient =
    tier === "gold"
      ? "linear-gradient(120deg, #fbbf24 0%, #f59e0b 100%)"
      : tier === "green"
        ? "linear-gradient(120deg, #34d399 0%, #10b981 100%)"
        : "linear-gradient(120deg, var(--terracotta) 0%, var(--ink) 100%)";

  // Magnitude-aware leak headline font size
  const leakMagnitude =
    math.totalMonthlyLeak > 100_000
      ? "text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
      : math.totalMonthlyLeak > 10_000
        ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
        : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl";

  return (
    <section className="section pt-8 md:pt-12 relative">
      <div className="container-x px-6">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-10 items-start">
          {/* CALCULATOR + RESULTS */}
          <div>
            {/* LEAK HEADLINE */}
            <div
              className="rounded-3xl p-6 md:p-10 mb-6 relative overflow-hidden"
              style={{
                background: "var(--cream-2)",
                border: "1px solid rgba(26,26,26,0.18)",
                backdropFilter: "blur(14px)",
              }}
            >
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Money lost right now
              </p>
              <CountUp
                value={math.totalMonthlyLeak}
                format={(v) => fmtUSD(v)}
                className={`${leakMagnitude} font-extrabold tracking-tight block leading-none mb-2`}
              />
              <p className="text-sm md:text-base text-[var(--ink-2)] mt-3">
                per month — across missed revenue and wasted labor
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: "var(--cream-3)",
                    border: "1px solid rgba(198, 107, 63, 0.35)",
                  }}
                >
                  <p className="text-[11px] uppercase tracking-wider text-[var(--terracotta-aa)] font-semibold mb-1">
                    Missed revenue / mo
                  </p>
                  <CountUp
                    value={math.missedRevenueMo}
                    format={(v) => fmtUSD(v)}
                    className="text-2xl md:text-3xl font-bold text-[var(--ink)] block"
                  />
                </div>
                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: "var(--cream-3)",
                    border: "1px solid rgba(26,26,26,0.12)",
                  }}
                >
                  <p className="text-[11px] uppercase tracking-wider text-[var(--terracotta-aa)] font-semibold mb-1">
                    Wasted labor / mo
                  </p>
                  <CountUp
                    value={math.wastedLaborMo}
                    format={(v) => fmtUSD(v)}
                    className="text-2xl md:text-3xl font-bold text-[var(--ink)] block"
                  />
                </div>
              </div>
            </div>

            {/* SLIDERS */}
            <div
              className="rounded-3xl p-6 md:p-8 mb-6"
              style={{
                background: "var(--cream-2)",
                border: "1px solid rgba(26,26,26,0.12)",
                backdropFilter: "blur(14px)",
              }}
            >
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-6">
                Your inputs · move the sliders
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                {SLIDERS.map((s) => {
                  const v = values[s.key];
                  const pct = ((v - s.min) / (s.max - s.min)) * 100;
                  return (
                    <div key={s.key} className="min-w-0">
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <label
                          htmlFor={`slider-${s.key}`}
                          className="text-sm font-semibold text-[var(--ink)] truncate"
                        >
                          {s.label}
                        </label>
                        <span className="text-base md:text-lg font-extrabold text-[var(--terracotta-aa)] tabular-nums whitespace-nowrap">
                          {formatBySliderUnit(s.unit, v)}
                        </span>
                      </div>
                      <input
                        id={`slider-${s.key}`}
                        type="range"
                        min={s.min}
                        max={s.max}
                        step={s.step}
                        value={v}
                        onChange={(e) =>
                          onChange(s.key, Number(e.target.value))
                        }
                        className="rc-range w-full"
                        aria-label={s.label}
                        style={
                          {
                            "--rc-fill": `${pct}%`,
                          } as React.CSSProperties
                        }
                      />
                      <p className="text-xs text-[var(--ink-faint)] mt-1.5 leading-snug">
                        {s.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RECOVERY HEADLINE */}
            <div
              className="rounded-3xl p-6 md:p-10 mb-6 relative overflow-hidden"
              style={{
                background: "var(--cream-2)",
                border: "1px solid rgba(26,26,26,0.18)",
                backdropFilter: "blur(14px)",
              }}
            >
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                With SkynetLabs · net recovery
              </p>

              <div className="grid sm:grid-cols-2 gap-5 mb-6">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--terracotta-aa)] font-semibold mb-1">
                    Recovered / mo
                  </p>
                  <CountUp
                    value={math.totalMonthlyGain}
                    format={(v) => fmtUSD(v)}
                    className="text-3xl md:text-4xl font-bold text-[var(--ink)] block"
                  />
                  <p className="text-xs text-[var(--ink-faint)] mt-1">
                    {fmtUSD(math.recoveredRevenueMo)} revenue +{" "}
                    {fmtUSD(math.savedLaborMo)} labor
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-xs uppercase tracking-wider text-[var(--terracotta-aa)] font-semibold mb-1">
                    Net annual gain
                  </p>
                  <CountUp
                    value={math.annualGain}
                    format={(v) => fmtUSD(v)}
                    className="text-4xl md:text-6xl font-extrabold tracking-tight leading-none block"
                    duration={700}
                  />
                  <div
                    aria-hidden
                    className="hidden"
                    style={{ background: tierGradient }}
                  />
                  <p
                    className="text-sm font-semibold mt-2 inline-block px-3 py-1 rounded-full"
                    style={{
                      background:
                        tier === "gold"
                          ? "rgba(251, 191, 36, 0.15)"
                          : tier === "green"
                            ? "rgba(52, 211, 153, 0.15)"
                            : "rgba(198,107,63,0.15)",
                      color:
                        tier === "gold"
                          ? "#fbbf24"
                          : tier === "green"
                            ? "#34d399"
                            : "var(--terracotta)",
                      border: `1px solid ${
                        tier === "gold"
                          ? "rgba(251, 191, 36, 0.40)"
                          : tier === "green"
                            ? "rgba(52, 211, 153, 0.40)"
                            : "rgba(198,107,63,0.40)"
                      }`,
                    }}
                  >
                    {tier === "gold"
                      ? "Elite tier · >$500k/yr"
                      : tier === "green"
                        ? "Strong tier · >$100k/yr"
                        : "Sizing tier"}
                  </p>
                </div>
              </div>

              <p className="text-xs md:text-sm text-[var(--ink-faint)] leading-relaxed">
                Estimates based on average outcomes from 240+ AI automations
                shipped since 2019. Your mileage varies — book a free call to
                get a real number for your business.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href={calUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <Sparkles className="w-4 h-4" />
                  Get my custom recovery plan
                </a>
                <Link href="/case-studies" className="btn-ghost">
                  See real case studies
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* HOW WE CALCULATED THIS */}
            <details
              className="group rounded-2xl p-5 md:p-6"
              style={{
                background: "var(--cream-2)",
                border: "1px solid rgba(26,26,26,0.12)",
                backdropFilter: "blur(14px)",
              }}
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-base font-semibold text-[var(--ink)]">
                <span>How we calculated this</span>
                <ChevronDown className="w-5 h-5 text-[var(--terracotta-aa)] transition-transform group-open:rotate-180 shrink-0" />
              </summary>
              <div className="mt-4 space-y-3 text-sm text-[var(--ink-2)] leading-relaxed">
                <p>
                  <strong className="text-[var(--ink)]">Missed revenue per month</strong> ={" "}
                  leads × missed_rate × close_rate × deal_size. If you get 50
                  leads, miss 35% of them, would close 12%, at $500 a deal —
                  that&apos;s 50 × 0.35 × 0.12 × $500 = $1,050 a month walking
                  out the door.
                </p>
                <p>
                  <strong className="text-[var(--ink)]">Wasted labor per month</strong> ={" "}
                  manual_hours × 4.33 weeks × hourly_value. 12 hrs/wk × 4.33 ×
                  $75/hr = $3,897/month on follow-ups you should not be doing.
                </p>
                <p>
                  <strong className="text-[var(--ink)]">Recovered revenue</strong> = 80%
                  of missed_revenue. After-hours auto-reply, AI voice-pickup
                  and inbox triage reliably recapture 4 out of 5 leads that
                  went silent.
                </p>
                <p>
                  <strong className="text-[var(--ink)]">Saved labor</strong> = 70% of
                  wasted_hours × hourly_value. Automation handles the routine
                  follow-up sequences, CRM data entry and email triage. The
                  remaining 30% is the human-judgment work that should never be
                  automated.
                </p>
                <p>
                  <strong className="text-[var(--ink)]">Net annual gain</strong> =
                  (recovered + saved) × 12. Calibrated against 240+ live
                  automations shipped from Bali since 2019.
                </p>
              </div>
            </details>
          </div>

          {/* STICKY SIDEBAR (desktop only) */}
          <aside className="hidden lg:block lg:sticky lg:top-24">
            <div
              className="rounded-3xl p-6"
              style={{
                background: "var(--cream-2)",
                border: "1px solid rgba(26,26,26,0.18)",
                backdropFilter: "blur(14px)",
              }}
            >
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--terracotta-aa)] font-semibold mb-3">
                Live · your annual gain
              </p>
              <CountUp
                value={math.annualGain}
                format={(v) => fmtUSD(v)}
                className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-none block mb-3"
                duration={700}
              />
              <p className="text-xs text-[var(--ink-faint)] mb-5 leading-relaxed">
                Updates as you move the sliders. Bookmark or share the URL to
                save these inputs.
              </p>
              <a
                href={calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center"
              >
                Book the call
              </a>
              <Link
                href="/case-studies"
                className="btn-ghost w-full justify-center mt-3"
              >
                Case studies
              </Link>
              <div
                className="mt-5 pt-5 grid grid-cols-2 gap-3"
                style={{ borderTop: "1px dashed rgba(26,26,26,0.18)" }}
              >
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--terracotta-aa)]/80">
                    Lost / mo
                  </p>
                  <p className="text-base font-bold text-[var(--ink)] tabular-nums">
                    {fmtUSD(math.totalMonthlyLeak)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--terracotta-aa)]/80">
                    Gain / mo
                  </p>
                  <p className="text-base font-bold text-[var(--ink)] tabular-nums">
                    {fmtUSD(math.totalMonthlyGain)}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* MOBILE FIXED BOTTOM BAR */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-3"
        style={{
          background:
            "linear-gradient(180deg, rgba(242,239,230,0) 0%, rgba(242,239,230,0.95) 35%, rgba(242,239,230,0.98) 100%)",
        }}
      >
        <div
          className="rounded-2xl p-3 flex items-center gap-3"
          style={{
            background: "var(--cream-3)",
            border: "1px solid rgba(26,26,26,0.18)",
            boxShadow: "0 -8px 30px rgba(26,26,26,0.18)",
          }}
        >
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-[var(--terracotta-aa)]">
              Annual gain
            </p>
            <p className="text-lg font-extrabold text-[var(--ink)] truncate tabular-nums">
              {fmtUSD(math.annualGain)}
            </p>
          </div>
          <a
            href={calUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg font-semibold text-sm text-[var(--cream-3)] shrink-0 hover:opacity-90 transition"
            style={{
              background: "var(--terracotta)",
            }}
          >
            Book call
          </a>
        </div>
      </div>

      {/* slider CSS */}
      <style>{`
        .rc-range {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          height: 28px;
          cursor: pointer;
        }
        .rc-range:focus { outline: none; }
        .rc-range::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(
            90deg,
            var(--terracotta) 0%,
            var(--terracotta) var(--rc-fill, 50%),
            rgba(26,26,26,0.12) var(--rc-fill, 50%),
            rgba(26,26,26,0.12) 100%
          );
          border: 1px solid rgba(26,26,26,0.18);
        }
        .rc-range::-moz-range-track {
          height: 8px;
          border-radius: 999px;
          background: rgba(26,26,26,0.12);
          border: 1px solid rgba(26,26,26,0.18);
        }
        .rc-range::-moz-range-progress {
          height: 8px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--terracotta) 0%, var(--terracotta) 100%);
        }
        .rc-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid var(--terracotta);
          margin-top: -8px;
          box-shadow: 0 4px 14px rgba(198, 107, 63, 0.40),
            0 0 0 4px rgba(26,26,26,0.12);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .rc-range::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid var(--terracotta);
          box-shadow: 0 4px 14px rgba(198, 107, 63, 0.40),
            0 0 0 4px rgba(26,26,26,0.12);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .rc-range:hover::-webkit-slider-thumb,
        .rc-range:focus::-webkit-slider-thumb { transform: scale(1.08); }
        .rc-range:hover::-moz-range-thumb,
        .rc-range:focus::-moz-range-thumb { transform: scale(1.08); }
        @media (prefers-reduced-motion: reduce) {
          .rc-range::-webkit-slider-thumb,
          .rc-range::-moz-range-thumb { transition: none; }
        }
      `}</style>
    </section>
  );
}
