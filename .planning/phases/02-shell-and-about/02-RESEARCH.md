# Phase 2: Shell and About — Research

**Researched:** 2026-03-20
**Domain:** Static HTML page architecture, Web Components (custom elements), GitHub Pages deployment, About page content and resume PDF delivery
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SITE-01 | User can navigate between all 7 pages via a consistent navigation bar | Web Components (`<site-nav>`) pattern in ARCHITECTURE.md; active-state detection via `window.location.pathname`; all 7 page filenames established in architecture research |
| SITE-02 | User sees email and LinkedIn contact links in a footer on every page | Web Components (`<site-footer>`) pattern; contact data already in `data.json` under `about.email` and `about.linkedin` |
| SITE-04 | Site deploys and is publicly accessible via GitHub Pages | GitHub Pages one-time setup (Settings → Pages → branch: main → folder: /); `index.html` at root serves the About page automatically |
| ABOUT-01 | User can view Grace's headshot, name, and bio on the About page | `data.json` `about` object has `name`, `bio`, `headshot` (images/headshot.jpg), `headshot_credit`; headshot already optimized in images/ by Phase 1 |
| ABOUT-02 | User can download Grace's resume PDF from the About page | `data.json` `about.resume_pdf` = `"assets/resume.pdf"`; `assets/` directory must be created and resume PDF copied there; `<a href="assets/resume.pdf" download>` pattern |
| ABOUT-03 | About page includes a tagline that captures the journalism + data science angle | `data.json` `about.tagline` = "Journalism and data science student at Northwestern University Medill" — present but generic; see Open Questions; tagline copy should be strengthened during this phase |
</phase_requirements>

---

## Summary

Phase 2 delivers three tightly coupled outputs: a shared navigation/footer shell that all 7 pages will use, the About page (`index.html`) as the first live page, and a working GitHub Pages deployment. Phase 1 delivered `style.css`, `data.json`, and 14 optimized images — Phase 2 is when those artifacts first become a visible website.

The shell (nav + footer) should be built as native Web Components using `customElements.define()` in a single `components.js` file. This is the established pattern documented in ARCHITECTURE.md and STACK.md: write the nav markup once, import `components.js` on every page, never touch nav HTML again. The active-state highlight is handled in `connectedCallback` by comparing `window.location.pathname` against each link's filename.

The About page (`index.html`) is mostly static HTML. The content is already in `data.json` under the `about` object — but the About page is simple enough that it is reasonable to either render from JSON via fetch or to write it as static HTML with values copied in. Static HTML is preferred for `index.html` because: it renders instantly with no async wait, it is the most SEO-friendly, and the About page content rarely changes (no need for the data-driven update workflow). The one exception is the footer, which is driven by the `<site-footer>` web component and thus auto-inherits any future contact info changes.

GitHub Pages deployment is a one-time configuration in GitHub repository settings. With `index.html` at the repository root, GitHub Pages will serve it at `https://[username].github.io/[repo-name]/` with no further configuration. The resume PDF requires creating an `assets/` directory in the repository root and copying the PDF there before linking.

**Primary recommendation:** Build `components.js` (nav + footer web components) first, then `index.html` (About page, static HTML), then create `assets/resume.pdf`, then configure GitHub Pages. These are four discrete tasks.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| HTML5 (native) | Native | Page structure for `index.html` and 6 stub pages | Zero dependency; GitHub Pages serves plain `.html` with no configuration |
| CSS3 Custom Properties (native) | Native | Layout and styling for nav, footer, About page content | `style.css` from Phase 1 provides all design tokens; Phase 2 adds nav/footer/about layout classes to the same file |
| Vanilla JS Web Components | Native (`customElements` API) | `<site-nav>` and `<site-footer>` shared shell components | No Shadow DOM needed; `connectedCallback` + `innerHTML` inherits global `style.css`; works in all modern browsers (Chrome 67+, Firefox 63+, Safari 10.1+); confirmed in MDN Web Components docs |
| GitHub Pages | Free static hosting | Public deployment of the site | One-time settings configuration; serves root `index.html` as site home; auto-deploys on push to main; confirmed in GitHub Pages official docs |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `python3 -m http.server` | Built-in | Local development server so `fetch()` works during testing | Use during development; not needed after deployment |

