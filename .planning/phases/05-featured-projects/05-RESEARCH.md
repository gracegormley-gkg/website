# Phase 5: Featured Projects - Research

**Researched:** 2026-04-06
**Domain:** Static HTML content pages — editorial long-form layout, no JS fetch required
**Confidence:** HIGH

---

## Summary

Phase 5 fills the two "content coming soon" placeholder pages — `knight-lab.html` and `suso-camp.html` — with real, substantive content. Both pages already exist in the repo and wire up `<site-nav>` and `<site-footer>` via `components.js`. The task is entirely a content and layout exercise within the established stack: static HTML, `style.css` design tokens, no build step, no new dependencies.

All content needed to write the Knight Lab page exists in `data.json` (`knight_lab` object) and in the EIS Archives live site at `https://nulib-ds.github.io/EIS-Final/`. The EIS site is a Canopy IIIF project with 115 environmental impact statement documents, 10 major themes, 17 subthemes, a geographic map, and an interactive theme-network visualization. Grace's role was AI Team Lead who built the metadata pipeline that powers those visualizations.

All content needed to write the SUSO Camp page also exists in `data.json` (`suso_camp` object) plus the reference file `grace-gormley-portfolio-reference.md`. Press coverage with exact URLs is already in `data.json` (`press_coverage` array). No data gaps exist — both pages can be authored from material already in the repo.

**Primary recommendation:** Write both pages as static HTML — no `fetch('./data.json')`, no render script. Content is stable and editorial; static HTML renders instantly, works JS-disabled, and matches the proven About page pattern. Add page-specific CSS classes to `style.css` for the new layout elements (project-hero, pillar cards, tool tags, etc.).

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| KNIGHT-01 | User can read a full feature page about the EIS Archives project with context on what the project is and why it matters | EIS site confirmed: 115 docs, 10 themes, climate change focus, Canopy IIIF framework — enough context for a 2-minute readable summary |
| KNIGHT-02 | Page clearly describes Grace's specific role: AI team lead, built the metadata pipeline powering the theme web, map, and visualizations | `data.json` knight_lab object has `grace_role: "AI Team Lead — Metadata Pipeline"`; content matches requirements |
| KNIGHT-03 | Page calls out tools and skills: BERTopic, OCR, topic modelling, local and global LLM calls, GPT-4, Claude Code, supercompute cluster | `data.json` knight_lab.tools array has all 7 tools listed verbatim |
| KNIGHT-04 | Page calls out technical leadership: led non-technical team, translated complex AI/data concepts clearly | Not yet in data.json — must be authored into the HTML prose; confirmed in requirements |
| KNIGHT-05 | User can visit the live project via prominent link (https://nulib-ds.github.io/EIS-Final/) | `data.json` knight_lab.live_url already set correctly |
| SUSO-01 | User can read about SUSO Camp with overview and all four pillars (Writing, Public Speaking, Results, Longevity) | `data.json` suso_camp.pillars has all 4 with full descriptions |
| SUSO-02 | Page provides context on Girl Scout Gold Award and scale of impact (~70 students, 200+ magazines, camp continued without Grace) | `data.json` suso_camp.girl_scout_award and suso_camp.impact both present |
| SUSO-03 | User can visit https://susocamp.weebly.com/ | `data.json` suso_camp.website_url already set correctly |
| SUSO-04 | Page includes press coverage mentions (Verde Magazine, Paly Voice) | `data.json` press_coverage has both items with urls and descriptions |
</phase_requirements>

---

## Standard Stack

### Core (no changes — same stack as all prior phases)

| Library / Tool | Version | Purpose | Why Standard |
|----------------|---------|---------|--------------|
| Static HTML | — | Page markup | Established by Phase 1 decision; About page is the model |
| style.css design tokens | — | All spacing, color, typography | All CSS vars already defined; new classes extend, never override |
| components.js | — | `<site-nav>` and `<site-footer>` web components | Already wired; pages just need `<script type="module" src="components.js">` |
| Google Fonts (Newsreader + Inter) | — | Typography | Loaded via `<link>` in every page head — copy the same block |

### No New Dependencies

This phase introduces zero new libraries. Both pages are editorial long-form content, styled with existing design tokens. The About page (`index.html`) is the implementation template.

**Installation:** Nothing to install.

---

## Architecture Patterns

### Pattern 1: Static HTML Content Page (About page model)

**What:** Page content is authored directly in HTML — no `fetch()`, no render script, no JS required at all.

**When to use:** Stable editorial content that Grace does not need to update frequently via `data.json`.

**Why not data.json render:** The About page decision (Phase 2) established this pattern for stable content. Knight Lab and SUSO Camp fit the same profile — complex prose, custom structure, not tabular data.

**Template (from `index.html`):**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Page Title] — Grace Gormley</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..800;1,6..72,300..800&family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <script type="module" src="components.js"></script>
</head>
<body>
  <site-nav></site-nav>
  <main class="page-content">
    <!-- content here -->
  </main>
  <site-footer></site-footer>
