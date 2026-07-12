/**
 * n8n-templates.ts — static recipe library for the n8n Workflow Generator tool.
 *
 * Each N8nTemplate describes a real, importable n8n workflow: a trigger node
 * followed by one or more action nodes, expressed as a linear chain. All node
 * `type` strings are real n8n-nodes-base identifiers (default nodes shipped
 * with every n8n instance) so the exported JSON imports cleanly via
 * n8n's "Import from File" / paste-JSON flow.
 *
 * Credentials are NEVER embedded — every node that needs auth carries a
 * `credentials` block with `id: null` and a human `name` describing what to
 * connect (e.g. "Slack account — connect yours"). n8n will prompt the user
 * to map a real credential on import; nothing here is a working secret.
 *
 * `triggerLabel` / `actionLabels` are display-level app names used by the
 * Generator wizard to match user picks to a recipe — they intentionally
 * abstract over implementation (e.g. "Instagram" and "Calendly" both run on
 * a generic Webhook node under the hood, since neither app has a dedicated
 * n8n trigger node).
 */

export type N8nNodeSpec = {
  name: string;
  type: string;
  typeVersion: number;
  parameters: Record<string, unknown>;
  credentials?: Record<string, { id: string | null; name: string }>;
  notes?: string;
};

export type N8nTemplate = {
  slug: string;
  name: string;
  description: string;
  /** Display app name for the trigger step, shown in the wizard. */
  triggerLabel: string;
  /** Display app name(s) for the action step(s), shown in the wizard. */
  actionLabels: string[];
  category: string;
  nodes: N8nNodeSpec[];
};

/* ────────────────────────────────────────────────────────────────────── */
/* Template library — 12 real, demand-driven automation recipes           */
/* ────────────────────────────────────────────────────────────────────── */

