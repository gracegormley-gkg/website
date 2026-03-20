# Project Research Summary

**Project:** Grace Gormley Personal Journalism Portfolio
**Domain:** Static multi-page journalism/data journalism portfolio — college student, GitHub Pages hosted
**Researched:** 2026-03-19
**Confidence:** HIGH

## Executive Summary

This is a static multi-page journalism portfolio for Grace Gormley, a Medill/Northwestern sophomore double-majoring in journalism and data science. The site needs to present Grace's editorial clips, photography, video work, data journalism project (Knight Lab EIS Archives), and community journalism involvement (SUSO Camp) to internship recruiters and editors. Research across the journalism industry is consistent and unambiguous: editors spend 30 seconds evaluating a portfolio, they navigate directly to clips, and they leave sites that make them work. The strongest approach is a zero-dependency HTML/CSS/JavaScript stack hosted on GitHub Pages, with all editable content driven from a single `data.json` file that Grace can update without touching HTML.

The recommended architecture is 7 static HTML pages sharing a global stylesheet and web component-based nav/footer, with page content fetched from `data.json` at load time. This approach requires no build step, no framework, and no infrastructure — just files pushed to a GitHub repository. It gives Grace the ability to update clips, photos, and awards by editing one JSON file through GitHub's web interface. The design system should be editorially restrained: one serif (Newsreader), one sans-serif (Inter), a neutral palette, and maximum whitespace. The portfolio should be invisible as a design object and transparent as a showcase for the work.

The primary risks are technical negligence (unoptimized photos, broken external links, no mobile testing) and content misjudgment (over-designing, listing too many clips, underplaying the Knight Lab work). Both categories are fully preventable through deliberate phase ordering: define the design system and JSON schema first, optimize assets before building the gallery, test mobile responsiveness at every step, and treat the Knight Lab page as a featured showcase rather than a supporting page. Grace's data science background is a genuine differentiator among journalism students; burying or vaguely describing that work is the single most costly content mistake she could make.

---

## Key Findings

### Recommended Stack

The stack is intentionally minimal: plain HTML5, CSS3 with custom properties, and vanilla JavaScript (ES2022+), hosted on GitHub Pages. No build step, no package manager, no framework. Two CDN libraries are added selectively — GLightbox (11 KB, photography lightbox) and Google Fonts (Newsreader + Inter). All content lives in `data.json` at the repository root, fetched by a small inline script on each content page. Grace edits content using GitHub's web editor: navigate to `data.json`, click the pencil, type, commit. The site updates within 60 seconds.

**Core technologies:**
- **HTML5** — page structure; GitHub Pages serves plain `.html` files with zero configuration
- **CSS3 + Custom Properties** — full design system via CSS variables; no preprocessor needed; 98%+ browser support
- **Vanilla JavaScript (ES2022+)** — `fetch()` + `async/await` to load and render `data.json`; no jQuery, no bundler
- **`data.json`** — single source of truth for all editable content; human-readable, GitHub-editable
- **GLightbox 3.3.0** — photography lightbox; 11 KB gzipped, no jQuery, CDN-available
- **Google Fonts: Newsreader + Inter** — editorial typography system; Newsreader is designed for digital news layouts

**What NOT to use:** React/Vue/Svelte (unjustified build overhead), Bootstrap/Tailwind (framework CSS fights editorial design), jQuery (replaced by native ES6+), Sass (replaced by CSS custom properties), Netlify CMS (over-engineered for a JSON file update workflow).

See: `.planning/research/STACK.md`

### Expected Features

Journalism portfolio convention is highly consistent. Differentiation comes from curation and design quality, not feature inventory. Editors universally navigate directly to clips; every other section is supporting evidence.

**Must have (table stakes) — P1:**
- Clips list with title, publication, date, and working link — the primary deliverable editors want
- Professional headshot and name on the landing page — editors must know whose site this is in 3 seconds
- About/bio page — one or two tight paragraphs establishing narrative (Medill, data science, Knight Lab)
- Contact info (email + LinkedIn) in the footer of every page — the conversion point, never buried
- Resume PDF download from About page or nav — universal application requirement
- Photography gallery with curated 8–12 photos and editorial captions
- Awards section with each award linked to the recognized work — evidence, not just a claim
- Knight Lab / EIS Archives page — the primary differentiator; must be treated as a featured showcase