### What NOT to Use

| Avoid | Reason |
|-------|--------|
| Shadow DOM for web components | Shadow DOM scopes CSS — nav would not inherit `style.css` tokens. Use light DOM (`this.innerHTML =`) so nav styles come from the global stylesheet |
| jQuery | ~90 KB for functionality that `querySelector`, `classList`, and `fetch` handle natively |
| Any JS framework (React, Vue) | Requires build step; defeats the no-build GitHub Pages constraint |
| Server-side includes (SSI) | GitHub Pages does not support SSI; web components are the correct static equivalent |

**Installation:**
```bash
# No npm install. No package.json.
# Files to create: components.js, index.html, assets/resume.pdf
# All other dependencies already exist from Phase 1
```

---

## Architecture Patterns

### Recommended File Structure After Phase 2

```
grace-portfolio/              <- repository root
├── index.html                <- PHASE 2: About page (static HTML)
├── clips.html                <- PHASE 2: stub (empty shell for nav testing)
├── photos.html               <- PHASE 2: stub
├── video.html                <- PHASE 2: stub
├── knight-lab.html           <- PHASE 2: stub
├── suso-camp.html            <- PHASE 2: stub
├── awards.html               <- PHASE 2: stub
├── components.js             <- PHASE 2: <site-nav> and <site-footer>
├── style.css                 <- Phase 1 (tokens + base) + PHASE 2 additions (nav, footer, about layout)
├── data.json                 <- Phase 1 (complete schema, real content)
├── images/                   <- Phase 1 (14 optimized JPEGs including headshot.jpg)
└── assets/                   <- PHASE 2: created here
    └── resume.pdf            <- PHASE 2: copied from "Resume - Grace Gormley (Jan 2026) copy.pdf"
```

The 6 stub pages are minimal — they only need `<site-nav>`, `<site-footer>`, a `<title>` tag, and a placeholder `<h1>` so every nav link resolves to a real page and the active-state logic works. Full content is added in Phases 3–6.

### Pattern 1: Web Components for Nav and Footer

**What:** Define `SiteNav` and `SiteFooter` as custom HTML elements in `components.js`. Each implements `connectedCallback()` to inject HTML. The nav reads `window.location.pathname` to set the `.active` class on the current page's link.

**When to use:** This pattern is mandatory for this project — it is the only way to have consistent nav on 7 pages without a build step.

**Confirmed source:** MDN Web Docs — https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements

```javascript
// components.js — Source: MDN Web Components API
class SiteNav extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const links = [
      { href: 'index.html',      label: 'About' },
      { href: 'clips.html',      label: 'Clips' },
      { href: 'photos.html',     label: 'Photography' },
      { href: 'video.html',      label: 'Video' },
      { href: 'knight-lab.html', label: 'Knight Lab' },
      { href: 'suso-camp.html',  label: 'SUSO Camp' },
      { href: 'awards.html',     label: 'Awards' },
    ];
    this.innerHTML = `
      <nav class="site-nav">
        <div class="site-nav__brand"><a href="index.html">Grace Gormley</a></div>
        <ul class="site-nav__links">
          ${links.map(l => `
            <li><a href="${l.href}"${path === l.href ? ' class="active"' : ''}>${l.label}</a></li>
          `).join('')}
        </ul>
      </nav>`;
  }
}
customElements.define('site-nav', SiteNav);

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <p>
          <a href="mailto:gracegormley@gmail.com">gracegormley@gmail.com</a>
          &nbsp;&mdash;&nbsp;
          <a href="https://www.linkedin.com/in/grace-gormley/" target="_blank" rel="noopener">LinkedIn</a>
        </p>
      </footer>`;
  }
}
customElements.define('site-footer', SiteFooter);
```

**Usage on every page:**
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About — Grace Gormley</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..800;1,6..72,300..800&family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <script type="module" src="components.js"></script>
</head>
<body>
  <site-nav></site-nav>
  <main class="page-content">
    <!-- page-specific content -->
  </main>
  <site-footer></site-footer>
</body>
```

