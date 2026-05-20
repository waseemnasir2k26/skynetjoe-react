import Link from "next/link";
import { Check } from "lucide-react";
import { SITE } from "@/lib/site";

const TIERS = [
  {
    name: "Starter Build",
    price: "$1,497",
    cadence: "one-time",
    desc: "One automation, shipped end-to-end. Perfect first project.",
    features: [
      "1 workflow (n8n / Zapier / GHL)",
      "Up to 3 integrations",
      "5-day delivery",
      "Loom walkthrough + SOP doc",
      "14-day support",
    ],
    cta: "Start small",
    featured: false,
  },
  {
    name: "Flagship",
    price: "$5,997",
    cadence: "one-time",
    desc: "Full system rebuild — site + automation + content engine.",
    features: [
      "Custom Next.js site (Vercel)",
      "5-workflow automation stack",
      "AEO-tuned SEO base",
      "WhatsApp / CRM integration",
      "14-day delivery",
      "30-day support",
      "$497/mo retainer optional",
    ],
    cta: "Book flagship call",
    featured: true,
  },
  {
    name: "Operator Retainer",
    price: "$1,997",
    cadence: "/ month",
    desc: "Ongoing automation operator. Stack new wins monthly.",
    features: [
      "20 hrs/month dedicated",
      "Unlimited Slack / WhatsApp",
      "Monthly strategy call",
      "Pause anytime",
      "Min 3-month engagement",
    ],
    cta: "Apply for retainer",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container-x">
        <div className="max-w-3xl mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-skynet-primary-light font-semibold mb-3">
            Pricing
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Three ways to start. <span className="gradient-text">No hidden invoice.</span>
          </h2>
          <p className="text-lg text-gray-300">
            All projects scoped against a fixed deliverable. No hourly meter. No surprise milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`relative p-8 rounded-2xl border transition-all ${
                t.featured
                  ? "bg-gradient-to-b from-skynet-primary/10 to-transparent border-skynet-primary/40 lg:scale-[1.04] shadow-2xl shadow-skynet-primary/10"
                  : "bg-skynet-surface/60 border-white/5"
              }`}
            >
              {t.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-skynet-primary to-skynet-primary-dark text-xs font-semibold text-white">
                  Most popular
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{t.name}</h3>
              <p className="text-sm text-gray-400 mb-5">{t.desc}</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-extrabold text-white">{t.price}</span>
                <span className="text-sm text-gray-500">{t.cadence}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-skynet-primary-light flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={`https://wa.me/${SITE.whatsapp.replace(/\D/g, "")}?text=Hi, interested in ${t.name}`}
                className={t.featured ? "btn-primary w-full justify-center" : "btn-ghost w-full justify-center"}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
