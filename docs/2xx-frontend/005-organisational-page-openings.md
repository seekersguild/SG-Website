# Organisational Page Openings Research

Research date: 25 November 2026, Asia/Manila.

## Rationale

The About, Programmes, Impact and Get involved pages repeat a large introductory band, a summary and links to material immediately below. The user asked to reduce crowding and unnecessary choices while preserving Seekers Guild's existing identity. This focused review examines how four organisations sequence information, rather than treating their visual styles as templates.

The sources below are first-party public pages accessed on the research date. Findings concern their published content and reading order. Browser-rendered spacing, mobile layouts, interaction quality and conversion performance were not evaluated in this research pass. Their patterns are useful examples, not proof that a specific layout improves conversion.

## First-party observations

| Source | Observed content order | Relevant lesson for Seekers Guild |
| --- | --- | --- |
| [Mozilla Foundation: Meet Mozilla](https://www.mozillafoundation.org/en/meet-mozilla/) | A page title and short introduction lead into mission, history and leadership. The main narrative explains the organisation rather than repeating a catalogue of section links. | Keep orientation concise, then let the existing vision and mission carry the About page. |
| [charity: water: Our Work](https://www.charitywater.org/our-work) | The work page presents how its work happens, evidence of impact, field stories and sustainability information. Follow-up links belong to the content they expand. | Put substantive work evidence early on Impact; avoid a second display of event posters before the archive itself. |
| [Angat Buhay: Be Involved](https://www.angatbuhay.ph/ab-be-involved/) | The opening invitation leads directly into separate partner, contribution and volunteer routes, with contacts for partnership and volunteer enquiries. | Start Get involved with the actual ways to participate, rather than a navigation panel that previews those same options. |
| [Wikimedia Foundation: What we do](https://wikimediafoundation.org/what-we-do/) and [Participate](https://wikimediafoundation.org/participate/) | Each page offers a brief orientation before specific work or contribution categories. Participate explains editing, events, local communities and coding through distinct sections and contextual links. | Present the actual programme or participation options once, with their details and relevant action beside them. |

These examples do not eliminate introductions universally. They retain enough context to identify the page and then provide distinct information. Angat Buhay's page also includes lengthy donation instructions and some placeholder content farther down; it is a useful opening-path example, not a recommendation to copy the whole page. Wikimedia's extracted output repeats its page title; this review does not infer the rendered heading semantics from that extraction.

## Recommendation for this project

The following is a design synthesis for Seekers Guild, not a measured result from the organisations above:

| Page | Remove | Retain or integrate |
| --- | --- | --- |
| About | The separate introductory hero, repeated community summary and four-link section index. | One visible H1 identifying About, integrated into the existing first content band. Keep the vision, mission, pillars and culture content and their hierarchy. |
| Programmes | The separate introductory hero and second list of the same programme names/cadences. | A Programmes H1 above the actual catalogue. Keep each programme's description, cadence, access and genuine action once. |
| Impact | The introductory poster pair and section index before the actual record and gatherings. | An Our impact H1 in the first evidence section, with Our work so far subordinate to it. Keep the archive, confirmed activity information and partner ecosystem. |
| Get involved | The introductory navigation grid and repeated membership invitation. | A Get involved H1 above actual participation routes. Keep the free-membership fact where relevant, first-visit guidance, membership steps and FAQ. |

Do not add replacement cards, another button row, a sticky local menu or a new decorative hero. Removal should reduce the amount of interface preceding useful content, rather than replace it with a new navigation mechanism. A long technical reference may justify a local contents menu; these four pages do not currently need an equally prominent preview of every section.

Keep the original sapphire, gold, Monet paintings, typography, flourishes, gutters and angled band transitions. Preserve meaningful spacing inside the surviving sections. Fewer sections should not mean compressing paragraphs, shrinking tap targets or crowding unrelated content together.

## Pseudocode Example

```text
page route
  -> shared site navigation
  -> first useful content band
       -> one page H1
       -> brief context only where needed
       -> real content, with subordinate headings
       -> a relevant action when there is an actual next step
  -> remaining distinct content sections
  -> shared footer
```

## Critical Quirks

- Removing a hero must not remove the only H1 or leave headings out of order.
- Preserve public section IDs and inbound hash links when deleting the surrounding navigation preview.
- Account for the fixed header at the new first section; avoid hidden headings and oversized leftover top padding.
- Compare the new first and second bands so removal does not produce unintended consecutive pale backgrounds or a bare gap.
- Keep facts, programme status and metrics unchanged. Interface cleanup does not justify inventing evidence or offering unavailable participation routes.
- Validate actual browser rendering at phone, tablet and desktop widths. Researching content order does not replace testing the implementation.

## When to Use

Use this approach when an interior page previews the same content twice, when local navigation adds choices without saving meaningful effort, or when visitors must scroll through generic introductions before reaching the information they requested.

## When Not to Use

Keep a more substantial introduction where it provides unique context, tells a necessary story, or supports a distinct visitor task. Do not apply this deletion mechanically to the homepage, the accepted Next gathering design, or the partnership page. A genuinely long page may need a discreet contents list after its information architecture is reviewed.
