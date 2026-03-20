# Phase 1: Foundation — Research

**Researched:** 2026-03-20
**Domain:** CSS design systems (custom properties), JSON schema design, image optimization for static web
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SITE-05 | Grace can update clips, photos, and awards by editing a single `data.json` file without touching HTML or CSS | JSON schema design patterns; GitHub web editor workflow; fetch-and-render contract documented in ARCHITECTURE.md |
| SITE-06 | Site uses modern minimal editorial design (clean whitespace, Newsreader + Inter typography, no decorative clutter) | CSS custom property token system; Google Fonts loading; editorial typography scale patterns |
| PHOTO-04 | Gallery uses images from the existing project folder (compressed to web size before use) | macOS `sips` for batch resize/compression; all 14 images measured — 9 are at 5184px wide, 3 need resampling, 1 is a 6000px DSLR file; headshot is already web-sized |
</phase_requirements>

---

## Summary

Phase 1 delivers the two artifacts everything else in the project depends on: `style.css` (the complete CSS design token system) and `data.json` (the single content-editing surface), plus a web-optimized `images/` folder. No pages are built in this phase — the outputs of Phase 1 are the substrate that Phases 2–6 are built on top of.

The CSS work is narrow: define a `:root` block of custom properties covering colors, a type scale, and spacing, then import Newsreader and Inter from Google Fonts. There is no layout to build yet. The design constraint to enforce here is editorial restraint — two typefaces, a neutral palette, no decorative properties. Getting this wrong now is cheap to fix; getting it wrong after 7 pages are built is expensive.

The data schema work is also narrow but consequential: the shape of `data.json` is the contract between Grace's editing workflow and every page's render script. Wrong field names discovered in Phase 3 mean touching multiple files. The schema should be defined completely in Phase 1 — populated with real content for sections that have it (clips, photos, awards) and with clearly labeled placeholder entries for sections that need later input (video embed URLs). The image optimization work is mechanical but blocking: 12 of the 14 images in the project folder are at 5000–6000px and 5–7 MB each. The `sips` tool is available on this macOS machine and handles resize + JPEG recompression natively with no installation required.

**Primary recommendation:** Build `style.css` (tokens only, no layout), `data.json` (complete schema with real content), and `images/` (all files compressed to ≤400 KB, ≤2000px) as three discrete tasks in this phase. Do not start building HTML pages.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| CSS Custom Properties | Native (CSS3) | Design token system — colors, type scale, spacing, all defined in `:root` | 98%+ browser support; no preprocessor needed; the token set defined here is the single source of design truth for all 7 pages |
| Google Fonts: Newsreader | Variable font (6..72 optical, 300..800 weight) | Editorial serif — display headlines and body text | Specifically designed for digital news/editorial layouts; extended weight range; the right choice for a journalism portfolio; confirmed available on Google Fonts CDN |
| Google Fonts: Inter | Variable (all weights) | UI sans-serif — navigation, labels, metadata, small text | Cleanest modern sans-serif for interface chrome; pairs cleanly with Newsreader; no visual competition |
| JSON (data.json) | N/A | Single editable content file for all clips, photos, awards, video embeds | Parsed natively by JavaScript fetch + response.json(); no parser library; human-readable; GitHub web editor handles it without code knowledge |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| macOS `sips` | System (macOS built-in) | Batch resize and recompress JPEGs in-place | Use in Phase 1 image optimization task — available on this machine, no installation required, handles the 5184px → 2000px resize and JPEG quality setting |

### What NOT to Use

| Avoid | Why |
|-------|-----|
| Sass / SCSS | CSS custom properties replace the need entirely; adding a preprocessor adds a build step with no benefit |
| CSS frameworks (Bootstrap, Tailwind) | Bootstrap overrides fight editorial design; Tailwind requires build step and produces utility-class HTML. Hand-authored CSS is 300–500 lines total for this site |
| PostCSS / any build tool | No build step is a hard constraint; GitHub Pages serves plain files |
| WebP conversion (for Phase 1) | `sips` cannot write WebP (confirmed — only reads it). JPEG at ~70% quality targeting ≤400 KB is the correct optimization path on this machine. WebP is an enhancement for a future phase if needed |

