// One-shot MCP stdio client: drives hostinger-api-mcp to deploy the JS app.
// Spawns the cached server, performs the MCP handshake, calls a single tool,
// prints the result as JSON, exits. Newline-delimited JSON-RPC over stdio.
import { spawn } from "node:child_process";

const SERVER = "C:/Users/info/AppData/Local/npm-cache/_npx/a7204b5813574340/node_modules/hostinger-api-mcp/src/servers/all.js";
const API_TOKEN = process.env.API_TOKEN;
const TOOL = process.argv[2];                       // e.g. hosting_deployJsApplication
const ARGS = JSON.parse(process.argv[3] || "{}");   // tool arguments as JSON

if (!API_TOKEN) { console.error("MISSING API_TOKEN env"); process.exit(2); }
if (!TOOL) { console.error("usage: node mcp-deploy.mjs <tool> '<jsonArgs>'"); process.exit(2); }

const child = spawn(process.execPath, [SERVER], {
  env: { ...process.env, API_TOKEN },
  stdio: ["pipe", "pipe", "pipe"],
});

let buf = "";
const pending = new Map();
let nextId = 1;

function send(method, params, isNotification = false) {
  const msg = { jsonrpc: "2.0", method, ...(params ? { params } : {}) };
  let id;
  if (!isNotification) { id = nextId++; msg.id = id; }
  child.stdin.write(JSON.stringify(msg) + "\n");
  return id;
}
function call(method, params) {
  return new Promise((resolve, reject) => {
    const id = send(method, params);
    pending.set(id, { resolve, reject });
  });
}

child.stdout.on("data", (d) => {
  buf += d.toString();
  let nl;
  while ((nl = buf.indexOf("\n")) >= 0) {
    const line = buf.slice(0, nl).trim();
    buf = buf.slice(nl + 1);
    if (!line) continue;
    let msg;
    try { msg = JSON.parse(line); } catch { continue; } // skip non-JSON log lines
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(JSON.stringify(msg.error)));
      else resolve(msg.result);
    }
  }
});
child.stderr.on("data", (d) => process.stderr.write(d)); // server logs → our stderr

(async () => {
  try {
    await call("initialize", {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "oneshot-deploy", version: "1.0.0" },
    });
    send("notifications/initialized", undefined, true);
    const result = await call("tools/call", { name: TOOL, arguments: ARGS });
    console.log("=== RESULT ===");
    console.log(JSON.stringify(result, null, 2));
    child.kill();
    process.exit(0);
  } catch (e) {
    console.error("=== ERROR ===");
    console.error(e.message);
    child.kill();
    process.exit(1);
  }
})();
