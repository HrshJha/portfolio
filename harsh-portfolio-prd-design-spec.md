# Harsh Kumar Jha — Portfolio PRD & Design Specification
**v1.1** · Source-controlled document · Do not implement code from this file without re-checking Section 0 conflicts

---

## 0. Document Control & Source Hierarchy

Per explicit instruction: **the Master Prompt (`harshahha.pdf`) is the primary source of truth for this document.** Where any other file disagrees with the Master Prompt, the Master Prompt wins. Reference material is used only to fill in factual detail the Master Prompt doesn't itself contain.

| Priority | Source | Role |
|---|---|---|
| 1 (primary) | Master Prompt (`harshahha.pdf`) | Governs positioning, tone, structure, content rules, hard constraints |
| 2 | `frameos.md`, `candidate-intelligence-system.md`, `appforge-ai.md`, `hallucination-hunter.md` | Factual project detail (architecture, features, challenges, learnings) |
| 3 | Resume | Factual cross-check for experience/skills wording |
| 4 | `FOUNDATION.md` (v2.0) | Used **only** for its Part 5 "Cinematic Signal" visual-language elaboration, since it deepens (not contradicts) the Master Prompt's own dark/cinematic direction (Sections 15–20). Its self-declared precedence claim is overridden by the instruction above. Its Part 3/4 content (experience naming, CGPA, project status) is **not** used where it conflicts with the Master Prompt or the individual project docs. |
| — new | User instruction (this message) | Adds the **Project Video Assets** requirement, folded into Sections A10–A15, B17, C, D, F, G, and new Section H below. |



1. **CGPA:** resume states 8.36. 
2. **Experience entity naming:** use harshahha.pdf for refreence for domainlabs exprenince 
3. **Project status:** write 4 all projects almost complted 
4. **Video assets:** for all roject is provided on the name of projects and add feature when i hover over the video on that card the vide9mplays 

---

# A. PRODUCT REQUIREMENTS DOCUMENT

## A1. Executive Summary
A personal portfolio for Harsh Kumar Jha, an ECE (2025–2029) student at MSIT building AI/ML systems. The site's job is narrow and specific: get a recruiter or research-engineering hiring manager to understand, in under a minute, that Harsh actually builds and can explain working AI systems — and then get them to email him. Everything else is secondary.

## A2. Product Vision
A site that reads like an engineer's instrumentation panel and an editorial publication at once — evidence-first, restrained, cinematic without being decorative — communicating trajectory ("early career, real builder, improving fast") rather than false authority ("world-class AI engineer").

## A3. Goals
- Increase AI/ML internship and research-interview opportunities.
- Make the four flagship projects legible in 20–40 seconds each.
- Establish credibility through evidence (working systems, real architecture, honest scope) rather than adjectives or fabricated metrics.
- Support both a 10-second recruiter scan and a 2–5 minute hiring-manager deep dive on the same page.

## A4. Non-Goals
- Not a company/product marketing site.
- Not a photography portfolio (photography appears as texture/identity only — see §B10).
- Not a resume dump — no giant skills wall, no percentage bars, no certificate wall.
- Not a scroll-jacked cinematic experience that sacrifices usability.
- Not a claims-led site: no fabricated metrics, users, revenue, or accuracy numbers anywhere.

## A5. Target Users
1. Recruiters (fast scan)
2. Hiring managers / research engineers (deep read)
3. Startup founders (collaboration read)
4. Technical collaborators (peer read)

## A6. User Personas
**"Fast-scan recruiter"** — 10 seconds on the hero, scans project titles/one-liners, checks GitHub/LinkedIn, decides whether to move Harsh's resume forward.

**"Deep-dive hiring manager / research engineer"** — reads problem → approach → architecture for at least one project in depth, watches the project video to confirm the system is real and working, checks experience bullets against project claims for consistency, may open the GitHub repo.

**"Founder / collaborator"** — cares less about résumé formatting and more about "can this person actually ship something with me" — weighted toward the project videos and architecture depth, and toward the About section's trajectory framing.

