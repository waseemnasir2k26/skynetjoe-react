/**
 * AUTOMATION_CHECKS — real, string-matched detections that back the
 * Automation Readiness Scanner. Every check runs a regex/substring test
 * against the actual fetched HTML of the target homepage — nothing here is
 * inferred, guessed, or scored without a positive match.
 *
 * Score is 0-100, sum of each check's `weight` when detected (weights sum
 * to 100). A missing detection is a "gap" — its `gapCopy` + `serviceHref`
 * are shown as "what an automation would do here", linking a real service
 * page on this site (no invented service names).
 */

export type ReadinessCheckId =
  | "contactForm"
  | "chatWidget"
  | "booking"
  | "metaPixel"
  | "ga4OrGtm"
  | "schema"
  | "emailCapture"
  | "whatsapp"
  | "clickToCall";

export type ReadinessCheck = {
  id: ReadinessCheckId;
  label: string;
  weight: number;
  test: (html: string) => boolean;
  /** Shown when NOT detected — the automation opportunity. */
  gapCopy: string;
  serviceHref: string;
  serviceLabel: string;
};

function has(html: string, ...needles: string[]): boolean {
  const lower = html.toLowerCase();
  return needles.some((n) => lower.includes(n.toLowerCase()));
}

function re(html: string, pattern: RegExp): boolean {
  return pattern.test(html);
}

