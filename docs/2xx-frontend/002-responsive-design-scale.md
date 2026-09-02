# Responsive Design Scale

## Rationale

The site uses a desktop-first visual direction, but page elements must remain proportional on tablet and mobile. Shared CSS variables prevent heading, card, and body text sizes from drifting across pages.

## Pseudocode Example

```text
shared size token -> page section -> responsive media query -> stable layout
```

## Critical Quirks

- Use `--page-title-size` for top page headings.
- Use `--section-title-size` for major banners and section labels.
- Use `--card-title-size` for repeated card titles.
- Keep page shells aligned through `--content-width`, `--panel-radius`, and `--tan-panel`.
- Avoid one-off font sizes unless a component has a clear local reason.
- Tablet and mobile layouts do not need to mirror desktop. Prioritize clean stacking, readable card widths, and navigation that wraps without crowding.
- Keep iPad/tablet grids denser than mobile when they still read clearly, such as two-column Quest/Scroll cards or three-column Subguild cards.
- Use the full navigation on desktop and a burger menu on tablet/mobile.
- Quest category tabs should keep the bookmark/folder feel on smaller screens by wrapping into complete visible bookmark tabs. Avoid horizontal tab strips that cut off labels or tab edges.

## When to Use

Use this pattern for new public-facing pages and repeated content grids.

## When Not to Use

Do not use this pattern for small one-off controls where fixed control sizing is clearer, such as compact nav buttons or modal close buttons.
