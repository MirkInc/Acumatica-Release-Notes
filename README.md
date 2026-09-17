# Product Release Notes

Password-protected Next.js release notes viewer for multiple products, including Acumatica MIRK.Customizations and future Rental360 releases.

## Local Development

Use Node.js 24, matching the GitHub Actions workflows.

TypeScript runs side by side: `@typescript/native` provides TypeScript 7's `tsc` for `npm run typecheck`, while the `typescript` alias provides the TypeScript 6 compiler API required by Next.js builds and typescript-eslint. Keep both aliases until those tools support the native compiler API. This follows [Microsoft's TypeScript migration guidance](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0).

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`. Unauthenticated visitors are redirected to `/login`.

Set `AUTH_PASSWORDS` in `.env.local` as a comma-separated list of authorized passwords.

ESLint 10 uses `@eslint/compat` in `eslint.config.mjs` to preserve Next.js's lint rules while its bundled plugins still call removed APIs such as `context.getFilename()`. Remove the compatibility wrapper when all bundled plugins support ESLint 10 natively.

## Product Content

Products live under `content/products`.

```text
content/products/
  acumatica-mirk-customizations/
    product.json
    releases/
      2026-04-28.md
  rental360/
    product.json
    releases/
      2026-05-01.md
```

Each `product.json` file uses:

```json
{
  "name": "Rental360",
  "slug": "rental360",
  "description": "Rental360 release notes."
}
```

Each release file uses Markdown with frontmatter:

```md
---
version: "2026.04.28"
slug: "2026-04-28"
title: "MIRK.Customizations Release Notes"
comparison: "2026.02.12 to 2026.04.28"
majorVersion: "25R2"
majorVersionLabel: "Major"
build: "25.201.0213"
buildLabel: "Build"
releasedAt: "2026-04-28"
---
```

Routes follow this structure:

```text
/{product}/{release}
/acumatica-mirk-customizations/2026-04-28
/rental360/2026-05-01
```

The shorter `/{product}` route redirects to that product's latest release.

## Release Note Standards

Reusable release-note authoring docs live in `docs/`:

- [Release Notes Template](docs/release-notes-template.md)
- [Release Notes Documentation Guidelines](docs/release-notes-guidelines.md)

Use these when creating new release notes for Acumatica MIRK.Customizations, Rental360, or future products.

## Automated Dependency Fixes

The [NPM Audit Fix workflow](.github/workflows/npm-audit-fix.yml) runs daily at 00:00 UTC or manually from **Actions > NPM Audit Fix > Run workflow** once it is on the default branch.

It installs dependencies, applies compatible audit fixes, and checks lint, optional tests, the production build, and types before opening or updating `chore/npm-audit-fix`. PRs contain only `package.json` and `package-lock.json` changes and use the `dependencies` and `security` labels. The action skips creating a PR when there is no diff and cleans up obsolete branches on later runs.

Set the Actions secret `NPM_AUDIT_FIX_TOKEN` to a fine-grained PAT with **Contents: Read and write** and **Pull requests: Read and write** for **MirkInc/Acumatica-Release-Notes**. A token scoped only to another repository will not work here. Keep the token valid and approved by the organization if required; never commit its value. Using the PAT lets the generated PR trigger the existing CI workflows.

Run the same fix locally with `npm run audit-fix`. It uses `npm audit fix --audit-level=none` without `--force`: unresolved vulnerabilities remain in the report for manual review, while available fixes can still become a PR. Installation failures and failed validation checks stop the workflow.

## Deployment

The app is optimized for Vercel. Deploy with:

```bash
npx vercel --prod --yes
```

Set these environment variables in Vercel:

- `AUTH_PASSWORDS` - comma-separated authorized login passwords.
- `AUTH_SESSION_SECRET` - project-specific session-signing secret.

The app includes a fallback session secret so it can run without extra setup, but a project-specific secret is recommended for production.
