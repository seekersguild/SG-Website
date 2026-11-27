# Seekers Guild website playbook

**Status:** Project documentation source of truth for the current `feat/new-pages` work. **Reviewed:** 27 November 2026. **Scope:** How we document, design, build, verify, and release this website. This playbook describes the intended local implementation; it does not claim that unmerged work is live.

Start with the [project README](../README.md) for setup and commands. Use this file for decisions and review criteria. The code is authoritative for implemented behavior; the deployed site is authoritative for what visitors can actually use. GitHub issues track unfinished work. Source documents and named guild owners are authoritative for organizational facts and commitments. If these disagree, record the discrepancy and resolve it before publishing a claim.

## Documentation rule

Keep two entry points: `README.md` for running the project and this playbook for durable decisions. Add a separate Markdown file only when a tool requires a fixed path, the content has a different audience or access level, or a substantial reference cannot be kept readable here. Do not create a file for one task, one screenshot, a transient audit, or an implementation diary. Put short decisions under the relevant heading here; put changing facts in the content source; put pending work in an issue. Remove or update superseded guidance in the same change.

Each durable entry should answer: **what is the rule, why does it exist, where is it implemented, and how do we know it still holds?** Use direct links to code or primary evidence. Label a proposal as a proposal, a local implementation as local, and a live fact as live. Date claims that can expire. Keep one owner or review trigger for changing operational facts. Avoid duplicating copy from `app/content/` in prose.

### Quality score for Markdown changes

Score each criterion **0 = missing/wrong, 1 = partly useful, 2 = clear and verified**. A durable doc is ready at **8/10 or better**, with **2/2 for accuracy and maintenance**. If the change is a short correction, assess only the affected entry and its links.

| Criterion | A 2/2 looks like |
| --- | --- |
| Accuracy | Matches the current branch and explicitly distinguishes local, merged, and live states; factual claims have a source. |
| Usefulness | A teammate can make or review a decision from it without asking what to do next. |
| Findability | Clear heading, short lead, links to the exact code or source; no second document says the same thing. |
| Brevity | Keeps the decision and material tradeoff, cuts narration, old experiments, and implementation trivia that code already explains. |
| Maintenance | States who/what triggers a review, labels provisional claims, and updates or removes conflicting guidance. |

**Hard stop regardless of score:** broken links, invented metrics or partner benefits, an obsolete component presented as current, a private contact published without approval, or a research inference presented as a confirmed guild policy.

Before merging a doc change: search for conflicting mentions (`rg`), check links/paths, compare with the relevant code and current site, and reread the affected section as a newcomer. For UI guidance, verify representative phone, tablet, and desktop rendering rather than trusting prose alone.

## Project map and ownership

| Concern | Canonical location |
| --- | --- |
| Routes, metadata, section order | `app/` page files and `app/layout.tsx` |
| Guild copy, membership, programmes, contacts | `app/content/site.ts`; page-specific proposal copy in `app/content/partnership.ts` |
| Luma event normalization and fallback | `app/content/events.ts`, `app/content/luma-snapshot.json` |
| Painting identity, source, license, responsive files | `app/content/monet.json` |
| Shared visual tokens and section styling | `app/styles/00-tokens.css`, imported through `app/globals.css`; component styles under `app/styles/` |
| Reusable site behavior | `app/components/` |
| Release mechanics | `package.json`, `scripts/preversion.mjs`, `scripts/release-notes.mjs`, `.github/workflows/release.yml` |

The current local architecture is a multi-page Next.js App Router site. The root layout owns the common header, footer, gathering bar, fonts, and global behavior; each route owns its page content and metadata. Preserve one visible H1 per page and working inbound hashes when moving sections. Do not restore old `SiteFrame`, Quests, Scrolls, or Subguild guidance: those belong to an abandoned layout.

## Visitor and content decisions

The site serves newcomers, prospective members, contributors, and organizational partners. Each page should answer its visitor's next practical question without repeating a large page index or generic introduction. Lead with substantive content; use one obvious action for the visitor's primary task. A desktop section should have enough visual presence to feel intentional, but extra height must come from composition and breathing room, not filler copy or duplicate cards.

For a first visit, make attendance, cost, arrival/preparation, and the welcome route easy to find. Public Open Table attendance and formal membership are distinct. Membership is free; the published two-endorsement and review process must not be silently changed. Confirm the missing mechanics and expectations with guild leads before promising details. Luma remains the registration source of truth; event-specific time and venue override typical programme descriptions. When no event is upcoming, use an honest Luma visit action rather than a stale Reserve action.

For programmes, state the audience, actual format, current status, contribution route, and next step. Distinguish active, selective, planned, and completed work. A provincial mission does not imply an active chapter, remote session, travel support, or funded role. For volunteering or mentoring, publish a role only when a team member can own enquiries. For community stories, use real dated work, permissioned photos, attribution, and an outcome or useful link. Never create a testimonial or project to fill a layout.

For partners, the reading order is **invitation and credible evidence → relevant programmes → ways to collaborate → a direct, monitored contact**. Keep each opportunity's contribution and possible return together. Annual Anchor, Program, Event Support, In-Kind, and Media are arrangement names, not fixed entitlements. Brand placements, content, speaking, access, quantities, timing, and reporting are negotiated until approved. Label historical figures with period/source; separate projections; never imply guaranteed ROI. The local page uses `PartnershipSections.tsx` and `35-partnerships.css`. Do not publish an unavailable primer download, unapproved logo, or unverified contact detail. A proposal/pitch deck is a separate deliverable only if commissioned.

