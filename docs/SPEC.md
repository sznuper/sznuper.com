# sznuper.com — Loose Specification

> This is a loose specification. It captures the general direction and key decisions for the sznuper website. Implementation of individual tasks can deviate from this spec where research or practical considerations suggest a better approach.

## Purpose

sznuper.com is the public website for the sznuper server monitoring tool. It serves two functions:

1. **Landing page** at `/` — a minimal marketing page explaining what sznuper is, its value proposition, and how to install it
2. **Documentation** at `/docs/` — contributor-friendly, markdown-based docs written from scratch (not reusing the existing LLM-oriented spec docs from the daemon repo)

## Tech Stack

- **Astro** — static site generator with islands architecture. Ships zero JS by default, but individual components can opt into interactivity using any framework (React, Svelte, etc.)
- **Starlight** — Astro's official docs plugin. Provides markdown-based documentation with sidebar navigation, built-in Pagefind search, dark/light theme, and "Edit this page" links
- **Cloudflare Pages** — free-tier static hosting with Git integration, automatic PR preview deploys, custom domain support, and automatic HTTPS

## Architecture

The landing page and docs coexist in one Astro project but are architecturally separate:

- **Landing page** (`src/pages/index.astro`) — a standard Astro page with its own layout. It does not use Starlight's layout system, giving full design freedom. Components live in `src/components/Landing/`
- **Docs** (`src/content/docs/`) — Starlight content collection. Markdown/MDX files here are automatically rendered with Starlight's docs layout at `/docs/`. Starlight handles the sidebar, search, navigation, and theming

This separation means the landing page can evolve independently (animations, interactive demos, marketing sections) without being constrained by the docs framework.

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
│   │       ├── index.mdx
│   │       ├── getting-started/
│   │       ├── guides/
│   │       └── reference/
│   ├── pages/
│   │   └── index.astro              # Landing page
│   ├── components/
│   │   └── Landing/                 # Landing page components
│   └── styles/
│       └── custom.css               # Starlight theme overrides
```

## Docs Sections

- **Getting Started** — Installation, quick start guide
- **Guides** — Configuration, healthchecks, triggers, notifications, cooldown, writing custom healthchecks
- **Reference** — CLI commands, config file reference, healthcheck interface, official healthchecks list

Sidebar uses explicit ordering for "Getting Started" and autogenerate for "Guides" and "Reference" so new pages are picked up automatically. Each doc page includes an "Edit this page" link to the GitHub source for easy contributor PRs.

## Landing Page

Minimal initially. Key sections:

- Hero with tagline and description
- Feature highlights
- Install command (`curl | sh`)
- Links to docs and GitHub

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