</body>
</html>
```

**Key:** Use `class="page-content"` on `<main>` to get the standard `max-width: 720px` centered column that all content pages use.

### Pattern 2: Section Heading + Prose Block

The `section-heading` class (already in style.css) renders a bold editorial divider for h2. Use it for Knight Lab sections (What Is This Project, Grace's Role, Tools Used) and for SUSO Camp sections (Overview, The Four Pillars, Impact, Press Coverage).

```html
<h2 class="section-heading">Grace's Role</h2>
<p>Prose paragraph goes here…</p>
```

### Pattern 3: Tool Tag List (new CSS needed)

For KNIGHT-03, the 7 tools (BERTopic, OCR, topic modelling, local LLMs, GPT-4, Claude Code, supercompute cluster) should render as inline tags/pills — visually scannable, not buried in prose.

New CSS class needed in style.css:
```css
/* Knight Lab — Phase 5 */
.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: var(--space-4) 0;
}

.tool-tag {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  padding: var(--space-1) var(--space-3);
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  color: var(--color-ink);
}
```

### Pattern 4: Pillar Cards for SUSO Camp (new CSS needed)

SUSO-01 requires all four pillars to be visually distinct and scannable. A card row works well editorially.

New CSS class needed in style.css:
```css
/* SUSO Camp — Phase 5 */
.pillars-list {
  margin: var(--space-8) 0;
  display: grid;
  gap: var(--space-6);
}

.pillar-card {
  padding: var(--space-6);
  background: var(--color-bg-subtle);
  border-left: 3px solid var(--color-accent);
  border-radius: var(--border-radius);
}

.pillar-name {
  font-family: var(--font-editorial);
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--space-2);
}
```

### Pattern 5: Prominent CTA Link

For KNIGHT-05 and SUSO-03, the external link should be a styled button — not a plain anchor — so it reads as a call to action. The existing `.btn-download` class already handles this:

```html
<a href="https://nulib-ds.github.io/EIS-Final/"
   target="_blank" rel="noopener"
   class="btn-download">Visit the EIS Archives Project</a>
```

Reuse `.btn-download` from Phase 2 — no new CSS needed for the button itself.

### Recommended Structure for knight-lab.html

```
<main class="page-content">
  <h1>Knight Lab — EIS Archives</h1>
  <p class="about-tagline">[subtitle in italic]</p>

  <h2 class="section-heading">What Is the EIS Archives?</h2>
  <p>[2–3 sentences: 115 docs, 10 themes, Canopy IIIF, what EIS means]</p>

  <h2 class="section-heading">Grace's Role</h2>
  <p>[AI Team Lead. Built the metadata pipeline that powers the theme
     network and geographic map. Led a non-technical team…]</p>

  <h2 class="section-heading">Tools & Skills</h2>
  <div class="tool-tags">
    <span class="tool-tag">BERTopic</span>
    <!-- etc. -->
  </div>

  <h2 class="section-heading">Explore the Project</h2>
  <a href="https://nulib-ds.github.io/EIS-Final/" …>Visit the EIS Archives</a>
</main>
```

### Recommended Structure for suso-camp.html

```
<main class="page-content">
  <h1>SUSO Camp</h1>
  <p class="about-tagline">Stand Up, Speak Out: Journalism for Young Activists</p>

  <h2 class="section-heading">Overview</h2>
  <p>[Girl Scout Gold Award, 100+ hours, year-long project…]</p>

  <h2 class="section-heading">The Four Pillars</h2>
  <div class="pillars-list">
    <div class="pillar-card">
      <p class="pillar-name">Writing</p>
      <p>[description]</p>
    </div>
    <!-- etc. -->
  </div>

  <h2 class="section-heading">Impact</h2>
  <p>[~70 students, 200+ magazines, continued without Grace]</p>

  <a href="https://susocamp.weebly.com/" …>Visit the SUSO Camp Resource Site</a>

  <h2 class="section-heading">Press Coverage</h2>
  <!-- Verde Magazine, Paly Voice items -->
