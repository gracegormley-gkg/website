---
phase: 01-foundation
plan: 03
subsystem: assets
tags: [images, sips, jpeg, optimization, photography]

# Dependency graph
requires:
  - phase: 01-foundation plan 02
    provides: data.json with photo naming convention (images/photo-01.jpg through photo-13.jpg)
provides:
  - images/ directory with 14 web-ready JPEG files at ≤ 2000px
  - images/headshot.jpg — optimized portrait for About page
  - images/photo-01.jpg through images/photo-13.jpg — optimized gallery photos
affects:
  - Phase 2 (About page headshot — images/headshot.jpg)
  - Phase 4 (Photography gallery — images/photo-01.jpg through photo-13.jpg)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "sips two-step process: resize with -Z 2000, then recompress with -s formatOptions 65-75"
    - "Quality floor of 65 — files over 400 KB at q65 are flagged but left at quality floor rather than degraded further"
    - "Headshot uses quality 65-75 range (portrait fidelity), gallery uses quality 65-70"

key-files:
  created:
    - images/headshot.jpg
    - images/photo-01.jpg
    - images/photo-02.jpg
    - images/photo-03.jpg
    - images/photo-04.jpg
    - images/photo-05.jpg
    - images/photo-06.jpg
    - images/photo-07.jpg
    - images/photo-08.jpg
    - images/photo-09.jpg
    - images/photo-10.jpg
    - images/photo-11.jpg
    - images/photo-12.jpg
    - images/photo-13.jpg
  modified: []

key-decisions:
  - "Quality floor of 65 applied — 9 files exceed 400 KB at quality 65 and are flagged for Phase 4 curation review; a slightly over-spec photo is better than a visibly degraded one"
  - "Photos 11-13 source files were 2048px (not 2000px) — resized to 2000px before recompression to satisfy dimension spec"
  - "Source originals in project root are untouched — images/ contains copies, not moved files"

patterns-established:
  - "Pattern 1: Two-step sips optimization — resize first (-Z 2000), then recompress (-s formatOptions N) in separate passes"
  - "Pattern 2: Quality floor 65 with summary flagging — never degrade below q65, always document over-budget files"

requirements-completed: [PHOTO-04]

# Metrics
duration: 5min
completed: 2026-03-20
---

# Phase 1 Plan 03: Image Optimization Summary

**14 web-ready JPEGs in images/ via sips — all ≤ 2000px; 5 files within 400 KB budget, 9 at quality floor 65 flagged for Phase 4 curation**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-03-20T22:19:56Z
- **Completed:** 2026-03-20T22:24:00Z
- **Tasks:** 1
- **Files modified:** 14 (created)

## Accomplishments
- images/ directory created with all 14 required files
- All 14 images ≤ 2000px on longest edge (verified via sips dimension check)
- Gallery photos 01-10 resized from 5184-6000px to 2000px, then compressed
- Photos 11-13 resized from 2048px to 2000px (source files were larger than expected), then compressed
- Headshot recompressed without resize (already 1600x1200)
- Source originals in project root confirmed untouched (original file sizes/timestamps preserved)
- All 14 filenames match data.json photo file paths exactly

## Task Commits

Each task was committed atomically:

