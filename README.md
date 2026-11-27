# Seekers Guild website

Seekers Guild is a student-led community in the Philippines for curious and driven minds, especially from the provinces. This repository contains its Next.js website. The current `feat/new-pages` branch has a multi-page redesign; the deployed site may still show the earlier single-page version until the branch is merged and released.

## Run locally

Use Node.js 22 (`.node-version`) and npm.

```sh
npm install
npm run dev
```

Open <http://localhost:3000>. For a production check, run `npm run lint`, `npm run build`, then `npm run start`. Run `npm run smoke` while either local server is running to check sitemap routes, headings, and internal links.

## Where to edit

| Need | Source |
| --- | --- |
| Pages, section order, metadata | `app/` routes and `app/layout.tsx` |
| Guild copy, programmes, joining, contacts | `app/content/site.ts` |
| Partnership proposal copy | `app/content/partnership.ts` |
| Events and saved Luma fallback | `app/content/events.ts`, `app/content/luma-snapshot.json` |
| Painting assignments, credits, licenses | `app/content/monet.json` |
| Visual tokens and styles | `app/styles/`, imported by `app/globals.css` |
| Reusable interactions | `app/components/` |

Events are sourced from the guild's Luma profile when available. The saved snapshot is a fallback; check its dates and the live event before publishing time-sensitive text. Never treat local changes as deployed until the public site has been checked.

## Build and release

`NEXT_PUBLIC_SITE_URL` sets the public URL for generated metadata, link previews, and the sitemap; hosting may supply a production domain automatically. Releases are tagged from a clean `main` through `npm run release:patch`, `release:minor`, or `release:major`. The tag produces a GitHub Release, while deployment remains with the hosting provider. Preview notes with `npm run release:notes`.

## Documentation

[The website playbook](docs/PLAYBOOK.md) is the single source for durable project decisions, documentation quality criteria, visual and content rules, evidence boundaries, and release checks. Update it when a lasting rule changes; put unfinished work in GitHub issues and changing site facts in `app/content/`. Keep this README focused on getting started.

## License

[MIT](LICENSE). The Seekers Guild name and logo are the guild's own marks and are not covered by the code license. Painting identity and image rights are recorded in `app/content/monet.json`.
