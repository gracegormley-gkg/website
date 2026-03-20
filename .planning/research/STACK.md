# Stack Research

**Domain:** Personal journalism/data science portfolio — static, GitHub Pages hosted
**Researched:** 2026-03-19
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| HTML5 | Native | Page structure and content | No framework needed; GitHub Pages serves plain `.html` files with zero configuration. Crawlable, indexable, loads instantly. |
| CSS3 + Custom Properties | Native | All visual design including layout, typography, responsive behavior | CSS variables (100% browser support as of 2025) replace the need for Sass or any preprocessor. One `:root` block defines the design system — colors, spacing, type scale — everything else references those tokens. |
| Vanilla JavaScript (ES2022+) | Native | Fetch JSON data and render content into the DOM at page load | ES6+ fetch/async-await means no jQuery or bundler. `fetch('./data.json')` on a same-origin GitHub Pages site works without CORS issues — the JSON and HTML share the same origin, so no restrictions apply. |
| JSON data file (`data.json`) | N/A | Single source of truth for all editable content (clips, awards, bios, links) | Owner edits one file, no HTML knowledge needed. GitHub's web editor makes this a real "click, type, save" update workflow. Structure is human-readable and validated by any JSON linter. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| GLightbox | 3.3.0 | Photography gallery lightbox — click thumbnail, see full image with keyboard/swipe navigation | Use for the Photography page. 11 KB gzipped, no jQuery, no build step, loads via CDN `<script>` tag. Handles images and embedded videos in the same lightbox. |
| Google Fonts: Newsreader + Inter | N/A | Editorial typography system | Newsreader is specifically designed for digital news/editorial layouts — extended weight range (16 variants), excellent for display headlines and body text. Inter is the cleanest modern sans-serif for UI chrome (nav, labels, metadata). Load via `<link>` in `<head>`. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| VS Code | Local editing and preview | `Live Server` extension (free) gives a local dev server so `fetch('./data.json')` works the same as on GitHub Pages — no CORS surprises when opening `index.html` directly from the filesystem. |
| GitHub web editor | Owner's update workflow | For non-developer edits to `data.json`: navigate to file on GitHub.com, click pencil icon, edit, commit. No local tools needed. |
| GitHub Pages (built-in) | Hosting and deploy | Push to `main` (or `gh-pages`) branch → live site updates in ~60 seconds. Zero cost, zero infrastructure, `username.github.io/repo-name` or custom domain. |

## Installation

There is no `npm install` step. This is intentional. The entire stack is zero-dependency from the project's perspective.

```html
<!-- In <head>: Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..800;1,6..72,300..800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

<!-- In <head>: GLightbox CSS (only on Photography page) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/css/glightbox.min.css">

<!-- Before </body>: GLightbox JS (only on Photography page) -->
<script src="https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/js/glightbox.min.js"></script>
<script>const lightbox = GLightbox();</script>
```

```javascript
// data-loader.js — runs on every page, renders content from data.json
async function loadData() {
  const res = await fetch('./data.json');
  const data = await res.json();
  // render clips, awards, etc. into pre-existing DOM containers
}
loadData();
```

No package.json, no node_modules, no build command, no CI pipeline needed.

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Plain HTML/CSS/JS | Jekyll (GitHub Pages native SSG) | Jekyll is worth considering if the site will grow beyond 10 pages or needs blog-style pagination. For 7 fixed pages driven by a JSON file, Jekyll adds Ruby dependency, Liquid template syntax, and a local build environment — all overhead Grace doesn't need. GitHub auto-builds Jekyll, but debugging template errors is harder than debugging plain JS. |
| Plain HTML/CSS/JS | Eleventy (11ty) | 11ty is the best modern SSG for this type of site IF you want Nunjucks/HTML templates that compile to static HTML. Eliminates the JS-renders-from-JSON approach in favor of build-time rendering (better for SEO). Worth revisiting if Grace ever needs 50+ clip pages. Not worth the build step complexity for 7 pages. |
| Plain HTML/CSS/JS | Hugo | Hugo is fast and powerful for large content sites. Overkill for a 7-page portfolio; requires Go-flavored template syntax that is harder to learn than plain HTML. |
| Plain HTML/CSS/JS | React/Next.js/Astro | Brings a full Node.js ecosystem, build pipeline, and framework lock-in. No benefit for a static 7-page site. Actively makes GitHub Pages deployment harder (requires CI action to build). Avoid. |
| Google Fonts (CDN) | Self-hosted fonts | Self-hosting fonts eliminates the Google Fonts external request. Acceptable for a personal portfolio where the Google CDN is globally fast. If GDPR compliance ever matters, switch to self-hosting. |
| GLightbox (CDN) | PhotoSwipe v5 | PhotoSwipe has better mobile gesture support and is fully open-source. About 50 KB — 4x heavier than GLightbox. Worth switching to if gallery becomes the main feature of the site. GLightbox is sufficient for a supporting photography page. |
| GLightbox (CDN) | Lightbox2 | Lightbox2 requires jQuery (~90 KB). This would double the JS payload for a feature that GLightbox provides in 11 KB. Do not use Lightbox2. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| jQuery | Adds ~90 KB for utilities that vanilla JS (fetch, querySelector, classList) handles natively in 2025. Was required in 2010; no longer is. | Vanilla JS with ES6+ |
| React / Vue / Svelte | Requires a build step, Node.js toolchain, and generates JS-heavy output. GitHub Pages can host the output but the DX overhead is unjustified for a 7-page static site with no interactivity beyond a lightbox. | Plain HTML + vanilla JS |
| Sass / SCSS | Requires a preprocessor. CSS custom properties (variables) solve the same "design tokens" problem natively with no compilation. | CSS custom properties (`--var-name`) |
| Bootstrap or Tailwind CSS | Bootstrap adds ~150 KB of CSS and overrides you'll spend time fighting. Tailwind requires a build step and produces utility-soup HTML. An editorial design system should be hand-authored — the CSS is the design, not a framework configuration. | Hand-authored CSS (~300–500 lines total for this site) |
| Netlify CMS / DecapCMS | Adds an admin UI and Git-backed CMS layer. The complexity is not justified when "edit data.json on GitHub.com" achieves the same outcome with fewer moving parts. | GitHub web editor + data.json |
| `file://` protocol for local dev | `fetch()` calls fail with CORS errors when opening HTML directly from the filesystem. Must use a local server even for local development. | VS Code Live Server extension |

