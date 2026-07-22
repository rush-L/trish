# Dark theme conversion — design

## Why

The site currently mixes a light "paper" ground (Hero, Summary, Skills, Work) with a
dark "obsidian" ground (Journey/Experience, Achievements, Contact) that already
exists and is used in production. A dark-theme mockup ("Option B") was compared
against the live Hero and found to diverge significantly — not just Hero, but the
whole site is being brought onto the single dark ground the mockup implies.
Content (`src/content/profile.ts`) is out of scope — this is a visual-only change.

## Mechanism

- `globals.css`: flip `body` background/color from paper/graphite to obsidian/paper.
  Sections with no explicit background (Hero, Summary, Skills, Work) inherit dark
  automatically.
- `layout.tsx`: add `data-theme="dark"` to `<body>` once. `Cursor.tsx` already reads
  this attribute per-ancestor to swap its own cursor color scheme, so the custom
  cursor adapts sitewide with a one-line change. Existing per-section
  `data-theme="dark"` attributes (Journey, Achievements, Contact) are redundant but
  harmless — left as-is.
- Update `viewport.themeColor` / `colorScheme` in `layout.tsx` to match (browser
  chrome tinting only).
- `:focus-visible` outline and `::selection` colors swap `gold-ink` → `gold` for
  correct contrast against black.
- Every light-ground-specific utility class (`text-graphite`, `text-graphite-soft`,
  `text-ink-muted`, `border-graphite/*`, `border-ink-15`, `bg-paper-dim`, `gold-ink`)
  is swapped file-by-file for the dark-ground equivalent already established by the
  existing dark sections (`text-paper/NN`, `border-paper/*`, `gold`).
- `Nav.tsx`: header glass effect (`glass` → `glass-dark`), pill buttons, hamburger
  lines, logo dot, and scroll-progress bar recolor for dark. The `DARK_CHAPTERS`
  conditional in the side-rail is deleted (not left dormant) — with every chapter
  dark, the light branch would render `text-graphite` (invisible) for Skills/Projects.
- `Work.tsx`: its two `Carousel` calls get `accent="bg-gold"` explicitly — the
  other two color props (`dot`, `arrow`) already default to `currentColor` and
  adapt automatically; only `accent` has a hardcoded light-ground default.

## Hero-specific redesign

- Portrait: drop the framed/bordered box, corner brackets, drop shadow, and caption.
  Replace with a large photo bleeding to the right edge, spanning most of the hero's
  height, with a left-edge gradient fade into obsidian so it blends into the page
  rather than sitting in a hard-edged box. The small circular mobile avatar is
  unchanged except for border recolor.
- "RMP" ghost watermark: repositioned from bottom-left to sit behind the portrait on
  the right, at the `lg:` breakpoint only. Below `lg` (no large portrait present) it
  keeps its current bottom-left drift.
- Bottom row: the "Trisha S. Capapas · RMP" name + "Scroll" cue is removed. Replaced
  with small social icons (LinkedIn / email / phone, sourced from the existing
  `profile.socials` array — no data changes) placed under the CTA buttons.
- "Download Résumé" button relabeled "View Resume" (copy only — `download` behavior
  unchanged).
- Nav links, the chapter set, and all content stay exactly as-is — only colors/theme
  and the two Hero layout changes above.

## Files touched

`globals.css`, `layout.tsx`, `Hero.tsx`, `Nav.tsx`, `Summary.tsx`, `Skills.tsx`,
`Work.tsx`.

Not touched: `profile.ts`, `Journey.tsx`, `Achievements.tsx`, `Contact.tsx` (already
dark), `Reveal.tsx` / `SplitText.tsx` / `AnimatedNumber.tsx` (no hardcoded colors),
`Carousel.tsx` (only call sites change, not the component).

## Verification

This is a visual reskin — the running dev server (already up on :3000) is the real
verification, not this document. After implementation: screenshot Hero, Nav (open +
scrolled + mobile menu), Skills, Work, and confirm no light-on-dark or dark-on-dark
invisible-text regressions, plus a contrast pass on the nav sitting over the hero
photo and the gold buttons.
