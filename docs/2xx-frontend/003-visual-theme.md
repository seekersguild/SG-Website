# Visual Theme Direction

## Rationale

The site follows the Seekers Guild visual identity from the guild's brand document: Sapphire, Heliodor, Moonshine and Obsidian; Cinzel, Lora and Montserrat; and "bold, gold typography against the dark blue background". Its one object is the compass from the Sigil of Seeking: "This compass does not point north. It points to the thing you want most in this world." The page is built from flat brand-colour bands that meet on angled cuts. Gold is flat Heliodor, with gold-framed panels, a circle of light around the compass engraved with the guild's taglines, and two public-domain impressionist paintings laid into the bands as atmosphere: a deep-blue one behind the dark bands and a light one behind the light and blue bands.

## Pseudocode Example

```text
Opening   Sapphire deep  "We seek those who seek" in Heliodor Cinzel + the compass (needle follows the visitor)
Who       Moonshine      the Sigil of Seeking + who the guild is
Vision    Sapphire       the vision statement in Lora
Mission   Moonshine      three promises
Pillars   Obsidian       five pillars
Culture   Heliodor       ten values set large
Close     Sapphire deep  "Onward, fellow seeker"
bands meet on hard diagonal edges (.band--cut / .band--cut-left)
```

## Critical Quirks

- Colours are the brand hexes, as tokens in `app/globals.css`. Flat colour only: no gradients, glows, drop shadows or new hues. Panels get their edge from the gold frame, not from shadows or offset plates.
- Cinzel is the guild voice (headings, display); Lora carries long statements and quotes; Montserrat is for everything read quickly. All three are self-hosted via `next/font/local`.
- All copy comes from the guild's documents (`app/content/site.ts`). Founded April 2025.
- Ornaments live in `app/components/Ornament.tsx` (`Flourish`, `Ornate`) and `MagicCircle.tsx` (circle of light, motes). Painting layers are the `Paint` element in `app/page.tsx` with `.paint--*` classes; each sits under a veil so text keeps its contrast.
- Readability rule: Cinzel only for headings and short titles. Paragraphs are at least 17px, in near-full colour, never grey on grey. Panel titles use Lora.
- Buttons are square: a Heliodor gold fill, or a gold 1.5px line.
- Motion: the headline rises once, the compass assembles once and then only answers the pointer, sections enter once. The only ambient motion is the slow turn of the circle of light and the drifting motes; both stop under reduced motion. Everything moving sits inside `prefers-reduced-motion: no-preference`.

## When to Use

Every page. A new section is a new band in one of the five brand colours, alternating light and dark.

## When Not to Use

Do not add monospace labels, numbered markers, fake metadata, glows or texture overlays; they read as generated and are not part of the brand.
