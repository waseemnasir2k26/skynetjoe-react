/**
 * n8n-lint — shared parsing, layout, and health-check engine for the
 * n8n Workflow Linter + Visualizer tool.
 *
 * Everything here works on the raw workflow JSON a user pastes. No network
 * calls, no invented data — every Finding cites a real JSON path into the
 * object that was actually parsed.
 */

export type N8nNode = {
  id?: string;
  name: string;
  type: string;
  typeVersion?: number;
  position?: [number, number];
  parameters?: Record<string, unknown>;
  credentials?: Record<string, unknown>;
  disabled?: boolean;
  retryOnFail?: boolean;
  continueOnFail?: boolean;
  notes?: string;
  webhookId?: string;
};

export type N8nConnectionTarget = {
  node: string;
  type: string;
  index: number;
};

export type N8nConnections = Record<
  string,
  { main?: Array<N8nConnectionTarget[] | null> }
>;

export type N8nWorkflow = {
  name?: string;
  nodes: N8nNode[];
  connections: N8nConnections;
  active?: boolean;
  settings?: { errorWorkflow?: string; [k: string]: unknown };
};

export type ParseResult =
  | { ok: true; workflow: N8nWorkflow }
  | { ok: false; error: string };

/** Parse + shape-validate pasted JSON. Never throws. */
export function parseWorkflow(raw: string): ParseResult {
  const trimmed = raw.trim();
  if (!trimmed)
    return { ok: false, error: "Paste an n8n workflow JSON to lint it." };

  let data: unknown;
  try {
    data = JSON.parse(trimmed);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown parse error";
    return { ok: false, error: `Invalid JSON — ${msg}` };
  }

  if (typeof data !== "object" || data === null) {
    return { ok: false, error: "That's valid JSON but not a workflow object." };
  }
  const obj = data as Record<string, unknown>;
  if (!Array.isArray(obj.nodes)) {
    return {
      ok: false,
      error:
        'Missing a "nodes" array — this doesn\'t look like an n8n workflow export.',
    };
  }
  const connections =
    obj.connections && typeof obj.connections === "object"
      ? (obj.connections as N8nConnections)
      : {};

  const nodes = (obj.nodes as unknown[]).map((n, i) => {
    const node = (n && typeof n === "object" ? n : {}) as Record<
      string,
      unknown
    >;
    return {
      id: typeof node.id === "string" ? node.id : undefined,
      name: typeof node.name === "string" ? node.name : `(unnamed node ${i})`,
      type: typeof node.type === "string" ? node.type : "unknown",
      typeVersion:
        typeof node.typeVersion === "number" ? node.typeVersion : undefined,
      position: Array.isArray(node.position)
        ? (node.position as [number, number])
        : undefined,
      parameters:
        node.parameters && typeof node.parameters === "object"
          ? (node.parameters as Record<string, unknown>)
          : {},
      credentials:
        node.credentials && typeof node.credentials === "object"
          ? (node.credentials as Record<string, unknown>)
          : undefined,
      disabled: node.disabled === true,
      retryOnFail: node.retryOnFail === true,
      continueOnFail: node.continueOnFail === true,
      notes: typeof node.notes === "string" ? node.notes : undefined,
      webhookId:
        typeof node.webhookId === "string" ? node.webhookId : undefined,
    } satisfies N8nNode;
  });

  return {
    ok: true,
    workflow: {
      name: typeof obj.name === "string" ? obj.name : undefined,
      nodes,
      connections,
      active: obj.active === true,
      settings:
        obj.settings && typeof obj.settings === "object"
          ? (obj.settings as N8nWorkflow["settings"])
          : {},
    },
  };
}

/* ------------------------------------------------------------------ */
/* Node categorization + graph layout                                  */
/* ------------------------------------------------------------------ */

export type NodeCategory = "trigger" | "http" | "code" | "logic" | "other";

const TRIGGER_TYPES =
  /webhook|trigger|cron|manualTrigger|scheduleTrigger|errorTrigger|formTrigger/i;
const HTTP_TYPES =
  /httpRequest|slack|hubspot|stripe|twilio|sendGrid|gmail|googleSheets|airtable|notion|salesforce|discord|telegram|graphql|openAi/i;
const CODE_TYPES = /^n8n-nodes-base\.(code|function|functionItem)$/i;
const LOGIC_TYPES = /^n8n-nodes-base\.(if|switch|merge|filter|noOp)$/i;