Confirmed partnership source boundaries from the supplied *Seekers Guild — Community Overview 2026*: founded April 2025; 200+ members reached; 10+ institutions and industry partners; recorded relationships with Apex Human, Internly, SnappyStrip, GDG on Campus PUP, and Tutorials Dojo. The AWS Student Community Day Mega Manila 2025 Gold Partner label applies to that event; its 20+ universities are not guild attendance. Confirm current relationship status and logo permission before a new public claim. The supplied overview names Alexandre Andrei Nevero as Chief Partnership Officer; confirm contact details and monitoring before publishing or changing them. It provides no verified social impressions, engagement rate, website traffic, or attendance totals, so those numbers remain unpublished.

## Visual and interaction decisions

The visual system is sapphire/deep navy, near-white, and heliodor gold. Cinzel is for short guild/display headings, Lora for statements and literary quotes, Montserrat for scanning and body copy. Use tokens from `00-tokens.css`, shared content widths, and the existing section hierarchy; avoid one-off type sizes. Paragraphs need comfortable line length and contrast. Make links visibly actionable, controls keyboard reachable, and tap targets at least the shared control minimum. Keep the mobile menu and floating gathering bar from covering content; the bar yields to the footer.

Monet paintings provide depth *under* the white, blue, or dark-blue treatment and *under* the polygon creases. They should remain subtle and sharp at their rendered size, with no forced zoom that exposes poor resolution. Backgrounds are not a reason to add hues, heavy gradients, glows, new ornamental rules, or motion. `Paint` and `monet.json` own image assignment and source metadata; inspect both the original image and the rendered crop. Use the conservative human-free painting pool below. The low-poly compass is the distinctive motion; supporting transitions should be restrained, smooth, interruptible, and disabled or simplified for reduced motion. Animate transform/opacity where possible and avoid scroll-driven visual noise.

Responsive layouts are composed for their actual width, not a scaled desktop screenshot. Check narrow phones, larger phones, portrait and landscape tablets, laptop, and wide desktop. Verify headings, image quality, readable body width, navigation, touch actions, fixed elements, safe-area edges, and no horizontal overflow. A section's reading order must remain clear when columns stack. Do not bury essential partner or newcomer information in hover or disclosure controls.

## Evidence and provenance retained from prior research

The organizational-site comparison (25 November 2026) informed the content-first page openings: [Mozilla Foundation](https://www.mozillafoundation.org/en/meet-mozilla/) for concise identity and mission, [charity: water](https://www.charitywater.org/our-work) for evidence near claims, [Angat Buhay](https://www.angatbuhay.ph/ab-be-involved/) for distinct participation routes, and [Wikimedia Foundation](https://wikimediafoundation.org/participate/) for contextual actions. These are observed content patterns, not conversion evidence or layouts to copy.

The community comparison (22 November 2026) found [Socratica](https://socratica.info/) useful for first-visit clarity, [DEVCON Philippines](https://devcon.ph/start-here/) for separating attendance, contribution, and regional activity, [Recurse Center](https://www.recurse.com/apply) for explaining selective joining, [Hack Club](https://hackclub.com/) for real member work, and [DEVCON partnerships](https://devcon.ph/partner/) for specific collaboration routes. The finding is to improve placement of existing information and collect missing guild decisions—not to add a newsletter, member portal, or invented programme. These were public-page observations, not visitor interviews.

The painting review (26 November 2026) checked originals for visible people and verified museum identity and rights. The conservative existing Art Institute of Chicago IDs are **16568, 64818, 87088, 16564, 81537, 14624, 16549, 4783, 16584, 20545, 97933, 4887, 81545, 111318, 81546, 14634, 100191, 16560, 16579**. Also approved: [Cleveland 136510](https://www.clevelandart.org/art/1960.81), [95272](https://www.clevelandart.org/art/1916.1044), [130391](https://www.clevelandart.org/art/1953.155), and [NGA 74796](https://www.nga.gov/artworks/74796-japanese-footbridge). [AIC open access](https://www.artic.edu/open-access/open-access-images), [Cleveland open access](https://www.clevelandart.org/open-access), and [NGA open access](https://www.nga.gov/open-access-policy) support the image rights; individual source URLs and derivatives live in `monet.json`. Avoid AIC **16571, 14620, 14598, 81539, 16554, 81540** (visible figures), **59927, 20535, 86998, 16544, 103139, 20701, 14630** (ambiguous people/boats), Cleveland **125234**, and NGA **46654**. Human-free is a visual judgment, not a museum catalogue field. Reuse a verified work before introducing an uncertain one.

## Verification and release

For UI/content changes, run `npm run lint`, `npm run build`, and the relevant smoke/browser checks. Verify actual phone/tablet/desktop rendering for visual changes. Check the published destination after deployment; a passing local build does not close a production-facing issue. For claims, check the guild source and owner, links, dates, approval, and current programme/event status. Keep issue acceptance criteria as the closure checklist.

Releases are cut from a clean `main` with `npm run release:patch`, `release:minor`, or `release:major`. The preversion script checks branch and type safety; tagging triggers `.github/workflows/release.yml`, which installs, checks, builds, and publishes notes from `feat:`, `fix:`, and related commit messages. `npm run release:notes` previews those notes. Use patch for fixes/copy, minor for new features, major for major redesign/URL changes. A GitHub Release records a version; hosting deployment is separate. Verify the deployed commit and key routes before closing issues. If Luma is unavailable during build, the saved event snapshot is the fallback, so stale-event classification still needs review.

## Maintenance triggers

Update this playbook when a durable rule, architecture boundary, public fact source, or release workflow changes. Update `README.md` when setup or commands change. Update `app/content/` when page copy or live data changes. Review event and partner claims whenever their source changes; review organizational roles, contacts, policies, and metrics with their owners before publishing. If a section of this playbook stops helping a teammate make a decision, shorten or remove it rather than creating another companion doc.