1. **Task 1: Optimize all 14 images using sips and write to images/** - `e9c0eb8` (feat)

## Files Created/Modified

| File | Dimensions | Size | Quality | Status |
|------|-----------|------|---------|--------|
| `images/headshot.jpg` | 1600x1200 | 458 KB | 65 | Over 400 KB — quality floor reached |
| `images/photo-01.jpg` | 2000x1333 | 384 KB | 70 | Within budget |
| `images/photo-02.jpg` | 2000x1333 | 461 KB | 65 | Over 400 KB — quality floor reached |
| `images/photo-03.jpg` | 2000x1333 | 440 KB | 65 | Over 400 KB — quality floor reached |
| `images/photo-04.jpg` | 2000x1333 | 247 KB | 70 | Within budget |
| `images/photo-05.jpg` | 2000x1333 | 430 KB | 65 | Over 400 KB — quality floor reached |
| `images/photo-06.jpg` | 2000x1333 | 426 KB | 65 | Over 400 KB — quality floor reached |
| `images/photo-07.jpg` | 2000x1333 | 408 KB | 65 | Over 400 KB — quality floor reached |
| `images/photo-08.jpg` | 2000x1333 | 333 KB | 70 | Within budget |
| `images/photo-09.jpg` | 2000x1333 | 376 KB | 70 | Within budget |
| `images/photo-10.jpg` | 2000x1333 | 438 KB | 65 | Over 400 KB — quality floor reached |
| `images/photo-11.jpg` | 2000x1333 | 391 KB | 65 | Within budget (after resize from 2048px) |
| `images/photo-12.jpg` | 2000x1333 | 730 KB | 65 | Over 400 KB — quality floor reached |
| `images/photo-13.jpg` | 2000x1333 | 652 KB | 65 | Over 400 KB — quality floor reached |

**Within budget (≤ 400 KB):** photo-01, photo-04, photo-08, photo-09, photo-11 (5 of 14)
**At quality floor, over budget:** headshot, photo-02, photo-03, photo-05, photo-06, photo-07, photo-10, photo-12, photo-13 (9 of 14)

## Source to Target Mapping

| Source file (project root) | Target file (images/) |
|---------------------------|----------------------|
| `fave2.JPG` | `images/photo-01.jpg` |
| `IMG_0307 copy.JPG` | `images/photo-02.jpg` |
| `IMG_0632 copy.JPG` | `images/photo-03.jpg` |
| `IMG_8141 copy.JPG` | `images/photo-04.jpg` |
| `IMG_8321 copy.JPG` | `images/photo-05.jpg` |
| `IMG_8601 copy.JPG` | `images/photo-06.jpg` |
| `IMG_8734 copy.JPG` | `images/photo-07.jpg` |
| `IMG_9609.JPG` | `images/photo-08.jpg` |
| `IMG_9697 copy.JPG` | `images/photo-09.jpg` |
| `Lucy dive (also rly good).jpg` | `images/photo-10.jpg` |
| `IMG_0720.jpg` | `images/photo-11.jpg` |
| `IMG_0945.jpg` | `images/photo-12.jpg` |
| `IMG_8449-2 copy.jpg` | `images/photo-13.jpg` |
| `GORMLEY, GRACE_SAMPLE_Jun2025_WEB_9 copy.jpg` | `images/headshot.jpg` |

## Files at Quality Floor — Phase 4 Curation Review

The following 9 files exceed 400 KB even at quality 65. Per plan spec, they are left at quality 65 rather than degraded further. Phase 4 should consider whether to keep or replace these in the final gallery selection:

- **headshot.jpg** (458 KB) — Portrait at 1600x1200. High pixel density inherently limits compression.
- **photo-02.jpg** (461 KB) — `IMG_0307 copy.JPG` source (5184px → 2000px, q65)
- **photo-03.jpg** (440 KB) — `IMG_0632 copy.JPG` source (5184px → 2000px, q65)
- **photo-05.jpg** (430 KB) — `IMG_8321 copy.JPG` source (5184px → 2000px, q65)
- **photo-06.jpg** (426 KB) — `IMG_8601 copy.JPG` source (5184px → 2000px, q65)
- **photo-07.jpg** (408 KB) — `IMG_8734 copy.JPG` source (5184px → 2000px, q65)
- **photo-10.jpg** (438 KB) — `Lucy dive (also rly good).jpg` source (6000px → 2000px, q65)
- **photo-12.jpg** (730 KB) — `IMG_0945.jpg` source (2048px → 2000px, q65). High-detail shot resists compression.
- **photo-13.jpg** (652 KB) — `IMG_8449-2 copy.jpg` source (2048px → 2000px, q65). High-detail shot resists compression.

Note: photo-12 and photo-13 are particularly large because they were already-compressed JPEGs at 2048px with high detail. Re-encoding from a compressed source at quality 65 still produces large output when the image has dense high-frequency content.

## Decisions Made

- Quality floor of 65 applied — 9 files exceed 400 KB at this floor. Per plan: "a slightly over-spec photo is better than a visibly degraded one." These are flagged for Phase 4 curation review.
- Photos 11-13 source files were 2048px wide (not 2000px) — resized to 2000px before recompression to satisfy the ≤ 2000px dimension spec. This was not noted in the plan's source dimensions but the fix is straightforward.
- Source originals in project root are entirely untouched — images/ holds copies only.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Resized photos 11-13 from 2048px to 2000px**
- **Found during:** Task 1 (dimension verification)
- **Issue:** Plan's Step 3 said "skip the resize step (already ≤ 2048px)" but the spec requires ≤ 2000px. At 2048px, the files would fail the dimension check.
- **Fix:** Added a `-Z 2000` resize pass before the quality recompression for photos 11-13
- **Files modified:** images/photo-11.jpg, images/photo-12.jpg, images/photo-13.jpg
- **Verification:** sips dimension check confirms all three now at 2000x1333
- **Committed in:** e9c0eb8 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — dimension spec compliance)
**Impact on plan:** Essential for spec compliance. No scope creep.

## Issues Encountered

- Several files remain over 400 KB at quality floor 65. This is expected behavior for high-detail photos at 2000px — the plan explicitly accounts for this scenario. All 9 over-budget files are flagged above for Phase 4 review.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- images/ is committed and ready — Phase 2 (About page) can render `images/headshot.jpg`
- Phase 4 (Photography gallery) can render `images/photo-01.jpg` through `images/photo-13.jpg`
- Phase 4 should review the 9 over-budget files during photo curation — if any are replaced, re-run sips optimization on the replacement
- All filenames in images/ match data.json paths exactly — no data.json changes needed

---
*Phase: 01-foundation*
*Completed: 2026-03-20*
