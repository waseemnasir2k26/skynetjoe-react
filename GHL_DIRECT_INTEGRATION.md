# GHL Direct REST Integration

Date: 2026-05-22
Author: SkynetLabs automation team
Status: shipped (build clean, awaiting prod token)

The site no longer relies on a hand-built GHL workflow + inbound webhook.
`/api/leads` and `/api/webhooks/calendly` now call the GHL REST API directly
through `src/lib/ghl.ts`. Net result: no manual GHL workflow setup, contacts
upserted and opportunities created/moved automatically.

---

## 1. `src/lib/ghl.ts` API surface

### Constants (exported)

| Name                 | Type                       | Notes                                              |
| -------------------- | -------------------------- | -------------------------------------------------- |
| `GHL_STAGE_IDS`      | `Record<GhlStageKey, str>` | Pipeline stage UUID lookup (verified via MCP)      |
| `GHL_CUSTOM_FIELDS`  | `Record<string, string>`   | Contact custom-field id map (Q1-Q7 + biz fields)   |

### Types

```ts
export type GhlQualification = {
  email: string;
  firstName?, lastName?, phone?: string;
  businessType?, teamSize?, bottleneck?: string;
  monthlyLeads?: number | string;
  automationWishlist?, revenueRange?, urgency?: string;
  businessName?, website?, source?, campaign?, timezone?: string;
};

export type GhlLeadScore = "HOT" | "WARM" | "COLD";

export type GhlStageKey =
  | "inbound"
  | "appointment-set"
  | "referral"
  | "no-show"
  | "appointment-conducted"
  | "client";
```

### Functions

| Function                              | Behavior                                                                          |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| `upsertGhlContact(input, score, tags)` | POST `/contacts/upsert`. Returns `{ contactId, isNew }`.                          |
| `addGhlTags(contactId, tags)`         | POST `/contacts/{id}/tags`. Idempotent on GHL side.                               |
| `createOrUpdateGhlOpportunity(input)` | GET `/opportunities/search` → PUT existing OR POST new. No duplicate opps.        |
| `handleGhlLead(input)`                | One-call: upsert → tag → opportunity at the desired stage.                        |
| `moveContactOpportunityToStage(...)`  | Find existing opp → PUT new `pipelineStageId`. Used by `invitee.canceled`.        |
| `getOrCreateContactByEmail(email)`    | Small helper for the cancel path when we only have email.                         |
| `mapRevenueToGhlOption(str)`          | Maps quiz revenue strings → the GHL Q6 RADIO option strings (closest bucket).     |

### Behavioral guarantees

- **Never throws.** All errors caught and logged via `console.error`. The
  /api/leads route never 500s because GHL is flaky.
- **Dev-skip on missing env.** If `GHL_API_TOKEN` is unset, every public
  function returns `{ contactId: "dev-skip" }` so local dev / preview deploys
  work without configuration.
- **8-second timeout** per HTTP call via `AbortController`. No hung requests.
- **Native `fetch`** — no axios, no extra deps.
- **No duplicate opportunities.** `handleGhlLead` searches by `contact_id`
  before creating; if a Pipeline opportunity exists it updates the stage instead.

---

## 2. Env-var contract

| Var                          | Required? | Default                                  | Notes                                                                                            |
| ---------------------------- | --------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `GHL_API_TOKEN`              | **Yes**   | —                                        | Private Integration Token. Scopes: contacts.write, contacts.readonly, opportunities.write, opportunities.readonly, locations.readonly. |
| `GHL_LOCATION_ID`            | No        | `HSQ2lvxtEpWQUVinspzq`                   | Waseem's sub-account. Override when re-selling.                                                  |
| `GHL_PIPELINE_ID`            | No        | `y1EwUjRMn2UWd9g2paa3`                   | Sales pipeline. Override per location.                                                           |
| `CALENDLY_WEBHOOK_SECRET`    | Yes (prod) | —                                       | HMAC signing key. If absent → signature check is skipped (dev only).                             |
| `GHL_WEBHOOK_URL`            | DEPRECATED | —                                       | No longer read. Safe to remove after verification.                                               |
| `GHL_DISCOVERY_WEBHOOK_URL`  | DEPRECATED | —                                       | Same — no longer read.                                                                           |

---

## 3. Stage transition logic

