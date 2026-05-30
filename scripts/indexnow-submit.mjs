// IndexNow submitter — pings Bing/Yandex/Seznam (NOT Google, which ignores IndexNow as of 2026).
// Primary value: Bing index feeds ChatGPT Search retrieval → AEO surfacing.
//
// Usage:
//   node scripts/indexnow-submit.mjs                 # submit ALL sitemap URLs
//   node scripts/indexnow-submit.mjs <url> [<url>...] # submit specific URLs (post-deploy delta)
//
// Run after a deploy. Key file must be live at https://<host>/<KEY>.txt first.

const KEY = "85af3d697899ea35cf4952bc0abb75e8";
const HOST = "skynetjoe.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";
const SITEMAP = `https://${HOST}/sitemap.xml`;

async function urlsFromSitemap() {
  const res = await fetch(SITEMAP);
  if (!res.ok) throw new Error(`sitemap fetch ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

async function submit(urlList) {
  // IndexNow accepts up to 10,000 URLs per POST.
  const body = { host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList };
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  // 200 = accepted, 202 = accepted/validation pending. Both are success.
  console.log(`IndexNow ${res.status} — submitted ${urlList.length} URL(s)`, text ? `· ${text}` : "");
  if (res.status !== 200 && res.status !== 202) process.exit(1);
}

const args = process.argv.slice(2);
const urls = args.length ? args : await urlsFromSitemap();
if (!urls.length) {
  console.error("no URLs to submit");
  process.exit(1);
}
await submit(urls);
