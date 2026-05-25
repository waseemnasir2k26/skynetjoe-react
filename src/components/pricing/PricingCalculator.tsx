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

export default function PricingCalculator() {
  const [rows, setRows] = useState<Selection[]>([
    emptySelection(SERVICE_PRICING[0].slug),
  ]);

  function updateRow(i: number, patch: Partial<Selection>) {
    setRows((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], ...patch };
      // Reset addons if service changed
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
    <section className="relative py-16 md:py-24 border-t border-white/[0.08]">
      <div className="container-x px-6 max-w-5xl mx-auto">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-cyan-300 mb-3 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/25">
            <Calculator className="w-3 h-3" />
            Pricing calculator
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
            Stack services. See your real number.
          </h2>
          <p className="text-lg text-fg-muted max-w-2xl">
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
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 md:p-6"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-xs uppercase tracking-wider text-cyan-300 font-semibold">
                    Line {i + 1}
                  </span>
                  {rows.length > 1 && (
                    <button
                      onClick={() => removeRow(i)}
                      className="inline-flex items-center gap-1 text-xs text-rose-300 hover:text-rose-200 font-medium"
                    >
                      <Minus className="w-3 h-3" />
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] gap-3 mb-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-[11px] uppercase tracking-wider text-fg-faint font-semibold">
                      Service
                    </span>
                    <select
                      value={row.serviceSlug}
                      onChange={(e) =>
                        updateRow(i, { serviceSlug: e.target.value })
                      }
                      className="px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400/60"
                    >
                      {SERVICE_PRICING.map((s) => (
                        <option
                          key={s.slug}
                          value={s.slug}
                          className="bg-[#061827]"
                        >
                          {s.category} — {s.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-[11px] uppercase tracking-wider text-fg-faint font-semibold">
                      Tier
                    </span>
                    <select
                      value={row.tierName}
                      onChange={(e) =>
                        updateRow(i, {
                          tierName: e.target.value as ServiceTier["name"],
                        })
                      }
                      className="px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400/60"
                    >
                      {svc.tiers.map((t) => (
                        <option
                          key={t.name}
                          value={t.name}
                          className="bg-[#061827]"
                        >
                          {t.name} — {fmt(t.price)}
                          {t.cadence === "monthly" ? "/mo" : ""}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-[11px] uppercase tracking-wider text-fg-faint font-semibold">
                      Qty
                    </span>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={row.qty}
                      onChange={(e) =>
                        updateRow(i, {
                          qty: Math.max(1, Math.min(20, Number(e.target.value) || 1)),
                        })
                      }
                      className="w-20 px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400/60"
                    />
                  </label>
                </div>

                {svc.addons.length > 0 && (
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-fg-faint font-semibold mb-2">
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
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                              checked
                                ? "bg-cyan-500/20 border border-cyan-400/60 text-white"
                                : "bg-white/[0.03] border border-white/10 text-fg-muted hover:border-white/25 hover:text-white"
                            }`}
                          >
                            <span>{a.label}</span>
                            <span className="text-cyan-300 font-semibold">
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
          className="mb-8 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-cyan-300 border border-cyan-400/30 bg-cyan-500/10 hover:bg-cyan-500/15 transition"
        >
          <Plus className="w-4 h-4" />
          Add another service
        </button>

        {/* Total card */}
        <div
          className="rounded-3xl p-6 md:p-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(30,136,229,0.14) 0%, rgba(20,184,166,0.14) 100%)",
            border: "1px solid rgba(0, 212, 255, 0.35)",
            boxShadow: "0 30px 80px -20px rgba(0, 212, 255, 0.25)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
            <div className="space-y-2">
              <div className="text-[11px] uppercase tracking-wider text-cyan-300 font-semibold">
                Estimated investment
              </div>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <div>
                  <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                    {fmt(totals.oneTime)}
                  </span>
                  <span className="text-sm text-fg-muted ml-2">one-time</span>
                </div>
                {totals.monthly > 0 && (
                  <div>
                    <span className="text-2xl md:text-3xl font-bold text-cyan-200 tracking-tight">
                      + {fmt(totals.monthly)}
                    </span>
                    <span className="text-sm text-fg-muted ml-2">/month</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-fg-muted max-w-xl">
                Estimate only. Final scope locks on the call — usually within
                ±10% of this number. No surprise upsells.
              </p>
            </div>

            <Link
              href="/discovery-call"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white whitespace-nowrap transition-transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #1E88E5 0%, #14B8A6 100%)",
                boxShadow: "0 8px 28px rgba(0, 212, 255, 0.30)",
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
