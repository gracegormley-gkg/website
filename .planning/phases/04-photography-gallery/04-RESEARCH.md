# Phase 4: Photography Gallery — Research

**Researched:** 2026-04-06
**Domain:** CSS Grid gallery, vanilla JS lightbox, touch/keyboard navigation, static site image rendering
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PHOTO-01 | User can browse a curated gallery of Grace's photos in a clean grid layout | 13 images already optimized and named photo-01.jpg through photo-13.jpg in `images/`; `data.json` has a `photos` array with 13 entries; CSS Grid fits the established `--max-width-wide` layout token |
| PHOTO-02 | User can click a photo to view it full-size (lightbox) | Vanilla JS dialog/overlay lightbox is the correct approach for this no-build stack; keyboard (arrow + Escape) and touch swipe must be handled inline |
| PHOTO-03 | Each photo has a caption providing story context (not just a filename) | `data.json` `photos` entries each have `caption`, `credit`, and `alt` fields — currently PLACEHOLDER; captions must be populated before this phase ships |
</phase_requirements>

---

## Summary

Phase 4 builds `photos.html` into a fully functional photography gallery page. The data schema, images, and page stub all already exist. `data.json` has 13 photo entries with `file`, `caption`, `credit`, and `alt` fields. All 13 JPEG files are in `images/` and have been resized to 2000px max dimension. Most are under 400 KB; two (photo-12.jpg at 730 KB and photo-13.jpg at 652 KB) exceed the Phase 1 quality floor and require re-optimization before launch — this is a known flagged item from Phase 1.

The page has two interactive features the previous pages did not: a CSS Grid thumbnail gallery and a full-screen lightbox overlay. Both are built entirely with vanilla JavaScript and CSS — no external libraries. The lightbox requires three interaction methods: mouse click to open, keyboard arrow navigation and Escape to close, and touch swipe on mobile. All three are achievable with 60–80 lines of plain JavaScript.

The captions in `data.json` are all currently PLACEHOLDER strings. The plan must include a task to populate real captions from Grace before the render script ships — without this, PHOTO-03 cannot be marked complete. This is the only content dependency in this phase.

**Primary recommendation:** Three plans — (1) populate data.json captions + write photos.html with grid + add gallery CSS to style.css, (2) add the lightbox JS (keyboard, touch, open/close), (3) re-optimize photo-12 and photo-13, then deploy and verify.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| CSS Grid (native) | Native CSS | Thumbnail gallery layout | The established `--max-width-wide: 1100px` token in style.css is the correct container; CSS Grid handles variable-aspect photos cleanly with `auto-rows` |
| Vanilla JS (native) | ES6 | Lightbox open/close, keyboard navigation, touch swipe | Established pattern in this stack — no npm, no build step; all previous pages use inline or linked plain JS |
| HTML `<dialog>` element | Native HTML5 | Lightbox overlay container | Correct semantic element for modal overlays; provides built-in accessibility (focus trap, ARIA role); supported in all modern browsers; `.showModal()` / `.close()` API is clean |
| Fetch + JSON render (native) | Native | Render photo grid from data.json | Established fetch-and-render pattern from clips.html and awards.html — consistent with the project architecture |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `macOS sips` | System built-in | Re-optimize photo-12.jpg and photo-13.jpg | Both exceed 400 KB (730 KB and 652 KB); must be recompressed to match the Phase 1 quality floor before deploy |
| `python3 -m http.server` | Built-in | Local development server | fetch() requires a server; use during development only |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Native `<dialog>` lightbox | Third-party: GLightbox, Swipebox, PhotoSwipe | Third-party libraries have no build-step install path on this static site; CDN options exist but add external dependency. Native dialog is ~60 lines and covers all requirements |
| CSS Grid auto-fill thumbnail grid | CSS Flexbox grid | Flexbox requires more manual sizing math for grid gaps; CSS Grid `repeat(auto-fill, minmax())` handles responsive column collapse natively |
| Inline `<script>` in photos.html | Separate photos.js | Either works; clips.html uses inline script. For consistency with clips pattern, inline is preferred unless lightbox logic exceeds ~120 lines |

