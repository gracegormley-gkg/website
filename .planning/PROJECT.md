# Grace Gormley Portfolio

## What This Is

A personal journalism and data science portfolio website for Grace Gormley, a Northwestern University sophomore (Medill School of Journalism, double major in Journalism and Data Science). The site showcases her published writing, photography, video work, data journalism projects, and service work — replacing her existing Wix site with a faster, more professional, and self-maintained alternative hosted on GitHub Pages.

## Core Value

Visitors (editors, recruiters, professors) can quickly see Grace's best work across writing, data journalism, and photography in a clean, professional site she can update herself without a developer.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Modern, minimal design — clean whitespace, strong editorial typography, lets work speak for itself
- [ ] 7-page structure: About, Clips, Photography, Video, Knight Lab, SUSO Camp, Awards
- [ ] Content driven by a simple data file (JSON/YAML) — Grace updates content without touching HTML/CSS
- [ ] Photography gallery using images already in the project folder
- [ ] Clip portfolio with article links, publication name, date, and brief notes
- [ ] Awards section with article/photo links
- [ ] Knight Lab project page featuring EIS Archives — her role, skills, and link to live project
- [ ] SUSO Camp page with project overview and four pillars
- [ ] Video section with embedded video packages
- [ ] Contact info (email + LinkedIn) in footer on every page
- [ ] Deployed and live on GitHub Pages
- [ ] Resume downloadable (PDF already in folder)

### Out of Scope

- CMS or admin UI — editing a data file is sufficient
- Mobile app — web only
- User accounts or login — static public site
- Blog/posting system — clips are manually curated

## Context

- **Existing site**: Wix site at gracegormley8.wixsite.com/website — 6 pages, left-sidebar nav, white background, dark text, functional but not impressive
- **What's wrong with Wix**: Hard to update, doesn't look professional enough for journalism job applications, Wix branding/constraints
- **Assets in folder**: 13 photos (JPG/JPG), resume PDF, clips list PDF — all ready to use
- **Headshot**: GORMLEY, GRACE_SAMPLE_Jun2025_WEB_9 copy.jpg (credit: Anna Hoch-Kenney)
- **Knight Lab project**: EIS Archives — World's Largest Exploratory EIS Database. Grace was on the AI team; she built the metadata pipeline that powered the entire site (theme web, map, visualizations). Used BERTopic, OCR, LLMs (local models, Claude, GPT-4/4-mini), supercompute cluster. Live at https://nulib-ds.github.io/EIS-Final/
- **Video embed URLs**: Still needed from Grace — "What Can We Do?" and "Move Your Feet" (likely YouTube/Vimeo)
- **Grace's background**: 6 years of journalism experience, data science double major, comfortable with GitHub and code

## Constraints

- **Tech stack**: Pure HTML/CSS/JavaScript — no build step required, works natively on GitHub Pages
- **Updates**: Content must be editable via a single JSON or YAML data file, no framework knowledge required
- **Hosting**: GitHub Pages — free, static files only
- **Assets**: Use photos already in the project folder; no external CDN dependencies for images

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static HTML/CSS/JS (no framework) | Works on GitHub Pages without a build step; Grace can edit files directly | — Pending |
| Content in a single data file (JSON) | "Edit a simple text file" was her explicit preference for updates | — Pending |
| 7 pages (add Knight Lab to existing 6) | Knight Lab project demonstrates data science + journalism fusion — exactly her differentiator | — Pending |
| Use photos already in folder | Avoids asset-gathering delay; 13 photos available now | — Pending |

---
*Last updated: 2026-03-19 after initialization*