### Installation / Loading

```html
<!-- In <head> of every page — load fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..800;1,6..72,300..800&family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600&display=swap" rel="stylesheet">

<!-- In <head> of every page — load design system -->
<link rel="stylesheet" href="style.css">
```

```bash
# Image optimization — macOS sips, no installation needed
# Resize to 2000px on longest edge, then check file size
sips -Z 2000 "source.jpg" --out "images/photo-01.jpg"
# If file is still over 400 KB, recompress:
sips -s format jpeg -s formatOptions 70 "images/photo-01.jpg" --out "images/photo-01.jpg"
```

No npm install. No package.json. No node_modules.

---

## Architecture Patterns

### Recommended File Structure (Phase 1 creates)

```
grace-portfolio/              <- repository root
├── style.css                 <- PHASE 1: design token system
├── data.json                 <- PHASE 1: complete content schema
└── images/                   <- PHASE 1: web-optimized photos
    ├── headshot.jpg          <- already web-sized (1600x1200, 834 KB — still needs compression to ~300 KB)
    ├── photo-01.jpg          <- renamed, compressed from fave2.JPG (5184px, 4.9 MB)
    ├── photo-02.jpg          <- renamed, compressed from IMG_0307 copy.JPG
    ├── photo-03.jpg          <- and so on for all portfolio images
    └── ...
```

Pages (`index.html`, `clips.html`, etc.) are NOT created in Phase 1. They are built in Phase 2 and beyond, once the design system and data schema are locked.

### Pattern 1: CSS Custom Property Token System

**What:** Define all design decisions as CSS custom properties in a single `:root` block in `style.css`. Every other rule in the file references tokens — never hardcoded values. This makes the design system editable by changing one value in one place.

**When to use:** Always — this is the entire output of the style.css task.

**Structure:**

```css
/* style.css — Phase 1 output */
/* Source: MDN CSS Custom Properties — https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties */

:root {
  /* --- Typography --- */
  --font-editorial: 'Newsreader', Georgia, serif;
  --font-ui: 'Inter', system-ui, sans-serif;

  /* Type scale — editorial sizes */
  --text-xs:   0.75rem;   /* 12px — captions, credits */
  --text-sm:   0.875rem;  /* 14px — metadata, nav items */
  --text-base: 1rem;      /* 16px — body copy */
  --text-lg:   1.125rem;  /* 18px — subheadings */
  --text-xl:   1.5rem;    /* 24px — section headings */
  --text-2xl:  2rem;      /* 32px — page titles */
  --text-3xl:  2.75rem;   /* 44px — hero display size */

  /* Line heights */
  --leading-tight:  1.2;
  --leading-body:   1.6;
  --leading-loose:  1.8;

  /* --- Colors — editorial neutral palette --- */
  --color-ink:          #1a1a1a;  /* near-black for all body text */
  --color-ink-muted:    #555555;  /* secondary text: publication names, dates */
  --color-border:       #e0e0e0;  /* dividers, card borders */
  --color-bg:           #ffffff;  /* page background */
  --color-bg-subtle:    #f9f8f6;  /* subtle off-white for section backgrounds */
  --color-accent:       #1a3a5c;  /* single accent — deep navy, used sparingly */
  --color-link:         #1a3a5c;  /* links match accent */
  --color-link-hover:   #0f2540;  /* slightly darker on hover */

  /* --- Spacing scale (8px grid) --- */
  --space-1:  0.25rem;  /*  4px */
  --space-2:  0.5rem;   /*  8px */
  --space-3:  0.75rem;  /* 12px */
  --space-4:  1rem;     /* 16px */
  --space-6:  1.5rem;   /* 24px */
  --space-8:  2rem;     /* 32px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-24: 6rem;     /* 96px */

  /* --- Layout --- */
  --max-width-content:  720px;   /* readable column width for body text */
  --max-width-wide:    1100px;   /* full-page containers, nav, gallery */
  --border-radius:       4px;

  /* --- Transitions --- */
  --transition-fast: 150ms ease;
}

/* Base reset and typography — applies globally */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: var(--font-ui);
  font-size: var(--text-base);
  line-height: var(--leading-body);
  color: var(--color-ink);
  background: var(--color-bg);
}

h1, h2, h3, h4 {
  font-family: var(--font-editorial);
  line-height: var(--leading-tight);
}

a {
  color: var(--color-link);
  text-decoration: underline;
  text-underline-offset: 2px;
}
a:hover { color: var(--color-link-hover); }
```

