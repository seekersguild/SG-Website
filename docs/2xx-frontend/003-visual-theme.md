# Visual Theme Direction

## Rationale

The site follows the Seekers Guild visual identity from the guild's brand document: Sapphire, Heliodor, Moonshine and Obsidian; Cinzel, Lora and Montserrat; and "bold, gold typography against the dark blue background". Its one object is the compass from the Sigil of Seeking: "This compass does not point north. It points to the thing you want most in this world." The page is built from flat brand-colour bands that meet on angled cuts. Gold is flat Heliodor, with gold-framed panels, a low-poly compass (every curve cut into flat facets) inside a many-sided bezel engraved with the guild's taglines, and two public-domain impressionist paintings laid into the bands as atmosphere: a deep-blue one behind the dark bands and a light one behind the light and blue bands.

## Pseudocode Example

```text
Opening   Sapphire deep  "We seek those who seek" in Heliodor Cinzel + the compass, sized to the screen (needle follows the visitor)
Who       Moonshine      the Sigil of Seeking + who the guild is
Vision    Sapphire       the vision statement in Lora
Mission   Moonshine      three promises
Pillars   Obsidian       five pillars
Culture   Heliodor       ten values set large
Close     Sapphire deep  "Onward, fellow seeker"
bands meet on hard diagonal edges (.band--cut / .band--cut-left)
```

## Critical Quirks

- Band edges: the angled clip polygons run a few pixels past the sides and bottom, so no edge is anti-aliased exactly on the screen edge (which showed the page background as a hairline at fractional pixel ratios).
- Colours are the brand hexes, as tokens in `app/globals.css`. Flat colour only: no gradients, glows, drop shadows or new hues. Panels get their edge from the gold frame, not from shadows or offset plates.
- The compass is drawn low-poly: arcs and rings are runs of flat triangles in a few close tones of one colour, star points are four flat-shaded facets, the hub is an octagon. Each facet is stroked in its own fill so no seams show. Around it sits an instrument in three layers (`MagicCircle.tsx`): the low-poly bezel with the taglines and degree scale, a faint scanner ring of thin arcs and small nodes, and a still compass card with N/E/S/W and faint degree numerals every 30°. The technical touches stay low-key: thin, low-contrast, never louder than the compass. The cardinal letters never rotate. No six-pointed stars or crossed triangles anywhere.
- Cinzel Bold is the guild voice (headings, titles, display, all at 700); Lora carries long statements and quotes; Montserrat is for everything read quickly. All three are self-hosted via `next/font/local`.
- All copy comes from the guild's documents (`app/content/site.ts`). Founded April 2025.
- Ornaments live in `app/components/Ornament.tsx` (`Flourish`, `Ornate`) and `MagicCircle.tsx` (circle of light, motes). Painting layers are the `Paint` element in `app/page.tsx` with `.paint--*` classes; each sits under a veil so text keeps its contrast.
- Readability rule: Cinzel only for headings and short titles. Paragraphs are at least 17px, in near-full colour, never grey on grey. Panel titles use Lora.
- Buttons are square: a Heliodor gold fill, or a gold 1.5px line.
- Two layouts. Desktop (wider than 860px, which includes landscape tablets) is the composed page above. Phones and portrait tablets get their own touch design, all in the "Compact layout" section at the end of `app/globals.css`: the opening and the send-off are centred, each with the compass on the horizon beneath it (zoomed past the screen width, hub just above the section's foot, so only its upper half rises into view), a one-line intro and full-width buttons on phones; mission, pillars and programmes become swipe rows (one card per view on phones, two on tablets, the next peeking in) with diamond dots (`Rail.tsx`); the culture is one gold-framed list of the guild's values divided by fine gold rules (two columns on wide screens and tablets, one on phones); past gatherings open on the latest four with a "Show all" button (`PastEvents.tsx`); and a slim bar at the bottom shows the next gathering from Luma with a Reserve button (`JoinDock.tsx`), appearing once the opening's buttons scroll away and stepping aside for the send-off and footer. Desktop never renders any of it.
- Motion: the headline rises once, the compass assembles once (its gold bands draw on through masks, the star scales in, the needle swings round) and then only answers the pointer, sections enter once. The only ambient motion is the slow turn of the compass bezel (clockwise, 140s) and the scanner ring (counter-clockwise, 90s) and the drifting motes; both stop under reduced motion. Everything moving sits inside `prefers-reduced-motion: no-preference`.

## When to Use

Every page. A new section is a new band in one of the five brand colours, alternating light and dark.

## When Not to Use

Do not add monospace labels, numbered markers, fake metadata, glows or texture overlays; they read as generated and are not part of the brand.
