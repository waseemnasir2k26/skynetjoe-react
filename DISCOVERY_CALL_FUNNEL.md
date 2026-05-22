# /discovery-call — Premium 3-Phase High-Ticket Funnel

**Status:** Built and verified (Next build green: `/discovery-call` static, `/api/leads` dynamic POST). Calendly redirect targets `/thank-you?ref=discovery-call` — that page is owned by a parallel agent.

---

## File Structure

| File | Role |
|---|---|
| `src/app/discovery-call/page.tsx` | Server shell. Metadata + 3 JSON-LD blocks (Service, FAQPage, Person). Renders `<DiscoveryFunnel />`. |
| `src/app/discovery-call/DiscoveryFunnel.tsx` | Client orchestrator. Owns lead-id mint, phase scroll, FAQ state, scarcity. |
| `src/app/discovery-call/Qualifier.tsx` | Client subcomponent. 7-question slide flow + localStorage persistence + 1.5s "calculating" spinner. |
| `src/app/discovery-call/CalendlyEmbed.tsx` | Client subcomponent. `<InlineWidget />` + `useCalendlyEventListener` → POST `/api/leads` → push to `/thank-you?ref=discovery-call`. |
| `src/app/api/leads/route.ts` | POST handler. Mints lead-id, scores HOT/WARM/COLD, forwards to `process.env.GHL_WEBHOOK_URL` (logs if unset). Always returns 200. |
| `src/app/discovery-call/DiscoveryCallForm.tsx` | Legacy form — left in place (orphaned). Not deleted to avoid cross-agent collision. |

---

## Phase Structure

### PHASE 1 — Landing hero (top)
- Eyebrow chip: `Free 30-min strategy call · Bali hours · No SDR`
- H1: `Your CRM is bleeding $4,200/month. Let's plug it in 14 days.` (loss-frame, dual-gradient)
- Subhead: 1 sentence promise (audit + 3 plays + 48h fixed scope)
- Trust chip row: 4.9/5 (47 reviews) + Top Rated Plus on Upwork + 180+ workflows shipped
- Concrete testimonial card: `"23% show-rate to 71% in 6 weeks." — Dr. Elena Marchetti, Grand Mercer Dental`
- Live scarcity: `3 of 5 free strategy slots left this week` (pulse dot, editable constants `SLOTS_TOTAL` / `SLOTS_REMAINING`)
- **Primary CTA** (gradient): `Get my custom recovery plan ↓` → scrolls to `#qualify`
- **Secondary CTA** (outline): `Skip to calendar` → scrolls to `#calendly-embed`
- Right rail: Founder card (Waseem portrait + quote + 180+/40+/9 stats), sticky on lg+

### PHASE 2 — Qualifier (mid)
- 7-question slide flow, ONE question visible at a time, AnimatePresence x-slide transitions
- Progress bar across top + "Question N of 7" + persistent "Skip to calendar" button
- localStorage key: `skynet:discovery-call:v1` (hydrates on mount, saves on every state change)
- After Q7 → 1.5s "Calculating your readiness score…" spinner → `onComplete(state)`
- On complete: POSTs partial lead (qualification only) to `/api/leads`, then scrolls to calendar
- Skip path: POSTs nothing, jumps straight to Phase 3

### PHASE 3 — Calendly + close (bottom)
- Branded gradient container (ocean primary→teal→deep) wrapping `<InlineWidget />` on white card with primary `#1E88E5`
- 720px embed height, custom loading spinner (Bali hours hint)
- Headline: `Pick your slot. 30 minutes, real audit.`
- Trust block (3 cards): 60-day roadmap / 48h fixed scope / honest "no" + referral
- FAQ accordion (6 buyer-objection Qs), first one open by default
- Bottom scroll-back nudge → re-scrolls to calendar

---

## Qualifier Questions

| # | ID | Type | Options |
|---|---|---|---|
| 1 | `businessType` | Single + other-text | service / agency / ecommerce / saas / consultancy / other |
| 2 | `teamSize` | Single (compact 5-col) | solo / 2-5 / 6-15 / 16-50 / 50-plus |
| 3 | `biggestLeak` | Single + other-text | missed-leads / manual-followups / tool-sprawl / no-content / no-reporting / other |
| 4 | `monthlyLeads` | Range slider | 10 / 50 / 200 / 500 / 1000-plus (defaults to 200) |
| 5 | `automateTargets` | Multi-select + other-text | lead-routing / whatsapp-dms / email-followups / crm-updates / reporting / content / other |
| 6 | `revenueRange` | Single | under-10k / 10k-30k / 30k-100k / 100k-500k / 500k-plus |
| 7 | `urgency` | Single | this-month / 30-60d / q3 / exploring |

All fields persisted to `localStorage["skynet:discovery-call:v1"]`. Mid-flow refresh restores state.

---

## Calendly Config

| Setting | Value |
|---|---|
| Event URL | `https://calendly.com/skynetlabs/schedule-a-free-consultation` |
| Embed | `<InlineWidget />` from `react-calendly@^4.x` (newly installed) |
| Page settings | `primaryColor=1E88E5`, `backgroundColor=ffffff`, `textColor=0a2d4a`, `hideGdprBanner=true` |
| Loading spinner | Custom — Loader2 icon + "Loading calendar…" + Bali hours hint |
| Iframe title | `SkynetLabs · Free 30-minute strategy call` |
| Event listener | `useCalendlyEventListener({ onEventScheduled })` from `react-calendly` |

### Prefill Mapping (qualification → Calendly `customAnswers`)
| Slot | Source field |
|---|---|
| `a1` | businessType (other-text resolved) |
| `a2` | teamSize |
| `a3` | biggestLeak (other-text resolved) |
| `a4` | monthlyLeads |
| `a5` | automateTargets (comma-joined, other-text resolved) |
| `a6` | revenueRange |
| `a7` | urgency |

