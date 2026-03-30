# Phase 3: Clips and Awards — Research

**Researched:** 2026-03-30
**Domain:** Static HTML content pages rendered from data.json via fetch — clips list and awards list with press coverage
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CLIP-01 | User can browse Grace's published articles, each showing publication name, date, and a link to the live article | `data.json` `clips` array already has 3 real entries (title, publication, date, url); fetch-and-render pattern is the established architecture for content pages in this stack |
| CLIP-02 | Clips page features only Grace's strongest published work (curated, not exhaustive) | `data.json` already has a `featured` boolean field on each clip — the render script can filter or sort on this; curation is a content decision already made by the data schema |
| AWARD-01 | User can view Grace's award-winning articles with award name, organization, and link to the piece | `data.json` `awards` array has 11 real entries — most have `url` and/or `pdf_fallback`; 3 entries have an empty `url` and must fall back to PDF or show gracefully without a link |
| AWARD-02 | User can view press coverage of Grace's work (Verde Magazine, Paly Voice, Hearts of Gold podcast) with links | `data.json` `press_coverage` array has all 3 entries with titles, outlets, descriptions, and live URLs — fully populated, no placeholders |
</phase_requirements>

---

## Summary

Phase 3 fills the two stub pages (`clips.html` and `awards.html`) with live content rendered from `data.json`. The infrastructure is already built: `style.css` has the design tokens, `components.js` has the nav and footer, and `data.json` has all the content for both pages. This phase is almost entirely about writing the fetch-and-render JavaScript and CSS layout classes for each page.

Both pages follow the same established architecture pattern: an inline `<script>` (or linked `.js` file) fetches `./data.json`, maps the relevant array into HTML template strings, and injects them into a pre-existing container `<div>` in the page. No external libraries are needed for either page — this is pure vanilla JS with the CSS design system already established in `style.css`.

The only content gap is that `data.json` currently has only 3 clips entries, falling below the CLIP-01 requirement of 8–15. The Clips PDF (`"Clips List - Grace Gormley (Dec 2025) copy.pdf"`) in the project root contains the full curated list. Those additional clips need to be added to `data.json` as part of this phase before the page is rendered. Some awards entries also have empty `url` fields — the render logic must handle this gracefully (show PDF fallback link if available; omit the link entirely if neither is present).

**Primary recommendation:** Build clips.html first (simpler content, all live links), then awards.html (requires graceful handling of empty URLs and the press_coverage sub-section). Both pages need CSS additions to style.css for their layout classes. Populate data.json with the full clips list from the PDF before writing the render script.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| HTML5 (native) | Native | Page structure for clips.html and awards.html | Already established — both stub pages exist with correct `<head>` boilerplate |
| CSS3 Custom Properties (native) | Native | Layout classes for clip cards and award entries | All design tokens are in style.css from Phase 1; Phase 3 adds page-specific layout classes to the bottom of the same file |
| Vanilla JS fetch + ES6 template literals | Native | Fetch data.json and render clip and award lists | Established fetch-and-render pattern from ARCHITECTURE.md — confirmed working on GitHub Pages |
| Google Fonts: Newsreader + Inter | CDN | Typography | Already loaded on every page via `<link>` in `<head>` — no change needed |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `python3 -m http.server` | Built-in | Local development server so fetch() works | During development only; deploy to GitHub Pages for final testing |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline fetch script in each HTML file | Shared data-loader.js | A shared loader is slightly cleaner but adds another file to maintain. For 2 pages, inline is simpler and consistent with the pattern established in ARCHITECTURE.md. Either works. |
| Template literals for HTML generation | DOM API (createElement) | DOM API is XSS-safe but verbose; template literals are shorter and sufficient here — data comes from a controlled JSON file Grace edits herself, not user input |

**Installation:**
```bash
# No npm install. No new dependencies.
# All required infrastructure exists from Phases 1 and 2.
# Files to modify: clips.html, awards.html, style.css, data.json
```

---

## Architecture Patterns

### Phase 3 File Touchpoints

