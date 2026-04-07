---
phase: 6
slug: video-and-pre-launch
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-06
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — static HTML/CSS/JS site, manual browser verification |
| **Config file** | none |
| **Quick run command** | Open changed page in browser at 375px DevTools viewport |
| **Full suite command** | Manual pre-launch checklist (7 pages, see RESEARCH.md) |
| **Estimated runtime** | ~10 minutes (manual) |

---

## Sampling Rate

- **After every task commit:** Open the affected page in browser; confirm visual correctness at 375px
- **After every plan wave:** Run full manual pre-launch checklist across all 7 pages
- **Before `/gsd:verify-work`:** Full pre-launch checklist must be green
- **Max feedback latency:** ~2 minutes per page visual check

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 06-01-01 | 01 | 1 | VIDEO-01 | manual | Open video.html in browser; confirm placeholder or embed renders | ❌ W0 — stub | ⬜ pending |
| 06-01-02 | 01 | 1 | VIDEO-02 | manual | Read video.html for Adobe Premiere mention | ❌ W0 — stub | ⬜ pending |
| 06-02-01 | 02 | 1 | SITE-03 | manual | Chrome DevTools 375px — check nav wraps, no horizontal scroll | ✅ style.css exists | ⬜ pending |
| 06-02-02 | 02 | 1 | SITE-03 | manual | Chrome DevTools 375px — check about-hero stacks correctly | ✅ index.html exists | ⬜ pending |
| 06-03-01 | 03 | 2 | SITE-03 | manual | Run full pre-launch checklist on all 7 pages | ✅ all pages exist | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `video.html` — full page implementation (currently stub: "Content coming soon")
- [ ] `style.css` mobile media query block — does not yet exist; needed for nav + about-hero

*No test framework install needed — project uses manual browser verification throughout.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Video embeds or placeholder renders correctly | VIDEO-01 | Static site with no test runner; visual output only | Open video.html in browser; confirm no blank/broken state for each video item |
| Adobe Premiere mention present on Video page | VIDEO-02 | Prose content verification | Read video.html source or browser view for "Adobe Premiere" text |
| All 7 pages render at 375px without horizontal scroll | SITE-03 | Requires visual browser check; no automated viewport testing installed | Chrome DevTools responsive mode, 375px, check each page in order |
| All external links open correct destinations | SITE-03 | External URLs require human click-test — automated crawlers can't confirm article correctness | Click each external link on clips.html and awards.html; confirm correct article opens |
| Resume PDF downloads (not opens in tab) | SITE-03 | Download behavior varies by browser; requires human observation | Click resume link in footer on index.html; confirm file downloads |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 120s (manual browser check)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
