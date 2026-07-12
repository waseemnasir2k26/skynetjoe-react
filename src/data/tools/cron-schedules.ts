/**
 * cron-schedules.ts — schedule-builder logic for the Cron Expression
 * Builder tool.
 *
 * Builds a standard 5-field cron expression (minute hour dom month dow)
 * from a plain-English picker, plus a human-readable sentence and an
 * n8n Schedule Trigger node config snippet.
 *
 * n8n gotcha baked into the guidance copy: the Schedule Trigger's
 * `field: "minutes"` interval mode ignores `triggerAtMinute` — it just
 * fires every N minutes from whenever the workflow activated. For any
 * schedule that needs a specific minute (e.g. "at :15 past the hour" or
 * a specific time of day), use `field: "hours"` with `triggerAtHour` +
 * `triggerAtMinute`, or fall back to a raw cron expression interval —
 * never rely on `triggerAtMinute` under a minutes-field interval.
 */

export type Frequency =
  | "everyMinutes"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly";

export const FREQUENCIES: { value: Frequency; label: string }[] = [
  { value: "everyMinutes", label: "Every N minutes" },
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly (choose days)" },
  { value: "monthly", label: "Monthly (choose day of month)" },
];

export const WEEKDAYS = [
  { value: 0, label: "Sun" },
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
];

export type ScheduleConfig = {
  frequency: Frequency;
  everyN: number; // for everyMinutes
  hour: number; // 0-23
  minute: number; // 0-59
  weekdays: number[]; // 0-6, for weekly
  dayOfMonth: number; // 1-28 (kept safe for all months)
};

export const DEFAULT_SCHEDULE: ScheduleConfig = {
  frequency: "daily",
  everyN: 15,
  hour: 9,
  minute: 0,
  weekdays: [1, 2, 3, 4, 5],
  dayOfMonth: 1,
};

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function buildCronExpression(cfg: ScheduleConfig): string {
  const { frequency, everyN, hour, minute, weekdays, dayOfMonth } = cfg;
  switch (frequency) {
    case "everyMinutes": {
      const n = Math.min(59, Math.max(1, everyN));
      return `*/${n} * * * *`;
    }
    case "hourly":
      return `${minute} * * * *`;
    case "daily":
      return `${minute} ${hour} * * *`;
    case "weekly": {
      const days = weekdays.length ? [...weekdays].sort().join(",") : "1";
      return `${minute} ${hour} * * ${days}`;
    }
    case "monthly":
      return `${minute} ${hour} ${dayOfMonth} * *`;
    default:
      return `${minute} ${hour} * * *`;
  }
}

export function humanReadable(cfg: ScheduleConfig): string {
  const { frequency, everyN, hour, minute, weekdays, dayOfMonth } = cfg;
  const time = `${pad2(hour % 24)}:${pad2(minute)}`;
  switch (frequency) {
    case "everyMinutes":
      return `Every ${Math.min(59, Math.max(1, everyN))} minute${everyN === 1 ? "" : "s"}, around the clock.`;
    case "hourly":
      return `Every hour, at :${pad2(minute)} past the hour.`;
    case "daily":
      return `Every day at ${time}.`;
    case "weekly": {
      if (!weekdays.length) return `Weekly at ${time} (pick at least one day).`;
      const names = weekdays
        .slice()
        .sort()
        .map((d) => WEEKDAYS.find((w) => w.value === d)?.label ?? "")
        .filter(Boolean);
      return `Every ${names.join(", ")} at ${time}.`;
    }
    case "monthly":
      return `On day ${dayOfMonth} of every month at ${time}.`;
    default:
      return `At ${time}.`;
  }
}

/**
 * n8n Schedule Trigger node — rule-based config using the `interval`
 * array. We always emit a `cronExpression` interval so the snippet is
 * guaranteed correct regardless of frequency, then attach a comment
 * showing the native-fields equivalent for daily/weekly/monthly cases
 * (the pattern that avoids the triggerAtMinute-under-minutes gotcha).
 */
export function buildN8nScheduleNode(cfg: ScheduleConfig): {
  cronNode: object;
  nativeFieldsNote: string | null;
} {
  const cron = buildCronExpression(cfg);

  const cronNode = {
    name: "Schedule Trigger",
    type: "n8n-nodes-base.scheduleTrigger",
    typeVersion: 1.2,
    parameters: {
      rule: {
        interval: [{ field: "cronExpression", expression: cron }],
      },
    },
  };

  let nativeFieldsNote: string | null = null;

  if (cfg.frequency === "daily") {
    nativeFieldsNote = JSON.stringify(
      {
        rule: {
          interval: [
            {
              field: "days",
              daysInterval: 1,
              triggerAtHour: cfg.hour,
              triggerAtMinute: cfg.minute,
            },
          ],
        },
      },
      null,
      2,
    );
  } else if (cfg.frequency === "weekly") {
    nativeFieldsNote = JSON.stringify(
      {
        rule: {
          interval: [
            {
              field: "weeks",
              triggerAtHour: cfg.hour,
              triggerAtMinute: cfg.minute,
              triggerAtDay: cfg.weekdays,
            },
          ],
        },
      },
      null,
      2,
    );
  } else if (cfg.frequency === "monthly") {
    nativeFieldsNote = JSON.stringify(
      {
        rule: {
          interval: [
            {
              field: "months",
              triggerAtDayOfMonth: cfg.dayOfMonth,
              triggerAtHour: cfg.hour,
              triggerAtMinute: cfg.minute,
            },
          ],
        },
      },
      null,
      2,
    );
  }

  return { cronNode, nativeFieldsNote };
}

export const N8N_MINUTES_GOTCHA =
  'Gotcha: n8n\'s Schedule Trigger with field: "minutes" ignores triggerAtMinute entirely — it just fires every N minutes from activation time, not on a clean clock boundary. If you need a specific minute (daily/weekly/monthly at an exact time), use field: "hours"/"days"/"weeks"/"months" with triggerAtHour + triggerAtMinute instead, or paste the cronExpression interval above.';

export const CRON_FIELD_GUIDE = [
  { field: "minute", range: "0–59" },
  { field: "hour", range: "0–23" },
  { field: "day of month", range: "1–31, or *" },
  { field: "month", range: "1–12, or *" },
  { field: "day of week", range: "0–6 (Sun–Sat), or *" },
] as const;
