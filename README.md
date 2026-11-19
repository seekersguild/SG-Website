<h1 align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/assets/brand/lockup-dark.svg">
    <img src="docs/assets/brand/lockup-light.svg" alt="Seekers Guild" width="420">
  </picture>
</h1>

<p align="center">
  The official website of Seekers Guild. We seek those who seek.
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-04419C?style=flat-square&amp;labelColor=555555" alt="License: MIT" height="20"></a>
  <a href="package.json"><img src="https://img.shields.io/badge/Next.js-16-04419C?style=flat-square&amp;logo=nextdotjs&amp;logoColor=white&amp;labelColor=555555" alt="Next.js 16" height="20"></a>
  <a href="package.json"><img src="https://img.shields.io/badge/React-19-04419C?style=flat-square&amp;logo=react&amp;logoColor=white&amp;labelColor=555555" alt="React 19" height="20"></a>
  <a href="tsconfig.json"><img src="https://img.shields.io/badge/TypeScript-6-04419C?style=flat-square&amp;logo=typescript&amp;logoColor=white&amp;labelColor=555555" alt="TypeScript 6" height="20"></a>
  <a href=".node-version"><img src="https://img.shields.io/badge/Node.js-22-04419C?style=flat-square&amp;logo=nodedotjs&amp;logoColor=white&amp;labelColor=555555" alt="Node.js 22" height="20"></a>
  <a href="app/content/events.ts"><img src="https://img.shields.io/badge/events-Luma-04419C?style=flat-square&amp;labelColor=555555" alt="Events from Luma" height="20"></a>
</p>

Seekers Guild is a decentralized, student-led community in the Philippines, founded in April 2025, that empowers curious and driven students, especially from the provinces and underserved sectors, through collaboration, real-world experiences and opportunities beyond the classroom. This repository is the guild's one-page public site: who the guild is, what it stands for, its programmes, every public gathering, and how to join.

## Features

- **The guild's charter:** Vision, Mission, the five Pillars and the Culture, written from the guild's own documents.
- **Programmes:** Open Table, LockIn Villa × Founders Live Manila, the Outreach Program, and Awards & Recognition.
- **Gatherings from Luma:** The next event and every past public event, read from the guild's Luma profile and refreshed every 6 hours. If Luma cannot be reached, the site falls back to a saved copy.
- **Joining and questions:** How membership works (free, on the endorsement of two members) and an FAQ.
- **Search and AI answers:** JSON-LD for the organisation, the site, the FAQ and each gathering; a sitemap, robots.txt, a generated link-preview image, and `llms.txt` for AI crawlers.
- **Design:** Brand sapphire and heliodor over impressionist paintings, with a compass that follows the pointer (or a tap on touch screens), served sharp from phones to 4K screens and calm when reduced motion is on.

## Screenshots

Captured from the production build. Click a preview to open the full image.

| Opening | Five pillars |
| --- | --- |
| [<img src="docs/assets/screenshots/home.jpg" alt="Opening screen: the motto in gold beside the guild compass on a dark painting" width="400">](docs/assets/screenshots/home.jpg) | [<img src="docs/assets/screenshots/pillars.jpg" alt="The five pillars as framed cards on the dark painting" width="400">](docs/assets/screenshots/pillars.jpg) |
| **Gatherings** | **On a phone** |
| [<img src="docs/assets/screenshots/events.jpg" alt="Gatherings: the next Open Table with its Luma button, and past events by year" width="400">](docs/assets/screenshots/events.jpg) | [<img src="docs/assets/screenshots/phone.jpg" alt="Three phone screens: the opening, the mission, and the next gathering" width="400">](docs/assets/screenshots/phone.jpg) |

## Getting started

Requirements:

- Node.js 22 (see `.node-version`) and npm
- Git

```sh
git clone https://github.com/seekersguild/SG-Website.git
cd SG-Website
npm install
npm run dev
```

Open http://localhost:3000. Edits to pages, styles and content reload in the browser. Press Ctrl+C to stop.

To try the production build locally, run `npm run build` and then `npm run start`.

### Editing the content

All copy lives in `app/content/`, not in the markup:

| To change | Edit |
| --- | --- |
| Vision, mission, pillars, culture, programmes, joining steps, FAQ, social links | `app/content/site.ts` |
| Event titles shown on the site, partner names | `app/content/events.ts` |
| The saved copy of the Luma events, used when Luma is unreachable | `app/content/luma-snapshot.json` |
| The plain-text summary for AI crawlers | `public/llms.txt` |

Structured data is built from the same content, so the page and what search engines read stay in step.

### Deploying

The site deploys as a standard Next.js app (Vercel works out of the box). Set one variable in the hosting environment:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | The public address, for example `https://your-domain`. Used for link previews, the sitemap and robots.txt. On Vercel the production domain is detected automatically. |

## Development

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload on port 3000 |
| `npm run lint` | TypeScript check |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run release:notes` | Preview the notes for the next release |
| `npm run release:patch` / `release:minor` / `release:major` | Bump the version, tag it and push; GitHub then builds and publishes the release |

Releases are cut from a clean `main`. Pushing the tag runs `.github/workflows/release.yml`, which checks, builds and publishes a GitHub Release with notes grouped from the `feat:` / `fix:` commit messages.

Project layout:

- `app/` — the page, layout, metadata, 404, sitemap, robots and link-preview image
- `app/components/` — header, footer, compass, magic circle, ornaments, events and structured data
- `app/content/` — every word on the site, and the Luma events
- `app/globals.css` — design tokens, type scale and all styles
- `public/` — fonts, paintings, logo and `llms.txt`
- `scripts/` — release helpers
- `docs/` — decisions and patterns behind the site

## Documentation

- [docs/README.md](docs/README.md) — index of the project docs
- [docs/2xx-frontend/001-nextjs-app-router.md](docs/2xx-frontend/001-nextjs-app-router.md) — how the App Router is used
- [docs/2xx-frontend/002-responsive-design-scale.md](docs/2xx-frontend/002-responsive-design-scale.md) — responsive sizing
- [docs/2xx-frontend/003-visual-theme.md](docs/2xx-frontend/003-visual-theme.md) — the visual theme
- [docs/3xx-operations/001-github-releases.md](docs/3xx-operations/001-github-releases.md) — versions and releases
- [docs/000-meta/000-rules.md](docs/000-meta/000-rules.md) — how to write a doc

## License

[MIT](LICENSE). The Seekers Guild name and logo are the guild's own marks and are not covered by the code licence. The paintings in `public/images/` are in the public domain.