**Editorial restraint check:** A blank page rendered with this stylesheet should look like the front matter of a quality magazine — nothing interesting, just clean type on white. If it looks designed, simplify.

### Pattern 2: data.json Complete Schema

**What:** A single JSON file at the repository root containing all Grace's editable content. Every content page fetches this file and renders from it. The schema is defined completely in Phase 1 even if some sections (video) only have placeholder entries.

**When to use:** Always — this is the entire output of the data.json task.

**Contract:** Field names in `data.json` are the interface between Grace's editing workflow and the page render scripts written in Phases 3–6. Changing a field name after Phase 3 requires updating both `data.json` and all render scripts that reference it.

```json
{
  "_schema_version": "1.0",
  "_instructions": "Edit this file to update site content. Add/remove items from arrays to add/remove content. Do not change field names — they are used by the site code. Date format: YYYY-MM-DD.",

  "clips": [
    {
      "title": "Hundreds gather at 'Good Trouble Lives On' event",
      "publication": "Palo Alto Online",
      "date": "2025-07-18",
      "url": "https://www.paloaltoonline.com/social-justice/2025/07/18/hundreds-gather-at-good-trouble-lives-on-event/",
      "pdf_fallback": "",
      "featured": true,
      "note": "Covered a local event on quick turnaround. All photos shot and edited by Grace."
    }
  ],

  "photos": [
    {
      "file": "images/photo-01.jpg",
      "caption": "Caption describing story context — not a filename",
      "credit": "Grace Gormley",
      "alt": "Accessible description of the image for screen readers"
    }
  ],

  "videos": [
    {
      "title": "What Can We Do?",
      "embedUrl": "PLACEHOLDER — YouTube or Vimeo embed URL needed from Grace",
      "description": "A video package about [topic]. Produced and edited by Grace Gormley."
    },
    {
      "title": "Move Your Feet",
      "embedUrl": "PLACEHOLDER — YouTube or Vimeo embed URL needed from Grace",
      "description": "A video package about [topic]. Produced and edited by Grace Gormley."
    }
  ],

  "awards": [
    {
      "name": "1st Place National Nonfiction Article",
      "organization": "Columbia Scholastic Press Association (Gold Circle)",
      "year": "2023",
      "article_title": "California: Taking a Gamble?",
      "url": "https://vikingsportsmag.com/uncategorized/2022/10/11/california-taking-a-gamble/",
      "pdf_fallback": "https://drive.google.com/file/d/1g1tYtdBLbpTn2_88DlSdpIoH4n1Z5cwp/view?usp=sharing"
    }
  ],

  "press_coverage": [
    {
      "outlet": "Verde Magazine",
      "title": "Journey Into Journalism",
      "url": "https://verdemagazine.com/journey-into-journalism",
      "description": "Feature about SUSO camp. Quote from Executive Director of DreamCatchers Nicole Chiu-Wang."
    }
  ],

  "about": {
    "name": "Grace Gormley",
    "tagline": "Journalism and data science student at Northwestern University Medill",
    "bio": "I am a journalism and data science double major in my sophomore year at Northwestern University, in the Medill School of Journalism. I strive to combine my data science skills with people-centric reporting to hold those in power accountable and tell important stories. I get excited about investigative and watchdog journalism driven by data.",
    "headshot": "images/headshot.jpg",
    "headshot_credit": "Anna Hoch-Kenney",
    "email": "gracegormley@gmail.com",
    "linkedin": "https://www.linkedin.com/in/grace-gormley/",
    "resume_pdf": "assets/resume.pdf"
  },

  "knight_lab": {
    "project_name": "EIS Archives",
    "subtitle": "World's Largest Exploratory EIS Database",
    "live_url": "https://nulib-ds.github.io/EIS-Final/",
    "grace_role": "AI Team Lead — Metadata Pipeline",
    "description": "PLACEHOLDER — Content brief with Grace needed before writing this section.",
    "tools": ["BERTopic", "OCR", "topic modelling", "local LLMs", "GPT-4", "Claude Code", "supercompute cluster"]
  },

  "suso_camp": {
    "overview": "Stand Up, Speak Out: Journalism for Young Activists is a project Grace undertook for her Girl Scout Gold Award.",
    "website_url": "https://susocamp.weebly.com/",
    "pillars": [
      {
        "name": "Writing",
        "description": "Over 70 students wrote articles with research and peer quotes about topics they care about."
      },
      {
        "name": "Public Speaking",
        "description": "Students rehearsed and read their articles aloud to classrooms, building confidence in public speaking."
      },
      {
        "name": "Results",
        "description": "Student stories were compiled into three printed magazines. Nearly $1,000 was fundraised to print over 200 total magazines."
      },
      {
        "name": "Longevity",
        "description": "Grace created a website with all resources needed to replicate the camp. The camp continued in 2024 with DreamCatchers without her direct involvement."
      }
    ],
    "impact": "~70 students, 200+ magazines printed, camp continued without Grace"
  }
}
```

