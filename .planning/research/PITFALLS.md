# Pitfalls Research

**Domain:** Static journalism portfolio website (college student, Medill/Northwestern, multi-discipline)
**Researched:** 2026-03-19
**Confidence:** HIGH (design/content pitfalls); MEDIUM (technical/workflow pitfalls specific to this stack)

---

## Critical Pitfalls

### Pitfall 1: Over-Designing the Site So the Work Disappears

**What goes wrong:**
The portfolio looks impressive as a design object but the actual journalism is buried. Animations, bold color choices, geometric layouts, and decorative flourishes pull the editor's eye away from the clips. The site becomes a statement about design taste rather than reporting skill. Editors spend their visit evaluating the aesthetic instead of the work.

**Why it happens:**
Building a custom site for the first time creates the temptation to demonstrate design ability alongside journalism ability. The builder wants the site to look impressive on first load, so they layer in personality through visual choices. For a journalism portfolio specifically, this is exactly backwards — editors at news organizations want to evaluate reporting and writing, not web design.

**How to avoid:**
Adopt a strict "white space, black text, your name, your clips" philosophy. The design should be invisible — something the editor moves through without noticing. Limit the palette to two or three neutrals plus one accent. Use a single serif or sans-serif for editorial typography, not a display typeface for every heading. Every design decision should ask "does this help the editor find the work faster?" If not, cut it.

**Warning signs:**
- More than two fonts in use
- A color that appears on every page and isn't black, white, or a single neutral
- The homepage scrolls more than one viewport before showing any work
- You're describing the site's design to people before showing it to them

**Phase to address:**
Design phase — establish the visual system and editorial direction before building any page. Define constraints (color palette, type scale, spacing) that prevent scope creep into over-design. Do not iterate on visual flourishes after the system is set.

---

### Pitfall 2: Including Every Clip Rather Than the Best Clips

**What goes wrong:**
The clips page has 30+ articles because the builder assumes more = more impressive. Editors skim the first three to five entries, form an impression, and stop. The weakest clips (freshman-year class assignments, thin news briefs, wire rewrites) dilute the strongest work. Editors encounter mediocre work before they find the best pieces.

**Why it happens:**
Students conflate volume with credibility. It feels risky to leave clips out — what if the editor wanted to see that story? In reality, editors use a portfolio to form a quick professional impression, not to audit a complete work history. A page with 30 clips cannot do justice to any single one of them.

**How to avoid:**
Publish 8–15 clips maximum. Lead with the three strongest regardless of date. Organize by type (longform, breaking news, data, photo essay) rather than strictly chronologically, so an editor applying for a specific role can find relevant samples immediately. Remove any clip that requires apologetic context ("this was for a class" or "I was very new at the time"). If a clip lives behind a paywall, find an archived or PDF version rather than linking to a blocked page.

**Warning signs:**
- More than 15 clips on the main clips page
- Any clip included because "it shows I can write [basic format]" rather than because it's good
- Clips from freshman writing classes appear alongside professional bylines
- The clips are sorted strictly by date with the weakest work at the top

**Phase to address:**
Content curation phase — define a selection rubric before building the clips page. The rule: every clip must pass "would I send this to a top-tier editor cold?" If no, it doesn't belong.

---

### Pitfall 3: Broken External Links That Make Work Inaccessible

**What goes wrong:**
The clips list links to live article URLs. Publications archive, restructure, or take down stories. The editor clicks a byline and gets a 404 page or paywall. For a journalism portfolio, where the entire purpose is to show the work, a broken link is a complete failure — it's worse than not listing the clip at all.

**Why it happens:**
Links work at build time and the portfolio is never checked again. News publications (especially student papers like The Daily Northwestern, NBCUniversal affiliates, regional outlets) restructure URLs regularly. The builder assumes URLs are permanent because they work today.

**How to avoid:**
For every external clip link, save a PDF backup or a web archive (archive.org) copy at build time. On the clips page, offer both the live link and the "archived version" link or PDF fallback. Add a monthly calendar reminder to click-test all external links. For the most important clips, host a PDF copy in the repo itself so the fallback is always available.

**Warning signs:**
- Any link that goes to a student newspaper archive without verification it still works
- Links to Wix or other builder exports that may break if the old site is taken down
- No fallback mechanism (PDF, archive) for any external link
- The site hasn't been tested since it launched

**Phase to address:**
Content + deployment phase — before launch, click-test every single link. Build the PDF fallback workflow into the clips data structure from the start so it's easy to add later. The JSON data model for clips should include both `url` and `pdf_fallback` fields.

---

### Pitfall 4: Unoptimized Photos That Make the Site Painfully Slow

**What goes wrong:**
The photography gallery loads 13 full-resolution JPEGs — some potentially 10–20 MB each from a DSLR or mirrorless camera. The page takes 15–30 seconds to load on a mobile connection. Editors who open the portfolio on a phone or a slower connection give up before seeing any of the photography work. The photography section, which should be a strength, becomes a liability.