Note: `type="module"` on the `<script>` tag is required. It defers execution until the DOM is parsed (so custom elements are defined before the browser processes `<site-nav>`) and scopes variable declarations.

### Pattern 2: Static About Page (index.html)

**What:** `index.html` is written as static HTML using the content from `data.json`'s `about` object. Values are not fetched at runtime — they are embedded directly in the HTML. This is correct for About page content because: it renders with zero async delay, it works if JavaScript is disabled, and the content changes rarely.

**When to use:** Any page where content is stable and does not need Grace's `data.json` editing workflow. The About page bio and headshot qualify; the footer's contact links are handled by the `<site-footer>` component.

**Layout structure for About page:**

```html
<main class="about-page">
  <section class="about-hero">
    <img class="about-headshot" src="images/headshot.jpg" alt="Grace Gormley, photojournalist and data science student" width="320" height="240">
    <div class="about-hero__text">
      <h1>Grace Gormley</h1>
      <p class="about-tagline">[tagline — see Open Questions]</p>
    </div>
  </section>
  <section class="about-bio">
    <p>[bio text from data.json about.bio]</p>
  </section>
  <section class="about-actions">
    <a href="assets/resume.pdf" download class="btn-download">Download Resume</a>
  </section>
</main>
```

### Pattern 3: Resume PDF Download

**What:** Place the resume PDF at `assets/resume.pdf`. Link to it with `<a href="assets/resume.pdf" download>`. The `download` attribute triggers a browser download rather than in-tab display on all modern browsers.

**Source of truth:** `data.json` already has `about.resume_pdf = "assets/resume.pdf"`. The file to copy is `"Resume - Grace Gormley (Jan 2026) copy.pdf"` in the project root.

**Confirmed source:** MDN — https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#download

```html
<a href="assets/resume.pdf" download="Grace-Gormley-Resume.pdf">Download Resume</a>
```

The `download` attribute value sets the suggested filename. Without a value, browsers use the URL filename. Including an explicit clean filename is good practice for a portfolio.

**Important:** The `download` attribute works on same-origin links. Since GitHub Pages serves the entire site from the same origin, this works without restriction. For cross-origin links (e.g., Google Drive) the `download` attribute is ignored by browsers — but since the PDF is in the repository itself, same-origin applies.

### Pattern 4: CSS Additions to style.css for Nav and Footer

**What:** Phase 1 `style.css` established tokens and base type/reset rules. Phase 2 adds layout-specific rules for `.site-nav`, `.site-footer`, and `.about-*` classes. These are added to the bottom of the same `style.css` — no separate file.

**Nav layout approach:** Flexbox with space-between for brand + links. Active link styled with `--color-accent` underline or border-bottom. Keep it restrained — no background color change on active state, just a stronger underline or color shift.

```css
/* Nav — added to style.css in Phase 2 */
.site-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-8);
  border-bottom: 1px solid var(--color-border);
  max-width: var(--max-width-wide);
  margin: 0 auto;
}

.site-nav__brand a {
  font-family: var(--font-editorial);
  font-size: var(--text-lg);
  font-weight: 600;
  text-decoration: none;
  color: var(--color-ink);
}

.site-nav__links {
  list-style: none;
  display: flex;
  gap: var(--space-6);
}

.site-nav__links a {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  text-decoration: none;
  color: var(--color-ink-muted);
  transition: color var(--transition-fast);
}

.site-nav__links a:hover,
.site-nav__links a.active {
  color: var(--color-accent);
}

.site-nav__links a.active {
  font-weight: 600;
}

/* Footer */
.site-footer {
  border-top: 1px solid var(--color-border);
  padding: var(--space-8);
  text-align: center;
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
  margin-top: var(--space-24);
}
```

### Anti-Patterns to Avoid