export const N8N_TEMPLATES: N8nTemplate[] = [
  {
    slug: "webhook-ghl-contact-upsert",
    name: "Webhook → GoHighLevel Contact Upsert",
    description:
      "Any inbound webhook (form, landing page, ad platform) upserts a contact straight into GoHighLevel — no duplicate leads.",
    triggerLabel: "Webhook",
    actionLabels: ["GoHighLevel"],
    category: "Lead capture",
    nodes: [
      {
        name: "Lead Webhook",
        type: "n8n-nodes-base.webhook",
        typeVersion: 2,
        parameters: {
          httpMethod: "POST",
          path: "lead-intake",
          responseMode: "onReceived",
          options: {},
        },
        notes: "Point your form / ad platform's webhook URL at this node.",
      },
      {
        name: "Upsert GHL Contact",
        type: "n8n-nodes-base.httpRequest",
        typeVersion: 4.2,
        parameters: {
          method: "POST",
          url: "https://rest.gohighlevel.com/v1/contacts/",
          authentication: "genericCredentialType",
          genericAuthType: "httpHeaderAuth",
          sendBody: true,
          specifyBody: "json",
          jsonBody:
            '={{ { "email": $json["email"], "phone": $json["phone"], "firstName": $json["firstName"], "lastName": $json["lastName"], "tags": ["webhook-lead"] } }}',
          options: {},
        },
        credentials: {
          httpHeaderAuth: {
            id: null,
            name: "GoHighLevel API Key — connect yours",
          },
        },
        notes:
          "Header auth credential should send Authorization: Bearer <GHL API key>.",
      },
    ],
  },
  {
    slug: "website-form-slack-sheets",
    name: "Website Form → Slack + Google Sheet",
    description:
      "Every form submission pings a Slack channel instantly and appends a row to a running Google Sheet log.",
    triggerLabel: "Website Form",
    actionLabels: ["Slack", "Google Sheets"],
    category: "Lead capture",
    nodes: [
      {
        name: "Form Webhook",
        type: "n8n-nodes-base.webhook",
        typeVersion: 2,
        parameters: {
          httpMethod: "POST",
          path: "website-form",
          responseMode: "onReceived",
          options: {},
        },
        notes: "Point your website form's action / fetch() at this URL.",
      },
      {
        name: "Notify Slack",
        type: "n8n-nodes-base.slack",
        typeVersion: 2.3,
        parameters: {
          resource: "message",
          operation: "post",
          select: "channel",
          channelId: { mode: "name", value: "#new-leads" },
          text: '=New form submission from {{$json["name"]}} ({{$json["email"]}})',
          otherOptions: {},
        },
        credentials: {
          slackApi: { id: null, name: "Slack account — connect yours" },
        },
      },
      {
        name: "Append to Sheet",
        type: "n8n-nodes-base.googleSheets",
        typeVersion: 4.5,
        parameters: {
          operation: "append",
          documentId: { mode: "list", value: "PLACEHOLDER_SHEET_ID" },
          sheetName: { mode: "list", value: "Leads" },
          columns: {
            mappingMode: "defineBelow",
            value: {
              name: '={{$json["name"]}}',
              email: '={{$json["email"]}}',
              submitted_at: "={{$now}}",
            },
          },
        },
        credentials: {
          googleSheetsOAuth2Api: {
            id: null,
            name: "Google Sheets account — connect yours",
          },
        },
        notes: "Swap PLACEHOLDER_SHEET_ID for your own spreadsheet ID.",
      },
    ],
  },
  {
    slug: "schedule-scrape-email-digest",
    name: "Schedule → Scrape → Email Digest",
    description:
      "A daily/weekly schedule scrapes a source URL, builds a plain-text digest, and emails it — a free standing research brief.",
    triggerLabel: "Schedule",
    actionLabels: ["Email"],
    category: "Reporting",
    nodes: [
      {
        name: "Daily Schedule",
        type: "n8n-nodes-base.scheduleTrigger",
        typeVersion: 1.2,
        parameters: {
          rule: {
            interval: [{ field: "days", daysInterval: 1, triggerAtHour: 7 }],
          },
        },
      },
      {
        name: "Scrape Source",
        type: "n8n-nodes-base.httpRequest",
        typeVersion: 4.2,
        parameters: {
          method: "GET",
          url: "https://PLACEHOLDER-source-url.com",
          options: {},
        },
        notes: "Point at the page you want to summarize daily.",
      },
      {
        name: "Build Digest",
        type: "n8n-nodes-base.code",
        typeVersion: 2,
        parameters: {
          jsCode:
            "// Trim + shape the scraped body into a short digest string.\nconst body = String($input.first().json.data || $input.first().json.body || '').slice(0, 1200);\nreturn [{ json: { digest: body } }];",
        },
      },
      {
        name: "Send Digest Email",
        type: "n8n-nodes-base.emailSend",
        typeVersion: 2.1,
        parameters: {
          fromEmail: "digest@yourdomain.com",
          toEmail: "you@yourdomain.com",
          subject: "=Daily digest — {{$now.format('yyyy-MM-dd')}}",
          text: '={{$json["digest"]}}',
          options: {},
        },
        credentials: {
          smtp: { id: null, name: "SMTP account — connect yours" },
        },
      },
    ],
  },
  {
    slug: "gmail-ai-classify-crm-tag",
    name: "Gmail → AI Classify → CRM Tag",
    description:
      "New inbound Gmail messages get classified by an LLM (hot lead / support / spam) and the matching CRM contact is tagged automatically.",
    triggerLabel: "Gmail",
    actionLabels: ["OpenAI", "CRM"],
    category: "Inbox triage",
    nodes: [
      {
        name: "New Gmail Message",
        type: "n8n-nodes-base.gmailTrigger",
        typeVersion: 1.2,
        parameters: {
          pollTimes: { item: [{ mode: "everyMinute" }] },
          simple: false,
          filters: {},
        },
        credentials: {
          gmailOAuth2: { id: null, name: "Gmail account — connect yours" },
        },
      },
      {
        name: "Classify with AI",
        type: "n8n-nodes-base.httpRequest",
        typeVersion: 4.2,
        parameters: {
          method: "POST",
          url: "https://api.openai.com/v1/chat/completions",
          authentication: "genericCredentialType",
          genericAuthType: "httpHeaderAuth",
          sendBody: true,
          specifyBody: "json",
          jsonBody:
            '={{ { "model": "gpt-4o-mini", "messages": [{"role":"system","content":"Classify this email as hot_lead, support, or spam. Reply with one word."},{"role":"user","content": $json["snippet"]}] } }}',
          options: {},
        },
        credentials: {
          httpHeaderAuth: { id: null, name: "OpenAI API Key — connect yours" },
        },
      },
      {
        name: "Tag CRM Contact",
        type: "n8n-nodes-base.httpRequest",
        typeVersion: 4.2,
        parameters: {
          method: "POST",
          url: "https://rest.gohighlevel.com/v1/contacts/PLACEHOLDER_CONTACT_ID/tags",
          authentication: "genericCredentialType",
          genericAuthType: "httpHeaderAuth",
          sendBody: true,
          specifyBody: "json",
          jsonBody:
            '={{ { "tags": [$json["choices"][0]["message"]["content"]] } }}',
          options: {},
        },
        credentials: {
          httpHeaderAuth: { id: null, name: "CRM API Key — connect yours" },
        },
        notes: "Swap the URL for your CRM's tag/update-contact endpoint.",
      },
    ],
  },
  {
    slug: "stripe-invoice-notify",
    name: "Stripe Payment → Invoice + Notify",
    description:
      "Successful Stripe payments trigger an invoice API call and a Slack ping to the ops channel — no manual bookkeeping step.",
    triggerLabel: "Stripe",
    actionLabels: ["Invoicing", "Slack"],
    category: "Billing",
    nodes: [
      {
        name: "Stripe Payment Succeeded",
        type: "n8n-nodes-base.stripeTrigger",
        typeVersion: 1,
        parameters: {
          events: ["charge.succeeded"],
        },
        credentials: {
          stripeApi: { id: null, name: "Stripe account — connect yours" },
        },
      },
      {
        name: "Create Invoice",
        type: "n8n-nodes-base.httpRequest",
        typeVersion: 4.2,
        parameters: {
          method: "POST",
          url: "https://PLACEHOLDER-invoicing-api.com/invoices",
          authentication: "genericCredentialType",
          genericAuthType: "httpHeaderAuth",
          sendBody: true,
          specifyBody: "json",
          jsonBody:
            '={{ { "customer_email": $json["billing_details"]["email"], "amount": $json["amount"] } }}',
          options: {},
        },
        credentials: {
          httpHeaderAuth: {
            id: null,
            name: "Invoicing API Key — connect yours",
          },
        },
        notes:
          "Point this at your invoicing tool's API (e.g. QuickBooks, Xero, custom).",
      },
      {
        name: "Notify Ops in Slack",
        type: "n8n-nodes-base.slack",
        typeVersion: 2.3,
        parameters: {
          resource: "message",
          operation: "post",
          select: "channel",
          channelId: { mode: "name", value: "#payments" },
          text: '=Payment received: {{$json["amount"]/100}} {{$json["currency"]}} from {{$json["billing_details"]["email"]}}',
          otherOptions: {},
        },
        credentials: {
          slackApi: { id: null, name: "Slack account — connect yours" },
        },
      },
    ],
  },
  {
    slug: "typeform-enrich-hubspot",
    name: "Typeform → Enrich → HubSpot",
    description:
      "Typeform submissions get enriched (company/role lookup) then pushed into HubSpot as a fully-populated contact.",
    triggerLabel: "Typeform",
    actionLabels: ["Enrichment", "HubSpot"],
    category: "Lead capture",
    nodes: [
      {
        name: "New Typeform Response",
        type: "n8n-nodes-base.typeformTrigger",
        typeVersion: 1,
        parameters: { formId: "PLACEHOLDER_FORM_ID" },
        credentials: {
          typeformApi: { id: null, name: "Typeform account — connect yours" },
        },
      },
      {
        name: "Enrich Contact",
        type: "n8n-nodes-base.httpRequest",
        typeVersion: 4.2,
        parameters: {
          method: "GET",
          url: '=https://PLACEHOLDER-enrichment-api.com/lookup?email={{$json["email"]}}',
          authentication: "genericCredentialType",
          genericAuthType: "httpHeaderAuth",
          options: {},
        },
        credentials: {
          httpHeaderAuth: {
            id: null,
            name: "Enrichment API Key — connect yours",
          },
        },
        notes: "e.g. Clearbit, Apollo, or your enrichment vendor of choice.",
      },
      {
        name: "Upsert HubSpot Contact",
        type: "n8n-nodes-base.hubspot",
        typeVersion: 2.1,
        parameters: {
          resource: "contact",
          operation: "upsert",
          email: '={{$json["email"]}}',
          additionalFields: {
            company: '={{$json["company"]}}',
            jobtitle: '={{$json["title"]}}',
          },
        },
        credentials: {
          hubspotApi: { id: null, name: "HubSpot account — connect yours" },
        },
      },
    ],
  },
  {
    slug: "ig-comment-dm-reply",
    name: "Instagram Comment → DM Reply",
    description:
      "A keyword in an Instagram comment triggers an automatic DM reply — the classic 'comment SOLD for the link' flow.",
    triggerLabel: "Instagram",
    actionLabels: ["Instagram DM"],
    category: "Social automation",
    nodes: [
      {
        name: "IG Comment Webhook",
        type: "n8n-nodes-base.webhook",
        typeVersion: 2,
        parameters: {
          httpMethod: "POST",
          path: "ig-comment",
          responseMode: "onReceived",
          options: {},
        },
        notes:
          "Subscribe this URL to the comments field on a Meta Graph API app.",
      },
      {
        name: "Keyword Match?",
        type: "n8n-nodes-base.if",
        typeVersion: 2.2,
        parameters: {
          conditions: {
            options: {
              caseSensitive: false,
              leftValue: "",
              typeValidation: "loose",
            },
            conditions: [
              {
                leftValue: '={{$json["text"]}}',
                rightValue: "PRICE",
                operator: { type: "string", operation: "contains" },
              },
            ],
            combinator: "and",
          },
        },
      },
      {
        name: "Send IG DM",
        type: "n8n-nodes-base.httpRequest",
        typeVersion: 4.2,
        parameters: {
          method: "POST",
          url: '=https://graph.facebook.com/v19.0/{{$json["sender_id"]}}/messages',
          authentication: "genericCredentialType",
          genericAuthType: "httpHeaderAuth",
          sendBody: true,
          specifyBody: "json",
          jsonBody:
            '={{ { "message": { "text": "Thanks for the comment! Here\'s the link: PLACEHOLDER_LINK" } } }}',
          options: {},
        },
        credentials: {
          httpHeaderAuth: {
            id: null,
            name: "Meta Graph API Token — connect yours",
          },
        },
      },
    ],
  },
  {
    slug: "missed-call-sms-back",
    name: "Missed Call → SMS-Back",
    description:
      "A missed business-line call fires an instant apology + booking-link SMS so no lead goes cold in the first five minutes.",
    triggerLabel: "Missed Call (Twilio)",
    actionLabels: ["Twilio SMS"],
    category: "Voice / SMS",
    nodes: [
      {
        name: "Missed Call Webhook",
        type: "n8n-nodes-base.webhook",
        typeVersion: 2,
        parameters: {
          httpMethod: "POST",
          path: "missed-call",
          responseMode: "onReceived",
          options: {},
        },
        notes: "Set as the 'no-answer' callback URL on your Twilio number.",
      },
      {
        name: "Send SMS Back",
        type: "n8n-nodes-base.twilio",
        typeVersion: 1,
        parameters: {
          resource: "sms",
          operation: "send",
          from: "PLACEHOLDER_TWILIO_NUMBER",
          to: '={{$json["From"]}}',
          message:
            "Sorry we missed your call! Text us back or book a time here: PLACEHOLDER_BOOKING_LINK",
        },
        credentials: {
          twilioApi: { id: null, name: "Twilio account — connect yours" },
        },
      },
    ],
  },
  {
    slug: "rss-social-post-draft",
    name: "RSS → Social Post Draft",
    description:
      "New posts from an RSS feed get turned into a short social caption and saved as a draft — content never runs dry.",
    triggerLabel: "RSS Feed",
    actionLabels: ["Social Draft"],
    category: "Content",
    nodes: [
      {
        name: "Hourly Check",
        type: "n8n-nodes-base.scheduleTrigger",
        typeVersion: 1.2,
        parameters: {
          rule: { interval: [{ field: "hours", hoursInterval: 1 }] },
        },
      },
      {
        name: "Read RSS Feed",
        type: "n8n-nodes-base.rssFeedRead",
        typeVersion: 1.2,
        parameters: { url: "https://PLACEHOLDER-feed-url.com/rss" },
      },
      {
        name: "Build Caption",
        type: "n8n-nodes-base.code",
        typeVersion: 2,
        parameters: {
          jsCode:
            "// Turn each RSS item into a short caption draft.\nreturn $input.all().map(item => ({\n  json: {\n    caption: `${item.json.title}\\n\\n${item.json.link}`,\n  },\n}));",
        },
      },
      {
        name: "Save Draft",
        type: "n8n-nodes-base.httpRequest",
        typeVersion: 4.2,
        parameters: {
          method: "POST",
          url: "https://PLACEHOLDER-drafts-api.com/drafts",
          authentication: "genericCredentialType",
          genericAuthType: "httpHeaderAuth",
          sendBody: true,
          specifyBody: "json",
          jsonBody: '={{ { "caption": $json["caption"] } }}',
          options: {},
        },
        credentials: {
          httpHeaderAuth: {
            id: null,
            name: "Draft/Buffer API Key — connect yours",
          },
        },
        notes: "Point at Buffer, Notion, or your own drafts endpoint.",
      },
    ],
  },
  {
    slug: "sheet-row-personalized-email",
    name: "Sheet Row → Personalized Email",
    description:
      "New rows added to a Google Sheet trigger a merge-field personalized email — a lightweight outbound sequencer with no extra tool.",
    triggerLabel: "Google Sheets",
    actionLabels: ["Email"],
    category: "Outbound",
    nodes: [
      {
        name: "New Sheet Row",
        type: "n8n-nodes-base.googleSheetsTrigger",
        typeVersion: 1,
        parameters: {
          documentId: { mode: "list", value: "PLACEHOLDER_SHEET_ID" },
          sheetName: { mode: "list", value: "Outreach" },
          event: "rowAdded",
        },
        credentials: {
          googleSheetsTriggerOAuth2Api: {
            id: null,
            name: "Google Sheets account — connect yours",
          },
        },
      },
      {
        name: "Personalize Fields",
        type: "n8n-nodes-base.set",
        typeVersion: 3.4,
        parameters: {
          mode: "manual",
          fields: {
            values: [
              {
                name: "subject",
                stringValue: '={{"Quick one, " + $json["first_name"]}}',
              },
              {
                name: "body",
                stringValue:
                  '={{"Hey " + $json["first_name"] + ", saw you\'re at " + $json["company"] + " — wanted to reach out."}}',
              },
            ],
          },
        },
      },
      {
        name: "Send Personalized Email",
        type: "n8n-nodes-base.emailSend",
        typeVersion: 2.1,
        parameters: {
          fromEmail: "outreach@yourdomain.com",
          toEmail: '={{$json["email"]}}',
          subject: '={{$json["subject"]}}',
          text: '={{$json["body"]}}',
          options: {},
        },
        credentials: {
          smtp: { id: null, name: "SMTP account — connect yours" },
        },
      },
    ],
  },
  {
    slug: "calendly-onboarding-sequence",
    name: "Calendly Booking → Onboarding Sequence",
    description:
      "A new Calendly booking kicks off a two-touch onboarding sequence — instant welcome email, then a day-later follow-up.",
    triggerLabel: "Calendly",
    actionLabels: ["Email Sequence"],
    category: "Onboarding",
    nodes: [
      {
        name: "Calendly Booking Webhook",
        type: "n8n-nodes-base.webhook",
        typeVersion: 2,
        parameters: {
          httpMethod: "POST",
          path: "calendly-booking",
          responseMode: "onReceived",
          options: {},
        },
        notes:
          "Register this URL as a Calendly webhook subscription for invitee.created.",
      },
      {
        name: "Send Welcome Email",
        type: "n8n-nodes-base.emailSend",
        typeVersion: 2.1,
        parameters: {
          fromEmail: "hello@yourdomain.com",
          toEmail: '={{$json["payload"]["email"]}}',
          subject: "You're booked — here's what happens next",
          text: "Thanks for booking! Here's what to expect before our call...",
          options: {},
        },
        credentials: {
          smtp: { id: null, name: "SMTP account — connect yours" },
        },
      },
      {
        name: "Wait 1 Day",
        type: "n8n-nodes-base.wait",
        typeVersion: 1.1,
        parameters: { amount: 1, unit: "days" },
      },
      {
        name: "Send Day-2 Follow-up",
        type: "n8n-nodes-base.emailSend",
        typeVersion: 2.1,
        parameters: {
          fromEmail: "hello@yourdomain.com",
          toEmail: '={{$json["payload"]["email"]}}',
          subject: "Quick prep before our call",
          text: "One more thing before we chat — here's a quick prep checklist...",
          options: {},
        },
        credentials: {
          smtp: { id: null, name: "SMTP account — connect yours" },
        },
      },
    ],
  },
  {
    slug: "abandoned-cart-followup",
    name: "Abandoned Cart → Follow-up",
    description:
      "A Shopify (or any storefront) abandoned-checkout event waits an hour, then fires a reminder email and an SMS nudge.",
    triggerLabel: "Shopify",
    actionLabels: ["Email", "SMS"],
    category: "E-commerce",
    nodes: [
      {
        name: "Abandoned Checkout Webhook",
        type: "n8n-nodes-base.webhook",
        typeVersion: 2,
        parameters: {
          httpMethod: "POST",
          path: "abandoned-checkout",
          responseMode: "onReceived",
          options: {},
        },
        notes:
          "Register as a Shopify checkouts/create + checkouts/update webhook.",
      },
      {
        name: "Wait 1 Hour",
        type: "n8n-nodes-base.wait",
        typeVersion: 1.1,
        parameters: { amount: 1, unit: "hours" },
      },
      {
        name: "Send Reminder Email",
        type: "n8n-nodes-base.emailSend",
        typeVersion: 2.1,
        parameters: {
          fromEmail: "shop@yourdomain.com",
          toEmail: '={{$json["email"]}}',
          subject: "You left something in your cart",
          text: '={{"Still thinking it over? Here\'s your cart: " + $json["abandoned_checkout_url"]}}',
          options: {},
        },
        credentials: {
          smtp: { id: null, name: "SMTP account — connect yours" },
        },
      },
      {
        name: "Send Reminder SMS",
        type: "n8n-nodes-base.twilio",
        typeVersion: 1,
        parameters: {
          resource: "sms",
          operation: "send",
          from: "PLACEHOLDER_TWILIO_NUMBER",
          to: '={{$json["phone"]}}',
          message:
            '=Still want it? Finish your order: {{$json["abandoned_checkout_url"]}}',
        },
        credentials: {
          twilioApi: { id: null, name: "Twilio account — connect yours" },
        },
      },
    ],
  },
];

