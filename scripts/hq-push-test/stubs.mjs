// In-memory stand-ins for every side-effecting module the lead routes import.
const st = (globalThis.__stub ??= { ghlConfirm: true });
export const upsertGhlContact = async () => ({ contactId: st.ghlConfirm ? "c1" : "dev-skip" });
export const handleGhlLead = async () => ({
  contactId: st.ghlConfirm ? "c1" : "dev-skip",
  opportunityId: "o1",
});
export const moveContactOpportunityToStage = async () => true;
export const getOrCreateContactByEmail = async () => "c1";
export const sendLeadFallbackEmail = async () => ({ ok: false });
export const postTriageShadow = () => {};
export const appendLeadToSink = async () => ({ written: false, durable: false });
export const pingLeadFirehose = async () => ({ sent: true });
export const sendCapiLead = async () => ({ sent: true });
export const TOOL_SLUGS = ["aeo-audit"];
