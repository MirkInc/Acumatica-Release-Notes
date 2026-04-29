# Release Notes Documentation Guidelines

These guidelines define the standard for release notes in this repository. They are written so a person or AI agent can generate consistent notes across products such as Acumatica MIRK.Customizations, Rental360, and future projects.

Use the companion template: [Release Notes Template](./release-notes-template.md).

## Goals

Release notes must serve two audiences at once:

- Non-technical stakeholders need to know what changed, why it matters, and whether users need to do anything differently.
- Technical stakeholders need precise implementation details, schema changes, file changes, and comparison data.

Do not mix these audiences too early. Put plain-language business context first, then technical detail later.

## Required Structure

Every release note should use these sections in this order:

1. `Features Overview`
2. `Features Removed or Altered`
3. `Technical Details`
4. `Comparison Notes`

Additional subsections are allowed inside those four sections, but avoid inventing new top-level sections unless there is a strong reason.

## Frontmatter Requirements

Every release file must start with frontmatter so the app can route and display it correctly.

Required fields:

```yaml
version: "2026.04.28"
slug: "2026-04-28"
title: "Product Name Release Notes"
releasedAt: "2026-04-28"
```

Recommended fields:

```yaml
comparison: "2026.02.12 to 2026.04.28"
majorVersion: "25R2"
majorVersionLabel: "Major"
build: "25.201.0213"
buildLabel: "Build"
releaseType: "minor"
```

Use `majorVersion` for the broad platform or product version, such as `25R2`. Use `build` for the exact build number, such as `25.201.0213`.

## Section Guidelines

### Features Overview

Purpose: Explain new capabilities in plain language.

Audience: Executives, operations leaders, customer-facing teams, implementation consultants, support, and users who do not read code.

Include:

- New user-facing capabilities.
- Business value or user benefit.
- Who benefits or who is affected.
- New screens, workflows, reports, automations, or integrations, described without implementation jargon.

Avoid:

- Class names, table names, internal filenames, and code terminology.
- Long implementation details.
- Vague claims such as "improved system behavior" without explaining the user-visible result.

Voice:

- Start with the user or business outcome.
- Use active, concrete language.
- Keep bullets short and scannable.

Good example:

```md
### Weekly Work Order Labor Calendar

- Adds a weekly calendar so dispatch and operations teams can see scheduled labor by employee.
- Helps managers review staffing coverage without opening each work order individually.
- Provides a direct path from a calendar item back to the related work order.
```

Weak example:

```md
### MIRK9000

- Added MIRKWorkOrderLaborCalendarGraph.
- Added SchedulerPro assets.
- Added week normalization.
```

The weak example belongs in `Technical Details`, not `Features Overview`.

### Features Removed or Altered

Purpose: Explain changes that may affect existing workflows, expectations, or compatibility.

Audience: Non-technical stakeholders first, with enough detail that support and implementation teams know what to investigate.

Include:

- Removed features.
- Deprecated features.
- Breaking changes.
- Replaced workflows.
- Renamed screens, fields, reports, statuses, settings, or permissions.
- Changed defaults.
- Behavior changes, even if no feature was removed.

Use this pattern:

```text
What changed -> Why it matters -> What users should do or expect
```

Good example:

```md
### Approval Processing Was Reworked

Invoice approval processing now uses dedicated logic for each document area instead of the previous shared implementation. This should make approval behavior easier to manage, but teams that rely on approval workflows should validate their normal approval scenarios after deployment.
```

If nothing was removed or altered:

```md
### No Removed Features Identified

No removed features, deprecated workflows, or breaking behavior changes were identified in this release.
```

Do not omit the section entirely unless the release note is intentionally abbreviated.

### Technical Details

Purpose: Preserve the precise implementation record.

Audience: Developers, system administrators, technical consultants, support engineers, and future AI agents.

Include:

- Schema modifications: tables, columns, indexes, views, stored procedures, DAC fields, custom fields.
- File changes: new, removed, and significant modified files.
- New classes, services, screens, API endpoints, jobs, routes, workflows, or integrations.
- Dependency changes.
- Configuration changes and feature flags.
- Code comparison summaries: insertions, deletions, changed files, artifact size changes.

Use tables for schema changes:

```md
| Object Type | Table / Entity | Column / Field / Object | Change Type | Notes |
| --- | --- | --- | --- | --- |
| Table field | `FSEquipment` | `UsrMIRKSalePrice` | Added | Stores equipment sale price. |
```

Use categorized lists for files:

```md
#### New Files

- `screens/MI/MIRK9000/MIRK9000.ts` - Adds the labor calendar screen controller.
```

### Comparison Notes

Purpose: Make before/after changes easy to scan.

Audience: Mixed. Product owners use the functional comparison. Developers use the technical comparison.

Include:

- Before/after behavior for major features.
- Old vs new workflow.
- Previous vs current schema or artifact metrics.
- Version, build, or dependency comparisons.
- Compatibility notes.

