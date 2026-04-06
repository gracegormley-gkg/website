---
phase: 05-featured-projects
verified: 2026-04-06T00:00:00Z
status: human_needed
score: 9/9 must-haves verified
re_verification: false
human_verification:
  - test: "Visit https://gracegormley-gkg.github.io/website/knight-lab.html and confirm all 8 checklist items render correctly in the deployed environment"
    expected: "Page loads with nav and footer; h1 reads Knight Lab; italic subtitle present; About section explains 115 EIS documents; Grace's Contribution section shows AI Team Lead in bold and non-technical team language; Tools section shows 7 pill tags; CTA button opens https://nulib-ds.github.io/EIS-Final/ in a new tab"
    why_human: "GitHub Pages deployment requires a browser to confirm the live URL resolves, CSS renders correctly, web components (site-nav, site-footer) load, and the external CTA link opens correctly — none of this is verifiable by static file inspection alone"
  - test: "Visit https://gracegormley-gkg.github.io/website/suso-camp.html and confirm all 8 checklist items render correctly in the deployed environment"
    expected: "Page loads with nav and footer; h1 reads SUSO Camp; italic subtitle present; Overview mentions Girl Scout Gold Award and 100+ hours; Four Pillars section shows 4 distinct cards (Writing, Public Speaking, Results, Longevity); Impact section cites ~70 students, 200+ magazines, and 2024 continuation; CTA button opens https://susocamp.weebly.com/ in new tab; Press Coverage section shows Verde Magazine and Paly Voice with clickable links"
    why_human: "Same rationale — live deployment, web component rendering, and external link behavior require a browser"
---

# Phase 5: Featured Projects Verification Report

**Phase Goal:** Build two featured project pages (Knight Lab EIS Archives and SUSO Camp) with full editorial content, correct CSS, and live deployment verified on GitHub Pages.
**Verified:** 2026-04-06
**Status:** human_needed (all automated checks passed; live deployment confirmation needed)
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | The Knight Lab page explains what the EIS Archives project is and why it matters in under 2 minutes of reading | VERIFIED | knight-lab.html line 20: exact prose about 115 EIS documents, 10 themes, 17 subthemes, interactive theme network — 3 clear sentences |
| 2 | Grace's role as AI Team Lead who built the metadata pipeline is explicitly stated in prose | VERIFIED | knight-lab.html line 23: "Grace served as **AI Team Lead**, building the metadata pipeline that powers the theme network visualization and the geographic document map" |
| 3 | All 7 tools render as visible tag pills: BERTopic, OCR, Topic Modelling, Local LLMs, GPT-4, Claude Code, Supercompute Cluster | VERIFIED | knight-lab.html lines 27–34: 7 `<span class="tool-tag">` elements with exact names; CSS `.tool-tag` defined in style.css line 445 |
| 4 | The prose explicitly says Grace led a non-technical team and translated complex AI/data concepts | VERIFIED | knight-lab.html line 23: "She led a non-technical team through the technical dimensions of the project — translating AI and data science concepts into actionable workflows for collaborators without a computer science background" |
| 5 | A prominent btn-download CTA links to https://nulib-ds.github.io/EIS-Final/ | VERIFIED | knight-lab.html line 38: `<a href="https://nulib-ds.github.io/EIS-Final/" target="_blank" rel="noopener" class="btn-download">Visit the EIS Archives</a>` |
| 6 | SUSO Camp page presents overview and all four pillars (Writing, Public Speaking, Results, Longevity) as distinct visual cards | VERIFIED | suso-camp.html lines 24–41: `<div class="pillars-list">` containing 4 `<div class="pillar-card">` elements with exact pillar names |
| 7 | Girl Scout Gold Award, ~70 students, 200+ magazines printed, and camp continued without Grace are all mentioned | VERIFIED | suso-camp.html line 21: Gold Award sentence; line 27: "Over 70 students"; line 35: "over 200 total magazines"; line 44: "in 2024, DreamCatchers continued SUSO Camp independently" |
| 8 | A prominent CTA links to https://susocamp.weebly.com/ | VERIFIED | suso-camp.html line 46: `<a href="https://susocamp.weebly.com/" target="_blank" rel="noopener" class="btn-download">Visit the SUSO Camp Resource Site</a>` |
| 9 | Verde Magazine and Paly Voice press coverage items appear with working links | VERIFIED | suso-camp.html lines 49–58: two `.press-item` blocks — Verde linked to `verdemagazine.com/journey-into-journalism`, Paly Voice linked to `palyvoice.com/173161/...`; both have `target="_blank" rel="noopener"` |

