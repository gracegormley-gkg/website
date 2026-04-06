---
phase: 5
slug: featured-projects
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-06
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — static HTML site, no test runner |
| **Config file** | none |
| **Quick run command** | Manual browser verification at live URL |
| **Full suite command** | Manual verification checklist (all 9 requirements) |
| **Estimated runtime** | ~5 minutes (human spot-check) |

---

## Sampling Rate

- **After every task commit:** Open the modified page in browser and verify the task's requirements are met
- **After every plan wave:** Run full manual checklist for all requirements in that wave
- **Before `/gsd:verify-work`:** Full 9-requirement checklist must pass
- **Max feedback latency:** ~5 minutes

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 5-01-01 | 01 | 1 | KNIGHT-01 | manual | open knight-lab.html in browser | ❌ W0 | ⬜ pending |
| 5-01-02 | 01 | 1 | KNIGHT-02 | manual | confirm "AI Team Lead" and "metadata pipeline" in prose | ❌ W0 | ⬜ pending |
| 5-01-03 | 01 | 1 | KNIGHT-03 | manual | confirm all 7 tool tags render | ❌ W0 | ⬜ pending |
| 5-01-04 | 01 | 1 | KNIGHT-04 | manual | confirm "led a non-technical team" phrasing present | ❌ W0 | ⬜ pending |
| 5-01-05 | 01 | 1 | KNIGHT-05 | manual | confirm btn-download CTA with EIS live URL present | ❌ W0 | ⬜ pending |
| 5-02-01 | 02 | 1 | SUSO-01 | manual | confirm all 4 pillars (Writing, Public Speaking, Results, Longevity) render | ❌ W0 | ⬜ pending |
| 5-02-02 | 02 | 1 | SUSO-02 | manual | confirm "Girl Scout Gold Award", "~70 students", "200+ magazines" present | ❌ W0 | ⬜ pending |
| 5-02-03 | 02 | 1 | SUSO-03 | manual | confirm btn-download CTA with susocamp.weebly.com URL present | ❌ W0 | ⬜ pending |
| 5-02-04 | 02 | 1 | SUSO-04 | manual | confirm Verde Magazine and Paly Voice items appear on page | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements.

This is a static HTML/CSS site with no test runner. No Wave 0 setup is needed — verification is human browser spot-check after each task commit.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Knight Lab project context readable in ~2 min | KNIGHT-01 | Static HTML content — no automated readability test | Open knight-lab.html, read through — can a newcomer understand what EIS Archives is and why it matters? |
| Grace's specific role described (not team's) | KNIGHT-02 | Prose quality judgment | Confirm "AI Team Lead" + "metadata pipeline" appear; confirm it reads as Grace's personal work, not team |
| All 7 tool tags render | KNIGHT-03 | Visual layout check | Check: BERTopic, OCR, Topic Modelling, Local LLMs, GPT-4, Claude Code, Supercompute Cluster |
| Technical leadership angle present | KNIGHT-04 | Content authoring requirement | Confirm "led a non-technical team" or equivalent phrasing in Grace's Role section |
| EIS live link prominent | KNIGHT-05 | Visual prominence check | Confirm btn-download CTA renders and href=https://nulib-ds.github.io/EIS-Final/ |
| All 4 SUSO pillars present with descriptions | SUSO-01 | Visual layout check | Confirm Writing, Public Speaking, Results, Longevity all appear with pillar-card styling |
| Girl Scout Gold Award + impact stats | SUSO-02 | Content presence check | Confirm "Girl Scout Gold Award", "~70 students", "200+ magazines", "camp continued" present |
| SUSO website link present | SUSO-03 | Link check | Confirm link to https://susocamp.weebly.com/ is present and opens correctly |
| Press coverage: Verde + Paly Voice | SUSO-04 | Content presence check | Confirm Verde Magazine and Paly Voice items appear with links on suso-camp.html |

---

## Validation Sign-Off

- [ ] All tasks have manual verify instructions
- [ ] Sampling continuity: verify after each task commit (9 tasks, 9 checkpoints)
- [ ] Wave 0: N/A — no test infrastructure required for static HTML
- [ ] No watch-mode flags
- [ ] Feedback latency < 5 minutes (browser open time)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
