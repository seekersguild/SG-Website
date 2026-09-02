# Visual Theme Direction

## Rationale

The Seekers Guild website should feel like a polished fantasy guild hub inspired by collectible card game interfaces and Piltover-style art-deco fantasy technology. The palette should stay rooted in deep blue, brass gold, cream/tan, black/navy, and white.

## Pseudocode Example

```text
deep blue + brass gold + cream panels -> art-deco fantasy framing -> consistent responsive layout
```

## Critical Quirks

- Keep the established Seekers palette intact, but favor polished brass, navy, and cream over muddy parchment.
- Use Cinzel as the primary type family.
- Prefer framed panels, art-deco linework, brass edging, navy interiors, and controlled shadows over flat blocks.
- Keep Quests, Subguilds, Ranker's Hall, Scrolls, and Codex on the same surface, banner, card, and heading treatment unless a page has a specific reason to differ.
- Buttons and interactive controls should use the same brass-edge/navy-plate language, with visible hover, focus, active, and selected states. Prefer restrained sheen/border effects over moving the button position or adding heavy glow.
- Quest category controls should read as connected folder tabs on desktop, with the active tab sharing the panel edge. On smaller screens they may wrap, but each tab must remain complete and readable.
- Page sections should still use the shared sizing tokens in `app/globals.css`.
- Do not add decorative effects that make text harder to read.

## When to Use

Use this direction for public-facing pages, intro banners, card placeholders, and major section panels.

## When Not to Use

Avoid heavy ornamentation on compact controls, mobile layouts, or areas where readability is more important than atmosphere.
