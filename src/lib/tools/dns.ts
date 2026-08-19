/**
 * dns.ts — shared client-side DNS-over-HTTPS + RDAP helpers.
 *
 * Used by:
 *   /tools/email-deliverability-checker (SPF/DMARC/DKIM/MX)
 *   /tools/domain-trust-lookup (RDAP + MX/NS)
 *
 * Everything here calls PUBLIC, KEYLESS, CORS-enabled endpoints directly
 * from the browser — no server round-trip, nothing stored:
 *   - Google Public DNS-over-HTTPS JSON API: https://dns.google/resolve
 *     (verified `Access-Control-Allow-Origin: *` on 2026-08-19)
 *   - RDAP bootstrap redirector: https://rdap.org/domain/{domain}
 *     (302s to the authoritative registry RDAP server, which itself sends
 *     `Access-Control-Allow-Origin: *` — verified against rdap.verisign.com
 *     on 2026-08-19; `fetch()` follows the redirect by default)
 *
 * All parsing below is deterministic, rule-based, and cites the RFC/spec it
 * implements in a comment next to the check. No numbers are invented — every
 * value shown in the UI must trace back to a live DNS answer or RDAP field.
 */

export type DohRecordType = "A" | "MX" | "TXT" | "NS";

export type DohAnswer = {
  name: string;
  type: number;
  TTL: number;
  data: string;
};

export type DohResponse = {
  Status: number; // 0 = NOERROR, 2 = SERVFAIL, 3 = NXDOMAIN
  Answer?: DohAnswer[];
  Authority?: DohAnswer[];
  Comment?: string;
};

export type DohResult =
  | { ok: true; status: number; answers: DohAnswer[] }
  | { ok: false; error: string };

const DOH_TYPE_CODE: Record<DohRecordType, number> = {
  A: 1,
  NS: 2,
  MX: 15,
  TXT: 16,
};

/** Basic hostname shape check — not a full RFC 1035 validator, just enough
 * to reject obviously-not-a-domain input before we spend a network call. */
export function isLikelyDomain(input: string): boolean {
  const d = input.trim().toLowerCase();
  if (!d || d.length > 253) return false;
  return /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.(?!-)[a-z0-9-]{1,63}(?<!-))+$/i.test(d);
}

export function normalizeDomain(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "");
}

