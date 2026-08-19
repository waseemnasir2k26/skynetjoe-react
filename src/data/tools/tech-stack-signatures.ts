/**
 * TECH_STACK_SIGNATURES — curated fingerprint list for the Tech Stack X-Ray
 * tool. Each signature detects ONE vendor/tool from raw homepage HTML
 * (script src, meta tags, inline script markers, class/id hooks, comments).
 *
 * Deliberately conservative: `test()` only returns true on a real string
 * match against the fetched HTML — no guessing, no "probably". Pricing is
 * NEVER hardcoded here (goes stale = false claim) — `pricingUrl` always
 * points at the vendor's own public pricing page so the number the visitor
 * sees is always current and vendor-sourced.
 */

export type StackCategory =
  | "CMS"
  | "Ecommerce"
  | "Site Builder"
  | "Framework"
  | "Analytics"
  | "Tag Manager"
  | "Chat & Support"
  | "CRM & Marketing Automation"
  | "Payments"
  | "Scheduling & Booking"
  | "Forms"
  | "Email Capture"
  | "A/B Testing & CRO"
  | "Session Recording"
  | "CDN & Hosting"
  | "Reviews & Trust";

export type StackSignature = {
  id: string;
  vendor: string;
  category: StackCategory;
  pricingUrl: string;
  /** Returns true if this vendor's fingerprint is present in the HTML. */
  test: (html: string) => boolean;
};

function has(html: string, ...needles: string[]): boolean {
  const lower = html.toLowerCase();
  return needles.some((n) => lower.includes(n.toLowerCase()));
}

function re(html: string, pattern: RegExp): boolean {
  return pattern.test(html);
}