**Should have (competitive advantage) — P2:**
- Video section (build placeholder now; fill when Grace provides YouTube/Vimeo URLs)
- SUSO Camp page — rounds out the civic journalism dimension of Grace's identity
- Downloadable clips PDF (already exists in project folder)

**Defer to v2+:**
- Beat-specific clip filtering
- Dark mode toggle
- Project-level methodology case studies

**Anti-features to avoid:** blog/commentary section, social media feed embeds, animated hero/splash screen, "hire me" callout, counter widgets, inline PDF embeds for every clip.

See: `.planning/research/FEATURES.md`

### Architecture Approach

The site is 7 root-level HTML pages (`index.html`, `clips.html`, `photos.html`, `video.html`, `knight-lab.html`, `suso-camp.html`, `awards.html`) sharing one `style.css`, one `components.js` (web components for nav and footer), and one `data.json`. Content pages fetch `data.json` at page load and render into DOM containers; static pages (About, Knight Lab, SUSO Camp) are mostly direct HTML with project data optionally sourced from `data.json`. Assets live in `images/` (web-optimized photos) and `assets/` (PDFs).

**Major components:**
1. **`data.json`** — single editable content surface; all clips, photos, awards, video embeds, and project descriptions; `fetch()` contract between Grace and the rendering layer
2. **`components.js`** — `<site-nav>` and `<site-footer>` web components; write nav once, updates all 7 pages simultaneously; uses `customElements.define()` with `connectedCallback()` innerHTML injection (no Shadow DOM — inherits global CSS)
3. **`style.css`** — global design system; CSS custom properties define the full token set (colors, spacing, type scale); all layout via CSS Grid and Flexbox with mobile-first breakpoints
4. **Page scripts** — small fetch-and-render functions per content page; maps JSON arrays to HTML card templates
5. **`images/`** — web-optimized photo files (must be ≤400 KB each before adding to repo)
6. **`assets/`** — resume PDF and clips PDF, hosted in the repo (never externally hotlinked)

**Build order constraint:** `data.json` schema → image optimization → `style.css` → `components.js` → `index.html` → content pages → project pages → GitHub Pages configuration → final image/link audit.

See: `.planning/research/ARCHITECTURE.md`

### Critical Pitfalls

1. **Over-designing so the work disappears** — editorial restraint is a professional signal in journalism; more than two fonts, decorative color, or animations read as bad editorial judgment. Design constraint must be established in the design system phase and not relaxed. Prevention: "can the editor see the first clip in under 10 seconds?" test.

2. **Unoptimized photos destroying load time** — the 13 raw camera JPEGs in the project folder are 4–6 MB each; at that size the photography gallery takes 15–30 seconds on mobile. Every photo must be compressed to ≤400 KB (≤2000px longest edge) before it enters the repo. Add `loading="lazy"` to all gallery images. Prevention: image optimization pass is a gated prerequisite before the photography section is built.

3. **Broken external clip links** — news publications restructure URLs; a broken link in a journalism portfolio is worse than not listing the clip. The `data.json` clips schema must include a `pdf_fallback` field from day one, and every link must be click-tested before launch. Prevention: build the fallback field into the schema; click-test as a pre-launch checklist item.

