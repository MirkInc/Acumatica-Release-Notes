# Git Release Branch Workflow

Use one product branch per product, with one commit per release version.

## Recommended Sequence

1. Merge the base app branch first:

   ```powershell
   # Review and merge the base app PR before publishing release-note branches.
   ```

2. From an updated local checkout, run a dry run:

   ```powershell
   .\scripts\publish-product-releases.ps1 -All -BaseRef origin/main -PrBase main -DryRun
   ```

3. Create product branches, commit each release version separately, push, and open draft PRs:

   ```powershell
   .\scripts\publish-product-releases.ps1 -All -BaseRef origin/main -PrBase main -Push -CreatePr
   ```

## Publish One Product

```powershell
.\scripts\publish-product-releases.ps1 `
  -Products acumatica-mirk-customizations `
  -BaseRef origin/main `
  -PrBase main `
  -Push `
  -CreatePr
```

## Product Branches Created

The script uses these branch names by default:

```text
codex/releases/acumatica-mirk-customizations
codex/releases/nawmirk
codex/releases/rental360
```

## Commit Shape

Each release Markdown file becomes one commit:

```text
Add acumatica-mirk-customizations release 2026.04.28
Add nawmirk release 24R1 250515
Add rental360 release 260331
```

Each commit includes:

```text
Co-authored-by: Codex <noreply@openai.com>
```

## If the Base App Branch Is Not Merged Yet

To preview product PRs before the base app is merged, target the base app branch instead:

```powershell
.\scripts\publish-product-releases.ps1 `
  -All `
  -BaseRef origin/codex/base-release-notes-app `
  -PrBase codex/base-release-notes-app `
  -Push `
  -CreatePr
```

After the base app merges, retarget those PRs to `main`.

## Append to an Existing Product Branch

If a product branch already exists and you want to add newly created release notes to it:

```powershell
.\scripts\publish-product-releases.ps1 `
  -Products rental360 `
  -BaseRef origin/main `
  -PrBase main `
  -ContinueExisting `
  -Push `
  -CreatePr
```