**Why it happens:**
The photos are already in the project folder at their original camera resolution. It feels like extra work to create web-optimized copies, and the builder tests on a fast Wi-Fi connection where the problem is invisible.

**How to avoid:**
Before deployment, process every photo for web: resize to a maximum of 2000px on the longest edge, compress to under 400KB per file (JPEG at ~80% quality, or convert to WebP which runs 25–34% smaller). Keep originals separately. Implement `loading="lazy"` on all gallery images so above-the-fold content loads first. Test the photography page on a throttled connection (Chrome DevTools → Network → Slow 3G) before launch.

**Warning signs:**
- Any image file in the project folder larger than 2MB
- The photography page takes more than 3 seconds to reach first paint on a fast connection
- Images are served at camera native resolution (5000+ px wide)
- No lazy loading attribute on gallery `<img>` tags

**Phase to address:**
Asset preparation phase — do not add photos to the site before optimizing them. This is a one-time process before the photography section is built. Establish a simple workflow: squoosh.app or ImageMagick batch resize + compress → copy to web-assets folder → add to JSON.

---

### Pitfall 5: The Site Is Impossible to Update, So It Goes Stale

**What goes wrong:**
The portfolio launches and looks great. Three months later, Grace has ten new bylines, two new photo essays, a video package, and a Knight Lab update — but updating the site means editing HTML in multiple places, and it feels like a project. The clips section stays frozen at launch. Editors see a portfolio where the most recent work is eight months old, which signals either inactivity or that the site is effectively abandoned.

**Why it happens:**
Content is hardcoded into HTML files rather than driven by a data file. Adding a clip means opening a page, finding the right HTML block, copying it, editing it, and hoping nothing breaks. This friction is high enough that it doesn't happen consistently. Even with a JSON data file, if the JSON structure is undocumented or confusing, the same stale-site problem occurs.

**How to avoid:**
The JSON data file must be the single source of truth for all content — clips, photos, awards, video embeds, and Knight Lab updates. The schema must be simple enough to edit in under two minutes without opening a code editor (a plain text editor is sufficient). Document the schema with a comment block at the top of the JSON file. The JavaScript that renders content should pull from the data file on every page load, not have any content duplicated in HTML.

**Warning signs:**
- Content is hardcoded in HTML instead of loaded from the data file
- No schema documentation in the JSON file
- Adding a clip requires touching more than one file
- The site hasn't been updated in more than 60 days after launch

**Phase to address:**
Architecture phase — the JSON schema and JavaScript rendering layer must be designed before any content is added. Test the update workflow explicitly: time how long it takes to add a new clip from scratch. Target under three minutes including saving and pushing to GitHub.

---

### Pitfall 6: No Mobile-Responsive Layout

**What goes wrong:**
The site looks professional on a laptop but is unreadable on a phone. Navigation items overlap or don't collapse. The clips list has a horizontal table that forces horizontal scrolling. The photography grid displays at full desktop width with no wrapping. Editors who open the portfolio on their phone during a commute or between meetings get an unusable experience and don't come back.

**Why it happens:**
Development and testing happens exclusively on a desktop browser. The builder never loads the site on an actual phone. Layout bugs on mobile are invisible until someone tries.

**How to avoid:**
Design mobile-first: start with the single-column mobile layout, then add breakpoints for tablet and desktop. Use CSS Flexbox or Grid with `flex-wrap: wrap` and relative units (`%`, `vw`, `rem`) rather than fixed pixel widths. Test every page at 375px wide (iPhone SE) and 414px wide (standard iPhone) before marking any page complete. The navigation must collapse to a hamburger or a simple vertical list on small screens.

**Warning signs:**
- Fixed-width containers using `px` values wider than 375px
- Navigation links that don't fit on one line at 375px width
- Any layout that hasn't been viewed in Chrome DevTools → responsive mode
- Tables for clip listings rather than styled `<ul>` lists

**Phase to address:**
Design and build phase — mobile responsiveness must be part of the CSS from day one, not a retrofit. Every component should be tested at 375px before moving on.

---

### Pitfall 7: Burying or Misrepresenting the Data Science + Knight Lab Work

**What goes wrong:**
The Knight Lab and data science work is the strongest differentiator on this portfolio — a Medill journalism student who built a BERTopic metadata pipeline on a supercompute cluster is genuinely rare. But the page describes it in vague terms ("I worked on the AI team") or buries it as a list item rather than a featured showcase. Editors and digital journalism directors who would most value this work never realize its significance.

**Why it happens:**
Students underestimate the rarity of their technical work relative to other journalism applicants. They use the same modest tone they'd use for any clip description. Technical details are omitted because they feel like jargon, but editors at data journalism desks (NYT Graphics, The Markup, Reuters Graphics, FiveThirtyEight successors) specifically want those details.

