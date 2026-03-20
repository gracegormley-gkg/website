# Feature Research

**Domain:** Journalism and data journalism portfolio — college student applying for internships and jobs
**Researched:** 2026-03-19
**Confidence:** HIGH (cross-verified across multiple journalism industry sources)

## Feature Landscape

### Table Stakes (Editors and Recruiters Expect These)

Features that are assumed to exist. Missing these causes an editor or recruiter to leave or discount the candidate immediately.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clips list with publication, date, and link | Editors go directly to clips; anything that requires digging is a failure | LOW | 3–5 curated clips minimum; link to live article or embed as PDF if paywalled |
| Professional headshot + name on landing page | Editors must instantly know whose site this is; anonymous landing = unprofessional | LOW | Grace already has a headshot (GORMLEY, GRACE_SAMPLE_Jun2025_WEB_9 copy.jpg, credit: Anna Hoch-Kenney) |
| About/bio page | Establishes narrative — background, beat, what makes this journalist distinctive | LOW | One or two tight paragraphs; not a resume recitation |
| Contact info (email at minimum) | Editors and recruiters need a direct path to reach out | LOW | Footer-level, present on every page; email + LinkedIn is the standard pair |
| Resume download (PDF) | Nearly universal ask in journalism job applications | LOW | Grace already has the PDF in the project folder |
| Clean, readable typography | Journalism hiring is about writing; distracting design signals bad editorial judgment | LOW | Serif or high-quality sans-serif; nothing gimmicky |
| Mobile-responsive layout | Editors open links on phones; broken mobile layout immediately signals low craft | MEDIUM | Must work on iOS Safari and Chrome for Android |
| Fast page load | Slow sites lose editors who have 30 seconds to evaluate a candidate | LOW | No heavy JS frameworks, inline images optimized; GitHub Pages static hosting handles this well |
| Work organized by type or beat | Editors want to find the writing relevant to the role they're hiring for | LOW | Navigation between Clips, Photography, Video, etc. |

### Differentiators (Competitive Advantage)

Features that set a journalism portfolio apart from the hundreds of Squarespace/Wix sites editors see. Not required, but meaningfully increase recall and interview conversion.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Data journalism project showcase | Rare skill set for a sophomore; immediately signals she can do investigations others can't | MEDIUM | Knight Lab EIS Archives page — her role, tools (BERTopic, OCR, LLMs, supercompute), and link to live project. Most student portfolios have zero data projects. |
| Technical credibility signals | Signals she can code — a growing requirement at data/investigative desks | LOW | Mentioning tools (Python, BERTopic, LLMs) and linking to the live EIS site is enough; no need for a GitHub stats widget |
| Photography gallery with editorial framing | Shows multiplatform capability; photojournalism is increasingly expected alongside writing | MEDIUM | Grid layout, short captions with story context, 13 photos already in folder — curate to best 8–12 |
| Video work embedded and contextual | Video packages show broadcast/multimedia range; rare in pure-text writers | MEDIUM | "What Can We Do?" and "Move Your Feet" — still need YouTube/Vimeo URLs from Grace, but embed slots can be built now |
| Awards section with linked work | Third-party validation tells editors others have recognized the work quality | LOW | Awards carry more weight when the linked article is right there — one click from award to clip |
| Service/civic journalism page (SUSO Camp) | Shows commitment to community journalism, not just career advancement; resonates with editors at mission-driven outlets | LOW | SUSO Camp page with the four pillars framing positions Grace as someone who thinks beyond bylines |
| Consistent visual voice | A portfolio that looks designed (not templated) signals editorial taste; journalists who understand visual presentation are more valuable in digital newsrooms | MEDIUM | Custom HTML/CSS allows a look that no Squarespace template produces; typography and whitespace choices communicate taste |
| Downloadable clips list PDF | Some editors print application materials or share internally; a curated PDF makes forwarding easy | LOW | Grace already has "Clips List - Grace Gormley (Dec 2025).pdf" — link it alongside the web clips list |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem reasonable but actively hurt a journalism portfolio.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Blog or personal commentary section | Seems like a way to show voice and keep the site active | Editors evaluate your published, edited work — unedited blog posts introduce risk of saying something career-limiting; signals you don't understand the difference between publishing and journalism | Let published clips demonstrate voice; keep opinions in published bylines |
| Social media feed embeds (Twitter/X, Instagram) | Makes the site feel "alive" and current | Twitter/X embeds are visually noisy, frequently break, and load slowly; social content looks informal next to editorial clips | Link to LinkedIn and Twitter/X in the footer — a link is enough |
| Testimonials/quotes section | Looks like social proof | Testimonials are a freelance-marketing convention; in journalism hiring they read as self-promotional in a way that conflicts with editorial norms | Let the clips and awards speak; third-party recognition belongs in an Awards section with sourcing |
| Animated hero / splash screen | Looks impressive at first glance | Delays editors from reaching the work; editors with 30 seconds to evaluate click away before the animation completes | Name + tagline + direct clip access on the landing screen, no loading gate |
| "Hire me" / availability callout | Makes business intent clear | Grace is a student building a portfolio for applications, not a freelancer soliciting clients; this framing positions her as a vendor rather than a candidate | Contact info is sufficient; cover letters and applications handle availability |
| Counter widgets (view count, visitors) | Seems like engagement signal | Looks amateur and can read as insecure ("please notice me"); meaningless to an editor | No analytics widgets on the public-facing site |
| PDF embedding for every clip | Seems like it ensures access even past paywalls | PDFs embedded inline load slowly, don't look editorial, and some publications prohibit full reproduction | Link to the live article first; offer the PDF clips list as a secondary download for paywalled pieces |