4. **Burying or vaguely describing the Knight Lab work** — this is Grace's strongest differentiator; most journalism students have zero data projects. The page must name the tools (BERTopic, OCR, LLMs, supercompute cluster), describe Grace's specific contribution (not the team's), show a visual of the output, and link to the live site. It must be accessible from the homepage. Prevention: content brief for the Knight Lab page written before the page is built.

5. **No mobile-responsive layout** — editors open portfolio links on phones. Design mobile-first (375px baseline), test every page in Chrome DevTools responsive mode before marking it complete. No fixed-pixel widths wider than 375px. Navigation must work as a vertical list on small screens. Prevention: mobile testing is a per-component requirement, not a post-build retrofit.

See: `.planning/research/PITFALLS.md`

---

## Implications for Roadmap

Based on architecture build-order constraints, feature dependencies, and pitfall prevention timing:

### Phase 1: Foundation — Design System and Data Schema

**Rationale:** Everything downstream depends on these two artifacts. The CSS design system defines the token set (colors, type scale, spacing) that all page HTML is written against. The `data.json` schema defines the contract that all render scripts depend on — wrong shape means broken renders. Both must be locked before any page is built. This phase also catches the over-design pitfall at the moment it's cheapest to prevent.

**Delivers:** `style.css` with full CSS custom property token set, mobile-first base styles, and typography; `data.json` with complete schema and initial content populated; `images/` folder with all photos web-optimized (≤400 KB each)

**Addresses (from FEATURES.md):** Clean typography, fast page load (via image optimization), mobile responsiveness groundwork

**Avoids (from PITFALLS.md):** Over-designing (design system constraints locked early), unoptimized photos (image optimization gated here), update friction (schema designed for 3-minute update workflow)

**Research flag:** Standard patterns — no additional research needed. CSS custom properties and image optimization are fully documented.

### Phase 2: Shared Shell — Nav, Footer, and Deployment

**Rationale:** `components.js` (nav + footer) must exist before any page is written because every page drops `<site-nav>` and `<site-footer>` tags. GitHub Pages must be configured and confirmed working before content pages are built and tested — deploying early catches `file://` vs. server-origin issues and case-sensitivity gotchas before they're buried in 7 pages of content.

**Delivers:** `components.js` with `<site-nav>` and `<site-footer>` web components, active-state logic, contact info in footer; GitHub Pages configured and live at `username.github.io/repo`; `index.html` (About page) as the first fully functional page (headshot, bio, resume link)

**Addresses (from FEATURES.md):** Contact info on every page (footer component), resume PDF download, professional headshot on landing page

**Avoids (from PITFALLS.md):** Duplicated nav HTML in every file (web component solves this), missing contact info footer, GitHub Pages case-sensitivity surprises

**Research flag:** Standard patterns — web components API is well-documented (MDN); GitHub Pages setup is two-step.

### Phase 3: Core Content Pages — Clips and Awards

**Rationale:** These are the two pages editors navigate to immediately. They are also the lowest implementation complexity (fetch JSON array, render cards) and the highest editor-facing value. Completing them early means the portfolio is usable for applications even if subsequent pages are incomplete. The clips page is where the "8–15 clips maximum, lead with strongest" curation discipline must be enforced.

**Delivers:** `clips.html` rendering curated clips from `data.json` (8–15 clips, strongest first, `pdf_fallback` field populated); `awards.html` rendering awards with links to recognized work; every external link click-tested

**Addresses (from FEATURES.md):** Clips list (P1, highest editor value), awards section with linked work (P1)

**Avoids (from PITFALLS.md):** Too many clips (curation enforced at build time), broken external links (click-test + PDF fallback schema), awards as dead-end list (each award links to the piece)

**Research flag:** Standard patterns — fetch-and-render is straightforward vanilla JS.

### Phase 4: Photography Gallery

**Rationale:** Image optimization must be complete (Phase 1 prerequisite) before this phase starts. The gallery is medium-complexity (CSS Grid + GLightbox lightbox) and represents a meaningful multimedia differentiator. Placed after core content pages because editors who evaluate the site without the gallery still see the essential portfolio; the gallery is supporting evidence, not the primary deliverable.

**Delivers:** `photos.html` with CSS Grid thumbnail layout, GLightbox lightbox (keyboard + swipe), `data.json` photos array with captions and credit (Anna Hoch-Kenney for headshot), lazy loading on all images, Lighthouse Performance score above 85

**Addresses (from FEATURES.md):** Photography gallery as differentiator (shows multiplatform capability), editorial captions (transforms photos into journalism)

**Avoids (from PITFALLS.md):** Unoptimized photos (gated in Phase 1), no lazy loading (required in this phase), dumping all 13 photos without curation (8–12 selected for quality)

**Research flag:** Standard patterns — GLightbox is well-documented; CSS Grid gallery is a well-established pattern. No additional research needed.

### Phase 5: Featured Project Pages — Knight Lab and SUSO Camp

**Rationale:** These are mostly static HTML with content sourced from `data.json`. They are placed here because they depend on the design system and shell being stable, but they are not blocked by any data dependencies. The Knight Lab page is the most important of the two — it requires a specific content brief (tools named, Grace's role stated specifically, visual/screenshot included, live link present) before the page is built. SUSO Camp rounds out Grace's identity and can be built with less ceremony.

**Delivers:** `knight-lab.html` with named technical stack (BERTopic, OCR, LLMs, supercompute), Grace's specific role, screenshot/visual of outputs, link to live EIS site; `suso-camp.html` with four pillars and SUSO Camp overview; both pages accessible from nav

**Addresses (from FEATURES.md):** Knight Lab page as primary differentiator (P1), technical credibility signals, SUSO Camp for civic journalism identity (P2)

**Avoids (from PITFALLS.md):** Burying or vaguely describing the Knight Lab work (content brief enforced before build), passive-voice project description, pages requiring reader to know what Knight Lab is without explanation

**Research flag:** The Knight Lab page specifically needs a content brief written with Grace before the page is coded — what tools did she personally use, what outputs did her pipeline produce, what does Grace want data journalism editors to take away? This is a content problem, not a technical one.

### Phase 6: Video and Supplementary Content

**Rationale:** Video is gated on Grace providing YouTube/Vimeo embed URLs for "What Can We Do?" and "Move Your Feet." The page structure can be built with graceful placeholders. Also includes the downloadable clips PDF link (asset already exists) and any final polish. This phase is placed last because none of the P1 table-stakes features depend on it.

**Delivers:** `video.html` with embedded video packages or a "video packages available upon request" placeholder; clips PDF download link added to clips page or About page; full pre-launch checklist completed (all links tested, all pages mobile-tested, footer on every page, page title tags, headshot credit)

**Addresses (from FEATURES.md):** Video section (P2), downloadable clips PDF (P2)

**Avoids (from PITFALLS.md):** Broken video section with empty iframes (graceful placeholder if URLs not yet confirmed), missing headshot photo credit, generic page title tags, broken resume PDF link

**Research flag:** No additional research needed. YouTube/Vimeo iframe embeds are standard; placeholder content pattern is straightforward.

### Phase Ordering Rationale

- **Data schema before pages:** Every content page render script depends on the JSON shape; schema errors discovered late require touching multiple files
- **Image optimization before photography section:** Raw camera JPEGs cannot enter the repo; optimization is a one-time gate, not a retrofit
- **Shell (nav/footer) before content pages:** Web components must be registered before pages that reference them; early GitHub Pages deployment catches environment-specific issues
- **Clips and awards before gallery and projects:** These are what editors check first; portfolio is usable for applications as soon as Phase 3 is complete
- **Knight Lab before video:** Knight Lab is a P1 differentiator with content complexity; video is P2 and partially blocked on external inputs
- **Pre-launch checklist in Phase 6:** Broken links, missing mobile testing, and missing credits are all easiest to catch as a final pass

### Research Flags

Phases needing deeper research or content work during planning:
- **Phase 5 (Knight Lab page):** Requires a structured content brief session with Grace — what tools did she build personally vs. what the team built; what visual outputs exist; what is the intended audience (general editors vs. data journalism desks specifically)
- **Phase 6 (Video):** Blocked on Grace providing embed URLs; if URLs are not available at build time, placeholder design should be confirmed with Grace before Phase 6 starts

Phases with standard patterns (no additional research needed):
- **Phase 1:** CSS custom properties and image optimization are fully documented
- **Phase 2:** Web components API (MDN authoritative) and GitHub Pages setup are straightforward
- **Phase 3:** Fetch-and-render pattern is vanilla JS fundamentals
- **Phase 4:** CSS Grid gallery and GLightbox are well-documented

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All core recommendations verified against official docs (GitHub Pages, MDN, GLightbox). Zero-dependency static approach is well-established and unambiguous for this use case. |
| Features | HIGH | Cross-verified across 8 journalism portfolio guides and industry sources. Journalism hiring conventions are unusually consistent — there is near-universal agreement on what editors expect. |
| Architecture | HIGH | Web components, fetch-and-render, and CSS Grid patterns are authoritative (MDN). GitHub Pages CORS behavior confirmed in community discussions. Build order constraints derive directly from dependency analysis. |
| Pitfalls | HIGH (content), MEDIUM (technical) | Content pitfalls (over-design, clip curation, Knight Lab underrepresentation) verified across multiple journalism industry sources. Technical pitfalls (image optimization thresholds, CORS behavior) rely on community-confirmed patterns rather than official benchmarks. |

**Overall confidence: HIGH**

### Gaps to Address

- **Video embed URLs:** "What Can We Do?" and "Move Your Feet" YouTube/Vimeo URLs are not yet in the project folder. The `video.html` page cannot be fully built without them. Resolution: ask Grace for these URLs before Phase 6; build placeholder in the meantime.
- **Knight Lab content brief:** Grace's specific technical contribution to EIS Archives (which tools she personally used, what outputs her pipeline produced, whether screenshots are available) needs to be captured in a content brief before `knight-lab.html` is written. This is the highest-value page for data journalism applications.
- **Clips selection and curation:** The research recommendation is 8–15 clips, strongest first. Grace's actual clip inventory (titles, publications, dates, working URLs, PDF backups for paywalled pieces) needs to be assembled and curated before the clips page is populated. The `data.json` clips array cannot be finalized without this input.
- **Google Fonts CDN vs. self-hosting:** Research recommends Google Fonts CDN as acceptable for a personal portfolio. If GDPR compliance or external request elimination ever becomes a concern, fonts should be self-hosted. Not in scope for v1.

---

## Sources

### Primary (HIGH confidence)
- GitHub Pages official docs — confirmed plain HTML/CSS/JS with zero configuration: https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- MDN Web Docs: Web Components / customElements — authoritative reference for `customElements.define()` pattern: https://developer.mozilla.org/en-US/docs/Web/API/Web_components
- MDN Web Docs: CSS Custom Properties — browser support and usage: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties
- GitHub Docs: Configuring a publishing source for GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- GLightbox official site: confirmed version 3.3.0, 11 KB gzipped, CDN available: https://biati-digital.github.io/glightbox/

### Secondary (MEDIUM confidence)
- NBCUniversal Academy, "How to Choose Your Best Journalism Portfolio Clips": https://nbcuacademy.com/journalism-portfolio-articles/
- Journo Portfolio, "Building Your Journalist Portfolio: The Ultimate 2024 Guide": https://www.journoportfolio.com/blog/building-your-journalist-portfolio-the-ultimate-2024-guide/
- Authory, "A Comprehensive Guide to Creating a Journalism Portfolio": https://authory.com/blog/journalism-portfolio
- IJNet, "How to perfect your online journalism portfolio": https://ijnet.org/en/story/how-perfect-your-online-journalism-portfolio
- GitHub Community: GitHub Pages CORS headers confirmation: https://github.com/orgs/community/discussions/22399
- Go Make Things: vanilla JS fetch pattern: https://gomakethings.com/how-to-use-the-fetch-api-with-vanilla-js/
- Adobe / WP Engine image optimization: WebP 25–34% smaller than JPEG; target ≤400 KB per web image
- Google / Web.dev: 4.42% conversion drop per additional second of load; 90% mobile bounce increase at 5s

### Tertiary (MEDIUM-LOW confidence)
- Typewolf / Google Fonts editorial recommendations — Newsreader as top editorial serif for digital journalism: https://www.typewolf.com/google-fonts
- DEV Community — vanilla JS fetch JSON render pattern: https://dev.to/arkhan/why-vanilla-javascript-is-making-a-comeback-in-2025-4939

---
*Research completed: 2026-03-19*
*Ready for roadmap: yes*
