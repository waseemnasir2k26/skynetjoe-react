#!/usr/bin/env bash
#
# deploy-archive.sh — build a Hostinger source-archive for skynetjoe.com.
#
# The REAL deploy mechanism for skynetjoe.com is a MANUAL ZIP-ARCHIVE upload,
# NOT GitHub auto-deploy. See DEPLOY-REAL.md at the repo root for the full story.
#
# This script produces ./skynetjoe-deploy.zip containing ONLY git-tracked source
# (no node_modules, no .next, no .git). Hostinger then runs
# `npm install && npm run build` server-side and serves the standalone output.
#
# Idempotent (re-running overwrites the zip) and safe (read-only on the working
# tree — never stages, commits, or pushes).
#
#   Domain ......... skynetjoe.com
#   Hostinger user . u361032549
#   App type ....... next (node 20, output: standalone, build script "build")
#   Trigger ........ MCP tool hosting_deployJsApplication (operator/Claude runs)

set -euo pipefail

OUT_FILE="${1:-skynetjoe-deploy.zip}"

# ── Locate repo root (this script lives in <root>/scripts) ───────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"
echo "Repo root: $REPO_ROOT"

# ── Guard: must be inside a git work tree ────────────────────────────────────
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "ERROR: Not a git repository: $REPO_ROOT" >&2
  exit 1
fi

# ── Working-tree cleanliness (warn only — archive is built from HEAD) ─────────
if [ -n "$(git status --porcelain)" ]; then
  echo "WARNING: Working tree is DIRTY. The archive is built from HEAD (committed" >&2
  echo "         state) — uncommitted changes below will NOT be included:" >&2
  git status --porcelain | sed 's/^/    /' >&2
else
  echo "Working tree clean."
fi

# ── Resolve absolute output path + remove any stale archive ──────────────────
ABS_OUT="$REPO_ROOT/$OUT_FILE"
if [ -f "$ABS_OUT" ]; then
  echo "Removing stale archive: $ABS_OUT"
  rm -f "$ABS_OUT"
fi

# ── Build the source archive from HEAD ───────────────────────────────────────
# git archive only ever emits git-TRACKED files, so node_modules/.next/.git are
# excluded by construction. We sanity-check that below anyway.
echo "Building source archive from HEAD..."
git archive --format=zip -o "$ABS_OUT" HEAD

if [ ! -f "$ABS_OUT" ]; then
  echo "ERROR: git archive failed." >&2
  exit 1
fi

# ── Report: path / size / commit / branch ────────────────────────────────────
SIZE_BYTES=$(wc -c < "$ABS_OUT" | tr -d ' ')
if command -v numfmt >/dev/null 2>&1; then
  SIZE_HUMAN=$(numfmt --to=iec --suffix=B "$SIZE_BYTES")
else
  SIZE_HUMAN="${SIZE_BYTES} bytes"
fi
SHA="$(git rev-parse HEAD)"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"

# ── Sanity-check the zip contents ────────────────────────────────────────────
# Prefer `unzip -Z1`; fall back to `zipinfo -1`.
if command -v unzip >/dev/null 2>&1; then
  ENTRIES="$(unzip -Z1 "$ABS_OUT")"
elif command -v zipinfo >/dev/null 2>&1; then
  ENTRIES="$(zipinfo -1 "$ABS_OUT")"
else
  echo "ERROR: need 'unzip' or 'zipinfo' to verify the archive." >&2
  exit 1
fi

PROBLEMS=()

# Required files (exact match on a line).
for f in "package.json" "next.config.ts"; do
  if ! grep -qx "$f" <<< "$ENTRIES"; then
    PROBLEMS+=("MISSING required file: $f")
  fi
done

# Forbidden paths (any entry starting with these prefixes).
for bad in "node_modules/" ".next/" ".git/"; do
  HIT="$(grep -m1 "^${bad}" <<< "$ENTRIES" || true)"
  if [ -n "$HIT" ]; then
    PROBLEMS+=("FORBIDDEN path present: $HIT")
  fi
done

if [ "${#PROBLEMS[@]}" -gt 0 ]; then
  echo "" >&2
  echo "ERROR: Archive sanity check FAILED:" >&2
  for p in "${PROBLEMS[@]}"; do echo "    $p" >&2; done
  rm -f "$ABS_OUT"
  exit 1
fi

# ── Success report ───────────────────────────────────────────────────────────
echo ""
echo "==================== ARCHIVE READY ===================="
echo "  Path   : $ABS_OUT"
echo "  Size   : $SIZE_HUMAN ($SIZE_BYTES bytes)"
echo "  Commit : $SHA"
echo "  Branch : $BRANCH"
echo "  Sanity : package.json + next.config.ts present; no node_modules/.next/.git"
echo "======================================================="

# ── Next step: the MCP deploy call (operator / Claude runs this) ──────────────
cat <<EOF

NEXT STEP — trigger the deploy via the Hostinger MCP tool:

  hosting_deployJsApplication
    domain      : skynetjoe.com
    archivePath : $ABS_OUT

  (Hostinger then runs \`npm install && npm run build\` server-side.)

  Check status of recent deploys:
    hosting_listJsDeployments
      domain : skynetjoe.com

  Read build/runtime logs for a deployment:
    hosting_showJsDeploymentLogs
      domain       : skynetjoe.com
      deploymentId : <id from hosting_listJsDeployments>

  ROLLBACK: re-archive an older commit and redeploy, e.g.
    git archive --format=zip -o $OUT_FILE d1db17a
    then hosting_deployJsApplication with that archivePath.
  See DEPLOY-REAL.md for the full rollback + env-var notes.
EOF