```
grace-portfolio/
├── clips.html          PHASE 3: replace "Content coming soon" with fetch-and-render
├── awards.html         PHASE 3: replace "Content coming soon" with fetch-and-render
├── style.css           PHASE 3: add .clips-list, .clip-card, .awards-list, .award-entry, .press-list CSS
├── data.json           PHASE 3: add remaining clips (currently 3, need 8-15 total)
│
├── index.html          (Phase 2 — no changes)
├── components.js       (Phase 2 — no changes)
├── [other pages]       (untouched stubs)
```

### Pattern 1: Fetch-and-Render for Clips Page

**What:** clips.html contains a `<div id="clips-list">` container. An inline `<script>` fetches `./data.json`, maps `data.clips` into article card HTML, and sets `container.innerHTML`.

**When to use:** This is the mandatory pattern for all content pages in this stack. Do not hardcode clip entries in HTML — Grace must be able to update by editing data.json only (SITE-05 requirement).

**Example:**
```javascript
// Source: ARCHITECTURE.md fetch-and-render pattern
fetch('./data.json')
  .then(r => r.json())
  .then(data => {
    const container = document.getElementById('clips-list');
    container.innerHTML = data.clips.map(clip => `
      <article class="clip-card">
        <h2 class="clip-title">
          <a href="${clip.url}" target="_blank" rel="noopener">${clip.title}</a>
        </h2>
        <p class="clip-meta">
          <span class="clip-publication">${clip.publication}</span>
          <span class="clip-date">${formatDate(clip.date)}</span>
        </p>
      </article>
    `).join('');
  });

function formatDate(iso) {
  // "2025-07-18" → "July 18, 2025"
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}
```

### Pattern 2: Awards Page with Graceful URL Handling

**What:** awards.html renders two sections from data.json: `data.awards` (award-winning articles) and `data.press_coverage` (Verde, Paly Voice, Hearts of Gold). Each section gets its own container div. Awards entries must handle the case where `url` is empty — fall back to `pdf_fallback`, and if both are empty, render the award entry without a link.

**When to use:** Required for AWARD-01 (award entries) and AWARD-02 (press coverage).

**Example:**
```javascript
// Graceful URL handling — some awards have url: "" but pdf_fallback present
function awardLink(award) {
  const href = award.url || award.pdf_fallback;
  if (!href) return `<span class="award-article">${award.article_title}</span>`;
  const label = award.article_title || 'View piece';
  return `<a href="${href}" target="_blank" rel="noopener">${label}</a>`;
}

container.innerHTML = data.awards.map(a => `
  <div class="award-entry">
    <h2 class="award-name">${a.name}</h2>
    <p class="award-org">${a.organization} &mdash; ${a.year}</p>
    ${a.article_title ? `<p class="award-piece">${awardLink(a)}</p>` : ''}
  </div>
`).join('');
```

### Pattern 3: Press Coverage Sub-Section

**What:** Below the awards list, a second section renders `data.press_coverage`. Each item shows the outlet name, article title as a link, and description. This section is visually separated from awards (different heading, possibly `--color-bg-subtle` background).

**When to use:** Required for AWARD-02.

**Example:**
```javascript
const pressContainer = document.getElementById('press-list');
pressContainer.innerHTML = data.press_coverage.map(item => `
  <div class="press-item">
    <p class="press-outlet">${item.outlet}</p>
    <h3 class="press-title">
      <a href="${item.url}" target="_blank" rel="noopener">${item.title}</a>
    </h3>
    <p class="press-desc">${item.description}</p>
  </div>
`).join('');
```

### Pattern 4: Date Formatting

**What:** `data.json` dates are stored as `"YYYY-MM-DD"` ISO strings (e.g., `"2025-07-18"`). Display them as `"July 18, 2025"` using `Date.toLocaleDateString()`.

**Pitfall:** `new Date("2025-07-18")` parsed without a time component is interpreted as UTC midnight, which can display as July 17 in US time zones due to UTC offset. Always append `T00:00:00` to force local time parsing:
```javascript
new Date("2025-07-18T00:00:00").toLocaleDateString('en-US', {
  year: 'numeric', month: 'long', day: 'numeric'
})
// → "July 18, 2025"  (correct in all US time zones)
```

