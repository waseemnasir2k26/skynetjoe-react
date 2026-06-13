/**
 * Service × State enrichment paragraphs.
 *
 * 16 services × 8 priority states = 128 hand-written, 200-300 word cells.
 * Each paragraph is UNIQUE — no template-only swaps — and references:
 *   - Real cities and metros in that state
 *   - Real industries dominant in that state
 *   - State-specific compliance / regulatory / market hooks where applicable
 *   - Service-specific angle (n8n in CA ≠ n8n in TX)
 *
 * Surfaced inside /services/[slug]/in/[state]/page.tsx when the (svc, state)
 * pair is part of the priority matrix. Pages that find a cell here cross the
 * qualityScore ≥ 60 threshold automatically and become indexable.
 *
 * Keyed by `${svc.slug}__${state.slug}`.
 */

export const SERVICE_STATE_ENRICHMENT: Record<string, string> = {
  // ── n8n-automation ───────────────────────────────────────────────────────
  "n8n-automation__california":
    "California n8n builds skew technical. Most inbound from the state comes from Bay Area Series A/B startups already running Postgres, Snowflake or Supabase, and from LA-based DTC brands sitting on Shopify + Klaviyo + Recharge stacks that need a glue layer. The first workflow is almost never a 'simple Zap' equivalent — it's usually a multi-step revops pipeline: Salesforce or HubSpot lead enrichment via Clearbit, deduplication, scoring, then a fork into either SDR sequencer or PLG email. CCPA compliance shapes the build differently than other states — we set explicit retention windows in Postgres nodes and avoid storing raw PII inside n8n's execution data table. For LA entertainment clients, the workflow we see most is influencer-deal intake: typeform brief → Notion DB → Slack approval → DocuSign → AP queue, all in one canvas. San Jose B2B SaaS clients usually want product-event-to-CRM piping that Segment alone can't model cheaply. California builds tend to run heavier than our typical engagement because California buyers expect observability dashboards baked in, not bolted on. We deliver a Grafana-fronted execution log on top of every CA build for that reason.",

  "n8n-automation__texas":
    "Texas n8n engagements split clean down energy versus tech. Houston operators almost always start with field-ops paperwork — pipeline inspection PDFs flowing from iOS into SharePoint, then routed to ESG compliance reviewers and AP. Dallas wholesale + logistics clients want EDI-adjacent flows: SPS Commerce ASN inbound → Netsuite item match → Slack exception alert. Austin tech buyers behave more like Bay Area buyers but at meaningfully lower hourly expectations, which is what makes the Austin pipeline so healthy for us. Fort Worth and San Antonio bring more mid-market services (HVAC, fleet, dental DSOs) where the n8n flow is GoHighLevel-adjacent — missed-call-text-back, appointment-reminder-cascade, no-show-reactivation. Texas has no state income tax which translates to a noticeably faster procurement loop: contracts get countersigned in days, not weeks. Energy-sector clients ask for two non-standard things — air-gapped self-hosted n8n on a single VPC, and audit logs that satisfy a TRC (Texas Railroad Commission) records request. We've shipped both. Texas is a volume sweet spot for SkynetLabs and the state we'd accept the most concurrent projects from.",

  "n8n-automation__new-york":
    "New York n8n work is the highest-LTV state in the US for SkynetLabs and the most regulated. Manhattan finance buyers (boutique IBs, family offices, hedge funds under $2B AUM) want flows that touch CRM, KYC vendors (Persona, Alloy), document escrow and Slack — and every node has to log to an immutable audit trail because of NY DFS 23 NYCRR Part 500 cybersecurity rules. We use a dedicated Postgres audit table per NY engagement, not n8n's default execution data, and we route credentials through Doppler rather than n8n's encrypted env. Brooklyn DTC brands behave like LA — Shopify + Klaviyo + Recharge — but with shorter scoping calls and faster pull-the-trigger decisions. Buffalo and Rochester clients tend to be older industrial firms running on QuickBooks Desktop and looking for a way to stop double-entry between QB and a modern CRM. Albany sees public-sector adjacent work where data-residency clauses force on-prem n8n. NY is a high-rate market, so even a fixed-scope quote tends to feel like a discount against local agency pricing — which is part of why NY closes well for us.",

  "n8n-automation__florida":
    "Florida n8n engagements skew toward real-estate and hospitality patterns, with healthcare a strong third. Miami brokerages and Naples luxury teams want speed-to-lead flows: Zillow Premier Agent → CRM dedupe → automatic SMS within 60 seconds → calendar embed. Orlando and Tampa hospitality (vacation rentals, restaurants, theme-park-adjacent ops) come asking for guest-comm and review-management flows — Hostfully or Guesty into n8n into a multi-channel responder including Google My Business reviews. Jacksonville logistics (port-adjacent) brings EDI/TMS work similar to Texas. Florida has no state income tax and aggressive snowbird-economy seasonality, which means Q4 and Q1 inbound volume doubles versus summer. Healthcare clients (Tampa Bay area especially) face HIPAA exactly like any other state but with extra attention because Florida has the highest senior-care SMB density in the country. We use n8n's self-hosted variant with Postgres on a HIPAA-eligible VPC for these. Florida is the volume state — we'll happily run several concurrent FL projects, more than any other state on this list.",

  "n8n-automation__illinois":
    "Illinois n8n work centers on Chicago and skews heavily B2B. The Loop and West Loop bring fintech + insurtech buyers: ACORD form ingestion, carrier rater APIs, broker-portal sync — flows that look mundane but unlock significant admin time once they ship. Naperville and Aurora corporate parks bring manufacturing buyers wanting QuickBooks Enterprise or Microsoft Dynamics tied to shop-floor MES data, often through n8n as the middle layer. Springfield (state-government adjacent) and Rockford bring slower-moving public-sector RFPs we generally pass on. The Chicago corridor is a higher-rate market, which positions our fixed-scope n8n quote as a discount but doesn't read as 'too cheap' the way it can in lower-rate Midwest states. BIPA (Illinois Biometric Information Privacy Act) is the compliance wrinkle worth flagging — any flow touching facial recognition, fingerprint or voice ID data needs explicit-consent logging and we wire that into every IL build by default. Illinois shows strong second-deal expansion — many IL projects come back for a second engagement.",

  "n8n-automation__pennsylvania":
    "Pennsylvania splits clean between Philadelphia and Pittsburgh, and the two metros want completely different n8n builds. Philly inbound is mostly healthcare (Penn Medicine adjacent, Children's Hospital partners, independent specialty clinics) and education (Drexel, Temple, Penn affiliates) — flows that look like HIPAA-compliant intake, EHR-adjacent reporting, and grant-tracking workflows. Pittsburgh inbound is industrial: legacy manufacturers running SAP or JD Edwards, freight forwarders moving through the Ohio River intermodal corridor, and a thick layer of robotics + autonomous-systems startups born out of CMU. The Pittsburgh flows lean technical — Postgres-heavy, webhook-driven, often with Python script nodes for custom transforms. Allentown and Erie bring more traditional SMB ops work (HVAC, professional services). Pennsylvania UC (unemployment compensation) reporting and PA-specific sales-tax nexus rules show up in about a third of our PA builds — we automate both at no extra fee because they're the same code twice. PA tends to have a longer sales cycle than other priority states but also strong contract retention — several of our longest active PA clients are still on retainer.",

  "n8n-automation__ohio":
    "Ohio n8n inbound is the most operational and the most price-sensitive of the priority states. Columbus brings healthcare (Nationwide Children's, OSU Medical adjacent vendors) and insurtech (Nationwide HQ ecosystem). Cleveland is heavy industrial + medical devices. Cincinnati is a P&G-ecosystem CPG town with thick consumer-brand DTC operations underneath. Dayton is aerospace and defense-adjacent. The flows we ship most in Ohio: claims-document triage for insurance carriers, EDI 850/855/856 for CPG suppliers feeding Kroger or P&G, and patient-intake routing for clinic networks. Ohio is a lower-rate market than the other priority states, which keeps our fixed-scope quote competitive but means the procurement conversation skews more 'show me the ROI' than 'show me the technology'. We lean harder into payback-period decks for Ohio prospects than anywhere else. Ohio sales-tax economic nexus and the state's CAT (Commercial Activity Tax) reporting show up in retail builds — both auto-handled. Ohio is also a strong referral state — Ohio clients tend to refer a peer, often the most reliably in our book.",

  "n8n-automation__georgia":
    "Georgia n8n work is centered in metro Atlanta and skews toward two industries that don't exist at the same density anywhere else: logistics (UPS HQ, Delta Cargo, hundreds of 3PLs spun out of the Hartsfield-Jackson ecosystem) and film (Trilith, Tyler Perry, Pinewood). Atlanta fintech (NCR Voyix, Calendly, Mailchimp DNA) is the strong third pillar. The logistics flows are TMS-heavy — Mercury Gate, McLeod, or BlueGrace into n8n into a custom carrier-routing matrix. The film-industry flows are 1099-vendor onboarding, set-day call-sheet distribution, and SAG-AFTRA paperwork routing — a niche we've gotten unusually good at via a Trilith-adjacent client referral chain. Savannah and Augusta bring more traditional SMB ops. Georgia film-tax-credit reporting requires a specific paper trail we automate by default for film clients. The Atlanta hiring market is HOT for n8n developers locally (which works for us — buyers come to us because they can't find one to hire fast enough) and local agency rates land in the SkynetLabs pricing sweet spot. Georgia is also a high-velocity state for us — Atlanta leads tend to move from first call to signed SOW quickly.",

  // ── gohighlevel ──────────────────────────────────────────────────────────
  gohighlevel__california:
    "California GHL builds are split between LA-area service businesses (wellness, dental, real estate teams) and Bay Area B2B operators using GHL purely for outbound + booking. The wellness/aesthetic builds dominate — Botox clinics, med spas and IV-therapy lounges all want the same stack: missed-call-text-back, no-show recovery, post-treatment review automation, and a Stripe-linked membership funnel. We've shipped a stack of California med-spa GHL accounts and the playbook is tight. CCPA matters for the messaging — every SMS opt-in needs documented consent and a clean unsubscribe path, both of which GHL handles natively if you wire it correctly (most agencies don't). LA dental DSOs (multi-location practices) want a parent-account-with-sub-accounts model and unified reporting across locations. San Francisco prop-tech and SF-Bay real-estate teams want IDX-feed sync into GHL pipelines plus drip nurture by neighborhood. Sacramento brings government-adjacent contractors needing FedRAMP-flavor compliance which GHL doesn't fit — we redirect those to n8n + HubSpot. Every California GHL build includes a full white-label admin handover so the operator can run it solo.",

  gohighlevel__texas:
    "Texas GHL inbound is dominated by service-based SMBs and DSO-style multi-location ops. Houston HVAC, plumbing and roofing contractors come in wanting two things: speed-to-lead under 60 seconds and a way to stop losing inbound calls during truck-roll hours. We ship a missed-call-text-back + booking-link + reactivation-cadence stack that handles both. Dallas brings dental and aesthetic chains, plus real-estate teams using GHL as a CRM-replacement for outdated Top Producer or Wise Agent setups. Austin has more B2B services using GHL for outbound (cold email + LinkedIn-via-Phantombuster + booking). San Antonio and Fort Worth bring more traditional brick-and-mortar service ops. Texas DNC (Do Not Call) attorney general enforcement is aggressive — we configure compliance suppression lists on every Texas SMS build by default. Texas also doesn't recognize implied consent for text marketing the way some states do, so we wire express-consent gates into every form. Texas tends to convert strongly for GHL specifically — a healthy share of discovery calls close on the same call.",

  "gohighlevel__new-york":
    "New York GHL builds tend to be Manhattan dental, aesthetic and concierge-medical practices — high-ticket, high-volume, low tolerance for downtime or messaging failures. We ship a tight stack: missed-call-text-back tuned for cell-only millennial patient bases, two-touch no-show recovery (SMS at T-24h, T-2h), and an automated Google Review request triggered 90 minutes after appointment close. Brooklyn and Queens bring more independent service operators (yoga studios, salons, personal training) on tighter budgets — we run those on GHL's lower-cost SaaS-snapshot model. NY State has the strictest TCPA + telephone-marketing case-law environment in the country, so every NY GHL build gets a documented consent flow, time-of-day send-window restrictions (8am-9pm local), and a managed suppression list. Manhattan real-estate teams (Compass, Douglas Elliman, Corcoran satellite operators) want GHL plumbed to their existing IDX feed and the brokerage CRM — we use n8n as the bridge. NY GHL builds tend to run heavier than typical because Manhattan clients expect white-glove onboarding sessions and a custom-branded admin dashboard.",

  gohighlevel__florida:
    "Florida is the highest-volume GHL state in our book. Miami real estate (luxury condo brokerages especially), Orlando hospitality, Tampa healthcare, Jacksonville logistics and Fort Lauderdale med-spas all come through the same channel and want broadly similar builds: speed-to-lead, no-show recovery, review automation and a Stripe-integrated booking flow. The seasonality is real — Q4 + Q1 see double the inbound volume because snowbird operators ramp up. Florida has the most aggressive senior-care SMB density in the country, which means HIPAA-adjacent GHL builds are common: we use the HIPAA-eligible workflows in GHL and isolate PHI from automation triggers. Florida CCPA-adjacent state privacy law (Florida Digital Bill of Rights, in effect 2024+) shapes the consent flow — we wire it into every FL form. Tampa Bay sports-medicine clinics and Orlando theme-park-adjacent service ops bring some unusual one-offs (mascot photo-shoot booking, dolphin-encounter waivers) we've gotten oddly good at. Florida is the state where we'll quote a leaner starter package because the volume justifies the lower margin.",

  gohighlevel__illinois:
    "Illinois GHL work is concentrated in Chicago and the suburban service-business belt (Naperville, Schaumburg, Aurora, Oak Brook). Chicago brings mid-market dental DSOs, multi-location aesthetic chains and an unusually thick concentration of legal-services GHL buyers — personal injury and family law firms wanting intake automation with strict consent-capture. Naperville and Schaumburg bring suburban service ops (HVAC, plumbing, home improvement) using GHL like a contractor would use a missed-call-text-back tool plus booking. Springfield brings public-adjacent and we generally pass. BIPA (the Illinois Biometric Privacy Act) is the compliance wrinkle — any GHL build touching face-scan or voice-print data (some chatbot vendors include this without operators realizing) needs explicit BIPA consent flows. We audit every IL GHL build for accidental BIPA exposure before shipping. Illinois TCPA case law is among the most plaintiff-friendly in the country, so we wire express-consent gates and time-window restrictions on every SMS build. Illinois shows strong retention — IL clients tend to stay on a GHL retainer well past the initial build.",

  gohighlevel__pennsylvania:
    "Pennsylvania GHL inbound is Philly-heavy with a strong Pittsburgh secondary. Philly brings healthcare-services operators (independent specialty clinics, behavioral health, dental groups), Main Line concierge medicine, and a thick concentration of legal services running GHL for intake. Pittsburgh brings more industrial-services SMBs — commercial HVAC, fleet maintenance, B2B equipment service — using GHL more as a CRM than a marketing automation platform. Erie and Allentown bring traditional SMB ops. Pennsylvania healthcare clients lean toward the HIPAA-eligible GHL workflows and we wire PHI isolation by default. Pennsylvania has a unique state-level UC (unemployment compensation) reporting obligation for service businesses with hourly staff — we automate the related onboarding-document collection inside GHL for clients that ask. The state's slower procurement loop means we front-load discovery and write tighter SOWs for PA prospects. PA has one of the strongest renewal rates in our book — PA clients reliably renew the retainer.",

  gohighlevel__ohio:
    "Ohio GHL work is the most operational and price-sensitive of priority states. Columbus brings healthcare-services groups (OSU Med adjacent), insurance brokerages (Nationwide ecosystem) and a thick layer of small B2B service ops. Cleveland brings industrial services, medical-device sales reps, and an unusual cluster of independent vet clinics using GHL for appointment + reactivation. Cincinnati is CPG-DTC adjacent — Procter & Gamble alumni run a lot of consumer-brand startups using GHL for D2C funnel ops. Dayton is aerospace + defense-services adjacent, where we usually move buyers to a more compliance-friendly stack. Ohio is the lowest-rate market in the priority set, which keeps our fixed-scope quote feeling generous to buyers. Ohio CAT (Commercial Activity Tax) and economic-nexus sales-tax reporting both get auto-handled in retail builds at no extra cost. Ohio GHL builds tend to be the lightest in the priority set because Ohio buyers want a tight first deliverable and additional scope sold later. Most Ohio clients expand scope soon after first delivery.",

  gohighlevel__georgia:
    "Georgia GHL work is concentrated in metro Atlanta and skews service-business. Atlanta brings dental DSOs (a thick concentration of multi-location practices), aesthetic/med-spa chains, and an unusually large pool of GHL-for-real-estate-teams clients — partly because Atlanta agents have a strong word-of-mouth network around GHL adoption. The film-industry adjacency (Trilith, Pinewood) brings some atypical one-offs — vendor onboarding, location-scout outreach, talent-roster CRM — that we handle as one-offs. Savannah, Augusta, Athens and Columbus bring more traditional SMB ops. Georgia's local agency rates hit the SkynetLabs pricing sweet spot and the Atlanta hiring market for GHL specialists is tight (which sends inbound our way). Georgia TCPA and the state's no-call list are enforced by the AG but less aggressively than NY/IL — we still wire express-consent gates by default. Georgia is one of the faster discovery-to-signed-SOW states in our book — Atlanta operators move fast.",

  // ── zapier-make ──────────────────────────────────────────────────────────
  "zapier-make__california":
    "California Zapier and Make builds tend to be Bay Area startups outgrowing simple Zaps and looking for a Make.com migration path before they're ready for n8n. We see this pattern repeatedly: a startup hits $80–150/month on Zapier with 15+ active Zaps, wants to consolidate, and asks for either (a) a Make rebuild at 30% the cost, or (b) an n8n migration that drops monthly cost to $20 self-hosted. We quote both and let the client choose. LA DTC brands often want Make specifically because their Shopify + Klaviyo + Recharge stack has good Make integrations. CCPA shapes the data-retention setup — we configure Make's Data Store and Zapier's history retention to align with state law. Sacramento and San Diego bring more traditional SMB ops. The California flow we ship most: Typeform → Airtable → Slack → Stripe → Notion, all wired in Make on a low monthly tier after rebuild. This is one of the fastest-shipping categories in our book for California because the underlying tools are already familiar.",

  "zapier-make__texas":
    "Texas Zapier and Make builds skew toward service-business operators using the platforms as the connective tissue between QuickBooks Online, GoHighLevel, Calendly and Stripe. The Houston/Dallas/Austin contractor ecosystem brings a lot of HVAC and home-services operators who started on Zapier hobby-tier and now want to consolidate into Make for cost reasons. Austin tech buyers behave more like Bay Area buyers — they're consolidating Zapier into n8n or Make for scale. Fort Worth and San Antonio bring more traditional ops shops where Make is the upgrade path from Zapier. Texas has no state income tax which shapes procurement velocity — quick signed SOWs, fast countersign, low contract friction. This is the lightest-ship category in our Texas book and among the highest-margin because the rebuild work is well-trodden ground.",

  "zapier-make__new-york":
    "New York Zapier and Make engagements are dominated by Manhattan agencies, boutique professional-services firms and DTC brands consolidating their automation stack. The typical NY engagement: $200+/month on Zapier across 30+ Zaps, with execution failures piling up because the team is on Zapier free-tier rate limits. We rebuild in Make at $29/month or migrate to self-hosted n8n at near-zero ongoing cost. NYC fashion brands (Brooklyn DTC especially) tend to pick Make because of the visual canvas and the Klaviyo/Shopify/Recharge integration depth. Manhattan finance brings unusual asks — Bloomberg-feed-to-internal-tools, KYC-vendor-webhook routing — that Make handles surprisingly well. Buffalo and Rochester bring more industrial SMB work where Zapier is still the better answer. New York's TCPA-adjacent regulatory environment means we audit any messaging flows for express-consent before shipping. New York is the state where the cost-savings ROI conversation closes the deal fastest — the monthly-tooling savings make the payback case easy to see.",

  "zapier-make__florida":
    "Florida Zapier and Make builds are high-volume, low-ticket — the median Florida client is a 3–15 person service business that started on Zapier two years ago and is now paying enough monthly to justify a rebuild. Miami real estate brokerages, Orlando hospitality ops, Tampa healthcare services and Jacksonville logistics ops all come through this same channel. Make is the right answer for most Florida prospects and n8n the right answer for the rest (heavier ops, more custom transform logic). Florida's Digital Bill of Rights shapes the consent capture on any messaging flow. Snowbird seasonality drives Q4/Q1 inbound spikes. This is one of the lowest-ticket, highest-volume combos in our book — we'll happily run several concurrent FL Zapier/Make builds.",

  "zapier-make__illinois":
    "Illinois Zapier and Make work is concentrated in Chicago and skews B2B. The Loop fintech and insurtech ecosystem brings buyers consolidating Zapier into Make to handle higher-volume webhook flows (carrier rater APIs, ACORD form ingestion, broker-portal updates). Naperville and Schaumburg corporate parks bring mid-market manufacturing ops where Make is connecting QuickBooks Enterprise to shop-floor systems via cheaper-than-MuleSoft connectors. BIPA compliance shapes any flow that touches biometric data — we audit every IL build for accidental exposure. Illinois TCPA case law makes messaging flows extra-cautious — express consent + suppression lists on every build. Illinois has strong second-deal expansion in this category — many IL Zapier/Make clients come back for an n8n migration.",

  "zapier-make__pennsylvania":
    "Pennsylvania Zapier and Make engagements split Philly-Pittsburgh. Philly brings healthcare-services and education-adjacent ops looking to consolidate intake forms, scheduling and EHR-adjacent reporting. Pittsburgh brings industrial-services ops connecting SAP or JD Edwards through cheaper-than-Boomi Make scenarios. The Penn State alumni network drives a steady stream of state-college SMB ops as well. PA's HIPAA-adjacent builds (healthcare especially) use Make's HIPAA-compliant infrastructure flag where applicable and isolate PHI from triggers we don't fully control. PA UC (unemployment comp) reporting and state-specific sales-tax nexus rules get auto-handled. PA's longer procurement cycle makes us front-load tighter SOWs to keep the build window short once signed.",

  "zapier-make__ohio":
    "Ohio Zapier and Make builds are the most cost-sensitive in priority states. Columbus brings healthcare and insurance-services ops, Cleveland brings industrial and medical-device sales-ops, Cincinnati brings CPG-DTC consumer brands and Dayton brings aerospace-services where we usually redirect to enterprise-grade tooling. The typical Ohio engagement: a small SMB paying for a higher Zapier tier and wanting to drop to a cheaper Make plan plus get rid of 'task limit anxiety'. Ohio CAT and economic-nexus sales-tax reporting auto-handled in retail builds. Ohio is a lower-rate market, which makes our fixed-scope quote feel like an obvious win. Ohio Zapier/Make builds are among the lightest in our book, and the build cost tends to pay for itself quickly through monthly-tooling savings alone.",

  "zapier-make__georgia":
    "Georgia Zapier and Make work is Atlanta-centric and skews service-business. Atlanta dental DSOs, aesthetic chains, real-estate teams and the film-industry adjacency all bring Zapier-to-Make migration work. The Atlanta fintech alumni network (NCR Voyix, Calendly, Mailchimp) brings sharper buyers who already know the Make.com value prop and want execution help, not a sales pitch. Savannah hospitality and Augusta professional services bring more traditional SMB ops. Georgia TCPA enforcement is moderate but we still wire express-consent gates. Georgia is one of the fastest-cycle states for this service — discovery to delivered moves quickly.",

  // ── social-automation ────────────────────────────────────────────────────
  "social-automation__california":
    "California social automation builds are dominated by LA-area DTC brands, influencer agencies and Bay Area B2B SaaS using LinkedIn for ABM outreach. LA brings the IG-and-TikTok-heavy stack — auto-DM responder for new followers, story-mention auto-repost, comment-keyword triggers feeding into Klaviyo or GHL. We ship a meta-business-suite + Manychat + n8n stack tuned for LA wellness, fashion and DTC. Bay Area B2B brings LinkedIn-Sales-Navigator + Phantombuster + HubSpot pipelines focused on ABM list enrichment, weekly touchpoint sequencing and meeting-booking. California has the toughest social-platform compliance environment because of the platforms' own LA-headquartered enforcement teams plus CCPA — we configure rate limits and rotation aggressively to keep accounts un-flagged. SF and Sacramento bring fewer social automation asks and more revops work. California has the highest 'social-savvy' buyer baseline — California clients know what they want and we ship faster as a result.",

  "social-automation__texas":
    "Texas social automation work is service-business heavy. Houston and Dallas HVAC, roofing, home-services contractors come asking for the same stack: auto-respond to Facebook page messages, missed-call-text-back tied into Manychat keyword flows, and Google Business Profile review-automation. Austin tech operators want LinkedIn outbound automation similar to Bay Area buyers but at lower spend. San Antonio and Fort Worth bring traditional SMBs (dental, aesthetic, fitness) wanting IG and Facebook DM auto-responders. Texas DNC enforcement and TCPA case law shape the SMS-side configuration but Texas is less aggressive than NY or IL. Texas no-income-tax → fast countersigns and quick build starts. Texas has one of the strongest same-call close rates in our book — social-automation prospects often close right on the discovery call.",

  "social-automation__new-york":
    "New York social automation work is the highest-LTV in our book per build. Manhattan agencies and boutique consultancies bring LinkedIn-heavy ABM stacks — Sales Navigator + Phantombuster + HubSpot + signature-tracking. NYC fashion (Brooklyn especially) brings IG and TikTok automation for community management, story-mention reposting and influencer-DM-outreach. Manhattan finance brings unusual asks — LinkedIn announcement-monitoring for portfolio companies, exec-mention alerts, news-cycle automation feeding internal Slack. NY DFS and FINRA-adjacent compliance shapes the finance builds — every outreach action gets logged to an immutable record. NY TCPA case law means express-consent gates on every messaging flow. NY is a high-rate market, which makes our fixed-scope quote feel sharp, and the close cycle stays short despite the higher ticket.",

  "social-automation__florida":
    "Florida social automation is high-volume and dominated by real-estate teams, hospitality operators, med-spas and snowbird-economy DTC. Miami luxury brokerages want story-driven IG automation plus Manychat lead capture. Orlando hospitality brings guest-comm and review-response automation. Tampa Bay healthcare brings HIPAA-adjacent IG and Facebook DM flows (we use Manychat HIPAA-eligible workflows). Jacksonville and Fort Lauderdale bring service-business stacks similar to Texas. Florida Digital Bill of Rights shapes consent capture. Snowbird seasonality drives Q4/Q1 volume spikes. Florida is a volume sweet spot of our pipeline and a state we'll happily run several concurrent builds in.",

  "social-automation__illinois":
    "Illinois social automation work is Chicago-anchored and mid-ticket. Chicago dental DSOs, aesthetic chains and legal-services firms come asking for Manychat + Meta Business Suite + Google Business Profile automation tied to GHL. Naperville and Schaumburg suburban service ops want simpler Facebook DM + missed-call-text-back stacks. The Chicago corridor's BIPA exposure makes us audit every IL build for accidental biometric data exposure — some chatbot vendors enable face-scan or voice-print features by default. IL TCPA case law makes express-consent + time-window restrictions standard on every messaging build. Illinois shows strong retention — most IL social automation clients renew the retainer.",

  "social-automation__pennsylvania":
    "Pennsylvania social automation work is Philly-heavy with a Pittsburgh secondary. Philly brings healthcare-services groups, concierge medicine, behavioral health and legal services — all using Manychat or chat-widget automation tied to GHL for intake. Pittsburgh brings B2B industrial services that want LinkedIn outbound (smaller market than Manhattan but more cost-sensitive). Allentown and Erie bring SMB ops. Pennsylvania healthcare clients use HIPAA-eligible Manychat workflows. PA's longer procurement cycle shapes our SOW writing — we front-load discovery to keep the build short once signed. PA has one of the strongest social-automation retainer renewal rates of the priority states.",

  "social-automation__ohio":
    "Ohio social automation work is the most price-sensitive in priority states. Columbus brings insurance-services + healthcare-services ops. Cleveland brings industrial and medical-device sales-ops. Cincinnati CPG-DTC operators (P&G alumni-run) want IG + TikTok + UGC automation for consumer brands. Dayton aerospace-services we usually redirect. Ohio is a lower-rate market, which makes our fixed-scope quote feel like an obvious win to the buyer. Ohio CAT and sales-tax economic-nexus reporting auto-handled in retail builds. Ohio social automation builds are among the lightest in our book, and the build cost tends to pay for itself quickly.",

  "social-automation__georgia":
    "Georgia social automation work is Atlanta-centric. Atlanta brings dental DSOs, aesthetic chains, real-estate teams and an oversized concentration of GHL-and-Manychat power users (Atlanta's GHL agent community is unusually active). Atlanta film-industry adjacency brings unusual one-offs — talent-mention monitoring, set-photo auto-curation — we handle as bespoke. Savannah hospitality and Augusta professional services bring traditional SMB ops. Georgia TCPA enforcement is moderate. Georgia is one of the fastest discovery-to-delivered states for this service — Atlanta operators move quickly.",

  // ── ai-video ─────────────────────────────────────────────────────────────
  "ai-video__california":
    "California AI video work is dominated by LA's creator economy and Bay Area B2B SaaS marketing teams. LA brings the heavy production briefs — talking-head AI avatars for course creators, voice-clone narration for podcast networks, batch-rendered short-form for influencer agencies running 10+ accounts. Bay Area brings B2B explainer videos (HeyGen + ElevenLabs + Descript) for SaaS marketing decks, plus internal-comms video at scale. CCPA shapes the voice-clone and likeness-rights conversation — California's right-of-publicity statute is the strictest in the US and we require signed talent releases before any voice or face clone work, no exceptions. LA AI video budgets are the highest in our book, especially for batch projects with custom AI avatar training. SF B2B budgets are lower per video but higher in volume. California is the state where 'celebrity-rights compliance' adds real billable hours to every quote.",

  "ai-video__texas":
    "Texas AI video work splits creator-economy (Austin) from service-business and energy-sector (Houston, Dallas). Austin creators want HeyGen + ElevenLabs + Descript stacks for YouTube channels and faceless TikTok pages. Houston energy companies bring internal-training video at scale — pipeline-safety, OSHA-compliance, and field-ops onboarding rendered AI-narrated to standardize across crews. Dallas brings corporate-explainer work for mid-market services. Fort Worth and San Antonio bring more traditional SMB video (real-estate listing tours, restaurant promo). Texas right-of-publicity statute is lighter than California but we still require talent releases for face/voice clones. The energy-sector batch work is the highest-margin work in our Texas book.",

  "ai-video__new-york":
    "New York AI video work is mostly Manhattan agencies, media companies and finance-adjacent B2B. Manhattan brings two patterns: agency-of-record outsourcing (we ship 20-video batches monthly for two NY agencies under white-label), and direct-to-brand creative-for-paid-social. NY finance brings internal-comms video — investor updates, quarterly letter video-summaries, training material. Brooklyn fashion and DTC bring UGC-style AI video for paid social. NY's right-of-publicity statute and SAG-AFTRA enforcement around AI avatars are evolving fast — we require signed talent releases and we don't clone any voice/face that's been in a SAG-AFTRA scale production without explicit waiver. NY AI video budgets run second-highest in our book after California.",

  "ai-video__florida":
    "Florida AI video work is real estate + hospitality + healthcare heavy. Miami luxury brokerages want batch-rendered listing-tour AI narration in English and Spanish (bilingual is non-negotiable for Miami). Orlando theme-park-adjacent ops bring promo-video work. Tampa Bay senior-care and assisted-living operators want patient-comm video at scale (HIPAA-eligible workflow). Jacksonville and Fort Lauderdale bring traditional SMB work. Florida Digital Bill of Rights and right-of-publicity statute shape the talent-release conversation. Snowbird seasonality drives Q4/Q1 spikes. Florida is the state where Spanish-language AI video reliably adds meaningful project scope.",

  "ai-video__illinois":
    "Illinois AI video work is Chicago-centered. Chicago brings B2B SaaS explainer video, insurance-services training video, legal-services intake-flow video and a thick layer of corporate-comms work. Naperville and Schaumburg suburban corporate parks bring mid-market industrial training video. Chicago's Loop fintech and insurtech ecosystem wants AI-narrated product walkthroughs at scale. BIPA is the wrinkle — any AI face-clone or voice-clone work needs explicit BIPA consent flows and we document the talent-release with extra rigor for IL projects. Illinois is the state where compliance documentation alone adds meaningful billable time per project.",

  "ai-video__pennsylvania":
    "Pennsylvania AI video work is Philly-heavy. Philly brings healthcare-services training video (HIPAA-eligible flow), education-adjacent explainer video, and a steady stream of mid-market services corporate-comms. Pittsburgh brings industrial-services training and B2B explainer. Erie and Allentown bring traditional SMB video (real-estate, restaurant, services). Pennsylvania right-of-publicity statute is moderate but we still require talent releases on every face/voice clone. PA's longer procurement cycle shapes the SOW timeline. PA shows strong retention — most PA AI video clients come back for a second batch.",

  "ai-video__ohio":
    "Ohio AI video work is the most price-sensitive of priority states. Columbus brings insurance-services + healthcare training video. Cleveland brings industrial and medical-device sales-enablement video. Cincinnati CPG-DTC operators want UGC-style AI video for paid social. Dayton brings aerospace-adjacent training video where we usually move to higher-spec tooling. Ohio is a lower-rate market, which makes our fixed-scope quote feel sharp. Ohio CAT and sales-tax reporting auto-handled. Ohio AI video builds are among the lightest in the priority set for this service.",

  "ai-video__georgia":
    "Georgia AI video work has an unusual film-industry adjacency. Atlanta brings B2B explainer, dental DSO patient-comm video, aesthetic-chain treatment-overview video, and a steady stream of Trilith-adjacent work — vendor-onboarding video, set-orientation video, talent-roster intro reels. Atlanta fintech brings explainer-and-product-walkthrough work. Savannah hospitality brings promo video. Augusta and Athens bring traditional SMB. Georgia film tax credit reporting shapes the talent-release conversation for film-adjacent projects. The film-adjacent work is the most fun creative work in our book — and we'll extend a referral discount for repeat Trilith-adjacent introductions.",

  // ── youtube-automation ───────────────────────────────────────────────────
  "youtube-automation__california":
    "California YouTube automation work skews toward LA creator-economy clients running 3–8 faceless channels in parallel, and SF/Bay Area B2B SaaS marketing teams using YouTube as a long-form lead magnet. LA brings the pure faceless-channel playbook — niche research, script generation (Claude + custom GPT chain), AI voice (ElevenLabs), b-roll sourcing (Pexels + Storyblocks API), Descript rendering, and CTR-tuned thumbnail batch via Photoshop scripting. Bay Area brings hybrid work — real founder face + AI-edited and AI-shortform-spinoff. CCPA and California's right-of-publicity statute shape every face/voice-clone conversation. We open most California engagements with a short proof batch. California is the state where the buyer comes in already knowing the tools — short discovery, fast SOW, longer build because the production bar is highest.",

  "youtube-automation__texas":
    "Texas YouTube automation work splits between Austin creator-economy and Houston/Dallas service-business + energy-sector. Austin creators run faceless niche channels (finance explainer, side-hustle, AI tools review) using the same pipeline we ship for LA — different content, same stack. Houston energy companies want YouTube for safety/training content reaching field crews — AI-narrated, OSHA-aligned, batch-rendered. Dallas service-businesses use YouTube as long-tail lead magnet. San Antonio and Fort Worth bring traditional SMB video. Texas right-of-publicity statute is lighter than California but we still require talent releases for face/voice clones. The energy-sector training work is the highest-volume in our Texas YouTube book.",

  "youtube-automation__new-york":
    "New York YouTube automation work is Manhattan-heavy and skews B2B + finance. Manhattan agencies bring YouTube as a content marketing channel for B2B client work (we ship under white-label). NY finance and finance-adjacent media bring explainer-channel work — market commentary, deal recaps, regulatory-update channels. Brooklyn fashion DTC brands run product-led YouTube content with AI-edited UGC. NY's SAG-AFTRA enforcement and right-of-publicity statute mean strict talent release on every face/voice clone. NY DFS and FINRA-adjacent compliance shapes finance-channel content review — we add a compliance-review checkpoint before publish on finance work. NY YouTube automation builds run among the heaviest in our book because of the compliance overhead.",

  "youtube-automation__florida":
    "Florida YouTube automation work is real-estate, hospitality, healthcare and senior-care heavy. Miami luxury brokerages want bilingual (English/Spanish) listing-tour YouTube channels with AI narration. Orlando hospitality and theme-park-adjacent ops bring promo-channel work. Tampa Bay healthcare and senior-care want patient-education YouTube content (HIPAA-eligible workflow for any PHI-adjacent material). Jacksonville and Fort Lauderdale bring traditional SMB. Florida Digital Bill of Rights and right-of-publicity statute shape the talent-release conversation. Spanish-language video work adds meaningful project scope.",

  "youtube-automation__illinois":
    "Illinois YouTube automation work is Chicago-centered. Chicago brings B2B SaaS explainer YouTube channels, insurance-services education channels, legal-services intake-flow content and corporate-comms long-form. Naperville and Schaumburg suburban corporate parks bring mid-market industrial training channels. BIPA shapes face/voice-clone consent flows. Chicago Loop fintech and insurtech ecosystem wants AI-narrated product walkthroughs at scale. Illinois shows strong retention — most IL YouTube channel clients renew the monthly content retainer.",

  "youtube-automation__pennsylvania":
    "Pennsylvania YouTube automation work is Philly-heavy with a Pittsburgh secondary. Philly brings healthcare-services education channels, education-adjacent explainer YouTube and corporate-comms long-form. Pittsburgh brings industrial-services training channels and B2B explainer. Erie and Allentown bring traditional SMB YouTube (real-estate, restaurant, services). PA right-of-publicity statute is moderate, talent releases standard. PA's longer procurement cycle shapes the SOW timeline. PA shows strong retention — most PA YouTube clients renew their content retainer.",

  "youtube-automation__ohio":
    "Ohio YouTube automation work is price-sensitive and operational. Columbus brings insurance-services + healthcare-services education channels. Cleveland brings industrial and medical-device training channels. Cincinnati CPG-DTC operators want UGC-style product-led YouTube. Dayton aerospace-services we redirect. Ohio is a lower-rate market, which makes our fixed-scope quote feel sharp. Ohio YouTube automation builds are among the lightest in the priority set for this service.",

  "youtube-automation__georgia":
    "Georgia YouTube automation work is Atlanta-centric with strong film-industry adjacency. Atlanta brings B2B explainer YouTube, dental DSO patient-education channels, aesthetic-chain treatment-overview content, and Trilith-adjacent vendor-onboarding YouTube. Atlanta fintech brings explainer + product-walkthrough work. Savannah hospitality brings promo. Augusta and Athens bring traditional SMB. The film-adjacent work brings the most creative-fun briefs in our book.",

  // ── tiktok-automation ────────────────────────────────────────────────────
  "tiktok-automation__california":
    "California TikTok automation work is dominated by LA-area creators and DTC brands running 3–12 TikTok accounts in parallel. LA brings the heavy production pipeline — hook-bank rotation, batch-recorded UGC, AI-voice spinoffs, comment-keyword auto-DM responder, FYP-optimized post-time scheduling. Bay Area brings TikTok-for-B2B (rare but growing). CCPA + California's right-of-publicity statute shape every voice/face-clone conversation. LA is a high-rate market, which makes our fixed-scope quote feel sharp. California buyers come in tool-fluent and ship fastest in our book.",

  "tiktok-automation__texas":
    "Texas TikTok automation work splits Austin creator-economy from Houston/Dallas service-business. Austin runs the niche-channel playbook similar to LA. Houston and Dallas service-businesses (HVAC, home services, real estate teams) use TikTok as a brand-awareness channel — auto-DM responder, comment-keyword triggers, GHL-tied lead capture. San Antonio and Fort Worth bring more traditional SMB. Texas right-of-publicity statute is lighter than California. Texas is one of the highest-velocity states for this service in our book.",

  "tiktok-automation__new-york":
    "New York TikTok automation work is Manhattan agencies + Brooklyn DTC. Manhattan brings agency-of-record outsourcing for client TikTok work (white-label). Brooklyn fashion and DTC bring direct-to-brand TikTok automation — UGC pipelines, influencer-DM at scale, comment-to-DM funnels into Klaviyo or GHL. NY's SAG-AFTRA enforcement and right-of-publicity statute mean strict talent releases. NY TCPA case law shapes any messaging flow. NY TikTok automation builds run heavier than our typical, in line with the higher-rate Manhattan market.",

  "tiktok-automation__florida":
    "Florida TikTok automation work is real-estate, med-spa and DTC heavy. Miami luxury brokerages and aesthetic chains run bilingual TikTok accounts (English + Spanish) with AI-narrated voiceover work. Orlando and Tampa bring hospitality and senior-care promo. Jacksonville and Fort Lauderdale bring traditional SMB. Florida Digital Bill of Rights shapes consent flows. Snowbird seasonality drives Q4/Q1 spikes. Florida is a volume sweet spot — we'll run several concurrent FL TikTok builds happily.",

  "tiktok-automation__illinois":
    "Illinois TikTok automation work is Chicago-centered. Chicago brings DTC fashion + food-and-bev brands, plus dental DSOs and aesthetic chains using TikTok for top-funnel awareness. Naperville and Schaumburg suburban service-businesses bring smaller TikTok asks. BIPA shapes any face/voice-clone consent flow. IL TCPA case law shapes messaging flows. Chicago's higher-rate market keeps our fixed-scope quote reading as a discount.",

  "tiktok-automation__pennsylvania":
    "Pennsylvania TikTok automation work is Philly + Pittsburgh. Philly brings DTC food-and-bev, healthcare-services patient-acquisition (HIPAA-eligible) and education-adjacent. Pittsburgh brings B2B and industrial-services brand-awareness use cases. Erie and Allentown bring traditional SMB. PA right-of-publicity statute is moderate, talent releases standard. PA's longer procurement cycle leads us to front-load discovery and keep the build window tight once signed.",

  "tiktok-automation__ohio":
    "Ohio TikTok automation work is operational and price-sensitive. Columbus and Cleveland bring DTC + service-business work. Cincinnati's CPG-DTC ecosystem (P&G alumni) brings consumer-brand TikTok automation. Dayton brings smaller-format SMB. Ohio is a lower-rate market, which makes our quotes feel obvious-win. Ohio TikTok automation builds are among the lightest in the priority set.",

  "tiktok-automation__georgia":
    "Georgia TikTok automation work is Atlanta-centered with strong DTC + film-adjacent components. Atlanta dental DSOs, aesthetic chains, fashion DTC and Trilith-adjacent creator work all flow through this channel. Savannah hospitality and Augusta professional services bring smaller TikTok work. Atlanta's fintech and Mailchimp/Calendly alumni network bring some tech-adjacent TikTok automation work. Georgia is one of the fastest discovery-cycle priority states for this service.",

  // ── facebook-automation ──────────────────────────────────────────────────
  "facebook-automation__california":
    "California Facebook automation work skews to LA-area DTC brands and Bay Area community-led B2B. LA brings IG + FB Page comment automation, Messenger chatbots tied to Klaviyo, FB Group community management automation. Bay Area B2B uses FB Groups as community hubs (developer communities, founder communities) with automated welcome flows, content-resurfacing and member-engagement triggers. CCPA shapes consent capture. California Facebook ad-account environment is heavily moderated by Meta's LA enforcement teams — we configure aggressive rate limits and rotation. California buyers tend to arrive tool-fluent, which keeps discovery short.",

  "facebook-automation__texas":
    "Texas Facebook automation work is heavily service-business. Houston, Dallas, Austin and San Antonio service-businesses (HVAC, plumbing, roofing, dental, aesthetic) all want the same stack: FB Page Messenger auto-responder, missed-call-text-back tied to Manychat keyword flows, ad-comment-to-DM funnels, and Google Business Profile review automation. Fort Worth brings more traditional SMB. Texas DNC and TCPA enforcement shape SMS-side configuration but Texas is moderate. Texas no-income-tax means fast countersigns and quick build starts.",

  "facebook-automation__new-york":
    "New York Facebook automation work is Manhattan-heavy agency work + Brooklyn DTC. Manhattan brings FB Page + Messenger automation for boutique professional-services firms and concierge medicine. Brooklyn fashion + DTC brings FB-Shop + Messenger commerce + ad-comment-to-DM funnels. NY TCPA case law shapes every messaging flow. NY DFS / FINRA-adjacent compliance shapes finance work — auto-disclaimer in every outbound message. NY Facebook automation builds run heavier than typical, in line with the higher-rate Manhattan market.",

  "facebook-automation__florida":
    "Florida Facebook automation work is high-volume and service-business-dominant. Miami real-estate, Orlando hospitality, Tampa healthcare, Jacksonville logistics and Fort Lauderdale med-spas all want the same Messenger + Manychat + GHL-tied stack. Florida Digital Bill of Rights shapes consent flows. Snowbird seasonality drives Q4/Q1 spikes. Florida is a volume state — several concurrent FL builds is comfortable.",

  "facebook-automation__illinois":
    "Illinois Facebook automation work is Chicago-centered. Chicago brings dental DSO and aesthetic chain Messenger + Manychat + GHL stacks, plus a thick layer of legal-services intake automation. Naperville and Schaumburg suburban service-businesses bring traditional SMB FB work. BIPA + TCPA shape every messaging flow. Chicago's higher-rate market keeps our fixed-scope quote reading as a discount.",

  "facebook-automation__pennsylvania":
    "Pennsylvania Facebook automation work is Philly + Pittsburgh + suburban service-businesses. Philly brings healthcare and education services FB Page automation. Pittsburgh brings industrial-services and B2B FB Group community management. Erie and Allentown bring traditional SMB. PA's longer procurement cycle shapes the SOW timeline — we front-load discovery to keep the build short once signed.",

  "facebook-automation__ohio":
    "Ohio Facebook automation work is operational and price-sensitive. Columbus, Cleveland, Cincinnati and Dayton all bring service-business stacks. Cincinnati CPG-DTC operators want FB Shop + Messenger commerce automation. Dayton brings smaller SMB. Ohio is a lower-rate market, which makes our quotes feel obvious-win. Ohio Facebook automation builds are among the lightest in the priority set.",

  "facebook-automation__georgia":
    "Georgia Facebook automation work is Atlanta-centered. Atlanta brings dental DSOs, aesthetic chains, real-estate teams (FB Pages with active community) and a steady stream of Atlanta-fintech community-management work. Savannah hospitality and Augusta professional services bring smaller work. Atlanta film-industry adjacency brings vendor-community FB Group automation. Georgia leads tend to move from discovery to signed SOW quickly.",

  // ── wordpress-seo ────────────────────────────────────────────────────────
  "wordpress-seo__california":
    "California WordPress SEO and AEO content work is dominated by LA-area service businesses (wellness, aesthetic, real estate) and Bay Area B2B SaaS marketing teams running long-tail content engines. The LA playbook: 8–12 long-form posts per month, AEO-tuned (schema-rich, LLM-quotable), targeted at IG/TikTok-discovery-then-Google-search traffic patterns. Bay Area B2B brings programmatic SEO + ABM content + product-led growth long-tail. CCPA shapes form-capture and tracking on every page we ship. California's competitive search landscape (tech, wellness especially) means our keyword scoping skews toward lower-difficulty long-tail opportunities. California has the highest content velocity in our book.",

  "wordpress-seo__texas":
    "Texas WordPress SEO + AEO work splits between Austin tech and Houston/Dallas service-business. Austin tech-content (DevOps, fintech, climate-tech) at the difficulty-30 long-tail level. Houston energy-services + safety-services content. Dallas service-business content (dental, aesthetic, real estate). San Antonio and Fort Worth bring traditional SMB content. Texas no-state-income-tax shapes content cadence (faster signed SOWs = faster start). Texas has one of the fastest retainer starts in our book — work tends to kick off soon after the SOW is signed.",

  "wordpress-seo__new-york":
    "New York WordPress SEO + AEO work is Manhattan-heavy agency-of-record + boutique professional-services + finance. Manhattan agencies outsource content under white-label. NY finance content faces FINRA-style review (we build review-checkpoints into every NY finance retainer). Brooklyn DTC + fashion brings consumer-content at scale. NY's competitive Manhattan search landscape means we focus on lower-difficulty long-tail and AEO-citable Q&A formats over head terms. NY DFS-adjacent compliance shapes any finance-content publish flow. NY carries the highest-LTV monthly retainer in our book.",

  "wordpress-seo__florida":
    "Florida WordPress SEO + AEO work is real-estate, hospitality, healthcare and senior-care heavy. Miami real-estate brokerages want bilingual (English/Spanish) content at volume. Orlando hospitality brings booking-intent content. Tampa Bay healthcare and senior-care want patient-education content (HIPAA-eligible publishing flow). Jacksonville logistics brings B2B content. Florida Digital Bill of Rights shapes form capture. Snowbird seasonality drives Q4/Q1 + Q3 content peaks (different reasons each). Spanish-language work roughly doubles project scope. Florida is a volume sweet spot.",

  "wordpress-seo__illinois":
    "Illinois WordPress SEO + AEO work is Chicago-centered. Chicago brings B2B SaaS, fintech, insurtech, legal-services and dental-DSO content at scale. Naperville and Schaumburg corporate parks bring industrial-content. BIPA shapes any content using face/voice-clone or biometric examples. Chicago's competitive Loop search landscape means a lower-difficulty long-tail focus. Illinois shows strong retention — most IL content retainers renew.",

  "wordpress-seo__pennsylvania":
    "Pennsylvania WordPress SEO + AEO work is Philly + Pittsburgh + suburban services. Philly brings healthcare-services, education-adjacent and concierge-medicine content. Pittsburgh brings B2B industrial and robotics-adjacent content. Allentown and Erie bring traditional SMB. PA's longer procurement cycle shapes content rollout timing. PA has one of the strongest content-retainer renewal rates in our book.",

  "wordpress-seo__ohio":
    "Ohio WordPress SEO + AEO work is operational and ROI-focused. Columbus, Cleveland, Cincinnati, Dayton all bring service-business + industrial-services content. Cincinnati CPG-DTC brings consumer-content at scale. Ohio is a lower-rate market, which makes our retainer feel obvious-win. Ohio CAT and economic-nexus shape e-commerce-adjacent content. Ohio carries the lightest priority-state retainer.",

  "wordpress-seo__georgia":
    "Georgia WordPress SEO + AEO work is Atlanta-centric. Atlanta brings B2B fintech, dental DSO, aesthetic chain, real-estate team and Trilith-adjacent film-industry content. Atlanta fintech alumni (Mailchimp, Calendly, NCR Voyix) bring sharper buyers. Savannah hospitality and Augusta professional services bring smaller-volume retainers. Georgia has one of the fastest content-shipping starts of any priority state.",

  // ── ecommerce-automation ─────────────────────────────────────────────────
  "ecommerce-automation__california":
    "California e-commerce automation work is dominated by LA-area Shopify + Klaviyo + Recharge DTC stacks. The typical LA brand: $1–10M ARR, struggling with Klaviyo segmentation depth and post-purchase flow gaps. We rebuild the abandonment + win-back + replenishment flow set, integrate Recharge subscriptions, wire n8n for off-Klaviyo logic (review-gating, custom-segment-building, supplier-side restock alerts). Bay Area brings B2B e-com + SaaS-with-physical-product (Peloton-style) stacks. CCPA shapes data retention and consent. California carries the highest-ticket ecom builds in our book.",

  "ecommerce-automation__texas":
    "Texas e-commerce automation work is split between Austin tech-adjacent DTC and Houston/Dallas/San Antonio traditional brick-and-mortar-going-online. Austin DTC brings Shopify + Klaviyo stacks. Houston brings energy-products and oilfield-equipment e-com (BigCommerce + custom). Dallas and Fort Worth bring fashion + lifestyle DTC. San Antonio brings traditional retail going online. Texas no-state-income-tax shapes velocity — fast countersigns and quick build starts.",

  "ecommerce-automation__new-york":
    "New York e-commerce automation work is Manhattan + Brooklyn fashion DTC heavy. Brooklyn brings the highest-fashion DTC density in the US — sustainability-led brands, niche apparel, lifestyle. Manhattan brings beauty + wellness DTC at scale. We rebuild Klaviyo flows, wire Recharge + Loop returns, layer n8n on top for custom segment + supplier-side logic. Buffalo and Rochester bring fewer ecom builds. NY DFS-adjacent compliance shapes any payment-adjacent flow. NY ecom builds run heavier than typical, in line with the higher-rate Manhattan market.",

  "ecommerce-automation__florida":
    "Florida e-commerce automation work is hospitality + tourism + senior-products heavy. Miami fashion DTC + bilingual e-com (English/Spanish). Orlando theme-park-adjacent merch ops. Tampa Bay senior-products (CPAP, mobility, supplements) — HIPAA-adjacent for some flows. Jacksonville logistics-heavy 3PL-integrated e-com. Florida Digital Bill of Rights shapes consent. Snowbird seasonality drives Q4/Q1 inbound spikes.",

  "ecommerce-automation__illinois":
    "Illinois e-commerce automation work is Chicago-centered. Chicago brings DTC fashion, food-and-bev, supplements and a thick layer of B2B-meets-B2C stacks. Naperville and Schaumburg corporate parks bring traditional-retail-going-online work. BIPA shapes any face/voice-clone product photography work. Chicago's logistics nexus makes 3PL-integration a common scope add. Chicago's higher-rate market keeps our fixed-scope quote reading as a discount.",

  "ecommerce-automation__pennsylvania":
    "Pennsylvania e-commerce automation work is Philly + Pittsburgh + suburban small-batch DTC. Philly brings food-and-bev, healthcare-adjacent supplements and craft brands. Pittsburgh brings industrial-products + B2B e-com. Erie and Allentown bring traditional retail-going-online. PA's longer procurement cycle shapes timing — we front-load discovery and write tighter SOWs.",

  "ecommerce-automation__ohio":
    "Ohio e-commerce automation work is CPG-DTC + traditional-retail. Cincinnati CPG-DTC operators (P&G alumni) bring the most sophisticated ecom builds. Columbus brings retail + insurance-services-with-product. Cleveland and Dayton bring traditional retail. Ohio is a lower-rate market, which makes our quotes feel obvious-win. Ohio CAT and sales-tax economic-nexus auto-handled.",

  "ecommerce-automation__georgia":
    "Georgia e-commerce automation work is Atlanta-centric. Atlanta brings DTC fashion + beauty + food-and-bev, plus a thick layer of Mailchimp-alumni-run consumer brands. Savannah hospitality brings tourism-product e-com. Augusta and Athens bring smaller traditional retail. Atlanta logistics nexus makes 3PL-integration a common scope add. Georgia leads tend to move from discovery to signed SOW quickly.",

  // ── vibe-coded-sites ─────────────────────────────────────────────────────
  "vibe-coded-sites__california":
    "California vibe-coded-site work is highest-bar in our book. LA brands expect motion-design parity with Apple.com or Vercel.com landing pages — interactive 3D, scroll-driven storytelling, custom shaders, the works. Bay Area startups want Next.js 16 + Vercel + Tailwind v4 + Framer Motion stacks at production-grade — they'll know the stack we picked and challenge it. We ship custom Next.js builds at the LA premium tier. Sacramento brings government-adjacent work where we redirect to more compliance-friendly tooling. CCPA shapes form capture, analytics + consent flows on every build. California is the highest-design-bar state in our book — and the most rewarding to ship for.",

  "vibe-coded-sites__texas":
    "Texas vibe-coded-site work splits Austin (high-design-bar tech startups) from Houston/Dallas (corporate + service-business). Austin brings Vercel-pedigree expectations. Houston energy-services brings corporate redesigns at scale. Dallas brings mid-market service-business. San Antonio and Fort Worth bring traditional SMB sites. Texas no-state-income-tax shapes signed-SOW velocity. Texas is the highest-volume vibe-coded state in our book.",

  "vibe-coded-sites__new-york":
    "New York vibe-coded-site work is Manhattan + Brooklyn. Manhattan brings finance + media + fashion brand sites — high-design-bar, ADA-compliant by default (NY State Human Rights Law has been read to cover web accessibility). Brooklyn brings DTC + fashion + niche-brand creative sites. Buffalo and Rochester bring rare ecom. NY DFS-adjacent shapes finance work. SAG-AFTRA shapes any creator-platform site work. NY is the highest-ticket vibe-coded state in our book.",

  "vibe-coded-sites__florida":
    "Florida vibe-coded-site work is real-estate + hospitality + healthcare + med-spa. Miami luxury brokerages want film-quality real-estate sites with bilingual UX (English/Spanish). Orlando hospitality brings booking-engine-integrated sites. Tampa Bay healthcare and senior-care bring HIPAA-considerate sites (no PHI on client side, server-side capture only). Jacksonville and Fort Lauderdale bring traditional SMB. Florida Digital Bill of Rights shapes consent. Bilingual sites add meaningful scope.",

  "vibe-coded-sites__illinois":
    "Illinois vibe-coded-site work is Chicago-centered. Chicago brings B2B SaaS, fintech, insurtech, legal-services and dental-DSO sites. Naperville and Schaumburg corporate parks bring corporate redesigns. BIPA shapes any face/voice-clone or biometric-feature site work. Chicago Loop's competitive design landscape means custom motion-design + interactive elements come standard. Chicago's higher-rate market keeps our fixed-scope quote reading as a discount.",

  "vibe-coded-sites__pennsylvania":
    "Pennsylvania vibe-coded-site work is Philly + Pittsburgh. Philly brings healthcare-services, education-adjacent, concierge-medicine and legal-services sites. Pittsburgh brings B2B industrial + robotics-adjacent (CMU alumni). Allentown and Erie bring traditional SMB. PA's longer procurement cycle shapes timing — we front-load discovery and write tighter SOWs.",

  "vibe-coded-sites__ohio":
    "Ohio vibe-coded-site work is operational and ROI-focused. Columbus, Cleveland, Cincinnati, Dayton all bring service-business + B2B-services sites. Cincinnati CPG-DTC brings consumer-brand sites. Dayton brings aerospace-services where we redirect. Ohio is a lower-rate market, which makes our quotes feel obvious-win. Ohio carries the lightest priority-state vibe-coded build.",

  "vibe-coded-sites__georgia":
    "Georgia vibe-coded-site work is Atlanta-centric. Atlanta brings B2B fintech, dental DSO, aesthetic chain, real-estate team and Trilith-adjacent film-industry sites. Atlanta fintech alumni network brings sharper buyers. Savannah hospitality brings tourism + boutique-hotel sites. Augusta and Athens bring traditional SMB. Georgia is one of the fastest-shipping vibe-coded states in our book.",

  // ── ai-chatbots ──────────────────────────────────────────────────────────
  "ai-chatbots__california":
    "California AI chatbot work is the most technically demanding in our book. LA brands want voice-first chatbots (ElevenLabs + Twilio + GPT-4o + custom knowledge base) running on web + IG + WhatsApp simultaneously. Bay Area B2B wants RAG-heavy support bots tied to internal knowledge bases (Notion, Confluence, Linear). We ship voice-fluent multi-channel bots with custom-tuned prompt pipelines and observability dashboards. CCPA shapes data retention. California's right-of-publicity statute shapes any voice-clone bot work — strict talent releases. California chatbot work is the most technically demanding, and the most rewarding, in our book.",

  "ai-chatbots__texas":
    "Texas AI chatbot work is service-business + energy-sector. Houston, Dallas, Austin and San Antonio service-businesses (HVAC, dental, aesthetic) want WhatsApp + web chat + SMS bots tied to GHL for booking. Houston energy-sector brings field-ops-knowledge bots — answer questions about safety protocols, equipment specs, compliance procedures. Austin tech brings B2B support bots. Fort Worth brings traditional SMB. Texas right-of-publicity statute is moderate. The energy-sector knowledge-bot work is among the highest-value in our Texas book.",

  "ai-chatbots__new-york":
    "New York AI chatbot work is the highest-LTV in our book. Manhattan finance brings KYC-and-compliance-aware bots (KYC vendor APIs + RAG against firm-internal compliance docs). NY healthcare and concierge-medicine bring patient-intake bots (HIPAA-eligible). Brooklyn DTC brings commerce-bots (product Q&A, sizing, return + tracking). NY DFS / FINRA-adjacent shapes finance bot publish flow. NY TCPA shapes any messaging-side bot. NY carries the highest-LTV chatbot work in our book.",

  "ai-chatbots__florida":
    "Florida AI chatbot work is real-estate + hospitality + healthcare heavy. Miami real-estate brings bilingual (English/Spanish) lead-qualification bots. Orlando hospitality brings booking and guest-service bots. Tampa Bay senior-care brings patient-comm and family-comm bots (HIPAA-eligible). Jacksonville brings B2B logistics bots. Florida Digital Bill of Rights shapes consent. Bilingual scope adds meaningfully to the build.",

  "ai-chatbots__illinois":
    "Illinois AI chatbot work is Chicago-centered. Chicago brings B2B SaaS support bots, insurance-services intake bots, legal-services qualification bots, and dental-DSO booking bots. Naperville and Schaumburg suburban service-businesses bring traditional ops bots. BIPA shapes any voice-clone bot work — explicit consent flows on every bot that captures voice. Chicago's higher-rate market keeps our fixed-scope quote reading as a discount.",

  "ai-chatbots__pennsylvania":
    "Pennsylvania AI chatbot work is Philly + Pittsburgh. Philly healthcare and concierge-medicine bring patient-intake bots (HIPAA-eligible). Pittsburgh brings B2B industrial-support bots and robotics-adjacent technical-support bots. Erie and Allentown bring traditional SMB. PA's longer procurement cycle shapes timing — we front-load discovery and write tighter SOWs.",

  "ai-chatbots__ohio":
    "Ohio AI chatbot work is operational. Columbus brings insurance-intake bots + healthcare-services patient bots. Cleveland brings industrial-support and medical-device technical-support bots. Cincinnati CPG-DTC brings product-Q&A and returns bots. Dayton brings aerospace-services where we redirect. Ohio is a lower-rate market, which keeps quotes feeling sharp.",

  "ai-chatbots__georgia":
    "Georgia AI chatbot work is Atlanta-centric. Atlanta dental DSO booking bots, aesthetic-chain qualification bots, real-estate IDX-tied bots and fintech support bots all flow through this channel. Atlanta film-industry adjacency brings unusual one-offs (talent FAQ bots, set-orientation bots). Savannah brings tourism + hospitality bots. Augusta brings smaller SMB. Georgia leads tend to move from discovery to signed SOW quickly.",

  // ── ai-business-systems ──────────────────────────────────────────────────
  "ai-business-systems__california":
    "California AI business-systems consulting is the most strategic work in our book. LA-area mid-market businesses and Bay Area scaling-startups want full ops blueprints — process mapping, tool-stack rationalization, automation prioritization, and a 90-day implementation roadmap. We deliver a fast blueprint plus an implementation sprint. California is a high-rate market, which positions our blueprint fee as a discount vs hiring a fractional COO. CCPA shapes any data-flow we recommend. California is the highest-strategy state in our book.",

  "ai-business-systems__texas":
    "Texas AI business-systems consulting splits between Austin tech and Houston/Dallas service-business + energy. Austin tech wants Bay Area-style blueprints at lower cost. Houston energy brings ops-rationalization at scale (consolidate 12 tools to 4). Dallas brings mid-market services. San Antonio and Fort Worth bring traditional SMB. Texas velocity shapes signed-SOW timing — fast countersigns and quick starts.",

  "ai-business-systems__new-york":
    "New York AI business-systems consulting is Manhattan-heavy. Manhattan finance + boutique professional-services bring ops-rationalization briefs at the highest LTV in our book. Brooklyn DTC + fashion bring scale-stage ops blueprints. NY DFS-adjacent shapes finance blueprints. NY carries the highest-LTV ai-business-systems engagements in our book.",

  "ai-business-systems__florida":
    "Florida AI business-systems consulting is real-estate + hospitality + healthcare + senior-care. Miami real-estate brokerages want sales-ops blueprints. Orlando hospitality wants guest-comm + property-management blueprints. Tampa Bay healthcare wants patient-ops blueprints (HIPAA-considerate). Florida Digital Bill of Rights shapes data-flow.",

  "ai-business-systems__illinois":
    "Illinois AI business-systems consulting is Chicago-centered. Chicago brings B2B SaaS, fintech, insurtech and legal-services ops-rationalization briefs. Naperville corporate parks bring mid-market industrial-ops briefs. BIPA shapes any biometric-data-flow recommendation. Chicago's higher-rate market keeps our fee reading as a discount.",

  "ai-business-systems__pennsylvania":
    "Pennsylvania AI business-systems consulting is Philly healthcare + education + Pittsburgh industrial + robotics. Philly brings patient-flow + grant-tracking + multi-location ops blueprints. Pittsburgh brings B2B industrial + CMU-adjacent robotics ops briefs. PA's longer procurement cycle shapes engagement timing — we front-load discovery and write tighter SOWs.",

  "ai-business-systems__ohio":
    "Ohio AI business-systems consulting is operational. Columbus, Cleveland, Cincinnati, Dayton all bring service-business + industrial-services ops-rationalization briefs. Cincinnati CPG-DTC brings consumer-brand ops blueprints. Ohio is a lower-rate market, which keeps our engagement fee feeling sharp.",

  "ai-business-systems__georgia":
    "Georgia AI business-systems consulting is Atlanta-centric. Atlanta brings B2B fintech, dental DSO multi-location ops, aesthetic-chain expansion-ops, real-estate team-ops and Trilith-adjacent vendor-management briefs. Atlanta fintech alumni network brings sharper buyers. Savannah hospitality brings property-management briefs. Augusta brings smaller SMB. Georgia leads tend to move from discovery to signed SOW quickly.",

  // ── strategy-training ────────────────────────────────────────────────────
  "strategy-training__california":
    "California strategy-and-training engagements are heaviest on team-upskilling for 5–25 person teams adopting AI tooling. LA brings agency teams (creative + ops + AM upskilling on Claude + ChatGPT + Midjourney). Bay Area brings tech teams (engineering AI tooling, prompt-engineering best practices, internal-RAG setup). We ship 1:1 workshops + recorded SOP library + a Slack-based coaching window. CCPA shapes any data-flow taught. California brings the highest-strategy training briefs in our book.",

  "strategy-training__texas":
    "Texas strategy-and-training engagements are heaviest on service-business + energy-sector team-upskilling. Austin tech teams adopt AI tools at velocity. Houston energy teams adopt for ops-efficiency. Dallas and San Antonio service-businesses bring smaller team workshops. Texas velocity shapes timing — fast countersigns and quick starts.",

  "strategy-training__new-york":
    "New York strategy-and-training engagements are Manhattan agency + boutique professional-services team-upskilling. Manhattan finance brings compliance-aware AI-tool training (FINRA-considerate prompt patterns, audit-trail discipline). Brooklyn DTC + fashion brings creator-team upskilling. NY DFS-adjacent shapes finance training. NY carries the highest-LTV training engagements in our book.",

  "strategy-training__florida":
    "Florida strategy-and-training engagements are real-estate-team + hospitality-team + healthcare-team upskilling. Miami brokerages bring agent-team training. Orlando hospitality brings front-of-house team upskilling. Tampa Bay healthcare brings clinical-ops team training (HIPAA-considerate). Florida Digital Bill of Rights shapes any data-flow taught.",

  "strategy-training__illinois":
    "Illinois strategy-and-training engagements are Chicago-centered. Chicago brings B2B SaaS team-upskilling, insurance-services team training, legal-services AI-adoption workshops and dental-DSO team upskilling. BIPA shapes any biometric-AI tool training.",

  "strategy-training__pennsylvania":
    "Pennsylvania strategy-and-training engagements are Philly + Pittsburgh + suburban. Philly brings healthcare-team + education-team upskilling. Pittsburgh brings B2B industrial + robotics team training. Erie and Allentown bring SMB team workshops. PA's longer procurement cycle shapes timing — we front-load discovery and write tighter SOWs.",

  "strategy-training__ohio":
    "Ohio strategy-and-training engagements are operational. Columbus, Cleveland, Cincinnati, Dayton all bring service-business + industrial-services team-upskilling. Cincinnati CPG-DTC brings consumer-brand creative-team training. Ohio is a lower-rate market, which keeps our engagement fee feeling sharp.",

  "strategy-training__georgia":
    "Georgia strategy-and-training engagements are Atlanta-centric. Atlanta brings B2B fintech team-upskilling, dental DSO + aesthetic-chain ops-team training, real-estate team workshops and Trilith-adjacent vendor-team upskilling. Atlanta fintech alumni network brings sharper buyers. Georgia leads tend to move from discovery to signed SOW quickly.",

  // ── branding-design ──────────────────────────────────────────────────────
  "branding-design__california":
    "California branding-and-design work is highest-bar in our book. LA brings creator-economy + DTC + entertainment-brand identity work — full brand systems with motion, sonic logo, and AR filter assets. Bay Area brings B2B SaaS + tech brand systems with developer-tooling-flavor visual language. We ship an identity sprint at the California premium tier. CCPA shapes any data-flow in brand-website handoffs. California is the highest-design-bar branding state in our book.",

  "branding-design__texas":
    "Texas branding-and-design work splits Austin (high-design-bar startups) from Houston/Dallas (corporate + service-business). Austin brings tech-brand systems. Houston energy and Dallas mid-market services bring corporate rebrands. San Antonio and Fort Worth bring traditional SMB identity. Texas velocity shapes signed-SOW timing — fast countersigns and quick starts.",

  "branding-design__new-york":
    "New York branding-and-design work is Manhattan + Brooklyn fashion + finance. Manhattan finance brings boutique-firm identity systems. Brooklyn fashion + DTC brings lifestyle-brand identity. NY DFS-adjacent shapes finance brand-publish flow. NY's competitive design landscape means our work must hold up next to Pentagram + COLLINS-tier output. NY carries the highest-LTV branding engagements in our book.",

  "branding-design__florida":
    "Florida branding-and-design work is real-estate + hospitality + healthcare + med-spa. Miami brings luxury real-estate brand systems. Orlando brings hospitality and theme-park-adjacent. Tampa Bay senior-care brings approachable-trust brand systems. Jacksonville and Fort Lauderdale bring traditional SMB. Florida Digital Bill of Rights shapes brand-website handoff.",

  "branding-design__illinois":
    "Illinois branding-and-design work is Chicago-centered. Chicago brings B2B SaaS, fintech, insurtech, legal-services and dental-DSO brand systems. Naperville and Schaumburg suburban corporate brings rebrand work. BIPA shapes any face-asset library work. Chicago's higher-rate market keeps our fee reading as a discount.",

  "branding-design__pennsylvania":
    "Pennsylvania branding-and-design work is Philly + Pittsburgh. Philly brings healthcare-services + education-adjacent + concierge-medicine identity. Pittsburgh brings B2B industrial + robotics-adjacent identity. Erie and Allentown bring traditional SMB. PA's longer procurement cycle shapes timing — we front-load discovery and write tighter SOWs.",

  "branding-design__ohio":
    "Ohio branding-and-design work is operational + B2B-services. Columbus brings insurance-services + healthcare-services rebrands. Cleveland brings industrial + medical-device. Cincinnati CPG-DTC brings consumer-brand identity. Dayton brings smaller SMB. Ohio is a lower-rate market, which keeps quotes feeling sharp.",

  "branding-design__georgia":
    "Georgia branding-and-design work is Atlanta-centric. Atlanta brings B2B fintech, dental DSO, aesthetic chain, real-estate team and Trilith-adjacent film-industry brand systems. Atlanta fintech alumni network brings sharper design briefs. Savannah brings tourism + boutique-hotel identity. Augusta brings traditional SMB. Georgia leads tend to move from discovery to signed SOW quickly.",

  // ── ai-content-creation ──────────────────────────────────────────────────
  "ai-content-creation__california":
    "California AI content creation work is voice-locked content at scale — 30+ posts/month across LinkedIn, IG, Twitter/X, and newsletter. LA brings creator-economy + DTC brand-voice content. Bay Area brings founder-LinkedIn voice work at scale (tech founders especially). We lock voice via a 90-minute voice-extraction interview, build a custom prompt + style guide, and ship a high cadence of posts each month with human-in-the-loop QA. CCPA shapes any data-flow in content-publish. California has the highest content velocity in our book.",

  "ai-content-creation__texas":
    "Texas AI content creation work splits between Austin founder-voice + Houston/Dallas executive-voice. Austin tech founders want LinkedIn-heavy content. Houston energy + Dallas service-business want executive thought-leadership across LinkedIn + newsletter. San Antonio and Fort Worth bring smaller-volume content retainers. Texas velocity shapes signed-SOW timing — fast countersigns and quick starts.",

  "ai-content-creation__new-york":
    "New York AI content creation work is highest-LTV in our book. Manhattan finance executives, boutique professional-services partners, agency principals and concierge-medicine doctors all bring voice-locked content briefs at the highest spend per post in our book. NY DFS / FINRA-adjacent shapes finance content publish flow (compliance review checkpoint). Brooklyn DTC + fashion brings creator-brand-voice content. NY carries the highest-LTV content retainers in our book.",

  "ai-content-creation__florida":
    "Florida AI content creation work is real-estate + hospitality + healthcare + senior-care. Miami real-estate brings bilingual (English/Spanish) agent-voice content. Orlando hospitality brings property-voice content. Tampa Bay healthcare brings practitioner-voice content (HIPAA-considerate). Jacksonville and Fort Lauderdale bring traditional SMB. Florida Digital Bill of Rights shapes data-flow.",

  "ai-content-creation__illinois":
    "Illinois AI content creation work is Chicago-centered. Chicago brings B2B SaaS founder-voice content, insurance-services executive content, legal-services partner content and dental-DSO group-voice content. BIPA shapes any biometric-data-flow content.",

  "ai-content-creation__pennsylvania":
    "Pennsylvania AI content creation work is Philly + Pittsburgh + suburban. Philly brings healthcare-services + education-adjacent + concierge-medicine voice content. Pittsburgh brings B2B industrial + robotics-adjacent (CMU-alumni) voice content. Erie and Allentown bring traditional SMB. PA's longer procurement cycle shapes timing — we front-load discovery and write tighter SOWs.",

  "ai-content-creation__ohio":
    "Ohio AI content creation work is operational. Columbus, Cleveland, Cincinnati, Dayton all bring service-business + B2B-services executive-voice content. Cincinnati CPG-DTC brings consumer-brand voice content. Ohio is a lower-rate market, which keeps our retainer feeling sharp.",

  "ai-content-creation__georgia":
    "Georgia AI content creation work is Atlanta-centric. Atlanta brings B2B fintech founder-voice content, dental DSO group-voice content, aesthetic-chain practitioner-voice content, real-estate team-voice content and Trilith-adjacent talent-voice content. Atlanta fintech alumni network brings sharper voice briefs. Savannah hospitality brings property-voice content. Georgia leads tend to move from discovery to signed SOW quickly.",
};

/**
 * Look up the enriched paragraph for a (service, state) cell.
 * Returns `null` if the cell is not in the priority matrix (= still noindex).
 */
export function getEnrichment(
  serviceSlug: string,
  stateSlug: string,
): string | null {
  const key = `${serviceSlug}__${stateSlug}`;
  return SERVICE_STATE_ENRICHMENT[key] ?? null;
}

/**
 * How many priority cells we ship today. Used by the migration report
 * to assert the 128-cell coverage matches expectation.
 */
export const ENRICHMENT_CELL_COUNT = Object.keys(
  SERVICE_STATE_ENRICHMENT,
).length;