export const TECH_STACK_SIGNATURES: StackSignature[] = [
  // ---------------- CMS ----------------
  {
    id: "wordpress",
    vendor: "WordPress",
    category: "CMS",
    pricingUrl: "https://wordpress.org/download/",
    test: (h) => has(h, "wp-content", "wp-includes", "/wp-json/"),
  },
  {
    id: "wp-theme",
    vendor: "WordPress theme (generic)",
    category: "CMS",
    pricingUrl: "https://wordpress.org/themes/",
    test: (h) => re(h, /wp-content\/themes\/([a-z0-9-]+)/i),
  },
  {
    id: "elementor",
    vendor: "Elementor",
    category: "CMS",
    pricingUrl: "https://elementor.com/pricing/",
    test: (h) => has(h, "elementor"),
  },
  {
    id: "divi",
    vendor: "Divi (Elegant Themes)",
    category: "CMS",
    pricingUrl: "https://www.elegantthemes.com/gallery/divi/",
    test: (h) => has(h, "et_pb_", "et-divi-theme"),
  },
  {
    id: "drupal",
    vendor: "Drupal",
    category: "CMS",
    pricingUrl: "https://www.drupal.org/",
    test: (h) => has(h, "sites/default/files", "drupal.js", "/misc/drupal.js"),
  },
  {
    id: "joomla",
    vendor: "Joomla",
    category: "CMS",
    pricingUrl: "https://www.joomla.org/",
    test: (h) => has(h, "/media/jui/", "joomla"),
  },
  {
    id: "ghost",
    vendor: "Ghost",
    category: "CMS",
    pricingUrl: "https://ghost.org/pricing/",
    test: (h) =>
      has(h, "ghost.io", 'content="ghost', 'generator" content="ghost'),
  },
  {
    id: "contentful",
    vendor: "Contentful",
    category: "CMS",
    pricingUrl: "https://www.contentful.com/pricing/",
    test: (h) => has(h, "contentful.com"),
  },
  {
    id: "sanity",
    vendor: "Sanity",
    category: "CMS",
    pricingUrl: "https://www.sanity.io/pricing",
    test: (h) => has(h, "sanity.io", "cdn.sanity.io"),
  },

  // ---------------- Site Builder ----------------
  {
    id: "webflow",
    vendor: "Webflow",
    category: "Site Builder",
    pricingUrl: "https://webflow.com/pricing",
    test: (h) => has(h, "webflow.com", "data-wf-page", "data-wf-site"),
  },
  {
    id: "wix",
    vendor: "Wix",
    category: "Site Builder",
    pricingUrl: "https://www.wix.com/premium/pricing-plans",
    test: (h) => has(h, "wix.com", "wixstatic.com", "wix-code"),
  },
  {
    id: "squarespace",
    vendor: "Squarespace",
    category: "Site Builder",
    pricingUrl: "https://www.squarespace.com/pricing",
    test: (h) => has(h, "squarespace.com", "static1.squarespace.com"),
  },
  {
    id: "framer",
    vendor: "Framer",
    category: "Site Builder",
    pricingUrl: "https://www.framer.com/pricing/",
    test: (h) => has(h, "framerusercontent.com", "framer.com/api"),
  },
  {
    id: "carrd",
    vendor: "Carrd",
    category: "Site Builder",
    pricingUrl: "https://carrd.co/pro",
    test: (h) => has(h, "carrd.co"),
  },
  {
    id: "godaddy-builder",
    vendor: "GoDaddy Website Builder",
    category: "Site Builder",
    pricingUrl: "https://www.godaddy.com/websites/website-builder",
    test: (h) => has(h, "godaddy.com/websites", "gdwebsitebuilder"),
  },

  // ---------------- Ecommerce ----------------
  {
    id: "shopify",
    vendor: "Shopify",
    category: "Ecommerce",
    pricingUrl: "https://www.shopify.com/pricing",
    test: (h) => has(h, "cdn.shopify.com", "shopify.com/s/", "shopifycloud"),
  },
  {
    id: "woocommerce",
    vendor: "WooCommerce",
    category: "Ecommerce",
    pricingUrl: "https://woocommerce.com/pricing/",
    test: (h) => has(h, "woocommerce", "wc-ajax"),
  },
  {
    id: "bigcommerce",
    vendor: "BigCommerce",
    category: "Ecommerce",
    pricingUrl: "https://www.bigcommerce.com/essentials/pricing/",
    test: (h) => has(h, "bigcommerce.com", "cdn11.bigcommerce.com"),
  },
  {
    id: "magento",
    vendor: "Adobe Commerce (Magento)",
    category: "Ecommerce",
    pricingUrl: "https://business.adobe.com/products/magento/pricing.html",
    test: (h) => has(h, "mage/cookies", "magento", "/static/version"),
  },
  {
    id: "squarespace-commerce",
    vendor: "Squarespace Commerce",
    category: "Ecommerce",
    pricingUrl: "https://www.squarespace.com/pricing",
    test: (h) => has(h, "squarespace-commerce"),
  },

  // ---------------- Framework ----------------
  {
    id: "nextjs",
    vendor: "Next.js",
    category: "Framework",
    pricingUrl: "https://nextjs.org/",
    test: (h) => has(h, "__next", "/_next/static"),
  },
  {
    id: "nuxt",
    vendor: "Nuxt",
    category: "Framework",
    pricingUrl: "https://nuxt.com/",
    test: (h) => has(h, "__nuxt", "/_nuxt/"),
  },
  {
    id: "gatsby",
    vendor: "Gatsby",
    category: "Framework",
    pricingUrl: "https://www.gatsbyjs.com/pricing/",
    test: (h) => has(h, "___gatsby", "/page-data/app-data.json"),
  },
  {
    id: "react",
    vendor: "React",
    category: "Framework",
    pricingUrl: "https://react.dev/",
    test: (h) => has(h, "data-reactroot", "react-dom") && !has(h, "__next"),
  },
  {
    id: "vue",
    vendor: "Vue.js",
    category: "Framework",
    pricingUrl: "https://vuejs.org/",
    test: (h) => has(h, "data-v-app", "vue.runtime") && !has(h, "__nuxt"),
  },
  {
    id: "angular",
    vendor: "Angular",
    category: "Framework",
    pricingUrl: "https://angular.dev/",
    test: (h) => has(h, "ng-version", "_nghost"),
  },
  {
    id: "svelte",
    vendor: "Svelte / SvelteKit",
    category: "Framework",
    pricingUrl: "https://svelte.dev/",
    test: (h) => has(h, "svelte-", "__sveltekit"),
  },
  {
    id: "astro",
    vendor: "Astro",
    category: "Framework",
    pricingUrl: "https://astro.build/",
    test: (h) => has(h, "astro-island", "/_astro/"),
  },

  // ---------------- Analytics ----------------
  {
    id: "ga4",
    vendor: "Google Analytics 4",
    category: "Analytics",
    pricingUrl: "https://marketingplatform.google.com/about/analytics/pricing/",
    test: (h) =>
      re(h, /gtag\(['"]config['"],\s*['"]G-/i) ||
      has(h, "googletagmanager.com/gtag/js"),
  },
  {
    id: "universal-analytics",
    vendor: "Google Analytics (Universal / legacy)",
    category: "Analytics",
    pricingUrl: "https://marketingplatform.google.com/about/analytics/pricing/",
    test: (h) => has(h, "google-analytics.com/analytics.js", "ga('create'"),
  },
  {
    id: "plausible",
    vendor: "Plausible Analytics",
    category: "Analytics",
    pricingUrl: "https://plausible.io/#pricing",
    test: (h) => has(h, "plausible.io/js"),
  },
  {
    id: "fathom",
    vendor: "Fathom Analytics",
    category: "Analytics",
    pricingUrl: "https://usefathom.com/pricing",
    test: (h) => has(h, "cdn.usefathom.com"),
  },
  {
    id: "mixpanel",
    vendor: "Mixpanel",
    category: "Analytics",
    pricingUrl: "https://mixpanel.com/pricing/",
    test: (h) => has(h, "cdn.mxpnl.com", "mixpanel.init"),
  },
  {
    id: "amplitude",
    vendor: "Amplitude",
    category: "Analytics",
    pricingUrl: "https://amplitude.com/pricing",
    test: (h) => has(h, "cdn.amplitude.com"),
  },
  {
    id: "segment",
    vendor: "Segment",
    category: "Analytics",
    pricingUrl: "https://segment.com/pricing/",
    test: (h) => has(h, "cdn.segment.com/analytics.js"),
  },

  // ---------------- Tag Manager / Pixels ----------------
  {
    id: "gtm",
    vendor: "Google Tag Manager",
    category: "Tag Manager",
    pricingUrl: "https://marketingplatform.google.com/about/tag-manager/",
    test: (h) =>
      has(h, "googletagmanager.com/gtm.js", "googletagmanager.com/ns.html"),
  },
  {
    id: "meta-pixel",
    vendor: "Meta (Facebook) Pixel",
    category: "Tag Manager",
    pricingUrl: "https://www.facebook.com/business/tools/meta-pixel",
    test: (h) =>
      has(h, "connect.facebook.net", "fbevents.js") ||
      re(h, /fbq\(['"]init['"]/i),
  },
  {
    id: "tiktok-pixel",
    vendor: "TikTok Pixel",
    category: "Tag Manager",
    pricingUrl: "https://ads.tiktok.com/help/article?aid=10021",
    test: (h) => has(h, "analytics.tiktok.com"),
  },
  {
    id: "linkedin-insight",
    vendor: "LinkedIn Insight Tag",
    category: "Tag Manager",
    pricingUrl: "https://www.linkedin.com/help/lms/answer/a427660",
    test: (h) => has(h, "snap.licdn.com/li.lms-analytics"),
  },
  {
    id: "pinterest-tag",
    vendor: "Pinterest Tag",
    category: "Tag Manager",
    pricingUrl:
      "https://help.pinterest.com/en/business/article/install-the-pinterest-tag",
    test: (h) => has(h, "s.pinimg.com/ct/core.js"),
  },
  {
    id: "google-ads-tag",
    vendor: "Google Ads Conversion Tag",
    category: "Tag Manager",
    pricingUrl: "https://ads.google.com/home/pricing/",
    test: (h) => re(h, /gtag\(['"]config['"],\s*['"]AW-/i),
  },

  // ---------------- Chat & Support ----------------
  {
    id: "intercom",
    vendor: "Intercom",
    category: "Chat & Support",
    pricingUrl: "https://www.intercom.com/pricing",
    test: (h) => has(h, "widget.intercom.io", "intercomcdn.com"),
  },
  {
    id: "drift",
    vendor: "Drift",
    category: "Chat & Support",
    pricingUrl: "https://www.drift.com/pricing/",
    test: (h) => has(h, "js.driftt.com", "drift.load"),
  },
  {
    id: "tawk",
    vendor: "Tawk.to",
    category: "Chat & Support",
    pricingUrl: "https://www.tawk.to/pricing/",
    test: (h) => has(h, "embed.tawk.to"),
  },
  {
    id: "tidio",
    vendor: "Tidio",
    category: "Chat & Support",
    pricingUrl: "https://www.tidio.com/pricing/",
    test: (h) => has(h, "code.tidio.co"),
  },
  {
    id: "crisp",
    vendor: "Crisp",
    category: "Chat & Support",
    pricingUrl: "https://crisp.chat/en/pricing/",
    test: (h) => has(h, "client.crisp.chat"),
  },
  {
    id: "zendesk",
    vendor: "Zendesk",
    category: "Chat & Support",
    pricingUrl: "https://www.zendesk.com/pricing/",
    test: (h) => has(h, "static.zdassets.com", "zendesk.com/embeddable"),
  },
  {
    id: "livechat",
    vendor: "LiveChat",
    category: "Chat & Support",
    pricingUrl: "https://www.livechat.com/pricing/",
    test: (h) => has(h, "cdn.livechatinc.com"),
  },
  {
    id: "freshchat",
    vendor: "Freshchat",
    category: "Chat & Support",
    pricingUrl: "https://www.freshworks.com/live-chat-software/pricing/",
    test: (h) => has(h, "wchat.freshchat.com"),
  },
  {
    id: "helpscout",
    vendor: "Help Scout Beacon",
    category: "Chat & Support",
    pricingUrl: "https://www.helpscout.com/pricing/",
    test: (h) => has(h, "beacon-v2.helpscout.net"),
  },
  {
    id: "whatsapp-chat",
    vendor: "WhatsApp click-to-chat",
    category: "Chat & Support",
    pricingUrl: "https://business.whatsapp.com/products/business-platform",
    test: (h) => re(h, /(wa\.me\/|api\.whatsapp\.com\/send)/i),
  },

  // ---------------- CRM & Marketing Automation ----------------
  {
    id: "hubspot",
    vendor: "HubSpot",
    category: "CRM & Marketing Automation",
    pricingUrl: "https://www.hubspot.com/pricing",
    test: (h) => has(h, "js.hs-scripts.com", "js.hsforms.net", "hs-analytics"),
  },
  {
    id: "gohighlevel",
    vendor: "GoHighLevel / LeadConnector",
    category: "CRM & Marketing Automation",
    pricingUrl: "https://www.gohighlevel.com/pricing",
    test: (h) => has(h, "leadconnectorhq.com", "msgsndr.com"),
  },
  {
    id: "activecampaign",
    vendor: "ActiveCampaign",
    category: "CRM & Marketing Automation",
    pricingUrl: "https://www.activecampaign.com/pricing",
    test: (h) => has(h, "trackcmp.net", "activehosted.com"),
  },
  {
    id: "klaviyo",
    vendor: "Klaviyo",
    category: "CRM & Marketing Automation",
    pricingUrl: "https://www.klaviyo.com/pricing",
    test: (h) => has(h, "static.klaviyo.com", "klaviyo.js"),
  },
  {
    id: "mailchimp",
    vendor: "Mailchimp",
    category: "CRM & Marketing Automation",
    pricingUrl: "https://mailchimp.com/pricing/",
    test: (h) => has(h, "chimpstatic.com", "list-manage.com"),
  },
  {
    id: "salesforce",
    vendor: "Salesforce",
    category: "CRM & Marketing Automation",
    pricingUrl: "https://www.salesforce.com/editions-pricing/",
    test: (h) => has(h, "salesforce.com/embeddedservice", "force.com"),
  },
  {
    id: "pardot",
    vendor: "Salesforce Pardot / Account Engagement",
    category: "CRM & Marketing Automation",
    pricingUrl:
      "https://www.salesforce.com/marketing/marketing-automation-pricing/",
    test: (h) => has(h, "pardot.com"),
  },
  {
    id: "marketo",
    vendor: "Marketo",
    category: "CRM & Marketing Automation",
    pricingUrl:
      "https://business.adobe.com/products/marketo/marketo-engage.html",
    test: (h) => has(h, "munchkin.marketo.net"),
  },
  {
    id: "keap",
    vendor: "Keap (Infusionsoft)",
    category: "CRM & Marketing Automation",
    pricingUrl: "https://keap.com/pricing",
    test: (h) => has(h, "infusionsoft.com", "keap.app"),
  },
  {
    id: "zoho-crm",
    vendor: "Zoho CRM / SalesIQ",
    category: "CRM & Marketing Automation",
    pricingUrl: "https://www.zoho.com/crm/zohocrm-pricing.html",
    test: (h) => has(h, "salesiq.zoho", "zoho.com/crm"),
  },
  {
    id: "n8n",
    vendor: "n8n (workflow automation, likely webhook-only)",
    category: "CRM & Marketing Automation",
    pricingUrl: "https://n8n.io/pricing/",
    test: (h) => has(h, "n8n.cloud", "/webhook/n8n"),
  },
  {
    id: "zapier",
    vendor: "Zapier (embedded form/webhook)",
    category: "CRM & Marketing Automation",
    pricingUrl: "https://zapier.com/pricing",
    test: (h) => has(h, "zapier.com/hooks", "zapierapp.com"),
  },

  // ---------------- Payments ----------------
  {
    id: "stripe",
    vendor: "Stripe",
    category: "Payments",
    pricingUrl: "https://stripe.com/pricing",
    test: (h) => has(h, "js.stripe.com", "checkout.stripe.com"),
  },
  {
    id: "paypal",
    vendor: "PayPal",
    category: "Payments",
    pricingUrl: "https://www.paypal.com/us/webapps/mpp/merchant-fees",
    test: (h) => has(h, "paypal.com/sdk/js", "paypalobjects.com"),
  },
  {
    id: "square",
    vendor: "Square",
    category: "Payments",
    pricingUrl: "https://squareup.com/us/en/payments/pricing",
    test: (h) => has(h, "squarecdn.com", "square.site"),
  },
  {
    id: "braintree",
    vendor: "Braintree",
    category: "Payments",
    pricingUrl: "https://www.braintreepayments.com/pricing",
    test: (h) => has(h, "js.braintreegateway.com"),
  },

  // ---------------- Scheduling & Booking ----------------
  {
    id: "calendly",
    vendor: "Calendly",
    category: "Scheduling & Booking",
    pricingUrl: "https://calendly.com/pricing",
    test: (h) => has(h, "calendly.com", "assets.calendly.com"),
  },
  {
    id: "cal-com",
    vendor: "Cal.com",
    category: "Scheduling & Booking",
    pricingUrl: "https://cal.com/pricing",
    test: (h) => has(h, "cal.com/embed", "app.cal.com"),
  },
  {
    id: "acuity",
    vendor: "Acuity Scheduling",
    category: "Scheduling & Booking",
    pricingUrl: "https://www.acuityscheduling.com/pricing/",
    test: (h) => has(h, "acuityscheduling.com"),
  },
  {
    id: "setmore",
    vendor: "Setmore",
    category: "Scheduling & Booking",
    pricingUrl: "https://www.setmore.com/pricing",
    test: (h) => has(h, "setmore.com"),
  },
  {
    id: "square-appointments",
    vendor: "Square Appointments",
    category: "Scheduling & Booking",
    pricingUrl: "https://squareup.com/us/en/appointments/pricing",
    test: (h) => has(h, "squareup.com/appointments", "book.squareup.com"),
  },

  // ---------------- Forms ----------------
  {
    id: "typeform",
    vendor: "Typeform",
    category: "Forms",
    pricingUrl: "https://www.typeform.com/pricing/",
    test: (h) => has(h, "embed.typeform.com"),
  },
  {
    id: "jotform",
    vendor: "Jotform",
    category: "Forms",
    pricingUrl: "https://www.jotform.com/pricing/",
    test: (h) => has(h, "jotform.com/s/umd", "form.jotform.com"),
  },
  {
    id: "gravity-forms",
    vendor: "Gravity Forms",
    category: "Forms",
    pricingUrl: "https://www.gravityforms.com/pricing/",
    test: (h) => has(h, "gform_wrapper", "gravityforms"),
  },
  {
    id: "wpforms",
    vendor: "WPForms",
    category: "Forms",
    pricingUrl: "https://wpforms.com/pricing/",
    test: (h) => has(h, "wpforms-container"),
  },
  {
    id: "formspree",
    vendor: "Formspree",
    category: "Forms",
    pricingUrl: "https://formspree.io/plans",
    test: (h) => has(h, "formspree.io/f/"),
  },
  {
    id: "ninja-forms",
    vendor: "Ninja Forms",
    category: "Forms",
    pricingUrl: "https://ninjaforms.com/pricing/",
    test: (h) => has(h, "nf-form-", "ninja-forms"),
  },

  // ---------------- Email Capture / Popups ----------------
  {
    id: "optinmonster",
    vendor: "OptinMonster",
    category: "Email Capture",
    pricingUrl: "https://optinmonster.com/pricing/",
    test: (h) => has(h, "optinmonster.com", "omappapi.com"),
  },
  {
    id: "sumo",
    vendor: "Sumo",
    category: "Email Capture",
    pricingUrl: "https://sumo.com/",
    test: (h) => has(h, "load.sumo.com"),
  },
  {
    id: "privy",
    vendor: "Privy",
    category: "Email Capture",
    pricingUrl: "https://www.privy.com/pricing",
    test: (h) => has(h, "widget.privy.com"),
  },
  {
    id: "convertkit",
    vendor: "ConvertKit (Kit)",
    category: "Email Capture",
    pricingUrl: "https://kit.com/pricing",
    test: (h) => has(h, "convertkit.com", "ck.page"),
  },

  // ---------------- A/B Testing & CRO ----------------
  {
    id: "optimizely",
    vendor: "Optimizely",
    category: "A/B Testing & CRO",
    pricingUrl: "https://www.optimizely.com/pricing/",
    test: (h) => has(h, "cdn.optimizely.com"),
  },
  {
    id: "vwo",
    vendor: "VWO",
    category: "A/B Testing & CRO",
    pricingUrl: "https://vwo.com/pricing/",
    test: (h) => has(h, "dev.visualwebsiteoptimizer.com"),
  },
  {
    id: "google-optimize",
    vendor: "Google Optimize (legacy)",
    category: "A/B Testing & CRO",
    pricingUrl: "https://marketingplatform.google.com/about/optimize/",
    test: (h) => has(h, "googleoptimize.com/optimize.js"),
  },

  // ---------------- Session Recording ----------------
  {
    id: "hotjar",
    vendor: "Hotjar",
    category: "Session Recording",
    pricingUrl: "https://www.hotjar.com/pricing/",
    test: (h) => has(h, "static.hotjar.com"),
  },
  {
    id: "clarity",
    vendor: "Microsoft Clarity",
    category: "Session Recording",
    pricingUrl: "https://clarity.microsoft.com/",
    test: (h) => has(h, "clarity.ms/tag"),
  },
  {
    id: "fullstory",
    vendor: "FullStory",
    category: "Session Recording",
    pricingUrl: "https://www.fullstory.com/pricing/",
    test: (h) => has(h, "fullstory.com/s/fs.js"),
  },
  {
    id: "logrocket",
    vendor: "LogRocket",
    category: "Session Recording",
    pricingUrl: "https://logrocket.com/pricing/",
    test: (h) => has(h, "cdn.lr-in.com", "cdn.logrocket.io"),
  },

  // ---------------- CDN & Hosting ----------------
  {
    id: "cloudflare",
    vendor: "Cloudflare",
    category: "CDN & Hosting",
    pricingUrl: "https://www.cloudflare.com/plans/",
    test: (h) => has(h, "cdn-cgi/"),
  },
  {
    id: "vercel",
    vendor: "Vercel",
    category: "CDN & Hosting",
    pricingUrl: "https://vercel.com/pricing",
    test: (h) => has(h, "_vercel/insights", "vercel.live"),
  },
  {
    id: "netlify",
    vendor: "Netlify",
    category: "CDN & Hosting",
    pricingUrl: "https://www.netlify.com/pricing/",
    test: (h) => has(h, "netlify-cdp.com", "identity.netlify.com"),
  },

  // ---------------- Reviews & Trust ----------------
  {
    id: "trustpilot",
    vendor: "Trustpilot",
    category: "Reviews & Trust",
    pricingUrl: "https://business.trustpilot.com/plans",
    test: (h) => has(h, "widget.trustpilot.com"),
  },
  {
    id: "judgeme",
    vendor: "Judge.me",
    category: "Reviews & Trust",
    pricingUrl: "https://judge.me/pricing",
    test: (h) => has(h, "judge.me/widgets"),
  },
  {
    id: "yotpo",
    vendor: "Yotpo",
    category: "Reviews & Trust",
    pricingUrl: "https://www.yotpo.com/pricing/",
    test: (h) => has(h, "staticw2.yotpo.com"),
  },
];

/** Detects vendors present in the given HTML — returns matched signatures. */
export function detectStack(html: string): StackSignature[] {
  return TECH_STACK_SIGNATURES.filter((sig) => {
    try {
      return sig.test(html);
    } catch {
      return false;
    }
  });
}