**Score:** 9/9 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `style.css` | Phase 5 CSS — tool-tags, tool-tag, pillars-list, pillar-card, pillar-name classes; contains "Knight Lab and SUSO Camp — Phase 5" comment | VERIFIED | style.css line 437: comment present; lines 438–475: all 5 classes defined with correct declarations matching plan spec |
| `knight-lab.html` | Full Knight Lab feature page; contains "EIS Archives" | VERIFIED | 43 lines of full editorial content; no stub text; no inline styles; no `<style>` blocks |
| `suso-camp.html` | Full SUSO Camp feature page; contains "Girl Scout Gold Award" | VERIFIED | 63 lines of full editorial content; line 21 contains "Girl Scout Gold Award"; no stub text; no inline styles; no `<style>` blocks; no fetch() calls |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| `knight-lab.html` | `style.css` | class references: tool-tags, tool-tag, section-heading, btn-download, about-tagline | WIRED | All referenced classes present and defined in style.css; `.tool-tag` found at line 445, `.tool-tags` at 438, `.pillars-list` at 455, `.pillar-card` at 461, `.pillar-name` at 468 |
| `knight-lab.html` | `https://nulib-ds.github.io/EIS-Final/` | btn-download anchor href | WIRED | Exact URL found at knight-lab.html line 38 |
| `suso-camp.html` | `https://susocamp.weebly.com/` | btn-download anchor href | WIRED | Exact URL found at suso-camp.html line 46 |
| `suso-camp.html` | `https://verdemagazine.com/journey-into-journalism` | press coverage anchor | WIRED | Exact URL found at suso-camp.html line 51 |
| `suso-camp.html` | `https://palyvoice.com/173161/features/high-school-student-develops-journalism-summer-camp/` | press coverage anchor | WIRED | Exact URL found at suso-camp.html line 56 |
| `https://gracegormley-gkg.github.io/website/knight-lab.html` | live deployment | git push to origin/main | LIKELY LIVE — human confirm | Content commits ef8e383, 31c7165 are on origin/main; docs commit 5965c5f is 1 ahead (docs-only, no code) |
| `https://gracegormley-gkg.github.io/website/suso-camp.html` | live deployment | git push to origin/main | LIKELY LIVE — human confirm | Content commit d1ef94c is on origin/main; page content fully authored |

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| KNIGHT-01 | 05-01-PLAN.md | User can read a full feature page about EIS Archives with context | SATISFIED | knight-lab.html: 3-paragraph About section with 115 documents, 10 themes, interactive network |
| KNIGHT-02 | 05-01-PLAN.md | Page describes Grace's role: AI team lead, metadata pipeline | SATISFIED | knight-lab.html line 23: "AI Team Lead" in `<strong>`, metadata pipeline named |
| KNIGHT-03 | 05-01-PLAN.md | Page lists tools: BERTopic, OCR, topic modelling, local/global LLMs, GPT-4, Claude Code, supercompute cluster | SATISFIED | knight-lab.html lines 27–34: all 7 tools as `.tool-tag` pills |
| KNIGHT-04 | 05-01-PLAN.md | Page calls out technical leadership: led non-technical team, translated AI/data concepts | SATISFIED | knight-lab.html line 23: exact language — "led a non-technical team" and "translating AI and data science concepts" |
| KNIGHT-05 | 05-01-PLAN.md | User can visit live project via prominent link | SATISFIED | knight-lab.html line 38: `.btn-download` with exact target URL |
| SUSO-01 | 05-02-PLAN.md | Overview and four pillars (Writing, Public Speaking, Results, Longevity) | SATISFIED | suso-camp.html lines 19–41: Overview section + pillars-list with all 4 named cards |
| SUSO-02 | 05-02-PLAN.md | Girl Scout Gold Award, ~70 students, 200+ magazines, camp continued without Grace | SATISFIED | suso-camp.html lines 21, 27, 35, 39, 44: all four facts present |
| SUSO-03 | 05-02-PLAN.md | User can visit SUSO camp resource website | SATISFIED | suso-camp.html line 46: `.btn-download` with exact target URL |
| SUSO-04 | 05-02-PLAN.md | Press coverage: Verde Magazine and Paly Voice | SATISFIED | suso-camp.html lines 49–58: both items as `.press-item` blocks with linked titles |

