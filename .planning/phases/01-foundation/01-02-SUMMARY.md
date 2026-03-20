---
phase: 01-foundation
plan: 02
subsystem: content
tags: [json, data-schema, content-management, static-site]

# Dependency graph
requires:
  - phase: 01-foundation plan 01
    provides: style.css design token system (CSS custom properties, typography, spacing)
provides:
  - data.json at repository root — complete content schema and real populated data for all site sections
  - Field name contract for all render scripts in Phases 3–6
  - Photo file naming convention (photo-01.jpg through photo-13.jpg) Plan 03 must match
affects:
  - 01-03 (image optimization — must name files photo-01.jpg through photo-13.jpg to match data.json)
  - Phase 3 (clips render script reads clips[], photos[], about)
  - Phase 4 (gallery render reads photos[])
  - Phase 5 (knight_lab render reads knight_lab object)
  - Phase 6 (video render reads videos[])

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "_instructions key in JSON for self-documenting non-technical editing guidance"
    - "PLACEHOLDER strings (not empty strings) for fields needing future input"
    - "Explicit field naming as public API contract between content and render scripts"

key-files:
  created:
    - data.json
  modified: []

key-decisions:
  - "data.json field names are a public API — changing them requires updating every render script that references them"
  - "Photos array uses images/photo-01.jpg through photo-13.jpg naming; Plan 03 must match this exactly when running sips optimization"
  - "videos.embedUrl and knight_lab.description use explicit PLACEHOLDER strings — not empty strings — so Grace can distinguish unfilled fields from intentionally empty ones"
  - "All 13 photos included as placeholder entries; curation to 8-12 deferred to Phase 4"

patterns-established:
  - "Pattern 1: JSON self-documentation via _instructions key — non-technical users can edit content without reading source code"
  - "Pattern 2: PLACEHOLDER strings with descriptive context (not empty strings or TBD) for any field requiring future input"

requirements-completed: [SITE-05]

# Metrics
duration: 3min
completed: 2026-03-20
---

# Phase 1 Plan 02: data.json Content Schema Summary

**Single-file content schema for all 7 site pages — 3 real clips, 11 awards, 3 press items, and structured placeholders for photos/videos ready for Phases 3-6 render scripts**

## Performance

- **Duration:** ~3 min
- **Started:** 2026-03-20T22:15:58Z
- **Completed:** 2026-03-20T22:18:30Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- data.json created at repository root, parses as valid JSON
- All 10 top-level keys present with correct field names (the render-script API contract is locked)
- 3 published clips fully populated with live URLs verified against grace-gormley-portfolio-reference.md
- 11 awards populated — includes article URLs and Google Drive PDF fallback links where available
- 3 press coverage entries with live URLs (Verde Magazine, Hearts of Gold Podcast, Paly Voice)
- about object contains Grace's real bio, email, LinkedIn, headshot path (images/headshot.jpg), and resume path
- 13 photo placeholder entries using images/photo-01.jpg through photo-13.jpg naming convention
- Videos and knight_lab.description use explicit PLACEHOLDER strings (not empty strings)
- _instructions key at top provides non-technical editing guidance for Grace

## Task Commits

Each task was committed atomically:

1. **Task 1: Create data.json with complete schema and fully populated real content** - `4894212` (feat)

## Files Created/Modified
- `/Users/gracegormley/Desktop/Grace's Website/data.json` — Single content-editing surface for all site sections; field names are the API contract for Phase 3-6 render scripts

## Top-Level Key Inventory

| Key | Type | Count / Status |
|-----|------|----------------|
| `_schema_version` | string | "1.0" |
| `_instructions` | string | Non-technical editing guidance |
| `clips` | array | 3 entries — all real content with live URLs |
| `photos` | array | 13 entries — all PLACEHOLDER (captions/alt); file paths locked to images/photo-NN.jpg |
| `videos` | array | 2 entries — titles real; embedUrl = explicit PLACEHOLDER |
| `awards` | array | 11 entries — all real content; some url fields empty (no live article), pdf_fallback populated |
| `press_coverage` | array | 3 entries — all real content with live URLs |
| `about` | object | All real content (name, bio, email, linkedin, headshot, resume_pdf) |
| `knight_lab` | object | project_name, live_url, grace_role, tools = real; description = explicit PLACEHOLDER |
| `suso_camp` | object | overview, website_url, girl_scout_award, impact, pillars (4) = all real content |

