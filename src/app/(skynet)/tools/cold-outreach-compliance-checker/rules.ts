/**
 * rules.ts — deterministic, client-side compliance heuristics for cold
 * outreach copy (email + SMS). Every rule below implements one named
 * requirement or heuristic and cites its source in the `citation` field so
 * the UI can link back to it. This is NOT legal advice — see the disclaimer
 * rendered on the page. Nothing here is sent anywhere; all checks run in
 * the browser against the pasted text.
 */

export type RuleSeverity = "pass" | "warn" | "fail";

export type RuleResult = {
  id: string;
  label: string;
  kind: "law" | "heuristic";
  citation: { label: string; url: string };
  severity: RuleSeverity;
  detail: string;
};

const FTC_CAN_SPAM_URL =
  "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business";
const FTC_TSR_URL =
  "https://www.ftc.gov/legal-library/browse/rules/telemarketing-sales-rule";
const TCPA_URL = "https://www.fcc.gov/general/telemarketing-and-robocalls";

// ---------------------------------------------------------------------------
// CAN-SPAM Act (15 U.S.C. §7701 et seq.) — applies to commercial email
// ---------------------------------------------------------------------------

/** Heuristic: looks for a street-address-shaped line (number + street word,
 * or a PO Box, or a 5-digit ZIP) — CAN-SPAM requires a valid physical postal
 * address, but there is no way to verify the address is REAL from text
 * alone, so this only confirms an address-shaped string is present. */
export function checkPostalAddress(text: string): RuleResult {
  const hasStreetPattern =
    /\d{1,6}\s+[A-Za-z0-9.'\- ]+\s+(street|st|avenue|ave|road|rd|drive|dr|boulevard|blvd|lane|ln|way|suite|ste|floor|fl|place|pl)\b/i.test(
      text,
    );
  const hasPoBox = /\bP\.?\s*O\.?\s*Box\s+\d+/i.test(text);
  const hasZip = /\b\d{5}(-\d{4})?\b/.test(text);
  const found = hasStreetPattern || hasPoBox;

  return {
    id: "can-spam-postal-address",
    label: "Physical postal address present",
    kind: "law",
    citation: { label: "FTC CAN-SPAM Compliance Guide", url: FTC_CAN_SPAM_URL },
    severity: found ? "pass" : hasZip ? "warn" : "fail",
    detail: found
      ? "Found an address-shaped line in the text. CAN-SPAM requires every commercial email to include a valid physical postal address — this only confirms something address-shaped is present, not that the address is real or current."
      : hasZip
        ? "Found a 5-digit number that could be a ZIP code, but no full street-address pattern — double-check a complete postal address is included."
        : "No postal address detected. CAN-SPAM requires a valid physical postal address (street address, PO Box, or private mailbox registered with a commercial mail receiving agency) in every commercial email.",
  };
}

/** Heuristic: looks for common unsubscribe/opt-out phrasing. */
export function checkOptOutLanguage(text: string): RuleResult {
  const found =
    /\bunsubscribe\b|\bopt[\s-]?out\b|\bstop receiving\b|\bmanage (your )?(email )?preferences\b/i.test(
      text,
    );
  return {
    id: "can-spam-opt-out",
    label: "Clear opt-out mechanism mentioned",
    kind: "law",
    citation: { label: "FTC CAN-SPAM Compliance Guide", url: FTC_CAN_SPAM_URL },
    severity: found ? "pass" : "fail",
    detail: found
      ? "Found opt-out language (unsubscribe / opt-out / stop receiving). CAN-SPAM requires a clear, conspicuous way to opt out, honored within 10 business days, with no fee or extra step required."
      : "No opt-out language found. CAN-SPAM requires every commercial email to give recipients a clear, working way to opt out of future messages.",
  };
}

/** Heuristic flag, not a law-text match: subject lines with ALL CAPS words,
 * misleading urgency markers, or a fake reply/forward prefix are the
 * patterns the FTC calls out as "deceptive subject lines" in enforcement
 * guidance — flagged here as heuristics, not a definitive legal ruling. */