Use tables where possible:

```md
| Area | Before | After | Impact |
| --- | --- | --- | --- |
| Labor scheduling | Users reviewed work orders individually. | Users can view labor on a weekly calendar. | Faster staffing review. |
```

## Release Type Guidance

### Major Releases

Use for large changes, platform upgrades, breaking changes, or multiple new capabilities.

Emphasize:

- Business-level summary.
- Breaking changes.
- Compatibility and version requirements.
- High-risk areas that need validation.

Major release notes should be the most comprehensive.

### Minor Releases

Use for new features and meaningful improvements that are intended to be backward-compatible.

Emphasize:

- New user-facing features.
- Workflow improvements.
- Configuration notes.
- Any behavior changes that support should know.

Minor release notes should include technical detail, but internal testing plans should remain outside the release note.

### Patch Releases

Use for bug fixes, small improvements, security updates, and targeted corrections.

Emphasize:

- What was fixed.
- Who was affected.
- The corrected behavior.
- Any verification or regression notes.

For patches, `Features Overview` can be renamed internally through subsections such as `Fixes Overview`, but keep the top-level heading as `Features Overview` for consistency.

Example patch wording:

```md
### Invoice Approval Correction

- Corrected an issue where approved invoices could remain in a pending state after release.
- This reduces manual follow-up for accounting users.
```

## Voice and Style

Use:

- Plain language before technical detail.
- Present tense for current behavior: "Adds", "Improves", "Corrects".
- Clear ownership: "Accounting users can...", "Dispatch teams can...".
- Specific nouns: "work order", "invoice", "equipment record", "release process".

Avoid:

- Marketing fluff: "game-changing", "seamless", "revolutionary".
- Empty technical phrases: "refactored logic" without explaining impact.
- Unsupported certainty: "eliminates all errors" unless proven.
- Jargon in stakeholder sections: "DAC extension", "projection", "graph", "handler", "namespace".
- Copying raw commit messages without rewriting them for readers.

Preferred verbs:

- Adds
- Improves
- Corrects
- Replaces
- Expands
- Consolidates
- Validates
- Tracks
- Displays
- Supports

## Formatting Conventions

Use Markdown.

Headings:

- One `#` heading for the release title.
- Use `##` for the four required top-level sections.
- Use `###` for feature areas or change categories.
- Use `####` only inside technical sections when needed.

Lists:

- Use bullets for scannable summaries.
- Keep each bullet focused on one idea.
- Start bullets with an action verb when possible.

Tables:

- Use tables for schema changes, file summaries, and comparisons.
- Keep table cells concise.
- If details are long, use a short table entry and expand below the table.

Inline code:

- Use backticks for table names, column names, file paths, class names, build numbers, screen IDs, routes, and commands.

Dates:

- Use ISO dates in frontmatter: `YYYY-MM-DD`.
- Display release dates consistently in prose.

Paths:

- Prefer repository-relative paths in release notes.
- Use Windows-style paths only when documenting a package that actually uses them.

## Input Handling for AI Agents

When generating release notes from code changes, inspect and extract:

- Product name and product slug.
- Previous and current package versions, dates, or builds.
- User-facing feature changes.
- Removed, altered, or deprecated behavior.
- Database/schema diffs.
- New, removed, and significantly changed files.
- New classes, methods, jobs, screens, routes, endpoints, and integrations.
- Configuration requirements that materially affect feature availability.
- Test or verification evidence, if available.

Then organize findings by audience:

- Put business impact in `Features Overview`.
- Put workflow risk in `Features Removed or Altered`.
- Put implementation details in `Technical Details`.
- Put before/after detail in `Comparison Notes`.

Do not dump raw diffs into the top of the note. Summarize first, then preserve detail.

## Common Pitfalls

Avoid these mistakes:

- Writing only for developers.
- Hiding breaking changes in technical details.
- Listing filenames as features.
- Saying "minor changes" when the release contains schema or workflow changes.
- Duplicating the same bullet in multiple sections without adding audience-specific value.
- Using vague language such as "miscellaneous updates" or "various fixes".
- Failing to distinguish major version from exact build number.
- Overstating benefits that are not directly supported by the change data.
- Leaving placeholder text in a published release note.

## Quality Checklist

Before publishing, confirm:

- Frontmatter is complete and valid.
- The release file is in the correct product folder.
- The release title, version, date, major version, and build are correct.
- `Features Overview` is understandable to a non-technical reader.
- `Features Removed or Altered` clearly identifies workflow or compatibility impact.
- `Technical Details` includes schema, file, and code details where applicable.
- `Comparison Notes` includes meaningful before/after information.
- No secrets, credentials, customer private data, or internal-only sensitive data are included.
- Markdown renders correctly in the release notes viewer.
- The app builds successfully after adding or editing the release note.