**Installation:**
```bash
# No npm install. No new dependencies.
# Re-optimize oversized images only:
sips -s format jpeg -s formatOptions 70 "images/photo-12.jpg" --out "images/photo-12.jpg"
sips -s format jpeg -s formatOptions 70 "images/photo-13.jpg" --out "images/photo-13.jpg"
```

---

## Architecture Patterns

### Recommended Project Structure (Phase 4 additions only)

```
images/
  photo-01.jpg … photo-13.jpg   # already exists; photo-12/13 need re-optimization
photos.html                      # stub exists; replace content with full gallery page
style.css                        # add .photo-grid, .photo-thumb, .photo-lightbox CSS at bottom
data.json                        # update all 13 photos[].caption and photos[].alt from PLACEHOLDER to real text
```

No new files beyond `photos.html` edits and `style.css` additions.

### Pattern 1: CSS Grid Thumbnail Gallery

**What:** A responsive grid of clickable `<button>` or `<figure>` elements wrapping `<img>` thumbnails. Clicking triggers the lightbox.
**When to use:** Anytime you have 8–13 images to display in a browsable grid at `--max-width-wide`.

```css
/* style.css — add at bottom under a "Photography page — Phase 4" comment */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-4);
  margin-top: var(--space-8);
}

.photo-thumb {
  aspect-ratio: 3 / 2;
  overflow: hidden;
  border-radius: var(--border-radius);
  cursor: pointer;
  background: var(--color-bg-subtle);
  border: none;
  padding: 0;
}

.photo-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform var(--transition-fast);
}

.photo-thumb:hover img {
  transform: scale(1.03);
}
```

The `aspect-ratio: 3 / 2` enforces consistent thumbnail proportions regardless of source image orientation. `object-fit: cover` crops to fill. `minmax(280px, 1fr)` collapses naturally from 3 columns on desktop to 2 on tablet to 1 on mobile without media queries.

### Pattern 2: Native `<dialog>` Lightbox

**What:** An HTML `<dialog>` element pre-inserted in the DOM, shown/hidden via `.showModal()` and `.close()`. Contains a full-size `<img>` plus caption and navigation arrows.
**When to use:** Any time a modal overlay is needed in this no-build stack.

```html
<!-- In photos.html body, before closing </body> -->
<dialog id="lightbox" class="photo-lightbox" aria-label="Photo lightbox">
  <button class="lightbox-close" id="lb-close" aria-label="Close">&times;</button>
  <button class="lightbox-prev" id="lb-prev" aria-label="Previous photo">&#8592;</button>
  <button class="lightbox-next" id="lb-next" aria-label="Next photo">&#8594;</button>
  <figure class="lightbox-figure">
    <img id="lb-img" src="" alt="">
    <figcaption id="lb-caption" class="lightbox-caption"></figcaption>
  </figure>
</dialog>
```

```javascript
// Lightbox JS pattern (inline <script> at bottom of photos.html)
let photos = [];     // populated after data.json fetch
let current = 0;

const dialog  = document.getElementById('lightbox');
const lbImg   = document.getElementById('lb-img');
const lbCap   = document.getElementById('lb-caption');

function openLightbox(index) {
  current = index;
  const p = photos[current];
  lbImg.src = p.file;
  lbImg.alt = p.alt;
  lbCap.textContent = p.caption;
  dialog.showModal();
}

function navigate(dir) {
  current = (current + dir + photos.length) % photos.length;
  const p = photos[current];
  lbImg.src = p.file;
  lbImg.alt = p.alt;
  lbCap.textContent = p.caption;
}

// Keyboard navigation
dialog.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') navigate(1);
  if (e.key === 'ArrowLeft')  navigate(-1);
  if (e.key === 'Escape')     dialog.close();
});

// Click outside (on backdrop) to close
dialog.addEventListener('click', e => {
  if (e.target === dialog) dialog.close();
});

document.getElementById('lb-prev').addEventListener('click', () => navigate(-1));
document.getElementById('lb-next').addEventListener('click', () => navigate(1));
document.getElementById('lb-close').addEventListener('click', () => dialog.close());
```

### Pattern 3: Touch Swipe Detection

