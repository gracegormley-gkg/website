# Roadmap: Grace Gormley Portfolio

## Overview

Six phases build from zero to a live, self-maintainable journalism and data science portfolio on GitHub Pages. The sequence is dependency-driven: the design system and data schema must exist before any pages are written; the shared nav/footer shell and deployment must be verified before content pages are filled in; the highest-editor-value pages (clips and awards) ship before the multimedia pages; photography follows once images are confirmed optimized; featured project pages (Knight Lab and SUSO Camp) follow the stable shell; and video — partially blocked on external URLs — closes the project alongside a final pre-launch audit.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Design system, data schema, and image optimization — the shared substrate everything else is built on
- [ ] **Phase 2: Shell and About** - Shared nav/footer web components, About page, and verified GitHub Pages deployment
- [ ] **Phase 3: Clips and Awards** - The two pages editors navigate to first: curated clips and linked award-winning work
- [ ] **Phase 4: Photography Gallery** - Curated photo grid with lightbox using web-optimized images from the project folder
- [ ] **Phase 5: Featured Projects** - Knight Lab EIS Archives showcase and SUSO Camp page
- [ ] **Phase 6: Video and Pre-Launch** - Video embeds, mobile responsiveness audit, and full pre-launch link check

## Phase Details

### Phase 1: Foundation
**Goal**: The design system and data schema are locked and all images are web-ready — every subsequent page can be built against these without revisiting them
**Depends on**: Nothing (first phase)
**Requirements**: SITE-05, SITE-06, PHOTO-04
**Success Criteria** (what must be TRUE):
  1. `style.css` defines the full CSS custom property token set (colors, type scale, spacing) using Newsreader and Inter, and a blank page rendered with it looks editorially restrained
  2. `data.json` exists with a complete schema covering clips, photos, awards, and video embeds — populated with at least placeholder entries for every section
  3. Grace can update a clip entry in `data.json` using GitHub's web editor without touching any HTML or CSS file
  4. Every photo in the `images/` folder is compressed to 400 KB or less and confirmed at no wider than 2000px on its longest edge
**Plans**: 3 plans
Plans:
- [ ] 01-01-PLAN.md — CSS design token system (style.css + test.html)
- [ ] 01-02-PLAN.md — Content schema (data.json fully populated)
- [ ] 01-03-PLAN.md — Image optimization (14 images to images/ via sips)

### Phase 2: Shell and About
**Goal**: Every page has a working shared nav and footer, the About page is live, and the site is publicly accessible on GitHub Pages
**Depends on**: Phase 1
**Requirements**: SITE-01, SITE-02, SITE-04, ABOUT-01, ABOUT-02, ABOUT-03
**Success Criteria** (what must be TRUE):
  1. Visiting the site URL returns the About page with Grace's headshot, name, and bio visible within 3 seconds
  2. Every page in the 7-page nav structure is linked and navigable — active-state highlight shows which page the user is on
  3. Grace's email address and LinkedIn URL are clickable in the footer on the About page
  4. Clicking "Download Resume" on the About page downloads the PDF to the visitor's device
  5. The About page tagline communicates the journalism + data science angle (not a generic student bio)
**Plans**: TBD

### Phase 3: Clips and Awards
**Goal**: Editors can find, read, and follow links to Grace's strongest published work and her award-recognized pieces
**Depends on**: Phase 2
**Requirements**: CLIP-01, CLIP-02, AWARD-01, AWARD-02
**Success Criteria** (what must be TRUE):
  1. The Clips page lists 8–15 curated articles, each showing publication name, date, and a working external link to the live piece
  2. Every clip link has been click-tested and opens the correct article (no 404s, no redirect loops)
  3. The Awards page lists each award with the award name, granting organization, and a working link to the recognized work
  4. Press coverage items (Verde Magazine, Paly Voice, Hearts of Gold podcast) appear on the Awards page with working links
**Plans**: TBD

### Phase 4: Photography Gallery
**Goal**: Visitors can browse a curated grid of Grace's photojournalism work and open any image full-size with context
**Depends on**: Phase 1
**Requirements**: PHOTO-01, PHOTO-02, PHOTO-03
**Success Criteria** (what must be TRUE):
  1. The Photography page displays a CSS Grid thumbnail gallery of 8–12 curated photos that loads completely in under 3 seconds on a standard connection
  2. Clicking any thumbnail opens the full-size image in a lightbox overlay with keyboard navigation (arrow keys, Escape to close) and swipe support on touch devices
  3. Every photo in the gallery has a caption that provides story context — not a filename, not a date stamp
**Plans**: TBD

### Phase 5: Featured Projects
**Goal**: Visitors understand Grace's specific technical contribution to the EIS Archives project and her founding role in SUSO Camp — the two strongest differentiators beyond clips
**Depends on**: Phase 2
**Requirements**: KNIGHT-01, KNIGHT-02, KNIGHT-03, KNIGHT-04, KNIGHT-05, SUSO-01, SUSO-02, SUSO-03, SUSO-04
**Success Criteria** (what must be TRUE):
  1. The Knight Lab page names the tools Grace personally used (BERTopic, OCR, topic modelling, local LLMs, GPT-4, Claude Code, supercompute cluster) and describes her specific contribution — not the team's collective work
  2. A visitor unfamiliar with Knight Lab can read the EIS Archives page and understand what the project is, why it matters, and what Grace built — in under 2 minutes
  3. The live EIS Archives site link (https://nulib-ds.github.io/EIS-Final/) is present and prominent on the Knight Lab page
  4. The SUSO Camp page covers all four pillars, mentions the Girl Scout Gold Award, the scale of impact (~70 students, 200+ magazines, camp continuing without Grace), and links to https://susocamp.weebly.com/
  5. Press coverage mentions (Verde Magazine, Paly Voice) appear on the SUSO Camp page
**Plans**: TBD

### Phase 6: Video and Pre-Launch
**Goal**: The site is fully complete, mobile-responsive, and passes a final audit — ready to send to editors and recruiters
**Depends on**: Phases 3, 4, 5
**Requirements**: VIDEO-01, VIDEO-02, SITE-03
**Success Criteria** (what must be TRUE):
  1. The Video page embeds "What Can We Do?" and "Move Your Feet" as playable videos, or displays a clearly designed placeholder if embed URLs are not yet available
  2. Every page of the site renders correctly at 375px viewport width — nav collapses appropriately, no horizontal scroll, no fixed-width elements overflowing the screen
  3. All 7 pages pass a manual pre-launch checklist: every external link tested, footer present, page title tags set, headshot credit present, resume PDF download confirmed working

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 2/3 | In Progress|  |
| 2. Shell and About | 0/TBD | Not started | - |
| 3. Clips and Awards | 0/TBD | Not started | - |
| 4. Photography Gallery | 0/TBD | Not started | - |
| 5. Featured Projects | 0/TBD | Not started | - |
| 6. Video and Pre-Launch | 0/TBD | Not started | - |
