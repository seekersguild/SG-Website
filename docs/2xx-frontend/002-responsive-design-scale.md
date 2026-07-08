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

## When to Use

Use this pattern for new public-facing pages and repeated content grids.

## When Not to Use

Do not use this pattern for small one-off controls where fixed control sizing is clearer, such as compact nav buttons or modal close buttons.
