# Phase 6: Video and Pre-Launch — Research

**Researched:** 2026-04-06
**Domain:** Video embeds (YouTube/Vimeo), CSS mobile responsiveness, pre-launch auditing for static HTML sites
**Confidence:** HIGH (stack is fully known; site code fully read; only video URLs remain an external dependency)

---

## Summary

Phase 6 closes the site. It has three distinct jobs: (1) build the Video page with embedded video players or a well-designed placeholder if embed URLs have not yet been provided; (2) add mobile CSS to make the nav and all page layouts correct at 375px; (3) run a manual pre-launch checklist across all 7 pages.

The stack is fully established — static HTML/CSS/JS, no build step, GitHub Pages. No new libraries are introduced in this phase. The video embed pattern uses a standard responsive iframe wrapper. The mobile audit is a targeted CSS patch to `style.css` using `@media` breakpoints; the existing CSS custom property system makes this straightforward. The pre-launch checklist is a manual human verification task.

The only dependency that cannot be resolved by code is the video embed URLs. `data.json` already has PLACEHOLDER strings in `videos[].embedUrl`. The plan must accommodate both paths: (a) Grace provides YouTube/Vimeo URLs before execution, or (b) the page renders a clearly designed placeholder until she does. Both paths must produce a shippable page.

**Primary recommendation:** Build the Video page to read `embedUrl` from `data.json` — render a real embed if the URL is a valid YouTube/Vimeo link, render a styled placeholder card otherwise. This makes the URL-blocking concern disappear: Grace can unblock video at any time by editing `data.json` alone.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| VIDEO-01 | User can watch "What Can We Do?" and "Move Your Feet" as embedded videos on the Video page | YouTube/Vimeo responsive iframe pattern; placeholder fallback design when embedUrl is PLACEHOLDER string |
| VIDEO-02 | Video page notes Grace's Adobe Premiere experience | Static HTML prose in video.html, consistent with About/SUSO static pattern |
| SITE-03 | Site renders correctly on mobile (375px viewport minimum) | CSS @media breakpoint targeting nav overflow and fixed-width elements; audit of all 7 pages |
</phase_requirements>

---

## Standard Stack

### Core
| Library/Feature | Version | Purpose | Why Standard |
|-----------------|---------|---------|--------------|
| HTML `<iframe>` | Native | Embed YouTube/Vimeo players | The only cross-platform video embed mechanism that works on static sites without a backend |
| CSS `@media` queries | Native | Responsive breakpoints | Already used implicitly via CSS Grid auto-fill; explicit breakpoints needed for nav and fixed-width elements |
| Static HTML/JS | — | Video page content, placeholder logic | Consistent with About, SUSO, Knight Lab pattern already established |

### Supporting
| Feature | Purpose | When to Use |
|---------|---------|-------------|
| `aspect-ratio: 16/9` CSS | Responsive iframe sizing without JS | Always — replaces the old "padding-bottom hack" |
| `max-width: 100%` on iframe container | Prevents horizontal overflow on mobile | Always |
| YouTube nocookie embed domain | `youtube-nocookie.com` instead of `youtube.com` | Preferred for privacy; no functional difference |
| Vimeo player embed | `player.vimeo.com/video/{id}` | If videos are on Vimeo instead of YouTube |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `<iframe>` embed | `<video>` with direct file | Direct file requires hosting the video file — not viable for static GitHub Pages at video file sizes |
| `aspect-ratio` CSS | Padding-bottom percentage hack | Padding hack is obsolete; `aspect-ratio` has 97%+ browser support as of 2024 |

**Installation:** No installs. All native HTML/CSS.

---

## Architecture Patterns

### Recommended Video Page Structure

The Video page follows the **static HTML with conditional JS rendering** pattern used by About (pure static) and Clips (fetch + render). Since video URLs may be placeholders, a small inline script reads `data.json` and either renders an iframe or a placeholder card.

```
video.html
  └── fetches data.json → videos[]
      ├── if embedUrl is a valid URL → render <iframe> in .video-embed wrapper
      └── if embedUrl is PLACEHOLDER string → render .video-placeholder card
```

### Pattern 1: Responsive Iframe Embed