/* ────────────────────────────────────────────────────────────────────── */
/* Wizard helpers                                                         */
/* ────────────────────────────────────────────────────────────────────── */

/** Unique trigger app labels, in template order, for wizard step 1. */
export const TRIGGER_APPS: string[] = Array.from(
  new Set(N8N_TEMPLATES.map((t) => t.triggerLabel)),
);

/** Action app labels available for a given trigger, for wizard step 2. */
export function actionsForTrigger(triggerLabel: string): string[] {
  const set = new Set<string>();
  N8N_TEMPLATES.filter((t) => t.triggerLabel === triggerLabel).forEach((t) =>
    t.actionLabels.forEach((a) => set.add(a)),
  );
  return Array.from(set);
}

export type TemplateMatch = {
  template: N8nTemplate;
  /** true when the trigger + at least one action label matched exactly. */
  exact: boolean;
};

/**
 * Resolve a user's (trigger, actions) pick to the closest template.
 * Always returns a valid template — never leaves the caller without a
 * downloadable recipe, even on a total mismatch (falls back to the first
 * template for that trigger, or the very first template overall).
 */
export function findTemplate(
  triggerLabel: string | null,
  actionLabels: string[],
): TemplateMatch {
  if (!triggerLabel) {
    return { template: N8N_TEMPLATES[0], exact: false };
  }
  const candidates = N8N_TEMPLATES.filter(
    (t) => t.triggerLabel === triggerLabel,
  );
  if (candidates.length === 0) {
    return { template: N8N_TEMPLATES[0], exact: false };
  }
  if (actionLabels.length > 0) {
    const exactMatch = candidates.find((t) =>
      actionLabels.every((a) => t.actionLabels.includes(a)),
    );
    if (exactMatch) return { template: exactMatch, exact: true };

    const overlapMatch = candidates.find((t) =>
      t.actionLabels.some((a) => actionLabels.includes(a)),
    );
    if (overlapMatch) return { template: overlapMatch, exact: false };
  }
  return { template: candidates[0], exact: false };
}

