/**
 * GoHighLevel (GHL / LeadConnector) REST client.
 *
 * Purpose: replace the inbound-webhook hop with direct REST calls so the
 * site code creates contacts + opportunities itself — no human workflow
 * setup required in the GHL UI.
 *
 * Docs: https://highlevel.stoplight.io/docs/integrations
 *
 * Env contract:
 *   GHL_API_TOKEN     — Private Integration Token (PIT). Required for live
 *                       writes. If absent we silently no-op so local dev /
 *                       preview deploys don't break.
 *   GHL_LOCATION_ID   — Sub-account location. Defaults to Waseem's location
 *                       (HSQ2lvxtEpWQUVinspzq) but env override wins.
 *   GHL_PIPELINE_ID   — Sales pipeline. Defaults to the constant below.
 *
 * Never throws. All errors are logged and swallowed — a lead-form POST
 * should never 500 because GHL is flaky.
 */

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";
const GHL_TIMEOUT_MS = 8000;

const GHL_LOCATION_ID_DEFAULT = "HSQ2lvxtEpWQUVinspzq";
const GHL_PIPELINE_ID_DEFAULT = "y1EwUjRMn2UWd9g2paa3";

/**
 * Pipeline stage IDs — verified from MCP introspection of Waseem's pipeline.
 * Keys are the human-friendly stage names used in calling code.
 */
export const GHL_STAGE_IDS = {
  inbound: "3710b6ca-df73-4e04-9d4b-f9babec16a22",
  "appointment-set": "94971745-8484-42d0-a0f8-2d42c172228d",
  referral: "2bd582b9-9e6e-47a8-bc8e-0b81a493ce13",
  "no-show": "3e0ab16c-88bd-44c0-9c83-fb9e0fd7410b",
  "appointment-conducted": "86df95b7-3c51-4a2d-91c0-17e3c27a777c",
  client: "b5dd72da-d93e-40ad-aefe-b2efbffa208d",
} as const;

export type GhlStageKey = keyof typeof GHL_STAGE_IDS;

/**
 * Custom field IDs (contact model) — verified from MCP introspection.
 * These hold the quiz answers from /discovery + /thank-you.
 */
export const GHL_CUSTOM_FIELDS = {
  q1_business_type: "h9Tdj7HlILHxhH9he6tT",
  q2_team_size: "IAYMoKdoZD5eBlttucWm",
  q3_bottleneck: "1XK8RaglMR6njfV6IfrK",
  q4_monthly_leads: "Ng0G5M6ohcatUWljXEiY",
  q5_automation_wishlist: "bbS8Lp5598OVELz3CNJz",
  q6_revenue_range: "i1HrL7rXJckfymJyFZjg", // RADIO — use mapRevenueToGhlOption
  q7_urgency: "V4K7b5vaJtHasWt6zZlV",
  business_name: "DbJR0bM2mC62wFP7g3N8",
  website: "p8nsiQMU6Vbb3kyTxtpE",
  ref_source: "RFrh47kYGuA1HIioziz1",
  campaign: "EhD7LkXZJIqC4ubkhWxn",
  timezone: "YX63V6o2TvzT6BESlaN7",
} as const;

export type GhlQualification = {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  businessType?: string;
  teamSize?: string;
  bottleneck?: string;
  monthlyLeads?: number | string;
  automationWishlist?: string;
  revenueRange?: string;
  urgency?: string;
  businessName?: string;
  website?: string;
  source?: string;
  campaign?: string;
  timezone?: string;
};

export type GhlLeadScore = "HOT" | "WARM" | "COLD";

type DevSkipResult = { contactId: "dev-skip"; isNew: false };

function getEnv() {
  const token = process.env.GHL_API_TOKEN || "";
  const locationId =
    process.env.GHL_LOCATION_ID || GHL_LOCATION_ID_DEFAULT;
  const pipelineId =
    process.env.GHL_PIPELINE_ID || GHL_PIPELINE_ID_DEFAULT;
  return { token, locationId, pipelineId };
}

function devSkip(reason: string): DevSkipResult {
  console.warn(`[ghl] dev-skip — ${reason}`);
  return { contactId: "dev-skip", isNew: false };
}

/**
 * Single fetch wrapper:
 *  - Adds GHL auth + version + JSON content-type
 *  - 8s timeout via AbortController
 *  - Returns parsed JSON or `null` on any failure (never throws)
 */