## A7. Recruiter Journey
Hero → Selected Work (4 video-anchored projects) → Experience → About → Skills → Education → Resume → Contact
*(Matches `FOUNDATION.md`'s journey ordering — consistent with Master Prompt §14 fast/deep dual-mode requirement, no conflict.)*

## A8. Information Architecture
```
Home
 ├─ Hero
 ├─ Selected Work
 │   ├─ 01 FrameOS            (video)
 │   ├─ 02 Candidate Intelligence System (video)
 │   ├─ 03 AppForge AI        (video)
 │   └─ 04 Hallucination Hunter (video)
 ├─ Experience
 │   ├─ DomainLabs
 │   └─ MathonGo
 ├─ About
 ├─ Skills (restrained toolkit, not a resume dump)
 ├─ Education
 ├─ Contact
 └─ Footer
```

## A9. Page/Section Structure
Single-page scroll with anchor navigation (Work / Experience / About / Contact). No multi-page routing required for v1; individual project deep-dive pages are an *optional* future extension (see F — "Optional Content"), not required for launch.

## A10. Functional Requirements
- FR1: Hero renders name, one-line positioning, ECE·AI/ML·Software tag, primary CTA (View Work), secondary CTA (GitHub), tertiary (LinkedIn/X).
- FR2: Each of the four flagship projects renders as its own large, distinct section — not a card in a grid.
- **FR3 (new): Each of the four flagship project sections must embed the user-supplied video for that project as its primary visual artifact** — FrameOS→video 1, Candidate Intelligence System→video 2, AppForge AI→video 3, Hallucination Hunter→video 4. No generated diagram, mockup, stock footage, or illustration may substitute for these videos once supplied.
- FR4: Each project section exposes: title, one-line thesis, problem, approach, architecture summary, key engineering idea, GitHub link — progressively revealed, not a wall of text (Master Prompt §10).
- FR5: Experience section renders exactly two entries (DomainLabs, MathonGo) with role/company/period/2–4 bullets each.
- FR6: Skills render as a small number of restrained categories, not a full resume keyword list.
- FR7: Contact section exposes mailto as the primary action; GitHub/LinkedIn/X as secondary.
- FR8: CGPA is not rendered anywhere until the conflict in §0 is resolved.

## A11. Content Requirements
All copy must satisfy Master Prompt §3 (AI-assistance honesty), §32 (no fabrication), and §12 (CGPA withheld). No adjectives from the banned list (passionate, hardworking, quick learner, results-driven, visionary, AI enthusiast, technology evangelist).

## A12. Interaction Requirements
- Progressive reveal on scroll for project detail (problem → approach → architecture → idea).
- **Video interaction (new):** poster-frame-first; click/tap to play; hover-to-preview optional and muted only; explicit pause control always visible once playing; only one project video plays at a time.
- Hover states on links/CTAs are subtle (opacity/underline shift, no bounce/spring).

## A13. Responsive Requirements
- Mobile is not a shrunk desktop: vertical structure, reduced animation, touch-first controls.
- **Video responsive behavior (new):** on mobile, the full frame of the video is preserved (no cropping that would hide on-screen product UI); tap-to-play with visible mute/play controls; no forced autoplay on cellular unless muted and user has not set reduced-motion.

## A14. Accessibility Requirements
- Keyboard navigation, visible focus states, semantic HTML, heading hierarchy, alt text, sufficient contrast, reduced-motion mode.
- **Video accessibility (new):** every video needs a text alternative (the existing problem/approach/architecture copy already serves this purpose — video is illustrative, never the sole carrier of required information); accessible play/pause controls with `aria-label`s; if any video contains spoken narration, captions should be added before launch; videos must never autoplay with sound.

## A15. Performance Requirements
- Fast initial load, optimized images, GPU-friendly animation, no scroll-jacking.
- **Video performance (new):** all four videos must be web-optimized (H.264 MP4 primary, WebM fallback if feasible), served at a compressed bitrate appropriate for web delivery, lazy-loaded (only the poster frame loads until a section is near-viewport or the user presses play), and never all four loaded/decoding simultaneously on initial page load.

## A16. SEO Requirements
Descriptive `<title>`/meta description centered on "AI/ML engineering student, builder" positioning; semantic headings per section; project sections use descriptive alt text/captions rather than relying on video content for indexable text.

## A17. Analytics Recommendations
Track: CTA clicks (View Work, Resume, Contact/email), per-project scroll depth, per-project video play events, outbound GitHub/LinkedIn/X clicks. No user-identifying analytics beyond standard aggregate web analytics.

## A18. Technical Constraints
- No code generation yet per Master Prompt instruction — this document is the spec only.
- Video hosting/delivery approach (self-hosted vs. CDN/streaming provider) is an open implementation decision — see A20.
- Stack implied by existing portfolio work (Next.js/TypeScript, per memory of prior site work) should be assumed compatible; nothing here mandates a stack change.

## A19. Risks
- Four large videos are the single biggest performance risk on this page — must be mitigated via lazy-loading and compression (A15).
- Source conflicts in §0 (CGPA, entity naming, project status) risk shipping inconsistent or unverifiable claims if not resolved before copy is finalized.
- Over-designing the video frames (glow, borders, heavy motion) risks violating the Master Prompt's own restraint principle and the user's explicit "do not over-design them" instruction.

## A20. Open Questions
- Which value is the correct current CGPA (8.59 vs 8.36)?
- Is "DomAIyn Labs" a rebrand/parent of "DomainLabs," or an error to correct?
- Are the four projects Completed (per project docs) or In Progress (per FOUNDATION.md)?
- Video specifics not yet known: exact file formats/resolutions/durations/whether any contain narration or on-screen audio, and whether hosting will be self-hosted or via a video CDN — needed before the ProjectVideoPlayer component (§D) can be finalized into code.

## A21. Launch Criteria
- All four project videos integrated per §H with no placeholder/generated substitutes.
- CGPA and entity-naming conflicts resolved or CGPA/entity name omitted.
- Lighthouse performance budget met with all four videos present (lazy-loaded, not blocking first paint).
- Reduced-motion and keyboard-nav pass a manual accessibility check.

---

# B. DESIGN SPECIFICATION

## B1. Design Concept / Name
**"Cinematic Signal"** — carried over from `FOUNDATION.md` v2.0 as an elaboration of, not a departure from, the Master Prompt's own direction in §15–20 (dark-first, editorial, technical, restrained glow). Where the two describe the same territory, this spec merges them; where FOUNDATION.md goes further (film grain, mission-control telemetry, editorial print grounding), that detail is adopted because it doesn't contradict the Master Prompt.

## B2. Visual Thesis
A dark room with something quietly glowing inside it (Master Prompt §17) — rendered through the lens of darkroom photography and mission-control telemetry (FOUNDATION.md Part 1), because both are grounded in things Harsh actually does (his own photography practice, his ISRO space-weather hackathon work) rather than borrowed AI-startup aesthetics.

## B3. Mood
Calm, technically curious, understated, confident without arrogance, slightly cinematic, human. Never cringe, self-promotional, generic, sterile, or cluttered.

## B4. Color System
- Base: near-black / charcoal.
- Type: warm off-white.
- Secondary: restrained grey.
- One controlled accent color (single hue, used sparingly — e.g., for active states, the accent glow, and project index numbers).
- Directional, purposeful glow — never omnidirectional or "everywhere."
- No rainbow gradients, no purple-blue AI clichés, no neon.

## B5. Typography System
Three tiers:
- **Display:** large editorial headline type — does most of the visual work.
- **Body:** clean readable sans-serif.
- **Technical:** monospace for metadata, project numbers, dates, stack labels — reinforcing the "instrumentation" read.

## B6. Spacing System
Deliberate, generous whitespace used to create drama and direct focus — not compact for density, not empty for emptiness. Strong alignment and rhythm rather than centered-text sprawl.

## B7. Grid
Editorial column grid on desktop; single-column, vertically stacked on mobile. Occasional horizontal rules mark section/project boundaries (reinforcing the "technical readout" feel).

## B8. Border/Radius System
Minimal, restrained radii — sharp-ish edges consistent with "instrumentation," not soft SaaS-card rounding. No glassmorphism.

## B9. Image Treatment
Photography (where used in About) is treated with the same restraint as everything else — authentic, cinematic, not decorative filler.

## B10. Grain/Texture Rules
Subtle film-grain overlay on dark surfaces only, tying the interface back to Harsh's own photography practice (FOUNDATION.md Part 1/5). Used sparingly enough to stay premium, never retro-kitsch — and never applied over the project videos themselves (see §H — videos stay clean/authoritative, unfiltered).

## B11. Glow/Light Rules
Light is directional and purposeful — a signal, not a decoration. No glowing borders everywhere, no gradient blobs.

## B12. Motion Principles
Every animation must answer "why is this moving?" Preferred: slow reveals, opacity transitions, subtle translation, signal traces, light drift, parallax, text masking, progressive reveal. Avoid: bouncing, spinning, spring physics, particle effects, camera shake. Motion should feel like *processing / transmission / signal / focus / reveal*, not game UI.

## B13. Animation Timings
Slow and signal-like rather than snappy micro-interactions — consistent with mission-control pacing (FOUNDATION.md Part 5). Exact duration/easing values belong in the token table (§E) once implementation begins.

## B14. Hover Behavior
Subtle opacity/underline shifts on links and CTAs. **Video hover behavior (new):** optional muted hover-preview on desktop only; on touch devices, hover-preview is skipped entirely in favor of an explicit tap-to-play control.

## B15. Scroll Behavior
Native scroll only — no scroll-jacking. Progressive reveal is scroll-triggered, not scroll-controlled.

## B16. Navigation Behavior
Minimal nav (Work / Experience / About / Contact), unobtrusive by default, becomes visible/active-state-aware as the user scrolls; resume as a CTA rather than a nav item is acceptable per Master Prompt §23.

## B17. Project Interaction Model — REVISED for video assets
The Master Prompt's original §24 language ("system diagrams, data flows, architecture fragments, UI screenshots, subtle generated visual compositions") is **superseded for these four projects** by the user's explicit instruction: the provided videos are the *authoritative* visual asset for each project. Concretely:
- Each project section's primary visual slot is filled by its assigned video, not a generated diagram.
- The video sits as a **large, visually prominent anchor** within its own section — not shrunk into a card, not placed in a grid with the other three.
- Surrounding text (problem → approach → architecture → key idea) frames the video; it does not compete with it for visual weight.
- No text is ever overlaid on top of meaningful video content.
- No cropping that hides on-screen product UI.
- Each project retains its own distinctive layout rhythm (index number, title, thesis) even though the visual asset type is now consistent across all four (video, not bespoke diagrams).

## B18. Mobile Behavior
Vertical, readable, fast, touch-friendly, animation-light. Video: full-width, uncropped, tap-to-play, visible controls, no autoplay with sound.

## B19. Accessibility Behavior
Site must remain fully understandable with all animation and all video disabled/unplayed — video is illustrative confirmation of what the surrounding text already states, never the sole source of required information.

## B20. Empty/Loading/Error States
- **Video loading (new):** show a clean static poster frame (a single representative frame from the video, not a generated graphic) while the video itself lazy-loads.
- **Video error (new):** if a video fails to load, fall back to the poster frame plus a small inline note/retry — never silently swap in a generated placeholder graphic.
- Standard empty/loading states elsewhere (e.g., if analytics or future dynamic content is added) should follow the same restrained, non-decorative visual language.

---

# C. PAGE-BY-PAGE WIREFRAME SPEC

### Nav
Purpose: orientation + quick jump. ~64px height, sticky, low-contrast until scrolled/hovered. Desktop: horizontal inline links. Mobile: collapses to a minimal menu; current section indicated via subtle underline/accent, not a heavy active-pill.

### Hero
Purpose: identity + positioning in one glance. ~90–100vh.
```
HARSH KUMAR JHA

Building AI systems through
machine learning and engineering.

ECE · AI/ML · Software

[ View Work ]   [ GitHub ]
```
Desktop: large display type, generous negative space, optional subtle aperture/light reveal (skippable, respects reduced-motion, no blocking load). Mobile: same content, vertically compact, no intro animation delay.

### Selected Work (container section)
Purpose: primary proof surface. Contains four sub-sections, one per project, each roughly full-viewport-height on desktop.

**Per-project layout (repeated ×4 — FrameOS / Candidate Intelligence System / AppForge AI / Hallucination Hunter):**
```
01 / PROJECT

FRAMEOS
short thesis line

┌───────────────────────────────┐
│                                │
│      [ PROJECT VIDEO ]        │   ← large, prominent, poster-first
│                                │
└───────────────────────────────┘

PROBLEM      → short paragraph
APPROACH     → short paragraph
ARCHITECTURE → compact list/summary
KEY IDEA     → one line

[ GitHub ↗ ]
```
Desktop behavior: video can be a sticky/anchor element as text scrolls alongside it, or a full-bleed block preceding the text — either way it stays the single largest visual element in its section. Progressive reveal: thesis → video → problem → approach → architecture → key idea → GitHub link.
Mobile behavior: stacked vertically in the same order, video full-width and uncropped, no sticky/parallax tricks, tap-to-play.

### Experience
Purpose: compact credibility. ~40–60vh, two entries only (DomainLabs, MathonGo), each with role/company/period + 2–4 bullets. No timeline graphics.

### About
Purpose: human-but-technical framing — who, what studying, what he builds, where headed. Short. Photography may appear subtly (texture/identity), not as a gallery.

### Skills
Purpose: restrained toolkit, categorized (Programming / AI-ML / Backend / Data-Infra / Dev Tools), demonstrated-in-projects technologies prioritized over full resume list. No percentages, no bars.

### Education
Purpose: single fact block — MSIT, B.Tech ECE, 2025–2029. CGPA withheld pending §0 resolution.

### Contact
Purpose: conversion point. Primary: mailto CTA. Secondary: GitHub / LinkedIn / X icons/links.

### Footer
Purpose: quiet close.
```
HARSH KUMAR JHA
Building things. Learning systems. Exploring AI.
GitHub · LinkedIn · X · Email
© 2026
```

---

# D. COMPONENT SYSTEM

- **Navbar** — responsibility: orientation/wayfinding. States: default, scrolled, active-section, mobile-collapsed. Animation: opacity/underline only.
- **Hero** — responsibility: identity + primary CTAs. States: default, reduced-motion (no intro animation). Responsive: type scale steps down, CTAs stack on narrow widths.
- **SectionHeader** — responsibility: consistent section titling (index/label + heading). Reused across Work/Experience/About/Skills/Education/Contact.
- **ProjectShowcase** — responsibility: wraps one project's full narrative (title, thesis, video, problem/approach/architecture/idea, GitHub link). States: collapsed-detail / expanded-detail (if progressive disclosure is click-driven rather than purely scroll-driven). Responsive: video-first stacked order on mobile.
- **ProjectVideoPlayer (new — core component for this request)**
  - Responsibility: render the single authoritative video for a project as the section's primary visual anchor.
  - States: `poster` (default, lazy-loaded still frame only), `loading` (video fetching after user interaction), `playing`, `paused`, `error` (falls back to poster + retry affordance).
  - Behavior: click/tap toggles poster→playing; explicit visible pause control once playing; optional muted hover-preview on desktop pointer devices only (never on touch); never autoplays with sound; only one instance across the page may be in `playing` state at a time (starting a second pauses the first).
  - Responsive: fixed aspect ratio preserved at all breakpoints so on-screen product UI is never cropped; full width on mobile.
  - Accessibility: `aria-label` describing the project (e.g., "FrameOS product demo video"), visible focus ring on the play control, respects `prefers-reduced-motion` by disabling hover-autoplay-preview (tap-to-play still available).
  - Explicitly out of scope: no generated poster/mockup — the poster is a real frame extracted from the supplied video.
- **ProjectMetadata** — responsibility: index number, category label, tech-stack tags (monospace, technical tier). Static, no animation needed.
- **ExperienceCard** — responsibility: one experience entry. States: default only (no expand/collapse needed given the compact requirement).
- **AboutBlock** — responsibility: short bio copy + optional subtle photography texture.
- **SkillGroup** — responsibility: one categorized skill cluster. No progress indicators of any kind.
- **SocialLinks** — responsibility: GitHub/LinkedIn/X icon links, reused in Hero, Contact, Footer.
- **ContactCTA** — responsibility: primary mailto action, visually weighted as the page's conversion point.
- **Footer** — responsibility: quiet close + secondary social links.
- **ScrollProgress** — responsibility: optional subtle indicator of position within the Selected Work sequence (e.g., 01/04 readout in monospace) — purely informational, not decorative.
- **Motion primitives** — `RevealOnScroll` (opacity/translate reveal), `SignalTrace` (subtle line-draw accent), `GrainOverlay` (dark-surface-only texture, must never be applied over `ProjectVideoPlayer`).

---

# E. DESIGN TOKENS

| Category | Recommendation |
|---|---|
| Background | near-black / charcoal (single base, no busy gradient library) |
| Text (primary) | warm off-white |
| Text (secondary) | restrained mid-grey |
| Accent | one controlled hue, used only for active/glow/index-number moments |
| Display type scale | large, editorial — reserve the biggest step for the hero and project titles only |
| Body type scale | comfortable reading size, standard line-height |
| Technical (monospace) type scale | small, compact, used for metadata/dates/stack labels |
| Spacing scale | generous, consistent step (e.g., 4/8/16/32/64/128-style scale) — err toward more space, not less |
| Radii | minimal/near-sharp, consistent across buttons, video frame, and cards |
| Border opacity | low, hairline-weight dividers only |
| Animation duration (reveal) | slow (signal-like, not snappy) |
| Animation easing | smooth ease-out, no spring/bounce curves |
| Breakpoints | mobile / tablet / desktop, mobile-first |
| Max content width | editorial column width on desktop, full-bleed only for the project video block |
| **Video aspect ratio (new)** | fixed per-video native ratio, preserved at all breakpoints — never force-cropped to a different ratio |
| **Video frame border (new)** | hairline only, consistent with overall border system — no heavy glow/frame treatment |
| **Video poster overlay (new)** | minimal play-control affordance only, no gradient overlay obscuring the frame |

---

# F. CONTENT ARCHITECTURE

**Primary content:** Hero identity/positioning, four project sections (thesis + video + problem/approach/architecture/idea + GitHub), Experience (2 entries), Contact CTA.

**Secondary content:** About block, Skills toolkit, Education fact block.

**Optional content:** Individual project deep-dive pages (future extension); scroll-progress readout; subtle entry animation.

**Content to omit:** CGPA (pending §0), phone number, skill percentages/progress bars, fake metrics/testimonials, visitor counters, blog, certifications wall, GitHub contribution graph, generic technology keyword dump.

**Video asset mapping (new — authoritative):**
| # | Project | Video |
|---|---|---|
| 1 | FrameOS | Provided video 1 |
| 2 | Candidate Intelligence System | Provided video 2 |
| 3 | AppForge AI | Provided video 3 |
| 4 | Hallucination Hunter | Provided video 4 |

This order matches both the Master Prompt's flagship project order (§5) and the user's video list — no conflict.

---

# G. ANTI-SLOP DESIGN CHECKLIST

- [ ] No generic hero copy ("Hi, I'm Harsh!", "Passionate AI enthusiast!")
- [ ] No excessive gradient / gradient blobs
- [ ] No random 3D objects
- [ ] No fake metrics, testimonials, or counters
- [ ] No technology keyword wall
- [ ] No unnecessary cards (projects are sections, not a card grid)
- [ ] No excessive rounded corners / glassmorphism
- [ ] No generic stock imagery or robot illustrations
- [ ] No meaningless animation (every motion answers "why is this moving?")
- [ ] No startup-cliché language
- [ ] No visual clutter
- [ ] No copied Sarvam/Anushree layout
- [ ] **No generated diagrams, mockups, or stock footage substituted for the four supplied project videos**
- [ ] **No decorative over-design applied to the video frames (heavy glow, filters, borders, or grain over the actual footage)**
- [ ] **No text overlaid on meaningful video content, and no cropping that hides product UI**
- [ ] CGPA and other flagged conflicts (§0) resolved or omitted before launch

**Final design test:** if "Harsh Kumar Jha" were removed, would this still look like a generic AI portfolio? If yes — the four real project videos anchoring each section, plus the specific problem/approach/architecture detail per project, should already be enough to make the answer no. If it still reads generic, cut decoration, not specificity.

---

# H. PROJECT VIDEO ASSETS SPECIFICATION (new — added per this request)

## H1. Status
The four video files have **not yet been uploaded to this conversation.** This section specifies exactly how they will be integrated once provided. No placeholder, mockup, generated illustration, or stock footage should be built as a stand-in in the meantime — per explicit instruction, the videos are the only acceptable visual for these four project slots.

## H2. Mapping (authoritative)
1. FrameOS → provided video 1
2. Candidate Intelligence System → provided video 2
3. AppForge AI → provided video 3
4. Hallucination Hunter → provided video 4

## H3. Non-negotiable rules (carried directly from the request)
- Do not generate replacement visuals, mockups, stock footage, AI-generated illustrations, or fake product screenshots for these four projects.
- Do not recreate the interfaces shown in the videos as separate graphics.
- The videos are the authoritative visual demonstration — treat them as such, not as decoration.
- Each project gets its own large, visually prominent video presentation — not a shared grid of four small clips.
- The videos must feel native to the design system (consistent border/spacing/typography context), not like an embedded external widget.
- No unnecessary effects around the videos; no text over important footage; no cropping that hides product UI.
- Autoplay, if used at all, must be muted and subtle; otherwise a clean poster frame with a minimal play control.
- Respect `prefers-reduced-motion`.
- Optimize and lazy-load so four large videos don't slow initial page load.

## H4. Technical integration requirements
- **Format:** web-optimized H.264 MP4 as the primary source; WebM as an optional secondary source for broader codec support.
- **Poster frames:** a real extracted frame from each video (not a generated graphic), shown until the user presses play.
- **Loading strategy:** lazy-load — the underlying video file is not fetched until its section is near-viewport (or, more conservatively, until the user interacts with play); only the small poster image loads eagerly.
- **Play/pause:** explicit, visible, accessible controls; tap/click to play; visible pause affordance while playing; only one project video plays at a time across the page.
- **Aspect ratio:** preserve each video's native ratio at every breakpoint — never force a crop that would hide on-screen product UI.
- **Autoplay:** off by default; if enabled at all for a subtle hover-preview on desktop, must be muted, and is skipped entirely on touch devices and under `prefers-reduced-motion`.
- **Sizing:** desktop — large visual anchor within its section, comparable in prominence to a hero image, not a small thumbnail; mobile — full-width, uncropped, touch-friendly controls.
- **Border/spacing treatment:** consistent hairline border and spacing tokens from §E — restrained, not a heavy frame or glow treatment around the footage.
- **Component ownership:** implemented via the `ProjectVideoPlayer` component defined in §D.

## H5. Content/placement rules
- Each project's video sits as the primary visual element of its own section (§C), immediately associated with that project's title/thesis — never pooled into a shared media grid with the other three.
- Surrounding narrative text (problem → approach → architecture → key idea) frames the video but never overlaps it.
- If a video is temporarily unavailable, the section falls back to its poster frame (once supplied) rather than any generated substitute; until the actual files are provided, this section of the spec remains the build reference and no interim graphic should be produced.

## H6. Outstanding inputs needed before implementation
- The four actual video files.
- Confirmation of exact resolution/duration/whether any contain narration (for caption requirements per §A14).
- Decision on hosting approach (self-hosted static assets vs. a video CDN/streaming provider) — affects the lazy-loading and format details above but not the interaction/visual rules, which are fixed regardless of hosting choice.

---

**End of document.**