- **Using Shadow DOM for the web components:** Shadow DOM isolates CSS. The nav would not inherit `--color-accent`, `--font-ui`, or any other token from `style.css`. Use `this.innerHTML = ...` (light DOM) so the component's HTML is part of the main document tree and inherits global styles.
- **Hardcoding nav HTML in each page file:** If any nav link changes, all 7 files need editing. This creates drift risk. The web component centralizes this in `components.js`.
- **Making the About page fetch data.json:** The `fetch()` call introduces a render delay and a potential failure mode. About page content is stable and belongs directly in HTML.
- **Skipping the 6 stub pages:** Without stub pages, 6 nav links return 404s. The active-state highlight also cannot be tested without real files to navigate to.
- **Not adding `rel="noopener"` to LinkedIn link:** External links with `target="_blank"` should have `rel="noopener"` to prevent the opened tab from accessing the opener via `window.opener`. This is a security and performance best practice.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Shared nav/footer across 7 pages | Server-side includes, PHP, or copied HTML | Native Web Components (`customElements.define`) | Zero dependency; works on GitHub Pages static hosting; one-edit-updates-all-pages |
| Active nav state detection | Hard-coded per-page HTML variants | `window.location.pathname` comparison in `connectedCallback` | Single JS logic handles all 7 pages; no per-page maintenance |
| Resume download | A backend download endpoint | `<a href="assets/resume.pdf" download>` | HTML `download` attribute is purpose-built for this; works on same-origin assets with no server logic |
| PDF serving | PDF viewer embed or third-party service | Direct file in `assets/` linked with `<a>` | Simplest possible solution; file is in the repository; no external service dependency |

**Key insight:** The entire shell and deployment problem is solved with native browser APIs. Any dependency added here becomes maintenance overhead on a site Grace may need to update solo.

---

## Common Pitfalls

### Pitfall 1: Active State Misfire on GitHub Pages Subdirectory Paths

**What goes wrong:** `window.location.pathname` returns `/repo-name/index.html` on GitHub Pages (because the site is at `username.github.io/repo-name/`). Stripping with `.split('/').pop()` gives `index.html`. But if a user visits the root URL `https://username.github.io/repo-name/` with no filename, `.pop()` returns an empty string.

**Why it happens:** GitHub Pages serves `index.html` when visiting the directory path, but the browser URL stays as the directory path — the pathname ends with `/` not `/index.html`.

**How to avoid:** Handle the empty-string case in `connectedCallback`:
```javascript
const path = window.location.pathname.split('/').pop() || 'index.html';
```
This is the established fix — already shown in ARCHITECTURE.md.

**Warning signs:** The About nav link is not highlighted when visiting the homepage URL.

### Pitfall 2: `fetch()` Fails When Opening Files Directly

**What goes wrong:** During development, double-clicking `index.html` to open it in a browser causes `fetch('./data.json')` to fail with a CORS error under the `file://` protocol.

**Why it happens:** Browsers apply CORS restrictions to `file://` origins. `file://` is not the same origin as any other `file://` URL.

**How to avoid:** Always use a local server for development. The About page itself is static and does not call `fetch()`, but stub pages that do need data will break. Run `python3 -m http.server 8080` in the project root, then open `http://localhost:8080`.

**Warning signs:** Blank content areas on pages that use fetch; console error mentioning CORS or `file://`.

### Pitfall 3: components.js Loaded Without `type="module"`

**What goes wrong:** If the `<script>` tag is `<script src="components.js"></script>` (without `type="module"`), the script runs before the browser has processed the `<site-nav>` element in the body. The custom element's `connectedCallback` may not fire on initial parse.

**Why it happens:** Non-module scripts block and execute at their position in the document. Without `defer` or `type="module"`, a `<script>` in `<head>` runs before `<body>` is parsed.

**How to avoid:** Always use `<script type="module" src="components.js"></script>`. Module scripts are deferred automatically and run after the document is parsed.

**Warning signs:** Nav or footer element renders as an empty tag in the browser. Checking DevTools shows the custom element is defined but its `innerHTML` is empty.

### Pitfall 4: Missing `assets/` Directory — Resume PDF 404

**What goes wrong:** `data.json` references `"resume_pdf": "assets/resume.pdf"` but the `assets/` directory doesn't exist in the repository. The download link returns 404.

**Why it happens:** Phase 1 created `images/` but `assets/` was deferred to Phase 2. It's easy to forget to create the directory and copy the PDF.