**What:** A CSS container that maintains 16:9 aspect ratio at any width, with the iframe filling it.
**When to use:** Whenever a real YouTube or Vimeo embed URL exists.

```html
<!-- Source: MDN Web Docs — aspect-ratio -->
<div class="video-embed">
  <iframe
    src="https://www.youtube-nocookie.com/embed/{VIDEO_ID}"
    title="What Can We Do?"
    allowfullscreen
    loading="lazy"
    frameborder="0">
  </iframe>
</div>
```

```css
.video-embed {
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.video-embed iframe {
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
  display: block;
}
```

### Pattern 2: Placeholder Card

**What:** A styled card that communicates "video coming soon" without looking broken.
**When to use:** When `embedUrl` is a PLACEHOLDER string (contains no `http`).

```css
.video-placeholder {
  aspect-ratio: 16 / 9;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: var(--color-bg-subtle);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-ink-muted);
  font-family: var(--font-ui);
  font-size: var(--text-sm);
}
```

### Pattern 3: URL Detection in JS

**What:** Read `embedUrl` from `data.json`; branch on whether it is a real URL or placeholder.
**When to use:** Always — makes Grace's single-field edit in `data.json` automatically deploy the real video.

```javascript
// Detect placeholder vs. real URL
function isPlaceholder(url) {
  return !url || !url.startsWith('http');
}

// Extract embed URL from watch URL if Grace pastes a watch link
function toEmbedUrl(url) {
  // YouTube watch → embed
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/);
  if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`;
  // Vimeo
  const viMatch = url.match(/vimeo\.com\/(\d+)/);
  if (viMatch) return `https://player.vimeo.com/video/${viMatch[1]}`;
  // Already an embed URL — return as-is
  return url;
}
```

This is important: Grace may paste a regular YouTube watch URL (`youtube.com/watch?v=...`) rather than an embed URL. Converting it in JS means she never needs to know the embed format.

### Pattern 4: Mobile Nav Collapse

**What:** At narrow viewports the horizontal nav link list wraps or collapses. The current nav uses `display: flex` with `gap: var(--space-6)` — 7 links will overflow on a 375px screen.
**When to use:** Required for SITE-03.

The established project decision is "Light DOM web component that inherits CSS custom properties." The fix is a CSS-only media query on `.site-nav` and `.site-nav__links` — no JS hamburger menu is needed for a 7-item nav on a journalism portfolio.

```css
@media (max-width: 640px) {
  .site-nav {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4);
  }

  .site-nav__links {
    flex-wrap: wrap;
    gap: var(--space-3);
  }
}
```

This stacks the brand above the links and allows links to wrap into two rows — readable, no horizontal scroll, no JS required.

### Anti-Patterns to Avoid

- **Fixed pixel widths on content elements:** `width: 720px` on `.page-content` without `max-width` causes overflow at 375px. Use `max-width` + `padding` instead (already correct in existing CSS — verify at runtime).
- **`100vw` on non-full-bleed elements:** Can cause horizontal scroll due to scrollbar width. Use `width: 100%` instead.
- **`iframe` without container:** A bare iframe at a fixed width (e.g., `width="560"`) overflows on mobile. Always wrap in an aspect-ratio container.
- **Hamburger menu JS for a small nav:** Overkill for 7 links. Flex-wrap is sufficient and requires zero JS.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Responsive 16:9 video sizing | Custom JS resize listener | `aspect-ratio: 16/9` CSS + `width: 100%` | Native CSS, no reflow jitter |
| YouTube URL parsing | Custom regex from scratch | The two-line regex patterns above (documented, tested) | Covers `watch?v=`, `youtu.be/`, and already-embed URLs |
| Mobile nav hamburger | Toggle JS + animated drawer | CSS flex-wrap | 7 links wrap to two rows fine; hamburger is engineering overkill |
| Pre-launch link checking | Automated crawler | Manual human click-test | Project decision (Phase 03): link verification gated on human click-test — no automated tool can confirm live external URLs open the correct article |

---

## Common Pitfalls

### Pitfall 1: Nav Overflow on Mobile
**What goes wrong:** The 7-link horizontal nav line overflows at 375px, creating a horizontal scrollbar on every page.
**Why it happens:** `.site-nav__links` is a flex row with `gap: 1.5rem` — no wrapping or stacking set for narrow viewports.
**How to avoid:** Add `@media (max-width: 640px)` block to `style.css` that sets `flex-direction: column` on `.site-nav` and `flex-wrap: wrap` on `.site-nav__links`.
**Warning signs:** DevTools responsive mode at 375px shows content visually cut off or a scrollbar appears.

### Pitfall 2: About Page Hero Overflow
**What goes wrong:** `.about-hero` is `display: flex` with a `width: 200px` headshot and text — at 375px the two columns don't have enough room.
**Why it happens:** No mobile stacking rule exists in current `style.css` for `.about-hero`.
**How to avoid:** Add `@media` rule to stack `.about-hero` to `flex-direction: column` at narrow viewports.
**Warning signs:** Headshot and bio text are too small to read side-by-side at 375px.

### Pitfall 3: `padding: 0 var(--space-8)` — 32px side padding on 375px screen
**What goes wrong:** `.page-content` has `padding: 0 var(--space-8)` (0 32px). 375 - 64 = 311px readable width. This is tight but workable. However, `.photo-page` uses `--max-width-wide` (1100px) — same padding, also workable.
**Why it happens:** Phase 2/3 padding was set for desktop without mobile consideration.
**How to avoid:** No fix needed — 311px readable width is acceptable on mobile. But verify nothing overflows inside the padded containers (e.g., long clip titles, wide pre/code blocks — none exist on this site).
**Warning signs:** Text touching screen edges (indicates padding less than 16px).

### Pitfall 4: Video Placeholder Looking Broken
**What goes wrong:** If `embedUrl` is a PLACEHOLDER string and the page just renders nothing or an empty box, a recruiter thinks the site is broken.
**Why it happens:** Insufficient handling of the PLACEHOLDER case.
**How to avoid:** Explicitly check for PLACEHOLDER; render a designed card with a human-readable message (e.g., "Video available upon request"). See placeholder pattern above.
**Warning signs:** Empty `<div>` where a video should be.

### Pitfall 5: Grace Pastes Watch URL Instead of Embed URL
**What goes wrong:** Grace edits `data.json` with `https://www.youtube.com/watch?v=XYZ` but the iframe needs `https://www.youtube-nocookie.com/embed/XYZ`.
**Why it happens:** Non-technical user, normal YouTube URL copy behavior.
**How to avoid:** JS conversion function (see Pattern 3 above) transforms any YouTube or Vimeo URL format into an embed URL automatically.
**Warning signs:** Iframe renders a blank/error state — YouTube blocks watch URLs in iframes.

