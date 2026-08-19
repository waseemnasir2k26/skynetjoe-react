/**
 * n8n-node-generator.ts — turns a captured webhook request into an
 * importable n8n workflow JSON: a Webhook node configured with the
 * captured method + a path placeholder, followed by a Set node that maps
 * the captured body's top-level fields. Runs entirely client-side — no
 * captured data is ever sent anywhere except rendered in the browser tab
 * that owns this bin.
 *
 * Node `type`/`typeVersion` strings match real n8n-nodes-base identifiers
 * (same pattern as src/data/tools/n8n-templates.ts) so the JSON imports
 * cleanly via n8n's "Import from File" / paste-JSON flow. No credentials
 * are ever embedded.
 */

export type CapturedRequestClient = {
  id: string;
  method: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  bodyRaw: string;
  bodyPretty: string | null;
  contentType: string | null;
  receivedAt: number;
};

const MAX_FIELDS = 20;

function fieldType(value: unknown): "string" | "number" | "boolean" | "object" {
  if (typeof value === "number") return "number";
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "object" && value !== null) return "object";
  return "string";
}

function assignmentsFromBody(req: CapturedRequestClient): {
  id: string;
  name: string;
  value: string;
  type: "string" | "number" | "boolean" | "object";
}[] {
  const source = req.bodyPretty ?? req.bodyRaw;
  if (!source) {
    return [
      {
        id: "field-1",
        name: "method",
        value: `={{ $json.method }}`,
        type: "string",
      },
    ];
  }
  try {
    const parsed = JSON.parse(source) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const entries = Object.entries(parsed as Record<string, unknown>).slice(
        0,
        MAX_FIELDS,
      );
      if (entries.length > 0) {
        return entries.map(([key], i) => ({
          id: `field-${i + 1}`,
          name: key,
          value: `={{ $json.body.${key} }}`,
          type: fieldType((parsed as Record<string, unknown>)[key]),
        }));
      }
    }
  } catch {
    /* not JSON — fall through to raw-body mapping */
  }
  return [
    {
      id: "field-1",
      name: "rawBody",
      value: `={{ $json.body }}`,
      type: "string",
    },
  ];
}

export type N8nSnippet = {
  name: string;
  nodes: unknown[];
  connections: Record<
    string,
    { main: Array<Array<{ node: string; type: "main"; index: number }>> }
  >;
  active: boolean;
  settings: { executionOrder: "v1" };
  pinData: Record<string, never>;
};

/** Build a single-webhook n8n workflow JSON snippet from a captured request. */
export function buildN8nNodeSnippet(
  req: CapturedRequestClient,
  binId: string,
): N8nSnippet {
  const webhookPath = `catch-${binId.slice(0, 8)}`;
  const assignments = assignmentsFromBody(req);

  const webhookNode = {
    id: "webhook-node-1",
    name: "Webhook",
    type: "n8n-nodes-base.webhook",
    typeVersion: 2,
    position: [0, 300] as [number, number],
    parameters: {
      httpMethod: req.method,
      path: webhookPath,
      responseMode: "onReceived",
      options: {},
    },
    notes:
      "Path pre-filled from the captured request. Rename it to whatever your real endpoint should be.",
  };

  const setNode = {
    id: "set-node-1",
    name: "Map captured fields",
    type: "n8n-nodes-base.set",
    typeVersion: 3.4,
    position: [280, 300] as [number, number],
    parameters: {
      mode: "manual",
      assignments: { assignments },
      options: {},
    },
    notes: `Fields pre-mapped from the request captured on ${new Date(req.receivedAt).toISOString()}.`,
  };

  return {
    name: `Webhook Inspector capture — ${req.method} ${webhookPath}`,
    nodes: [webhookNode, setNode],
    connections: {
      Webhook: {
        main: [[{ node: "Map captured fields", type: "main", index: 0 }]],
      },
    },
    active: false,
    settings: { executionOrder: "v1" },
    pinData: {},
  };
}
