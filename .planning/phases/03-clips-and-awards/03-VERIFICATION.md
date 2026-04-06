---
phase: 03-clips-and-awards
verified: 2026-04-06T00:00:00Z
status: human_needed
score: 9/10 must-haves verified
re_verification: false
noted_deviations:
  - id: CLIP-01-count
    description: "CLIP-01 specifies 8–15 clips. data.json contains 3 clips. This was explicitly approved by the user before execution (see 03-01-SUMMARY.md key-decisions). Not a gap."
human_verification:
  - test: "Verify all 3 clip article links open the correct articles"
    expected: "Each title link opens the matching article at the correct publication URL — no 404s, no homepage redirects"
    why_human: "External link correctness cannot be automated. HTTP status alone does not confirm correct article vs. publication homepage redirect."
  - test: "Verify award links open correct articles or PDFs"
    expected: "9 award entries with links open to the correct article or Google Drive PDF; 2 entries (Excellence Award in Feature Writing, Casey Nichols Service Above Self Award) have no link at all and should not produce clickable elements"
    why_human: "External links require human click-testing. Google Drive PDFs may have access restrictions not detectable by HTTP status checks."
  - test: "Verify all 3 press coverage links work"
    expected: "Verde Magazine link opens verdemagazine.com article; Hearts of Gold link opens YouTube video; Paly Voice link opens palyvoice.com article"
    why_human: "External URL correctness requires human verification."
  - test: "Verify both pages are live at GitHub Pages URLs"
    expected: "https://gracegormley-gkg.github.io/website/clips.html renders clip entries (not 'Content coming soon'). https://gracegormley-gkg.github.io/website/awards.html renders award and press coverage sections."
    why_human: "GitHub Pages deployment state requires browser confirmation; HTTP checks may return 200 for cached stale content."
---

# Phase 3: Clips and Awards Verification Report

**Phase Goal:** Clips and Awards pages live on GitHub Pages, rendering from data.json, with all external links verified working.
**Verified:** 2026-04-06
**Status:** human_needed
**Re-verification:** No — initial verification

## Noted Deviation

**CLIP-01 clip count:** The requirement specified 8–15 clips. data.json contains 3 clips. This was explicitly approved by the user before execution began (documented in 03-01-SUMMARY.md key-decisions: "User-approved 3 clips in data.json — CLIP-01 8-15 target overridden by explicit user instruction; 3 curated clips are sufficient for launch"). This is a user-directed deviation and is not flagged as a gap.

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Clips page renders articles from data.json — not hardcoded in HTML | VERIFIED | clips.html fetches `./data.json` and maps `data.clips` into the DOM; no clip titles appear in the HTML source |
| 2 | Each clip entry shows publication name, UTC-safe formatted date, and a link with target=_blank rel=noopener | VERIFIED | `clip-publication`, `clip-date`, `formatDate(iso + 'T00:00:00')`, `target="_blank" rel="noopener"` all confirmed in clips.html |
| 3 | If data.json fails to load, clips page shows an error message | VERIFIED | `.catch(() => { ... innerHTML = '<p>Unable to load clips. Please try again.</p>' })` present in clips.html |
| 4 | Awards page has two clearly distinct sections — Awards and Press Coverage | VERIFIED | Two `<section>` elements with `class="section-heading"` h2 headings ("Awards" and "Press Coverage") confirmed in awards.html |
| 5 | All 11 award entries render with award name, organization, and year; URL fallback logic handles pdf_fallback and no-link cases | VERIFIED | data.json has exactly 11 award entries; `const href = a.url \|\| a.pdf_fallback` confirmed; Excellence Award and Casey Nichols have empty article_title preventing article line from rendering |
| 6 | No award entry with both url="" and pdf_fallback="" produces a clickable anchor | VERIFIED | Fallback logic: `const href = a.url \|\| a.pdf_fallback` — empty strings are falsy; `articleLine` is only rendered when `article_title` is truthy; both no-link entries have empty article_title |
| 7 | Press Coverage section shows all 3 items with links | VERIFIED | data.json `press_coverage` array has 3 entries (Verde Magazine, Hearts of Gold Podcast, Paly Voice), all with non-empty urls; awards.html maps `data.press_coverage` into press-list |
| 8 | All 17 Phase 3 CSS classes exist in style.css | VERIFIED | All 17 classes confirmed: `.page-content`, `.clips-list`, `.clip-card`, `.clip-title`, `.clip-meta`, `.clip-sep`, `.awards-section`, `.press-section`, `.section-heading`, `.award-entry`, `.award-name`, `.award-org`, `.award-piece`, `.press-item`, `.press-outlet`, `.press-title`, `.press-desc` |
| 9 | Both pages committed to git and pushed to main | VERIFIED | Commits `4c684ae` (clips.html + style.css) and `f4e75d0` (awards.html) confirmed in git log; push to main confirmed in 03-03-SUMMARY.md |
| 10 | All external links verified working by human click-test | HUMAN NEEDED | 03-03-SUMMARY.md documents user said "verified" — but this is a human-verified item by definition and must be flagged for the verifier's awareness |