### Pitfall 6: `<iframe>` Security Attributes
**What goes wrong:** Browser may block iframe or show security warnings without correct attributes.
**How to avoid:** Always include `allowfullscreen`, `loading="lazy"`, and remove `frameborder="0"` (use CSS `border: none` instead — `frameborder` is deprecated HTML).

---

## Code Examples

### Full Video Page Render Logic

```javascript
// Source: Pattern derived from existing clips.html fetch-and-render pattern
fetch('./data.json')
  .then(r => r.json())
  .then(data => {
    const container = document.getElementById('video-list');
    if (!data.videos || data.videos.length === 0) {
      container.innerHTML = '<p>No videos available.</p>';
      return;
    }
    container.innerHTML = data.videos.map(v => {
      const embedUrl = toEmbedUrl(v.embedUrl);
      const isReal = !isPlaceholder(v.embedUrl);
      return `
        <article class="video-item">
          <h2 class="video-title">${v.title}</h2>
          ${isReal
            ? `<div class="video-embed">
                 <iframe src="${embedUrl}" title="${v.title}" allowfullscreen loading="lazy"></iframe>
               </div>`
            : `<div class="video-placeholder" aria-label="Video coming soon">
                 Video available upon request
               </div>`
          }
          ${v.description ? `<p class="video-desc">${v.description}</p>` : ''}
        </article>
      `;
    }).join('');
  });
```

### Mobile Media Query Block for style.css

