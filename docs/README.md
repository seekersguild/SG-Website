# Seekers Guild Website

Official website for Seekers Guild, a community for curious and driven learners. The site presents the guild's activities, subguilds, member recognition, written works, and shared rules in one public-facing hub.

## Features

### Quests

Landing page and activity board for:

- Events
- Hackathons
- Workshops
- Recreational activities
- Online learning

### Subguilds

Overview page for internal guild groups:

- Alchemists
- Merchants
- Artisans

### Ranker's Hall

Recognition page for rankers and council members. Cards are clickable and open a placeholder profile modal.

### Scrolls

Archive-style page for future articles, art, writeups, and knowledge sections.

### Codex

Rules and reference page for guild standards, policies, and shared context.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js App Router |
| UI | React |
| Styling | Global CSS with shared design tokens |
| Assets | `public/assets/` |
| Language | TypeScript |

## Local Development

```bash
npm install
npm run dev
npm run build
npm run start
```

Development server:

```text
http://localhost:3000
```

## Project Structure

| Path | Purpose |
| --- | --- |
| `app/` | Next.js routes, layout, metadata, and route data |
| `app/components/` | Page and shared UI components |
| `app/globals.css` | Global styles, responsive sizing, and design tokens |
| `public/assets/` | Logos, images, and static assets |
| `docs/000-meta/` | Documentation rules and templates |
| `docs/2xx-frontend/` | Frontend patterns and decisions |

## Project Status

The main public routes are implemented with responsive layouts and placeholder content. Final copy, real activity data, member cards, articles, and images can be added as they become available.