async function ghlFetch<T>(
  path: string,
  init: { method: string; body?: unknown; query?: Record<string, string> },
): Promise<T | null> {
  const { token } = getEnv();
  if (!token) {
    console.warn("[ghl] GHL_API_TOKEN missing — skipping API call", { path });
    return null;
  }

  let url = `${GHL_API_BASE}${path}`;
  if (init.query) {
    const qs = new URLSearchParams(init.query).toString();
    url += `?${qs}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GHL_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: init.method,
      headers: {
        Authorization: `Bearer ${token}`,
        Version: GHL_API_VERSION,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: init.body ? JSON.stringify(init.body) : undefined,
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[ghl] non-2xx", {
        path,
        status: res.status,
        body: text.slice(0, 500),
      });
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    console.error("[ghl] fetch failed", { path, err: String(err) });
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Map free-text revenue strings (quiz outputs) → the GHL Q6 RADIO option strings.
 *
 * Valid GHL options:
 *   "Less than $50k", "$50k - $100k", "$100k - $250k",
 *   "$250k - $1M", "$1M - $5M", "$5M +"
 */
export function mapRevenueToGhlOption(str: string | undefined): string {
  if (!str) return "Less than $50k";
  const s = str.toLowerCase().replace(/\s+/g, "");

  // Quiz tokens we know about
  if (s.includes("under$10k") || s.includes("lessthan") || s.includes("<10k"))
    return "Less than $50k";
  if (s.includes("10-30k") || s.includes("10k-30k")) return "Less than $50k";
  if (s.includes("30-50k") || s.includes("30k-50k")) return "Less than $50k";
  if (s.includes("50-100k") || s.includes("50k-100k") || s.includes("$50k-$100k"))
    return "$50k - $100k";
  if (s.includes("100-250k") || s.includes("100k-250k") || s.includes("$100k-$250k"))
    return "$100k - $250k";
  if (s.includes("100k-500k")) return "$100k - $250k";
  if (s.includes("250k-1m") || s.includes("250-1m") || s.includes("$250k-$1m"))
    return "$250k - $1M";
  if (s.includes("500k-plus") || s.includes("500k+")) return "$250k - $1M";
  if (s.includes("1m-5m") || s.includes("$1m-$5m")) return "$1M - $5M";
  if (s.includes("5m+") || s.includes("$5m+") || s.includes("over5m"))
    return "$5M +";

  // Fall back to a closest-bucket scan over the raw text
  if (s.includes("5m")) return "$5M +";
  if (s.includes("1m")) return "$1M - $5M";
  if (s.includes("250k")) return "$250k - $1M";
  if (s.includes("100k")) return "$100k - $250k";
  if (s.includes("50k")) return "$50k - $100k";
  return "Less than $50k";
}

/**
 * Build the customFields array for /contacts/upsert.
 * Skip any empty values — GHL rejects empty radio answers.
 */
function buildCustomFields(input: GhlQualification) {
  const fields: Array<{ id: string; field_value: string | number }> = [];

  const push = (id: string, val: string | number | undefined | null) => {
    if (val === undefined || val === null) return;
    const s = String(val).trim();
    if (!s) return;
    fields.push({ id, field_value: s });
  };

  push(GHL_CUSTOM_FIELDS.q1_business_type, input.businessType);
  push(GHL_CUSTOM_FIELDS.q2_team_size, input.teamSize);
  push(GHL_CUSTOM_FIELDS.q3_bottleneck, input.bottleneck);

  if (input.monthlyLeads !== undefined && input.monthlyLeads !== null) {
    const ml =
      typeof input.monthlyLeads === "number"
        ? `~${input.monthlyLeads} leads/mo`
        : String(input.monthlyLeads);
    push(GHL_CUSTOM_FIELDS.q4_monthly_leads, ml);
  }

  push(GHL_CUSTOM_FIELDS.q5_automation_wishlist, input.automationWishlist);

  if (input.revenueRange) {
    push(
      GHL_CUSTOM_FIELDS.q6_revenue_range,
      mapRevenueToGhlOption(input.revenueRange),
    );
  }

  push(GHL_CUSTOM_FIELDS.q7_urgency, input.urgency);
  push(GHL_CUSTOM_FIELDS.business_name, input.businessName);
  push(GHL_CUSTOM_FIELDS.website, input.website);
  push(GHL_CUSTOM_FIELDS.ref_source, input.source);
  push(GHL_CUSTOM_FIELDS.campaign, input.campaign);
  push(GHL_CUSTOM_FIELDS.timezone, input.timezone);

  return fields;
}

// ─── Public API ────────────────────────────────────────────────────────────

/**
 * Upsert a contact. Returns `{ contactId, isNew }` or `{ contactId: "dev-skip", isNew: false }`
 * if env vars are missing or the API call fails.
 */
export async function upsertGhlContact(
  input: GhlQualification,
  scoreTag: GhlLeadScore | null,
  extraTags: string[] = [],
): Promise<{ contactId: string; isNew: boolean }> {
  const { token, locationId } = getEnv();
  if (!token) return devSkip("GHL_API_TOKEN unset");
  if (!input.email) return devSkip("upsert requires email");

  const tags: string[] = [];
  if (scoreTag) tags.push(`score:${scoreTag.toLowerCase()}`);
  if (input.source) tags.push(`source:${input.source}`);
  for (const t of extraTags) if (t) tags.push(t);

  const body: Record<string, unknown> = {
    locationId,
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    phone: input.phone,
    source: input.source || "skynetjoe.com",
    tags,
    customFields: buildCustomFields(input),
  };
  if (input.timezone) body.timezone = input.timezone;

  // Strip undefined keys so we don't ship `firstName: undefined`
  for (const k of Object.keys(body)) {
    if (body[k] === undefined) delete body[k];
  }

  type UpsertResp = {
    contact?: { id?: string };
    new?: boolean;
    isNew?: boolean;
  };
  const resp = await ghlFetch<UpsertResp>("/contacts/upsert", {
    method: "POST",
    body,
  });

  const id = resp?.contact?.id;
  if (!id) return devSkip("upsert returned no contact id");

  const isNew = Boolean(resp?.new ?? resp?.isNew ?? false);
  return { contactId: id, isNew };
}

/**
 * Add tags to a contact (idempotent on GHL's side).
 * Silently no-ops if env missing or API fails.
 */
export async function addGhlTags(
  contactId: string,
  tags: string[],
): Promise<void> {
  if (!tags.length) return;
  if (!contactId || contactId === "dev-skip") return;
  const { token } = getEnv();
  if (!token) return;

  await ghlFetch(`/contacts/${contactId}/tags`, {
    method: "POST",
    body: { tags: tags.filter(Boolean) },
  });
}

/**
 * Look up an existing opportunity for a contact (returns the most recent
 * one in the configured pipeline), or null.
 */
async function findOpportunityForContact(
  contactId: string,
): Promise<{ id: string; pipelineStageId?: string; status?: string } | null> {
  const { token, locationId, pipelineId } = getEnv();
  if (!token) return null;

  type SearchResp = {
    opportunities?: Array<{
      id?: string;
      pipelineId?: string;
      pipelineStageId?: string;
      status?: string;
    }>;
  };

  const resp = await ghlFetch<SearchResp>(`/opportunities/search`, {
    method: "GET",
    query: { location_id: locationId, contact_id: contactId },
  });

  const opps = resp?.opportunities || [];
  // Prefer one in our configured pipeline
  const inPipeline = opps.find((o) => o.pipelineId === pipelineId && o.id);
  const fallback = opps.find((o) => o.id);
  const pick = inPipeline || fallback;
  if (!pick?.id) return null;
  return {
    id: pick.id,
    pipelineStageId: pick.pipelineStageId,
    status: pick.status,
  };
}

/**
 * Create a new opportunity for a contact, OR move an existing one to the
 * desired stage. Returns the opportunity id (or "dev-skip" when env unset).
 */
export async function createOrUpdateGhlOpportunity(input: {
  contactId: string;
  name: string;
  stage: GhlStageKey;
  monetaryValue?: number;
  source?: string;
}): Promise<{ opportunityId: string }> {
  const { token, locationId, pipelineId } = getEnv();
  if (!token || !input.contactId || input.contactId === "dev-skip") {
    return { opportunityId: "dev-skip" };
  }

  const stageId = GHL_STAGE_IDS[input.stage];
  if (!stageId) {
    console.error("[ghl] unknown stage key", input.stage);
    return { opportunityId: "dev-skip" };
  }

  // 1. Does this contact already have an opportunity?
  const existing = await findOpportunityForContact(input.contactId);

  if (existing) {
    type UpdateResp = { opportunity?: { id?: string } };
    const updateBody: Record<string, unknown> = {
      pipelineStageId: stageId,
      name: input.name,
    };
    if (input.monetaryValue !== undefined) {
      updateBody.monetaryValue = input.monetaryValue;
    }
    // Only flip to open if it's currently abandoned/lost — don't downgrade won.
    if (existing.status && existing.status !== "won") {
      updateBody.status = "open";
    }
    const resp = await ghlFetch<UpdateResp>(
      `/opportunities/${existing.id}`,
      { method: "PUT", body: updateBody },
    );
    return { opportunityId: resp?.opportunity?.id || existing.id };
  }

  // 2. No existing opportunity — create one.
  type CreateResp = { opportunity?: { id?: string } };
  const createBody: Record<string, unknown> = {
    pipelineId,
    locationId,
    name: input.name,
    pipelineStageId: stageId,
    status: "open",
    contactId: input.contactId,
  };
  if (input.monetaryValue !== undefined) {
    createBody.monetaryValue = input.monetaryValue;
  }
  if (input.source) createBody.source = input.source;

  const resp = await ghlFetch<CreateResp>("/opportunities/", {
    method: "POST",
    body: createBody,
  });

  const id = resp?.opportunity?.id;
  if (!id) {
    console.error("[ghl] opportunity create returned no id");
    return { opportunityId: "dev-skip" };
  }
  return { opportunityId: id };
}

/**
 * One-call helper: upsert contact → tag → create/update opportunity.
 *
 * Used by /api/leads (stage: "inbound") and /api/webhooks/calendly
 * (stage: "appointment-set" on invitee.created, "referral" if applicable).
 *
 * On dev-skip we return `{ contactId: "dev-skip" }` with no opportunityId so
 * callers can branch but don't need to special-case errors.
 */
export async function handleGhlLead(input: {
  qualification: GhlQualification;
  score: GhlLeadScore | null;
  stage: Extract<GhlStageKey, "inbound" | "appointment-set" | "referral">;
  source: string;
  extraTags?: string[];
}): Promise<{ contactId: string; opportunityId?: string }> {
  const qualification: GhlQualification = {
    ...input.qualification,
    source: input.qualification.source || input.source,
  };

  const { contactId } = await upsertGhlContact(
    qualification,
    input.score,
    input.extraTags || [],
  );

  if (contactId === "dev-skip") {
    return { contactId };
  }

  // Build opportunity name from the strongest signal available.
  const nameParts = [
    qualification.firstName,
    qualification.lastName,
  ].filter(Boolean);
  const personName = nameParts.join(" ").trim() || qualification.email;
  const oppName =
    qualification.businessName
      ? `${personName} — ${qualification.businessName}`
      : `${personName} — ${input.source}`;

  const { opportunityId } = await createOrUpdateGhlOpportunity({
    contactId,
    name: oppName,
    stage: input.stage,
    source: input.source,
  });

  return {
    contactId,
    opportunityId: opportunityId === "dev-skip" ? undefined : opportunityId,
  };
}

/**
 * Move an existing opportunity to a stage (used by calendly canceled events).
 * Returns true on success, false on any failure or dev-skip.
 */
export async function moveContactOpportunityToStage(
  contactId: string,
  stage: GhlStageKey,
  extraTags: string[] = [],
): Promise<boolean> {
  const { token } = getEnv();
  if (!token || !contactId || contactId === "dev-skip") return false;

  const existing = await findOpportunityForContact(contactId);
  if (!existing) return false;

  const stageId = GHL_STAGE_IDS[stage];
  if (!stageId) return false;

  const resp = await ghlFetch(`/opportunities/${existing.id}`, {
    method: "PUT",
    body: { pipelineStageId: stageId },
  });

  if (extraTags.length) {
    await addGhlTags(contactId, extraTags);
  }

  return resp !== null;
}

/**
 * Look up a contact id by email — small helper used by the calendly cancel
 * path (we may not have a contactId in the canceled payload).
 *
 * Uses POST /contacts/upsert with just the email — GHL returns the existing
 * contact when it matches and creates one when it doesn't.
 */
export async function getOrCreateContactByEmail(
  email: string,
  extra?: Partial<GhlQualification>,
): Promise<string | null> {
  if (!email) return null;
  const { contactId } = await upsertGhlContact(
    { email, ...extra },
    null,
    [],
  );
  return contactId === "dev-skip" ? null : contactId;
}
