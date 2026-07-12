/**
 * automation-roi.ts — industry benchmark RANGES for the Automation ROI by
 * Industry calculator.
 *
 * TRUTH-LOCK: these are directional planning ranges, not measured stats
 * from any study or client dataset. Each range is deliberately wide and
 * framed as "typical for this kind of manual task" — the same rough
 * ranges used when scoping automation work on a discovery call. The
 * calculator always multiplies the user's OWN inputs (their task count,
 * their minutes-per-task, their hourly cost) by these ranges — it never
 * asserts a fixed percentage or dollar figure as fact. Output is always
 * shown as a low–high band, never a single invented precise number.
 */

export type IndustryKey =
  | "dental-medical"
  | "wellness-medspa"
  | "real-estate"
  | "home-services"
  | "freight-logistics"
  | "ecommerce"
  | "legal"
  | "agency-consulting";

export type IndustryProfile = {
  key: IndustryKey;
  label: string;
  /** Common manual tasks automation typically targets first in this vertical. */
  commonTasks: string[];
  /** Typical time-reduction RANGE on the automated tasks, as a fraction (e.g. 0.35 = 35%). */
  reductionRange: [number, number];
  /** Typical fully-loaded hourly cost RANGE for the staff doing this work today (USD). */
  hourlyCostRange: [number, number];
  note: string;
};

export const INDUSTRIES: IndustryProfile[] = [
  {
    key: "dental-medical",
    label: "Dental & Medical Clinics",
    commonTasks: [
      "Appointment reminders & recall",
      "New-patient intake forms",
      "Insurance verification follow-up",
      "No-show rebooking",
    ],
    reductionRange: [0.35, 0.65],
    hourlyCostRange: [20, 35],
    note: "Front-desk and recall work — the tasks that eat receptionist time between patients.",
  },
  {
    key: "wellness-medspa",
    label: "Wellness & Medspas",
    commonTasks: [
      "Booking confirmations",
      "Review requests post-visit",
      "Package/membership renewal reminders",
      "Lead follow-up on inquiries",
    ],
    reductionRange: [0.4, 0.7],
    hourlyCostRange: [18, 32],
    note: "High inquiry volume, front-of-house staff handling booking and follow-up manually.",
  },
  {
    key: "real-estate",
    label: "Real Estate",
    commonTasks: [
      "Lead response & qualification",
      "Showing scheduling",
      "Listing syndication updates",
      "Transaction milestone reminders",
    ],
    reductionRange: [0.3, 0.6],
    hourlyCostRange: [25, 45],
    note: "Agent or ISA time spent on first-touch response and coordination admin.",
  },
  {
    key: "home-services",
    label: "Home Services (HVAC / Plumbing / Electrical)",
    commonTasks: [
      "Missed-call text-back",
      "Dispatch scheduling",
      "Quote follow-up",
      "Review requests after job completion",
    ],
    reductionRange: [0.4, 0.7],
    hourlyCostRange: [20, 38],
    note: "Office admin and dispatcher time — small teams where every missed call is a missed job.",
  },
  {
    key: "freight-logistics",
    label: "Freight & Logistics",
    commonTasks: [
      "Load status updates to shippers",
      "Carrier/driver check calls",
      "POD (proof of delivery) collection & filing",
      "Rate confirmation data entry",
    ],
    reductionRange: [0.3, 0.55],
    hourlyCostRange: [22, 40],
    note: "Dispatcher and back-office time on repetitive status and paperwork tasks.",
  },
  {
    key: "ecommerce",
    label: "E-commerce & Retail",
    commonTasks: [
      "Order status & shipping notifications",
      "Abandoned cart follow-up",
      "Return/exchange processing",
      "Inventory sync across channels",
    ],
    reductionRange: [0.35, 0.65],
    hourlyCostRange: [18, 30],
    note: "Customer-service and ops admin time on order lifecycle messaging and data entry.",
  },
  {
    key: "legal",
    label: "Legal & Professional Services",
    commonTasks: [
      "Intake questionnaires",
      "Appointment/consult scheduling",
      "Document status follow-up",
      "Billing reminder sequences",
    ],
    reductionRange: [0.25, 0.5],
    hourlyCostRange: [30, 55],
    note: "Paralegal/admin time on intake and coordination — the highest hourly-cost bracket here.",
  },
  {
    key: "agency-consulting",
    label: "Agencies & Consulting",
    commonTasks: [
      "Proposal & contract follow-up",
      "Client onboarding checklists",
      "Status reporting to clients",
      "Lead qualification on inbound",
    ],
    reductionRange: [0.3, 0.6],
    hourlyCostRange: [25, 50],
    note: "Founder/ops-manager time on repeatable client-facing admin, usually the first thing to automate.",
  },
];

export function findIndustry(key: string | null): IndustryProfile | null {
  if (!key) return null;
  return INDUSTRIES.find((i) => i.key === key) ?? null;
}

export type RoiInputs = {
  industry: IndustryKey;
  tasksPerWeek: number; // number of times the manual task happens per week
  minutesPerTask: number; // minutes spent per occurrence today
  hourlyCost: number; // USD, defaults to the industry's mid-range
};

export type RoiRange = { low: number; high: number };

export type RoiResult = {
  hoursSavedPerWeek: RoiRange;
  hoursSavedPerYear: RoiRange;
  dollarsSavedPerYear: RoiRange;
};

/** Pure calculation — always applies the industry RANGE to the user's OWN numbers. */
export function computeRoi(inputs: RoiInputs): RoiResult | null {
  const industry = findIndustry(inputs.industry);
  if (!industry) return null;

  const manualHoursPerWeek =
    (Math.max(0, inputs.tasksPerWeek) * Math.max(0, inputs.minutesPerTask)) /
    60;

  const [lowReduction, highReduction] = industry.reductionRange;
  const hoursSavedPerWeek: RoiRange = {
    low: Math.round(manualHoursPerWeek * lowReduction * 10) / 10,
    high: Math.round(manualHoursPerWeek * highReduction * 10) / 10,
  };

  const hoursSavedPerYear: RoiRange = {
    low: Math.round(hoursSavedPerWeek.low * 52),
    high: Math.round(hoursSavedPerWeek.high * 52),
  };

  const rate =
    inputs.hourlyCost > 0 ? inputs.hourlyCost : industry.hourlyCostRange[0];
  const dollarsSavedPerYear: RoiRange = {
    low: Math.round(hoursSavedPerYear.low * rate),
    high: Math.round(hoursSavedPerYear.high * rate),
  };

  return { hoursSavedPerWeek, hoursSavedPerYear, dollarsSavedPerYear };
}

export function formatUsd(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
