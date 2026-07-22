# Hero Goal-UI Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the hero section and header match the goal mockup: real center navigation, smaller contained headline with a bottom gold rule, sharp rectangular buttons, narrower body copy, stronger ghost "RMP" letters, and a gold diagonal wedge accent.

**Architecture:** All changes are Tailwind-class and JSX edits inside two existing client components (`Nav.tsx`, `Hero.tsx`) plus a one-line anchor id on `Summary.tsx`. No new components, no new dependencies. Existing framer-motion animation wrappers are kept exactly as they are — only classNames and inner markup change unless a step says otherwise.

**Tech Stack:** Next.js 16 (App Router, Turbopack), Tailwind CSS v4 utilities, framer-motion.

## Global Constraints

- Do NOT touch the animation structure: every `motion.*` wrapper, its `initial/animate/transition/style` props, and the parallax hooks stay as-is unless a step explicitly shows a change.
- Use only existing color tokens: `gold`, `gold-highlight`, `paper`, `obsidian`, `navy`, `cyan`. No hex values in class names.
- Desktop-only decorations use `hidden lg:block` (or `lg:flex`) — never change the mobile layout except where a step shows it.
- The dev server is already running at `http://localhost:3000` with hot reload — do not start another one (`npm run dev` will fail; port is taken and that is fine).
- Visual verification for every task: `node "C:/Users/User-PC/AppData/Local/Temp/claude/D--rus-trish/1c1ea015-4b35-4c70-aa79-fa6cb8e9dcf2/scratchpad/shot.mjs" <name>.png` (writes a 1400×900 screenshot of the page; read the image to confirm).
- Type check for every task: `npx tsc --noEmit` must pass.
- This is Next.js 16 with breaking changes — if you need any Next-specific API beyond what the diffs show, read `node_modules/next/dist/docs/` first (per AGENTS.md). The steps below only touch JSX/classNames, so this should not come up.
- Commit after each task on the current branch `feat/dark-themed`.

---

### Task 1: Header — center nav links, single CTA

**Files:**
- Modify: `src/components/ui/Nav.tsx`
- Modify: `src/components/chapters/Summary.tsx:10`

**Interfaces:**
- Consumes: existing `CHAPTERS` array, `active` state, `Magnetic`, `profile`.
- Produces: section anchor `id="about"` on Summary; desktop nav uses `NAV_LINKS` (defined below). Later tasks do not depend on this task.

- [ ] **Step 1: Add the `about` anchor to Summary**

In `src/components/chapters/Summary.tsx` line 10, change:

```tsx
    <section className="relative px-6 pb-20 pt-4 md:px-10 md:pb-28">
```

to:

```tsx
    <section id="about" className="relative px-6 pb-20 pt-4 md:px-10 md:pb-28">
```

- [ ] **Step 2: Add a desktop nav-links array in `Nav.tsx`**

Directly below the existing `CHAPTERS` const (after its closing `];`), add:

```tsx
// Goal-mockup header links. CHAPTERS keeps driving the mobile menu and side rail.
const NAV_LINKS = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];
```

- [ ] **Step 3: Track the `about` section in the IntersectionObserver**

In the first `useEffect`, change:

```tsx
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
```

to:

```tsx
    [...CHAPTERS, { id: "about", label: "About" }].forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) io.observe(el);
    });
```

- [ ] **Step 4: Insert the center nav and slim the right side**

Inside the header's inner `<div className="mx-auto flex max-w-[1600px] ...">`, between the logo `<a>…</a>` and the `<div className="flex items-center gap-3">`, insert:

```tsx
          {/* Desktop center nav — gold underline marks the active section */}
          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                data-cursor={l.label}
                className={`relative pb-1.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  active === l.id ? "text-gold" : "text-paper/80 hover:text-paper"
                }`}
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-px bg-gold transition-opacity duration-300 ${
                    active === l.id ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            ))}
          </nav>
```

