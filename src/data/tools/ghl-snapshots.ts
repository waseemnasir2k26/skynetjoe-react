/**
 * ghl-snapshots.ts — recommended GoHighLevel snapshot structure per
 * business type, for the GHL Snapshot Planner tool.
 *
 * These are planning templates — the pipeline stages, workflow names,
 * custom fields, and calendar types we'd actually configure on a build.
 * Not a claim about any specific GHL marketplace snapshot; a checklist
 * to plan your own before you touch the account.
 */

export type BusinessTypeKey =
  | "dental-medical"
  | "real-estate"
  | "home-services"
  | "coaching-consulting"
  | "ecommerce-retail"
  | "legal"
  | "fitness-gym"
  | "agency-marketing";

export type SnapshotPlan = {
  key: BusinessTypeKey;
  label: string;
  pipelines: { name: string; stages: string[] }[];
  workflows: string[];
  customFields: string[];
  calendars: string[];
};

export const BUSINESS_TYPES: { key: BusinessTypeKey; label: string }[] = [
  { key: "dental-medical", label: "Dental & Medical Clinic" },
  { key: "real-estate", label: "Real Estate" },
  { key: "home-services", label: "Home Services (HVAC/Plumbing/Electrical)" },
  { key: "coaching-consulting", label: "Coaching & Consulting" },
  { key: "ecommerce-retail", label: "E-commerce & Retail" },
  { key: "legal", label: "Legal & Professional Services" },
  { key: "fitness-gym", label: "Fitness & Gyms" },
  { key: "agency-marketing", label: "Agency & Marketing" },
];