## Feature Dependencies

```
About Page
    └──requires──> Headshot (can exist without, but incomplete)

Clips List
    └──requires──> Per-clip metadata (title, publication, date, link)
    └──enhances──> Awards section (clips linked from awards feel validated)

Photography Gallery
    └──requires──> Curated photo selection (not all 13 — editorial curation)
    └──requires──> Captions (context transforms a photo into journalism)

Video Section
    └──requires──> Embed URLs from Grace (YouTube/Vimeo — still outstanding)
    └──blocks-until──> Video URLs provided

Knight Lab / Data Project Page
    └──requires──> Description of Grace's specific role (not just the project)
    └──enhances──> Technical credibility signals (links out to live site)

Contact (footer)
    └──requires──> Nothing — standalone
    └──should-appear-on──> Every page (not just a Contact page)

Resume Download
    └──requires──> PDF exists (already in folder)
    └──appears-on──> About page and/or nav

Awards Section
    └──enhances──> Clips List (cross-links to the award-winning articles)
```

### Dependency Notes

- **Video section blocks on URLs from Grace:** The page structure and embed slots can be built now, but the section cannot be meaningfully filled until Grace provides the YouTube or Vimeo URLs for "What Can We Do?" and "Move Your Feet."
- **Photography requires editorial curation, not just a dump:** 13 photos are available in the folder; all 13 should not appear. A curated 8–12 with captions is stronger than all 13 without context.
- **Awards are stronger when they link directly to clips:** An award name alone is a claim; the award linked to the piece is evidence.

## MVP Definition

### Launch With (v1)

The minimum viable portfolio for submitting internship applications immediately.

- [ ] About page with bio, headshot, and Northwestern/Medill context — establishes who Grace is in 10 seconds
- [ ] Clips list page with title, publication, date, and link for each clip — the primary deliverable editors want
- [ ] Photography gallery with curated 8–12 photos and captions — shows multiplatform range
- [ ] Contact info (email + LinkedIn) in the footer of every page — the conversion point
- [ ] Resume PDF download linked from About page or nav — universal application requirement
- [ ] Awards section with links to award-winning work — third-party validation
- [ ] Knight Lab / data journalism page describing EIS Archives project — the primary differentiator

### Add After Validation (v1.x)

After the core site is live and being used in applications.

- [ ] Video section — add once Grace provides embed URLs; structure can be built as a placeholder
- [ ] SUSO Camp page — rounds out the story of who Grace is; add when v1 is solid
- [ ] Downloadable clips PDF — secondary convenience for editors who print; clips list already exists as PDF in folder

