# sznuper.com — Loose Specification

> This is a loose specification. It captures the general direction and key decisions for the sznuper website. Implementation of individual tasks can deviate from this spec where research or practical considerations suggest a better approach.

## Purpose

sznuper.com is the public website for the sznuper server monitoring tool. It serves as both a landing page and documentation site.

## Tech Stack

- **Astro** — static site generator with islands architecture
- **Starlight** — Astro's official docs plugin. Provides markdown-based documentation with sidebar navigation, built-in Pagefind search, dark/light theme, and "Edit this page" links
- **Cloudflare Pages** — free-tier static hosting with Git integration, automatic PR preview deploys, custom domain support, and automatic HTTPS

## Architecture

Pure Starlight site. The landing page uses Starlight's `template: splash` for a full-width hero layout. All other pages use the standard docs template with sidebar.

## General Project Structure

```
sznuper.com/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/                          # Static assets (favicon, OG image)
├── src/
│   ├── assets/                      # Processed assets (logo)
│   ├── content/
│   │   └── docs/                    # Starlight docs (markdown/MDX)
│   │       ├── index.mdx            # Landing page (splash template)
│   │       ├── getting-started.mdx
│   │       ├── guides/
│   │       └── reference/
│   └── styles/
│       └── custom.css               # Starlight theme overrides
├── specs/
│   └── SPEC.md                      # This file
```

## Docs Sections

- **Getting Started** — Installation, quick start guide
- **Guides** — Configuration, healthchecks, triggers, notifications, cooldown, writing custom healthchecks
- **Reference** — CLI commands, config file reference, healthcheck interface, official healthchecks list

Sidebar uses explicit ordering for "Getting Started" and autogenerate for "Guides" and "Reference" so new pages are picked up automatically. Each doc page includes an "Edit this page" link to the GitHub source for easy contributor PRs.

## Plugins

- `starlight-contextual-menu` — "Copy as markdown" button on doc pages
- `starlight-llms-txt` — generates `llms.txt` and `llms-full.txt` for LLM ingestion

## Deployment

Cloudflare Pages with Git integration:

- Connect the `sznuper/sznuper.com` GitHub repo
- Build command: `pnpm build`, output directory: `dist`
- Push to `main` triggers production deploy
- PRs get automatic preview deployments
- Custom domains: `sznuper.com` and `www.sznuper.com`

## Future Extensibility

- **SSR/dynamic features**: Add the `@astrojs/cloudflare` adapter when needed. Individual pages can opt into server-side rendering while docs remain static. Cloudflare Workers free tier provides 100k requests/day
- **Backend**: Separate private repo when needed. The static site can call its APIs. Could be deployed on Cloudflare Workers or a VPS
- **Interactive features**: Astro's islands architecture allows adding interactive components (React, Svelte, etc.) to any page without rebuilding the whole site

## Dependencies

All installed with `pnpm add -E` (pinned versions):

- `astro`
- `@astrojs/starlight`
- `sharp` (image optimization)
- `typescript` + `@astrojs/check` (dev)