**What:** Detecting horizontal swipe on a touch device without a library.
**When to use:** Lightbox overlay on mobile.

```javascript
// Add to lightbox section of photos.html <script>
let touchStartX = 0;

dialog.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].clientX;
}, { passive: true });

dialog.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
});
```

A 50px threshold prevents accidental swipe triggering on taps.

### Pattern 4: Fetch-and-Render Grid (consistent with clips.html pattern)

```javascript
fetch('./data.json')
  .then(r => r.json())
  .then(data => {
    photos = data.photos || [];
    const grid = document.getElementById('photo-grid');
    grid.innerHTML = photos.map((p, i) => `
      <button class="photo-thumb" data-index="${i}" aria-label="View ${p.alt}">
        <img src="${p.file}" alt="${p.alt}" loading="lazy">
      </button>
    `).join('');
    grid.querySelectorAll('.photo-thumb').forEach(btn => {
      btn.addEventListener('click', () => openLightbox(+btn.dataset.index));
    });
  });
```

Note `loading="lazy"` on thumbnails — the grid loads 13 images; lazy loading defers off-screen images and is critical for the 3-second load target.

### Pattern 5: `<main>` Layout for Wide Gallery Container

The previous pages used `max-width: var(--max-width-content)` (720px) on `.page-content`. The gallery needs the wider `--max-width-wide` (1100px) for the grid. The `<main>` element should use a new CSS class or override for the photography page.

```css
/* style.css — Photography page wide layout */
.photo-page {
  max-width: var(--max-width-wide);
  margin: var(--space-12) auto;
  padding: 0 var(--space-8);
}
```

In photos.html, use `class="photo-page"` on `<main>` instead of `class="page-content"`.

### Anti-Patterns to Avoid

- **Using `<img>` directly as the lightbox trigger:** Use `<button>` wrapping `<img>` for keyboard accessibility — `<button>` is focusable and activatable by Enter/Space natively.
- **Setting all 13 full-size images as `<img src>` in the grid:** Load only thumbnails in the grid using the same file (they are already web-sized); only load the full path in the lightbox when opened. Do NOT add separate thumbnail versions — this contradicts the no-new-files constraint.
- **Using `display: none / block` for the lightbox instead of `<dialog>`:** `<dialog>` provides focus trapping and `backdrop` CSS pseudo-element for the overlay background for free.
- **`position: fixed` overlay without `<dialog>`:** Requires manually blocking scroll and managing z-index stacking context — `<dialog>.showModal()` handles all of this natively.
- **Page-level `max-width-content` on the gallery container:** The 720px content column is too narrow for a grid. The gallery must use `--max-width-wide` (1100px).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Lightbox modal with focus trap | Custom `position: fixed` overlay + `tabindex` management | Native `<dialog>` element with `.showModal()` | `.showModal()` handles focus trap, backdrop click, z-index, and scroll lock natively; 0 lines of custom code for these concerns |
| Responsive grid column collapse | CSS media queries with explicit breakpoints | `CSS Grid repeat(auto-fill, minmax(280px, 1fr))` | Auto-fill handles the 3→2→1 column collapse without any `@media` queries |
| Touch swipe library | External Hammer.js or similar | 8-line `touchstart`/`touchend` listener | Swipe direction detection is 8 lines; Hammer.js is 15 KB min and requires a CDN or npm |
| Image lazy loading | Intersection Observer custom code | Native `loading="lazy"` attribute | `loading="lazy"` on `<img>` is sufficient for in-grid thumbnails; supported in all modern browsers |

**Key insight:** The `<dialog>` element eliminates 30–50 lines of custom modal management code that would be needed with a `position: fixed` div approach. The grid pattern eliminates all breakpoint media queries. Both are well-supported in modern browsers (Chrome 37+, Firefox 98+, Safari 15.4+ for dialog; universal for grid).

---

## Common Pitfalls

### Pitfall 1: photo-12 and photo-13 Exceed 400 KB

