---
phase: 2
slug: shell-and-about
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-20
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — static HTML/CSS/JS, browser-based manual testing |
| **Config file** | none |
| **Quick run command** | `python3 -m http.server 8080` then open `http://localhost:8080` |
| **Full suite command** | Manual checklist against Phase 2 success criteria + deployed URL check |
| **Estimated runtime** | ~5 minutes (manual walkthrough) |

---

## Sampling Rate

- **After every task commit:** Open the affected page(s) locally with `python3 -m http.server 8080`; verify the targeted behavior
- **After every plan wave:** Full manual walkthrough — all 7 pages (nav links, footer, active state, resume download)
- **Before `/gsd:verify-work`:** Full suite must pass locally AND on deployed GitHub Pages URL
- **Max feedback latency:** ~5 minutes

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | SITE-01, SITE-02 | manual | Open `index.html` locally; verify nav links resolve; verify footer email/LinkedIn clickable | ❌ Wave 0 | ⬜ pending |
| 02-01-02 | 01 | 1 | SITE-01 | manual | Open each stub HTML page; verify nav links resolve; active state highlights current page | ❌ Wave 0 | ⬜ pending |
| 02-02-01 | 02 | 1 | ABOUT-01, ABOUT-03 | manual | Open `index.html`; verify headshot renders, name in `<h1>`, bio paragraph present, tagline distinctive | ❌ Wave 0 | ⬜ pending |
| 02-02-02 | 02 | 1 | ABOUT-02 | manual | Click "Download Resume"; confirm PDF downloads; open file and verify it is Grace's resume | ❌ Wave 0 | ⬜ pending |
| 02-03-01 | 03 | 2 | SITE-04 | manual | Visit deployed GitHub Pages URL; confirm page loads within 3 seconds; headshot, name, bio visible | ❌ Wave 0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `index.html` — About page; does not exist yet; created in Phase 2
- [ ] `components.js` — nav/footer web components; does not exist yet; created in Phase 2
- [ ] `clips.html`, `photos.html`, `video.html`, `knight-lab.html`, `suso-camp.html`, `awards.html` — stub pages; none exist yet
- [ ] `assets/` directory — does not exist yet; created in Phase 2
- [ ] `assets/resume.pdf` — copied from `"Resume - Grace Gormley (Jan 2026) copy.pdf"` in project root
- [ ] GitHub remote — not yet configured; repo must be created and pushed before GitHub Pages can be enabled

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Nav links resolve, no 404s | SITE-01 | Static HTML, no test runner | Open each of 7 pages in browser; click every nav link; verify no 404 |
| Active nav highlight on current page | SITE-01 | Requires browser URL context | Navigate to each page; verify current page link has `active` class/style |
| Footer email and LinkedIn clickable | SITE-02 | Requires browser interaction | Click email link; click LinkedIn link; verify both open correctly |
| About page shows headshot, name, bio | ABOUT-01 | Visual render check | Open `index.html`; visually verify headshot, `<h1>` name, bio paragraph |
| Resume download works | ABOUT-02 | File download requires browser | Click "Download Resume"; verify PDF downloads and opens |
| Tagline is distinctive (journalism + data science) | ABOUT-03 | Copywriting judgment | Read tagline; verify it names both angles distinctively, not generically |
| Site live at GitHub Pages URL | SITE-04 | Requires deployed environment | Visit `https://gracegormley-gkg.github.io/[repo]/`; confirm loads within 3s |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5 minutes
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