### Pattern 5: CSS Layout Classes for Cards

**What:** New CSS classes added to the bottom of style.css for clip cards and award entries. Follow the same conventions as `.about-*` classes already in style.css: use design tokens for all values, no magic numbers.

**Page container pattern (used by both pages):**
```css
/* Added to style.css in Phase 3 */
.page-content {
  max-width: var(--max-width-content);
  margin: var(--space-12) auto;
  padding: 0 var(--space-8);
}

.clips-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  margin-top: var(--space-8);
}

.clip-card {
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--space-8);
}

.clip-title {
  font-size: var(--text-xl);
  margin-bottom: var(--space-2);
}

.clip-title a {
  text-decoration: none;
  color: var(--color-ink);
}

.clip-title a:hover {
  color: var(--color-accent);
}

.clip-meta {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
  display: flex;
  gap: var(--space-4);
}
```

### Anti-Patterns to Avoid

- **Hardcoding clip titles in clips.html HTML:** Grace's update workflow requires that adding a new clip is an edit to data.json only (SITE-05). If clips are in the HTML, adding a clip means editing HTML — unacceptable.
- **Rendering broken links silently:** Awards where `url` is empty will render a dead anchor `<a href="">` that navigates to the current page. Always check `if (award.url)` before wrapping in an anchor.
- **Using `new Date("YYYY-MM-DD")` without time:** Causes off-by-one date display in US time zones (date shows as one day earlier). Always use `"YYYY-MM-DDT00:00:00"`.
- **Mixing awards and press_coverage in the same list:** They represent different things — earned awards vs. external coverage. Keep them in separate HTML sections with distinct headings. AWARD-01 and AWARD-02 are separate requirements.
- **Opening `clips.html` with `file://` for testing:** `fetch('./data.json')` fails under the `file://` protocol. Use `python3 -m http.server 8080`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Date formatting | Custom date parser | `Date.toLocaleDateString()` | Native browser API handles locale, month names, edge cases |
| Link fallback logic | Complex conditional chain | Simple `url \|\| pdf_fallback` || expression | Two-field fallback is the entire logic; no library needed |
| List rendering | A full templating system | ES6 template literal + `.map().join('')` | Three lines of JS; no library overhead, no build step |
| External link security | Custom opener logic | `target="_blank" rel="noopener"` on all external links | HTML attribute handles tab isolation; don't write custom window.open code |

**Key insight:** This phase is content rendering, not UI engineering. The hard problems (nav, footer, design tokens, data schema) were solved in Phases 1 and 2. Phase 3 is writing ~50 lines of straightforward DOM manipulation.

---

## Content Audit (data.json current state)

### Clips — Current State

`data.json` currently has **3 clips**. The success criterion requires **8–15**. The additional clips exist in `"Clips List - Grace Gormley (Dec 2025) copy.pdf"` in the project root. Populating data.json with the full clips list must happen before the render script is written.

| Field | Status |
|-------|--------|
| `title` | Present on all 3 entries |
| `publication` | Present on all 3 entries |
| `date` | Present (YYYY-MM-DD format) |
| `url` | Present on all 3 entries (live links) |
| `featured` | Present (boolean) — can be used to sort/highlight |
| `note` | Present on all 3 entries (optional v2 context field) |
| `pdf_fallback` | Empty string on all 3 — not needed for current clips (live links exist) |

**Action required:** Add remaining clips from the PDF to data.json before rendering. Target: 8–15 entries.

### Awards — Current State

`data.json` has **11 award entries**. Status of required link fields:

| Entry | url | pdf_fallback | Action |
|-------|-----|--------------|--------|
| 1st Place National Nonfiction — "California: Taking a Gamble?" | present | present (Google Drive) | No action |
| 3rd Place National Sports Story — "California: Taking a Gamble?" | present | present (Google Drive) | No action |
| 1st Place National Sports Story — "Pioneering Progress" | present | present (Google Drive) | No action |
| 3rd Place National General Feature — "Menstruation Situation" | present | present (Google Drive) | No action |
| 2nd Place State Feature Story — "Menstruation Situation" | present | present (Google Drive) | No action |
| 2nd Place State Sports Story — "Beyond the Game" | **empty** | present (Google Drive) | Use pdf_fallback |
| 2nd Place State Opinion Piece — "Breaking the Mold" | **empty** | present (Google Drive) | Use pdf_fallback |
| Excellence Award in Feature Writing (JEA) | **empty** | **empty** | No article_title either — render without link |
| 2nd Place Feature Photo — "Eat My Bubbles" | present (Google Drive photo) | empty | No action |
| 3rd Place Sports Photo — "Diving Into States" | present (Google Drive photo) | empty | No action |
| Casey Nichols Service Above Self Award | **empty** | **empty** | Award only, no piece to link — render without link |

### Press Coverage — Current State

All 3 entries in `data.json` `press_coverage` are fully populated with live URLs. No content gaps.

---

## Common Pitfalls

### Pitfall 1: Off-by-One Date Display

**What goes wrong:** `new Date("2025-07-18")` displays as "July 17, 2025" in US time zones (UTC-7 or UTC-8).

**Why it happens:** ISO date strings without a time component are parsed as UTC midnight. In a UTC-7 time zone, UTC midnight is 5 PM the previous day — the browser displays July 17.

**How to avoid:** Always append `T00:00:00` to force local time: `new Date("2025-07-18T00:00:00")`.

**Warning signs:** Dates in the rendered list are one day earlier than the dates in data.json.

### Pitfall 2: Silent Empty Links on Awards

**What goes wrong:** Three award entries have `url: ""`. If the render template blindly does `<a href="${award.url}">`, it creates `<a href="">` which navigates to the current page — the link "works" but is wrong.

**Why it happens:** Empty string is falsy in JavaScript but is a valid (if useless) href value in HTML.

**How to avoid:** Always guard: `const href = award.url || award.pdf_fallback; if (href) { /* render link */ }`. For entries with no article_title and no link (Excellence Award, Casey Nichols Award), render only the award name and organization — no article reference line at all.

**Warning signs:** Clicking an award entry link reloads the current page instead of navigating to the article.

### Pitfall 3: fetch() Fails Under file://