**What goes wrong:** photo-12.jpg is 730 KB and photo-13.jpg is 652 KB — both were flagged during Phase 1 as exceeding the quality floor. Including them uncompressed puts the grid page over the 3-second load target.
**Why it happens:** Phase 1 set a quality floor of 65 (`sips -s formatOptions 65`) but 9 images still exceeded 400 KB. The plan noted them for Phase 4 curation review. photos 12 and 13 are the two largest remaining offenders.
**How to avoid:** Re-run `sips` at formatOptions 65 (or lower if needed) on photo-12 and photo-13 before final deploy. Target under 400 KB each.
**Warning signs:** `ls -lh images/photo-1*.jpg` shows file sizes above 400 KB.

### Pitfall 2: All 13 Photos Have PLACEHOLDER Captions

**What goes wrong:** PHOTO-03 requires real story-context captions, not filenames or date stamps. All 13 `data.json` entries currently read `"caption": "PLACEHOLDER — one sentence of story context..."`. Shipping without replacing these fails the requirement.
**Why it happens:** Captions require Grace's input — they are content, not code.
**How to avoid:** Make populating all 13 captions (and alt text) the first task of the phase, before any HTML or CSS is written. Do not mark the phase complete until all PLACEHOLDER strings are replaced.
**Warning signs:** Any `grep -r "PLACEHOLDER" data.json` match in the `photos` array.

### Pitfall 3: `<dialog>` `backdrop` Not Styled

**What goes wrong:** The `<dialog>` element shows with a white background but no dimmed backdrop overlay, making it look broken.
**Why it happens:** The `::backdrop` pseudo-element is separate from the dialog's own styles and must be explicitly set.
**How to avoid:** Add `dialog::backdrop { background: rgba(0, 0, 0, 0.85); }` to style.css.

### Pitfall 4: Keyboard Navigation Not Working in Lightbox

**What goes wrong:** Arrow keys scroll the page instead of navigating photos; Escape doesn't close the dialog.
**Why it happens:** The `keydown` listener must be on the `dialog` element, not `document`, and the dialog must have focus when open. `.showModal()` moves focus to the dialog automatically.
**How to avoid:** Attach `keydown` listener to the `dialog` element, not `window` or `document`. The `Escape` key is also handled natively by `<dialog>` — but only if no `keydown` preventDefault interferes. Test explicitly.

### Pitfall 5: Fetch Relative Path Fails on GitHub Pages

**What goes wrong:** `fetch('./data.json')` fails when the page URL ends in `/` (root URL) vs `/photos.html`.
**Why it happens:** Established in Phase 2 decisions — the root URL on GitHub Pages ends in `/`, not `index.html`. This makes relative paths ambiguous.
**How to avoid:** Use `fetch('./data.json')` (not `fetch('data.json')` without the `./`). This is consistent with clips.html which already works. Do not change the pattern.

### Pitfall 6: Gallery Layout Breaks on Mobile Due to Wrong max-width Container

**What goes wrong:** Gallery items are crushed into a single narrow column at mobile widths if the `<main>` uses `max-width: 720px` (the content-column width).
**Why it happens:** The photography page needs `--max-width-wide` (1100px), not `--max-width-content` (720px).
**How to avoid:** Use a new `.photo-page` class on `<main>` instead of reusing `.page-content`. CSS Grid's `minmax(280px, 1fr)` handles column collapse gracefully once the container is wide enough.

---

## Code Examples

### data.json photos array shape (what captions must replace)

```json
{
  "file": "images/photo-01.jpg",
  "caption": "PLACEHOLDER — one sentence of story context",
  "credit": "Grace Gormley",
  "alt": "PLACEHOLDER — accessible description"
}
```

The `credit` field is already populated ("Grace Gormley") on all entries. Only `caption` and `alt` need replacing.

### Complete photos.html page structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Photography — Grace Gormley</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..800;1,6..72,300..800&family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <script type="module" src="components.js"></script>
</head>
<body>
  <site-nav></site-nav>
  <main class="photo-page">
    <h1>Photography</h1>
    <div id="photo-grid" class="photo-grid"></div>
  </main>
  <dialog id="lightbox" class="photo-lightbox" aria-label="Photo lightbox">
    <!-- lightbox interior here -->
  </dialog>
  <site-footer></site-footer>
  <script>
    /* fetch + render + lightbox JS */
  </script>
