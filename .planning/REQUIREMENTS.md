# Requirements: Grace Gormley Portfolio

**Defined:** 2026-03-20
**Core Value:** Editors and recruiters can quickly find and read Grace's best work across writing, data journalism, and photography in a clean, professional site she can update herself.

## v1 Requirements

### Site-Wide

- [x] **SITE-01**: User can navigate between all 7 pages (About, Clips, Photography, Video, Knight Lab, SUSO Camp, Awards) via a consistent navigation bar
- [x] **SITE-02**: User sees email and LinkedIn contact links in a footer on every page
- [x] **SITE-03**: Site renders correctly on mobile (375px viewport minimum)
- [x] **SITE-04**: Site deploys and is publicly accessible via GitHub Pages
- [x] **SITE-05**: Grace can update clips, photos, and awards by editing a single `data.json` file without touching HTML or CSS
- [x] **SITE-06**: Site uses modern minimal editorial design (clean whitespace, Newsreader + Inter typography, no decorative clutter)

### About

- [x] **ABOUT-01**: User can view Grace's headshot, name, and bio on the About page
- [x] **ABOUT-02**: User can download Grace's resume PDF from the About page
- [x] **ABOUT-03**: About page includes a tagline that captures the journalism + data science angle (not just a generic bio)

### Clips

- [x] **CLIP-01**: User can browse Grace's published articles, each showing publication name, date, and a link to the live article
- [x] **CLIP-02**: Clips page features only Grace's strongest published work (curated, not exhaustive)

### Photography

- [x] **PHOTO-01**: User can browse a curated gallery of Grace's photos in a clean grid layout
- [x] **PHOTO-02**: User can click a photo to view it full-size (lightbox)
- [x] **PHOTO-03**: Each photo has a caption providing story context (not just a filename)
- [x] **PHOTO-04**: Gallery uses images from the existing project folder (compressed to web size before use)

### Video

- [x] **VIDEO-01**: User can watch "What Can We Do?" and "Move Your Feet" as embedded videos on the Video page
- [x] **VIDEO-02**: Video page notes Grace's Adobe Premiere experience

### Knight Lab

- [x] **KNIGHT-01**: User can read a full feature page about the EIS Archives project with context on what the project is and why it matters
- [x] **KNIGHT-02**: Page clearly describes Grace's specific role: AI team lead, built the metadata pipeline powering the theme web, map, and visualizations
- [x] **KNIGHT-03**: Page calls out tools and skills used: BERTopic, OCR, topic modelling, local and global LLM calls, GPT-4, Claude Code, supercompute cluster
- [x] **KNIGHT-04**: Page calls out the technical leadership angle: led a non-technical team, translated complex AI/data concepts clearly
- [x] **KNIGHT-05**: User can visit the live project via a prominent link (https://nulib-ds.github.io/EIS-Final/)

### SUSO Camp

- [x] **SUSO-01**: User can read about the Stand Up, Speak Out journalism camp project with an overview and the four pillars (Writing, Public Speaking, Results, Longevity)
- [x] **SUSO-02**: Page provides context on the Girl Scout Gold Award and the scale of impact (~70 students, 200+ magazines printed, camp continued without Grace)
- [x] **SUSO-03**: User can visit the SUSO camp resource website (https://susocamp.weebly.com/)
- [x] **SUSO-04**: Page includes relevant press coverage mentions (Verde Magazine, Paly Voice)

### Awards & Press

- [x] **AWARD-01**: User can view Grace's award-winning articles with award name, organization, and link to the piece
- [x] **AWARD-02**: User can view press coverage of Grace's work (Verde Magazine, Paly Voice, Hearts of Gold podcast) with links

## v2 Requirements

### Clips Enhancements

- **CLIP-V2-01**: PDF fallback for each clip (backup if the live article link dies)
- **CLIP-V2-02**: Brief 1-line description per clip providing editorial context
- **CLIP-V2-03**: Award callouts inline on award-winning clips

### Site Enhancements

- **SITE-V2-01**: Custom domain (e.g., gracegormley.com) — zero architecture changes required, just DNS config
- **SITE-V2-02**: Open Graph / social meta tags for clean link previews when shared

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS or admin UI | Editing `data.json` is sufficient and simpler to build |
| Contact form | Email link in footer is adequate; forms require a backend or third-party service |
| Blog / RSS feed | This is a clip showcase, not a publishing platform |
| Social media embeds | Anti-feature for journalism portfolios — distracts from the work |
| Animated splash screen | Hurts editorial professionalism and page performance |
| User accounts / login | Static public site; no authentication needed |
| Search / filtering | Clip count is small enough that filtering is unnecessary complexity |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SITE-01 | Phase 2 | Complete |
| SITE-02 | Phase 2 | Complete |
| SITE-03 | Phase 6 | Complete |
| SITE-04 | Phase 2 | Complete |
| SITE-05 | Phase 1 | Complete |
| SITE-06 | Phase 1 | Complete |
| ABOUT-01 | Phase 2 | Complete |
| ABOUT-02 | Phase 2 | Complete |
| ABOUT-03 | Phase 2 | Complete |
| CLIP-01 | Phase 3 | Complete |
| CLIP-02 | Phase 3 | Complete |
| PHOTO-01 | Phase 4 | Complete |
| PHOTO-02 | Phase 4 | Complete |
| PHOTO-03 | Phase 4 | Complete |
| PHOTO-04 | Phase 1 | Complete |
| VIDEO-01 | Phase 6 | Complete |
| VIDEO-02 | Phase 6 | Complete |
| KNIGHT-01 | Phase 5 | Complete |
| KNIGHT-02 | Phase 5 | Complete |
| KNIGHT-03 | Phase 5 | Complete |
| KNIGHT-04 | Phase 5 | Complete |
| KNIGHT-05 | Phase 5 | Complete |
| SUSO-01 | Phase 5 | Complete |
| SUSO-02 | Phase 5 | Complete |
| SUSO-03 | Phase 5 | Complete |
| SUSO-04 | Phase 5 | Complete |
| AWARD-01 | Phase 3 | Complete |
| AWARD-02 | Phase 3 | Complete |

**Coverage:**
- v1 requirements: 28 total
- Mapped to phases: 28
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-20*
*Last updated: 2026-03-20 after roadmap creation*
