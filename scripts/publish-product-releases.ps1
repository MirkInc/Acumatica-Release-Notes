param(
  [string[]]$Products = @(),
  [switch]$All,
  [string]$BaseRef = "origin/main",
  [string]$PrBase = "main",
  [string]$BranchPrefix = "codex/releases",
  [switch]$ContinueExisting,
  [switch]$Push,
  [switch]$CreatePr,
  [switch]$ReadyForReview,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

function Invoke-Step {
  param(
    [string]$Command,
    [string[]]$Arguments
  )

  Write-Host "> $Command $($Arguments -join ' ')"

  if ($DryRun) {
    return
  }

  & $Command @Arguments

  if ($LASTEXITCODE -ne 0) {
    throw "Command failed: $Command $($Arguments -join ' ')"
  }
}

function Get-GitOutput {
  param([string[]]$Arguments)

  $output = & git @Arguments

  if ($LASTEXITCODE -ne 0) {
    throw "git $($Arguments -join ' ') failed"
  }

  return $output
}

function Test-GitRef {
  param([string]$Ref)

  & git show-ref --verify --quiet $Ref
  return $LASTEXITCODE -eq 0
}

function Get-ReleaseMetadata {
  param([System.IO.FileInfo]$File)

  $content = Get-Content -LiteralPath $File.FullName -Raw
  $version = $File.BaseName
  $releasedAt = ""

  if ($content -match '(?s)^---\s*(.*?)\s*---') {
    $frontmatter = $Matches[1]

    if ($frontmatter -match '(?m)^version:\s*"?([^\r\n"]+)"?\s*$') {
      $version = $Matches[1].Trim()
    }

    if ($frontmatter -match '(?m)^releasedAt:\s*"?([^\r\n"]+)"?\s*$') {
      $releasedAt = $Matches[1].Trim()
    }
  }

  [PSCustomObject]@{
    File = $File
    Version = $version
    ReleasedAt = $releasedAt
    SortKey = if ($releasedAt) { $releasedAt } else { $File.BaseName }
  }
}

function ConvertTo-RepoPath {
  param([string]$Path)

  return $Path.Replace("\", "/")
}

function Get-ProductsToPublish {
  if ($All) {
    return Get-ChildItem -LiteralPath "content/products" -Directory |
      Where-Object { Test-Path -LiteralPath (Join-Path $_.FullName "releases") } |
      Select-Object -ExpandProperty Name
  }

  if ($Products.Count -eq 0) {
    throw "Provide -Products <slug> or use -All."
  }

  return $Products
}

if (-not (Test-Path -LiteralPath ".git")) {
  throw "Run this script from the repository root."
}

if ($CreatePr -and -not $DryRun) {
  Invoke-Step "gh" @("auth", "status")
}

Invoke-Step "git" @("fetch", "origin")

$productsToPublish = Get-ProductsToPublish

foreach ($productSlug in $productsToPublish) {
  $releaseDirectory = Join-Path "content/products" (Join-Path $productSlug "releases")

  if (-not (Test-Path -LiteralPath $releaseDirectory)) {
    Write-Warning "Skipping $productSlug because $releaseDirectory does not exist."
    continue
  }

  $releaseFiles = Get-ChildItem -LiteralPath $releaseDirectory -Filter "*.md" -File |
    ForEach-Object { Get-ReleaseMetadata $_ } |
    Sort-Object SortKey, Version, { $_.File.Name }

  if ($releaseFiles.Count -eq 0) {
    Write-Warning "Skipping $productSlug because it has no release Markdown files."
    continue
  }

  $branchName = "$BranchPrefix/$productSlug"
  $branchRef = "refs/heads/$branchName"
  $branchExists = Test-GitRef $branchRef

  if ($branchExists) {
    if (-not $ContinueExisting) {
      throw "Branch $branchName already exists. Rerun with -ContinueExisting to append to it."
    }

    Invoke-Step "git" @("switch", $branchName)
  } else {
    Invoke-Step "git" @("switch", "-c", $branchName, $BaseRef)
  }

  foreach ($release in $releaseFiles) {
    $repoPath = ConvertTo-RepoPath $release.File.FullName.Substring((Get-Location).Path.Length + 1)

    $trackedFiles = & git ls-files -- $repoPath
    $alreadyTracked = $trackedFiles -contains $repoPath

    if ($alreadyTracked) {
      Write-Host "Skipping already tracked release: $repoPath"
      continue
    }

    Invoke-Step "git" @("add", "--", $repoPath)

    if ($DryRun) {
      Write-Host "Would commit $repoPath as release $($release.Version)"
      continue
    }

    & git diff --cached --quiet -- $repoPath

    if ($LASTEXITCODE -eq 0) {
      Write-Host "Skipping unchanged release: $repoPath"
      continue
    }

    Invoke-Step "git" @(
      "commit",
      "-m",
      "Add $productSlug release $($release.Version)",
      "-m",
      "Co-authored-by: Codex <noreply@openai.com>"
    )
  }

  if ($Push) {
    Invoke-Step "git" @("push", "-u", "origin", $branchName)
  }

  if ($CreatePr) {
    $body = @"
Adds release-note Markdown for the $productSlug product.

Each release version is committed separately so the branch history can be reviewed version by version.

Validation:
- Release files only; app-level checks should be run after the base app branch is merged.

Co-authored-by: Codex <noreply@openai.com>
"@

    $prArgs = @(
      "pr",
      "create",
      "--base",
      $PrBase,
      "--head",
      $branchName,
      "--title",
      "Add $productSlug release notes",
      "--body",
      $body
    )

    if (-not $ReadyForReview) {
      $prArgs += "--draft"
    }

    Invoke-Step "gh" $prArgs
  }
}
