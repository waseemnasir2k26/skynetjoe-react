import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// (Next 16: `middleware` was renamed to `proxy`.) The gradient-lab / hero-lab /
// site-stats prod block was removed with those routes (2026-09-21).

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
  return NextResponse.next();
}

export const config = {
  // Broad matcher (minus static assets) so the host redirect covers every
  // route.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