export function checkDeceptiveSubjectHeuristics(subject: string): RuleResult {
  if (!subject.trim()) {
    return {
      id: "can-spam-subject-heuristic",
      label: "Subject line — deceptive-pattern heuristic scan",
      kind: "heuristic",
      citation: {
        label: "FTC CAN-SPAM Compliance Guide",
        url: FTC_CAN_SPAM_URL,
      },
      severity: "warn",
      detail: "No subject line entered — paste one to run this check.",
    };
  }

  const flags: string[] = [];
  if (/^\s*(re|fwd?):/i.test(subject)) {
    flags.push(
      'starts with "Re:"/"Fwd:" — deceptive if this isn\'t actually a reply/forward',
    );
  }
  const allCapsWords = subject.match(/\b[A-Z]{4,}\b/g) ?? [];
  if (allCapsWords.length > 0) {
    flags.push(`contains ALL-CAPS word(s): ${allCapsWords.join(", ")}`);
  }
  const exclaimCount = (subject.match(/!/g) ?? []).length;
  if (exclaimCount >= 2) {
    flags.push(`${exclaimCount} exclamation marks — reads as urgency-bait`);
  }
  if (/\bre:\s*your (account|order|invoice|payment)\b/i.test(subject)) {
    flags.push(
      "mimics a transactional notice (account/order/invoice) — a classic deceptive-subject pattern if the email isn't actually transactional",
    );
  }

  return {
    id: "can-spam-subject-heuristic",
    label: "Subject line — deceptive-pattern heuristic scan",
    kind: "heuristic",
    citation: { label: "FTC CAN-SPAM Compliance Guide", url: FTC_CAN_SPAM_URL },
    severity: flags.length === 0 ? "pass" : "warn",
    detail:
      flags.length === 0
        ? "No common deceptive-subject patterns detected. This is a heuristic scan, not a guarantee — CAN-SPAM's actual bar is whether the subject would mislead a recipient about the message's contents."
        : `Heuristic flags (not a legal ruling, worth a human read): ${flags.join("; ")}.`,
  };
}

// ---------------------------------------------------------------------------
// SMS — TCPA (47 U.S.C. §227) + carrier/CTIA best practices
// ---------------------------------------------------------------------------

export function checkSmsOptOutKeyword(text: string): RuleResult {
  const found = /\bSTOP\b/.test(text.toUpperCase());
  return {
    id: "sms-stop-keyword",
    label: 'SMS opt-out keyword ("STOP") present',
    kind: "law",
    citation: {
      label: "FCC — Telemarketing & Robocalls (TCPA)",
      url: TCPA_URL,
    },
    severity: found ? "pass" : "warn",
    detail: found
      ? 'Found "STOP" in the text. Standard SMS compliance practice is to tell recipients they can reply STOP to opt out — most carriers require this, and TCPA consent must be revocable at any time.'
      : 'No "STOP" opt-out instruction found. If this text is an initial/compliance message (not a mid-conversation reply), include reply-STOP-to-opt-out language — carriers filter messages missing it, separate from the TCPA consent requirement itself.',
  };
}

export function smsHoursNote(): RuleResult {
  return {
    id: "sms-sending-hours",
    label: "Sending-hours guidance (informational — not detectable from text)",
    kind: "law",
    citation: { label: "FTC Telemarketing Sales Rule", url: FTC_TSR_URL },
    severity: "warn",
    detail:
      "This can't be checked from message text alone: telemarketing calls/texts are restricted to 8:00am–9:00pm in the recipient's local time zone under the FTC's Telemarketing Sales Rule. Make sure your sending system enforces this at send time, not just in copy.",
  };
}

// ---------------------------------------------------------------------------
// Spam-trigger-word scan — DELIVERABILITY heuristic, not law. These words
// are commonly cited by ESPs (Mailchimp, HubSpot, etc.) as phrases spam
// filters weight heavily — not a CAN-SPAM requirement.
// ---------------------------------------------------------------------------

export const SPAM_TRIGGER_WORDS = [
  "free",
  "guarantee",
  "guaranteed",
  "act now",
  "click here",
  "no obligation",
  "risk-free",
  "risk free",
  "100% free",
  "cash bonus",
  "cash prize",
  "winner",
  "congratulations",
  "urgent",
  "limited time",
  "act immediately",
  "no cost",
  "cancel at any time",
  "double your",
  "earn money",
  "extra income",
  "eliminate debt",
  "financial freedom",
  "get paid",
  "no fees",
  "not spam",
  "once in a lifetime",
  "order now",
  "special promotion",
  "this isn't spam",
  "why pay more",
  "work from home",
  "you have been selected",
  "dear friend",
  "as seen on",
  "buy direct",
  "call now",
  "credit card offers",
];

export function scanSpamTriggerWords(text: string): RuleResult & {
  matches: string[];
} {
  const lower = text.toLowerCase();
  const matches = SPAM_TRIGGER_WORDS.filter((w) => lower.includes(w));
  return {
    id: "spam-trigger-words",
    label: "Spam-trigger phrase scan",
    kind: "heuristic",
    citation: {
      label:
        "Common ESP spam-filter word lists (deliverability heuristic, not law)",
      url: "https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business",
    },
    severity:
      matches.length === 0 ? "pass" : matches.length <= 2 ? "warn" : "fail",
    detail:
      matches.length === 0
        ? "No common spam-trigger phrases detected."
        : `${matches.length} phrase(s) matched: ${matches.join(", ")}. This is a deliverability heuristic used by spam filters — not a legal violation — but each match statistically raises spam-score risk.`,
    matches,
  };
}

export function runEmailComplianceChecks(subject: string, body: string) {
  const full = `${subject}\n${body}`;
  return [
    checkPostalAddress(full),
    checkOptOutLanguage(full),
    checkDeceptiveSubjectHeuristics(subject),
    scanSpamTriggerWords(full),
  ];
}

export function runSmsComplianceChecks(body: string) {
  return [
    checkSmsOptOutKeyword(body),
    smsHoursNote(),
    scanSpamTriggerWords(body),
  ];
}
