# Release Notes Template

Use this template for each product release. Copy it into the appropriate product release file:

```text
content/products/{product-slug}/releases/{release-slug}.md
```

Replace every placeholder before publishing. Remove sections that are truly not applicable, but prefer using "None identified" when the absence of change is useful to readers.

```md
---
version: "{DISPLAY_VERSION}"
slug: "{release-slug}"
title: "{Product or Package Name} Release Notes"
comparison: "{previous version/date/build} to {current version/date/build}"
majorVersion: "{major platform/app version, if applicable}"
majorVersionLabel: "{Major | Platform | App version | ERP version}"
build: "{exact build number, if applicable}"
buildLabel: "{Build | Acumatica build | App build | Package build}"
releasedAt: "{YYYY-MM-DD}"
releaseType: "{major | minor | patch}"
---

# {Product or Package Name} Release Notes

Comparison: `{previous version/date/build}` to `{current version/date/build}`<br>
{Build label}: `{exact build number}`

## Features Overview

Briefly summarize what changed in plain language. Write this section for non-technical readers who need to understand the value, impact, and user-facing behavior.

### {Feature Area 1}

- {Plain-language description of the new capability.}
- {Business value or user benefit.}
- {Who is affected or who should use it.}

### {Feature Area 2}

- {Plain-language description of the new capability.}
- {Business value or user benefit.}
- {Who is affected or who should use it.}

## Features Removed or Altered

Use this section for deprecated features, removed functionality, behavior changes, breaking changes, changed workflows, renamed fields/screens, or modified defaults. Write it for non-technical readers first.

### {Changed or Removed Area}

{Explain what changed, why it matters, and what users may notice. If there is a replacement workflow, name it clearly.}

### No Removed Features Identified

Use this only when no removals, deprecations, or notable behavior changes were found.

## Technical Details

Use this section for developers, administrators, implementation consultants, and support teams.

### Package Summary

- Previous version/package/build: `{previous version/date/build}`
- Current version/package/build: `{current version/date/build}`
- Release type: `{major | minor | patch}`
- Platform/application version: `{platform version, if applicable}`
- Exact build: `{build number, if applicable}`
- Artifact size changes: `{old size} -> {new size}`, if known
- Code delta summary: `{insertions/deletions/files changed}`, if known

### Schema Modifications

| Object Type | Table / Entity | Column / Field / Object | Change Type | Notes |
| --- | --- | --- | --- | --- |
| `{table | DAC | index | view | procedure}` | `{name}` | `{field or object name}` | `{added | changed | removed}` | `{purpose or type note}` |

If no schema changes were identified, write:

No schema modifications were identified in this release.

### File Changes

#### New Files

- `{path/to/new-file.ext}` - {purpose}

#### Removed Files

- `{path/to/removed-file.ext}` - {replacement or reason}

#### Significant Modified Files

- `{path/to/changed-file.ext}` - {summary of the change}

### Code and Component Details

- `{ComponentName}` - {technical behavior, service responsibility, extension point, or workflow role}
- `{ClassName.methodName}` - {notable behavior change}
- `{API endpoint / screen / route}` - {new or changed behavior}

### Known Risks or Follow-Up Items

- {Known limitation, testing gap, manual verification needed, or dependency on configuration.}

## Comparison Notes

Use comparison tables to make notable before/after changes easy to scan.

### Functional Comparison

| Area | Before | After | Impact |
| --- | --- | --- | --- |
| `{feature area}` | `{previous behavior}` | `{new behavior}` | `{user or business impact}` |

### Technical Comparison

| Area / Metric | Previous | Current | Change |
| --- | --- | --- | --- |
| `{DLL size, route count, schema fields, API behavior, dependency version}` | `{before}` | `{after}` | `{delta or explanation}` |

### Compatibility Notes

- {Compatibility issue, version requirement, browser/platform support, integration dependency, or API contract change.}
```