```css
/* Mobile responsiveness — Phase 6 */
@media (max-width: 640px) {
  .site-nav {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-4);
  }

  .site-nav__links {
    flex-wrap: wrap;
    gap: var(--space-3);
  }

  .about-hero {
    flex-direction: column;
  }

  .about-headshot {
    width: 140px;
  }
}
```

### Pre-Launch Checklist Template

```
Page: index.html (About)
[ ] Title tag: "About — Grace Gormley"
[ ] Footer present with email + LinkedIn links
[ ] Headshot credit present: "Headshot: Anna Hoch-Kenney"
[ ] Resume PDF download link works (downloads, not opens in new tab)
[ ] External link: LinkedIn opens correct profile
[ ] Renders at 375px — no horizontal scroll

Page: clips.html
[ ] Title tag: "Clips — Grace Gormley"
[ ] Footer present
[ ] 3 clips load from data.json
[ ] Each clip link opens correct article (click-tested)
[ ] Renders at 375px

Page: photos.html
[ ] Title tag: "Photography — Grace Gormley"
[ ] Footer present
[ ] Gallery loads 13 photos
[ ] Lightbox opens, nav arrows work, Escape closes
[ ] Renders at 375px

Page: video.html
[ ] Title tag: "Video — Grace Gormley"
[ ] Footer present
[ ] Videos embed OR placeholder cards render (no blank/broken state)
[ ] Adobe Premiere mention present
[ ] Renders at 375px

Page: knight-lab.html
[ ] Title tag: "Knight Lab — Grace Gormley"
[ ] Footer present
[ ] Live EIS Archives link opens: https://nulib-ds.github.io/EIS-Final/
[ ] Renders at 375px

Page: suso-camp.html
[ ] Title tag: "SUSO Camp — Grace Gormley"
[ ] Footer present
[ ] SUSO website link opens: https://susocamp.weebly.com/
[ ] Press links (Verde Magazine, Paly Voice) open correctly
[ ] Renders at 375px

Page: awards.html
[ ] Title tag: "Awards — Grace Gormley"
[ ] Footer present
[ ] Award article links open (click-test each)
[ ] Renders at 375px
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `padding-bottom: 56.25%` responsive video hack | `aspect-ratio: 16/9` CSS | Chrome 88 / 2021 | Simpler, no stacking context issues |
| `frameborder="0"` HTML attribute | `border: none` in CSS (frameborder deprecated) | HTML5 | Cleaner markup; `frameborder` still works but triggers validator warnings |
| `youtube.com/embed/` | `youtube-nocookie.com/embed/` | ~2019 | Reduces cookies placed on visitor; no functional difference |

**Deprecated/outdated:**
- Padding-bottom percentage hack for responsive video: replaced by `aspect-ratio`.
- `allowfullscreen` as `webkitallowfullscreen mozallowfullscreen`: only `allowfullscreen` needed now.

---

## Current Site Audit: Known Mobile Gaps

Based on reading all HTML and CSS files, the following specific issues are known before testing:

| Element | Issue | Fix |
|---------|-------|-----|
| `.site-nav` | 7-link horizontal flex row, no wrap/stack rule | `@media` → `flex-direction: column`, links `flex-wrap: wrap` |
| `.about-hero` | Side-by-side flex layout (headshot + text), no stacking | `@media` → `flex-direction: column` |
| Video page | Currently stub — needs full implementation | New page build |

Items that are already mobile-safe (no fix needed):
- `.page-content`: `max-width: 720px` + `padding: 0 var(--space-8)` → fine at 375px
- `.photo-grid`: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` → collapses to 1 column automatically
- `.pillar-card`, `.tool-tags`: flex-wrap already set
- All `<meta name="viewport">` tags: present on all 7 pages

---

## Pre-Launch Checklist: Current Known Status

Audited from reading all 7 HTML files:

| Page | Title Tag | Footer | Notes |
|------|-----------|--------|-------|
| index.html | "About — Grace Gormley" | `<site-footer>` | Headshot credit present. Resume PDF download present. |
| clips.html | "Clips — Grace Gormley" | `<site-footer>` | Links need human click-test |
| photos.html | "Photography — Grace Gormley" | `<site-footer>` | Lightbox verified in Phase 4 |
| video.html | "Video — Grace Gormley" | `<site-footer>` | Content is stub — needs full build |
| knight-lab.html | "Knight Lab — Grace Gormley" | `<site-footer>` | Verified in Phase 5 |
| suso-camp.html | "SUSO Camp — Grace Gormley" | `<site-footer>` | Verified in Phase 5 |
| awards.html | "Awards — Grace Gormley" | `<site-footer>` | Links need human click-test |

