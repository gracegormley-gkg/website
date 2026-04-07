---
phase: 06-video-and-pre-launch
verified: 2026-04-06T00:00:00Z
status: passed
score: 9/9 must-haves verified
re_verification: false
---

# Phase 6: Video and Pre-Launch Verification Report

**Phase Goal:** Complete the Video page and deploy the full portfolio to GitHub Pages with all requirements verified by human pre-launch checklist.
**Verified:** 2026-04-06
**Status:** PASSED
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | video.html renders a video card for each entry in data.json — real iframe if embedUrl is a valid URL, styled placeholder otherwise | VERIFIED | Inline script reads `data.videos[]`, branches on `isPlaceholder(v.embedUrl)`, renders `.video-embed` iframe or `.video-placeholder` card. Both data.json entries have PLACEHOLDER strings — placeholder path active. |
| 2 | Adobe Premiere is mentioned on the Video page | VERIFIED | `video.html` line 19: "Grace Gormley produces and edits video packages using Adobe Premiere." |
| 3 | No blank or broken state appears when embedUrl is a PLACEHOLDER string | VERIFIED | Placeholder branch renders `<div class="video-placeholder"><span>Video available upon request</span></div>` — visible text, never empty. CSS gives it `aspect-ratio: 16/9`, background, border, flex-centered text. |
| 4 | All 7 pages render without horizontal scroll at 375px viewport | VERIFIED | `@media (max-width: 640px)` block in style.css (line 526) targets `.site-nav`, `.site-nav__links`, `.about-hero`, `.about-headshot`. `.video-embed` and `.video-placeholder` use `width: 100%` + `max-width: 800px` — fluid, not fixed pixel. Human pre-launch checklist confirmed no horizontal scroll on all 7 pages at 375px. |
| 5 | The nav links wrap instead of overflowing at narrow widths | VERIFIED | `@media (max-width: 640px)` sets `.site-nav__links { flex-wrap: wrap; }` and `.site-nav { flex-direction: column; }` (style.css lines 534–538). Human-verified. |
| 6 | The About hero stacks vertically on mobile instead of side-by-side | VERIFIED | `@media (max-width: 640px)` sets `.about-hero { flex-direction: column; }` and `.about-headshot { width: 140px; }` (style.css lines 539–545). Human-verified. |
| 7 | All 7 pages are live on GitHub Pages and load without errors | VERIFIED | Commits 183dc05 and 626a4d7 built the Phase 6 code; ddc3191 pushed to origin/main; 85a84a7 documents human approval. Site confirmed live at https://gracegormley-gkg.github.io/website/. |
| 8 | Every external link on clips.html and awards.html opens the correct destination | VERIFIED | Human pre-launch checklist completed — all external links click-tested and confirmed functional. |
| 9 | Resume PDF downloads when clicked on the About page | VERIFIED | Human pre-launch checklist item confirmed — "Download Resume" button downloads PDF to device. |

**Score:** 9/9 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `video.html` | Fully built Video page with fetch-and-render logic | VERIFIED | 64 lines. Contains `id="video-list"` container, `fetch('./data.json')` inline script, `isPlaceholder()`, `toEmbedUrl()`, `.video-placeholder` and `.video-embed` branches, "Adobe Premiere" intro paragraph. Not a stub. |
| `style.css` | Video CSS classes + mobile breakpoint block | VERIFIED | Lines 475–546. Contains `.video-item`, `.video-title`, `.video-embed`, `.video-embed iframe`, `.video-placeholder`, `.video-desc`, and `@media (max-width: 640px)` block with nav and hero overrides. Appended after Phase 5 `.pillar-name` block as planned. |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `video.html` inline script | `data.json videos[]` | `fetch('./data.json')` | WIRED | `fetch('./data.json')` call present at video.html line 41; `.then(function(data) { ... data.videos ... })` reads the array and renders into `#video-list`. |
| `.video-embed iframe` | youtube-nocookie.com embed URL | `toEmbedUrl()` conversion | WIRED | `toEmbedUrl()` function at lines 33–39 matches `youtube.com/watch?v=ID` and `youtu.be/ID` patterns, returns `https://www.youtube-nocookie.com/embed/` + ID. Currently inactive (PLACEHOLDER embedUrls) but logic is present and correct. |
| `@media (max-width: 640px)` | `.site-nav` and `.about-hero` | style.css breakpoint block | WIRED | Block at style.css lines 526–546 targets `.site-nav`, `.site-nav__links`, `.about-hero`, `.about-headshot` with all four override rules. |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| VIDEO-01 | 06-01, 06-02 | User can watch embedded videos on the Video page | SATISFIED | video.html fetches data.json and renders iframe for real embedUrls; placeholder card for PLACEHOLDER strings — no blank state possible. Human checklist confirmed both video cards visible. |
| VIDEO-02 | 06-01, 06-02 | Video page notes Grace's Adobe Premiere experience | SATISFIED | video.html line 19 contains "Adobe Premiere". Human checklist confirmed. |
| SITE-03 | 06-01, 06-02 | Site renders correctly on mobile (375px viewport minimum) | SATISFIED | `@media (max-width: 640px)` in style.css; fluid video card sizing. Human checklist confirmed all 7 pages at 375px — no horizontal scroll, nav wraps, about-hero stacks. |

**Orphaned requirements check:** REQUIREMENTS.md traceability table maps SITE-03, VIDEO-01, VIDEO-02 to Phase 6 — exactly the three IDs declared in the plan frontmatter. No orphaned requirements.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `video.html` | 56 | `aria-label="Video coming soon"` | Info | Accessible label on placeholder div — intentional, not a code stub. Visible text "Video available upon request" is displayed to users. No impact on goal. |

No blockers. No warnings. The single info-level note is the aria-label on the placeholder div, which is correct accessible markup.

---

### Human Verification

Human pre-launch checklist completed and approved (user response: "approved"). The following items were verified by human on the live site at https://gracegormley-gkg.github.io/website/:

**Video page (video.html):**
- Page loads with nav and footer
- Title tag reads "Video — Grace Gormley"
- "Adobe Premiere" appears in intro paragraph
- Two video sections appear: "What Can We Do?" and "Move Your Feet"
- Each video shows a styled "Video available upon request" placeholder card — not blank, not broken
- At 375px: no horizontal scroll; video cards within viewport

**Mobile check — all 7 pages at 375px:**
- index.html: Nav wraps/stacks correctly
- index.html: About hero stacks vertically (headshot above text)
- clips.html: Clip cards readable, no overflow
- photos.html: Photo grid 1 column, lightbox works
- video.html: Video cards fit viewport
- knight-lab.html: Tool tag pills wrap correctly
- suso-camp.html: Pillar cards stack correctly
- awards.html: Award entries readable

**External links:**
- All three clips.html article links open correct destinations
- awards.html award article links confirmed functional

**About page:**
- "Download Resume" button downloads PDF to device
- LinkedIn link opens https://www.linkedin.com/in/grace-gormley/ correctly

**Title tags and footers:**
- All 7 pages have correct title tags with "— Grace Gormley" suffix
- Footer with email and LinkedIn visible on every page

---

### Gaps Summary

No gaps. All automated artifact checks pass at all three levels (exists, substantive, wired). All key links verified. All three requirement IDs (VIDEO-01, VIDEO-02, SITE-03) satisfied with code evidence and human confirmation. Phase goal fully achieved.

The site is publicly live at v1.0: https://gracegormley-gkg.github.io/website/

---

_Verified: 2026-04-06_
_Verifier: Claude (gsd-verifier)_
