/**
 * llm-pricing.ts — static approximate pricing table for the AI Cost
 * Calculator tool.
 *
 * IMPORTANT: LLM API pricing changes often and providers frequently ship new
 * model tiers. Every rate below is an APPROXIMATION drawn from published
 * provider pricing pages and is explicitly labeled as such in the UI. This
 * file is NOT a live feed — no API is called. Always verify current pricing
 * on the provider's own pricing page before making a purchasing decision.
 */

export const PRICING_AS_OF =
  "approximate — not a live feed, verify on the provider's pricing page";

export type LlmModel = {
  id: string;
  provider: "Anthropic" | "OpenAI" | "Google";
  model: string;
  /** USD per 1,000,000 input tokens. Approximate. */
  inputPer1M: number;
  /** USD per 1,000,000 output tokens. Approximate. */
  outputPer1M: number;
  tier: "flagship" | "mid" | "fast/cheap";
  note: string;
};

export const LLM_PRICING: LlmModel[] = [
  // ---------------------------------------------------------------
  // Anthropic (Claude)
  // ---------------------------------------------------------------
  {
    id: "claude-opus",
    provider: "Anthropic",
    model: "Claude Opus",
    inputPer1M: 15,
    outputPer1M: 75,
    tier: "flagship",
    note: "Top-end reasoning tier, approximate published rate.",
  },
  {
    id: "claude-sonnet",
    provider: "Anthropic",
    model: "Claude Sonnet",
    inputPer1M: 3,
    outputPer1M: 15,
    tier: "mid",
    note: "Balanced tier, most common default for production apps.",
  },
  {
    id: "claude-haiku",
    provider: "Anthropic",
    model: "Claude Haiku",
    inputPer1M: 0.8,
    outputPer1M: 4,
    tier: "fast/cheap",
    note: "Fast/cheap tier for high-volume, low-latency tasks.",
  },

  // ---------------------------------------------------------------
  // OpenAI (GPT)
  // ---------------------------------------------------------------
  {
    id: "gpt-4o",
    provider: "OpenAI",
    model: "GPT-4o",
    inputPer1M: 2.5,
    outputPer1M: 10,
    tier: "flagship",
    note: "Flagship multimodal tier, approximate published rate.",
  },
  {
    id: "gpt-4-1",
    provider: "OpenAI",
    model: "GPT-4.1",
    inputPer1M: 2,
    outputPer1M: 8,
    tier: "mid",
    note: "Mid tier, approximate published rate.",
  },
  {
    id: "gpt-4o-mini",
    provider: "OpenAI",
    model: "GPT-4o mini",
    inputPer1M: 0.15,
    outputPer1M: 0.6,
    tier: "fast/cheap",
    note: "Fast/cheap tier for high-volume tasks.",
  },

  // ---------------------------------------------------------------
  // Google (Gemini)
  // ---------------------------------------------------------------
  {
    id: "gemini-pro",
    provider: "Google",
    model: "Gemini Pro",
    inputPer1M: 1.25,
    outputPer1M: 5,
    tier: "flagship",
    note: "Flagship tier, approximate published rate (sub-128k context).",
  },
  {
    id: "gemini-flash",
    provider: "Google",
    model: "Gemini Flash",
    inputPer1M: 0.15,
    outputPer1M: 0.6,
    tier: "mid",
    note: "Fast mid tier, approximate published rate.",
  },
  {
    id: "gemini-flash-lite",
    provider: "Google",
    model: "Gemini Flash-Lite",
    inputPer1M: 0.075,
    outputPer1M: 0.3,
    tier: "fast/cheap",
    note: "Cheapest tier, approximate published rate.",
  },
];

export type CostInputs = {
  modelId: string;
  inputTokensPerRequest: number;
  outputTokensPerRequest: number;
  requestsPerDay: number;
};

export const DEFAULT_COST_INPUTS: CostInputs = {
  modelId: "claude-sonnet",
  inputTokensPerRequest: 1500,
  outputTokensPerRequest: 500,
  requestsPerDay: 200,
};

export function monthlyRequestVolume(requestsPerDay: number): number {
  return requestsPerDay * 30;
}

export function estimateMonthlyCost(
  model: LlmModel,
  inputs: CostInputs,
): number {
  const requestsPerMonth = monthlyRequestVolume(inputs.requestsPerDay);
  const inputCost =
    (inputs.inputTokensPerRequest / 1_000_000) *
    model.inputPer1M *
    requestsPerMonth;
  const outputCost =
    (inputs.outputTokensPerRequest / 1_000_000) *
    model.outputPer1M *
    requestsPerMonth;
  return inputCost + outputCost;
}

export function findModel(modelId: string): LlmModel {
  return LLM_PRICING.find((m) => m.id === modelId) ?? LLM_PRICING[1];
}
