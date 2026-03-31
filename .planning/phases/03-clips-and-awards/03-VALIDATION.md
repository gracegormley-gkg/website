---
phase: 3
slug: clips-and-awards
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-30
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — static HTML/CSS/JS site; no test runner |
| **Config file** | none |
| **Quick run command** | `python3 -m http.server 8080` then open `http://localhost:8080/clips.html` or `http://localhost:8080/awards.html` |
| **Full suite command** | Manual checklist: open both pages, scroll entire content, click all external links |
| **Estimated runtime** | ~5 minutes (manual) |

---

## Sampling Rate

- **After every task commit:** Open the modified page locally; verify the targeted section renders correctly; no console errors
- **After every plan wave:** Open both pages; scroll entire page; verify all sections render; no console errors
- **Before `/gsd:verify-work`:** Full suite must be green (all links click-tested, both pages render correctly)
- **Max feedback latency:** 5 minutes per task (manual browser verification)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 3-01-01 | 01 | 1 | CLIP-01, CLIP-02 | manual | Open `http://localhost:8080/clips.html`; count entries (8–15); verify each shows publication + date | ✅ `data.json` exists | ⬜ pending |
| 3-01-02 | 01 | 1 | CLIP-01 | manual | Click first and last clip links; verify correct article loads (no 404, no redirect) | ✅ `clips.html` exists (stub) | ⬜ pending |
| 3-02-01 | 02 | 2 | AWARD-01 | manual | Open `http://localhost:8080/awards.html`; verify awards section renders; click each linked award | ✅ `awards.html` exists (stub) | ⬜ pending |
| 3-02-02 | 02 | 2 | AWARD-02 | manual | Scroll to Press Coverage section; verify all 3 outlets present; click all 3 links | ✅ `awards.html` exists (stub) | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements — no test framework to install.

- [ ] `clips.html` — exists as stub; needs fetch-and-render script + CSS classes added
- [ ] `awards.html` — exists as stub; needs fetch-and-render script + two sections + CSS classes added
- [ ] `style.css` — needs `.page-content`, `.clips-list`, `.clip-card`, `.award-entry`, `.press-item` etc. added
- [ ] `data.json` `clips` array — needs additional entries populated from PDF; currently only 3 entries

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Clips page shows 8–15 articles with publication, date, and working link | CLIP-01 | Static site — no automated link checker; count and link validation requires browser | Open `http://localhost:8080/clips.html`; count entries; verify each shows publication + date; click all links |
| Only curated strongest work appears | CLIP-02 | Content curation judgment — cannot be automated | Count entries (8–15 range confirms curation); review list for quality |
| Awards list renders name, organization, and correct link (or no broken link for empty-URL entries) | AWARD-01 | Link validation and graceful-degradation check require browser | Open `http://localhost:8080/awards.html`; verify awards section; click each linked award; confirm no `<a href="">` dead links |
| Press coverage section shows Verde, Paly Voice, Hearts of Gold with working links | AWARD-02 | External link verification requires browser | Scroll to Press Coverage; verify all 3 outlets appear; click all 3 links; confirm correct pages load |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5 minutes
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
