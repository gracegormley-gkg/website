# Architecture Research

**Domain:** Static multi-page journalism portfolio — GitHub Pages, no build step
**Researched:** 2026-03-19
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser / Visitor                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────────┐   │
│  │ index.html│ │clips.html │ │photos.html│ │ ...4 more     │   │
│  │  (About)  │ │  (Clips)  │ │  Gallery  │ │   pages       │   │
│  └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └───────┬───────┘   │
│        │             │             │               │            │
│  ┌─────┴─────────────┴─────────────┴───────────────┴──────┐    │
│  │              Shared Components (Web Components)          │    │
│  │         <site-nav>          <site-footer>                │    │
│  └──────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                         JavaScript Layer                         │
│  ┌──────────────────┐  ┌────────────────────────────────────┐   │
│  │  components.js   │  │  page-init scripts (per page)      │   │
│  │  (nav + footer   │  │  fetch data.json → render DOM      │   │
│  │   web components)│  │  (clips, photos, awards, etc.)     │   │
│  └──────────────────┘  └────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                           Data Layer                             │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────────┐  │
│  │  data.json   │  │  images/      │  │  assets/             │  │
│  │  (all content│  │  (photos,     │  │  (resume PDF,        │  │
│  │   one file)  │  │   headshot)   │  │   clips PDF)         │  │
│  └──────────────┘  └───────────────┘  └──────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                      GitHub Pages (Host)                         │
│           Serves files as-is — no server-side logic              │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Implementation |
|-----------|----------------|----------------|
| `index.html` | About/landing page — headshot, bio, contact links | Static HTML; headshot from `images/` |
| `clips.html` | Journalism clips list — publication, date, link, note | JS reads `data.json` → renders article cards |
| `photos.html` | Photography gallery — thumbnail grid + lightbox | JS reads `data.json` photo array → CSS Grid + lightbox |
| `video.html` | Embedded video packages | JS reads `data.json` video array → renders iframes |
| `knight-lab.html` | EIS Archives project page — role, skills, live link | Mostly static HTML; project data from `data.json` |
| `suso-camp.html` | SUSO Camp overview — four pillars | Mostly static HTML; pillar data from `data.json` |
| `awards.html` | Awards list — name, year, link | JS reads `data.json` → renders awards list |
| `components.js` | Shared `<site-nav>` and `<site-footer>` web components | `customElements.define()` — one file, imported on every page |
| `style.css` | Global typography, layout, color system | Linked on every page via `<link>` in `<head>` |
| `data.json` | All editable content — clips, photos, awards, projects | Fetched at page load; Grace edits this file only |
| `images/` | Photo files optimized for web | Referenced by filenames in `data.json` |
| `assets/` | Resume PDF, clips PDF | Linked directly in footer or About page |

---

## Recommended Project Structure

```
grace-portfolio/              ← repository root (served by GitHub Pages)
├── index.html                ← About / landing
├── clips.html
├── photos.html
├── video.html
├── knight-lab.html
├── suso-camp.html
├── awards.html
│
├── style.css                 ← single global stylesheet
├── components.js             ← <site-nav> and <site-footer> web components
│
├── data.json                 ← ALL editable content lives here
│
├── images/                   ← web-optimized photos (renamed, lowercase)
│   ├── headshot.jpg
│   ├── photo-01.jpg
│   ├── photo-02.jpg
│   └── ... (13 photos total)
│
└── assets/                   ← downloadable files
    ├── resume.pdf
    └── clips-list.pdf
```

### Structure Rationale

- **Root-level HTML pages:** GitHub Pages serves `index.html` from the root automatically. All pages at root level means clean URLs (`/clips.html`, `/photos.html`) with no subdirectory routing complexity.
- **Single `style.css`:** One stylesheet linked via `<link rel="stylesheet">` in every page's `<head>`. No bundling needed.
- **`components.js` at root:** Imported with `<script type="module" src="components.js"></script>` in every page's `<head>`. Defines `<site-nav>` and `<site-footer>` — Grace writes nav markup once, forever.
- **`data.json` at root:** Fetched with `fetch('./data.json')` from each page's inline script. Grace's entire content-editing surface is this one file.
- **`images/` subfolder:** Keeps root uncluttered. Referenced as `images/photo-01.jpg` in `data.json`. Images must be web-optimized (JPEGs resized to ≤1920px wide) before placing here — the raw files in the project root are 4–6 MB each, too large for web.
- **`assets/` subfolder:** PDFs linked from About page and footer. Separate from images for clarity.

---

## Data File Format

### `data.json` — Full Schema

Grace edits only this file to update content. All arrays can have items added, removed, or reordered.

