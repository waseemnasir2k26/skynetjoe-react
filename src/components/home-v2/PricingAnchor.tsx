import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/home/Reveal";
import { SERVICE_PRICING } from "@/lib/service-pricing";
import { WHATSAPP } from "@/lib/site";

/**
 * Pricing anchor — figures are COMPUTED from src/lib/service-pricing.ts
 * (the same data that drives /pricing), never typed by hand:
 *   Starter  = lowest one-time Starter tier   ($1,497 today)
 *   Pro      = lowest one-time Pro tier       ($4,500 today)
 *   Retainer = lowest monthly Custom tier     ($1,497/mo today)
 * Terms (50% deposit, fixed price, 5–14 day ship) — HOME_FAQS + contact page.
 */
const allTiers = SERVICE_PRICING.flatMap((s) => s.tiers);
const minBy = (pred: (t: (typeof allTiers)[number]) => boolean) =>
  Math.min(...allTiers.filter(pred).map((t) => t.price));

const STARTER = minBy((t) => t.name === "Starter" && t.cadence !== "monthly");
const PRO = minBy((t) => t.name === "Pro" && t.cadence !== "monthly");
const RETAINER = minBy((t) => t.cadence === "monthly");

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function PricingAnchor() {
  return (
    <section
      className="hv2-section hv2-pricing"
      id="pricing-anchor"
      aria-labelledby="pricing-h"
    >
      <div className="hv2-wrap">
        <Reveal className="hv2-head">
          <div>
            <div className="hv2-eyebrow">Pricing</div>
            <h2 id="pricing-h" className="hv2-h2">
              Public prices. <em>Fixed scope.</em>
            </h2>
          </div>
          <p className="hv2-lede">
            No quote form, no &ldquo;book a call to find out&rdquo;. Every tier
            for every service is on the pricing page with a live calculator.
          </p>
        </Reveal>

        <ul className="hv2-tiers">
          <li className="hv2-tier">
            <Reveal>
              <div className="name">Starter</div>
              <div className="price">
                {usd(STARTER)}
                <small>one-time</small>
              </div>
              <p className="desc">
                One workflow, one channel, one outcome. The fastest way to stop
                the biggest leak.
              </p>
              <div className="ship">Ships in about 5–7 days</div>
            </Reveal>
          </li>
          <li className="hv2-tier hot">
            <Reveal delay={0.08}>
              <div className="name">
                Pro <span className="badge">Most picked</span>
              </div>
              <div className="price">
                from {usd(PRO)}
                <small>one-time</small>
              </div>
              <p className="desc">
                Multi-channel, multi-system: assistant + CRM + follow-up wired
                together with human handoff.
              </p>
              <div className="ship">Ships in about 10–14 days</div>
            </Reveal>
          </li>
          <li className="hv2-tier">
            <Reveal delay={0.16}>
              <div className="name">Retainer</div>
              <div className="price">
                from {usd(RETAINER)}
                <small>per month</small>
              </div>
              <p className="desc">
                Monitoring, tuning and new flows every month once the system is
                live. Optional, and separate from the one-time build fee.
              </p>
              <div className="ship">Ongoing · monthly review call</div>
            </Reveal>
          </li>
        </ul>

        <Reveal>
          <div className="hv2-pricing-terms">
            <span>
              <Check aria-hidden /> Fixed price, no hourly creep
            </span>
            <span>
              <Check aria-hidden /> 50% deposit, 50% at ship
            </span>
            <span>
              <Check aria-hidden /> Scope in writing within 48h
            </span>
          </div>
          <div className="hv2-pricing-foot">
            <Link href="/pricing" className="hv2-btn hv2-btn-ghost">
              Full pricing + calculator <ArrowRight aria-hidden />
            </Link>
            <a
              href={WHATSAPP.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hv2-inline-link"
            >
              Not sure which tier? Ask on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
