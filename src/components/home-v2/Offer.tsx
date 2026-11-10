import Link from "next/link";
import {
  MessageCircle,
  Zap,
  Repeat,
  CalendarCheck,
  Workflow,
  Globe,
  ArrowRight,
} from "lucide-react";
import Reveal from "@/components/home/Reveal";

/**
 * "What we set up" — each card is an outcome that maps to one of the 5
 * core services (src/lib/site.ts SERVICE_CATEGORIES) and links to its
 * service page. Feature claims are lifted from src/lib/service-pricing.ts
 * (AI Chatbots: WhatsApp/web single channel, Pro = web + WA + voice +
 * human handoff + CRM integration; n8n: error handling + Slack notifier,
 * Loom walkthrough; GHL: funnels, pipeline, drip cadences, SMS; Vibe-coded
 * sites: "Custom Next.js builds, 7-day ship" from site.ts).
 */
const OFFERS = [
  {
    icon: MessageCircle,
    title: "WhatsApp AI assistant",
    body: "Answers the common questions, captures the lead and hands off to a human when it matters. WhatsApp or web chat; voice on the Pro tier.",
    href: "/services/ai-chatbots",
  },
  {
    icon: Zap,
    title: "Instant lead replies",
    body: "Every form, DM or email enquiry gets an on-brand reply in seconds, then lands in your CRM with the details already filled in.",
    href: "/services/n8n-automation",
  },
  {
    icon: Repeat,
    title: "Follow-up automation",
    body: "Drip cadences, SMS and reminders that run on a schedule, so a quote never goes quiet because someone forgot to chase.",
    href: "/services/gohighlevel",
  },
  {
    icon: CalendarCheck,
    title: "Booking flows",
    body: "Calendar links, confirmations and reminders wired into the pipeline. Leads book themselves; you see it in the calendar.",
    href: "/services/gohighlevel",
  },
  {
    icon: Workflow,
    title: "n8n automations",
    body: "Connect the tools you already pay for. Built with error handling and alerts, handed over with a Loom walkthrough.",
    href: "/services/n8n-automation",
  },
  {
    icon: Globe,
    title: "A site that converts",
    body: "Custom Next.js builds on a 7-day ship, tuned so AI search engines and Google can read and recommend you.",
    href: "/services/vibe-coded-sites",
  },
] as const;

export default function Offer() {
  return (
    <section
      className="hv2-section hv2-offer"
      id="offer"
      aria-labelledby="offer-h"
    >
      <div className="hv2-wrap">
        <Reveal className="hv2-head">
          <div>
            <div className="hv2-eyebrow">What we set up</div>
            <h2 id="offer-h" className="hv2-h2">
              One system that answers, follows up and books —{" "}
              <em>while you work.</em>
            </h2>
          </div>
          <p className="hv2-lede">
            Pick the piece that hurts most. Each one is a fixed-scope build on
            its own; together they become the back office you never hired.
          </p>
        </Reveal>

        <ul className="hv2-offer-grid">
          {OFFERS.map((o, i) => {
            const Icon = o.icon;
            return (
              <li key={o.title}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <Link href={o.href} className="hv2-offer-card">
                    <span className="ico" aria-hidden>
                      <Icon />
                    </span>
                    <h3>{o.title}</h3>
                    <p>{o.body}</p>
                    <span className="more">
                      How it&rsquo;s built <ArrowRight aria-hidden />
                    </span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