</body>
</html>
```

Note: `<dialog>` is placed outside `<main>` (it is a modal overlay, not page content).

### Lightbox CSS additions for style.css

```css
/* Photography page — Phase 4 */
.photo-page {
  max-width: var(--max-width-wide);
  margin: var(--space-12) auto;
  padding: 0 var(--space-8);
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-4);
  margin-top: var(--space-8);
}

.photo-thumb {
  aspect-ratio: 3 / 2;
  overflow: hidden;
  border-radius: var(--border-radius);
  cursor: pointer;
  background: var(--color-bg-subtle);
  border: none;
  padding: 0;
}

.photo-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform var(--transition-fast);
}

.photo-thumb:hover img,
.photo-thumb:focus img {
  transform: scale(1.03);
}

.photo-lightbox {
  border: none;
  background: transparent;
  max-width: 90vw;
  max-height: 90vh;
  padding: 0;
}

.photo-lightbox::backdrop {
  background: rgba(0, 0, 0, 0.88);
}

.lightbox-figure {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-figure img {
  max-width: 85vw;
  max-height: 80vh;
  object-fit: contain;
  display: block;
  border-radius: var(--border-radius);
}

.lightbox-caption {
  color: #ffffff;
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  text-align: center;
  margin-top: var(--space-3);
  max-width: 600px;
}

.lightbox-close,
.lightbox-prev,
.lightbox-next {
  position: fixed;
  background: rgba(255,255,255,0.15);
  border: none;
  color: #ffffff;
  font-size: var(--text-xl);
  cursor: pointer;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--border-radius);
  transition: background var(--transition-fast);
}

.lightbox-close { top: var(--space-4); right: var(--space-4); }
.lightbox-prev  { top: 50%; left: var(--space-4); transform: translateY(-50%); }
.lightbox-next  { top: 50%; right: var(--space-4); transform: translateY(-50%); }

