/**
 * Sitewide availability counters — single source of truth.
 *
 * Update these numbers weekly. They feed scarcity chips, sticky CTAs,
 * hero badges, and any other "slots left" copy. Keep the language
 * specific (real numbers > "limited spots") to maintain Cialdini scarcity
 * without crossing into faked-urgency tells.
 */

export const SLOTS_LEFT_THIS_WEEK = 3 as const;
export const SLOTS_TOTAL_PER_WEEK = 5 as const;
export const SLOTS_LEFT_THIS_MONTH = 2 as const;
export const SLOTS_TOTAL_PER_MONTH = 4 as const;

export const CURRENT_CYCLE_LABEL = "this week" as const;