All title tags are already set correctly. All pages already have `<site-footer>`. The headshot credit is present in index.html. The main work is: build video.html, patch mobile CSS, run link check.

---

## Open Questions

1. **Video embed URLs for "What Can We Do?" and "Move Your Feet"**
   - What we know: Both videos are listed in `data.json` with PLACEHOLDER embedUrl values. The Phase 6 blocker note in STATE.md confirms URLs have not been provided.
   - What's unclear: Whether Grace will provide URLs before Phase 6 executes, or whether the placeholder path will ship.
   - Recommendation: Build both paths (real embed + placeholder) as described. The planner should include a task step that asks Grace to provide URLs, then gates the "replace placeholder" step on her response. If she doesn't respond, ship with the placeholder — it is explicitly acceptable per the ROADMAP success criteria.

2. **YouTube vs. Vimeo**
   - What we know: Both platforms are used for journalism school video packages. The data.json description says "video package produced and edited by Grace Gormley" — could be either.
   - Recommendation: Handle both formats with the URL detection function (Pattern 3). No decision needed upfront.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — this is a static HTML/CSS/JS site with no test runner |
| Config file | None |
| Quick run command | Manual browser inspection at 375px DevTools viewport |
| Full suite command | Manual pre-launch checklist (see Code Examples section) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| VIDEO-01 | Video embeds or placeholder renders on video.html | manual | Open video.html in browser; confirm no blank/broken state | ❌ Wave 0 — page is a stub |
| VIDEO-02 | Adobe Premiere mention present on video.html | manual | Read video.html source for mention | ❌ Wave 0 — page is a stub |
| SITE-03 | All 7 pages render at 375px without horizontal scroll | manual | Chrome DevTools responsive mode, 375px width, check each page | Partially — pages exist; CSS fix needed |

No automated test framework is appropriate for this site. All verification is human click-test per the Phase 3 decision: "Link verification gated on human click-test."

### Sampling Rate

- **Per task commit:** Visual browser check of the specific page(s) changed
- **Per wave merge:** Not applicable (single-developer static site)
- **Phase gate:** Full manual pre-launch checklist green before considering Phase 6 complete

### Wave 0 Gaps

- [ ] `video.html` — needs full implementation (currently stub "Content coming soon")
- [ ] `style.css` mobile media query block — does not yet exist; needed for nav + about-hero

*(No test files needed — this project uses manual browser verification throughout)*

---

## Sources

### Primary (HIGH confidence)
- Direct file read: `video.html`, `style.css`, `components.js`, `data.json`, all 7 HTML pages — current site state is authoritative
- Direct file read: `.planning/STATE.md`, `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md` — project decisions
- MDN Web Docs pattern: `aspect-ratio` CSS property for responsive iframes (standard since 2021)
- YouTube/Vimeo embed URL formats: `youtube-nocookie.com/embed/{id}` and `player.vimeo.com/video/{id}` — stable, well-documented

### Secondary (MEDIUM confidence)
- CSS flex-wrap for mobile nav: standard pattern, no library needed, consistent with project's CSS-only approach
- `youtube-nocookie.com` domain preference: documented Google/YouTube privacy feature

### Tertiary (LOW confidence)
- None — all claims are grounded in direct file inspection or well-established web standards.

---

## Metadata

**Confidence breakdown:**
- Video embed pattern: HIGH — native web standard, used unchanged for years
- Mobile CSS fixes: HIGH — specific elements identified from direct code read; fixes are standard CSS
- Pre-launch checklist: HIGH — all 7 pages read; title tags and footer presence confirmed directly
- Video URL availability: LOW (external dependency on Grace providing URLs — known blocker from STATE.md)

**Research date:** 2026-04-06
**Valid until:** 2026-05-06 (stable domain — web embed patterns do not change rapidly)