### Pattern 3: Image Optimization with `sips` (macOS)

**What:** Use the macOS built-in `sips` command-line tool to resize and recompress every image before placing it in `images/`. This tool is confirmed available on this machine with no installation needed.

**Target spec:** ≤2000px on the longest edge, ≤400 KB file size, JPEG format.

**Current image inventory (measured 2026-03-20):**

| Original File | Dimensions | File Size | Action Needed |
|---------------|------------|-----------|---------------|
| `fave2.JPG` | 5184 × 3456 | 4.9 MB | Resize to 2000px, recompress |
| `IMG_0307 copy.JPG` | 5184 × 3456 | 5.9 MB | Resize to 2000px, recompress |
| `IMG_0632 copy.JPG` | 5184 × 3456 | 6.0 MB | Resize to 2000px, recompress |
| `IMG_8141 copy.JPG` | 5184 × 3456 | 4.5 MB | Resize to 2000px, recompress |
| `IMG_8321 copy.JPG` | 5184 × 3456 | 6.3 MB | Resize to 2000px, recompress |
| `IMG_8601 copy.JPG` | 5184 × 3456 | 5.4 MB | Resize to 2000px, recompress |
| `IMG_8734 copy.JPG` | 5184 × 3456 | 5.1 MB | Resize to 2000px, recompress |
| `IMG_9609.JPG` | 5184 × 3456 | 5.5 MB | Resize to 2000px, recompress |
| `IMG_9697 copy.JPG` | 5184 × 3456 | 5.9 MB | Resize to 2000px, recompress |
| `Lucy dive (also rly good).jpg` | 6000 × 4000 | 6.7 MB | Resize to 2000px, recompress |
| `IMG_0720.jpg` | 2048 × 1365 | 603 KB | Already close — check after recompress |
| `IMG_0945.jpg` | 2048 × 1365 | 1.1 MB | Minor resize or recompress only |
| `IMG_8449-2 copy.jpg` | 2048 × 1365 | 996 KB | Recompress only |
| `GORMLEY, GRACE_SAMPLE_Jun2025_WEB_9 copy.jpg` | 1600 × 1200 | 834 KB | Recompress only — headshot, no resize needed |

**Two-step sips process for large files:**

```bash
# Step 1: Resize to ≤2000px on longest edge, output to images/
mkdir -p images
sips -Z 2000 "fave2.JPG" --out "images/photo-01.jpg"

# Step 2: Check resulting file size
ls -lh "images/photo-01.jpg"

# Step 3: If still over 400 KB, recompress at JPEG quality 70
sips -s format jpeg -s formatOptions 70 "images/photo-01.jpg" --out "images/photo-01.jpg"

# For the headshot (already 1600px — skip resize, just recompress)
sips -s format jpeg -s formatOptions 75 "GORMLEY, GRACE_SAMPLE_Jun2025_WEB_9 copy.jpg" --out "images/headshot.jpg"
```

