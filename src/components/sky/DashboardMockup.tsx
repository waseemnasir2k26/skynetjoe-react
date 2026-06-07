/**
 * DashboardMockup — generic "SkynetLabs ops canvas" hero visual.
 *
 * Same zero-JS technique as /lp/logistics: hidden radio inputs + CSS `:has()`
 * drive panel switching (styles live in src/styles/skyv3.css). First tab is
 * defaultChecked so it degrades to a static dashboard where :has() is missing.
 *
 * Multi-industry (NOT logistics-specific): Leads / Replies / Follow-ups /
 * Calls / Revenue, with an AI-agent right rail (Voice / SMS / Email).
 *
 * Server component — pure markup, no client JS.
 */
export default function DashboardMockup() {
  return (
    <div className="mockup-wrap">
      <div
        className="mockup"
        role="region"
        aria-label="SkynetLabs ops canvas preview — interactive"
      >
        <span className="interactive-hint">Click tabs →</span>

        {/* hidden radios drive panel switching */}
        <input
          className="ws-radio"
          type="radio"
          name="ws"
          id="ws-leads"
          defaultChecked
        />
        <input className="ws-radio" type="radio" name="ws" id="ws-replies" />
        <input className="ws-radio" type="radio" name="ws" id="ws-followups" />
        <input className="ws-radio" type="radio" name="ws" id="ws-calls" />
        <input className="ws-radio" type="radio" name="ws" id="ws-revenue" />
        <input
          className="ai-radio"
          type="radio"
          name="ai"
          id="ai-voice"
          defaultChecked
        />
        <input className="ai-radio" type="radio" name="ai" id="ai-sms" />
        <input className="ai-radio" type="radio" name="ai" id="ai-email" />

        {/* mobile horizontal tab pills — only <980px */}
        <div className="mobile-tabs" role="tablist" aria-label="Workspace tabs">
          <label htmlFor="ws-leads" data-for="ws-leads">
            Leads
          </label>
          <label htmlFor="ws-replies" data-for="ws-replies">
            Replies
          </label>
          <label htmlFor="ws-followups" data-for="ws-followups">
            Follow-ups
          </label>
          <label htmlFor="ws-calls" data-for="ws-calls">
            Calls
          </label>
          <label htmlFor="ws-revenue" data-for="ws-revenue">
            Revenue
          </label>
        </div>

        <div className="mockup-bar">
          <div className="mockup-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="mockup-addr">skynetlabs.app/ops/today</div>
        </div>

        <div className="mockup-body">
          <aside className="mock-side">
            <div className="mock-side-head">Workspace</div>
            <label
              htmlFor="ws-leads"
              className="mock-side-item tab"
              data-for="ws-leads"
            >
              Leads <span className="badge">38</span>
            </label>
            <label
              htmlFor="ws-replies"
              className="mock-side-item tab"
              data-for="ws-replies"
            >
              Replies
            </label>
            <label
              htmlFor="ws-followups"
              className="mock-side-item tab"
              data-for="ws-followups"
            >
              Follow-ups
            </label>
            <label
              htmlFor="ws-calls"
              className="mock-side-item tab"
              data-for="ws-calls"
            >
              Calls
            </label>
            <label
              htmlFor="ws-revenue"
              className="mock-side-item tab"
              data-for="ws-revenue"
            >
              Revenue
            </label>
            <div className="mock-side-head" style={{ marginTop: 20 }}>
              AI Agents
            </div>
            <label
              htmlFor="ai-voice"
              className="mock-side-item ai-tab"
              data-for="ai-voice"
            >
              Voice agent <span className="badge">3</span>
            </label>
            <label
              htmlFor="ai-sms"
              className="mock-side-item ai-tab"
              data-for="ai-sms"
            >
              SMS reply
            </label>
            <label
              htmlFor="ai-email"
              className="mock-side-item ai-tab"
              data-for="ai-email"
            >
              Email follow-up
            </label>
          </aside>

          <div className="mock-main">
            {/* PANEL: LEADS (default) */}
            <div className="panel panel-leads">
              <div className="mock-h">Leads · Today</div>
              <div className="mock-sub">
                Every inbound captured and auto-replied in seconds — day or
                night
              </div>
              <div className="mock-tiles">
                <div className="mock-tile up">
                  <div className="mock-tile-lbl">New leads</div>
                  <div className="mock-tile-num">38</div>
                  <div className="mock-tile-delta">+12 vs avg</div>
                </div>
                <div className="mock-tile warm">
                  <div className="mock-tile-lbl">Avg reply</div>
                  <div className="mock-tile-num">9s</div>
                  <div className="mock-tile-delta">−98% vs manual</div>
                </div>
                <div className="mock-tile up">
                  <div className="mock-tile-lbl">Booked</div>
                  <div className="mock-tile-num">14</div>
                  <div className="mock-tile-delta">+6 today</div>
                </div>
              </div>
              <div className="mock-lanes-h">
                <span>Live inbox</span>
                <span className="live">Live</span>
              </div>
              <div className="mock-lane">
                <div className="mock-lane-route">
                  Website form → Kitchen remodel
                  <small>2 min ago · auto-replied + quote sent</small>
                </div>
                <div className="mock-lane-rate">$14,500</div>
                <div className="mock-lane-status status-booked">BOOKED</div>
              </div>
              <div className="mock-lane">
                <div className="mock-lane-route">
                  Missed call 9:42pm → AC repair
                  <small>after hours · texted back in 9s</small>
                </div>
                <div className="mock-lane-rate">$2,800</div>
                <div className="mock-lane-status status-routing">REPLIED</div>
              </div>
              <div className="mock-lane">
                <div className="mock-lane-route">
                  Instagram DM → Bridal package
                  <small>qualified + calendar link sent</small>
                </div>
                <div className="mock-lane-rate">$3,200</div>
                <div className="mock-lane-status status-booked">BOOKED</div>
              </div>
              <div className="mock-lane">
                <div className="mock-lane-route">
                  WhatsApp → Fleet service plan
                  <small>follow-up sequence running</small>
                </div>
                <div className="mock-lane-rate">$6,400</div>
                <div className="mock-lane-status status-pending">PENDING</div>
              </div>
            </div>

            {/* PANEL: REPLIES */}
            <div className="panel panel-replies">
              <div className="mock-h">Replies · AI inbox</div>
              <div className="mock-sub">
                Drafted and sent in your voice, across every channel, 24/7
              </div>
              <div className="mock-tiles">
                <div className="mock-tile up">
                  <div className="mock-tile-lbl">Sent today</div>
                  <div className="mock-tile-num">126</div>
                  <div className="mock-tile-delta">+31 vs avg</div>
                </div>
                <div className="mock-tile warm">
                  <div className="mock-tile-lbl">Avg response</div>
                  <div className="mock-tile-num">9s</div>
                  <div className="mock-tile-delta">−98% vs human</div>
                </div>
                <div className="mock-tile up">
                  <div className="mock-tile-lbl">Open rate</div>
                  <div className="mock-tile-num">71%</div>
                  <div className="mock-tile-delta">+14 pts</div>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Channel</th>
                    <th>Sent</th>
                    <th>Opened</th>
                    <th>Booked</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SMS</td>
                    <td>52</td>
                    <td className="num up">81%</td>
                    <td>9</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>38</td>
                    <td className="num">62%</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>Instagram DM</td>
                    <td>18</td>
                    <td className="num up">88%</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>WhatsApp</td>
                    <td>12</td>
                    <td className="num up">92%</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>Web chat</td>
                    <td>6</td>
                    <td className="num warm">54%</td>
                    <td>1</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* PANEL: FOLLOW-UPS */}
            <div className="panel panel-followups">
              <div className="mock-h">Follow-ups · Scheduled</div>
              <div className="mock-sub">
                Polite nudges run until they book or buy — nothing slips
              </div>
              <div className="mock-tiles">
                <div className="mock-tile up">
                  <div className="mock-tile-lbl">Active sequences</div>
                  <div className="mock-tile-num">64</div>
                  <div className="mock-tile-delta">+9 this week</div>
                </div>
                <div className="mock-tile warm">
                  <div className="mock-tile-lbl">Recovered</div>
                  <div className="mock-tile-num">19</div>
                  <div className="mock-tile-delta">went cold, came back</div>
                </div>
                <div className="mock-tile up">
                  <div className="mock-tile-lbl">Revenue saved</div>
                  <div className="mock-tile-num">$42K</div>
                  <div className="mock-tile-delta">last 30 days</div>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Lead</th>
                    <th>Stage</th>
                    <th>Next touch</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>R. Mendez</td>
                    <td>Quote sent</td>
                    <td className="num">in 2h</td>
                    <td>Nudge 2/4</td>
                  </tr>
                  <tr>
                    <td>Greenline HVAC</td>
                    <td>No reply</td>
                    <td className="num warm">tomorrow</td>
                    <td>Nudge 3/4</td>
                  </tr>
                  <tr>
                    <td>S. Okafor</td>
                    <td>Booked call</td>
                    <td className="num up">reminder set</td>
                    <td>Confirmed</td>
                  </tr>
                  <tr>
                    <td>Bayview Dental</td>
                    <td>Cold 14d</td>
                    <td className="num">re-engage</td>
                    <td>Win-back</td>
                  </tr>
                  <tr>
                    <td>M. Tan</td>
                    <td>Quote sent</td>
                    <td className="num up">in 1d</td>
                    <td>Nudge 1/4</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* PANEL: CALLS */}
            <div className="panel panel-calls">
              <div className="mock-h">Calls · AI voice agent</div>
              <div className="mock-sub">
                Answers every ring, qualifies, then books or routes to you
              </div>
              <div className="driver-grid">
                <div className="driver-card">
                  <div className="nm">Inbound · (415) 555-0142</div>
                  <div className="st route">● Booked · Kitchen remodel</div>
                  <div className="meta">qualified in 22s · slot Thu 2pm</div>
                </div>
                <div className="driver-card">
                  <div className="nm">Inbound · (305) 555-0188</div>
                  <div className="st route">● Routed · Urgent AC repair</div>
                  <div className="meta">after hours · SMS sent + ticket</div>
                </div>
                <div className="driver-card">
                  <div className="nm">Inbound · (212) 555-0291</div>
                  <div className="st idle">○ Voicemail saved</div>
                  <div className="meta">transcribed · follow-up queued</div>
                </div>
                <div className="driver-card">
                  <div className="nm">Inbound · (702) 555-0117</div>
                  <div className="st route">● Booked · Bridal package</div>
                  <div className="meta">qualified in 31s · deposit link</div>
                </div>
                <div className="driver-card">
                  <div className="nm">Inbound · (646) 555-0233</div>
                  <div className="st route">● Routed · Fleet quote</div>
                  <div className="meta">enterprise · flagged for you</div>
                </div>
                <div className="driver-card">
                  <div className="nm">Inbound · (818) 555-0176</div>
                  <div className="st off">○ Spam blocked</div>
                  <div className="meta">auto-screened · no interruption</div>
                </div>
              </div>
            </div>

            {/* PANEL: REVENUE */}
            <div className="panel panel-revenue">
              <div className="mock-h">Revenue · This month</div>
              <div className="mock-sub">
                Attributed to recovered leads and automated booking
              </div>
              <div className="mock-tiles">
                <div className="mock-tile up">
                  <div className="mock-tile-lbl">Booked</div>
                  <div className="mock-tile-num">$84K</div>
                  <div className="mock-tile-delta">+18% vs last mo</div>
                </div>
                <div className="mock-tile up">
                  <div className="mock-tile-lbl">From recovered</div>
                  <div className="mock-tile-num">$31K</div>
                  <div className="mock-tile-delta">would have been lost</div>
                </div>
                <div className="mock-tile warm">
                  <div className="mock-tile-lbl">Hours saved</div>
                  <div className="mock-tile-num">96</div>
                  <div className="mock-tile-delta">admin handled</div>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Channel</th>
                    <th>Leads</th>
                    <th>Booked</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Website + chat</td>
                    <td>142</td>
                    <td>38</td>
                    <td className="num up">$34,200</td>
                  </tr>
                  <tr>
                    <td>Missed-call text-back</td>
                    <td>88</td>
                    <td>21</td>
                    <td className="num up">$22,400</td>
                  </tr>
                  <tr>
                    <td>Instagram / WhatsApp</td>
                    <td>96</td>
                    <td>19</td>
                    <td className="num">$15,800</td>
                  </tr>
                  <tr>
                    <td>Referrals</td>
                    <td>34</td>
                    <td>11</td>
                    <td className="num up">$9,600</td>
                  </tr>
                  <tr>
                    <td>Win-back sequence</td>
                    <td>61</td>
                    <td>7</td>
                    <td className="num warm">$2,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <aside className="mock-right">
            {/* AI agent panel — VOICE (default) */}
            <div className="ai-panel ai-panel-voice">
              <div className="agent-card">
                <div className="agent-head">
                  <div className="agent-pulse"></div>
                  <div className="agent-pill">LIVE</div>
                  <div className="agent-title">Voice agent</div>
                </div>
                <div className="agent-body">
                  Inbound from <code>(415) 555-0142</code> ·{" "}
                  <strong>kitchen remodel</strong> · qualified in 22s · booked
                  Thu 2pm, deposit link sent.
                </div>
              </div>
              <div className="agent-card">
                <div className="agent-head">
                  <div className="agent-pulse"></div>
                  <div className="agent-pill">LIVE</div>
                  <div className="agent-title">Voice agent</div>
                </div>
                <div className="agent-body">
                  Missed call 9:42pm · <strong>AC repair</strong> · texted back
                  in <code>9s</code> · routed to on-call ticket.
                </div>
              </div>
              <div className="factor-card">
                <div className="agent-title" style={{ marginBottom: 4 }}>
                  Today · Voice agent
                </div>
                <div className="factor-num">47 calls</div>
                <div className="factor-sub">
                  22 qualified · 8 booked · 17 routed
                </div>
                <div className="factor-bar">
                  <div className="factor-bar-fill"></div>
                </div>
                <div className="factor-sub" style={{ marginTop: 6 }}>
                  74% qualified rate · avg 9s pickup
                </div>
              </div>
            </div>

            {/* AI agent panel — SMS reply */}
            <div className="ai-panel ai-panel-sms">
              <div className="agent-card">
                <div className="agent-head">
                  <div className="agent-pulse"></div>
                  <div className="agent-pill">SENT</div>
                  <div className="agent-title">SMS reply</div>
                </div>
                <div className="agent-body">
                  New lead · <strong>bridal package</strong> · auto-reply +
                  calendar link sent in <code>9s</code>, slot held.
                </div>
              </div>
              <div className="agent-card">
                <div className="agent-head">
                  <div className="agent-pulse"></div>
                  <div className="agent-pill">QUEUED</div>
                  <div className="agent-title">SMS reply</div>
                </div>
                <div className="agent-body">
                  Quote follow-up to <code>R. Mendez</code> · nudge 2 of 4 ·
                  fires in 2h if no reply.
                </div>
              </div>
              <div className="factor-card">
                <div className="agent-title" style={{ marginBottom: 4 }}>
                  Today · SMS reply
                </div>
                <div className="factor-num">126 sent</div>
                <div className="factor-sub">
                  89 opened · 22 booked · 15 pending
                </div>
                <div className="factor-bar">
                  <div className="factor-bar-fill"></div>
                </div>
                <div className="factor-sub" style={{ marginTop: 6 }}>
                  71% open rate · avg 9s response
                </div>
              </div>
            </div>

            {/* AI agent panel — Email follow-up */}
            <div className="ai-panel ai-panel-email">
              <div className="agent-card">
                <div className="agent-head">
                  <div className="agent-pulse"></div>
                  <div className="agent-pill">RUNNING</div>
                  <div className="agent-title">Email follow-up</div>
                </div>
                <div className="agent-body">
                  Cold 14 days · <strong>Bayview Dental</strong> · win-back
                  sequence re-engaged · opened, reply detected.
                </div>
              </div>
              <div className="agent-card">
                <div className="agent-head">
                  <div className="agent-pulse"></div>
                  <div className="agent-pill">SENT</div>
                  <div className="agent-title">Email follow-up</div>
                </div>
                <div className="agent-body">
                  Proposal recap to <code>Greenline HVAC</code> · margin{" "}
                  <code>28%</code> · CTA to book install call.
                </div>
              </div>
              <div className="factor-card">
                <div className="agent-title" style={{ marginBottom: 4 }}>
                  Today · Email follow-up
                </div>
                <div className="factor-num">+$42K</div>
                <div className="factor-sub">
                  recovered via sequences · last 30 days
                </div>
                <div className="factor-bar">
                  <div className="factor-bar-fill"></div>
                </div>
                <div className="factor-sub" style={{ marginTop: 6 }}>
                  19 leads brought back · avg 3 touches
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
