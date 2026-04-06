---
phase: 04-photography-gallery
plan: 02
subsystem: ui
tags: [jpeg, sips, compression, github-pages, photography]

# Dependency graph
requires:
  - phase: 04-01
    provides: photography gallery HTML/CSS/JS with 13 photos and captions
provides:
  - photo-12.jpg re-optimized to 331 KB (1200x800, q65)
  - photo-13.jpg re-optimized to 318 KB (1200x800, q65)
  - Live deployment at https://gracegormley-gkg.github.io/website/photos.html
affects: [05-featured-projects, 06-video]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "sips JPEG compression: q65 sufficient for most images; large detail-rich images require dimension reduction to 1200px to meet 400 KB floor"

key-files:
  created: []
  modified:
    - images/photo-12.jpg
    - images/photo-13.jpg

key-decisions:
  - "photo-12 and photo-13 resized from 2000px to 1200px wide (at q65) — sips quality floor of 45 alone could not reach 400 KB due to high-detail image content; resizing preserved quality while meeting size target"

patterns-established:
  - "For high-detail-density photos: reduce pixel dimensions to ~1200px rather than pushing quality below q45"

requirements-completed: [PHOTO-01]

# Metrics
duration: 10min
completed: 2026-04-06
---

# Phase 4 Plan 02: Re-optimize Images and Deploy Summary

**photo-12 and photo-13 compressed to 331 KB and 318 KB respectively (1200x800 px, q65) and shipped to GitHub Pages — photography gallery live at https://gracegormley-gkg.github.io/website/photos.html**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-04-06T13:40:00Z
- **Completed:** 2026-04-06T13:45:00Z
- **Tasks:** 2 of 2 complete (Task 1 automated, Task 2 human-verified — approved)
- **Files modified:** 2

## Accomplishments

- photo-12.jpg reduced from 730 KB to 331 KB (55% reduction)
- photo-13.jpg reduced from 652 KB to 318 KB (51% reduction)
- All Phase 4 changes pushed to GitHub Pages — gallery live
- 3-second load target for PHOTO-01 now achievable with all 13 images under or near 400 KB

## Task Commits

Each task was committed atomically:

1. **Task 1: Re-optimize photo-12 and photo-13, then deploy to GitHub Pages** - `a38bcd9` (feat)

2. **Task 2: Human verification of live gallery** - human-approved (no code commit)

**Plan metadata:** `895c715` (docs: complete plan), `9b1cbf3` (docs: mark gallery verified)

## Files Created/Modified

- `images/photo-12.jpg` - Re-optimized from 730 KB to 331 KB (1200x800, q65)
- `images/photo-13.jpg` - Re-optimized from 652 KB to 318 KB (1200x800, q65)

## Decisions Made

- **Resized to 1200px instead of staying at 2000px:** sips compression at quality 65, 55, and 45 all failed to bring 2000px-wide images under 400 KB due to high detail density. The plan's minimum quality floor (formatOptions 45) was reached with images still at 590 KB and 524 KB. Resizing to 1200px wide at q65 achieved both goals: meets 400 KB target and maintains good visual quality for portfolio use.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Multi-step compression approach — dimension resize required**
- **Found during:** Task 1 (Re-optimize oversized images)
- **Issue:** Plan specified q65 → q55 fallback, but both images exceeded 400 KB even at q45 (the minimum quality floor). sips JPEG quality reduction alone was insufficient for these high-detail images at 2000px width.
- **Fix:** Resized both images to 1200px wide (maintaining 3:2 aspect ratio) at q65. Result: 331 KB and 318 KB respectively.
- **Files modified:** images/photo-12.jpg, images/photo-13.jpg
- **Verification:** `ls -lh` confirms 331K and 318K
- **Committed in:** a38bcd9 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - approach adjustment to meet size target within quality floor)
**Impact on plan:** Essential — plan's target (under 400 KB) achieved while respecting the quality floor constraint. 1200px is still adequate for lightbox full-size display.

## Issues Encountered

- sips formatOptions alone (at any quality from 65 to 45) could not bring 2000px images with high-detail content under 400 KB. Solution: reduce pixel dimensions to 1200px at q65, which achieves quality preservation + size target simultaneously.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 4 complete — gallery verified working by user ("looks great")
- All 13 photos in repo, gallery HTML/CSS/JS complete, captions are real story context
- Phase 5 (Featured Projects) ready to begin
- Phase 6 (Video) still blocked on Grace providing YouTube/Vimeo embed URLs

---
*Phase: 04-photography-gallery*
*Completed: 2026-04-06*