| Trigger source            | Event                              | GHL stage             | Tags applied                                                            |
| ------------------------- | ---------------------------------- | --------------------- | ----------------------------------------------------------------------- |
| POST `/api/leads`         | discovery quiz / form submit       | `inbound`             | `score:hot|warm|cold`, `source:<src>`, `discovery-call`, `booked` OR `qualified-only`, `urgency:<v>`, `revenue:<v>` |
| Calendly `invitee.created` | booking made                       | `appointment-set` (moves existing inbound opp, doesn't dup) | `calendly-booked`, `discovery-call`, `source:<utm>`, `campaign:<utm>` |
| Calendly `invitee.canceled` | booking canceled                  | `no-show`             | `calendly-canceled`                                                     |
| (future) manual            | call happened                      | `appointment-conducted` | —                                                                       |
| (future) referral form     | referral inbound                   | `referral`            | `referral:<source>`                                                     |
| (future) won deal          | client signed                      | `client`              | `client:won`                                                            |

**Move-don't-duplicate rule**: `createOrUpdateGhlOpportunity` always calls
`GET /opportunities/search?location_id=&contact_id=` first. If an opportunity
in our pipeline exists, it's PUT-updated with the new stage. Status flips to
`open` unless current status is `won` (never downgrade a win).

---

## 4. Custom field mapping

GHL contact custom field IDs are stored in the `GHL_CUSTOM_FIELDS` constant.
`buildCustomFields()` ships them as `[{ id, field_value }]` to `/contacts/upsert`.

| Quiz Q | Field name              | GHL field ID            | GHL type    | Source in payload                  |
| ------ | ----------------------- | ----------------------- | ----------- | ---------------------------------- |
| Q1     | Business type           | `h9Tdj7HlILHxhH9he6tT`  | TEXT        | `qualification.businessType`       |
| Q2     | Team size               | `IAYMoKdoZD5eBlttucWm`  | LARGE_TEXT  | `qualification.teamSize`           |
| Q3     | Bottleneck / challenge  | `1XK8RaglMR6njfV6IfrK`  | LARGE_TEXT  | `qualification.bottleneck` (or legacy `biggestLeak`) |
| Q4     | Monthly leads           | `Ng0G5M6ohcatUWljXEiY`  | LARGE_TEXT  | `qualification.monthlyLeads` (number → "~N leads/mo") |
| Q5     | Automation wishlist     | `bbS8Lp5598OVELz3CNJz`  | LARGE_TEXT  | `qualification.automationWishlist` OR `automateTargets[].join(", ")` |
| Q6     | Revenue range           | `i1HrL7rXJckfymJyFZjg`  | **RADIO**   | `qualification.revenueRange` → `mapRevenueToGhlOption()` |
| Q7     | Timeline / urgency      | `V4K7b5vaJtHasWt6zZlV`  | LARGE_TEXT  | `qualification.urgency`            |
| —      | Business name           | `DbJR0bM2mC62wFP7g3N8`  | TEXT        | `qualification.businessName`       |
| —      | Website                 | `p8nsiQMU6Vbb3kyTxtpE`  | TEXT        | `qualification.website`            |
| —      | Source                  | `RFrh47kYGuA1HIioziz1`  | TEXT        | `qualification.source` (default `discovery-call`) |
| —      | Campaign                | `EhD7LkXZJIqC4ubkhWxn`  | TEXT        | `utm.campaign`                     |
| —      | Timezone                | `YX63V6o2TvzT6BESlaN7`  | TEXT        | `qualification.timezone` / Calendly invitee.timezone |

Empty values are silently skipped (no field shipped) — GHL rejects empty radio values.

### Revenue mapping (`mapRevenueToGhlOption`)

Maps free-text quiz strings → the six valid GHL RADIO options.

| Quiz string (lowercased, no whitespace)      | GHL option         |
| -------------------------------------------- | ------------------ |
| `under$10k`, `lessthan...`, `<10k`           | `Less than $50k`   |
| `10-30k`, `10k-30k`                          | `Less than $50k`   |
| `30-50k`, `30k-50k`                          | `Less than $50k`   |
| `50-100k`, `50k-100k`, `$50k-$100k`          | `$50k - $100k`     |
| `100-250k`, `100k-250k`, `100k-500k`         | `$100k - $250k`    |
| `250k-1m`, `250-1m`, `$250k-$1m`, `500k-plus`, `500k+` | `$250k - $1M` |
| `1m-5m`                                      | `$1M - $5M`        |
| `5m+`, `over5m`                              | `$5M +`            |
| (fallback) contains `5m` / `1m` / etc.       | closest bucket     |
| (default)                                    | `Less than $50k`   |

---

## 5. Test plan

### 5a. Env smoke test (`/api/ghl-test`)

Hits `/contacts/upsert` with a hardcoded test contact.
Run after every deploy to confirm token + location are live.

```bash
# Local dev (no GHL token — should return ok:false, contactId:"dev-skip")
curl http://localhost:3000/api/ghl-test

# Production (should return ok:true with a real contactId)
curl https://app-mauve-eta-66.vercel.app/api/ghl-test
```

Expected (prod):
```json
{ "ok": true, "contactId": "abc123XYZ", "isNew": false, "env": { "tokenSet": true, "locationSet": true } }
```

### 5b. Lead form (`/api/leads`)

```bash
curl -X POST https://app-mauve-eta-66.vercel.app/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "source": "discovery-call",
    "email": "test+lead@skynetjoe.com",
    "firstName": "Alex",
    "lastName": "Tester",
    "phone": "+15555550100",
    "qualification": {
      "businessType": "dental clinic",
      "teamSize": "5-10",
      "bottleneck": "no-show patients eating margin",
      "monthlyLeads": "~120 leads/mo",
      "automationWishlist": "n8n + WhatsApp + GHL",
      "revenueRange": "100k-500k",
      "urgency": "this-month",
      "businessName": "Bali Smile Atelier",
      "website": "https://example.com",
      "timezone": "Asia/Makassar"
    },
    "utm": { "source": "linkedin", "campaign": "carousel-2026-05" }
  }'
```

Expected:
```json
{ "ok": true, "leadId": "lead_xxx", "score": "HOT", "contactId": "abc...", "opportunityId": "opp..." }
```

Check GHL: Contact created with tags `score:hot`, `source:discovery-call`,
`discovery-call`, `qualified-only`, `urgency:this-month`, `revenue:100k-500k`.
Opportunity in Pipeline at "Inbound Lead" stage. Custom fields Q1-Q7 + biz +
website + timezone populated.

### 5c. Honeypot

```bash
curl -X POST https://app-mauve-eta-66.vercel.app/api/leads \
  -H "Content-Type: application/json" \
  -d '{"_honeypot":"spam","qualification":{"email":"bot@x.com"}}'
# Returns ok:true with random leadId but writes nothing to GHL.
```

### 5d. Calendly webhook (`invitee.created`)

```bash
# Health check first
curl https://app-mauve-eta-66.vercel.app/api/webhooks/calendly
# → { ok:true, signature_required:true|false, ghl_api_configured:true|false }

# Real invitee.created (replace t= and v1= with real Calendly HMAC)
curl -X POST https://app-mauve-eta-66.vercel.app/api/webhooks/calendly \
  -H "Content-Type: application/json" \
  -H "Calendly-Webhook-Signature: t=1716393600,v1=<hmac-hex>" \
  -d @calendly-invitee-created.json
```

`calendly-invitee-created.json`:
```json
{
  "event": "invitee.created",
  "created_at": "2026-05-22T10:00:00.000000Z",
  "payload": {
    "event_type": { "uuid": "ET-1", "name": "Discovery Call" },
    "event": { "uuid": "EV-1", "start_time": "2026-05-25T15:00:00Z", "end_time": "2026-05-25T15:30:00Z" },
    "invitee": {
      "uuid": "IV-1", "name": "Alex Tester", "email": "test+lead@skynetjoe.com",
      "timezone": "Asia/Makassar"
    },
    "questions_and_answers": [
      { "question": "What type of business?", "answer": "Dental clinic" },
      { "question": "Monthly leads?", "answer": "~120" },
      { "question": "Revenue range?", "answer": "100k-500k" }
    ],
    "tracking": { "utm_source": "linkedin", "utm_campaign": "carousel-2026-05" }
  }
}
```

Expected:
- Same contact as 5b (matched by email) — no duplicate.
- Opportunity moved from "Inbound Lead" → "Appointment Set".
- Tags added: `calendly-booked`, `discovery-call`, `utm:linkedin`, `campaign:carousel-2026-05`.

### 5e. Calendly cancel (`invitee.canceled`)

Same payload, `event: "invitee.canceled"`. Expected: opportunity moved to
"No Show" stage, tag `calendly-canceled` added. If contact doesn't exist
GHL upsert creates it then move silently fails (no opp to move) — returns
`{ ok:true, contactId, moved:false }`.

---

## 6. Build status

```
✓ Compiled successfully in 8.4s
✓ Generating static pages using 23 workers (903/903) in 8.0s
├ ƒ /api/ghl-test
├ ƒ /api/leads
├ ƒ /api/webhooks/calendly
```

Clean. Zero TypeScript errors, zero lint warnings on the four touched files.

---

## 7. Files touched

| File                                          | Action    |
| --------------------------------------------- | --------- |
| `src/lib/ghl.ts`                              | **NEW**   |
| `src/app/api/ghl-test/route.ts`               | **NEW**   |
| `src/app/api/leads/route.ts`                  | edited    |
| `src/app/api/webhooks/calendly/route.ts`      | edited    |
| `.env.example`                                | edited    |

No other files touched. No commits made.