## Real Content vs. Placeholder

**Real content (populated from grace-gormley-portfolio-reference.md):**
- clips[].title, .publication, .date, .url, .note (all 3)
- awards[].name, .organization, .year, .article_title, .url/.pdf_fallback (all 11)
- press_coverage[].outlet, .title, .url, .description (all 3)
- about.name, .tagline, .bio, .headshot, .headshot_credit, .email, .linkedin, .resume_pdf
- knight_lab.project_name, .subtitle, .live_url, .grace_role, .tools
- suso_camp.overview, .website_url, .girl_scout_award, .impact, .pillars[0-3]

**Explicit PLACEHOLDER strings (require future input from Grace):**
- photos[0-12].caption — "PLACEHOLDER — one sentence of story context..."
- photos[0-12].alt — "PLACEHOLDER — accessible description..."
- videos[0-1].embedUrl — "PLACEHOLDER — YouTube or Vimeo embed URL needed from Grace"
- knight_lab.description — "PLACEHOLDER — Content brief with Grace needed..."

**Empty strings (intentionally empty — no data exists yet):**
- clips[].pdf_fallback — no PDF versions of published articles
- awards[5-6].url — no live article URL exists for "Beyond the Game" and "Breaking the Mold"
- awards[7].article_title, .url, .pdf_fallback — Excellence Award has no associated article
- awards[9-10].pdf_fallback — photo awards have no PDF fallback

## Photo File Naming Convention

Plan 03 MUST use this exact naming when running sips optimization:

| data.json entry | Original source file (approximate — Plan 03 determines exact mapping) |
|-----------------|-----------------------------------------------------------------------|
| images/photo-01.jpg | fave2.JPG |
| images/photo-02.jpg | IMG_0307 copy.JPG |
| images/photo-03.jpg | IMG_0632 copy.JPG |
| images/photo-04.jpg | IMG_8141 copy.JPG |
| images/photo-05.jpg | IMG_8321 copy.JPG |
| images/photo-06.jpg | IMG_8601 copy.JPG |
| images/photo-07.jpg | IMG_8734 copy.JPG |
| images/photo-08.jpg | IMG_9609.JPG |
| images/photo-09.jpg | IMG_9697 copy.JPG |
| images/photo-10.jpg | Lucy dive (also rly good).jpg |
| images/photo-11.jpg | IMG_0720.jpg |
| images/photo-12.jpg | IMG_0945.jpg |
| images/photo-13.jpg | IMG_8449-2 copy.jpg |

Headshot: `images/headshot.jpg` (from `GORMLEY, GRACE_SAMPLE_Jun2025_WEB_9 copy.jpg`)

The exact photo-to-filename mapping can be adjusted in Plan 03 — what must NOT change is the `images/photo-NN.jpg` pattern, since these paths are now the API contract in data.json.

## Decisions Made
- data.json field names are locked as a public API — any rename requires updating every Phase 3-6 render script that references that field
- All 13 gallery photos included as placeholder entries; curation to 8-12 deferred to Phase 4 (curation is cheaper than re-optimization)
- knight_lab.description left as explicit PLACEHOLDER — content brief with Grace required before Phase 5
- video embedUrls left as explicit PLACEHOLDER — Grace must provide YouTube/Vimeo links before Phase 6

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness
- data.json is valid JSON and locked — Phase 3-6 render scripts can be written against this schema now
- Plan 03 (image optimization) can begin immediately — photo-NN.jpg naming convention is defined here
- Knight Lab page (Phase 5) requires a content brief session with Grace before coding — description PLACEHOLDER must be filled first
- Video page (Phase 6) requires embed URLs from Grace before the page can be functional

---
*Phase: 01-foundation*
*Completed: 2026-03-20*