```json
{
  "clips": [
    {
      "title": "Article headline here",
      "publication": "The Daily Northwestern",
      "date": "2025-11-01",
      "url": "https://dailynorthwestern.com/...",
      "note": "Optional one-sentence context about this piece."
    }
  ],
  "photos": [
    {
      "file": "images/photo-01.jpg",
      "caption": "Description of what the photo shows",
      "credit": "Grace Gormley"
    }
  ],
  "videos": [
    {
      "title": "What Can We Do?",
      "embedUrl": "https://www.youtube.com/embed/VIDEO_ID",
      "description": "Brief description of the video package."
    }
  ],
  "awards": [
    {
      "name": "Award name",
      "organization": "Awarding body",
      "year": "2025",
      "url": "https://link-to-relevant-work-or-announcement.com"
    }
  ],
  "knightLab": {
    "projectName": "EIS Archives",
    "subtitle": "World's Largest Exploratory EIS Database",
    "liveUrl": "https://nulib-ds.github.io/EIS-Final/",
    "role": "AI Team — Metadata Pipeline",
    "description": "Paragraph describing Grace's contribution...",
    "skills": ["BERTopic", "OCR", "LLMs", "Python", "Supercompute cluster"]
  },
  "susoCamp": {
    "overview": "Paragraph overview of SUSO Camp...",
    "pillars": [
      { "name": "Pillar 1", "description": "..." },
      { "name": "Pillar 2", "description": "..." },
      { "name": "Pillar 3", "description": "..." },
      { "name": "Pillar 4", "description": "..." }
    ]
  }
}
```

**Why JSON over YAML:** GitHub Pages serves files statically. JavaScript's `fetch()` + `response.json()` parses JSON natively — no parser library needed. YAML requires a parser dependency. JSON wins for zero-dependency static sites. Confidence: HIGH.

---

## Architectural Patterns

### Pattern 1: Web Components for Shared Nav/Footer

**What:** Define `<site-nav>` and `<site-footer>` as custom HTML elements using the native `customElements` API. Every page imports `components.js` and drops `<site-nav></site-nav>` in the markup — one edit to `components.js` updates nav across all 7 pages.

**When to use:** Any multi-page static site that needs consistent shell (header, nav, footer) without a build step or server-side includes.

**Trade-offs:** Works in all modern browsers (Chrome, Firefox, Safari, Edge). Zero dependencies. No Shadow DOM is needed for this use case — keep it simple with direct innerHTML injection in `connectedCallback` so the nav inherits global CSS from `style.css`.

**Example:**
```javascript
// components.js
class SiteNav extends HTMLElement {
  connectedCallback() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    this.innerHTML = `
      <nav class="site-nav">
        <a href="index.html" ${current === 'index.html' ? 'class="active"' : ''}>About</a>
        <a href="clips.html" ${current === 'clips.html' ? 'class="active"' : ''}>Clips</a>
        <a href="photos.html" ${current === 'photos.html' ? 'class="active"' : ''}>Photography</a>
        <a href="video.html" ${current === 'video.html' ? 'class="active"' : ''}>Video</a>
        <a href="knight-lab.html" ${current === 'knight-lab.html' ? 'class="active"' : ''}>Knight Lab</a>
        <a href="suso-camp.html" ${current === 'suso-camp.html' ? 'class="active"' : ''}>SUSO Camp</a>
        <a href="awards.html" ${current === 'awards.html' ? 'class="active"' : ''}>Awards</a>
      </nav>`;
  }
}
customElements.define('site-nav', SiteNav);

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <p>Grace Gormley &mdash; <a href="mailto:grace@example.com">grace@example.com</a>
        &mdash; <a href="https://linkedin.com/in/gracegormley" target="_blank">LinkedIn</a></p>
      </footer>`;
  }
}
customElements.define('site-footer', SiteFooter);
```

**Usage in every HTML page:**
```html
<head>
  <link rel="stylesheet" href="style.css">
  <script type="module" src="components.js"></script>
</head>
<body>
  <site-nav></site-nav>
  <main>...</main>
  <site-footer></site-footer>
</body>
```

Note: `type="module"` on the script tag is required — it defers execution and scopes variables, and it allows the custom elements to be registered before the DOM elements are rendered.

---

### Pattern 2: Fetch-and-Render for Content Pages

**What:** Each content page (clips, photos, awards, video) has a small inline script or a linked `page.js` that fetches `data.json` and renders the relevant section into a DOM container.

**When to use:** Any content that Grace will update regularly — clips, photos, awards. Pages that are mostly static (About, Knight Lab summary) can use direct HTML.

**Trade-offs:** The `fetch()` call requires a server origin — this works perfectly on GitHub Pages and in local development with a simple server (`python3 -m http.server` or VS Code Live Server). It does NOT work when opening HTML files directly as `file://` in a browser. This is expected and acceptable — Grace already uses GitHub, so a local server is a one-command setup.