export const AUTOMATION_CHECKS: ReadinessCheck[] = [
  {
    id: "contactForm",
    label: "Contact form",
    weight: 15,
    test: (h) => re(h, /<form\b[^>]*>[\s\S]{0,4000}?<\/form>/i),
    gapCopy:
      "No <form> element found on the homepage. Every visitor who wants to reach you has to find an email address or phone number manually — that's friction an automated intake form removes.",
    serviceHref: "/services/gohighlevel",
    serviceLabel: "GoHighLevel CRM — capture + route leads automatically",
  },
  {
    id: "chatWidget",
    label: "Live chat / chatbot",
    weight: 15,
    test: (h) =>
      has(
        h,
        "widget.intercom.io",
        "js.driftt.com",
        "embed.tawk.to",
        "code.tidio.co",
        "client.crisp.chat",
        "static.zdassets.com",
        "cdn.livechatinc.com",
        "wchat.freshchat.com",
        "leadconnectorhq.com",
      ),
    gapCopy:
      "No chat widget signature detected (Intercom, Drift, Tawk, Tidio, Crisp, etc.). Visitors who bounce before finding your contact form leave with zero capture — a chat/voice agent answers the first question instantly instead of losing them.",
    serviceHref: "/services/ai-chatbots",
    serviceLabel: "AI Chatbots — answer visitors instantly, 24/7",
  },
  {
    id: "booking",
    label: "Online booking / scheduling",
    weight: 12,
    test: (h) =>
      has(
        h,
        "calendly.com",
        "cal.com/embed",
        "app.cal.com",
        "acuityscheduling.com",
        "setmore.com",
      ),
    gapCopy:
      "No booking widget detected (Calendly, Cal.com, Acuity, Setmore). Prospects who want to talk have to email and wait for a reply instead of grabbing a slot themselves — that's a delay that costs booked calls.",
    serviceHref: "/services/gohighlevel",
    serviceLabel: "GoHighLevel CRM — automated booking + reminders",
  },
  {
    id: "metaPixel",
    label: "Meta (Facebook) pixel",
    weight: 10,
    test: (h) =>
      has(h, "connect.facebook.net", "fbevents.js") ||
      re(h, /fbq\(['"]init['"]/i),
    gapCopy:
      "No Meta Pixel detected. Without it, ad spend on Facebook/Instagram can't retarget site visitors or measure conversions — every paid click is untracked past the click.",
    serviceHref: "/services/social-automation",
    serviceLabel: "Social Automation — pixel + retargeting setup",
  },
  {
    id: "ga4OrGtm",
    label: "Analytics (GA4 or Tag Manager)",
    weight: 10,
    test: (h) =>
      has(h, "googletagmanager.com/gtm.js", "googletagmanager.com/gtag/js") ||
      re(h, /gtag\(['"]config['"],\s*['"]G-/i),
    gapCopy:
      "No GA4 or Google Tag Manager detected. Without baseline analytics there's no visibility into what visitors do before they leave — every automation decision downstream is a guess.",
    serviceHref: "/services/wordpress-seo",
    serviceLabel: "AEO-tuned site work — analytics + tracking baseline",
  },
  {
    id: "schema",
    label: "Structured data (JSON-LD)",
    weight: 13,
    test: (h) => re(h, /<script[^>]*type=["']application\/ld\+json["']/i),
    gapCopy:
      "No JSON-LD structured data found. AI answer engines (ChatGPT, Perplexity, Google AI Overviews) and rich-result search features both rely on schema markup to understand and cite a page — without it, this site is effectively invisible to them.",
    serviceHref: "/tools/schema-markup-generator",
    serviceLabel: "Schema Markup Generator — free tool, build it now",
  },
  {
    id: "emailCapture",
    label: "Email capture (popup / newsletter)",
    weight: 8,
    test: (h) =>
      has(
        h,
        "optinmonster.com",
        "omappapi.com",
        "load.sumo.com",
        "widget.privy.com",
        "list-manage.com",
        "convertkit.com",
        "ck.page",
      ) || re(h, /<input[^>]*type=["']email["']/i),
    gapCopy:
      "No email-capture mechanism detected (popup tool or an email input field). Every visitor who isn't ready to buy today and doesn't convert leaves with no way to be followed up with later.",
    serviceHref: "/services/gohighlevel",
    serviceLabel: "GoHighLevel CRM — capture + nurture sequences",
  },
  {
    id: "whatsapp",
    label: "WhatsApp link",
    weight: 9,
    test: (h) => re(h, /(wa\.me\/|api\.whatsapp\.com\/send)/i),
    gapCopy:
      "No WhatsApp click-to-chat link found. In markets where WhatsApp is the default channel, that's a direct, low-friction contact path visitors don't have — they have to fall back to email or a form instead.",
    serviceHref: "/services/ai-chatbots",
    serviceLabel: "AI Chatbots — WhatsApp/voice agent integration",
  },
  {
    id: "clickToCall",
    label: "Click-to-call phone link",
    weight: 8,
    test: (h) => re(h, /href=["']tel:/i),
    gapCopy:
      "No tel: link found. On mobile — where most local-service traffic lands — visitors have to manually copy a phone number instead of tapping to call, which measurably loses calls.",
    serviceHref: "/services/ai-chatbots",
    serviceLabel: "AI Chatbots — voice agent that answers every call",
  },
];

export const READINESS_MAX_SCORE = AUTOMATION_CHECKS.reduce(
  (a, c) => a + c.weight,
  0,
);

export type ReadinessResult = {
  id: ReadinessCheckId;
  label: string;
  weight: number;
  detected: boolean;
};

export function runReadinessChecks(html: string): ReadinessResult[] {
  return AUTOMATION_CHECKS.map((check) => {
    let detected = false;
    try {
      detected = check.test(html);
    } catch {
      detected = false;
    }
    return { id: check.id, label: check.label, weight: check.weight, detected };
  });
}

export function readinessScore(results: ReadinessResult[]): number {
  const raw = results.reduce((a, r) => a + (r.detected ? r.weight : 0), 0);
  return Math.round((raw / READINESS_MAX_SCORE) * 100);
}

export function readinessBucket(score: number): {
  label: string;
  color: string;
  headline: string;
} {
  if (score >= 80) {
    return {
      label: "Well-instrumented",
      color: "#2f8f5b",
      headline:
        "Most of the standard automation surface area is already covered.",
    };
  }
  if (score >= 55) {
    return {
      label: "Partial coverage",
      color: "#c66b3f",
      headline: "The basics exist, but real gaps are still losing leads.",
    };
  }
  if (score >= 30) {
    return {
      label: "Under-automated",
      color: "#b3492f",
      headline: "Most inbound intent has no automated path to capture it.",
    };
  }
  return {
    label: "Manual-only",
    color: "#8f2f2f",
    headline:
      "Almost nothing here is instrumented — every visitor interaction is unassisted.",
  };
}