/* ────────────────────────────────────────────────────────────────────── */
/* Serialization — template → valid, importable n8n workflow JSON         */
/* ────────────────────────────────────────────────────────────────────── */

export type N8nWorkflowJson = {
  name: string;
  nodes: Array<{
    id: string;
    name: string;
    type: string;
    typeVersion: number;
    position: [number, number];
    parameters: Record<string, unknown>;
    credentials?: Record<string, { id: string | null; name: string }>;
    notes?: string;
  }>;
  connections: Record<
    string,
    { main: Array<Array<{ node: string; type: "main"; index: number }>> }
  >;
  active: boolean;
  settings: { executionOrder: "v1" };
  pinData: Record<string, never>;
};

const X_STEP = 280;
const Y_POS = 300;

/** Build a valid, linear-chain n8n workflow JSON object from a template. */
export function buildWorkflowJson(template: N8nTemplate): N8nWorkflowJson {
  const nodes = template.nodes.map((n, i) => ({
    id: `${template.slug}-node-${i + 1}`,
    name: n.name,
    type: n.type,
    typeVersion: n.typeVersion,
    position: [i * X_STEP, Y_POS] as [number, number],
    parameters: n.parameters,
    ...(n.credentials ? { credentials: n.credentials } : {}),
    ...(n.notes ? { notes: n.notes } : {}),
  }));

  const connections: N8nWorkflowJson["connections"] = {};
  for (let i = 0; i < template.nodes.length - 1; i++) {
    connections[template.nodes[i].name] = {
      main: [[{ node: template.nodes[i + 1].name, type: "main", index: 0 }]],
    };
  }

  return {
    name: template.name,
    nodes,
    connections,
    active: false,
    settings: { executionOrder: "v1" },
    pinData: {},
  };
}

/** Trigger a client-side download of a template's workflow JSON via Blob. */
export function downloadWorkflowJson(template: N8nTemplate): void {
  if (typeof window === "undefined") return;
  const workflow = buildWorkflowJson(template);
  const blob = new Blob([JSON.stringify(workflow, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${template.slug}.n8n-workflow.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
