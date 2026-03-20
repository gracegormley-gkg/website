---
phase: 02-shell-and-about
plan: 02
subsystem: ui
tags: [html, css, static-html, about-page, resume-download, web-components]

# Dependency graph
requires:
  - phase: 02-shell-and-about
    plan: 01
    provides: components.js SiteNav/SiteFooter custom elements, nav/footer CSS, style.css design tokens
  - phase: 01-foundation
    provides: style.css design tokens (colors, spacing, typography), images/headshot.jpg
provides:
  - index.html About page (headshot, name h1, tagline, bio, resume download button, headshot credit)
  - assets/resume.pdf at same-origin path for download attribute to work
  - About page CSS classes in style.css (.about-page, .about-hero, .about-headshot, .about-tagline, .about-bio, .btn-download, .about-credit)
affects:
  - GitHub Pages root URL (index.html is the entry point visitors see first)
  - Resume download flow

# Tech tracking
tech-stack:
  added: []
  patterns: [static HTML About page (no runtime fetch), same-origin PDF download via HTML download attribute]

key-files:
  created:
    - index.html
    - assets/resume.pdf
  modified:
    - style.css

key-decisions:
  - "Tagline replaced from generic data.json value to 'Reporting with data. Writing with purpose.' — names both journalism and data angles distinctively"
  - "Static HTML used for About content (no fetch from data.json) — renders instantly, works with JS disabled, content is stable"
  - "assets/resume.pdf served at same origin so HTML download attribute works without restriction"
  - "download attribute suggests Grace-Gormley-Resume.pdf as the saved filename; actual file on disk stays as resume.pdf"

patterns-established:
  - "About layout: flex hero (headshot + text) above bio and CTA, max-width constrained to --max-width-content (720px)"
  - "btn-download: accent-colored inline-block anchor with padding, font-weight 600, hover darkens via --color-link-hover"

requirements-completed: [ABOUT-01, ABOUT-02, ABOUT-03]

# Metrics
duration: 4min
completed: 2026-03-20
---

# Phase 2 Plan 02: About Page Summary

**Static index.html About page with headshot, distinctive editorial tagline, bio, and same-origin resume PDF download via HTML download attribute**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-03-20T23:08:29Z
- **Completed:** 2026-03-20T23:12:00Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Built index.html as the portfolio entry point: headshot (images/headshot.jpg), h1 name, editorial tagline, bio paragraph, styled Download Resume button, and photo credit
- Replaced generic tagline ("Journalism and data science student at Northwestern University Medill") with distinctive editorial byline "Reporting with data. Writing with purpose." (satisfies ABOUT-03)
- Created assets/resume.pdf (101 KB) copied from project root source — download attribute on same-origin link suggests Grace-Gormley-Resume.pdf as saved filename
- Appended About page CSS block to style.css consuming Phase 1 design tokens exclusively

## Task Commits

Each task was committed atomically:

1. **Task 1: Create index.html — About page with headshot, tagline, bio, and resume download** - `baf4d19` (feat)
2. **Task 2: Create assets/ directory and copy resume PDF** - `d968edf` (feat)

## Files Created/Modified

- `index.html` - Complete About page: SiteNav + SiteFooter web components, headshot, h1, tagline, bio, Download Resume button, photo credit
- `style.css` - About page CSS appended after Phase 2 nav/footer rules (.about-page, .about-hero, .about-headshot, .about-tagline, .about-bio, .about-actions, .btn-download, .about-credit)
- `assets/resume.pdf` - Resume PDF (101 KB) served at same origin for download attribute

## Decisions Made

- Static HTML chosen over runtime fetch from data.json — About content is stable, renders with JS disabled, and eliminates async delay on first impressions
- Tagline "Reporting with data. Writing with purpose." embedded directly in HTML rather than pulled from data.json; data.json tagline field was too generic for ABOUT-03
- `download="Grace-Gormley-Resume.pdf"` attribute suggests the saved filename to the browser while keeping the on-disk filename as `resume.pdf` for simplicity
- Phase 1 design tokens used throughout About CSS — no new variables introduced, consistent with existing design system

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None — both tasks completed cleanly on first attempt. Automated verifications passed (index.html content check: OK; assets/resume.pdf size: 101 KB).

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- About page (index.html) is the site's complete entry point — headshot, bio, and resume download are live
- Phase 3 (clips) can begin — clips.html stub is ready for content from Plan 01
- GitHub Pages will serve index.html at the root URL; the "About" nav link will correctly highlight on both `/` and `/index.html` due to the `|| 'index.html'` fallback in components.js

---
*Phase: 02-shell-and-about*
*Completed: 2026-03-20*