export function categorize(type: string): NodeCategory {
  if (TRIGGER_TYPES.test(type)) return "trigger";
  if (CODE_TYPES.test(type)) return "code";
  if (LOGIC_TYPES.test(type)) return "logic";
  if (HTTP_TYPES.test(type)) return "http";
  return "other";
}

export const CATEGORY_COLOR: Record<NodeCategory, string> = {
  trigger: "#4f8a5b", // green — entry point
  http: "#c66b3f", // terracotta — external call
  code: "#1a1a1a", // ink — custom logic
  logic: "#8a6fc6", // violet — branching
  other: "#8a8477", // muted stone — everything else
};

export type GraphNode = {
  name: string;
  type: string;
  category: NodeCategory;
  x: number;
  y: number;
  disabled: boolean;
};

export type GraphEdge = {
  from: string;
  to: string;
  outputIndex: number;
};

export type Graph = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  viewBox: string;
};

const NODE_W = 180;
const NODE_H = 56;
const PAD = 80;
const FALLBACK_GAP_X = 260;

/** Build an SVG-ready graph from node.position (falls back to a left-to-right grid if positions are missing). */
export function buildGraph(workflow: N8nWorkflow): Graph {
  const hasPositions = workflow.nodes.every((n) => Array.isArray(n.position));

  const nodes: GraphNode[] = workflow.nodes.map((n, i) => {
    const [rawX, rawY] =
      hasPositions && n.position ? n.position : [i * FALLBACK_GAP_X, 0];
    return {
      name: n.name,
      type: n.type,
      category: categorize(n.type),
      x: rawX,
      y: rawY,
      disabled: !!n.disabled,
    };
  });

  const edges: GraphEdge[] = [];
  for (const [from, conn] of Object.entries(workflow.connections || {})) {
    const mainOutputs = conn?.main || [];
    mainOutputs.forEach((targets, outputIndex) => {
      (targets || []).forEach((t) => {
        edges.push({ from, to: t.node, outputIndex });
      });
    });
  }

  const xs = nodes.map((n) => n.x);
  const ys = nodes.map((n) => n.y);
  const minX = xs.length ? Math.min(...xs) : 0;
  const maxX = xs.length ? Math.max(...xs) : NODE_W;
  const minY = ys.length ? Math.min(...ys) : 0;
  const maxY = ys.length ? Math.max(...ys) : NODE_H;

  const vbX = minX - PAD;
  const vbY = minY - PAD;
  const vbW = maxX - minX + NODE_W + PAD * 2;
  const vbH = maxY - minY + NODE_H + PAD * 2;

  return { nodes, edges, viewBox: `${vbX} ${vbY} ${vbW} ${vbH}` };
}

export { NODE_W, NODE_H };

/* ------------------------------------------------------------------ */
/* 20-point health check                                               */
/* ------------------------------------------------------------------ */

export type Severity = "critical" | "warning" | "info";

export type Finding = {
  ruleId: string;
  severity: Severity;
  title: string;
  detail: string;
  path: string;
};

export type CheckResult = {
  id: string;
  label: string;
  passed: boolean;
  findings: Finding[];
};

/** Manually-maintained snapshot of "current" n8n typeVersions for common nodes. Not a live registry lookup — flagged in the UI as such. */
const LATEST_TYPE_VERSION: Record<string, number> = {
  "n8n-nodes-base.httpRequest": 4.2,
  "n8n-nodes-base.webhook": 2,
  "n8n-nodes-base.code": 2,
  "n8n-nodes-base.function": 1,
  "n8n-nodes-base.if": 2,
  "n8n-nodes-base.switch": 3,
  "n8n-nodes-base.set": 3.4,
  "n8n-nodes-base.noOp": 1,
  "n8n-nodes-base.slack": 2.3,
  "n8n-nodes-base.gmail": 2.1,
  "n8n-nodes-base.googleSheets": 4.6,
  "n8n-nodes-base.emailSend": 2.1,
  "n8n-nodes-base.scheduleTrigger": 1.2,
  "n8n-nodes-base.manualTrigger": 1,
  "n8n-nodes-base.merge": 3.2,
  "n8n-nodes-base.filter": 2.2,
  "n8n-nodes-base.stripe": 1,
  "n8n-nodes-base.hubspot": 2.1,
};