**Important:** Always write to `images/` as the output. Never overwrite the originals in the project root — they are the master copies.

**Naming convention for `images/`:** Use simple, lowercase, hyphenated filenames without copy numbers, parentheticals, or spaces. The filename in `images/` is what goes into `data.json`. Examples:
- `photo-01.jpg` through `photo-13.jpg` for gallery images (or descriptive names like `good-trouble-rally.jpg`)
- `headshot.jpg` for the headshot

### Anti-Patterns to Avoid

- **Defining layout rules in style.css during Phase 1:** Layout (flexbox containers, grid columns, page-specific positioning) belongs in Phase 2+. Phase 1 `style.css` should contain only: `:root` token block, a base reset, and base typography rules. Nothing with specific layout intent.
- **Leaving the `data.json` video fields empty:** Use explicit placeholder strings (`"PLACEHOLDER — embed URL needed from Grace"`) not empty strings. Empty strings make it hard to distinguish "intentionally empty" from "not yet set."
- **Processing images in place (overwriting originals):** Always output to `images/` subfolder. Originals in the project root are the safety net.
- **Adding photos to `data.json` before the files exist in `images/`:** The JSON references `images/photo-01.jpg` — if that file doesn't exist yet, the render breaks. Create the file first, then add the JSON entry.
- **Using a color palette with more than one accent:** Two neutrals (ink, muted ink), backgrounds (white, off-white), one border color, one accent (navy). Any more and the editorial restraint is broken.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image resizing and recompression | A custom script or manual Photoshop workflow | `sips` (built-in macOS) | Available now on this machine, handles JPEG resize + quality in one or two commands, no installation |
| CSS variable naming conventions | An ad-hoc naming scheme | The `--category-property` pattern shown above | Consistent naming makes it obvious what each token controls; planner and future phases can predict token names |
| JSON schema documentation | Inline HTML comments | A `_instructions` key at the top of `data.json` | JSON doesn't support comments; a reserved `_instructions` key is the standard pattern for self-documenting JSON data files |

---

## Common Pitfalls

### Pitfall 1: Over-designing style.css in Phase 1

**What goes wrong:** The designer adds hover effects, card shadow variables, gradient tokens, and decorative spacing for elements that don't exist yet. Phase 1 `style.css` grows to 300 lines before any HTML is written.

**Why it happens:** The design system phase feels like an opportunity to anticipate every design need. It isn't — it's a constraint-setting exercise.

**How to avoid:** The Phase 1 `style.css` should be completable in under 100 lines. If a CSS rule requires a specific HTML element to make sense, it belongs in a later phase.

**Warning signs:** Any CSS rule that references a class name. Phase 1 CSS should be mostly `:root` plus element selectors (`body`, `h1`, `a`).

### Pitfall 2: sips reducing JPEG quality so far the photos look poor

**What goes wrong:** Setting `formatOptions` to 50 or below to guarantee small file sizes produces visible JPEG artifacting — blocking artifacts around contrast edges, banding in smooth gradients. A photojournalism portfolio with poor-quality photo compression is worse than a slow-loading one.

**Why it happens:** The 400 KB target feels hard to hit on 5184px originals; aggressive quality settings are the quick fix.

**How to avoid:** The resize step alone (5184px → 2000px) typically reduces a 5–6 MB JPEG to 600–900 KB. A subsequent compression to quality 70 usually brings that to 250–400 KB without visible quality loss. Test at 70 first, check visually, only go lower if the file is still too large. For portfolio photography, quality 65 is a safe floor.

**Warning signs:** If any resized file at quality 70 is still over 800 KB, something is unusual about that image (very high noise, lots of fine texture). Investigate rather than blindly reducing quality further.

### Pitfall 3: data.json schema defined without real content