export const SNAPSHOT_PLANS: SnapshotPlan[] = [
  {
    key: "dental-medical",
    label: "Dental & Medical Clinic",
    pipelines: [
      {
        name: "New Patient Pipeline",
        stages: [
          "Inquiry Received",
          "Intake Sent",
          "Insurance Verified",
          "Appointment Booked",
          "Seen — Active Patient",
          "No-Show / Lost",
        ],
      },
      {
        name: "Recall Pipeline",
        stages: ["Due for Recall", "Reminder Sent", "Rebooked", "Overdue"],
      },
    ],
    workflows: [
      "Missed-call text-back",
      "New-patient intake form → CRM upsert",
      "Appointment reminder sequence (72h / 24h / 2h)",
      "No-show rebooking nudge",
      "Post-visit review request",
      "6/12-month recall reminder",
    ],
    customFields: [
      "Insurance provider",
      "Last visit date",
      "Recall due date",
      "Referral source",
      "Preferred provider",
    ],
    calendars: [
      "New Patient Consult",
      "Cleaning / Recall Appointment",
      "Emergency Slot",
    ],
  },
  {
    key: "real-estate",
    label: "Real Estate",
    pipelines: [
      {
        name: "Buyer Pipeline",
        stages: [
          "New Lead",
          "Qualified",
          "Showings Scheduled",
          "Offer Submitted",
          "Under Contract",
          "Closed / Lost",
        ],
      },
      {
        name: "Seller Pipeline",
        stages: [
          "New Lead",
          "Listing Appointment Set",
          "Listed",
          "Offer Received",
          "Under Contract",
          "Closed / Lost",
        ],
      },
    ],
    workflows: [
      "Speed-to-lead auto-response (under 5 min)",
      "Showing confirmation & reminder",
      "Listing syndication notification",
      "Transaction milestone updates",
      "Post-close review + referral request",
    ],
    customFields: [
      "Budget range",
      "Preferred area",
      "Financing status",
      "Lead source",
      "Timeline to buy/sell",
    ],
    calendars: ["Buyer Consult", "Listing Appointment", "Showing Slot"],
  },
  {
    key: "home-services",
    label: "Home Services (HVAC/Plumbing/Electrical)",
    pipelines: [
      {
        name: "Job Pipeline",
        stages: [
          "New Inquiry",
          "Quote Sent",
          "Scheduled",
          "Job Complete",
          "Invoiced",
          "Paid",
        ],
      },
    ],
    workflows: [
      "Missed-call text-back",
      "Quote follow-up sequence",
      "Job reminder (day before)",
      "Post-job review request",
      "Seasonal maintenance reminder",
      "Unpaid invoice follow-up",
    ],
    customFields: [
      "Service type",
      "Equipment/system age",
      "Job address",
      "Technician assigned",
      "Warranty status",
    ],
    calendars: ["Service Call", "Estimate Visit", "Emergency Dispatch"],
  },
  {
    key: "coaching-consulting",
    label: "Coaching & Consulting",
    pipelines: [
      {
        name: "Discovery Pipeline",
        stages: [
          "New Lead",
          "Call Booked",
          "Call Completed",
          "Proposal Sent",
          "Client — Active",
          "Lost",
        ],
      },
    ],
    workflows: [
      "Lead magnet delivery",
      "Discovery call reminder",
      "No-show rebooking",
      "Proposal follow-up sequence",
      "Client onboarding checklist",
      "Testimonial/case-study request",
    ],
    customFields: [
      "Package tier",
      "Onboarding status",
      "Referral source",
      "Contract end date",
    ],
    calendars: ["Discovery Call", "Onboarding Session", "Client Check-in"],
  },
  {
    key: "ecommerce-retail",
    label: "E-commerce & Retail",
    pipelines: [
      {
        name: "Order Lifecycle",
        stages: [
          "Order Placed",
          "Fulfilled",
          "Shipped",
          "Delivered",
          "Return/Exchange",
        ],
      },
    ],
    workflows: [
      "Abandoned cart follow-up",
      "Order confirmation & shipping updates",
      "Post-delivery review request",
      "Win-back sequence for lapsed buyers",
      "Return/exchange status updates",
    ],
    customFields: [
      "Last order date",
      "Lifetime order value",
      "Preferred channel (SMS/email)",
      "VIP/loyalty tier",
    ],
    calendars: ["Support Call Slot", "VIP Consult"],
  },
  {
    key: "legal",
    label: "Legal & Professional Services",
    pipelines: [
      {
        name: "Intake Pipeline",
        stages: [
          "New Inquiry",
          "Consult Scheduled",
          "Retained",
          "Case Active",
          "Closed",
        ],
      },
    ],
    workflows: [
      "Intake questionnaire → CRM upsert",
      "Consult reminder sequence",
      "Document request follow-up",
      "Billing reminder sequence",
      "Case-closed review request",
    ],
    customFields: [
      "Practice area",
      "Case type",
      "Referral source",
      "Retainer status",
    ],
    calendars: ["Free Consult", "Client Meeting"],
  },
  {
    key: "fitness-gym",
    label: "Fitness & Gyms",
    pipelines: [
      {
        name: "Membership Pipeline",
        stages: [
          "Trial Lead",
          "Trial Booked",
          "Trial Completed",
          "Member — Active",
          "Cancelled/Paused",
        ],
      },
    ],
    workflows: [
      "Trial class reminder & follow-up",
      "Membership renewal reminder",
      "Win-back sequence for cancelled members",
      "Referral request after milestone",
      "Missed-check-in re-engagement",
    ],
    customFields: [
      "Membership tier",
      "Trainer assigned",
      "Last check-in date",
      "Goal/program type",
    ],
    calendars: ["Trial Class", "PT Session", "Consult"],
  },
  {
    key: "agency-marketing",
    label: "Agency & Marketing",
    pipelines: [
      {
        name: "Sales Pipeline",
        stages: [
          "New Lead",
          "Discovery Call",
          "Proposal Sent",
          "Client — Active",
          "Lost",
        ],
      },
      {
        name: "Client Delivery Pipeline",
        stages: ["Onboarding", "In Progress", "Review", "Delivered"],
      },
    ],
    workflows: [
      "Lead qualification sequence",
      "Proposal follow-up",
      "Client onboarding checklist",
      "Monthly report delivery reminder",
      "Contract renewal reminder",
    ],
    customFields: [
      "Service package",
      "Monthly retainer value",
      "Onboarding status",
      "Contract renewal date",
    ],
    calendars: ["Discovery Call", "Strategy Session", "Client Check-in"],
  },
];

export function findSnapshotPlan(key: string | null): SnapshotPlan | null {
  if (!key) return null;
  return SNAPSHOT_PLANS.find((p) => p.key === key) ?? null;
}

export function buildChecklistText(plan: SnapshotPlan): string {
  const lines: string[] = [];
  lines.push(`GHL Snapshot Plan — ${plan.label}`);
  lines.push("");
  lines.push("PIPELINES");
  plan.pipelines.forEach((p) => {
    lines.push(`  ${p.name}`);
    p.stages.forEach((s) => lines.push(`    [ ] ${s}`));
  });
  lines.push("");
  lines.push("WORKFLOWS");
  plan.workflows.forEach((w) => lines.push(`  [ ] ${w}`));
  lines.push("");
  lines.push("CUSTOM FIELDS");
  plan.customFields.forEach((f) => lines.push(`  [ ] ${f}`));
  lines.push("");
  lines.push("CALENDARS");
  plan.calendars.forEach((c) => lines.push(`  [ ] ${c}`));
  lines.push("");
  lines.push(
    "Built with SkynetLabs' GHL Snapshot Planner — skynetjoe.com/tools/ghl-snapshot-planner",
  );
  return lines.join("\n");
}
