<#
.SYNOPSIS
  Build a Hostinger source-archive for skynetjoe.com (Windows / PowerShell).

.DESCRIPTION
  The REAL deploy mechanism for skynetjoe.com is a MANUAL ZIP-ARCHIVE upload,
  NOT GitHub auto-deploy. See DEPLOY-REAL.md at the repo root for the full story.

  This script produces ./skynetjoe-deploy.zip containing ONLY git-tracked source
  (no node_modules, no .next, no .git). Hostinger then runs
  "npm install && npm run build" server-side and serves the standalone output.

  It is idempotent (re-running just overwrites the zip) and safe (read-only on
  the working tree - it never stages, commits, or pushes).

.NOTES
  Domain ......... skynetjoe.com
  Hostinger user . u361032549
  App type ....... next (node 20, output: standalone, build script "build")
  Trigger ........ MCP tool hosting_deployJsApplication (operator/Claude runs it)
#>

[CmdletBinding()]
param(
  # Output archive name; resolved relative to repo root.
  [string]$OutFile = "skynetjoe-deploy.zip"
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

# -- Locate repo root (this script lives in <root>/scripts) -------------------
$RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $RepoRoot
Write-Host "Repo root: $RepoRoot" -ForegroundColor Cyan

# -- Guard: must be inside a git work tree ------------------------------------
git rev-parse --is-inside-work-tree *> $null
if ($LASTEXITCODE -ne 0) {
  Write-Error "Not a git repository: $RepoRoot"
  exit 1
}

# -- Working-tree cleanliness (warn only; git archive uses HEAD, not the WT) --
$dirty = git status --porcelain
if ($dirty) {
  Write-Warning "Working tree is DIRTY. The archive is built from HEAD (committed"
  Write-Warning "state) - uncommitted changes below will NOT be included:"
  $dirty | ForEach-Object { Write-Host "    $_" -ForegroundColor Yellow }
} else {
  Write-Host "Working tree clean." -ForegroundColor Green
}

# -- Resolve the output path absolutely + remove any stale archive -----------
$AbsOut = Join-Path $RepoRoot $OutFile
if (Test-Path $AbsOut) {
  Write-Host "Removing stale archive: $AbsOut" -ForegroundColor DarkGray
  Remove-Item $AbsOut -Force
}

# -- Build the source archive from HEAD --------------------------------------
# git archive only ever emits git-TRACKED files, so node_modules/.next/.git are
# excluded by construction. We sanity-check that below anyway.
Write-Host "Building source archive from HEAD..." -ForegroundColor Cyan
git archive --format=zip -o $AbsOut HEAD
if ($LASTEXITCODE -ne 0 -or -not (Test-Path $AbsOut)) {
  Write-Error "git archive failed."
  exit 1
}

# -- Report: path / size / commit / branch -----------------------------------
$sizeBytes = (Get-Item $AbsOut).Length
$sizeMB    = [math]::Round($sizeBytes / 1MB, 2)
$sha       = (git rev-parse HEAD).Trim()
$branch    = (git rev-parse --abbrev-ref HEAD).Trim()

# -- Sanity-check the zip contents -------------------------------------------
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead($AbsOut)
try {
  $entries = $zip.Entries | ForEach-Object { $_.FullName }
} finally {
  $zip.Dispose()
}

$mustHave = @("package.json", "next.config.ts")
$mustNot  = @("node_modules/", ".next/", ".git/")
$problems = @()

foreach ($f in $mustHave) {
  if (-not ($entries -contains $f)) {
    $problems += "MISSING required file: $f"
  }
}
foreach ($bad in $mustNot) {
  $hit = $entries | Where-Object { $_ -like "$bad*" } | Select-Object -First 1
  if ($hit) {
    $problems += "FORBIDDEN path present: $hit"
  }
}

if ($problems.Count -gt 0) {
  Write-Host ""
  Write-Error "Archive sanity check FAILED:"
  $problems | ForEach-Object { Write-Host "    $_" -ForegroundColor Red }
  Remove-Item $AbsOut -Force -ErrorAction SilentlyContinue
  exit 1
}

# -- Success report ----------------------------------------------------------
Write-Host ""
Write-Host "==================== ARCHIVE READY ====================" -ForegroundColor Green
Write-Host "  Path   : $AbsOut"
Write-Host "  Size   : $sizeMB MB ($sizeBytes bytes)"
Write-Host "  Commit : $sha"
Write-Host "  Branch : $branch"
Write-Host "  Sanity : package.json + next.config.ts present; no node_modules/.next/.git" -ForegroundColor Green
Write-Host "=======================================================" -ForegroundColor Green

# -- Next step: the MCP deploy call (operator / Claude runs this) -------------
Write-Host ""
Write-Host "NEXT STEP - trigger the deploy via the Hostinger MCP tool:" -ForegroundColor Cyan

# Built as a line array (not a here-string) so this script parses identically
# under both Windows PowerShell 5.1 and PowerShell 7+ regardless of line endings.
# Each line is a plain single-quoted literal, so backticks / ampersands / '<' /
# '$' are never interpreted.
$nextSteps = @(
  '',
  '  hosting_deployJsApplication',
  '    domain      : skynetjoe.com',
  ('    archivePath : ' + $AbsOut),
  '',
  '  (Hostinger then runs "npm install && npm run build" server-side.)',
  '',
  '  Check status of recent deploys:',
  '    hosting_listJsDeployments',
  '      domain : skynetjoe.com',
  '',
  '  Read build/runtime logs for a deployment:',
  '    hosting_showJsDeploymentLogs',
  '      domain       : skynetjoe.com',
  '      deploymentId : (id from hosting_listJsDeployments)',
  '',
  '  ROLLBACK: re-archive an older commit and redeploy, e.g.',
  ('    git archive --format=zip -o ' + $OutFile + ' d1db17a'),
  '    then hosting_deployJsApplication with that archivePath.',
  '  See DEPLOY-REAL.md for the full rollback + env-var notes.'
) -join [Environment]::NewLine

Write-Host $nextSteps -ForegroundColor Gray
