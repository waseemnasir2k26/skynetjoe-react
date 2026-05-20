import HeroVariant, { type HeroVariantProps } from "@/components/heroes/HeroVariant";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Hero Lab — 12 hero variants",
  description: "Internal hero section variants. Waseem picks 1, we ship.",
  robots: { index: false, follow: false },
};

const VARIANTS: HeroVariantProps[] = [
  {
    id: 1,
    archetype: "Anti-agency wedge",
    lever: "Anti-agency",
    headline: (
      <>
        You don&apos;t need an agency.
        <br />
        You need <span className="gradient-text">the person who ships.</span>
      </>
    ),
    sub: "One operator. Claude as engineering cofounder. Live in 5 to 14 days.",
    primaryCta: { label: "Start a project", href: "/contact" },
    secondaryCta: { label: "See what I've shipped", href: SITE.social.github },
    visualNote: "Black canvas, white serif headline, blinking terminal cursor under the period",
    style: "default",
  },
  {
    id: 2,
    archetype: "AI-cofounder thesis",
    lever: "AI-cofounder",
    headline: (
      <>
        I work with Claude.
        <br />
        <span className="gradient-text">That&apos;s the whole team.</span>
      </>
    ),
    sub: "Solo founder plus a 1M-context AI engineer. n8n, Next.js, WhatsApp, AEO — shipped across nine countries.",
    primaryCta: { label: "Brief me", href: "/contact" },
    secondaryCta: { label: "Open the GitHub", href: SITE.social.github },
    visualNote: "Split portrait + Claude `/` glyph, gold hairline divider",
    style: "split",
  },
  {
    id: 3,
    archetype: "Quantified outcome",
    lever: "Speed + specificity",
    headline: (
      <>
        Brief to live site in <span className="gradient-text">fourteen days.</span>
        <br />
        Sometimes five.
      </>
    ),
    sub: "n8n automations, Next.js sites, voice agents. One operator, nine countries, zero account managers.",
    primaryCta: { label: "See the queue", href: "/contact" },
    secondaryCta: { label: "Recent projects", href: "/case-studies" },
    visualNote: "Calendar strip showing brief → ship dates",
    style: "default",
  },
  {
    id: 4,
    archetype: "Bold contrarian one-liner",
    lever: "Contrarian",
    headline: (
      <>
        Agencies sell hours.
        <br />
        <span className="gradient-text">I sell finished work.</span>
      </>
    ),
    sub: "Fixed scope, fixed price, shipped in days. Built by one operator with an AI cofounder.",
    primaryCta: { label: "Send a brief", href: "/contact" },
    secondaryCta: { label: "Portfolio", href: "/portfolio" },
    visualNote: "Single line of monospace text on cream background, no other elements",
    style: "minimal",
  },
  {
    id: 5,
    archetype: "Built-in-Bali geo",
    lever: "Location as proof",
    headline: (
      <>
        Built in Bali.
        <br />
        Shipped to <span className="gradient-text">nine countries.</span>
      </>
    ),
    sub: "Async by default, lean by design. Next.js, n8n, WhatsApp, voice agents — delivered by the person who built them.",
    primaryCta: { label: "Work with me", href: "/contact" },
    secondaryCta: { label: "Case studies", href: "/case-studies" },
    visualNote: "Wide photo of Bali workspace, code overlay top-right",
    style: "split",
  },
  {
    id: 6,
    archetype: "Niche call-out",
    lever: "Niche specificity",
    headline: (
      <>
        Automations for service businesses
        <br />
        <span className="gradient-text">that hate logging into things.</span>
      </>
    ),
    sub: "Dental, mining-logistics, recovery clinics, dealerships. n8n + WhatsApp + CRM glue, built by one operator.",
    primaryCta: { label: "Book a fit call", href: "/contact" },
    secondaryCta: { label: "See vertical work", href: "/case-studies" },
    visualNote: "Four named vertical tiles, one per case study",
    style: "default",
  },
  {
    id: 7,
    archetype: "Loss-framed",
    lever: "Loss aversion",
    headline: (
      <>
        Every week without automation
        <br />
        <span className="gradient-text">costs you a hire</span> you didn&apos;t need to make.
      </>
    ),
    sub: "I build the workflow that replaces the hire. n8n, voice agents, CRM, AEO. Live in two weeks.",
    primaryCta: { label: "Audit my workflow", href: "/contact" },
    secondaryCta: { label: "See the stack", href: "/services" },
    visualNote: "Split: empty desk left, dashboard right",
    style: "split",
  },
  {
    id: 8,
    archetype: "Curiosity hook",
    lever: "Curiosity",
    headline: (
      <>
        What if your CRM <span className="gradient-text">filled itself in?</span>
      </>
    ),
    sub: "That's the kind of automation I build. n8n, WhatsApp, voice — connected to the tools you already pay for.",
    primaryCta: { label: "Show me how", href: "/contact" },
    secondaryCta: { label: "Recent builds", href: "/case-studies" },
    visualNote: "Animated form auto-filling field by field",
    style: "default",
  },
  {
    id: 9,
    archetype: "Operator manifesto",
    lever: "Operator-pride",
    headline: (
      <>
        No standups. No account managers.
        <br />
        No deck reviews. <span className="gradient-text">Just shipped work.</span>
      </>
    ),
    sub: "One operator. AI cofounder. Nine countries, dozens of projects, two-week median ship.",
    primaryCta: { label: "Start a project", href: "/contact" },
    secondaryCta: { label: "What I've built", href: SITE.social.github },
    visualNote: "Bullet list rendered as terminal output",
    style: "bold",
  },
  {
    id: 10,
    archetype: "Visual-first",
    lever: "Demo-as-headline",
    headline: (
      <>
        Watch a CRM <span className="gradient-text">build itself.</span>
      </>
    ),
    sub: "n8n, Next.js, voice agents — shipped end-to-end by one operator with an AI cofounder.",
    primaryCta: { label: "Send a brief", href: "/contact" },
    secondaryCta: { label: "Open the GitHub", href: SITE.social.github },
    visualNote: "Auto-playing 12-second screencap of a real n8n flow firing",
    style: "split",
  },
  {
    id: 11,
    archetype: "Named-client proof",
    lever: "Anchored proof",
    headline: (
      <>
        Built for clinics in Seattle,
        <br />
        logistics in Paris,
        <br />
        <span className="gradient-text">dealerships in Lahore.</span>
      </>
    ),
    sub: "One operator. AI cofounder. Next.js, n8n, voice agents, AEO.",
    primaryCta: { label: "Work with me", href: "/contact" },
    secondaryCta: { label: "Case studies", href: "/case-studies" },
    visualNote: "Three city-named cards with project thumbnails",
    style: "cream",
  },
  {
    id: 12,
    archetype: "Terminal aesthetic",
    lever: "Status + dev-cred",
    headline: (
      <>
        <span className="gradient-primary-text">$ skynetlabs deploy</span>
        <br />
        <span className="text-fg-muted">--solo --ai-cofounder</span>
      </>
    ),
    sub: "A one-operator studio shipping n8n automations, Next.js sites, and voice agents in days, not quarters.",
    primaryCta: { label: "Run a brief", href: "/contact" },
    secondaryCta: { label: "cat ./projects", href: SITE.social.github },
    visualNote: "Pure terminal hero, blinking cursor, monospace only",
    style: "terminal",
  },

  // ============================================
  // ROUND 2 — HYBRIDS of V1 + V2 + V11 DNA
  // (anti-agency × AI-cofounder × named-geo proof)
  // ============================================

  {
    id: 13,
    archetype: "Anti-agency × named-geo",
    lever: "Wedge + anchored proof",
    headline: (
      <>
        Not an agency.
        <br />
        The operator who built <span className="gradient-text">a dental flagship in NY,</span>
        <br />
        a voice agent in Paris, a recovery site in Seattle.
      </>
    ),
    sub: "One operator. Claude as engineering cofounder. The person you message is the person writing the code.",
    primaryCta: { label: "Start a project", href: "/contact" },
    secondaryCta: { label: "See the work on GitHub", href: SITE.social.github },
    visualNote: "Three city-flag tiles below headline, each linking to its case study",
    style: "default",
  },
  {
    id: 14,
    archetype: "AI-cofounder × named-geo",
    lever: "Honest AI + anchored proof",
    headline: (
      <>
        Two cofounders.
        <br />
        <span className="gradient-text">One human in Bali. One AI in your laptop.</span>
      </>
    ),
    sub: "Together we shipped dental flagships in SoHo, French voice agents in Paris, recovery sites in Seattle. Brief on Monday, live by next Friday.",
    primaryCta: { label: "Brief me", href: "/contact" },
    secondaryCta: { label: "Open the GitHub", href: SITE.social.github },
    visualNote: "Split: Bali workspace photo left, terminal w/ Claude `/` glyph right",
    style: "split",
  },
  {
    id: 15,
    archetype: "Honest-AI wedge",
    lever: "Contrarian transparency",
    headline: (
      <>
        I&apos;m honest about working with Claude.
        <br />
        <span className="gradient-text">Every other agency hides it.</span>
      </>
    ),
    sub: "Solo operator + 1M-context AI engineer = ten times the throughput, none of the agency overhead. Shipped across nine countries.",
    primaryCta: { label: "Send a brief", href: "/contact" },
    secondaryCta: { label: "See the work", href: SITE.social.github },
    visualNote: "Bold serif headline on cream, subtle Claude `/` watermark bottom-right",
    style: "bold",
  },
  {
    id: 16,
    archetype: "Direct-line manifesto",
    lever: "Anti-agency + transparency",
    headline: (
      <>
        The person taking your brief
        <br />
        is the person <span className="gradient-text">writing the code.</span>
      </>
    ),
    sub: "No account managers. No discovery deck. Claude is my engineering cofounder. Bali is my office. You get the work — direct.",
    primaryCta: { label: "Start a project", href: "/contact" },
    secondaryCta: { label: "What I&apos;ve built", href: SITE.social.github },
    visualNote: "Minimal centered text, single arrow CTA below, no decorative elements",
    style: "minimal",
  },
  {
    id: 17,
    archetype: "Specificity stack",
    lever: "Quantified proof + anti-agency",
    headline: (
      <>
        One operator.
        <br />
        One AI cofounder.
        <br />
        <span className="gradient-text">Nine countries shipped.</span>
      </>
    ),
    sub: "Built sites and automations for clinics in Seattle, logistics in Paris, dealerships in Lahore, recovery in PNW. Median ship: 14 days. Direct line, always.",
    primaryCta: { label: "Work with me", href: "/contact" },
    secondaryCta: { label: "Case studies", href: "/case-studies" },
    visualNote: "Three stacked numbered cards as the visual; named-geography proof strip below",
    style: "cream",
  },
];

export default function HeroLab() {
  return (
    <div className="pt-24">
      <div className="container-x px-6 py-16 border-b border-[var(--border)]">
        <p className="text-xs uppercase tracking-[0.2em] text-skynet-primary-light font-semibold mb-3">
          Internal · Hero Lab
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
          17 hero variants. Pick one.
        </h1>
        <p className="text-fg-muted max-w-2xl">
          Round 1 (V01–V12): researched against Linear, Vercel, Basecamp, Claude, Cursor.
          <br />
          Round 2 (<span className="text-skynet-primary-light font-semibold">V13–V17</span>): hybrids of Waseem-picked DNA — V01 anti-agency × V02 AI-cofounder × V11 named-geography proof.
          <br />
          Reply with variant number to ship as the homepage hero.
        </p>
      </div>

      {VARIANTS.map((v) => (
        <HeroVariant key={v.id} {...v} />
      ))}
    </div>
  );
}