**How to avoid:**
The Knight Lab page should lead with the outcome and scale ("World's Largest Exploratory EIS Database — built the metadata pipeline that powered the entire site"), then explain the technical work in plain language (BERTopic, OCR, LLMs, supercompute cluster), then link to the live project. Use screenshots or a brief visual of the outputs. Make it clear what Grace specifically built, not what the team built. This page should be visible from the homepage — not hidden three clicks deep.

**Warning signs:**
- The Knight Lab page uses passive voice ("the pipeline was built using...")
- No screenshots or visuals of the actual outputs
- The technical stack (BERTopic, Claude, GPT-4, supercompute) isn't mentioned by name
- The page requires the reader to know what Knight Lab is without explanation

**Phase to address:**
Content and information architecture phase — the Knight Lab page needs a specific content brief before it's built, not freeform copy written at the last minute.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoding clip content in HTML | Faster to build first page | Every update requires HTML edits; site goes stale | Never — the JSON data model prevents this |
| Serving original camera JPEGs without compression | No extra processing step | 15–30s page load times on mobile; photography section unusable | Never for a live public portfolio |
| Using a single flat JSON file with no schema comments | Quick to start | Grace can't remember the structure 6 months later; update friction kills consistency | Acceptable if heavily commented |
| Testing only on desktop Chrome | Saves time during development | Mobile layout bugs stay invisible until an editor sees them | Never — test at 375px before marking any page done |
| Linking to clips without PDF fallbacks | No extra asset management | 404s appear as bylines disappear; core portfolio function breaks | Never for the top 10 most important clips |
| Embedding external video with no fallback text | Easy iframe embed | If video is unlisted, taken down, or embed restricted, the video section shows a broken player | Acceptable if there's a backup link |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| GitHub Pages | Assuming `index.html` paths work as-is; case-sensitive URLs on Linux servers vs. macOS dev | Test all internal links after deployment, not just locally. GitHub Pages runs Linux — `About.html` and `about.html` are different files |
| YouTube/Vimeo embeds | Using autoplay embeds that fire audio immediately | Set `autoplay=0` explicitly; use `loading="lazy"` on iframes; provide a poster image or thumbnail |
| External article links | Assuming links that work today will work next month | Build `pdf_fallback` into the data schema from day one |
| Resume PDF | Hotlinking the PDF from another location | Host the PDF in the repo itself. Never link to a Wix-hosted PDF or Google Drive — those can break |
| Google Fonts / external CDN fonts | Loading 3–4 font weights from Google CDN | Either self-host fonts in the repo or use a single system font stack. No CDN font dependency = no external request failure |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Full-resolution photos in gallery | 15–30s load on mobile; Lighthouse score below 50 | Batch compress and resize to ≤400KB/2000px before adding to repo | Immediately on any mobile connection |
| No lazy loading on image gallery | All 13 photos load on page open even if user never scrolls to them | `loading="lazy"` on every `<img>` below the fold | Any connection slower than fast Wi-Fi |
| Inline SVG icons or heavy decorative assets | Cumulative layout shift; slower parse time | Use CSS shapes or a single lightweight icon file | At around 10+ inline SVGs |
| JS that blocks page render | Content invisible until JS finishes | Use `defer` attribute on all script tags; no render-blocking scripts | Even on desktop if JS file is large |
| Unminified CSS/JS | Slightly slower parse on repeat visits | Minify before deployment or use a simple build step | Not critical at this scale, but good practice |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No clear professional identity on homepage | Editor doesn't know what type of journalist Grace is within 5 seconds | The homepage headline states name + role + specialty: "Grace Gormley — Data Journalist and Reporter, Northwestern University Medill" |
| Clips sorted newest-first without curation | Weakest or most generic work appears first | Lead with three strongest clips regardless of date; use featured/pinned logic |
| Contact info only on a dedicated Contact page | Editor who wants to reach out has to navigate to find email | Email and LinkedIn in the footer of every page |
| Navigation with too many pages at once | Cognitive overload; editor doesn't know where to start | Group related pages or use a clear visual hierarchy in the nav |
| Awards section as a dead-end list | Awards feel like CV padding without context | Link each award to the piece it recognized; brief one-sentence description of why |
| Video section with no fallback if embeds are unavailable | Blank section or broken player if video URLs aren't provided | Placeholder with text "Video packages available upon request" until URLs are confirmed |

---

## "Looks Done But Isn't" Checklist