.lightbox-close:hover,
.lightbox-prev:hover,
.lightbox-next:hover {
  background: rgba(255,255,255,0.3);
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| CSS `position: fixed` modal div | Native `<dialog>` element | Baseline 2022 (all major browsers) | Focus trap, backdrop, and z-index are handled natively — no custom JS needed for those concerns |
| JavaScript media query listeners for responsive grids | CSS Grid `auto-fill` + `minmax()` | CSS Grid widely supported since 2017 | Zero breakpoint media queries needed for column collapse |
| Intersection Observer for lazy loading | Native `loading="lazy"` attribute | Baseline 2022 | One attribute replaces ~20 lines of Intersection Observer code |
| External lightbox libraries (Magnific Popup, Fancybox) | Vanilla JS + `<dialog>` | 2020+ as `<dialog>` matured | No CDN dependency; no install step; full control |

**Deprecated/outdated:**
- Magnific Popup / Fancybox / Swipebox: jQuery-dependent lightbox libraries. jQuery is not in this stack and these libraries add weight with no benefit over native dialog.
- `<figure>` wrapping lightbox with `position: fixed` manually: Replaced by `<dialog>.showModal()`.

---

## Open Questions

1. **Which 8–12 photos should appear in the gallery (curation)?**
   - What we know: data.json has 13 entries; the success criteria says 8–12; the Phase 1 decision says "use photos already in the project folder"
   - What's unclear: Whether Grace wants all 13 shown, or wants to exclude any; which ones are the strongest photojournalism examples
   - Recommendation: Include all 13 by default (the data.json renders whatever is in the array). If Grace wants to exclude any, she removes the entry from data.json. Document this as the curation mechanism in the plan.

2. **Are photo-12 and photo-13 worth keeping at reduced quality, or should they be excluded from the gallery?**
   - What we know: Both exceed 400 KB; both can be recompressed with sips; they are currently in data.json
   - What's unclear: Whether re-compression at lower quality degrades the photos visibly
   - Recommendation: Re-compress at formatOptions 65 (same as others), check visual result, include unless quality is unacceptable. Do not remove from data.json before the visual check.

3. **Should photo captions be populated before or after the HTML/CSS is written?**
   - What we know: All 13 captions are PLACEHOLDER; PHOTO-03 blocks on real captions; Grace must provide them
   - What's unclear: Whether Grace will provide captions before the plan executes or if the plan must ship with a "caption review" task
   - Recommendation: Make caption population the first task in the phase plan. Without real captions, PHOTO-03 cannot be verified. If Grace cannot provide them before execution, the plan must ship with a verification step that confirms no PLACEHOLDER strings remain.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — manual verification consistent with previous phases |
| Config file | None |
| Quick run command | Open `photos.html` via `python3 -m http.server` and verify visually |
| Full suite command | Manual checklist per PHOTO-01, PHOTO-02, PHOTO-03 |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PHOTO-01 | Grid renders 8–13 photos from data.json | Manual smoke | `python3 -m http.server` + browser open `photos.html` | ❌ Wave 0 |
| PHOTO-01 | Grid loads completely in under 3 seconds | Manual timing | Chrome DevTools Network tab, simulate Fast 3G | ❌ Wave 0 |
| PHOTO-02 | Clicking thumbnail opens lightbox with full-size image | Manual interaction | Click each thumbnail; confirm dialog opens | ❌ Wave 0 |
| PHOTO-02 | Arrow keys navigate photos in lightbox | Manual interaction | Arrow left/right while lightbox open | ❌ Wave 0 |
| PHOTO-02 | Escape key closes lightbox | Manual interaction | Press Escape while lightbox open | ❌ Wave 0 |
| PHOTO-02 | Swipe closes/navigates on mobile | Manual interaction | Chrome DevTools mobile emulation, swipe left/right | ❌ Wave 0 |
| PHOTO-03 | All captions are real story context (no PLACEHOLDER) | Automated grep | `grep -c "PLACEHOLDER" data.json` returns 0 for photos section | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** Open photos.html in browser via local server; confirm grid renders and lightbox opens on click
- **Per wave merge:** Full manual checklist: all interaction modes (keyboard, touch, mouse), caption spot-check, file size check
- **Phase gate:** Full checklist green + `grep` confirms no PLACEHOLDER in photos captions before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] Manual verification checklist document (inline in PLAN.md verification task)
- [ ] `grep -c "PLACEHOLDER" data.json` command — confirms PHOTO-03 before ship
- [ ] File size check: `ls -lh images/photo-12.jpg images/photo-13.jpg` — must show < 400 KB

*(No automated test framework needed — consistent with all previous phases)*

---

## Sources

### Primary (HIGH confidence)

- Project source files (`data.json`, `style.css`, `components.js`, `clips.html`, `photos.html`) — directly read; schema, tokens, and patterns confirmed from the actual codebase
- Phase 1 RESEARCH.md — confirmed photo naming convention (photo-01 through photo-13), image optimization approach (sips), and the two oversized images flagged for Phase 4
- Phase 3 RESEARCH.md — confirmed fetch-and-render pattern as project standard
- STATE.md accumulated decisions — confirmed no-build constraint, GitHub Pages deployment, data.json as content API
- MDN Web Docs (dialog element, CSS Grid, loading="lazy") — well-established baseline APIs

### Secondary (MEDIUM confidence)

- CSS `<dialog>` baseline browser support: Chrome 37+, Firefox 98+, Safari 15.4+ — confirmed widely available as of 2026; verified against known baseline
- Touch swipe detection: 50px threshold pattern is community-standard for `touchstart/touchend` delta detection — multiple sources consistent

### Tertiary (LOW confidence)

- Load time estimate (3-second target): Based on 13 images averaging ~430 KB each = ~5.6 MB total; lazy loading should defer most off-screen images; actual load time depends on connection speed and browser caching

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all patterns verified against live project files; no new dependencies
- Architecture: HIGH — fetch-and-render and CSS token patterns confirmed from existing pages; `<dialog>` is a well-established browser baseline
- Pitfalls: HIGH — photo-12/13 oversizing confirmed from `ls -lh`; PLACEHOLDER captions confirmed from data.json read; other pitfalls are known CSS/JS interaction patterns

**Research date:** 2026-04-06
**Valid until:** 2026-06-01 (stable browser APIs; no versioned dependencies to expire)
