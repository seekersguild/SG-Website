# Monet backgrounds without human figures

Research date: 26 November 2026. Scope: replace background pictures only; retain the live site's white, blue and dark-blue treatments, section composition, copy and interactions.

## Method and decision

Reviewed all 32 current assignments from `app/content/monet.json` against the museum catalogue and a contact sheet of the original-color 1686px source images. Human-free is a visual selection judgment, not a museum catalogue field. A landscape title alone is insufficient: several beaches, houses and bridges contain small figures. Prefer water lilies, unoccupied gardens, still life and grainstacks. Do not erase or crop people out of paintings to manufacture compliance.

The [Art Institute of Chicago catalogue API](https://api.artic.edu/api/v1/artworks/search?q=Claude%20Monet&limit=100&fields=id,title,image_id,is_public_domain,artist_title,artwork_type_title,date_display) verified artist, painting type, image identity and public-domain flag. Its search returned 33 eligible Monet paintings, so it cannot supply 32 distinct human-free works. Existing metadata records each [AIC source page](https://www.artic.edu/artworks) and [open-access policy](https://www.artic.edu/open-access/open-access-images).

## Existing paintings suitable to retain

No recognizable human figure was visible in the inspected originals/contact sheet of these 19 AIC works. This is practical visual confidence, not a claim about every ambiguous individual brushstroke at conservation resolution.

| AIC ID | Work |
| --- | --- |
| [16568](https://www.artic.edu/artworks/16568) | Water Lilies |
| [64818](https://www.artic.edu/artworks/64818) | Stacks of Wheat (End of Summer) |
| [87088](https://www.artic.edu/artworks/87088) | Water Lily Pond (1900) |
| [16564](https://www.artic.edu/artworks/16564) | Branch of the Seine near Giverny (Mist) |
| [81537](https://www.artic.edu/artworks/81537) | Bordighera |
| [14624](https://www.artic.edu/artworks/14624) | Stacks of Wheat (End of Day, Autumn) |
| [16549](https://www.artic.edu/artworks/16549) | Apples and Grapes |
| [4783](https://www.artic.edu/artworks/4783) | Poppy Field (Giverny) |
| [16584](https://www.artic.edu/artworks/16584) | Houses of Parliament, London |
| [20545](https://www.artic.edu/artworks/20545) | Rocks at Port-Goulphar, Belle-Île |
| [97933](https://www.artic.edu/artworks/97933) | Water Lily Pond (1917–19) |
| [4887](https://www.artic.edu/artworks/4887) | Irises |
| [81545](https://www.artic.edu/artworks/81545) | Stacks of Wheat (Sunset, Snow Effect) |
| [111318](https://www.artic.edu/artworks/111318) | Stack of Wheat |
| [81546](https://www.artic.edu/artworks/81546) | The Petite Creuse River |
| [14634](https://www.artic.edu/artworks/14634) | Vétheuil |
| [100191](https://www.artic.edu/artworks/100191) | Stack of Wheat (Thaw, Sunset) |
| [16560](https://www.artic.edu/artworks/16560) | Stack of Wheat (Snow Effect, Overcast Day) |
| [16579](https://www.artic.edu/artworks/16579) | Vétheuil |

Bordighera and Poppy Field were additionally inspected as individual full-size images. Do not confuse this Poppy Field with other Monet poppy-field compositions containing walkers.

## Remove or avoid

- Clear figures: AIC 16571 (station), 14620 (cliff walkers), 14598 (beach), 81539 (seated woman), 16554 (house garden), 81540 (beach crowd).
- Conservatively exclude tiny/ambiguous people or occupied-boat possibilities: 59927, 20535, 86998, 16544, 103139 and 20701. These are not all asserted to depict identifiable people; ambiguity is enough to choose a safer work.
- Exclude 14630, Venice, Palazzo Dario: full-size inspection shows a conspicuous gondola. No clear occupant was identified, but a boat-free choice avoids uncertainty.
- AIC 16542 Customs House is museum-verified as Monet/public-domain, but the new image download was challenged by Cloudflare. It was not visually approved in this research pass.

## Four additional approved works

All four were downloaded and visually inspected separately. No humans were visible. Source metadata and direct download URLs are also captured in the implementation scratch file `.taste-skill/monet-external-candidates.json`.

| Museum / ID | Work and date | Visual suitability / license evidence |
| --- | --- | --- |
| Cleveland / [136510](https://www.clevelandart.org/art/1960.81) | Water Lilies (Agapanthus), c. 1915–26 | Broad pond surface and plants; strong landscape proportion. [Official API record](https://openaccess-api.clevelandart.org/api/artworks/136510) identifies Monet and `share_license_status: CC0`. |
| Cleveland / [95272](https://www.clevelandart.org/art/1916.1044) | Gardener's House at Antibes, 1888 | Unoccupied house behind foliage; useful visual variety. [Official API record](https://openaccess-api.clevelandart.org/api/artworks/95272), CC0. |
| Cleveland / [130391](https://www.clevelandart.org/art/1953.155) | Spring Flowers, 1864 | Floral still life, no human forms; portrait composition suits restrained crops. [Official API record](https://openaccess-api.clevelandart.org/api/artworks/130391), CC0. |
| NGA / [74796](https://www.nga.gov/artworks/74796-japanese-footbridge) | The Japanese Footbridge, 1899 | Empty bridge, lilies and dense vegetation; landscape composition. Official page explicitly marks the media free and public domain. |

Direct originals: [Cleveland lilies](https://openaccess-cdn.clevelandart.org/1960.81/1960.81_print.jpg), [Cleveland house](https://openaccess-cdn.clevelandart.org/1916.1044/1916.1044_print.jpg), [Cleveland flowers](https://openaccess-cdn.clevelandart.org/1953.155/1953.155_print.jpg), [NGA footbridge](https://api.nga.gov/iiif/0b9cefb5-1ee4-401a-8154-8d4039191a28/full/!1800,1800/0/default.jpg). Cleveland image use follows its [Open Access policy](https://www.clevelandart.org/open-access); NGA follows its [Open Access policy](https://www.nga.gov/open-access-policy).

Rejected Cleveland [125234, Low Tide at Pourville](https://www.clevelandart.org/art/1947.196): the seemingly empty seascape visibly includes small shoreline figures. Rejected NGA [46654, Rouen Cathedral, Sunlight](https://www.nga.gov/artworks/46654-rouen-cathedral-west-facade-sunlight): the museum's own visual description explicitly identifies tiny people in the lower left.

## Other candidates not used

The Met's [437127 Bridge over a Pond of Water Lilies API record](https://collectionapi.metmuseum.org/public/collection/v1/objects/437127) and [438007 Path through the Irises API record](https://collectionapi.metmuseum.org/public/collection/v1/objects/438007) currently return `isPublicDomain: false` and empty primary-image fields. Do not label these Met image downloads CC0 or invent an asset URL. A separate openly licensed reproduction would require independent source verification.

NGA [46524 Rouen Cathedral](https://www.nga.gov/artworks/46524-rouen-cathedral-west-facade) and [46657 Palazzo da Mula](https://www.nga.gov/artworks/46657-palazzo-da-mula-venice) were explored and downloaded but are unnecessary for this implementation. The latter includes unoccupied-looking gondolas; the former is a portrait composition with potentially ambiguous dark strokes near the lower edge. Leave them outside the conservative pool.

## Implementation recommendation

Use the 23-work conservative pool, keeping each page's active sections distinct. Reuse a work across different pages if needed rather than introducing a painting with uncertain human content. Inactive manifest entries may share safe works. Keep native image proportions, existing responsive WebP sizes, existing baked luminosity colors, existing CSS overlays and origami layers. No layout, text, typography, button, or motion changes are needed for this request.

Visual-review artifacts are local ignored scratch files: `.taste-skill/monet-review-sheet.png`, `.taste-skill/monet-sources/cleveland-*.jpg`, `.taste-skill/monet-sources/nga-74796.jpg`. Museum descriptions corroborate identity and rights; the selection judgment comes from inspecting the pictures themselves.
