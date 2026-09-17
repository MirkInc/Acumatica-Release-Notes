# AGENTS.md

## Overview

This repository contains a password-protected Next.js release notes viewer and Markdown release-note content for multiple products.

Primary responsibilities:

- Host release notes by product and release.
- Keep release-note content readable for non-technical stakeholders.
- Preserve technical implementation details for developers and support teams.
- Provide reusable authoring standards for future human or AI-generated release notes.

## Current Project Structure

- `src/` - Next.js application source.
- `content/products/` - Product metadata and release-note Markdown files.
- `docs/release-notes-template.md` - Reusable release notes template.
- `docs/release-notes-guidelines.md` - Authoring guidelines for release notes.
- `README.md` - Setup, content structure, routing, and deployment notes.

## Available Agents

No executable agents are currently implemented in this repository.

| Agent Name | Purpose | Key Capabilities | Invocation |
| --- | --- | --- | --- |
| None | Not applicable | Not applicable | Not applicable |

## Release Notes Authoring Standard

Any AI agent or team member creating release notes in this repository should use:

1. `docs/release-notes-template.md`
2. `docs/release-notes-guidelines.md`

Release notes should follow this top-level structure:

1. Features Overview
2. Features Removed or Altered
3. Technical Details
4. Comparison Notes

Write the first two sections for non-technical stakeholders. Preserve schema changes, file changes, and detailed comparisons in the technical sections. Do not include internal testing plans in release notes.

## Product Content Layout

Products live under `content/products`.

```text
content/products/
  {product-slug}/
    product.json
    releases/
      {release-slug}.md
```

Each product should define `product.json` with:

- `name`
- `slug`
- `description`

Each release should include valid frontmatter as described in `docs/release-notes-template.md`.

## Development Commands

```bash
npm install
npm run dev
npm run lint
npm run build
npm run audit-fix
```

## Automation Workflows

- `.github/workflows/npm-audit-fix.yml` runs daily at 00:00 UTC and can be started manually from Actions > NPM Audit Fix > Run workflow. It uses Node.js 24, runs `npm ci` and `npm run audit-fix`, validates lint, optional tests, build, and types, then creates or updates `chore/npm-audit-fix` against the default branch. Only `package.json` and `package-lock.json` are committed.
- `npm run audit-fix` runs `npm audit fix --audit-level=none`. Compatible fixes are applied without `--force`; remaining vulnerabilities stay visible in the log without blocking a PR containing partial fixes. Installation and validation failures still stop the workflow.
- Required credential: the `NPM_AUDIT_FIX_TOKEN` Actions secret must contain a PAT authorized for `MirkInc/Acumatica-Release-Notes` with Contents and Pull requests read/write permissions. A token limited to another repository cannot be used. Do not commit the token. Maintain its expiry and any required organization approval.
- Automated PRs use the `dependencies` and `security` repository labels. The PR action handles change detection and removes obsolete branches on subsequent successful runs.
- `.github/workflows/tests.yml` uses Node.js 24 for pull-request and push validation.

## Configuration

The app uses password-based session authentication.

Recommended deployment configuration:

- `AUTH_SESSION_SECRET` - project-specific session-signing secret for deployed environments.

Do not commit secrets, credentials, customer private data, or environment-specific sensitive values.

## Maintenance Notes

When adding or changing release-note content:

1. Follow `docs/release-notes-guidelines.md`.
2. Place the release under the correct product folder.
3. Include major version and exact build metadata when applicable.
4. Run `npm run build` to confirm the Markdown renders through the app.

When adding agent code or automation workflows:

1. Update this file in the same change.
2. Document the implementation path and invocation method.
3. Include configuration and credential requirements without committing secrets.
4. Keep this file aligned with the repository's current behavior.
