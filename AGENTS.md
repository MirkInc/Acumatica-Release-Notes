# AGENTS.md

## Overview

This repository is a documentation project for Acumatica customization release notes. At the time this file was created, the repository contains release-note content only and does not define executable software agents, bot classes, automation workers, workflow runners, or agent configuration files.

The current project root contains:

- `README.md` - release notes for the MIRK Acumatica customization package comparison from `2026.02.12` to `2026.04.28`.

Because there are no implemented agents in the codebase, this file documents the current state and provides a template for future agent documentation.

## Available Agents

No agents are currently implemented in this repository.

| Agent Name | Purpose | Key Capabilities | Invocation |
| --- | --- | --- | --- |
| None | Not applicable | Not applicable | Not applicable |

## Current Repository Responsibilities

This repository currently serves as a release-note archive for MIRK Acumatica customization packages. It documents package-level and DLL-level changes, including:

- MIRK Cash Conversion
- Work Order Labor Calendar
- DocuSign / E-Sign enhancements
- Equipment sale and purchase tracking
- Equipment and work order UI updates
- Purchasing enhancements
- Approval and release processing changes
- Database and schema additions

## How to Use This Repository

There is no agent runtime to invoke. Use the repository as a documentation source:

1. Open `README.md`.
2. Review the release notes for the Acumatica customization package comparison.
3. Add future release notes as additional Markdown files or update `README.md` if the repository remains single-release focused.

## Configuration

No runtime configuration is currently required.

Future agent implementations should document configuration here, including:

- Required environment variables
- Authentication requirements
- API keys or service accounts
- Default branches, paths, or release package locations
- Any per-tenant or per-customer settings

## Dependencies and Requirements

Current documentation-only requirements:

- Git
- Markdown-compatible viewer or GitHub

No build system, package manager, agent framework, or runtime dependency is currently present in this repository.

## Future Agent Documentation Template

If agents are added later, document each one using the structure below.

### Agent Name

**Purpose:**  
Describe what the agent does and when it should be used.

**Key Capabilities:**

- Capability 1
- Capability 2
- Capability 3

**Invocation:**

```bash
# Example command or workflow trigger
```

**Configuration:**

| Option | Required | Default | Description |
| --- | --- | --- | --- |
| `EXAMPLE_OPTION` | No | `default` | Describe the option. |

**Dependencies:**

- Runtime or framework dependency
- External service dependency
- Required credentials or permissions

**Inputs:**

- Input file, API payload, CLI argument, or event trigger

**Outputs:**

- Generated file, API response, log, issue, pull request, or other artifact

**Operational Notes:**

- Known limitations
- Failure modes
- Retry behavior
- Security considerations

## Maintenance Notes

When adding agent code or automation workflows to this repository:

1. Update this file in the same change.
2. Document the actual implementation path and invocation method.
3. Include configuration and credential requirements without committing secrets.
4. Keep agent documentation aligned with the repository's current behavior.