**Example (clips.html inline script):**
```javascript
// At bottom of clips.html, or in clips.js
fetch('./data.json')
  .then(r => r.json())
  .then(data => {
    const container = document.getElementById('clips-list');
    container.innerHTML = data.clips.map(clip => `
      <article class="clip-card">
        <h2><a href="${clip.url}" target="_blank">${clip.title}</a></h2>
        <p class="clip-meta">${clip.publication} &mdash; ${clip.date}</p>
        ${clip.note ? `<p class="clip-note">${clip.note}</p>` : ''}
      </article>
    `).join('');
  });
```

---

### Pattern 3: CSS Grid Photography Gallery with Lightbox

**What:** The `photos.html` page renders a CSS Grid thumbnail grid from the `data.json` photos array. Clicking a thumbnail opens a fullscreen lightbox overlay, implemented in vanilla JavaScript (no library required for a simple version, or use GLightbox if swipe/keyboard nav is needed).

**When to use:** Always for this site — the 13 photos available are the perfect size for a grid gallery.

**Trade-offs:** A custom vanilla lightbox is ~30 lines of JS and sufficient. GLightbox (pure JS, no jQuery, CDN-available) adds swipe gestures and keyboard navigation with one script tag — worth it for a photography showcase. Confidence: HIGH (GLightbox is actively maintained as of 2025, MIT license, CDN-available).

**Gallery markup pattern:**
```html
<!-- photos.html -->
<div id="photo-grid" class="photo-grid"></div>
<div id="lightbox" class="lightbox hidden">
  <button id="lb-close">&times;</button>
  <img id="lb-img" src="" alt="">
  <p id="lb-caption"></p>
</div>
```

**CSS Grid layout:**
```css
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
.photo-grid img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  cursor: pointer;
}
```

---

## Data Flow

### Page Load Flow (Content Pages)

```
Browser requests clips.html
    ↓
GitHub Pages serves static HTML file
    ↓
Browser parses HTML → loads style.css + components.js
    ↓
<site-nav> and <site-footer> render (web components)
    ↓
Inline script runs: fetch('./data.json')
    ↓
data.json served by GitHub Pages (same origin, no CORS issue)
    ↓
JavaScript maps data array → HTML string → innerHTML into container div
    ↓
Page fully rendered
```

### Content Update Flow (Grace Editing)

```
Grace opens data.json in any text editor
    ↓
Edits clip, photo caption, award, etc.
    ↓
git add data.json && git commit && git push
    ↓
GitHub Pages serves updated data.json automatically (no build step)
    ↓
Next visitor sees updated content
```

### Image Update Flow

```
Grace copies new photo into images/ folder
    ↓
Grace adds entry to data.json photos array with filename
    ↓
git add images/new-photo.jpg data.json && git commit && git push
    ↓
Photo appears in gallery on next page load
```

---

## Build Order Implications

The following sequence must be respected during development:

| Step | What | Why It Must Come First |
|------|------|------------------------|
| 1 | Define `data.json` schema and populate initial content | All page scripts depend on this shape; wrong schema means broken renders |
| 2 | Optimize and rename images into `images/` folder | `data.json` photo entries reference filenames; files must exist before data |
| 3 | Build `style.css` (typography, layout, color system) | Every page inherits this; page HTML is written against these classes |
| 4 | Build `components.js` (nav + footer) | Must exist before any page HTML is written, as pages reference `<site-nav>` |
| 5 | Build `index.html` (About) | Simplest page, static content, validates that CSS + components work |
| 6 | Build content pages (clips, photos, awards, video) | Depend on `data.json` being correct and CSS being stable |
| 7 | Build project pages (knight-lab, suso-camp) | Mostly static HTML; can be written in any order after step 5 |
| 8 | Configure GitHub Pages in repo settings | Must have `index.html` at root first |
| 9 | Image optimization pass | Before final deploy — raw JPEGs are 4–6 MB each, must be resized |

---

## GitHub Pages Deployment

**Setup (one-time):**
1. Push all files to the `main` branch of a public GitHub repository
2. Go to repository Settings → Pages
3. Source: "Deploy from a branch" → Branch: `main` → Folder: `/ (root)`
4. Site publishes at `https://[username].github.io/[repo-name]/` within ~10 minutes

**Update cycle (ongoing):**
```bash
# After editing data.json or any file:
git add -A
git commit -m "update clips"
git push
# GitHub Pages redeploys automatically — typically live in under 60 seconds
```

