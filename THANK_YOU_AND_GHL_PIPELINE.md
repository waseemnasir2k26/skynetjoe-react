# Thank-You + GHL Pipeline

Post-booking experience for SkynetLabs discovery-call funnel. Owns the
`/thank-you` page and the Calendly → GHL webhook plumbing.

---

## 1. Page Composition — `/thank-you`

Server component at `src/app/thank-you/page.tsx` (`ƒ Dynamic` route — uses
`searchParams`). Single small client component at `src/app/thank-you/ReferralForm.tsx`
for the referral nudge submit state.

| # | Section            | Detail                                                                                                                                                                                                                                                                                       |
|---|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | Hero               | Confirmation headline w/ booked time pulled from Calendly's redirect params (`event_start_time` / `invitee_event_start_time` / `start_time`). Greets by first name if `invitee_full_name` present. Right-side `waseem-rooftop-smile.jpg` (4:5). CSS-only animated checkmark (pop + path draw). |
| 2 | "What Happens Next" timeline | 4 steps: confirmation email (now) → SMS + 2-min Loom prep (24h before) → 30-min strategy session (call day) → fixed-price scope doc (within 48h after). Horizontal on md+, vertical on mobile. Staggered fade-up via CSS keyframes (no framer-motion).                          |
| 3 | AI Audit Preview   | "Here's what I'll likely find." 4 bullets, tailored to `?bucket=` query param from the stress-quiz (`chaos`, `leaking`, `manageable`, `clean`). Falls back to generic-but-confident bullets when no bucket present.                                                                            |
| 4 | Pre-call homework  | "Send me ONE Loom of your current funnel." Buttons: open Loom (new tab) + email Waseem with `?subject=My funnel walkthrough&body=<pre-filled w/ ref + bucket + score context>`. Shows the invitee's email back to them if Calendly passed it.                                                |
| 5 | 3 trust-building reads | Top 3 ROI case studies hard-coded by slug: `manhattan-dental-atelier-flagship`, `eu-logistics-email-triage-n8n`, `northeast-recovery-brand-intake-rescue`. Each card links to `/case-studies/[slug]`.                                                                                       |
| 6 | Referral nudge     | `$200 credit` ask. Two email inputs (friend's + yours) + honeypot field. POSTs to `/api/leads` with `source: "referral"` and a `qualification.businessType: "referral"` stub so it passes the existing route's validator (the parallel-agent route requires qualification OR booking).        |

### Animations & accessibility

- All animations defined inline in a `<style>` tag scoped to the page (no
  globals.css touched).
- `@media (prefers-reduced-motion: reduce)` disables checkmark draw, step
  fade-in, and dash-offset animations — content renders instantly.
- Mobile-first grid: hero stacks at <md, timeline collapses to single
  column, audit + homework switch to vertical.

### Query params consumed

| Param                         | Source                          | Use                                                          |
|-------------------------------|---------------------------------|--------------------------------------------------------------|
| `ref`                         | `/discovery-call` redirect      | Tracked in Loom email body so Waseem sees funnel origin.     |
| `bucket`                      | `/tools/agency-stress-quiz`     | Personalizes AI Audit Preview bullets.                       |
| `score`                       | `/tools/ai-readiness-score`     | Included in Loom email body context.                         |
| `event_start_time` / `invitee_event_start_time` / `start_time` | Calendly redirect | Formats hero "Talk to you on …" string.                      |
| `invitee_full_name` / `name`  | Calendly redirect               | First-name greeting in hero.                                 |
| `invitee_email` / `email`     | Calendly redirect               | Friendly "email pre-filled from …" hint under Loom buttons.  |

---

## 2. Webhook Payload Contract — Calendly → enrichment → GHL

### Inbound (Calendly → `/api/webhooks/calendly`)

```jsonc
POST /api/webhooks/calendly
Calendly-Webhook-Signature: t=1730000000,v1=<hex_hmac_sha256>
Content-Type: application/json

{
  "event": "invitee.created",
  "created_at": "2026-05-22T10:30:00Z",
  "payload": {
    "event_type": { "uuid": "...", "name": "Schedule a Free Consultation" },
    "event":      { "uuid": "...", "start_time": "...", "end_time": "..." },
    "invitee": {
      "uuid": "...", "name": "...", "first_name": "...", "last_name": "...",
      "email": "...", "timezone": "...", "text_reminder_number": "..."
    },
    "questions_and_answers": [
      { "question": "What's your biggest leak right now?", "answer": "..." },
      { "question": "Monthly leads?",                       "answer": "..." },
      { "question": "Monthly revenue?",                     "answer": "..." },
      { "question": "Urgency / timeline?",                  "answer": "..." },
      { "question": "Stress bucket from quiz?",             "answer": "leaking" },
      { "question": "AI readiness score?",                  "answer": "62" }
    ],
    "tracking": {
      "utm_source": "discovery-call",
      "utm_medium": "...", "utm_campaign": "...",
      "utm_content": "...", "utm_term": "..."
    }
  }
}
```

### Outbound (enriched → `GHL_WEBHOOK_URL`)

```jsonc
POST $GHL_WEBHOOK_URL
Content-Type: application/json

{
  "source": "discovery-call",            // utm_source > utm_campaign > fallback
  "event": "invitee.created",
  "booked_at": "2026-05-22T10:30:00Z",
  "scheduled_at": "2026-05-28T14:00:00Z",
  "scheduled_end": "2026-05-28T14:30:00Z",
  "event_type": "Schedule a Free Consultation",
  "event_type_uuid": "...",
  "event_uuid": "...",
  "invitee_uuid": "...",
  "first_name": "...",
  "last_name": "...",
  "full_name": "...",
  "email": "...",
  "phone": "...",                        // from invitee.text_reminder_number
  "timezone": "Asia/Jakarta",
  "qualification": {
    "bucket": "leaking",
    "readiness_score": "62",
    "monthly_leads": "...",
    "monthly_revenue": "...",
    "urgency": "...",
    "biggest_leak": "..."
  },
  "utm": { "source": "...", "medium": "...", "campaign": "...",
           "content": "...", "term": "..." },
  "raw_qa": [ { "question": "...", "answer": "..." }, ... ],
  "tags": [
    "source:discovery-call",
    "bucket:leaking",
    "readiness:62",
    "urgency:30-60d",
    "revenue:100k-500k",
    "calendly-booked"
  ]
}
```

Response (always 200 unless body/sig invalid):

```json
{ "ok": true, "ghl_forwarded": true }
```

### Health-check (GET)

```jsonc
GET /api/webhooks/calendly
→ 200 {
    "ok": true,
    "route": "/api/webhooks/calendly",
    "signature_required": true,
    "ghl_configured": true
  }
```

Useful for confirming the route is live before subscribing the webhook in
Calendly admin.

---

## 3. Environment Variables Introduced

Added to `.env.example`:

| Var                          | Required        | Purpose                                                                                  |
|------------------------------|-----------------|------------------------------------------------------------------------------------------|
| `CALENDLY_WEBHOOK_SECRET`    | yes (prod)      | HMAC-SHA256 signing key from Calendly webhook subscription. If unset, signature check is skipped (dev-only escape hatch — logs a warning). |
| `GHL_WEBHOOK_URL`            | yes (prod)      | GHL Inbound Webhook URL. Shared with `/api/leads` (parallel agent owns the leads route). |

Pre-existing vars left untouched: `GHL_DISCOVERY_WEBHOOK_URL`, `RESEND_API_KEY`,
`RESEND_FROM`, `LEAD_NOTIFY_EMAIL`, `NEXT_PUBLIC_GTM_ID`.

---

## 4. Security Posture

### Calendly signature verification

- Algorithm: **HMAC-SHA256** over the raw request body (NOT the parsed JSON).
- Header: `Calendly-Webhook-Signature: t=<unix_ts>,v1=<hex_hmac>` — may
  contain multiple `v1=` values during key rotation; we accept any match.
- Message signed: `${t}.${rawBody}` per Calendly's documented spec.
- Comparison: constant-time hex compare to defeat timing attacks.
- **Freshness window**: 5 minutes. Timestamps older than 5 min OR in the
  future by more than 5 min are rejected. Defeats replay attacks.
- Invalid / missing signature → `401 { ok: false, error: "Invalid signature" }`
  and the request is dropped (no GHL forward, no logging of payload).
- Implementation uses the Web Crypto API (`crypto.subtle.importKey` +
  `crypto.subtle.sign`) — no Node-only `crypto` dependency, runs in any
  Edge-compatible runtime if we ever flip `runtime`.

### Dev-mode escape hatch

If `CALENDLY_WEBHOOK_SECRET` is unset, the route logs
`"CALENDLY_WEBHOOK_SECRET not set — skipping signature verification"` and
processes the request. Intended for local `next dev` testing only. **Set
the secret before pointing Calendly at production.**

### Referral form

- Honeypot field `website` is positioned off-screen (`left: -10000px`,
  `aria-hidden="true"`, `tabIndex={-1}`). Bots that fill all visible
  inputs will populate it; the server (or future hardening) silently
  swallows those submissions.
- Email validated client-side with `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
- `/api/leads` (owned by parallel agent) already validates email and
  rejects payloads without `qualification` OR `booking`. The referral
  form sends a `qualification.businessType: "referral"` stub so the
  payload passes that validator.

---

## 5. Build Status

- `npm run build` → **clean**. TypeScript passes, all routes generated.
  Two transient ENOENT failures occurred on retries due to OneDrive
  sync racing on `.next/` artifacts; the final clean build completed
  successfully.
- Built routes confirmed:
  - `ƒ /thank-you` — dynamic (uses `searchParams`)
  - `ƒ /api/webhooks/calendly` — dynamic API route
  - `ƒ /api/leads` — already existed, untouched
- No new dependencies added. Uses only:
  - `next/image`, `next/link`, `next/server`
  - `lucide-react` (already in deps — `Mail`, `MessageSquareText`,
    `Calendar`, `FileText`, `Sparkles`, `Video`, `ArrowRight`, `Gift`)
  - Web Crypto API (built-in) for HMAC
  - React 19 `useState` in the referral client component
- Sitemap.ts left alone — `/thank-you` is `robots: { index: false }`.
- `/api/leads` left alone (parallel agent shipped it). Referral form
  sends a `businessType: "referral"` stub through the existing
  `qualification` validator path.

---

## 6. Files Touched

```
NEW   src/app/thank-you/page.tsx
NEW   src/app/thank-you/ReferralForm.tsx
NEW   src/app/api/webhooks/calendly/route.ts
EDIT  .env.example                              (added 2 vars)
NEW   THANK_YOU_AND_GHL_PIPELINE.md             (this doc)
```

Not touched: homepage, hero, layout, sitemap.ts, /discovery-call,
/api/leads, /api/discovery, any other route.
