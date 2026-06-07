import Link from "next/link";
import { SITE } from "@/lib/site";
import DashboardMockup from "./DashboardMockup";

/**
 * SkyHero — homepage hero in the /lp/logistics design language.
 *
 * Clear-offer formula lifted from the winning LP: scarcity eyebrow → pain-first
 * headline with terracotta <em> accent → numbers-loaded subhead with the
 * "repo in your GitHub on launch day" differentiator → dual CTA → scarcity bar
 * → featured strip → interactive ops dashboard mockup.
 *
 * Copy = locked "lead-leak / after-hours" angle (multi-industry, not a niche LP).
 * Styles come from src/styles/skyv3.css under the `.sky` wrapper applied by the page.
 * Server component — animations are pure CSS, no client JS.
 */
export default function SkyHero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <span className="pulse"></span>
            Trusted by founders in <strong>9 countries</strong>&nbsp;· 2026
            build cohort booking now
          </div>

          <h1>
            Your business is <em>leaking leads after 5pm.</em> We rebuild the
            stack in 14 days.
          </h1>

          <p className="hero-sub">
            Missed calls. Dead follow-ups. Six SaaS tabs nobody opens.{" "}
            <strong>SkynetLabs ships ONE AI-run system</strong> — voice agent,
            instant reply, auto follow-up. Public pricing. Source-controlled.{" "}
            <strong>Repo in your GitHub on launch day.</strong>
          </p>

          <div className="cta-row">
            <Link
              href={SITE.cta.href}
              className="btn-primary"
              data-meta-event="Schedule"
              data-meta-name="hero-book-audit"
            >
              {SITE.cta.label} →
            </Link>
            <Link href="/case-studies" className="btn-line">
              See real results
            </Link>
          </div>

          <div className="hero-scarcity">
            <strong>Limited monthly builds</strong>&nbsp;· 8-hour reply window
          </div>

          <div className="featured-in">
            <span className="featured-lbl">Featured</span>
            <span>Upwork Top Rated Plus</span>
            <span>Fiverr Top Rated</span>
            <span>180+ workflows</span>
            <span>Claude Code Partner</span>
          </div>
        </div>
      </div>

      {/* Interactive ops dashboard — the LP's killer visual, made multi-industry */}
      <DashboardMockup />
    </section>
  );
}