Then in the right-side `<div className="flex items-center gap-3">`:

1. Delete the entire first `<Magnetic>…</Magnetic>` block (the `Download Résumé` link) — the résumé stays reachable from the hero button and mobile menu.
2. On the remaining `Available for Work` link, replace its className with (rectangular, gold-accented, otherwise same behavior):

```tsx
              className="group inline-flex items-center gap-2 border border-gold/60 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-obsidian"
```

and change its inner dot span to:

```tsx
                <span className="h-1.5 w-1.5 rounded-full bg-gold transition-colors group-hover:bg-obsidian" />
```

Note the order of the goal mockup: dot sits AFTER the text there; move the dot span below the text node to match (`Available for Work` then dot).

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit` — expected: no output, exit 0.
Run: `node "C:/Users/User-PC/AppData/Local/Temp/claude/D--rus-trish/1c1ea015-4b35-4c70-aa79-fa6cb8e9dcf2/scratchpad/shot.mjs" task1.png` then read `task1.png`.
Expected: center links HOME ABOUT EXPERIENCE ACHIEVEMENTS CONTACT with gold underline under HOME; right side shows only the bordered gold AVAILABLE FOR WORK rectangle.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/Nav.tsx src/components/chapters/Summary.tsx
git commit -m "feat: add desktop center nav and slim header CTA to match goal UI"
```

---

### Task 2: Hero headline — contained scale, bottom rule, narrow copy

**Files:**
- Modify: `src/components/chapters/Hero.tsx`

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: nothing later tasks rely on.

- [ ] **Step 1: Shrink the headline and keep it in the left column**

In `Hero.tsx`, on the `<motion.h1>` (currently `className="display-mega max-w-[12ch]"`), replace the className with:

```tsx
          className="font-display text-[clamp(3rem,6.5vw,6rem)] font-normal leading-[1.02] tracking-[-0.03em] max-w-[14ch]"
```

(The word-by-word mask animation inside stays untouched.)

- [ ] **Step 2: Add the gold rule below the headline**

Directly after the closing `</motion.h1>` tag, insert:

```tsx
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 1.0 }}
          className="mt-8 block h-px w-10 origin-left bg-gold"
        />
```

- [ ] **Step 3: Narrow the body paragraph and tighten rhythm**

On the `<motion.p>` below it, replace className `"measure mt-10 text-lg leading-[1.7] text-paper/70 md:text-xl"` with:

```tsx
          className="mt-8 max-w-[28rem] text-base leading-[1.7] text-paper/70 md:text-lg"
```

Also change the buttons row wrapper from `mt-12` to `mt-10`, and the scroll-to-discover wrapper from `mt-14` to `mt-12` (same elements, only those two spacing classes change).

- [ ] **Step 4: Drop the location label from the top meta row**

Delete this line from the top meta row:

```tsx
        <span className="kicker hidden text-paper/60 md:block">{profile.location}</span>
```

(The goal mockup has no location text in the hero.)

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit` — expected: exit 0.
Run: `node "C:/Users/User-PC/AppData/Local/Temp/claude/D--rus-trish/1c1ea015-4b35-4c70-aa79-fa6cb8e9dcf2/scratchpad/shot.mjs" task2.png` then read `task2.png`.
Expected: headline reads "Strategy with a" on one line and gold italic "signature." on the second, all inside the left half; short gold rule under it; paragraph ~450px wide; "SCROLL TO DISCOVER" visible within the 900px viewport; no "METRO MANILA" text.

- [ ] **Step 6: Commit**

```bash
git add src/components/chapters/Hero.tsx
git commit -m "feat: contain hero headline scale and copy width to match goal UI"
```

---

### Task 3: Hero buttons — sharp rectangles

**Files:**
- Modify: `src/components/chapters/Hero.tsx`

**Interfaces:** none.

- [ ] **Step 1: Square off both CTAs**

In the hero buttons row, on the `View My Work` link replace `rounded-full` with nothing (remove the class) so the className starts:

```tsx
              className="group inline-flex items-center gap-2 bg-gold px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-obsidian transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-gold-highlight hover:shadow-[0_12px_28px_-10px_rgba(198,161,91,0.55)]"