**What goes wrong:** Opening `clips.html` by double-clicking (file:// protocol) causes `fetch('./data.json')` to fail with a CORS error. The clips list renders blank.

**Why it happens:** Browsers block cross-origin fetch on file:// origins. Even though data.json is in the same folder, file:// and file:// are treated as different origins.

**How to avoid:** Always test with a local server: `python3 -m http.server 8080`, then open `http://localhost:8080/clips.html`.

**Warning signs:** Browser console shows "Cross-Origin Request Blocked" or "Failed to fetch"; clips-list div is empty.

### Pitfall 4: XSS Risk from Unescaped Data

**What goes wrong:** Template literals inject data.json values directly into innerHTML. If a clip title contained `<script>` or `"`, the HTML would break or execute.

**Why it happens:** Template literal innerHTML does not escape HTML entities.

**How to avoid:** This is LOW risk for this specific site — Grace controls all content in data.json and is not a malicious actor. However, the correct practice is to escape quotes in href attributes. All URLs in data.json should be validated before going live (the link-check task in the success criteria covers this). Avoid injecting user-supplied content via innerHTML in general.

**Warning signs:** Layout breaks on a clip with an ampersand or quote in the title.

### Pitfall 5: Awards and Press Coverage Visually Undifferentiated

**What goes wrong:** Both sections render as lists of items with similar styling — editors can't tell which list is awards and which is press coverage.

**Why it happens:** If both sections use the same CSS class names and no visual separator, the page reads as one undifferentiated list of 14 items.

**How to avoid:** Use distinct `<h2>` headings ("Awards" and "Press Coverage"), add a clear visual break between sections (top border, extra margin, or a subtle background on one section). AWARD-01 and AWARD-02 are separate requirements and should read as separate sections.

**Warning signs:** A visitor cannot tell by scanning which items are Grace's awards and which are press appearances about her.

### Pitfall 6: External Links Missing rel="noopener"

**What goes wrong:** All clip and award links open in new tabs (`target="_blank"`). Without `rel="noopener"`, the opened page can access the opener tab via `window.opener` — a minor security issue.

**Why it happens:** Easy to forget when writing template literals quickly.

**How to avoid:** Every external link in the render templates must include `target="_blank" rel="noopener"`.

**Warning signs:** DevTools Lighthouse audit flags links with `target="_blank"` missing `rel="noopener"`.

---

## Code Examples

Verified patterns for this phase:

### Full Clips Render Script

```javascript
// clips.html inline script — Source: ARCHITECTURE.md fetch-and-render pattern
fetch('./data.json')
  .then(r => r.json())
  .then(data => {
    const container = document.getElementById('clips-list');
    if (!data.clips || data.clips.length === 0) {
      container.innerHTML = '<p>No clips available.</p>';
      return;
    }
    container.innerHTML = data.clips.map(clip => `
      <article class="clip-card">
        <h2 class="clip-title">
          <a href="${clip.url}" target="_blank" rel="noopener">${clip.title}</a>
        </h2>
        <p class="clip-meta">
          <span class="clip-publication">${clip.publication}</span>
          <span class="clip-sep">&mdash;</span>
          <span class="clip-date">${formatDate(clip.date)}</span>
        </p>
      </article>
    `).join('');
  })
  .catch(() => {
    document.getElementById('clips-list').innerHTML =
      '<p>Unable to load clips. Please try again.</p>';
  });

function formatDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}
```

### Full Awards Render Script

```javascript
// awards.html inline script
fetch('./data.json')
  .then(r => r.json())
  .then(data => {
    // Awards section
    const awardsContainer = document.getElementById('awards-list');
    awardsContainer.innerHTML = data.awards.map(a => {
      const href = a.url || a.pdf_fallback;
      const articleLine = a.article_title
        ? `<p class="award-piece">${
            href
              ? `<a href="${href}" target="_blank" rel="noopener">${a.article_title}</a>`
              : a.article_title
          }</p>`
        : '';
      return `
        <div class="award-entry">
          <h2 class="award-name">${a.name}</h2>
          <p class="award-org">${a.organization} &mdash; ${a.year}</p>
          ${articleLine}
        </div>
      `;
    }).join('');

    // Press coverage section
    const pressContainer = document.getElementById('press-list');
    pressContainer.innerHTML = data.press_coverage.map(item => `
      <div class="press-item">
        <p class="press-outlet">${item.outlet}</p>
        <h3 class="press-title">
          <a href="${item.url}" target="_blank" rel="noopener">${item.title}</a>
        </h3>
        <p class="press-desc">${item.description}</p>
      </div>
    `).join('');
  });
```

### clips.html Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clips — Grace Gormley</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..800;1,6..72,300..800&family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <script type="module" src="components.js"></script>
</head>
<body>
  <site-nav></site-nav>
  <main class="page-content">
    <h1>Clips</h1>
    <div id="clips-list">
      <p>Loading...</p>
    </div>
  </main>
  <site-footer></site-footer>
  <script>
    /* fetch-and-render script here */
  </script>
</body>
</html>
```

### awards.html Page Structure

```html
<main class="page-content">
  <h1>Awards &amp; Press</h1>
  <section class="awards-section">
    <h2 class="section-heading">Awards</h2>
    <div id="awards-list">
      <p>Loading...</p>
    </div>
  </section>
  <section class="press-section">
    <h2 class="section-heading">Press Coverage</h2>
    <div id="press-list">
      <p>Loading...</p>
    </div>
  </section>
</main>
```

### CSS Additions to style.css

```css
/* Clips and Awards pages — Phase 3 additions to style.css */

.page-content {
  max-width: var(--max-width-content);
  margin: var(--space-12) auto;
  padding: 0 var(--space-8);
}

/* Clips page */
.clips-list {
  margin-top: var(--space-8);
}

.clip-card {
  padding: var(--space-6) 0;
  border-bottom: 1px solid var(--color-border);
}

.clip-card:last-child {
  border-bottom: none;
}

.clip-title {
  font-size: var(--text-xl);
  margin-bottom: var(--space-2);
}

.clip-title a {
  text-decoration: none;
  color: var(--color-ink);
}

.clip-title a:hover {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.clip-meta {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
}

.clip-sep {
  margin: 0 var(--space-2);
}

/* Awards page */
.awards-section {
  margin-bottom: var(--space-16);
}

.section-heading {
  font-size: var(--text-xl);
  margin-top: var(--space-8);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-3);
  border-bottom: 2px solid var(--color-border);
}

.award-entry {
  padding: var(--space-6) 0;
  border-bottom: 1px solid var(--color-border);
}

.award-entry:last-child {
  border-bottom: none;
}

.award-name {
  font-size: var(--text-lg);
  margin-bottom: var(--space-1);
}

.award-org {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
  margin-bottom: var(--space-2);
}

.award-piece {
  font-size: var(--text-sm);
  font-family: var(--font-ui);
}

/* Press coverage */
.press-section {
  margin-top: var(--space-8);
}

.press-item {
  padding: var(--space-6) 0;
  border-bottom: 1px solid var(--color-border);
}

.press-item:last-child {
  border-bottom: none;
}

.press-outlet {
  font-family: var(--font-ui);
  font-size: var(--text-xs);
  color: var(--color-ink-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-1);
}

.press-title {
  font-size: var(--text-lg);
  margin-bottom: var(--space-2);
}

.press-title a {
  text-decoration: none;
  color: var(--color-ink);
}

.press-title a:hover {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.press-desc {
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
  line-height: var(--leading-body);
}
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|------------------|--------|
| Hardcoding article list in HTML | Fetch from data.json + JS render | Grace can add a new clip by editing one JSON file — no HTML knowledge needed (SITE-05) |
| Separate clips.js and awards.js files | Inline script in each page | For 2 pages with ~50 lines of JS each, inline is simpler; fewer HTTP requests |
| Server-side date formatting | `Date.toLocaleDateString()` | Native browser API; no library; produces locale-correct output |

**No deprecated approaches in scope.** The fetch-and-render pattern is the correct current approach for this stack.

---

## Open Questions

1. **Full clips list content (CLIP-01, CLIP-02)**
   - What we know: data.json has 3 clips; CLIP-01 requires 8–15; a PDF clips list exists at `"Clips List - Grace Gormley (Dec 2025) copy.pdf"` in the project root; `poppler-utils` is not installed so the PDF cannot be read programmatically
   - What's unclear: The exact article titles, publications, dates, and URLs for the additional clips — these are in the PDF but not extractable without the tool
   - Recommendation: The plan must include a task to manually populate data.json with the full clips list from the PDF before the render script is written. The planner should treat this as a content task (read PDF, add JSON entries) not a code task. If the PDF cannot be opened, Grace should be asked to provide the list.

2. **"Beyond the Game" article URL (AWARD-01)**
   - What we know: This award entry has `url: ""` but a pdf_fallback Google Drive link. The live article URL is missing.
   - What's unclear: Whether a live URL exists for this article (Viking Sports Magazine piece)
   - Recommendation: Use pdf_fallback for now. If a live URL is available, it can be added to data.json later with no code changes.

3. **Excellence Award / Casey Nichols Award — no article linked**
   - What we know: Two award entries have both `url` and `pdf_fallback` as empty strings, and one also has empty `article_title`
   - What's unclear: Whether these awards have an associated piece that could be linked
   - Recommendation: Render these entries without a link (award name + organization + year only). The render logic already handles this case.

---

## Validation Architecture

`nyquist_validation` is enabled in `.planning/config.json`.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — static HTML/CSS/JS site; no test runner |
| Config file | None |
| Quick run command | `python3 -m http.server 8080` then open `http://localhost:8080/clips.html` and `http://localhost:8080/awards.html` |
| Full suite command | Manual checklist below + click-test all external links |

All Phase 3 validation is manual and browser-based.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CLIP-01 | Clips page shows 8–15 articles with publication, date, and working link | manual | Open `http://localhost:8080/clips.html`; count entries; verify each shows publication + date; click first and last links | ✅ `clips.html` exists (stub) |
| CLIP-02 | Only curated strongest work appears (not every article ever written) | manual | Count entries; confirm none are clearly filler or low-quality; verify count is 8–15 not 50+ | ✅ `clips.html` exists (stub) |
| AWARD-01 | Awards list shows award name, organization, and link to piece | manual | Open `http://localhost:8080/awards.html`; verify awards section; click each linked award to confirm it opens correct article | ✅ `awards.html` exists (stub) |
| AWARD-02 | Press coverage section shows Verde, Paly Voice, Hearts of Gold with working links | manual | Scroll to Press Coverage section; verify all 3 outlets present; click all 3 links | ✅ `awards.html` exists (stub) |

### Link-Check Protocol (Phase Success Criterion 2)

Every clip URL and award URL must be click-tested before phase completion. For each external link:
1. Click in browser
2. Confirm page loads (not 404, not redirect to homepage)
3. Confirm it is the correct article (not a generic site homepage)

For Google Drive PDF links: confirm the file opens (not "permission denied" or "file not found").

### Sampling Rate

- **Per task commit:** Open the modified page locally; verify the targeted section renders correctly
- **Per wave merge:** Open both pages; scroll entire page; verify all sections render; no console errors
- **Phase gate:** Click-test every external link on both pages before marking Phase 3 complete

### Wave 0 Gaps

- [ ] `clips.html` — exists as stub; needs fetch-and-render script + CSS classes added in Phase 3
- [ ] `awards.html` — exists as stub; needs fetch-and-render script + two sections + CSS classes added in Phase 3
- [ ] style.css — needs `.page-content`, `.clips-list`, `.clip-card`, `.award-entry`, `.press-item` etc. (see CSS additions above)
- [ ] `data.json` `clips` array — needs 5–12 additional entries from the PDF clips list; currently has only 3

---

## Sources

### Primary (HIGH confidence)

- `.planning/research/ARCHITECTURE.md` (project research, 2026-03-19) — fetch-and-render pattern, data.json schema, fetch from same-origin confirmed working on GitHub Pages; all patterns for this phase derive from this document
- `.planning/research/STACK.md` (project research, 2026-03-19) — confirmed vanilla JS fetch, no jQuery, no framework, no build step; CDN libraries only where necessary (not needed for Phase 3)
- `data.json` (Phase 1 output, current file) — confirmed `clips`, `awards`, `press_coverage` array schemas; confirmed which awards have empty URL fields; confirmed all 3 press_coverage entries are fully populated
- `clips.html` and `awards.html` (Phase 2 output) — confirmed current stub structure; confirmed `<head>` boilerplate (fonts, style.css, components.js) is already present and correct
- `style.css` (Phase 1 + Phase 2 output) — confirmed all design tokens; confirmed Phase 3 CSS additions must go at the bottom of the same file; identified `.page-content` class does not yet exist and must be added
- MDN Web Docs: Date.toLocaleDateString() — native date formatting, confirmed UTC-offset pitfall with ISO date parsing
- MDN Web Docs: `rel="noopener"` — required on `target="_blank"` external links for security

### Secondary (MEDIUM confidence)

- `.planning/research/FEATURES.md` and `PITFALLS.md` (project research, 2026-03-19) — reviewed for any Phase 3-specific pitfalls noted during initial research; no additional Phase 3-specific entries found beyond what is already captured above

### Tertiary (LOW confidence)

None. All findings in this research are verified against project files (data.json, style.css, ARCHITECTURE.md) or the native browser API (Date, fetch). No WebSearch-only findings.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — identical to what Phases 1 and 2 used; no new dependencies
- Architecture patterns: HIGH — fetch-and-render is the project's established pattern; confirmed in ARCHITECTURE.md and already used in Phase 2 component design
- Content (clips list): MEDIUM — 3 clips confirmed in data.json; additional clips exist in PDF but could not be read; exact count unknown
- Awards URL handling: HIGH — all 11 entries verified directly in data.json; empty URL fields identified; fallback logic is straightforward conditional
- Pitfalls: HIGH — date UTC offset bug and empty href bug are well-known and verified; file:// CORS is the same pitfall from Phase 2 research

**Research date:** 2026-03-30
**Valid until:** 2026-06-30 (vanilla JS fetch, CSS, data.json schema are all stable; no fast-moving dependencies)