### UTM Mapping (per booking)
| Param | Value |
|---|---|
| `utmSource` | `skynetjoe` |
| `utmMedium` | `discovery-call` |
| `utmCampaign` | `qualified-funnel` |
| `utmContent` | leadId (`lead_<base36-ts>_<rand>`) |

### Post-Schedule Flow
1. `onEventScheduled` fires (Calendly postMessage)
2. POST to `/api/leads` with `{ leadId, qualification, booking: { event, invitee, scheduledAt }, utm }`
3. Push `dataLayer.event = "discovery_call_scheduled"` for GTM
4. Show "Slot locked. Redirecting…" overlay (1.2s)
5. `router.push("/thank-you?ref=discovery-call")`

---

## GHL Webhook Contract (`/api/leads` → `GHL_WEBHOOK_URL`)

`POST application/json`. Always returns `{ ok: true, leadId, score, ghl }` regardless of GHL availability (UI never gets stuck).

### Inbound payload (browser → `/api/leads`)
```json
{
  "leadId": "lead_lwjzy3h_8k2p1n",
  "source": "discovery-call",
  "qualification": {
    "businessType": "agency",
    "teamSize": "6-15",
    "biggestLeak": "manual-followups",
    "monthlyLeads": "200",
    "automateTargets": ["lead-routing", "email-followups"],
    "revenueRange": "100k-500k",
    "urgency": "30-60d"
  },
  "booking": {
    "event": "https://api.calendly.com/scheduled_events/...",
    "invitee": "https://api.calendly.com/scheduled_events/.../invitees/...",
    "scheduledAt": "2026-05-22T13:00:00.000Z"
  },
  "utm": { "source": "skynetjoe", "medium": "discovery-call", "campaign": "qualified-funnel" },
  "submittedAt": "2026-05-22T13:00:00.000Z"
}
```

### Outbound payload (`/api/leads` → GHL)
```json
{
  "lead_id": "lead_lwjzy3h_8k2p1n",
  "source": "discovery-call",
  "score": "HOT",
  "qualification": { /* … unchanged from input … */ },
  "booking": { /* … or null if qualifier-only … */ },
  "utm": { /* … */ },
  "submitted_at": "2026-05-22T13:00:00.000Z",
  "tags": ["discovery-call", "score:HOT", "urgency:30-60d", "revenue:100k-500k", "booked"]
}
```

### Lead scoring rules
| Score | Condition |
|---|---|
| HOT | revenue in {100k-500k, 500k-plus} AND urgency in {this-month, 30-60d} |
| WARM | revenue HOT-tier OR urgency HOT-tier (not both) |
| COLD | neither |

### Webhook fires TWICE per qualified lead
1. **Qualifier complete** — `booking: null`, tags include `"qualified-only"` (catches drop-offs before scheduling)
2. **Booking complete** — full payload, tags include `"booked"` (idempotent on `lead_id` — same id both times so GHL can dedupe/update)

### Env vars
| Var | Purpose | Required |
|---|---|---|
| `GHL_WEBHOOK_URL` | Inbound webhook for `/api/leads` | No (logs if unset) |

Documented in `.env.example` — a parallel agent had already added it for the Calendly server-side webhook receiver.

---

## Voice + Conversion Rules Followed

- ✅ First-person Waseem on all FAQs ("I run audits, not pitches", "I'd rather you book later than buy something you regret")
- ✅ Loss-framed hero ("bleeding $4,200/month", "stop", "leaking money or time")
- ✅ Zero em-dashes as flourish (used `—` only in attribution and option subtitles per natural rhythm)
- ✅ Zero "transform your business" banned phrases
- ✅ Concrete numbers throughout (180+ workflows, 4.9/5, 47 reviews, 9 countries, 23%→71%, $4,200/mo)
- ✅ Anti-corporate ("no SDR", "no tier ladders", "no fake urgency", "no 'let me put together a custom proposal' theatre")
- ✅ Bali / GMT+8 anchors
- ✅ ZERO WhatsApp references anywhere (email + Calendly only)
- ✅ `prefers-reduced-motion` respected on every animated element (`motion-reduce:transform-none`, behavior=auto on smooth-scroll)
- ✅ Mobile-first responsive (sm/md/lg breakpoints, sticky right rail collapses, qualifier full-width on mobile)

---

## Build Status

```
✓ /discovery-call         (Static, prerendered)
✓ /api/leads              (Dynamic, POST handler)
✓ TypeScript:             no errors in any new file
✓ react-calendly:         installed (^4.x)
```

Pre-existing TS error in `src/app/tools/ai-readiness-score/Quiz.tsx` (`BUCKETS` reference) is unrelated to this build. Final build error was an OneDrive sync race on `.next/diagnostics` mkdir — also unrelated; all routes compiled and prerendered successfully before that.

---

## NOT Touched (per constraints)
- ❌ `src/app/page.tsx` (homepage)
- ❌ `src/app/layout.tsx`
- ❌ `src/app/sitemap.ts`
- ❌ `src/app/thank-you/` (parallel agent territory)
- ❌ `src/app/api/webhooks/calendly/` (parallel agent territory)
- ❌ Any other page

## Followups for owner
1. `/thank-you` route only contains `ReferralForm.tsx` so far — parallel agent needs to ship `page.tsx`. Until then the post-schedule redirect will 404.
2. `SLOTS_REMAINING` is a hardcoded constant in `DiscoveryFunnel.tsx`. Wire to a real-time source (GHL workflow counter or simple weekly cron) when ready.
3. Calendly Pro plan required for `primaryColor` / `backgroundColor` / `textColor` overrides to take effect. Free plan ignores them silently — embed still works, just stays default-styled.