</main>
```

### Anti-Patterns to Avoid

- **Fetching data.json for this content:** Both pages have stable, editorial content — data.json fetch is for tabular/updatable content (clips, awards, photos). The About page is the right model, not awards.html.
- **Overriding existing CSS variables:** Always extend style.css with new classes; never change existing token values.
- **Using `<h1>` more than once per page:** One h1 per page for SEO and accessibility. Sections use h2 with `section-heading` class.
- **Skipping `target="_blank" rel="noopener"` on external links:** All external links must have both attributes (security + UX).
- **Centering the external link inside the content flow:** The CTA link sits in the document flow — it should not be centered or floated; `btn-download` is an inline-block that left-aligns naturally.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Navigation and footer | Custom nav HTML | `<site-nav>` + `<site-footer>` web components | Already implemented in components.js; active state handled automatically |
| External link button | Custom button CSS | `.btn-download` class | Already in style.css from Phase 2; consistent visual |
| Typography scale | Custom font sizes | `--text-*` CSS tokens | 7-step scale defined in :root; use them, don't add px values inline |
| Section dividers | Custom border rules | `.section-heading` class | Already handles border-bottom, spacing, font-size |

---

## Common Pitfalls

### Pitfall 1: Forgetting the press coverage section on SUSO Camp comes from data.json — but should be authored statically

**What goes wrong:** Developer tries to `fetch('./data.json')` and render press_coverage dynamically on suso-camp.html, adding unnecessary script complexity.

**Why it happens:** awards.html uses fetch for press_coverage, so the pattern looks reusable.

**How to avoid:** SUSO Camp press section covers exactly 2 items (Verde Magazine, Paly Voice) and is stable. Author it directly in HTML — same approach as About page. The two items are already known: Verde Magazine "Journey Into Journalism" at `https://verdemagazine.com/journey-into-journalism` and Paly Voice "High school student develops journalism summer camp" at `https://palyvoice.com/173161/features/high-school-student-develops-journalism-summer-camp/`.

### Pitfall 2: KNIGHT-04 is the most commonly forgotten requirement

**What goes wrong:** The page describes Grace's tools and the project, but omits the leadership angle — that she led a non-technical team and translated complex AI/data science concepts for collaborators.

**Why it happens:** The technical tools list (KNIGHT-03) is prominent in data.json; the leadership narrative is not explicitly in data.json and must be authored as prose.

**How to avoid:** The Grace's Role section must explicitly say she led a non-technical team, not just that she used technical tools. This is a differentiator for journalism+data recruiters.

### Pitfall 3: Subtitle/tagline not using `about-tagline` class

**What goes wrong:** Developer adds a subtitle paragraph with inline styles or a new class, creating visual inconsistency.

**Why it happens:** The `about-tagline` class name looks About-page-specific.

