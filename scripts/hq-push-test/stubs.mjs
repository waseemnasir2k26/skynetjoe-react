// In-memory stand-ins for every side-effecting module the lead routes import.
const st = (globalThis.__stub ??= { ghlConfirm: true });
const rec = (k, v) => (st[k] ??= []).push(v);
export const upsertGhlContact = async (input, score, tags) => {
  rec("upserts", { input, tags });
  return { contactId: st.ghlConfirm ? "c1" : "dev-skip" };
};
export const addGhlNote = async (id, body) => {
  rec("notes", { id, body });
  return !st.noteFails;
};
export const addGhlTags = async () => {};
export const handleGhlLead = async (input) => (rec("leadsGhl", input), {
  contactId: st.ghlConfirm ? "c1" : "dev-skip",
  opportunityId: "o1",
});
export const moveContactOpportunityToStage = async () => true;
export const getOrCreateContactByEmail = async () => "c1";
export const sendLeadFallbackEmail = async () => ({ ok: false });
export const postTriageShadow = (p) => rec("triage", p);
export const appendLeadToSink = async (lead) => {
  rec("sinks", lead);
  return st.sinkOk ? { written: true, durable: true } : { written: false, durable: false };
};
export const pingLeadFirehose = async (p) => {
  rec("pings", p);
  return { sent: true };
};
export const sendCapiLead = async () => ({ sent: true });
export const TOOL_SLUGS = ["aeo-audit"];
