/**
 * llm-pricing.ts — static pricing table for the AI Cost Calculator tool.
 *
 * Every rate below was hand-verified against the provider's OWN pricing page
 * on 2026-08-19 (sources in the comments next to each model). This file is
 * NOT a live feed — no API is called at runtime. LLM API pricing changes
 * often and providers frequently ship new model tiers, so always verify
 * current pricing on the provider's pricing page before making a purchasing
 * decision.
 *
 * Sources (fetched 2026-08-19):
 * - Anthropic: https://platform.claude.com/docs/en/docs/about-claude/pricing
 * - OpenAI:    https://developers.openai.com/api/docs/pricing
 * - Google:    https://ai.google.dev/gemini-api/docs/pricing
 */

export const PRICING_AS_OF =
  "August 2026 (verified against provider pricing pages)";

export type LlmModel = {
  id: string;
  provider: "Anthropic" | "OpenAI" | "Google";
  model: string;
  /** USD per 1,000,000 input tokens (standard, non-batch, non-cached). */
  inputPer1M: number;
  /** USD per 1,000,000 output tokens (standard, non-batch). */
  outputPer1M: number;
  tier: "flagship" | "mid" | "fast/cheap";
  note: string;
};

export const LLM_PRICING: LlmModel[] = [
  // ---------------------------------------------------------------
  // Anthropic (Claude)
  // Source: https://platform.claude.com/docs/en/docs/about-claude/pricing
  // ---------------------------------------------------------------
  {
    id: "claude-fable-5",
    provider: "Anthropic",
    model: "Claude Fable 5",
    inputPer1M: 10,
    outputPer1M: 50,
    tier: "flagship",
    note: "Anthropic's top-end model tier.",
  },
  {
    id: "claude-opus-5",
    provider: "Anthropic",
    model: "Claude Opus 5",
    inputPer1M: 5,
    outputPer1M: 25,
    tier: "flagship",
    note: "High-end reasoning tier below Fable 5.",
  },
  {
    id: "claude-sonnet-5",
    provider: "Anthropic",
    model: "Claude Sonnet 5",
    inputPer1M: 3,
    outputPer1M: 15,
    tier: "mid",
    note: "Standard price; a $2/$10 intro rate runs through Aug 31, 2026.",
  },
  {
    id: "claude-haiku-4-5",
    provider: "Anthropic",
    model: "Claude Haiku 4.5",
    inputPer1M: 1,
    outputPer1M: 5,
    tier: "fast/cheap",
    note: "Fast/cheap tier for high-volume, low-latency tasks.",
  },

  // ---------------------------------------------------------------
  // OpenAI (GPT)
  // Source: https://developers.openai.com/api/docs/pricing
  // ---------------------------------------------------------------
  {
    id: "gpt-5-6-sol",
    provider: "OpenAI",
    model: "GPT-5.6-sol",
    inputPer1M: 5,
    outputPer1M: 30,
    tier: "flagship",
    note: "OpenAI's current flagship text model.",
  },
  {
    id: "gpt-5-6-terra",
    provider: "OpenAI",
    model: "GPT-5.6-terra",
    inputPer1M: 2,
    outputPer1M: 12,
    tier: "mid",
    note: "Mid tier for most production workloads.",
  },
  {
    id: "gpt-5-6-luna",
    provider: "OpenAI",
    model: "GPT-5.6-luna",
    inputPer1M: 0.2,
    outputPer1M: 1.2,
    tier: "fast/cheap",
    note: "Fast/cheap tier for high-volume tasks.",
  },
  {
    id: "gpt-5-4-nano",
    provider: "OpenAI",
    model: "GPT-5.4 nano",
    inputPer1M: 0.2,
    outputPer1M: 1.25,
    tier: "fast/cheap",
    note: "Cheapest current-generation OpenAI tier.",
  },

  // ---------------------------------------------------------------
  // Google (Gemini)
  // Source: https://ai.google.dev/gemini-api/docs/pricing
  // ---------------------------------------------------------------
  {
    id: "gemini-3-1-pro-preview",
    provider: "Google",
    model: "Gemini 3.1 Pro Preview",
    inputPer1M: 2,
    outputPer1M: 12,
    tier: "flagship",
    note: "Rates for prompts up to 200k tokens; longer prompts cost more ($4 in / $18 out).",
  },
  {
    id: "gemini-3-7-flash",
    provider: "Google",
    model: "Gemini 3.7 Flash",
    inputPer1M: 0.75,
    outputPer1M: 3.75,
    tier: "mid",
    note: "Promotional rate through Dec 31, 2026; rises to $1.50 / $7.50 from Jan 1, 2027.",
  },
  {
    id: "gemini-3-5-flash-lite",
    provider: "Google",
    model: "Gemini 3.5 Flash-Lite",
    inputPer1M: 0.3,
    outputPer1M: 2.5,
    tier: "fast/cheap",
    note: "Cheapest current-generation Gemini tier.",
  },
];

export type CostInputs = {
  modelId: string;
  inputTokensPerRequest: number;
  outputTokensPerRequest: number;
  requestsPerDay: number;
};

export const DEFAULT_COST_INPUTS: CostInputs = {
  modelId: "claude-sonnet-5",
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
  // Fall back to the default mid-tier model when a saved/unknown id (e.g. a
  // model removed in a pricing refresh) is requested.
  return (
    LLM_PRICING.find((m) => m.id === modelId) ??
    LLM_PRICING.find((m) => m.id === DEFAULT_COST_INPUTS.modelId) ??
    LLM_PRICING[0]
  );
}
