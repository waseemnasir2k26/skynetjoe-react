import Script from "next/script";

// Cookieless 2-event funnel counter (SXO layer).
//   landing -> cta_click
//
// Privacy posture: no cookies, no localStorage, no user identifier, no
// fingerprinting. Payload = site, event, pathname (query string stripped),
// referrer HOSTNAME only (reduced client-side), and a clipped href/step with
// its query string stripped. Nothing is stored on the visitor's device, so
// PECR/GDPR storage-access consent is not triggered; GDPR transparency IS —
// the beacon is disclosed on /privacy-policy (name, fields, recipient host). Honors
// Do-Not-Track and Global Privacy Control: sends nothing when either is set.
//
// `landing` counts HARD loads only (next/link client navigation does not
// re-fire it) — read it as sessions-per-entry-page, not pageviews. /book is
// always a hard load, so the conversion page is counted correctly. Calendly
// booking events were removed 2026-10-31; cta_click now also fires on
// WhatsApp (wa.me) and mailto: contact links.
const SITE = "skynetjoe";
const ENDPOINT = "https://n8n.skynetjoe.com/webhook/sxo-event";

const src = `(function(){var S=${JSON.stringify(SITE)},E=${JSON.stringify(ENDPOINT)};
if(/^(1|yes)$/.test(String(navigator.doNotTrack||window.doNotTrack||navigator.msDoNotTrack||''))||navigator.globalPrivacyControl===true)return;
function host(u){try{return new URL(u).hostname.replace(/^www\\./,'')}catch(e){return ''}}
function clean(s){return String(s||'').split('?')[0].split('#')[0].slice(0,200)}
function send(ev,extra){try{var p={site:S,ev:ev,path:clean(location.pathname),ref:host(document.referrer)};
if(extra){for(var k in extra)p[k]=extra[k]}var b=JSON.stringify(p);
if(navigator.sendBeacon){navigator.sendBeacon(E,new Blob([b],{type:'text/plain'}))}
else{fetch(E,{method:'POST',body:b,keepalive:true,mode:'no-cors'}).catch(function(){})}}catch(e){}}
send('landing');
try{document.addEventListener('click',function(e){try{var t=e.target;var a=t&&t.closest?t.closest('a'):null;if(!a)return;
var h=a.getAttribute('href')||'';if(/wa\\.me\\/|^mailto:|\\/book(\\/|$|\\?|#)|\\/discovery-call(\\/|$|\\?|#)|#book$/.test(h))send('cta_click',{href:clean(h)})}catch(e){}},true);
}catch(e){}})();`;

export default function SxoBeacon() {
  return (
    <Script
      id="sxo-beacon"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: src }}
    />
  );
}
