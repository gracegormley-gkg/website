---
phase: 06-video-and-pre-launch
plan: 01
subsystem: video-page
tags: [video, mobile-responsiveness, fetch-render, css]
dependency_graph:
  requires: []
  provides: [video.html, style.css mobile breakpoint]
  affects: [video.html, style.css]
tech_stack:
  added: []
  patterns: [fetch-and-render from data.json, placeholder fallback for missing embed URLs, CSS aspect-ratio for responsive iframes]
key_files:
  created: []
  modified: [video.html, style.css]
decisions:
  - "youtube-nocookie.com used for privacy-enhanced YouTube embeds (toEmbedUrl() conversion)"
  - "var used instead of const/let in inline script for consistency with clips.html pattern"
  - "Placeholder card shows 'Video available upon request' so page never looks broken with PLACEHOLDER embedUrls"
  - "border:none on iframe via CSS not deprecated frameborder attribute"
metrics:
  duration: "5min"
  completed_date: "2026-04-07"
  tasks_completed: 2
  files_modified: 2
---

# Phase 6 Plan 01: Video Page and Mobile Responsiveness Summary

Video page with fetch-and-render from data.json, placeholder cards for missing embed URLs, and a `@media (max-width: 640px)` block for nav wrap and about-hero stacking.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Build video.html — fetch-and-render with placeholder fallback | 183dc05 | video.html |
| 2 | Add video CSS classes and mobile breakpoint block to style.css | 626a4d7 | style.css |

## What Was Built

### Task 1 — video.html

Replaced the stub `<p>Content coming soon.</p>` with a complete page. The inline `<script>` before `</body>` fetches `./data.json`, reads `data.videos[]`, and renders each entry as an `<article class="video-item">`.

- `isPlaceholder(url)` checks whether `embedUrl` starts with `http` — returns true for the current PLACEHOLDER strings
- `toEmbedUrl(url)` converts `youtube.com/watch?v=ID`, `youtu.be/ID`, or Vimeo URLs to privacy-enhanced embed URLs; passes through anything already embedded
- When `embedUrl` is a real URL: renders `<div class="video-embed"><iframe ...></div>` with `loading="lazy"` and no `frameborder`
- When `embedUrl` is a PLACEHOLDER: renders `<div class="video-placeholder">` with visible text "Video available upon request" — never blank
- "Adobe Premiere" mentioned in the intro paragraph above the video list

### Task 2 — style.css

Appended two new sections after the Phase 5 `.pillar-name` block:

**Video page classes:**
- `.video-item` — spacing between cards
- `.video-title` — `var(--text-xl)` heading
- `.video-embed` — `aspect-ratio: 16/9`, `max-width: 800px`, `width: 100%`
- `.video-embed iframe` — fills container, `border: none`, `border-radius`
- `.video-placeholder` — same dimensions as embed, `background: var(--color-bg-subtle)`, flex-centered muted text
- `.video-desc` — small muted caption below embed or placeholder

**Mobile breakpoint:**
- `@media (max-width: 640px)` covers `.site-nav` (column layout), `.site-nav__links` (flex-wrap), `.about-hero` (column), `.about-headshot` (140px)

## Requirements Satisfied

- **VIDEO-01:** video.html fetches data.json and renders each video — iframe for real URL, placeholder card for PLACEHOLDER string
- **VIDEO-02:** "Adobe Premiere" appears in the intro paragraph
- **SITE-03 (CSS half):** `@media (max-width: 640px)` block added covering nav wrap and about-hero vertical stack

## Decisions Made

1. `youtube-nocookie.com` used for all YouTube embeds — privacy-enhanced embed domain
2. `var` in inline script (not `const`/`let`) — consistent with existing clips.html script pattern
3. Placeholder text is "Video available upon request" — descriptive, not an error state
4. `border: none` on iframe via CSS — `frameborder` attribute is deprecated HTML

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

- `video.html` exists and contains `video-placeholder` (count: 1), `Adobe Premiere` (count: 1), `video-list` container
- `style.css` contains `max-width: 640px` (count: 1), `video-placeholder` class
- Commits 183dc05 and 626a4d7 verified in git log