**Score:** 9/10 automated truths verified (truth #10 is human-gate by design)

---

## Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `data.json` | clips array with entries, each with title/publication/date/url | VERIFIED | 3 clips (user-approved count), all fields populated, JSON valid |
| `data.json` | awards array with 11 entries, graceful URL fallback data | VERIFIED | 11 awards confirmed; 2 with no url/pdf_fallback, 2 with pdf_fallback only, 7 with live url |
| `data.json` | press_coverage array with 3 entries | VERIFIED | 3 entries confirmed — Verde Magazine, Hearts of Gold Podcast, Paly Voice — all with non-empty urls |
| `clips.html` | Fetch-and-render script, container div, error handling, no hardcoded content | VERIFIED | All structure checks pass; no clip titles appear in HTML |
| `awards.html` | Two sections (awards + press), fetch-and-render, URL fallback logic | VERIFIED | All structure checks pass; both sections present |
| `style.css` | All 17 Phase 3 CSS classes appended | VERIFIED | All 17 classes found in style.css |

---

## Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `clips.html` inline script | `data.json` clips array | `fetch('./data.json').then(r => r.json()).then(data => data.clips)` | VERIFIED | `fetch('./data.json')` and `data.clips.map(...)` both present |
| clip render template | CSS classes in style.css | `class="clip-card"`, `class="clip-title"`, `class="clip-meta"` | VERIFIED | All class names match style.css definitions exactly |
| `awards.html` inline script | `data.json` awards array | `fetch('./data.json')` then `data.awards.map(...)` | VERIFIED | Present in awards.html lines 32–53 |
| `awards.html` inline script | `data.json` press_coverage array | `data.press_coverage.map(...)` | VERIFIED | Present in awards.html line 57 |
| award render template | graceful URL fallback logic | `const href = a.url \|\| a.pdf_fallback` | VERIFIED | Exact pattern confirmed in awards.html |
| `clips.html` | live GitHub Pages URL | `https://gracegormley-gkg.github.io/website/clips.html` | HUMAN NEEDED | Commit pushed to main; deployment confirmed in SUMMARY but requires browser check |
| `awards.html` | live GitHub Pages URL | `https://gracegormley-gkg.github.io/website/awards.html` | HUMAN NEEDED | Same as above |

---

## Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| CLIP-01 | 03-01, 03-03 | User can browse Grace's published articles, each showing publication name, date, and a link to the live article | SATISFIED (with noted deviation) | clips.html renders from data.json; publication, UTC-safe date, and noopener links all present. Clip count is 3 (user-approved deviation from 8–15 spec). |
| CLIP-02 | 03-01, 03-03 | Clips page features only Grace's strongest published work (curated, not exhaustive) | SATISFIED | 3 curated clips in data.json, each with a `featured: true` flag and editorial `note` field |
| AWARD-01 | 03-02, 03-03 | User can view Grace's award-winning articles with award name, organization, and link to the piece | SATISFIED | 11 awards rendered from data.json; URL fallback pattern correctly handles live url, pdf_fallback, and no-link cases |
| AWARD-02 | 03-02, 03-03 | User can view press coverage of Grace's work (Verde Magazine, Paly Voice, Hearts of Gold podcast) with links | SATISFIED | All 3 press coverage items present in data.json press_coverage array; awards.html maps them with outlet, title link, and description |

**Orphaned requirements check:** CLIP-01, CLIP-02, AWARD-01, AWARD-02 are the Phase 3 requirements per REQUIREMENTS.md traceability table. All four are claimed by plans in this phase. No orphaned requirements.

---

## Anti-Patterns Found

| File | Pattern | Severity | Impact |
|------|---------|----------|--------|
| `data.json` | PLACEHOLDER values in `photos`, `videos`, `knight_lab` sections | Info | Phase 3 scope only — photos/videos/knight_lab are pending future phases. Not a blocker for clips or awards. |

No anti-patterns found in clips.html, awards.html, or style.css Phase 3 additions. No TODO/FIXME/placeholder comments in Phase 3 HTML. No stub implementations. No empty handlers.

---

## Human Verification Required

### 1. Clip article links

**Test:** Open https://gracegormley-gkg.github.io/website/clips.html and click each of the 3 clip title links.
**Expected:** Each link opens the correct article at its publication URL — not a 404, not a publication homepage.
**Why human:** External link correctness (correct article vs. homepage redirect) cannot be determined programmatically.

### 2. Award links and no-link entries

**Test:** Open https://gracegormley-gkg.github.io/website/awards.html. For each award with a link, click it. Confirm "Excellence Award in Feature Writing" and "Casey Nichols Service Above Self Award" show no clickable link.
**Expected:** 9 linked awards open correct articles or Google Drive PDFs. 2 no-link awards display only award name + organization — no anchor element.
**Why human:** External URL correctness and Google Drive PDF accessibility cannot be verified programmatically. Empty-link rendering requires visual confirmation.

### 3. Press coverage links

**Test:** On the awards page, click all 3 press coverage links.
**Expected:** Verde Magazine link opens the "Journey Into Journalism" article. Hearts of Gold link opens the YouTube video. Paly Voice link opens the journalism summer camp article.
**Why human:** External link correctness requires human visual confirmation.

### 4. GitHub Pages live confirmation

**Test:** Open https://gracegormley-gkg.github.io/website/clips.html and https://gracegormley-gkg.github.io/website/awards.html in a browser.
**Expected:** Both pages render content from data.json. Clips page shows 3 articles. Awards page shows "Awards" and "Press Coverage" sections. Neither page shows "Content coming soon."
**Why human:** GitHub Pages caching and deployment state require live browser verification.

---

## Gaps Summary

No automated gaps found. All must-haves verified at all three levels (exists, substantive, wired).

The only open items are the four human verification checks above, which are human-gate by design (link correctness and live deployment confirmation). Per 03-03-SUMMARY.md, the user provided the "verified" signal at the human checkpoint — these items are documented here for the record but are expected to already be confirmed by Grace.

---

_Verified: 2026-04-06_
_Verifier: Claude (gsd-verifier)_
