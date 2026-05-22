import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Freight LP variants — preview index | SkynetLabs",
  description: "Internal preview of 5 Meta Ads LP variants for US small-fleet freight campaign.",
  robots: { index: false, follow: false },
};

const VARIANTS = [
  { slug: "freight-v1-editorial", name: "V1 — Editorial Dark + Gold (funnel)", desc: "Dark+gold restructure: hero w/ live dispatch preview, 6 named clients, 2 photo testimonials, single CTA, scarcity ribbon, 4-question FAQ", color: "#d4af37", bg: "#0a0a0a" },
  { slug: "freight-v2-swiss", name: "V2 — Swiss / Stripe-tier", desc: "Linear/Stripe-anatomy: tight headline, dark product mockup under hero, 4-feature grid, dark comparison table vs agencies/dev/AI, single primary CTA", color: "#ff4a1c", bg: "#fafaf7" },
  { slug: "freight-v3-letter", name: "V3 — Founder Letter (untouched)", desc: "Long-scroll personal letter, Lora + Caveat handwriting, warm navy + gold (user's favourite — kept as-is)", color: "#c9985a", bg: "#f7f3ec" },
  { slug: "freight-v4-calculator", name: "V4 — ROI Calculator (funnel)", desc: "Terminal-green calc hero, trust strip, 2 testimonials w/ payback proof, public pricing table w/ inline CTAs, scarcity ribbon", color: "#00ff9c", bg: "#0d1117" },
  { slug: "freight-v5-cinematic", name: "V5 — Cinematic Video (funnel)", desc: "Cinema-red ken-burns hero, trust strip under hero, 90-sec video, 3 clip cards, 3-card offer grid, 2 italic-serif testimonials, pricing", color: "#d62828", bg: "#050505" },
];

export default function FreightLpIndex() {
  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0b", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7ee4ff", marginBottom: 12 }}>Internal preview · noindex</p>
        <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>Freight LP Variants — Meta Ads 2026-06-01</h1>
        <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: 40, maxWidth: "60ch", lineHeight: 1.6 }}>
          5 distinct premium LP variants. Each lives at its own route. Click to preview. Per-variant rationale + projected CTR/CVR in <code style={{ background: "rgba(255,255,255,0.08)", padding: "2px 6px", borderRadius: 4 }}>OneDrive/Desktop/meta-logistics-lp-variants/COMPARISON.md</code>.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
          {VARIANTS.map((v) => (
            <Link key={v.slug} href={`/lp/${v.slug}`} style={{ background: v.bg, color: v.color, border: `1px solid ${v.color}`, padding: 24, textDecoration: "none", display: "block", transition: "transform 0.18s, box-shadow 0.18s" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 12, opacity: 0.8 }}>{v.slug}</div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>{v.name}</h2>
              <p style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.85 }}>{v.desc}</p>
              <div style={{ marginTop: 16, fontSize: 13, fontWeight: 600 }}>Open variant →</div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 56, padding: 24, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: "#7ee4ff" }}>Launch order (from COMPARISON.md)</h3>
          <ol style={{ paddingLeft: 20, lineHeight: 1.8, color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
            <li><strong>Phase A (Days 1–4, $80):</strong> V3 + V5 in parallel</li>
            <li><strong>Phase B (Days 5–9, $120):</strong> Phase A winner vs V2</li>
            <li><strong>Phase C (Days 10–14, $100):</strong> Phase B winner vs V4 (retargeting)</li>
            <li><strong>V1:</strong> reserve for LinkedIn organic + warm retargeting, not cold Meta</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