**How to avoid:** Phase 2 must include a task that explicitly: creates `assets/`, copies the resume PDF to `assets/resume.pdf`, commits both to the repository, and verifies the download link works after GitHub Pages deploys.

**Warning signs:** The "Download Resume" link returns a 404 after deployment.

### Pitfall 5: Tagline is Generic — ABOUT-03 Failure

**What goes wrong:** `data.json` `about.tagline` currently reads: "Journalism and data science student at Northwestern University Medill." This describes a category of person, not Grace specifically. It will not satisfy ABOUT-03's requirement that "the tagline communicates the journalism + data science angle."

**Why it happens:** The tagline was populated with an accurate-but-generic value during Phase 1 data schema work. Making it compelling is a copywriting task, not a schema task.

**How to avoid:** The Phase 2 About page task should include writing a sharper tagline. Something like: "Journalist who builds the tools to tell the story — Medill + Data Science at Northwestern" or "Reporting with data, writing with purpose — Medill School of Journalism, Northwestern." The tagline must name the dual angle (journalism + data science) and signal what makes Grace's work distinctive. See Open Questions.

**Warning signs:** The tagline on the live page sounds like a LinkedIn headline from a university registration form.

### Pitfall 6: No `<meta name="viewport">` on Stub Pages

**What goes wrong:** If stub pages are created quickly without a `<meta name="viewport">` tag, they will render at desktop scale on mobile devices. Mobile responsiveness (Phase 6) starts from a broken baseline.

**Why it happens:** Stub pages are minimal by design, and this meta tag is easy to omit.

**How to avoid:** Every HTML page — including stubs — must include the viewport meta tag:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## Code Examples

Verified patterns from established sources in this project's research:

### Full components.js

```javascript
// components.js
// Source: MDN Web Components — https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
// Pattern confirmed in .planning/research/ARCHITECTURE.md

class SiteNav extends HTMLElement {
  connectedCallback() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    const links = [
      { href: 'index.html',      label: 'About' },
      { href: 'clips.html',      label: 'Clips' },
      { href: 'photos.html',     label: 'Photography' },
      { href: 'video.html',      label: 'Video' },
      { href: 'knight-lab.html', label: 'Knight Lab' },
      { href: 'suso-camp.html',  label: 'SUSO Camp' },
      { href: 'awards.html',     label: 'Awards' },
    ];
    this.innerHTML = `
      <nav class="site-nav">
        <div class="site-nav__brand">
          <a href="index.html">Grace Gormley</a>
        </div>
        <ul class="site-nav__links">
          ${links.map(l => `
            <li><a href="${l.href}"${path === l.href ? ' class="active"' : ''}>${l.label}</a></li>
          `).join('')}
        </ul>
      </nav>`;
  }
}
customElements.define('site-nav', SiteNav);

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer class="site-footer">
        <p>
          <a href="mailto:gracegormley@gmail.com">gracegormley@gmail.com</a>
          &nbsp;&mdash;&nbsp;
          <a href="https://www.linkedin.com/in/grace-gormley/" target="_blank" rel="noopener">LinkedIn</a>
        </p>
      </footer>`;
  }
}
customElements.define('site-footer', SiteFooter);
```

### Minimal Stub Page Template

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
    <p>Content coming soon.</p>
  </main>
  <site-footer></site-footer>
</body>
</html>
```

### Resume Download Link

```html
<!-- Source: MDN <a> element — https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#download -->
<a href="assets/resume.pdf" download="Grace-Gormley-Resume.pdf" class="btn-download">
  Download Resume
</a>
```

### GitHub Pages Setup (one-time)

```
Repository Settings → Pages → Source: Deploy from a branch
Branch: main  |  Folder: / (root)  →  Save

Site publishes at: https://[username].github.io/[repo-name]/
First deploy: ~10 minutes
Subsequent pushes: ~60 seconds to go live
```

### Local Development Server

```bash
# Run from project root — makes fetch('./data.json') work locally
cd "/Users/gracegormley/Desktop/Grace's Website"
python3 -m http.server 8080
# Open: http://localhost:8080
```

---

## Content Reference for About Page

All content for `index.html` is available in `data.json` `about` object:

| Field | Value |
|-------|-------|
| `name` | Grace Gormley |
| `tagline` | "Journalism and data science student at Northwestern University Medill" (needs strengthening — see Open Questions) |
| `bio` | "I am a journalism and data science double major in my sophomore year at Northwestern University, in the Medill School of Journalism. I strive to combine my data science skills with people-centric reporting to hold those in power accountable and tell important stories. I get excited about investigative and watchdog journalism driven by data." |
| `headshot` | images/headshot.jpg (optimized in Phase 1, credit: Anna Hoch-Kenney) |
| `email` | gracegormley@gmail.com |
| `linkedin` | https://www.linkedin.com/in/grace-gormley/ |
| `resume_pdf` | assets/resume.pdf (file to be created in Phase 2) |

The resume source file is `"Resume - Grace Gormley (Jan 2026) copy.pdf"` in the project root. It should be copied to `assets/resume.pdf`.

---

## State of the Art

| Old Approach | Current Approach | Impact for This Phase |
|--------------|------------------|----------------------|
| Server-side includes (SSI) for shared nav/footer | Native Web Components (`customElements`) | Works on GitHub Pages (static only); no server needed |
| Copying nav HTML into every page file | Single `components.js` with `<site-nav>` custom element | One-edit update across all 7 pages |
| iframe-based nav sharing | Web Components light DOM | Full CSS inheritance; no cross-frame style isolation issues |
| `document.write()` for shared partials | `connectedCallback` + `this.innerHTML` | Standards-compliant; predictable render timing |

**No deprecated approaches apply here.** Web Components have been the standard answer for shared markup in no-build static sites since ~2019 and are confirmed stable in all modern browsers as of 2026.

---

## Open Questions

1. **About page tagline copy (ABOUT-03)**
   - What we know: `data.json` `about.tagline` = "Journalism and data science student at Northwestern University Medill" — accurate but generic; ABOUT-03 requires the tagline to "communicate the journalism + data science angle (not a generic student bio)"
   - What's unclear: What framing Grace prefers — "journalist who uses data" angle, "data scientist who reports" angle, or something else entirely; what makes her portfolio distinctive vs. peers
   - Recommendation: The Phase 2 About page plan should include writing 2–3 tagline options and picking one. The planner should treat this as a copywriting task within the About page plan, not a separate task. Based on the reference document, something like "Reporting with data. Writing with purpose." or "Medill journalist. Data science double major. I build the tools to tell the story." would satisfy ABOUT-03 better than the current value.

2. **GitHub repo name and Pages URL**
   - What we know: The git repo exists locally (`master` branch); no remote URL was found (`git remote -v` returned nothing) — the repo does not yet have a GitHub remote configured
   - What's unclear: Whether Grace has a GitHub account; what the repository will be named; whether she wants a repo named `portfolio` (giving URL `gracegormley.github.io/portfolio`) or a user site named `gracegormley.github.io` (giving cleaner URL with no path component); the remote has not been set up yet
   - Recommendation: Phase 2 must include setting up the GitHub remote and pushing to it before GitHub Pages can be configured. The plan should include a task for: create GitHub repo, add remote, push main branch, configure Pages settings. The planner should flag this as a prerequisite before the deployment task.

3. **Git branch name: `master` vs. `main`**
   - What we know: Current local branch is `master` (from git status in conversation context); GitHub Pages default branch is `main`; GitHub itself defaults new repos to `main`
   - What's unclear: Whether to rename the local branch before or after setting up the remote
   - Recommendation: Rename `master` to `main` before pushing: `git branch -m master main`. Then create the GitHub repo with `main` as default. This is a one-command fix and avoids confusion in GitHub Pages setup.

---

## Validation Architecture

`nyquist_validation` is enabled in config.json.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — Phase 2 outputs are static HTML/CSS/JS files |
| Config file | None |
| Quick run command | Open `http://localhost:8080` with `python3 -m http.server 8080` running |
| Full suite command | Manual checklist against Phase 2 success criteria + deployed URL check |

