import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Logistics LP variants — preview index | SkynetLabs",
  description: "Internal preview of 5 new logistics LP variants (yasirbashir-inspired) for US small-fleet freight campaigns.",
  robots: { index: false, follow: false },
};

const VARIANTS = [
  {
    slug: "logistics-v1-glassmorphism",
    name: "V1 — Glassmorphism Ops",
    desc: "Dark navy + electric cyan, blurred glass cards, live shipment ticker, animated dot pulse, gradient pill kicker. Ops-product feel.",
    color: "#22e3ff",
    bg: "#070b1c",
    accent: "Glass · Cyan/Violet",
  },
  {
    slug: "logistics-v2-gradient",
    name: "V2 — Premium Gradient Hero",
    desc: "Bold purple → pink → orange gradient hero, Sora + Manrope, animated counter row, large rounded pricing cards. Modern SaaS premium tier.",
    color: "#ec4899",
    bg: "#0a0612",
    accent: "Gradient · Purple/Pink/Orange",
  },
  {
    slug: "logistics-v3-dashboard-mockup",
    name: "V3 — Linear-style Dashboard",
    desc: "Light gray + green accent. Hero IS a custom 3-column dashboard mockup w/ dispatch lanes, AI agent feed, factoring widget. Mercury / Linear DNA.",
    color: "#16a34a",
    bg: "#fafafa",
    accent: "Light · Linear",
  },
  {
    slug: "logistics-v4-cinematic-photo",
    name: "V4 — Cinematic Monochrome",
    desc: "Full-bleed grayscale poolside hero w/ orange spot accent. DM Serif Display headline, full-viewport hero, minimal premium feel.",
    color: "#ff8a3d",
    bg: "#08090b",
    accent: "Cinema · Mono + Orange",
  },
  {
    slug: "logistics-v5-3d-isometric",
    name: "V5 — 3D Isometric Illustration",
    desc: "Colorful blue/teal + orange. Inline SVG isometric scene: warehouse + truck + AI node + floating UI chips. Cards w/ depth and shadow.",
    color: "#0ea5e9",
    bg: "#f0f7ff",
    accent: "Isometric · Teal/Orange",
  },
];

export default function LogisticsLpIndex() {
  return (
    <div style={{ minHeight: "100vh", background: "#0b0b0b", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "64px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#22e3ff", marginBottom: 12 }}>Internal preview · noindex</p>
        <h1 style={{ fontSize: 44, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>Logistics LP Variants — Meta Ads 2026-06-01</h1>
        <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: 14, maxWidth: "70ch", lineHeight: 1.6 }}>
          5 distinct premium LP variants for US small-fleet freight (5–25 truck operators). Yasirbashir-inspired premium aesthetic. Each lives at its own route.
        </p>
        <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: 40, maxWidth: "70ch", lineHeight: 1.6, fontSize: 14 }}>
          Sibling campaign: <Link href="/lp/freight" style={{ color: "#7ee4ff" }}>/lp/freight</Link> (5 V1–V5 freight LPs from prior batch).
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          {VARIANTS.map((v) => (
            <Link key={v.slug} href={`/lp/${v.slug}`} style={{ background: v.bg, color: v.color, border: `1px solid ${v.color}`, padding: 24, textDecoration: "none", display: "block", transition: "transform 0.18s, box-shadow 0.18s", borderRadius: 8 }}>
              <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10, opacity: 0.7 }}>{v.slug}</div>
              <div style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12, opacity: 0.5 }}>{v.accent}</div>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>{v.name}</h2>
              <p style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.85 }}>{v.desc}</p>
              <div style={{ marginTop: 16, fontSize: 13, fontWeight: 600 }}>Open variant →</div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 56, padding: 24, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: "#22e3ff" }}>Test plan</h3>
          <ol style={{ paddingLeft: 20, lineHeight: 1.8, color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
            <li><strong>Phase A:</strong> V2 (gradient) + V4 (cinematic) — broad cold Meta, $80</li>
            <li><strong>Phase B:</strong> Phase A winner vs V1 (glass) — refined targeting, $120</li>
            <li><strong>Phase C:</strong> Phase B winner vs V3 (dashboard) — retargeting + LinkedIn, $100</li>
            <li><strong>V5:</strong> reserve for organic + warm retargeting (illustration-heavy, slower load)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
