import Script from "next/script";

// Pixel IDs are public by nature (visible in every page that fires them).
// The fallback keeps the pixel alive even when the host builds without the
// env var — Hostinger builds on-host, and NEXT_PUBLIC_* is inlined at build
// time, so a missing panel var would otherwise silently ship a null pixel.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "1040197438955330";

export function MetaPixel() {
  if (!PIXEL_ID) return null;
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

export function MetaPixelEvents() {
  if (!PIXEL_ID) return null;
  // Tiny client island — fires fbq events for elements with data-meta-event="EventName"
  return (
    <Script id="meta-pixel-events" strategy="afterInteractive">
      {`(function(){
        if(typeof window==='undefined'||!window.fbq)return;
        // Lead: form submit on email capture
        document.querySelectorAll('form[data-meta-event]').forEach(function(f){
          f.addEventListener('submit',function(){window.fbq&&window.fbq('track',f.dataset.metaEvent||'Lead');});
        });
        // InitiateCheckout: pricing card CTAs
        document.querySelectorAll('a[data-meta-event],button[data-meta-event]').forEach(function(el){
          el.addEventListener('click',function(){window.fbq&&window.fbq('track',el.dataset.metaEvent||'InitiateCheckout',{content_name:el.dataset.metaName||'',value:el.dataset.metaValue||'',currency:'USD'});});
        });
        // ViewContent: fire when user scrolls past 50% of viewport
        var fired=false;
        function onScroll(){if(fired)return;if(window.scrollY>window.innerHeight*0.5){fired=true;window.fbq&&window.fbq('track','ViewContent');window.removeEventListener('scroll',onScroll);}}
        window.addEventListener('scroll',onScroll,{passive:true});
      })();`}
    </Script>
  );
}
