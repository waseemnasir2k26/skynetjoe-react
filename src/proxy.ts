import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Internal design/inventory pages. They are `noindex`, but noindex only stops
// ranking — not direct access. Block them at request time in production so the
// internal hero/gradient labs and the full site-inventory dashboard aren't
// publicly reachable. They stay fully usable in local dev.
//   Note: an in-page `if (NODE_ENV === "production") notFound()` guard does NOT
//   fire on these `force-static` prerendered routes, so the gate lives here.
//   (Next 16: `middleware` was renamed to `proxy`.)
const BLOCKED_IN_PROD = ["/gradient-lab", "/hero-lab", "/site-stats"];

export function proxy(req: NextRequest) {
  // Canonical-host redirect: www.skynetjoe.com serves 200 with zero redirects,
  // splitting equity with the apex (canonical + sitemap are non-www). Scoped
  // to the exact www host so local dev and previews never touch it.
  const host = req.headers.get("host") ?? "";
  if (host === "www.skynetjoe.com") {
    const url = req.nextUrl.clone();
    url.host = "skynetjoe.com";
    url.protocol = "https";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  if (
    process.env.NODE_ENV === "production" &&
    BLOCKED_IN_PROD.includes(req.nextUrl.pathname)
  ) {
    // Rewrite to a non-existent path → Next serves not-found.tsx with a 404.
    return NextResponse.rewrite(new URL("/_blocked-internal", req.url));
  }
  return NextResponse.next();
}

export const config = {
  // Broad matcher (minus static assets) so the host redirect covers every
  // route; the prod block above still only fires on its 3 paths.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