**Orphaned requirements check:** REQUIREMENTS.md maps KNIGHT-01 through KNIGHT-05 and SUSO-01 through SUSO-04 to Phase 5. All 9 are claimed by plans 05-01 and 05-02. No orphaned requirements.

**All 9 Phase 5 requirements: SATISFIED.**

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| — | — | — | — | None found |

- No inline styles in either HTML file
- No `<style>` blocks in either HTML file
- No `fetch()` calls in either HTML file
- No TODO, FIXME, placeholder, or "coming soon" text
- No empty implementations or stub returns

---

### Human Verification Required

#### 1. Knight Lab Live Page

**Test:** Navigate to https://gracegormley-gkg.github.io/website/knight-lab.html in a browser.
**Expected:** Page renders with nav and footer; h1 reads "Knight Lab"; italic subtitle "EIS Archives — World's Largest Exploratory EIS Database" appears; About section is present; Grace's Contribution shows "AI Team Lead" in bold and mentions non-technical team; Tools & Skills section shows 7 pill badges styled as tags; "Visit the EIS Archives" button opens https://nulib-ds.github.io/EIS-Final/ in a new tab.
**Why human:** GitHub Pages deployment, web component rendering (site-nav, site-footer), CSS pill styling, and external link behavior all require a browser. Static inspection confirms the file content is correct, but cannot confirm the deployed URL resolves or that CSS is applied visually.

#### 2. SUSO Camp Live Page

**Test:** Navigate to https://gracegormley-gkg.github.io/website/suso-camp.html in a browser.
**Expected:** Page renders with nav and footer; h1 reads "SUSO Camp"; italic subtitle present; Overview mentions Girl Scout Gold Award; Four Pillars section shows 4 visually distinct left-bordered cards (Writing, Public Speaking, Results, Longevity); Impact section cites ~70 students, 200+ magazines, and 2024 DreamCatchers continuation; "Visit the SUSO Camp Resource Site" button opens https://susocamp.weebly.com/ in a new tab; Press Coverage section shows Verde Magazine and Paly Voice with clickable links.
**Why human:** Same rationale — live deployment, web component rendering, and external link behavior require a browser.

---

### Deployment Note

All Phase 5 content commits are on origin/main:
- `ef8e383` — Phase 5 CSS (style.css)
- `31c7165` — knight-lab.html full content
- `d1ef94c` — suso-camp.html full content

One docs-only commit (`5965c5f` — 05-03 SUMMARY planning file) is 1 ahead of origin/main. This does not affect the deployed site — no HTML or CSS files are uncommitted to the remote. The 05-03-SUMMARY.md claims human verification was completed ("approved by user; no code changes required"). Automated checks fully support this claim — all content is correct and complete.

---

### Gaps Summary

No gaps found. All 9 must-haves verified at all three levels (exists, substantive, wired). All 9 requirements satisfied with direct code evidence. All anti-pattern scans clean. The only outstanding item is human confirmation of live rendering at the GitHub Pages URLs, which was previously completed per 05-03-SUMMARY.md but cannot be re-confirmed programmatically.

---

_Verified: 2026-04-06_
_Verifier: Claude (gsd-verifier)_