**Custom domain (optional, not in scope for v1):** GitHub Pages supports CNAME records for custom domains — could move from `gracegormley.github.io/portfolio` to `gracegormley.com` later with no architecture changes.

**CORS behavior on GitHub Pages:** GitHub Pages sets `Access-Control-Allow-Origin: *` on all served files, so `fetch('./data.json')` from the same GitHub Pages origin works with no CORS issues. Confidence: HIGH (confirmed in GitHub community discussions, 2024–2025).

---

## Anti-Patterns

### Anti-Pattern 1: Duplicating Nav/Footer HTML in Every Page File

**What people do:** Copy-paste the `<nav>` block into all 7 HTML files.
**Why it's wrong:** Changing one nav link means editing 7 files. One missed file means an inconsistent nav that looks broken to visitors and editors reviewing the site.
**Do this instead:** Use the `<site-nav>` web component pattern. Edit `components.js` once — all pages update.

---

### Anti-Pattern 2: Hardcoding Content Directly in HTML

**What people do:** Write clips, awards, and photo captions directly in the page HTML.
**Why it's wrong:** Grace must touch HTML files to update content — high risk of accidentally breaking layout or introducing syntax errors. Defeats the stated requirement of "edit a simple text file."
**Do this instead:** All variable content in `data.json`, rendered by JavaScript. HTML pages contain only structural elements.

---

### Anti-Pattern 3: Leaving Raw Photo Files in the Repo

**What people do:** Commit the original camera JPEGs (4–6 MB each) directly.
**Why it's wrong:** 13 photos × 5 MB average = ~65 MB of images. Page load for the photography gallery becomes unacceptably slow (~10+ seconds on mobile). GitHub Pages does not provide image CDN or lazy loading automatically.
**Do this instead:** Before placing in `images/`, resize all photos to ≤1920px on the longest side and compress to ≤300 KB each using a tool like Squoosh, ImageOptim, or `ffmpeg`. Keep originals on local machine, only push web-optimized copies.

---

### Anti-Pattern 4: Opening HTML Files with `file://` for Local Testing

**What people do:** Double-click `index.html` to open it in a browser during development.
**Why it's wrong:** `fetch('./data.json')` fails silently or throws a CORS error under the `file://` protocol. Content pages appear blank, which is confusing to debug.
**Do this instead:** Run a local server in one terminal:
```bash
cd "/Users/gracegormley/Desktop/Grace's Website"
python3 -m http.server 8080
# Then open: http://localhost:8080
```
VS Code's Live Server extension is an equivalent one-click option.

---

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| GitHub Pages | Static file host — push to `main`, auto-deploys | Free for public repos; ~10 min first deploy, ~60s updates |
| YouTube / Vimeo | `<iframe>` embed via URL in `data.json` videos array | Grace needs to supply embed URLs for "What Can We Do?" and "Move Your Feet" |
| EIS Archives (nulib-ds.github.io) | External link only — `<a href target="_blank">` | No iframe needed; a link + description is correct treatment |
| LinkedIn / Email | Hard-coded in `<site-footer>` component | Not in `data.json` — these don't change often enough to justify data-driving |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `data.json` ↔ page scripts | `fetch()` → `response.json()` | Shape of JSON is the contract; changing keys breaks renders |
| `components.js` ↔ HTML pages | Custom element tag names (`site-nav`, `site-footer`) | Tag names are the interface; renaming breaks all 7 pages |
| `style.css` ↔ JS-rendered HTML | CSS class names applied in template literals | Class names are a shared contract between CSS and JS render functions |
| `images/` ↔ `data.json` | Filename strings in `photos[].file` field | Files must exist before data references them; add image then update JSON |

---

## Sources

- [MDN Web Docs: Web Components / customElements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) — HIGH confidence, authoritative
- [freeCodeCamp: Reusable HTML Components — Reusing a Header and Footer](https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/) — MEDIUM confidence, community-verified pattern
- [GitHub Docs: Configuring a publishing source for GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) — HIGH confidence, official
- [GitHub Community: GitHub Pages CORS headers](https://github.com/orgs/community/discussions/22399) — MEDIUM confidence, community-confirmed
- [GLightbox: Pure JavaScript lightbox with mobile support](https://github.com/biati-digital/glightbox) — MEDIUM confidence, actively maintained library
- [CSS Script: Responsive Photo Gallery and Lightbox with CSS Grid and vanilla JS](https://github.com/jrrio/gallery-with-lightbox) — MEDIUM confidence, reference implementation
- [Go Make Things: How to use the Fetch API with vanilla JS](https://gomakethings.com/how-to-use-the-fetch-api-with-vanilla-js/) — MEDIUM confidence

---
*Architecture research for: Static multi-page journalism portfolio — Grace Gormley*
*Researched: 2026-03-19*
