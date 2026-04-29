# Product Release Notes

Password-protected Next.js release notes viewer for multiple products, including Acumatica MIRK.Customizations and future Rental360 releases.

## Local Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3000`. Unauthenticated visitors are redirected to `/login`.

Set `AUTH_PASSWORDS` in `.env.local` as a comma-separated list of authorized passwords.

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

## Deployment

The app is optimized for Vercel. Deploy with:

```bash
npx vercel --prod --yes
```

Set these environment variables in Vercel:

- `AUTH_PASSWORDS` - comma-separated authorized login passwords.
- `AUTH_SESSION_SECRET` - project-specific session-signing secret.

The app includes a fallback session secret so it can run without extra setup, but a project-specific secret is recommended for production.