## Stack Patterns by Variant

**If the site needs a blog or frequent new clip pages (10+ per month):**
- Switch to Eleventy (11ty) with Nunjucks templates
- Each clip becomes a Markdown file with frontmatter, not a JSON array entry
- GitHub Actions handles the build step on push
- Still deploys to GitHub Pages

**If Grace wants to move away from GitHub Pages later:**
- This stack deploys identically to Netlify, Cloudflare Pages, or any static host
- No lock-in; it is just files

**If video embeds cause layout shift:**
- Wrap `<iframe>` in a `padding-top: 56.25%` aspect-ratio container
- Or use the native CSS `aspect-ratio: 16/9` property (supported by all modern browsers)

**If local JSON fetch feels fragile:**
- Inline the content data as a JS constant (`const DATA = { ... }`) in a `data.js` file instead
- Eliminates the async fetch entirely; simpler but slightly less clean separation
- Recommended fallback if fetch behavior is ever confusing to debug

## Version Compatibility

| Component | Compatible With | Notes |
|-----------|-----------------|-------|
| GLightbox 3.3.0 | All modern browsers (Chrome 90+, Firefox 88+, Safari 14+) | No IE11 support — not a concern for a 2025 portfolio site |
| CSS Custom Properties | 98%+ global browser support as of 2025 | No fallbacks needed |
| Fetch API + async/await | All modern browsers | Same baseline as CSS custom properties |
| Google Fonts CDN | All browsers | `display=swap` prevents FOIT (flash of invisible text) |
| Newsreader variable font | Chrome 66+, Firefox 62+, Safari 11+ | Variable fonts are safe to use as of 2025 |

## Key Architecture Decision: JSON-driven rendering

The `data.json` pattern works as follows on GitHub Pages:

1. Grace edits `data.json` in the GitHub web editor
2. She commits the change (one click)
3. GitHub Pages serves the updated file within ~60 seconds
4. On next page load, `data-loader.js` fetches the new JSON and renders it

There is no build step, no deploy hook, no CI/CD needed. The fetch is same-origin (both `index.html` and `data.json` live at `username.github.io/repo`), so CORS is not a concern.

The one caveat: `fetch()` does not work when opening HTML files directly from the filesystem (`file://` protocol). During development, Grace must use VS Code's Live Server or any local server (`python3 -m http.server`). This is a one-time setup detail, not an ongoing friction point.

## Sources

- GitHub Pages official docs — confirmed plain HTML/CSS/JS works with zero configuration, no build step required. [https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) — HIGH confidence
- GitHub community discussion on CORS — confirmed same-origin JSON fetch works on GitHub Pages public sites. [https://github.com/orgs/community/discussions/22399](https://github.com/orgs/community/discussions/22399) — HIGH confidence
- GLightbox official site — confirmed version 3.3.0, 11 KB gzipped, CDN available. [https://biati-digital.github.io/glightbox/](https://biati-digital.github.io/glightbox/) — HIGH confidence
- Typewolf / Google Fonts editorial recommendations — confirmed Newsreader as the top editorial serif for digital journalism contexts in 2025. [https://www.typewolf.com/google-fonts](https://www.typewolf.com/google-fonts) — MEDIUM confidence (editorial recommendation, not a technical spec)
- DEV Community — vanilla JS fetch JSON and render pattern confirmed as standard no-build approach. [https://dev.to/arkhan/why-vanilla-javascript-is-making-a-comeback-in-2025-4939](https://dev.to/arkhan/why-vanilla-javascript-is-making-a-comeback-in-2025-4939) — MEDIUM confidence
- MDN Web Docs — CSS custom properties browser support and best practices confirmed current. [https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties) — HIGH confidence

---
*Stack research for: Grace Gormley personal journalism portfolio — static, GitHub Pages*
*Researched: 2026-03-19*