const CRED_REGEXES: { re: RegExp; label: string }[] = [
  { re: /sk-[A-Za-z0-9]{16,}/, label: "OpenAI-style secret key (sk-…)" },
  { re: /xox[baprs]-[A-Za-z0-9-]{10,}/, label: "Slack token (xox…)" },
  { re: /bearer\s+[A-Za-z0-9\-_.]{10,}/i, label: "Bearer token" },
  {
    re: /(api[_-]?key|apikey|access[_-]?token|secret)["']?\s*[:=]\s*["']?[A-Za-z0-9_\-]{8,}/i,
    label: "Inline API key / secret literal",
  },
  {
    re: /https?:\/\/[^\s"'/]+:[^\s"'@]+@/,
    label: "Credentials embedded in a URL",
  },
];

/** Walk parameters recursively, flag string leaves matching credential patterns. Skips n8n expressions (={{ }}) since those reference credentials, not literal secrets. */
function scanParamsForSecrets(
  params: unknown,
  pathPrefix: string,
  out: { path: string; label: string }[],
): void {
  if (params == null) return;
  if (typeof params === "string") {
    if (params.startsWith("={{")) return; // expression, not a literal
    for (const { re, label } of CRED_REGEXES) {
      if (re.test(params)) {
        out.push({ path: pathPrefix, label });
        return;
      }
    }
    return;
  }
  if (Array.isArray(params)) {
    params.forEach((v, i) =>
      scanParamsForSecrets(v, `${pathPrefix}[${i}]`, out),
    );
    return;
  }
  if (typeof params === "object") {
    for (const [k, v] of Object.entries(params as Record<string, unknown>)) {
      scanParamsForSecrets(v, `${pathPrefix}.${k}`, out);
    }
  }
}

function isDefaultName(name: string, type: string): boolean {
  const shortType = type.split(".").pop() || "";
  const humanized = shortType.replace(/([a-z])([A-Z])/g, "$1 $2");
  const base = new RegExp(`^${humanized}\\s*\\d*$`, "i");
  return base.test(name.trim());
}

export function lintWorkflow(workflow: N8nWorkflow): CheckResult[] {
  const nodes = workflow.nodes;
  const nodeIndex = (name: string) => nodes.findIndex((n) => n.name === name);

  const incoming = new Set<string>();
  const outgoing = new Set<string>();
  for (const [from, conn] of Object.entries(workflow.connections || {})) {
    const mainOutputs = conn?.main || [];
    let hasAny = false;
    mainOutputs.forEach((targets) => {
      (targets || []).forEach((t) => {
        incoming.add(t.node);
        hasAny = true;
      });
    });
    if (hasAny) outgoing.add(from);
  }

  const results: CheckResult[] = [];
  const add = (id: string, label: string, findings: Finding[]) =>
    results.push({ id, label, passed: findings.length === 0, findings });

  // 1. has-trigger
  {
    const triggers = nodes.filter((n) => categorize(n.type) === "trigger");
    add(
      "has-trigger",
      "Workflow has at least one trigger node",
      triggers.length
        ? []
        : [
            {
              ruleId: "has-trigger",
              severity: "critical",
              title: "No trigger node found",
              detail:
                "Nothing in this workflow can start it — no webhook, cron/schedule, or manual trigger node.",
              path: "nodes",
            },
          ],
    );
  }

  // 2. error-workflow-configured
  {
    const configured = !!workflow.settings?.errorWorkflow;
    add(
      "error-workflow-configured",
      "An error workflow is configured",
      configured
        ? []
        : [
            {
              ruleId: "error-workflow-configured",
              severity: "warning",
              title: "No error workflow configured",
              detail:
                "settings.errorWorkflow is empty — a failed execution won't trigger any notification/recovery workflow.",
              path: "settings.errorWorkflow",
            },
          ],
    );
  }

  // 3. no-orphan-nodes
  {
    const findings: Finding[] = [];
    nodes.forEach((n, i) => {
      const cat = categorize(n.type);
      if (cat === "trigger") return;
      if (!incoming.has(n.name) && !outgoing.has(n.name)) {
        findings.push({
          ruleId: "no-orphan-nodes",
          severity: "warning",
          title: `Orphan node: "${n.name}"`,
          detail:
            "This node has no incoming or outgoing connection — it will never run.",
          path: `nodes[${i}]`,
        });
      }
    });
    add("no-orphan-nodes", "No disconnected/orphan nodes", findings);
  }

  // 4 + 5. hardcoded credentials / URLs
  {
    const credFindings: Finding[] = [];
    const urlFindings: Finding[] = [];
    nodes.forEach((n, i) => {
      const hits: { path: string; label: string }[] = [];
      scanParamsForSecrets(n.parameters, `nodes[${i}].parameters`, hits);
      for (const h of hits) {
        if (h.label === "Credentials embedded in a URL") {
          urlFindings.push({
            ruleId: "no-hardcoded-urls",
            severity: "critical",
            title: `Credentials embedded in a URL — "${n.name}"`,
            detail: h.label,
            path: h.path,
          });
        } else {
          credFindings.push({
            ruleId: "no-hardcoded-credentials",
            severity: "critical",
            title: `Possible hardcoded secret — "${n.name}"`,
            detail: `${h.label}. Use an n8n credential or expression instead of a literal value.`,
            path: h.path,
          });
        }
      }
    });
    add(
      "no-hardcoded-credentials",
      "No hardcoded API keys/tokens in parameters",
      credFindings,
    );
    add(
      "no-hardcoded-urls",
      "No credentials embedded directly in a URL",
      urlFindings,
    );
  }

  // 6. webhook-auth
  {
    const findings: Finding[] = [];
    nodes.forEach((n, i) => {
      if (
        !/webhook/i.test(n.type) ||
        (/trigger$/i.test(n.type) === false && !/webhook/i.test(n.type))
      ) {
        // keep simple: only n8n-nodes-base.webhook
      }
      if (n.type === "n8n-nodes-base.webhook") {
        const auth = n.parameters?.authentication;
        if (!auth || auth === "none") {
          findings.push({
            ruleId: "webhook-auth",
            severity: "critical",
            title: `Webhook without authentication — "${n.name}"`,
            detail:
              'parameters.authentication is missing or "none" — this endpoint is publicly callable by anyone with the URL.',
            path: `nodes[${i}].parameters.authentication`,
          });
        }
      }
    });
    add("webhook-auth", "Webhook nodes require authentication", findings);
  }

  // 7. retry-on-fail-http
  {
    const findings: Finding[] = [];
    nodes.forEach((n, i) => {
      if (categorize(n.type) === "http" && !n.retryOnFail) {
        findings.push({
          ruleId: "retry-on-fail-http",
          severity: "warning",
          title: `No retry-on-fail — "${n.name}"`,
          detail:
            "HTTP/API-style node has no retryOnFail — a transient failure kills the run.",
          path: `nodes[${i}].retryOnFail`,
        });
      }
    });
    add("retry-on-fail-http", "HTTP/API nodes have retry-on-fail", findings);
  }

  // 8. timeout-set-http
  {
    const findings: Finding[] = [];
    nodes.forEach((n, i) => {
      if (n.type === "n8n-nodes-base.httpRequest") {
        const options = n.parameters?.options as
          | Record<string, unknown>
          | undefined;
        if (!options || options.timeout == null) {
          findings.push({
            ruleId: "timeout-set-http",
            severity: "info",
            title: `No explicit timeout — "${n.name}"`,
            detail:
              "parameters.options.timeout isn't set — a hung upstream call can stall the whole execution.",
            path: `nodes[${i}].parameters.options.timeout`,
          });
        }
      }
    });
    add(
      "timeout-set-http",
      "HTTP Request nodes set an explicit timeout",
      findings,
    );
  }

  // 9. no-deprecated-typeversion
  {
    const findings: Finding[] = [];
    nodes.forEach((n, i) => {
      const latest = LATEST_TYPE_VERSION[n.type];
      if (latest != null && n.typeVersion != null && n.typeVersion < latest) {
        findings.push({
          ruleId: "no-deprecated-typeversion",
          severity: "info",
          title: `Older typeVersion — "${n.name}"`,
          detail: `Running typeVersion ${n.typeVersion}; current is ${latest} (per this tool's known-node map, not a live n8n registry lookup).`,
          path: `nodes[${i}].typeVersion`,
        });
      }
    });
    add(
      "no-deprecated-typeversion",
      "Nodes use current known typeVersion",
      findings,
    );
  }

  // 10. no-empty-code-nodes
  {
    const findings: Finding[] = [];
    nodes.forEach((n, i) => {
      if (categorize(n.type) === "code") {
        const body =
          (n.parameters?.jsCode as string) ||
          (n.parameters?.pythonCode as string) ||
          (n.parameters?.functionCode as string) ||
          "";
        if (!body.trim()) {
          findings.push({
            ruleId: "no-empty-code-nodes",
            severity: "critical",
            title: `Empty Code node — "${n.name}"`,
            detail:
              "This Code/Function node has no body — it will error or no-op at runtime.",
            path: `nodes[${i}].parameters`,
          });
        }
      }
    });
    add("no-empty-code-nodes", "Code/Function nodes have a body", findings);
  }

  // 11. named-nodes
  {
    const findings: Finding[] = [];
    nodes.forEach((n, i) => {
      if (!n.name.trim() || isDefaultName(n.name, n.type)) {
        findings.push({
          ruleId: "named-nodes",
          severity: "info",
          title: `Generic/default node name — "${n.name || "(empty)"}"`,
          detail:
            "Left at its auto-generated name — rename to describe what it actually does.",
          path: `nodes[${i}].name`,
        });
      }
    });
    add("named-nodes", "Nodes are given descriptive names", findings);
  }

  // 12. if-both-branches
  {
    const findings: Finding[] = [];
    nodes.forEach((n) => {
      if (n.type === "n8n-nodes-base.if") {
        const conn = workflow.connections[n.name]?.main || [];
        const trueWired = (conn[0]?.length ?? 0) > 0;
        const falseWired = (conn[1]?.length ?? 0) > 0;
        if (trueWired !== falseWired) {
          findings.push({
            ruleId: "if-both-branches",
            severity: "info",
            title: `Single-branch IF node — "${n.name}"`,
            detail: `Only the ${trueWired ? "true" : "false"} output is wired — the other branch silently dead-ends.`,
            path: `connections["${n.name}"].main`,
          });
        }
      }
    });
    add("if-both-branches", "IF nodes wire both true/false branches", findings);
  }

  // 13. switch-default-branch
  {
    const findings: Finding[] = [];
    nodes.forEach((n) => {
      if (n.type === "n8n-nodes-base.switch") {
        const conn = workflow.connections[n.name]?.main || [];
        const anyEmpty = conn.some((t) => !t || t.length === 0);
        if (anyEmpty) {
          findings.push({
            ruleId: "switch-default-branch",
            severity: "info",
            title: `Switch node has an unwired output — "${n.name}"`,
            detail:
              "At least one Switch output (possibly the fallback) has no downstream connection.",
            path: `connections["${n.name}"].main`,
          });
        }
      }
    });
    add("switch-default-branch", "Switch nodes wire every output", findings);
  }

  // 14. no-disabled-nodes-left
  {
    const findings: Finding[] = [];
    nodes.forEach((n, i) => {
      if (n.disabled) {
        findings.push({
          ruleId: "no-disabled-nodes-left",
          severity: "info",
          title: `Disabled node left in workflow — "${n.name}"`,
          detail:
            "disabled: true — dead weight on the canvas, or a forgotten debug toggle.",
          path: `nodes[${i}].disabled`,
        });
      }
    });
    add(
      "no-disabled-nodes-left",
      "No disabled nodes left in production workflow",
      findings,
    );
  }

  // 15. single-trigger-clarity
  {
    const triggers = nodes.filter((n) => categorize(n.type) === "trigger");
    const findings: Finding[] =
      triggers.length > 1
        ? [
            {
              ruleId: "single-trigger-clarity",
              severity: "info",
              title: `${triggers.length} trigger nodes in one workflow`,
              detail: `Multiple triggers: ${triggers.map((t) => t.name).join(", ")} — confirm that's intentional (e.g. webhook + manual test trigger), not leftover clutter.`,
              path: "nodes",
            },
          ]
        : [];
    add("single-trigger-clarity", "Trigger count is unambiguous", findings);
  }

  // 16. no-noop-placeholders
  {
    const findings: Finding[] = [];
    nodes.forEach((n, i) => {
      if (n.type === "n8n-nodes-base.noOp") {
        findings.push({
          ruleId: "no-noop-placeholders",
          severity: "info",
          title: `NoOp placeholder node — "${n.name}"`,
          detail:
            "A No-Operation node does nothing — fine as a scratch marker, worth removing before shipping.",
          path: `nodes[${i}]`,
        });
      }
    });
    add("no-noop-placeholders", "No leftover NoOp placeholder nodes", findings);
  }

  // 17. continue-on-fail-has-handler
  {
    const findings: Finding[] = [];
    nodes.forEach((n, i) => {
      if (n.continueOnFail) {
        const outs = workflow.connections[n.name]?.main || [];
        const branchCount = outs.filter((o) => (o?.length ?? 0) > 0).length;
        if (branchCount <= 1) {
          findings.push({
            ruleId: "continue-on-fail-has-handler",
            severity: "info",
            title: `continueOnFail with no visible error branch — "${n.name}"`,
            detail:
              "Errors are swallowed and the workflow just continues — confirm that's intentional, not a silent failure.",
            path: `nodes[${i}].continueOnFail`,
          });
        }
      }
    });
    add(
      "continue-on-fail-has-handler",
      "continueOnFail nodes have an obvious error path",
      findings,
    );
  }

  // 18. credentials-referenced-not-inline
  {
    const findings: Finding[] = [];
    nodes.forEach((n, i) => {
      const needsAuth =
        categorize(n.type) === "http" &&
        n.type !== "n8n-nodes-base.httpRequest";
      if (needsAuth && !n.credentials) {
        findings.push({
          ruleId: "credentials-referenced-not-inline",
          severity: "warning",
          title: `No credential reference — "${n.name}"`,
          detail:
            "This node type normally authenticates via a saved n8n credential, but none is attached — check it isn't relying on inline parameter values instead.",
          path: `nodes[${i}].credentials`,
        });
      }
    });
    add(
      "credentials-referenced-not-inline",
      "Auth-requiring nodes reference a saved credential",
      findings,
    );
  }

  // 19. workflow-named
  {
    const name = (workflow.name || "").trim();
    const findings: Finding[] =
      !name || /^my workflow\s*\d*$/i.test(name)
        ? [
            {
              ruleId: "workflow-named",
              severity: "info",
              title: "Workflow left at the default name",
              detail: `name: "${name || "(none)"}" — rename it so it's findable in a list of dozens of workflows.`,
              path: "name",
            },
          ]
        : [];
    add("workflow-named", "Workflow has a descriptive name", findings);
  }

  // 20. reasonable-node-count / structure sanity
  {
    const findings: Finding[] =
      nodes.length <= 1
        ? [
            {
              ruleId: "reasonable-node-count",
              severity: "info",
              title: "Workflow has only one node",
              detail:
                "Nothing to connect yet — not necessarily wrong, just flagging it as a stub.",
              path: "nodes",
            },
          ]
        : [];
    add(
      "reasonable-node-count",
      "Workflow has more than a single stub node",
      findings,
    );
  }

  void nodeIndex;
  return results;
}

/* ------------------------------------------------------------------ */
/* Sample workflow — real-shaped, ships with the tool                  */
/* ------------------------------------------------------------------ */

export const SAMPLE_WORKFLOW = {
  name: "My workflow",
  nodes: [
    {
      id: "1",
      name: "Webhook",
      type: "n8n-nodes-base.webhook",
      typeVersion: 1,
      position: [-40, 200],
      parameters: { path: "lead-intake", httpMethod: "POST" },
    },
    {
      id: "2",
      name: "HTTP Request1",
      type: "n8n-nodes-base.httpRequest",
      typeVersion: 3,
      position: [220, 200],
      parameters: {
        url: "https://api.example.com/v1/leads?apikey=sk-live-a1b2c3d4e5f6g7h8",
        method: "POST",
      },
    },
    {
      id: "3",
      name: "IF",
      type: "n8n-nodes-base.if",
      typeVersion: 1,
      position: [480, 200],
      parameters: {
        conditions: {
          boolean: [{ value1: "={{$json.success}}", value2: true }],
        },
      },
    },
    {
      id: "4",
      name: "Slack",
      type: "n8n-nodes-base.slack",
      typeVersion: 2,
      position: [740, 100],
      parameters: { channel: "#leads", text: "New lead captured" },
    },
    {
      id: "5",
      name: "Code",
      type: "n8n-nodes-base.code",
      typeVersion: 1,
      position: [740, 340],
      parameters: { jsCode: "" },
    },
    {
      id: "6",
      name: "Old Report Step",
      type: "n8n-nodes-base.noOp",
      typeVersion: 1,
      position: [1000, 500],
      parameters: {},
    },
  ],
  connections: {
    Webhook: { main: [[{ node: "HTTP Request1", type: "main", index: 0 }]] },
    "HTTP Request1": { main: [[{ node: "IF", type: "main", index: 0 }]] },
    IF: {
      main: [
        [{ node: "Slack", type: "main", index: 0 }],
        [{ node: "Code", type: "main", index: 0 }],
      ],
    },
  },
  active: false,
  settings: {},
};
