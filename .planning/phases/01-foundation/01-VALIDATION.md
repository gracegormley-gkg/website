---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-20
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — Phase 1 outputs are static files, not executable code |
| **Config file** | none — see Wave 0 |
| **Quick run command** | `python3 -m json.tool data.json && sips -g pixelWidth -g pixelHeight images/*.jpg` |
| **Full suite command** | Manual checklist against Phase 1 success criteria |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Manual file inspection — confirm target file exists and matches spec
- **After every plan wave:** Run `python3 -m json.tool data.json` (JSON validity) + `sips -g pixelWidth -g pixelHeight images/*.jpg` (image dimensions)
- **Before `/gsd:verify-work`:** Full manual checklist must pass
- **Max feedback latency:** ~10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | SITE-06 | manual | Open `style.css`, confirm `:root` block has color/type/spacing tokens + Google Fonts `@import` | ❌ Wave 0 | ⬜ pending |
| 1-01-02 | 01 | 1 | SITE-06 | manual | Open test.html in browser; verify editorially restrained rendering | ❌ Wave 0 | ⬜ pending |
| 1-02-01 | 02 | 1 | SITE-05 | automated | `python3 -m json.tool data.json` | ❌ Wave 0 | ⬜ pending |
| 1-02-02 | 02 | 1 | SITE-05 | manual | Add test clip in GitHub web editor; confirm no JSON parse error | ❌ Wave 0 | ⬜ pending |
| 1-03-01 | 03 | 2 | PHOTO-04 | automated | `ls -lh images/*.jpg` + `sips -g pixelWidth -g pixelHeight images/*.jpg` | ❌ Wave 0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `images/` directory created — `mkdir -p images`
- [ ] Source images available for optimization (confirmed: 14 files in project root)

*Existing file-system structure covers all phase requirements — no test framework installation needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| `style.css` `:root` block defines color, type, spacing tokens | SITE-06 | Static CSS file — no automated CSS property checker | Open file; confirm `:root` contains `--color-*`, `--font-*`, `--space-*` properties |
| Blank page rendered with `style.css` looks editorially restrained | SITE-06 | Visual design judgment | Create `test.html` with headings + body text; open in browser; verify no decorative clutter |
| `data.json` has entries for all sections: clips, photos, awards, video embeds | SITE-05 | Schema completeness is semantic | Open file; verify top-level keys: `clips`, `photos`, `awards`, `video_embeds`, `about`, `knight_lab` |
| Grace can update a clip via GitHub web editor | SITE-05 | Requires human actor in GitHub UI | Open `data.json` in github.com; edit a clip title; commit — confirm no JSON parse error banner |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