/** One live DNS-over-HTTPS query via Google's JSON API. */
export async function dohQuery(
  name: string,
  type: DohRecordType,
): Promise<DohResult> {
  try {
    const url = `https://dns.google/resolve?name=${encodeURIComponent(
      name,
    )}&type=${type}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return { ok: false, error: `DNS query failed — HTTP ${res.status}` };
    }
    const json = (await res.json()) as DohResponse;
    if (json.Status === 3) {
      return { ok: false, error: "NXDOMAIN — no such record" };
    }
    if (json.Status === 2) {
      return { ok: false, error: "DNS server failure (SERVFAIL)" };
    }
    if (json.Status !== 0) {
      return { ok: false, error: `DNS Status ${json.Status}` };
    }
    return {
      ok: true,
      status: json.Status,
      answers: (json.Answer ?? []).filter(
        (a) => a.type === DOH_TYPE_CODE[type],
      ),
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}

/** Strips the trailing quotes DoH sometimes wraps multi-string TXT data in
 * and joins split TXT strings back into one value. */
function cleanTxt(data: string): string {
  return data.replace(/^"|"$/g, "").replace(/"\s+"/g, "");
}

// ---------------------------------------------------------------------------
// SPF — RFC 7208
// ---------------------------------------------------------------------------

export type SpfResult = {
  present: boolean;
  record: string | null;
  /** Mechanisms that each cost one DNS lookup per RFC 7208 §4.6.4 (10 max,
   * SPF PermError past that). This is a SHALLOW count of top-level
   * include:/redirect=/a/mx/ptr/exists: mechanisms on the record itself — it
   * does NOT recursively resolve nested includes, so a domain that chains
   * through Google/Mailgun/etc. will use more real lookups than shown here. */
  lookupMechanismCount: number;
  allQualifier: "-all" | "~all" | "?all" | "+all" | "missing";
  verdict: "good" | "warn" | "bad";
  verdictText: string;
};

export function parseSpf(txtRecords: string[]): SpfResult {
  const spf = txtRecords.map(cleanTxt).find((t) => /^v=spf1\b/i.test(t.trim()));

  if (!spf) {
    return {
      present: false,
      record: null,
      lookupMechanismCount: 0,
      allQualifier: "missing",
      verdict: "bad",
      verdictText:
        "No SPF record found. Without SPF, receiving mail servers have no way to confirm your sending IPs are authorized — this alone can push cold email straight to spam.",
    };
  }

  const lookupMechanisms =
    spf.match(
      /\b(include:|redirect=|a(?::|\b)|mx(?::|\b)|ptr(?::|\b)|exists:)/gi,
    ) ?? [];

  let allQualifier: SpfResult["allQualifier"] = "missing";
  if (/-all\b/i.test(spf)) allQualifier = "-all";
  else if (/~all\b/i.test(spf)) allQualifier = "~all";
  else if (/\?all\b/i.test(spf)) allQualifier = "?all";
  else if (/\+all\b/i.test(spf)) allQualifier = "+all";

  let verdict: SpfResult["verdict"] = "warn";
  let verdictText = "";
  switch (allQualifier) {
    case "-all":
      verdict = "good";
      verdictText =
        "SPF present with a hard fail (-all) — unauthorized senders should be rejected outright by compliant receivers.";
      break;
    case "~all":
      verdict = "warn";
      verdictText =
        "SPF present with a soft fail (~all) — unauthorized mail is flagged, not rejected. Common default, but -all is stricter once you're confident every legitimate sender is listed.";
      break;
    case "?all":
      verdict = "bad";
      verdictText =
        "SPF present but set to neutral (?all) — this tells receivers not to treat unauthorized senders any differently. Functionally close to having no SPF policy.";
      break;
    case "+all":
      verdict = "bad";
      verdictText =
        "SPF present but set to +all — this authorizes ANY server to send as your domain. This is almost always a misconfiguration and a spoofing risk.";
      break;
    default:
      verdict = "warn";
      verdictText =
        'SPF record found but has no "all" mechanism — behavior for unauthorized senders is undefined by this record.';
  }

  if (lookupMechanisms.length > 10) {
    verdict = "bad";
    verdictText +=
      " Also: this record alone has more than 10 lookup-costing mechanisms, which risks a PermError (RFC 7208 §4.6.4 hard caps SPF at 10 DNS lookups) — mail may fail SPF entirely regardless of the qualifier.";
  }

  return {
    present: true,
    record: spf,
    lookupMechanismCount: lookupMechanisms.length,
    allQualifier,
    verdict,
    verdictText,
  };
}

// ---------------------------------------------------------------------------
// DMARC — RFC 7489
// ---------------------------------------------------------------------------

export type DmarcResult = {
  present: boolean;
  record: string | null;
  policy: "none" | "quarantine" | "reject" | null;
  subdomainPolicy: string | null;
  pct: string | null;
  rua: string | null;
  verdict: "good" | "warn" | "bad";
  verdictText: string;
};

export function parseDmarc(txtRecords: string[]): DmarcResult {
  const dmarc = txtRecords
    .map(cleanTxt)
    .find((t) => /^v=dmarc1\b/i.test(t.trim()));

  if (!dmarc) {
    return {
      present: false,
      record: null,
      policy: null,
      subdomainPolicy: null,
      pct: null,
      rua: null,
      verdict: "bad",
      verdictText:
        "No DMARC record at _dmarc.<domain> — spoofed mail claiming to be from this domain has no policy to enforce against it. Gmail and Yahoo's 2024 bulk-sender rules require DMARC for any domain sending meaningful volume.",
    };
  }

  const pMatch = dmarc.match(/p=(none|quarantine|reject)/i);
  const spMatch = dmarc.match(/sp=([a-z]+)/i);
  const pctMatch = dmarc.match(/pct=(\d+)/i);
  const ruaMatch = dmarc.match(/rua=([^;]+)/i);
  const policy = (pMatch?.[1]?.toLowerCase() ?? null) as DmarcResult["policy"];

  let verdict: DmarcResult["verdict"] = "warn";
  let verdictText = "";
  if (policy === "reject") {
    verdict = "good";
    verdictText =
      "DMARC policy is p=reject — the strongest setting. Mail failing SPF/DKIM alignment is rejected outright, which is what Gmail/Yahoo's bulk-sender requirements are pushing senders toward.";
  } else if (policy === "quarantine") {
    verdict = "warn";
    verdictText =
      "DMARC policy is p=quarantine — failing mail is sent to spam rather than rejected. A reasonable middle step, but p=reject is the end state most mailbox providers reward.";
  } else if (policy === "none") {
    verdict = "bad";
    verdictText =
      "DMARC policy is p=none — this only monitors and reports, it does not stop spoofed mail from reaching inboxes. This is the #1 reason cold outreach domains get flagged: the record exists but does nothing.";
  } else {
    verdict = "warn";
    verdictText =
      "DMARC record found but no readable p= policy value — treat this as unenforced until confirmed.";
  }

  return {
    present: true,
    record: dmarc,
    policy,
    subdomainPolicy: spMatch?.[1]?.toLowerCase() ?? null,
    pct: pctMatch?.[1] ?? null,
    rua: ruaMatch?.[1]?.trim() ?? null,
    verdict,
    verdictText,
  };
}

// ---------------------------------------------------------------------------
// DKIM — probed against common selectors (there is no DNS record that lists
// selectors in use, so this is a best-effort probe, not exhaustive).
// ---------------------------------------------------------------------------

export const DKIM_SELECTORS_TO_PROBE = [
  "google",
  "default",
  "k1",
  "s1",
  "s2",
  "selector1",
  "selector2",
  "mx",
] as const;

export type DkimSelectorResult = {
  selector: string;
  found: boolean;
  record: string | null;
};

export async function probeDkimSelectors(
  domain: string,
): Promise<DkimSelectorResult[]> {
  const results = await Promise.all(
    DKIM_SELECTORS_TO_PROBE.map(async (selector) => {
      const r = await dohQuery(`${selector}._domainkey.${domain}`, "TXT");
      if (r.ok && r.answers.length > 0) {
        const record = r.answers.map((a) => cleanTxt(a.data)).join(" ");
        return { selector, found: /v=dkim1|p=/i.test(record), record };
      }
      return { selector, found: false, record: null };
    }),
  );
  return results;
}

// ---------------------------------------------------------------------------
// MX provider fingerprint
// ---------------------------------------------------------------------------

export type MxResult = {
  present: boolean;
  hosts: string[];
  provider: "Google Workspace" | "Microsoft 365" | "Zoho" | "Other" | "None";
};

export function fingerprintMx(mxAnswers: DohAnswer[]): MxResult {
  const hosts = mxAnswers
    .map((a) => a.data.split(" ").slice(1).join(" ").replace(/\.$/, ""))
    .filter(Boolean);

  if (hosts.length === 0) {
    return { present: false, hosts: [], provider: "None" };
  }

  const joined = hosts.join(" ").toLowerCase();
  let provider: MxResult["provider"] = "Other";
  if (/google\.com|googlemail\.com/.test(joined)) provider = "Google Workspace";
  else if (/outlook\.com|protection\.outlook\.com/.test(joined))
    provider = "Microsoft 365";
  else if (/zoho\.com|zohomail/.test(joined)) provider = "Zoho";

  return { present: true, hosts, provider };
}

// ---------------------------------------------------------------------------
// NS provider fingerprint (used by domain-trust-lookup)
// ---------------------------------------------------------------------------

export function fingerprintNs(nsAnswers: DohAnswer[]): {
  hosts: string[];
  provider: string;
} {
  const hosts = nsAnswers.map((a) => a.data.replace(/\.$/, ""));
  const joined = hosts.join(" ").toLowerCase();
  let provider = "Unrecognized / custom";
  if (/cloudflare/.test(joined)) provider = "Cloudflare";
  else if (/awsdns/.test(joined)) provider = "AWS Route 53";
  else if (/godaddy|domaincontrol/.test(joined)) provider = "GoDaddy";
  else if (/namecheap|registrar-servers/.test(joined)) provider = "Namecheap";
  else if (/google\.com|googledomains/.test(joined))
    provider = "Google Domains/Cloud DNS";
  else if (/ns\d*\.digitalocean/.test(joined)) provider = "DigitalOcean";
  else if (/azure-dns|microsoftonline/.test(joined))
    provider = "Microsoft Azure DNS";
  else if (/dnsimple/.test(joined)) provider = "DNSimple";
  else if (/hostinger/.test(joined)) provider = "Hostinger";

  return { hosts, provider };
}

// ---------------------------------------------------------------------------
// Email deliverability — orchestrates SPF + DMARC + DKIM + MX in parallel.
// ---------------------------------------------------------------------------

export type EmailDeliverabilityReport = {
  domain: string;
  domainExists: boolean;
  spf: SpfResult;
  dmarc: DmarcResult;
  dkim: DkimSelectorResult[];
  mx: MxResult;
  overall: "good" | "warn" | "bad";
  fetchedAt: string;
};

export async function runEmailDeliverabilityCheck(
  rawDomain: string,
): Promise<EmailDeliverabilityReport> {
  const domain = normalizeDomain(rawDomain);

  const [txtRes, dmarcRes, mxRes, dkimResults] = await Promise.all([
    dohQuery(domain, "TXT"),
    dohQuery(`_dmarc.${domain}`, "TXT"),
    dohQuery(domain, "MX"),
    probeDkimSelectors(domain),
  ]);

  const domainExists =
    txtRes.ok || mxRes.ok || dkimResults.some((d) => d.found);

  const spf = parseSpf(txtRes.ok ? txtRes.answers.map((a) => a.data) : []);
  const dmarc = parseDmarc(
    dmarcRes.ok ? dmarcRes.answers.map((a) => a.data) : [],
  );
  const mx = fingerprintMx(mxRes.ok ? mxRes.answers : []);

  const scores = [spf.verdict, dmarc.verdict].map((v) =>
    v === "good" ? 2 : v === "warn" ? 1 : 0,
  );
  const min = Math.min(...scores);
  const overall: EmailDeliverabilityReport["overall"] =
    min === 0 ? "bad" : min === 1 ? "warn" : "good";

  return {
    domain,
    domainExists,
    spf,
    dmarc,
    dkim: dkimResults,
    mx,
    overall,
    fetchedAt: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// RDAP — RFC 9083
// ---------------------------------------------------------------------------

export type RdapEvent = { eventAction: string; eventDate: string };
export type RdapEntity = { roles?: string[]; handle?: string };

export type RdapResponse = {
  ldhName?: string;
  handle?: string;
  status?: string[];
  events?: RdapEvent[];
  entities?: Array<{
    roles?: string[];
    vcardArray?: unknown[];
    handle?: string;
    publicIds?: Array<{ type: string; identifier: string }>;
  }>;
  links?: Array<{ rel?: string; href?: string; value?: string }>;
};

export type RdapResult =
  | {
      ok: true;
      domain: string;
      registrationDate: string | null;
      ageDays: number | null;
      registrar: string | null;
      status: string[];
      raw: RdapResponse;
    }
  | { ok: false; error: string };

export async function rdapLookup(rawDomain: string): Promise<RdapResult> {
  const domain = normalizeDomain(rawDomain);
  try {
    const res = await fetch(`https://rdap.org/domain/${domain}`, {
      cache: "no-store",
    });
    if (res.status === 404) {
      return {
        ok: false,
        error:
          "Not found in RDAP — domain may not be registered, or the registry doesn't publish RDAP data for this TLD.",
      };
    }
    if (!res.ok) {
      return { ok: false, error: `RDAP lookup failed — HTTP ${res.status}` };
    }
    const json = (await res.json()) as RdapResponse;

    const regEvent = json.events?.find((e) => e.eventAction === "registration");
    const registrationDate = regEvent?.eventDate ?? null;
    let ageDays: number | null = null;
    if (registrationDate) {
      const ms = Date.now() - new Date(registrationDate).getTime();
      ageDays = Math.floor(ms / (1000 * 60 * 60 * 24));
    }

    const registrarEntity = json.entities?.find((e) =>
      e.roles?.includes("registrar"),
    );
    let registrar: string | null = null;
    // vcardArray shape: ["vcard", [["version",...],["fn",{},"text","Name"],...]]
    const vcard = registrarEntity?.vcardArray;
    if (Array.isArray(vcard) && Array.isArray(vcard[1])) {
      const fnEntry = (vcard[1] as unknown[]).find(
        (row) => Array.isArray(row) && row[0] === "fn",
      ) as unknown[] | undefined;
      if (fnEntry && typeof fnEntry[3] === "string") registrar = fnEntry[3];
    }

    return {
      ok: true,
      domain,
      registrationDate,
      ageDays,
      registrar,
      status: json.status ?? [],
      raw: json,
    };
  } catch (err) {
    return {
      ok: false,
      error:
        err instanceof Error
          ? `Network/CORS error reaching RDAP: ${err.message} — some registries don't serve CORS headers on their RDAP endpoint, and there's no proxy in front of this tool yet.`
          : "Unknown RDAP error",
    };
  }
}

export async function runDomainTrustLookup(rawDomain: string) {
  const domain = normalizeDomain(rawDomain);
  const [rdap, mxRes, nsRes] = await Promise.all([
    rdapLookup(domain),
    dohQuery(domain, "MX"),
    dohQuery(domain, "NS"),
  ]);
  const mx = fingerprintMx(mxRes.ok ? mxRes.answers : []);
  const ns = fingerprintNs(nsRes.ok ? nsRes.answers : []);
  return { domain, rdap, mx, ns, fetchedAt: new Date().toISOString() };
}
