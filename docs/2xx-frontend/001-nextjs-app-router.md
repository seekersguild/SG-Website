# Next.js App Router Page Pattern

## Rationale

The Seekers Guild website uses the Next.js App Router with a shared frame, common navigation, and route-specific board components. This keeps navigation consistent while allowing each page to own its layout details.

## Pseudocode Example

```text
route slug -> find section metadata -> render shared site frame -> render page board
```

## Critical Quirks

- The home page and Quests page share the same route. `/` is the canonical route, while `/quests` redirects home.
- `SiteFrame` owns the header, logo, and primary navigation.
- Route-specific pages should use board components in `app/components/`.
- Shared sizing belongs in CSS variables in `app/globals.css`.
- Assets that must be served directly belong in `public/assets/`.

## When to Use

Use this pattern for main website pages such as Subguilds, Ranker's Hall, Scrolls, and Codex.

## When Not to Use

Do not use this pattern for deeply interactive widgets that need their own isolated state and composition. Those should still live as components, but their internal behavior should remain local to the widget.
