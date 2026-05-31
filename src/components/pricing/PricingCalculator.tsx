"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Plus, Minus } from "lucide-react";
import { SERVICE_PRICING, type ServiceTier } from "@/lib/service-pricing";

type Selection = {
  serviceSlug: string;
  tierName: ServiceTier["name"];
  addonIds: string[];
  qty: number;
};

const emptySelection = (slug: string): Selection => ({
  serviceSlug: slug,
  tierName: "Pro",
  addonIds: [],
  qty: 1,
});

function fmt(n: number) {
  return `$${n.toLocaleString("en-US")}`;
}

// Shared field styles — 1px ink border, cream-3 bg
const FIELD_STYLE: React.CSSProperties = {
  padding: "10px 14px",
  background: "var(--cream-3)",
  border: "1px solid rgba(26,26,26,0.20)",
  color: "var(--ink)",
  fontFamily: "var(--font-sans)",
  fontSize: "0.875rem",
  borderRadius: 2,
  outline: "none",
};

export default function PricingCalculator() {
  const [rows, setRows] = useState<Selection[]>([
    emptySelection(SERVICE_PRICING[0].slug),
  ]);

  function updateRow(i: number, patch: Partial<Selection>) {
    setRows((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], ...patch };
      if (patch.serviceSlug) next[i].addonIds = [];
      return next;
    });
  }

  function addRow() {
    setRows((prev) => [...prev, emptySelection(SERVICE_PRICING[0].slug)]);
  }

  function removeRow(i: number) {
    setRows((prev) => prev.filter((_, idx) => idx !== i));
  }

  const totals = useMemo(() => {
    let oneTime = 0;
    let monthly = 0;
    for (const row of rows) {
      const svc = SERVICE_PRICING.find((s) => s.slug === row.serviceSlug);
      if (!svc) continue;
      const tier = svc.tiers.find((t) => t.name === row.tierName);
      if (!tier) continue;
      const base = tier.price * row.qty;
      if (tier.cadence === "monthly") monthly += base;
      else oneTime += base;
      for (const addonId of row.addonIds) {
        const addon = svc.addons.find((a) => a.id === addonId);
        if (!addon) continue;
        if (addon.cadence === "monthly") monthly += addon.price * row.qty;
        else oneTime += addon.price * row.qty;
      }
    }
    return { oneTime, monthly };
  }, [rows]);

  return (
    <section
      className="relative py-16 md:py-24"
      style={{
        background: "var(--cream-3)",
        borderTop: "1px solid rgba(26,26,26,0.10)",
      }}
    >
      <div className="container-x px-6 max-w-5xl mx-auto">
        <div className="mb-10">
          <div
            className="inline-flex items-center gap-3 mb-3"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--terracotta)",
            }}
          >
            <Calculator className="w-3.5 h-3.5" />
            — Pricing calculator
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              fontSize: "clamp(28px, 4vw, 40px)",
              lineHeight: 1.1,
              marginBottom: 12,
            }}
          >
            Stack services.{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "var(--terracotta)",
                fontWeight: 500,
              }}
            >
              See your real number.
            </em>
          </h2>
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--ink-2)",
              maxWidth: "44rem",
              lineHeight: 1.55,
            }}
          >
            Add any combination of services + add-ons. Total updates live. No
            sign-up. No email gate. Just an honest estimate before any call.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {rows.map((row, i) => {
            const svc =
              SERVICE_PRICING.find((s) => s.slug === row.serviceSlug) ??
              SERVICE_PRICING[0];
            return (
              <div
                key={i}
                style={{
                  padding: 22,
                  background: "var(--cream-2)",
                  border: "1px solid rgba(26,26,26,0.10)",
                }}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.16em",
                      color: "var(--terracotta)",
                      fontWeight: 600,
                    }}
                  >
                    — Line {i + 1}
                  </span>
                  {rows.length > 1 && (
                    <button
                      onClick={() => removeRow(i)}
                      className="inline-flex items-center gap-1"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6875rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "var(--oxblood)",
                        fontWeight: 600,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Minus className="w-3 h-3" />
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] gap-3 mb-4">
                  <label className="flex flex-col gap-1.5">
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65625rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: "var(--ink-faint)",
                        fontWeight: 600,
                      }}
                    >
                      Service
                    </span>
                    <select
                      value={row.serviceSlug}
                      onChange={(e) =>
                        updateRow(i, { serviceSlug: e.target.value })
                      }
                      style={FIELD_STYLE}
                    >
                      {SERVICE_PRICING.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.category} — {s.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65625rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: "var(--ink-faint)",
                        fontWeight: 600,
                      }}
                    >
                      Tier
                    </span>
                    <select
                      value={row.tierName}
                      onChange={(e) =>
                        updateRow(i, {
                          tierName: e.target.value as ServiceTier["name"],
                        })
                      }
                      style={FIELD_STYLE}
                    >
                      {svc.tiers.map((t) => (
                        <option key={t.name} value={t.name}>
                          {t.name} — {fmt(t.price)}
                          {t.cadence === "monthly" ? "/mo" : ""}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65625rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: "var(--ink-faint)",
                        fontWeight: 600,
                      }}
                    >
                      Qty
                    </span>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={row.qty}
                      onChange={(e) =>
                        updateRow(i, {
                          qty: Math.max(
                            1,
                            Math.min(20, Number(e.target.value) || 1)
                          ),
                        })
                      }
                      style={{ ...FIELD_STYLE, width: 80 }}
                    />
                  </label>
                </div>

                {svc.addons.length > 0 && (
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65625rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        color: "var(--ink-faint)",
                        fontWeight: 600,
                        marginBottom: 8,
                      }}
                    >
                      Add-ons
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {svc.addons.map((a) => {
                        const checked = row.addonIds.includes(a.id);
                        return (
                          <button
                            key={a.id}
                            onClick={() =>
                              updateRow(i, {
                                addonIds: checked
                                  ? row.addonIds.filter((id) => id !== a.id)
                                  : [...row.addonIds, a.id],
                              })
                            }
                            className="inline-flex items-center gap-2"
                            style={{
                              padding: "7px 12px",
                              fontFamily: "var(--font-sans)",
                              fontSize: "0.78125rem",
                              fontWeight: 500,
                              color: checked ? "var(--ink)" : "var(--ink-2)",
                              background: checked
                                ? "var(--cream-3)"
                                : "transparent",
                              border: `1px solid ${checked ? "var(--terracotta)" : "rgba(26,26,26,0.18)"}`,
                              borderLeft: checked
                                ? "3px solid var(--terracotta)"
                                : "1px solid rgba(26,26,26,0.18)",
                              cursor: "pointer",
                              transition: "all 0.18s",
                            }}
                          >
                            <span>{a.label}</span>
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                color: "var(--terracotta)",
                                fontWeight: 700,
                              }}
                            >
                              +{fmt(a.price)}
                              {a.cadence === "monthly" ? "/mo" : ""}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={addRow}
          className="mb-8 inline-flex items-center gap-2"
          style={{
            padding: "11px 18px",
            fontFamily: "var(--font-sans)",
            fontSize: "0.84375rem",
            fontWeight: 600,
            color: "var(--ink)",
            background: "transparent",
            border: "1px solid var(--ink)",
            borderRadius: 2,
            cursor: "pointer",
          }}
        >
          <Plus className="w-4 h-4" />
          Add another service
        </button>

        {/* Total card — terracotta */}
        <div
          style={{
            padding: 32,
            background: "var(--terracotta)",
            color: "var(--cream-3)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "rgba(250,247,240,0.85)",
                  marginBottom: 10,
                }}
              >
                — Estimated investment
              </div>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-3">
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 44,
                      fontWeight: 600,
                      color: "var(--cream-3)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {fmt(totals.oneTime)}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "rgba(250,247,240,0.8)",
                      marginLeft: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                    }}
                  >
                    one-time
                  </span>
                </div>
                {totals.monthly > 0 && (
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 28,
                        fontWeight: 500,
                        fontStyle: "italic",
                        color: "var(--cream-3)",
                      }}
                    >
                      + {fmt(totals.monthly)}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: "rgba(250,247,240,0.8)",
                        marginLeft: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                      }}
                    >
                      /month
                    </span>
                  </div>
                )}
              </div>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(250,247,240,0.88)",
                  maxWidth: "44ch",
                  lineHeight: 1.55,
                }}
              >
                Estimate only. Final scope locks on the call — usually within
                ±10% of this number. No surprise upsells.
              </p>
            </div>

            <Link
              href="/discovery-call"
              className="inline-flex items-center justify-center gap-2"
              style={{
                whiteSpace: "nowrap",
                padding: "18px 26px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.9375rem",
                fontWeight: 700,
                background: "var(--cream-3)",
                color: "var(--terracotta)",
                borderRadius: 2,
                border: "none",
              }}
            >
              Lock this scope on a call
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