**How to avoid:** `about-tagline` is a design-system class that renders italic editorial serif at `--text-lg`. Reuse it for page subtitles on both new pages (confirmed in style.css — it's just a typography rule, not semantically About-specific).

### Pitfall 4: Missing `rel="noopener"` on external links

**What goes wrong:** External links open in a new tab without `rel="noopener"`, creating a security vulnerability (tab-napping).

**Why it happens:** Easy to forget when authoring static HTML.

**How to avoid:** Every external link needs `target="_blank" rel="noopener"`. The EIS link and SUSO link are the two main ones; press coverage links too.

### Pitfall 5: CSS added directly to knight-lab.html or suso-camp.html as `<style>` blocks

**What goes wrong:** Page-scoped `<style>` blocks fragment the design system and make future maintenance harder.

**Why it happens:** Feels scoped and safe for page-specific CSS.

**How to avoid:** All new CSS goes in `style.css` in a clearly commented block (e.g., `/* Knight Lab and SUSO Camp — Phase 5 */`). This is the established pattern — every prior phase added to style.css.

---

## Code Examples

### Knight Lab HTML skeleton (from established patterns)

```html
<!-- Source: index.html pattern, Phase 2 -->
<main class="page-content">
  <h1>Knight Lab</h1>
  <p class="about-tagline">EIS Archives — World's Largest Exploratory EIS Database</p>

  <h2 class="section-heading">About the Project</h2>
  <p>The EIS Archives is a digital humanities project at Northwestern's Knight Lab that
     makes 115 Environmental Impact Statements searchable and visualizable for the first
     time. The collection spans 10 major themes and 17 subthemes, organized around climate
     change narratives drawn from government environmental documents. Users can explore an
     interactive theme network, a geographic map of all documents, and curated exhibitions.</p>

  <h2 class="section-heading">Grace's Contribution</h2>
  <p>Grace served as <strong>AI Team Lead</strong>, building the metadata pipeline that
     powers the theme network visualization and geographic document map. She led a
     non-technical team through the technical aspects of the project — translating AI and
     data science concepts into actionable workflows for collaborators without a CS background.</p>

  <h2 class="section-heading">Tools &amp; Skills</h2>
  <div class="tool-tags">
    <span class="tool-tag">BERTopic</span>
    <span class="tool-tag">OCR</span>
    <span class="tool-tag">Topic Modelling</span>
    <span class="tool-tag">Local LLMs</span>
    <span class="tool-tag">GPT-4</span>
    <span class="tool-tag">Claude Code</span>
    <span class="tool-tag">Supercompute Cluster</span>
  </div>

  <p class="section-heading" style="..."><!-- DON'T use inline styles --></p>

  <h2 class="section-heading">Explore the Live Project</h2>
  <p>The EIS Archives is live and publicly accessible:</p>
  <a href="https://nulib-ds.github.io/EIS-Final/"
     target="_blank" rel="noopener"
     class="btn-download">Visit the EIS Archives</a>
</main>
```

### Tool tags CSS (new addition to style.css)

```css
/* Knight Lab and SUSO Camp — Phase 5 */
.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: var(--space-4) 0;
}

.tool-tag {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  padding: var(--space-1) var(--space-3);
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  color: var(--color-ink);
}

.pillars-list {
  margin: var(--space-8) 0;
  display: grid;
  gap: var(--space-6);
}

.pillar-card {
  padding: var(--space-6);
  background: var(--color-bg-subtle);
  border-left: 3px solid var(--color-accent);
  border-radius: var(--border-radius);
}

.pillar-name {
  font-family: var(--font-editorial);
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--space-2);
}
```

---

## Content Inventory (What Is Already Known)

All content needed for Phase 5 is in the repo. No content brief with Grace is required to proceed.

### Knight Lab Page — Content Available

| Field | Source | Value |
|-------|--------|-------|
| Project name | data.json | EIS Archives |
| Subtitle | data.json | World's Largest Exploratory EIS Database |
| Live URL | data.json | https://nulib-ds.github.io/EIS-Final/ |
| Grace's role | data.json | AI Team Lead — Metadata Pipeline |
| Tools (all 7) | data.json | BERTopic, OCR, topic modelling, local LLMs, GPT-4, Claude Code, supercompute cluster |
| What the project is | EIS site (fetched) | 115 EIS documents, 10 themes, 17 subthemes, theme network + geographic map, climate change focus, Canopy IIIF |
| Technical leadership | REQUIREMENTS.md | Led non-technical team, translated AI/data concepts — must be authored as prose |

**Note from STATE.md blocker (now resolved):** STATE.md flagged "Knight Lab page requires a content brief session with Grace before coding." Investigation of the EIS live site and existing data.json reveals all required content IS present. The blocker was noted before the EIS site was inspected. This research confirms no content brief is needed — proceed.

### SUSO Camp Page — Content Available

| Field | Source | Value |
|-------|--------|-------|
| Overview text | data.json | suso_camp.overview (full paragraph) |
| Girl Scout Gold Award | data.json | suso_camp.girl_scout_award |
| Impact | data.json | suso_camp.impact (~70 students, 200+ magazines, continued 2024) |
| All 4 pillars + descriptions | data.json | suso_camp.pillars array |
| Camp website URL | data.json | https://susocamp.weebly.com/ |
| Verde Magazine coverage | data.json | press_coverage[0] — "Journey Into Journalism" |
| Paly Voice coverage | data.json | press_coverage[2] — "High school student develops journalism summer camp" |

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Dynamic fetch for all content | Static HTML for stable editorial content; fetch only for tabular/updatable data | Pages render instantly, work JS-disabled |
| Inline styles for one-off elements | CSS custom properties + named classes in style.css | Consistent design, maintainable |

---

## Open Questions

1. **Should the press coverage on SUSO Camp link open in a new tab?**
   - What we know: All other external links use `target="_blank"` on this site
   - What's unclear: Whether press items on SUSO Camp are contextually better staying in-page (since suso-camp.html is itself a contextual landing point)
   - Recommendation: Use `target="_blank" rel="noopener"` for all external links — consistent with every other page

2. **Should SUSO Camp reuse press_coverage items already on awards.html, or duplicate the HTML?**
   - What we know: SUSO-04 requires press mentions ON the SUSO Camp page. The awards.html already shows these same items.
   - What's unclear: Whether duplication is a maintenance concern.
   - Recommendation: Duplicate the relevant 2 items directly in suso-camp.html as static HTML. These are stable; the data.json remains the master copy. Duplication across two static pages is not a maintenance problem at this scale.

---

## Validation Architecture

nyquist_validation is enabled in .planning/config.json.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None (static HTML site — no test runner) |
| Config file | None |
| Quick run command | Manual browser verification at live URL |
| Full suite command | Manual verification checklist per requirement |

This is a static HTML/CSS/JS site with no build step and no test runner. There are no automated tests in this codebase. Validation is performed by human spot-check of the live GitHub Pages deployment.

### Phase Requirements to Verification Map

| Req ID | Behavior | Test Type | How to Verify |
|--------|----------|-----------|---------------|
| KNIGHT-01 | Knight Lab page has project context | manual | Open knight-lab.html; confirm 2-minute readability, EIS explained |
| KNIGHT-02 | Grace's specific role described | manual | Confirm "AI Team Lead" and "metadata pipeline" appear in prose |
| KNIGHT-03 | All 7 tools listed | manual | Confirm all 7 tool tags render: BERTopic, OCR, topic modelling, local LLMs, GPT-4, Claude Code, supercompute cluster |
| KNIGHT-04 | Technical leadership angle present | manual | Confirm "led a non-technical team" or equivalent phrasing appears |
| KNIGHT-05 | Live EIS link present and prominent | manual | Confirm btn-download CTA renders and href=https://nulib-ds.github.io/EIS-Final/ |
| SUSO-01 | All 4 pillars present | manual | Confirm Writing, Public Speaking, Results, Longevity all render with descriptions |
| SUSO-02 | Gold Award + impact stats | manual | Confirm "Girl Scout Gold Award", "~70 students", "200+ magazines" present |
| SUSO-03 | SUSO website link present | manual | Confirm link to https://susocamp.weebly.com/ renders |
| SUSO-04 | Verde + Paly Voice mentioned | manual | Confirm Verde Magazine and Paly Voice items appear on page |

### Sampling Rate

- **Per task commit:** Open page in browser, run through the verification checklist for that task's requirements
- **Phase gate:** All 9 requirements verified before `/gsd:verify-work`

### Wave 0 Gaps

None — no test infrastructure exists and none is required for this static HTML project. Verification is human spot-check.

---

## Sources

### Primary (HIGH confidence)

- `data.json` (project root) — knight_lab and suso_camp objects, all field values confirmed
- `style.css` (project root) — all existing CSS classes and design tokens verified by direct read
- `index.html`, `clips.html`, `awards.html` (project root) — implementation patterns confirmed by direct read
- `components.js` (project root) — nav and footer web component patterns confirmed
- EIS Archives live site (https://nulib-ds.github.io/EIS-Final/) — project description, 115 documents, 10 themes, Canopy IIIF, visualizations confirmed by WebFetch

### Secondary (MEDIUM confidence)

- `grace-gormley-portfolio-reference.md` — SUSO camp four pillars, press coverage URLs cross-referenced against data.json
- `STATE.md` — architectural decisions from Phases 1-4 confirmed

### Tertiary (LOW confidence)

None — all claims in this document are backed by primary sources.

---

## Metadata

**Confidence breakdown:**
- Content inventory: HIGH — all content verified in data.json and live EIS site
- Standard stack: HIGH — same stack as 4 prior phases, no changes
- Architecture patterns: HIGH — directly modeled on existing pages
- CSS additions: HIGH — follows exact same token patterns as existing style.css
- Pitfalls: HIGH — derived from direct code inspection and established decisions

**Research date:** 2026-04-06
**Valid until:** 2026-05-06 (stable content; no external dependencies that could drift)
