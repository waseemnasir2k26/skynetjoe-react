/**
 * webhook-payloads.ts — sample payload library for the Webhook Payload
 * Builder tool.
 *
 * Every sample is a representative, illustrative payload shape based on
 * each vendor's publicly documented webhook events. IDs, emails, and
 * timestamps are placeholders — never real records, never live secrets.
 * These are shapes to build against, not proof of any live integration.
 */

export type WebhookApp = {
  slug: string;
  name: string;
  eventLabel: string;
  docsHint: string;
  sample: Record<string, unknown>;
};

export const WEBHOOK_APPS: WebhookApp[] = [
  {
    slug: "ghl",
    name: "GoHighLevel",
    eventLabel: "ContactCreate",
    docsHint:
      "GHL workflow webhooks POST this shape when a contact is created or a workflow action fires.",
    sample: {
      type: "ContactCreate",
      locationId: "loc_placeholder_001",
      contactId: "cont_placeholder_001",
      firstName: "Jordan",
      lastName: "Reyes",
      email: "jordan@example.com",
      phone: "+15551234567",
      tags: ["new-lead", "webhook-test"],
      customFields: [{ id: "cf_source", value: "website-form" }],
      dateAdded: "2026-01-01T09:00:00.000Z",
    },
  },
  {
    slug: "stripe",
    name: "Stripe",
    eventLabel: "checkout.session.completed",
    docsHint:
      "Stripe wraps every event in an outer envelope — id, type, and a data.object payload matching the resource.",
    sample: {
      id: "evt_placeholder_001",
      object: "event",
      type: "checkout.session.completed",
      created: 1735689600,
      data: {
        object: {
          id: "cs_test_placeholder",
          object: "checkout.session",
          amount_total: 29900,
          currency: "usd",
          customer_email: "buyer@example.com",
          payment_status: "paid",
          metadata: { plan: "pro-monthly" },
        },
      },
    },
  },
  {
    slug: "typeform",
    name: "Typeform",
    eventLabel: "form_response",
    docsHint:
      "Typeform's webhook body nests answers under form_response.answers, one entry per question, typed by field type.",
    sample: {
      event_id: "evt_placeholder_001",
      event_type: "form_response",
      form_response: {
        form_id: "form_placeholder",
        token: "token_placeholder",
        submitted_at: "2026-01-01T09:00:00Z",
        definition: { id: "form_placeholder", title: "Discovery intake" },
        answers: [
          {
            field: { id: "field_email", type: "email" },
            type: "email",
            email: "lead@example.com",
          },
          {
            field: { id: "field_company", type: "short_text" },
            type: "text",
            text: "Acme Co",
          },
        ],
      },
    },
  },
  {
    slug: "calendly",
    name: "Calendly",
    eventLabel: "invitee.created",
    docsHint:
      "Calendly wraps events as { event, payload }. Payload includes the event URI, invitee details, and scheduled time.",
    sample: {
      event: "invitee.created",
      created_at: "2026-01-01T09:00:00.000000Z",
      payload: {
        email: "invitee@example.com",
        name: "Sam Lee",
        event: {
          uri: "https://api.calendly.com/scheduled_events/placeholder",
          start_time: "2026-01-05T15:00:00.000000Z",
          end_time: "2026-01-05T15:30:00.000000Z",
        },
        questions_and_answers: [
          {
            question: "What do you want to cover?",
            answer: "Automation scope",
          },
        ],
        tracking: { utm_source: "website", utm_campaign: "discovery-call" },
      },
    },
  },
  {
    slug: "shopify",
    name: "Shopify",
    eventLabel: "orders/create",
    docsHint:
      "Shopify order webhooks send the full order object flat — no envelope. line_items is the array to iterate.",
    sample: {
      id: 5555555555,
      order_number: 1042,
      email: "customer@example.com",
      created_at: "2026-01-01T09:00:00-00:00",
      currency: "USD",
      total_price: "149.00",
      financial_status: "paid",
      line_items: [
        {
          id: 9999999999,
          title: "Starter Automation Kit",
          quantity: 1,
          price: "149.00",
        },
      ],
      customer: {
        id: 7777777777,
        first_name: "Alex",
        last_name: "Kim",
        email: "customer@example.com",
      },
    },
  },
];

export function findWebhookApp(slug: string | null): WebhookApp | null {
  if (!slug) return null;
  return WEBHOOK_APPS.find((a) => a.slug === slug) ?? null;
}

/** Safe JSON validation — never throws, returns a structured result. */
export type ValidationResult =
  | { valid: true; pretty: string; sizeBytes: number }
  | { valid: false; error: string };

export function validateJson(raw: string): ValidationResult {
  if (!raw.trim()) {
    return { valid: false, error: "Payload is empty." };
  }
  try {
    const parsed = JSON.parse(raw);
    const pretty = JSON.stringify(parsed, null, 2);
    return {
      valid: true,
      pretty,
      sizeBytes: new TextEncoder().encode(pretty).length,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid JSON.";
    return { valid: false, error: message };
  }
}