Phase 2 validation is manual and browser-based. There is no JavaScript test runner in this stack.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SITE-01 | Every page nav link resolves (no 404s); active link is highlighted | manual | Open each of 7 pages in browser; confirm nav links resolve; confirm active state on current page | ❌ Wave 0 — HTML files do not exist yet |
| SITE-02 | Footer appears on About page with clickable email and LinkedIn | manual | Open `index.html` in browser; click email link; click LinkedIn link | ❌ Wave 0 |
| SITE-04 | Deployed site returns About page at GitHub Pages URL | manual | Visit `https://[username].github.io/[repo]/`; confirm page loads within 3 seconds with headshot, name, bio visible | ❌ Wave 0 — GitHub remote not yet configured |
| ABOUT-01 | About page shows headshot, name, bio | manual | Open `index.html`; visually verify headshot renders, name is in `<h1>`, bio paragraph is present | ❌ Wave 0 |
| ABOUT-02 | "Download Resume" link downloads the PDF | manual | Click "Download Resume"; confirm browser downloads `Grace-Gormley-Resume.pdf`; open downloaded file and confirm it is Grace's resume | ❌ Wave 0 — `assets/resume.pdf` does not exist yet |
| ABOUT-03 | Tagline communicates journalism + data science angle | manual | Read tagline on About page; verify it names both journalism and data science in a way that is distinctive, not generic | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** Open the affected page(s) locally with `python3 -m http.server 8080`; verify the targeted behavior
- **Per wave merge:** Full manual walkthrough of all 7 pages (nav links, footer, active state); confirm resume download
- **Phase gate:** Deploy to GitHub Pages; visit the live URL; verify all 5 success criteria before marking Phase 2 complete

### Wave 0 Gaps

- [ ] `index.html` — About page; does not exist yet; created in Phase 2
- [ ] `components.js` — web components; does not exist yet; created in Phase 2
- [ ] `clips.html`, `photos.html`, `video.html`, `knight-lab.html`, `suso-camp.html`, `awards.html` — stub pages; none exist yet
- [ ] `assets/` directory — does not exist yet; created in Phase 2
- [ ] `assets/resume.pdf` — resume PDF not yet in repository; copied from `"Resume - Grace Gormley (Jan 2026) copy.pdf"` in project root
- [ ] GitHub remote — not yet configured; repository not yet on GitHub; GitHub Pages cannot be configured until this is done

---

## Sources

### Primary (HIGH confidence)

- MDN Web Docs: Web Components / Using custom elements — https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements — `connectedCallback`, `customElements.define`, light DOM innerHTML pattern confirmed
- MDN Web Docs: `<a>` element `download` attribute — https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a#download — same-origin behavior, filename suggestion, confirmed
- GitHub Pages official docs — https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site — branch/folder source configuration confirmed
- `.planning/research/ARCHITECTURE.md` (project research, 2026-03-19) — Web Components pattern, `components.js` file structure, active-state detection with `window.location.pathname`, `<script type="module">` requirement — all confirmed here and used directly

### Secondary (MEDIUM confidence)

- `.planning/research/STACK.md` (project research, 2026-03-19) — confirmed no jQuery, no framework, no Shadow DOM for this use case
- `data.json` (Phase 1 output) — confirmed `about` object field names, headshot path, resume_pdf path, contact info values used in this research
- MDN: `type="module"` script behavior — deferred execution, DOM-parsed-before-run confirmed; relevant to web component loading order

### Tertiary (LOW confidence — none in this research)

No findings rely solely on unverified web search results.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — Web Components, static HTML, GitHub Pages are all well-documented; no ambiguity
- Architecture (web components + file structure): HIGH — established in Phase 1 research, confirmed in MDN docs
- Pitfalls: HIGH — active-state pathname edge case, `type="module"` requirement, Shadow DOM anti-pattern, and resume 404 risk are all well-understood and documented in the architecture research
- Content (About page): HIGH for bio/headshot/contact; MEDIUM for tagline (copywriting judgment call)
- GitHub Pages deployment: HIGH for mechanism; LOW for specifics (repo name, remote URL) because the GitHub remote has not been set up yet

**Research date:** 2026-03-20
**Valid until:** 2026-06-20 (Web Components API, GitHub Pages, HTML download attribute are all stable; no fast-moving dependencies in this phase)