**What goes wrong:** The schema is created with generic placeholder values (`"title": "Article title here"`). When Phase 3 builds the clips page, the data.json must be updated anyway — the schema validation pass and the content-population pass become two separate tasks.

**Why it happens:** Content feels like Phase 3's job. But the schema shape and the real content for the well-documented sections (clips, awards) are both known now from the reference document.

**How to avoid:** Populate `data.json` with real content for clips, awards, press coverage, about, suso_camp (all are fully known from `grace-gormley-portfolio-reference.md`). Use clear placeholders only for video embed URLs and the knight_lab description (these require Grace's input). This means Phase 3 only needs to write the render scripts — it doesn't need to stop and gather content.

**Warning signs:** Any `data.json` entry that says "TBD" or "Article title here" when the real content is already in `grace-gormley-portfolio-reference.md`.

### Pitfall 4: Renaming images without updating data.json simultaneously

**What goes wrong:** Images are optimized and renamed to `photo-01.jpg`, `photo-02.jpg`, etc., and placed in `images/`. The `data.json` photos array is updated in a separate step — or not updated at all. When Phase 4 builds the gallery, photo entries reference non-existent filenames.

**Why it happens:** Image optimization and data schema work feel like separate tasks.

**How to avoid:** Update `data.json` photo entries at the same time as each image is processed and named. The filename in `images/` and the `file` field in `data.json` must always be in sync.

### Pitfall 5: Headshot not included in image optimization pass

**What goes wrong:** The headshot (`GORMLEY, GRACE_SAMPLE_Jun2025_WEB_9 copy.jpg`) is at 1600 × 1200 px and 834 KB — it is not a gallery photo so it's forgotten in the optimization pass. On the About page, a 834 KB image that could have been 150 KB adds unnecessary page weight.

**Why it happens:** It's not in the gallery set.

**How to avoid:** The headshot is explicitly included in the Phase 1 image optimization task. Target: 1600px (no resize needed), quality 75, output as `images/headshot.jpg`. Expected result: ~200–300 KB.

---

## Code Examples

Verified, ready-to-use patterns:

### CSS Custom Properties — Complete Token Block

```css
/* Source: MDN CSS Custom Properties https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties */
:root {
  --font-editorial: 'Newsreader', Georgia, serif;
  --font-ui: 'Inter', system-ui, sans-serif;

  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.5rem;
  --text-2xl:  2rem;
  --text-3xl:  2.75rem;

  --leading-tight: 1.2;
  --leading-body:  1.6;

  --color-ink:        #1a1a1a;
  --color-ink-muted:  #555555;
  --color-border:     #e0e0e0;
  --color-bg:         #ffffff;
  --color-bg-subtle:  #f9f8f6;
  --color-accent:     #1a3a5c;
  --color-link:       #1a3a5c;
  --color-link-hover: #0f2540;

  --space-2:  0.5rem;
  --space-4:  1rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;

  --max-width-content: 720px;
  --max-width-wide:   1100px;
  --border-radius: 4px;
  --transition-fast: 150ms ease;
}
```

### Google Fonts Loading (Optimized)

```html
<!-- Source: Google Fonts documentation — https://fonts.google.com/knowledge/using_type/using_web_fonts_from_a_font_delivery_service -->
<!-- preconnect reduces font load latency -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- display=swap prevents FOIT (flash of invisible text) -->
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300..800;1,6..72,300..800&family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600&display=swap" rel="stylesheet">
```

### sips Batch Optimization (macOS)

```bash
# Source: macOS sips man page — man sips
# Process all 5184px gallery photos to images/
mkdir -p "/Users/gracegormley/Desktop/Grace's Website/images"

# Step 1: resize to 2000px longest edge
sips -Z 2000 "fave2.JPG" --out "images/photo-01.jpg"

# Step 2: if file size is still over 400 KB, recompress
# (check with: ls -lh images/photo-01.jpg)
sips -s format jpeg -s formatOptions 70 "images/photo-01.jpg" --out "images/photo-01.jpg"

# Headshot — already at 1600px, just recompress
sips -s format jpeg -s formatOptions 75 \
  "GORMLEY, GRACE_SAMPLE_Jun2025_WEB_9 copy.jpg" \
  --out "images/headshot.jpg"
```

### data.json Self-Documenting Header

```json
{
  "_schema_version": "1.0",
  "_instructions": "Edit this file to update site content. Add items to arrays to add content; remove items to remove content. Do not change field names — they are used by the site code. Date format: YYYY-MM-DD. Fields marked PLACEHOLDER need input from Grace before they can be filled.",
  ...
}
```

---

## State of the Art

| Old Approach | Current Approach | Impact for This Project |
|--------------|------------------|------------------------|
| CSS preprocessors (Sass, Less) for design tokens | CSS Custom Properties in `:root` | No build step; tokens editable in any text editor; 98%+ browser support since 2018 |
| jQuery-dependent image lightboxes | GLightbox (11 KB, no jQuery) | Used in Phase 4, not Phase 1; relevant to know when writing photo entries in data.json |
| Manual JSON editing with no schema guidance | `_instructions` key + commented schema | Grace can update content confidently 6 months after launch |
| Photoshop/Lightroom for web image optimization | `sips` (macOS built-in) | Zero install friction on this machine; adequate for 2000px JPEG target |

---

## Open Questions

1. **Photo captions for gallery images**
   - What we know: 13 photos are available; captions are required (PHOTO-03, Phase 4); the reference document does not provide captions for most photos
   - What's unclear: What story context does Grace want to provide for each photo? Some photos appear to be from articles (the "Good Trouble" event photos were shot and edited by Grace for Palo Alto Online)
   - Recommendation: Create `data.json` photo entries with placeholder captions in Phase 1; captions are filled in during Phase 4 when the gallery is built. The placeholder should make clear what format is expected: `"caption": "PLACEHOLDER — one sentence of story context, e.g., 'Swimmers compete at the 2024 CCS Championships in Santa Clara.'"`.

2. **Photo selection for gallery (curation decision)**
   - What we know: 13 photos are in the folder (plus the headshot); the gallery should show 8–12 curated photos (PITFALLS.md); not all 13 need to be used
   - What's unclear: Which photos Grace considers her strongest photojournalism work
   - Recommendation: In Phase 1, process and optimize all 13 photos. Add all 13 to `data.json` as placeholders. In Phase 4, curate down to 8–12. Curation is cheaper than re-optimization.

3. **Knight Lab section content**
   - What we know: The `knight_lab` section in `data.json` needs a full description of Grace's role; the description cannot be written without a content brief from Grace
   - What's unclear: Which tools Grace personally built vs. used vs. supervised; what the pipeline outputs look like; whether screenshots are available
   - Recommendation: Populate `knight_lab.tools` and `knight_lab.live_url` from known data. Mark `knight_lab.description` as an explicit placeholder. This content brief is a Phase 5 prerequisite, not Phase 1.

---

## Validation Architecture

`nyquist_validation` is enabled in config.json.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — Phase 1 outputs are static files, not executable code |
| Config file | None — see Wave 0 |
| Quick run command | Manual file inspection + `sips` verification |
| Full suite command | Manual checklist against Phase 1 success criteria |

For Phase 1, validation is file-inspection based, not automated. The outputs are a CSS file, a JSON file, and a folder of images — none of which have a runnable test suite. Validation is structured as a manual checklist.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SITE-06 | `style.css` defines full CSS custom property token set using Newsreader + Inter | manual | Open `style.css`, confirm `:root` block contains color, type, spacing tokens; confirm Google Fonts `@import` or `<link>` is documented | ❌ Wave 0 — file does not exist yet |
| SITE-06 | A blank page rendered with `style.css` looks editorially restrained | manual | Create a minimal `test.html` with `<link rel="stylesheet" href="style.css">` and headings/body text; open in browser; verify no decorative elements | ❌ Wave 0 |
| SITE-05 | `data.json` exists with complete schema covering clips, photos, awards, video embeds | manual | `python3 -m json.tool data.json` — exits 0 if valid JSON; visually verify all top-level keys are present | ❌ Wave 0 — file does not exist yet |
| SITE-05 | Grace can update a clip entry via GitHub's web editor without touching HTML or CSS | manual | Add a test clip entry directly in GitHub.com web editor; save; confirm it is valid JSON (no parse error on save) | ❌ Wave 0 |
| PHOTO-04 | Every photo is ≤400 KB and ≤2000px on its longest edge | automated check | `ls -lh images/*.jpg` and `sips -g pixelWidth -g pixelHeight images/*.jpg` | ❌ Wave 0 — `images/` directory does not exist yet |

### Sampling Rate

- **Per task commit:** Manual checklist — confirm target files exist and match spec
- **Per wave merge:** Run `python3 -m json.tool data.json` to validate JSON; run `sips -g pixelWidth -g pixelHeight images/*.jpg` to confirm all images ≤2000px
- **Phase gate:** All success criteria checked manually before marking Phase 1 complete

### Wave 0 Gaps

- [ ] `style.css` — does not exist; created in first task of this phase
- [ ] `data.json` — does not exist; created in second task of this phase
- [ ] `images/` directory — does not exist; created in third task of this phase
- [ ] `test.html` (temporary) — minimal page to visually validate `style.css` renders as editorially restrained; can be deleted after Phase 1 verification

---

## Sources

### Primary (HIGH confidence)

- MDN Web Docs: CSS Custom Properties — https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties — browser support, `:root` usage, custom property syntax confirmed
- MDN Web Docs: Web Components / customElements — https://developer.mozilla.org/en-US/docs/Web/API/Web_components — referenced for Phases 2+; noted here because data.json schema must be compatible with the rendering approach
- `man sips` (macOS built-in documentation) — confirms `-Z` flag for longest-edge resize, `-s format jpeg -s formatOptions N` for quality, `--out` for output path; confirmed no WebP write support on this machine
- Google Fonts documentation — https://fonts.google.com/knowledge/using_type/using_web_fonts_from_a_font_delivery_service — confirmed Newsreader and Inter availability, `display=swap` parameter, `preconnect` optimization pattern
- GitHub Pages official docs — https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages — confirmed plain static files served with no configuration; confirmed `data.json` fetch is same-origin (no CORS issues)

### Secondary (MEDIUM confidence)

- `.planning/research/STACK.md` (project research, 2026-03-19) — recommended stack for this project confirmed Newsreader + Inter, CSS custom properties, GLightbox, vanilla JS fetch pattern
- `.planning/research/ARCHITECTURE.md` (project research, 2026-03-19) — confirmed `data.json` schema shape, build order constraints, web component pattern
- `.planning/research/PITFALLS.md` (project research, 2026-03-19) — confirmed image optimization thresholds (≤400 KB, ≤2000px), editorial restraint standards
- `grace-gormley-portfolio-reference.md` (project content reference) — confirmed real clip URLs, awards data, photo inventory, headshot credit

### Tertiary (MEDIUM-LOW confidence)

- Typewolf editorial typography recommendations — Newsreader confirmed as appropriate editorial serif for digital journalism: https://www.typewolf.com/google-fonts
- JPEG quality vs. file size empirical data — quality 70 on a 2000px JPEG typically produces 200–400 KB output; quality 65 is a safe floor for photojournalism without visible artifacting (sourced from web.dev image optimization guidance and Adobe recommendations)

---

## Metadata

**Confidence breakdown:**
- CSS token system design: HIGH — CSS custom properties are well-documented and the editorial restraint criteria are clear
- data.json schema: HIGH — schema shape is fully determined by the existing architecture research and known content requirements; no ambiguity
- Image optimization tools and process: HIGH — `sips` is confirmed available on this machine; target specs (≤400 KB, ≤2000px) are established in project research; all 14 image files are measured and documented above
- Content for data.json (clips, awards, about): HIGH — all real content is available in `grace-gormley-portfolio-reference.md`; no content gaps except video URLs and Knight Lab description

**Research date:** 2026-03-20
**Valid until:** 2026-06-20 (CSS custom properties and sips are stable; Google Fonts CDN availability is stable)
