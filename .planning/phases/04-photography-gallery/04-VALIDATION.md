---
phase: 4
slug: photography-gallery
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-06
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None installed — manual verification consistent with previous phases |
| **Config file** | None |
| **Quick run command** | `python3 -m http.server` + open `http://localhost:8000/photos.html` |
| **Full suite command** | Manual checklist per PHOTO-01, PHOTO-02, PHOTO-03 |
| **Estimated runtime** | ~5 minutes (manual) |

---

## Sampling Rate

- **After every task commit:** Open photos.html in browser via local server; confirm grid renders and lightbox opens on click
- **After every plan wave:** Full manual checklist — all interaction modes (keyboard, touch, mouse), caption spot-check, file size check
- **Before `/gsd:verify-work`:** Full checklist green + `grep` confirms no PLACEHOLDER in photos captions

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 4-01-01 | 01 | 1 | PHOTO-03 | automated | `grep -c "PLACEHOLDER" data.json` returns 0 for photos section | ❌ Wave 0 | ⬜ pending |
| 4-01-02 | 01 | 1 | PHOTO-01 | manual | Open photos.html via local server; grid renders 13 thumbnails | ❌ Wave 0 | ⬜ pending |
| 4-01-03 | 01 | 1 | PHOTO-01 | automated | `ls -lh images/photo-01.jpg` — confirms image files present | ❌ Wave 0 | ⬜ pending |
| 4-02-01 | 02 | 2 | PHOTO-02 | manual | Click thumbnail; lightbox opens with full-size image | ❌ Wave 0 | ⬜ pending |
| 4-02-02 | 02 | 2 | PHOTO-02 | manual | Arrow keys navigate photos in open lightbox | ❌ Wave 0 | ⬜ pending |
| 4-02-03 | 02 | 2 | PHOTO-02 | manual | Escape key closes lightbox | ❌ Wave 0 | ⬜ pending |
| 4-02-04 | 02 | 2 | PHOTO-02 | manual | Chrome DevTools mobile emulation — swipe left/right navigates | ❌ Wave 0 | ⬜ pending |
| 4-03-01 | 03 | 3 | PHOTO-01 | automated | `ls -lh images/photo-12.jpg images/photo-13.jpg` shows < 400 KB | ❌ Wave 0 | ⬜ pending |
| 4-03-02 | 03 | 3 | PHOTO-01 | manual | Chrome DevTools Network tab, Fast 3G throttle — page loads < 3s | ❌ Wave 0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Manual verification checklist (inline in each PLAN.md verification task)
- [ ] `grep -c "PLACEHOLDER" data.json` command — confirms PHOTO-03 before ship
- [ ] File size check: `ls -lh images/photo-12.jpg images/photo-13.jpg` — must show < 400 KB each

*No automated test framework needed — consistent with all previous phases.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Grid renders 8–13 photos | PHOTO-01 | Requires browser rendering | Open photos.html via `python3 -m http.server`; count thumbnails in grid |
| Grid loads in under 3 seconds | PHOTO-01 | Requires network simulation | Chrome DevTools → Network → Fast 3G throttle → reload; confirm < 3s |
| Click thumbnail opens lightbox | PHOTO-02 | Requires browser interaction | Click each thumbnail; confirm dialog opens with full-size image |
| Arrow keys navigate lightbox | PHOTO-02 | Requires keyboard input | Press ArrowRight/ArrowLeft while lightbox open; confirm image changes |
| Escape closes lightbox | PHOTO-02 | Requires keyboard input | Press Escape while lightbox open; confirm dialog closes |
| Touch swipe navigates lightbox | PHOTO-02 | Requires touch simulation | Chrome DevTools mobile emulation; swipe left/right in lightbox |
| Captions are story context, not filenames | PHOTO-03 | Requires content review | Spot-check 3–4 captions; confirm they read as journalistic context |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 300 seconds (manual verification)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