- [ ] **All external clip links:** Click every single one. 404 = not done.
- [ ] **Mobile layout:** Load every page on a real phone or at 375px in DevTools. Broken nav or overflow = not done.
- [ ] **Photography gallery load time:** Open in an incognito tab on a throttled connection. More than 5 seconds = not done.
- [ ] **Resume PDF:** Click the download link from the live deployed site. Confirm it opens the right file. Broken path = not done.
- [ ] **Video embeds:** Load the video section. If the YouTube/Vimeo URLs aren't confirmed yet, placeholder must be in place — empty iframe = not done.
- [ ] **Contact info footer:** Check every page for the footer. One page missing it = not done.
- [ ] **JSON data schema comment block:** Open the data file. If there are no comments explaining the fields, update workflow is too risky — not done.
- [ ] **Knight Lab page:** Does it name the specific technical tools Grace used? Does it link to the live site? Does it have at least one visual/screenshot? All three = required.
- [ ] **Headshot photo credit:** Photo is by Anna Hoch-Kenney — the credit must appear on or near the photo. Missing = not done.
- [ ] **Page title tags:** Every page should have a descriptive `<title>` tag, not just "index" or the framework default. Generic titles = not done.

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Over-designed site | MEDIUM | Strip decoration layer — remove custom colors, reduce to one font, increase whitespace. Usually 2–4 hours if CSS is organized. |
| Too many clips | LOW | Remove entries from JSON data file. Five minutes if content is data-driven. Expensive if hardcoded in HTML. |
| Broken external links | LOW–MEDIUM | Audit all links, find archive.org or PDF copies, update data file. One afternoon if caught early. |
| Unoptimized images | LOW | Batch process existing photos through squoosh.app or ImageMagick. One to two hours. Must replace files in repo. |
| Stale site / update friction | HIGH if hardcoded, LOW if JSON-driven | If hardcoded: refactor all content to JSON (full rebuild of rendering layer). If JSON-driven: edit data file and push. |
| No mobile responsiveness | MEDIUM–HIGH | Retrofit responsive CSS is painful. Easier if caught before content is added. Plan for 4–8 hours of CSS rework. |
| Buried Knight Lab work | LOW | Rewrite page copy and restructure layout. One to two hours with a clear brief. |
| Broken video section | LOW | Add placeholder text in JSON; renders gracefully until URLs are confirmed. |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Over-designed site | Design system definition | Review with "can the editor see the first clip in under 10 seconds?" test |
| Too many clips | Content curation before build | Clips page has 8–15 items maximum; each passes the cold-send test |
| Broken external links | Content + deployment | Every link click-tested before launch; PDF fallbacks in JSON schema |
| Unoptimized photos | Asset preparation (before photography section) | All image files under 400KB; Lighthouse Performance score above 85 |
| Update friction / stale site | Architecture — JSON schema design | Time the add-a-clip workflow: must be under 3 minutes start to finish |
| No mobile responsiveness | Build — every component | Every page tested at 375px before marking complete |
| Buried Knight Lab work | Content brief for Knight Lab page | Page names the tools, links to live site, includes a visual |
| Broken video embeds | Deployment + pre-launch check | Video section either shows confirmed embed or graceful placeholder |
| Broken resume PDF link | Deployment | PDF hosted in repo; link tested from live site, not localhost |
| Missing contact info | Build — footer component | Footer verified on every page before launch |

---

## Sources

- NBCUniversal Academy, "How to Choose Your Best Journalism Portfolio Clips" — https://nbcuacademy.com/journalism-portfolio-articles/
- IJNet (International Journalists' Network), "How to perfect your online journalism portfolio" — https://ijnet.org/en/story/how-perfect-your-online-journalism-portfolio
- Journo Portfolio, "Building Your Journalist Portfolio: The Ultimate 2024 Guide" — https://www.journoportfolio.com/blog/building-your-journalist-portfolio-the-ultimate-2024-guide/
- Copyfol.io, "The Ultimate Journalism Portfolio Guide & 5 Easy Steps to Create One" — https://blog.copyfol.io/journalism-portfolio
- Authory, "A Comprehensive Guide to Creating a Journalism Portfolio" — https://authory.com/blog/journalism-portfolio
- School of Journalism, "Five mistakes early-career journalists make" — https://schoolofjournalism.co.uk/blog/five-mistakes-early-career-journalists-make/
- Yellowbrick, "10 Tips for Building a Strong Journalism Portfolio" — https://www.yellowbrick.co/blog/journalism/10-tips-for-building-a-strong-journalism-portfolio
- The Wordling, "How to Choose the Best Writing Clips for Your Portfolio Website" — https://www.thewordling.com/best-writing-clips/
- Google / Web.dev image performance guidance (current): page load conversion rate drop of 4.42% per additional second; 90% mobile bounce increase at 5s load
- Adobe / WP Engine image optimization guides: WebP is 25–34% smaller than JPEG; target ≤400KB per web image

---
*Pitfalls research for: Grace Gormley static journalism portfolio (HTML/CSS/JS, GitHub Pages)*
*Researched: 2026-03-19*
