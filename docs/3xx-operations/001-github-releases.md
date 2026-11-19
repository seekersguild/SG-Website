# GitHub Releases

## Rationale

Each published version of the site should be easy to point at: what changed, when, and which commit is live. Releases are cut from `main` by pushing a version tag. A GitHub Action checks and builds that exact commit, then publishes a GitHub Release whose notes are written from the commit messages since the previous release.

| Piece | File |
| --- | --- |
| Version bump, tag and push | `npm run release:patch` / `release:minor` / `release:major` (`package.json`) |
| Release job | `.github/workflows/release.yml` |
| Release notes | `scripts/release-notes.mjs` |

## Pseudocode Example

```text
on main, clean tree:
  npm run release:minor
    preversion  -> tree clean? on main? type-check passes?
    npm version -> package.json 0.1.0 -> 0.2.0, commit "chore(release): v0.2.0", tag v0.2.0
    postversion -> git push origin main --follow-tags

GitHub Action (tag v*.*.* pushed):
  tag == "v" + package.json version?   else fail
  tagged commit is on main?            else fail
  npm ci -> lint -> build              any failure: no release
  notes = commits since previous tag, grouped by feat / fix / perf / refactor / docs / other
  gh release create v0.2.0 (marked pre-release when the tag has a suffix such as -rc.1)
```

## Critical Quirks

- **Commit messages are the changelog.** Write them as `feat: …`, `fix: …`, `perf: …`, optionally scoped (`fix(events): …`). `feat!: …` or a `BREAKING CHANGE:` line in the body goes under "Breaking changes". Anything else lands in "Other changes". Preview with `npm run release:notes`.
- **Which number to bump:** `patch` for fixes and copy edits, `minor` for new sections or features, `major` for a redesign or a change of URL structure.
- `npm version` refuses to run with uncommitted changes, and `preversion` also refuses anywhere but `main`. Merge the branch first.
- Pre-releases: `npm version prerelease --preid rc -m "chore(release): v%s"` makes `v0.3.0-rc.0`, published as a pre-release.
- If the Action fails, the tag is already on GitHub but there is no release. Fix the problem on `main`, then delete the tag (`git push origin :refs/tags/vX.Y.Z` and `git tag -d vX.Y.Z`) and release again.
- The release build fetches events from Luma like any build; if Luma is unreachable it falls back to `app/content/luma-snapshot.json`, so a Luma outage does not block a release.
- A release records a version; it does not deploy. Deployment stays with the hosting provider's own Git integration.

## When to Use

Whenever a set of changes on `main` is ready to be called a version: after a redesign, a new section, or a batch of fixes worth announcing.

## When Not to Use

Not for every commit. Small copy edits can go out with the next release.