### Future Consideration (v2+)

Deferred until Grace has feedback from applications about what editors ask for.

- [ ] Beat-specific clip filtering — if Grace develops a strong specialization, filtered views by beat become useful; premature now
- [ ] Dark mode toggle — nice-to-have UX polish; no evidence it affects journalism hiring decisions
- [ ] Project-level case studies with methodology detail — valuable for data journalism roles once she has more projects to feature

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Clips list page | HIGH | LOW | P1 |
| About page with headshot | HIGH | LOW | P1 |
| Contact footer (every page) | HIGH | LOW | P1 |
| Resume PDF download | HIGH | LOW | P1 |
| Photography gallery | HIGH | MEDIUM | P1 |
| Awards section | HIGH | LOW | P1 |
| Knight Lab / data project page | HIGH | LOW | P1 |
| Video section (embed placeholders) | MEDIUM | LOW | P2 |
| SUSO Camp page | MEDIUM | LOW | P2 |
| Clips list PDF download | LOW | LOW | P2 |
| Beat-specific clip filtering | MEDIUM | MEDIUM | P3 |
| Dark mode | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch — editors leave without these
- P2: Should have — adds meaningful depth, low cost
- P3: Nice to have — defer until core is validated

## Competitor Feature Analysis

Journalism portfolio convention is highly consistent. The differentiation is in curation and design quality, not features.

| Feature | Typical Wix/Squarespace Portfolio | JournoPortfolio / Clippings.me | Grace's Approach |
|---------|----------------------------------|-------------------------------|-----------------|
| Clips display | Grid or list, usually chronological | Automated aggregation from bylines | Manually curated list with context notes; quality over completeness |
| About page | Generic bio paragraph | Platform-generated | Tight, specific narrative — Medill, data science double major, Knight Lab |
| Photography | Often absent or buried | Rarely supported well | Dedicated gallery page with editorial captions; positions her as multimedia |
| Data/technical projects | Absent for most journalism students | Not designed for this | Dedicated Knight Lab page — explicit differentiator vs. peers |
| Design | Template-constrained | Standardized platform UI | Custom HTML/CSS — unique look that no template produces |
| Video | Sometimes a YouTube link | Rarely featured | Embedded packages with context — moves from "link" to "showcase" |
| Awards | Often a text list only | Not featured prominently | Awards linked to the actual work — verifiable, not just listed |
| Resume | PDF download link | Sometimes integrated | PDF download from folder, linked prominently |
| Contact | Separate contact page | Platform-handled | Footer on every page — no friction, always one scroll away |

## Sources

- [How to Choose Your Best Journalism Portfolio Clips — NBCU Academy](https://nbcuacademy.com/journalism-portfolio-articles/)
- [A Comprehensive Guide to Creating a Journalism Portfolio — Authory](https://authory.com/blog/journalism-portfolio)
- [Building Your Journalist Portfolio: The Ultimate 2024 Guide — Journo Portfolio](https://www.journoportfolio.com/blog/building-your-journalist-portfolio-the-ultimate-2024-guide/)
- [Journalist Portfolio Websites: 20+ Well-Designed Examples — Site Builder Report](https://www.sitebuilderreport.com/inspiration/journalist-portfolio-websites)
- [Aspiring Journalists: How to Build a Portfolio — Foreign Press](https://foreignpress.org/journalism-resources/aspiring-journalists-how-to-build-a-portfolio)
- [Photography Portfolio Best Practices — Pixpa](https://www.pixpa.com/blog/how-to-make-a-photography-portfolio)
- [21 Journalist Photography Portfolio Examples — Format](https://www.format.com/customers/photography/journalist)
- [Your Writer's Portfolio: How to Craft the Perfect About Me Page — Journo Portfolio](https://www.journoportfolio.com/blog/your-writers-portfolio-how-to-craft-the-perfect-about-me-page/)

---
*Feature research for: Journalism and data journalism portfolio website — college student internship/job applications*
*Researched: 2026-03-19*