```

On the `View Resume` link, remove `rounded-full`, change the border to `border-gold/50`, and rename the visible text to `View Résumé`:

```tsx
              className="inline-flex items-center gap-2 border border-gold/50 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-gold hover:text-gold"
```

```tsx
              View Résumé
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expected: exit 0.
Run: `node "C:/Users/User-PC/AppData/Local/Temp/claude/D--rus-trish/1c1ea015-4b35-4c70-aa79-fa6cb8e9dcf2/scratchpad/shot.mjs" task3.png` then read `task3.png`.
Expected: both hero CTAs are sharp-cornered rectangles — gold filled "VIEW MY WORK →" and gold-outlined "VIEW RÉSUMÉ ↓".

- [ ] **Step 3: Commit**

```bash
git add src/components/chapters/Hero.tsx
git commit -m "feat: square hero CTAs to match goal UI"
```

---

### Task 4: Portrait-side decor — stacked ghost RMP + gold wedge

**Files:**
- Modify: `src/components/chapters/Hero.tsx`

**Interfaces:** none.

- [ ] **Step 1: Stack the ghost letters vertically on desktop**

Replace the ghost `<motion.span>` content and className. Keep the wrapper's `style={{ x: ghostX }}`, `initial`, `animate`, `transition` props exactly as they are; change the className to:

```tsx
        className="pointer-events-none absolute -bottom-[6vw] left-[-4vw] select-none font-display text-[34vw] leading-none tracking-tight text-paper/[0.08] lg:inset-y-0 lg:bottom-auto lg:left-auto lg:right-[16vw] lg:top-1/2 lg:flex lg:-translate-y-1/2 lg:flex-col lg:items-center lg:text-[17vw] lg:leading-[0.82] lg:text-paper/[0.13]"
```

and change the children from the bare text `RMP` to:

```tsx
        <span>R</span>
        <span className="lg:block">M</span>
        <span className="lg:block">P</span>
```

(Default `span` is inline → "RMP" on one line on mobile; at `lg` the second and third become blocks, stacking R/M/P vertically.)

- [ ] **Step 2: Add the gold wedge and diagonal hairline at bottom-right**

Directly after the existing diagonal-accent `<div aria-hidden ... rotate-[6deg] ...` element, insert:

```tsx
      {/* Gold wedge — bottom-right corner accent from the goal mockup */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 z-0 hidden h-[46vh] w-[24vw] bg-gradient-to-tl from-gold/70 via-gold/25 to-transparent [clip-path:polygon(100%_18%,100%_100%,0_100%)] lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[20vw] z-0 hidden h-[60vh] w-px origin-bottom rotate-[32deg] bg-gradient-to-t from-gold/50 to-transparent lg:block"
      />
```

The portrait wrapper already has `z-10`, so it renders above the wedge.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — expected: exit 0.
Run: `node "C:/Users/User-PC/AppData/Local/Temp/claude/D--rus-trish/1c1ea015-4b35-4c70-aa79-fa6cb8e9dcf2/scratchpad/shot.mjs" task4.png` then read `task4.png`.
Expected: tall R / M / P letters visibly stacked behind the portrait; gold diagonal wedge in the bottom-right corner behind the portrait; thin gold diagonal line beside it. Portrait renders on top of both.

- [ ] **Step 4: Commit**

```bash
git add src/components/chapters/Hero.tsx
git commit -m "feat: stack ghost RMP letters and add gold wedge accent to hero"
```

---

## Deliberately skipped (YAGNI)

- Architectural photo texture on the left background of the mockup — needs a sourced image asset; add later if the flat dark reads too empty.
- "HD" badge in the mockup's top-right corner — it is a video-player artifact in the reference screenshot, not UI.
