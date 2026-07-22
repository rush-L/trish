# Dark Theme Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the whole site (Hero, Summary, Skills, Work) onto the dark "obsidian" ground already used by Journey/Achievements/Contact, and redesign the Hero's portrait/watermark/CTA row per the approved Option-B-inspired design — without touching `src/content/profile.ts`.

**Architecture:** Flip the base `body` theme in `globals.css` (light→dark) so backgroundless sections inherit dark automatically, add one `data-theme="dark"` attribute to `<body>` so the existing theme-aware `Cursor.tsx` adapts sitewide, then mechanically swap light-ground utility classes (`text-graphite*`, `text-ink-muted`, `border-graphite/*`, `border-ink-15`, `bg-paper-dim`, `gold-ink`) for their already-established dark-ground equivalents (`text-paper/NN`, `border-paper/*`, `gold`) file by file. Hero also gets a structural redesign of its portrait, watermark, and bottom row.

**Tech Stack:** Next.js (app router), Tailwind v4 (`@theme` tokens in `globals.css`), Framer Motion, lucide-react icons.

## Global Constraints

- Do not modify `src/content/profile.ts` — no copy/data changes, only presentation.
- Do not change nav chapter links, chapter IDs, or section content — only their color classes.
- Every color swap must use an existing token already established by the dark sections (`text-paper/NN`, `border-paper/*`, `bg-obsidian`, `bg-obsidian-soft`, `gold`, `cyan`) — no new colors invented.
- `Journey.tsx`, `Achievements.tsx`, `Contact.tsx` are already dark and are **not modified** by this plan (verify diff touches only the 7 files listed below).
- Verification for every task is visual (dev server screenshot via the browser tool already connected to `localhost:3000`), not unit tests — this is a CSS/JSX presentation-only change with no business logic.

---

### Task 1: `globals.css` — flip base theme

**Files:**
- Modify: `src/app/globals.css:48` (global border-color reset)
- Modify: `src/app/globals.css:57-59` (`body` rule)
- Modify: `src/app/globals.css:73-76` (`::selection`)
- Modify: `src/app/globals.css:198` (`:focus-visible`)

**Interfaces:**
- Produces: the new "default ground" every backgroundless section (Hero, Summary, Skills, Work) will inherit. All later tasks depend on this being done first.

- [ ] **Step 1: Flip the `body` background/text**

Before:
```css
body {
  background: var(--color-paper);
  color: var(--color-graphite);
  font-family: var(--font-sans);
  font-feature-settings: "ss01", "cv01", "cv11";
  overflow-x: hidden;
}
```

After:
```css
body {
  background: var(--color-obsidian);
  color: var(--color-paper);
  font-family: var(--font-sans);
  font-feature-settings: "ss01", "cv01", "cv11";
  overflow-x: hidden;
}
```

- [ ] **Step 2: Update the global border-color safety net**

Before:
```css
* {
  border-color: var(--color-ink-15);
}
```

After:
```css
* {
  border-color: rgba(245, 242, 236, 0.14);
}
```

- [ ] **Step 3: Recolor selection and focus-outline for dark-ground contrast**

Before:
```css
::selection {
  background: var(--color-gold-ink);
  color: var(--color-paper);
}
```

After:
```css
::selection {
  background: var(--color-gold);
  color: var(--color-obsidian);
}
```

Before:
```css
:focus-visible {
  outline: 2px solid var(--color-gold-ink);
  outline-offset: 3px;
  border-radius: 2px;
}
```

After:
```css
:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
  border-radius: 2px;
}
```

- [ ] **Step 4: Sanity check**

The page will look visually broken at this point (dark background, but component text colors not yet updated) — that's expected. Confirm the dev server (already running on :3000) hot-reloads without CSS errors: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000` → expect `200`.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: flip base theme to dark ground"
```

---

### Task 2: `layout.tsx` — sitewide dark cursor + metadata

**Files:**
- Modify: `src/app/layout.tsx:46-49` (`viewport` export)
- Modify: `src/app/layout.tsx:74` (`<body>` tag)

**Interfaces:**
- Consumes: nothing new.
- Produces: `data-theme="dark"` on `<body>`, read by `src/components/ui/Cursor.tsx`'s existing `target?.closest('[data-theme="dark"]')` check (Cursor.tsx itself is unmodified — it already supports this).

- [ ] **Step 1: Update viewport metadata**

Before:
```tsx
export const viewport: Viewport = {
  themeColor: "#f5f2ec",
  colorScheme: "light",
};
```

After:
```tsx
export const viewport: Viewport = {
  themeColor: "#0a0e14",
  colorScheme: "dark",
};
```

- [ ] **Step 2: Add `data-theme="dark"` to `<body>`**

Before:
```tsx
      <body className="grain antialiased">
```

After:
```tsx
      <body data-theme="dark" className="grain antialiased">
```

- [ ] **Step 3: Verify the cursor picks up dark colors everywhere**

With the dev server running, screenshot `localhost:3000`, move the mouse over a plain (non-interactive) area of the Hero using the browser tool's `computer` action (`hover` then `screenshot`) and confirm the cursor dot renders light (paper-colored), not the graphite-colored light-theme default — this proves `data-theme="dark"` is being read correctly before the rest of the page is recolored.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: mark body dark-themed for sitewide cursor + metadata"
```

---

### Task 3: `Nav.tsx` — dark header, side rail, mobile menu toggle

**Files:**
- Modify: `src/components/ui/Nav.tsx:89` (header glass class)
- Modify: `src/components/ui/Nav.tsx:99-100` (logo dot + credential)
- Modify: `src/components/ui/Nav.tsx:111,120,122` (Résumé/Available pills)
- Modify: `src/components/ui/Nav.tsx:141,146,151` (hamburger lines)
- Modify: `src/components/ui/Nav.tsx:20-22,228-264` (delete `DARK_CHAPTERS`, simplify side rail)
- Modify: `src/components/ui/Nav.tsx:268` (scroll progress bar)

**Interfaces:**
- Consumes: nothing new.
- Produces: nothing consumed by later tasks — Nav is a leaf for this plan.

- [ ] **Step 1: Header glass + border**

Before:
```tsx
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid || menuOpen ? "glass border-b border-ink-15" : ""
        }`}
```

After:
```tsx
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid || menuOpen ? "glass-dark border-b border-paper/10" : ""
        }`}
```

- [ ] **Step 2: Logo accent dot + credential label**

Before:
```tsx
            {profile.firstName}
            <span className="text-gold-ink">.</span>
            <span className="ml-2 align-super font-mono text-[10px] tracking-[0.25em] text-ink-muted">
```

After:
```tsx
            {profile.firstName}
            <span className="text-gold">.</span>
            <span className="ml-2 align-super font-mono text-[10px] tracking-[0.25em] text-paper/60">
```

- [ ] **Step 3: Résumé + Available pill buttons**

Before (Résumé, line 111):
```tsx
                className="hidden items-center gap-2 rounded-full border border-graphite/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-graphite hover:text-paper sm:inline-flex"
```

After:
```tsx
                className="hidden items-center gap-2 rounded-full border border-paper/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper hover:text-obsidian sm:inline-flex"
```

Before (Available, lines 120-123):
```tsx
                className="group inline-flex items-center gap-2 rounded-full border border-graphite/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors hover:bg-graphite hover:text-paper"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold-ink transition-colors group-hover:bg-cyan" />
```

After:
```tsx
                className="group inline-flex items-center gap-2 rounded-full border border-paper/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper hover:text-obsidian"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold transition-colors group-hover:bg-cyan" />
```

- [ ] **Step 4: Hamburger lines (3 occurrences, identical class each)**

Before (×3):
```tsx
                className="block h-px w-6 bg-graphite"
```

After (×3):
```tsx
                className="block h-px w-6 bg-paper"
```

- [ ] **Step 5: Delete `DARK_CHAPTERS` and simplify the side rail**

Before:
```tsx
// Chapters rendered on a dark ground (obsidian/navy) — the side rail's resting
// label color needs to flip here, or it reads as near-invisible dark-on-dark.
const DARK_CHAPTERS = new Set(["experience", "achievements", "contact"]);
```

After: delete this block entirely (the whole site is dark now — every chapter would hit the `onDark` branch, so the conditional is dead weight, not just unused).

Before (side rail render, lines ~228-264):
```tsx
        {CHAPTERS.map((c) => {
          const onDark = DARK_CHAPTERS.has(active);
          return (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="group flex items-center gap-2"
              data-cursor={c.label}
            >
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  active === c.id
                    ? onDark
                      ? "text-paper"
                      : "text-graphite"
                    : onDark
                      ? "text-paper/40 group-hover:text-paper"
                      : "text-ink-muted group-hover:text-graphite"
                }`}
              >
                {c.label}
              </span>
              <span
                className={`h-px transition-all duration-300 ${
                  active === c.id
                    ? onDark
                      ? "w-8 bg-gold"
                      : "w-8 bg-gold-ink"
                    : onDark
                      ? "w-4 bg-paper/30 group-hover:w-6"
                      : "w-4 bg-ink-muted group-hover:w-6"
                }`}
              />
            </a>
          );
        })}
```

After:
```tsx
        {CHAPTERS.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="group flex items-center gap-2"
            data-cursor={c.label}
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                active === c.id ? "text-paper" : "text-paper/40 group-hover:text-paper"
              }`}
            >
              {c.label}
            </span>
            <span
              className={`h-px transition-all duration-300 ${
                active === c.id ? "w-8 bg-gold" : "w-4 bg-paper/30 group-hover:w-6"
              }`}
            />
          </a>
        ))}
```

- [ ] **Step 6: Scroll progress bar**

Before:
```tsx
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gold-ink"
```

After:
```tsx
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gold"
```

- [ ] **Step 7: Visual check**

Screenshot `localhost:3000`: logo/pills/hamburger should read light-on-transparent at the top (page background is still dark from Task 1). Scroll down past 40px and screenshot again — header should show the dark glass panel with a barely-visible light hairline border, not a light glass panel. Resize or use the browser tool to open the mobile hamburger menu and confirm all three lines are visible (light on the already-dark `bg-obsidian` mobile menu panel).

- [ ] **Step 8: Commit**

```bash
git add src/components/ui/Nav.tsx
git commit -m "feat: recolor Nav for dark ground, drop dead DARK_CHAPTERS branch"
```

---

### Task 4: `Hero.tsx` — recolor + portrait/watermark/CTA redesign

**Files:**
- Modify: `src/components/chapters/Hero.tsx` (most of the file)

**Interfaces:**
- Consumes: `profile.socials` (array of `{ label, href }`, already defined in `src/content/profile.ts` — read-only, not modified) for the new social-icon row.
- Consumes: `Linkedin`, `Mail`, `Phone` icons from `lucide-react` (already a project dependency, used elsewhere in `Achievements.tsx` and `Skills.tsx`).

- [ ] **Step 1: Recolor the ghost watermark and reposition it behind the portrait on desktop**

Before:
```tsx
      {/* Oversized ghost word drifting in the background */}
      <motion.span
        aria-hidden
        style={{ x: ghostX }}
        className="pointer-events-none absolute -bottom-[6vw] left-[-4vw] select-none font-display text-[34vw] leading-none text-graphite/[0.04]"
      >
        RMP
      </motion.span>
```

After:
```tsx
      {/* Oversized ghost word — drifts bottom-left on mobile (no portrait to
          sit behind there), sits behind the portrait on the right at lg+ */}
      <motion.span
        aria-hidden
        style={{ x: ghostX }}
        className="pointer-events-none absolute -bottom-[6vw] left-[-4vw] select-none font-display text-[34vw] leading-none text-paper/[0.05] lg:inset-y-0 lg:left-auto lg:right-[-2vw] lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:text-[18vw]"
      >
        RMP
      </motion.span>
```

- [ ] **Step 2: Replace the framed portrait with a large edge-to-edge photo**

Before:
```tsx
      {/* Portrait — framed, desktop only */}
      <motion.div
        style={{ y, opacity }}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.4 }}
        className="pointer-events-none absolute right-6 top-28 z-10 hidden w-[21vw] max-w-[320px] md:right-10 lg:block"
      >
        <div className="group relative border border-graphite/15 bg-paper-dim p-3 shadow-[0_40px_80px_-24px_rgba(26,28,30,0.3)] transition-shadow duration-500">
          <span className="absolute -left-px -top-px h-6 w-6 border-l-2 border-t-2 border-gold-ink" aria-hidden />
          <span className="absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-gold-ink" aria-hidden />
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={profile.media.portrait}
              alt={profile.fullName}
              fill
              priority
              sizes="320px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-graphite/15 via-transparent to-transparent" />
          </div>
        </div>
        <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.25em] text-ink-muted">
          {profile.fullName} · {profile.credential}
        </span>
      </motion.div>
```

After:
```tsx
      {/* Portrait — large, edge-to-edge, desktop only */}
      <motion.div
        style={{ y, opacity }}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.4 }}
        className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[38vw] max-w-[560px] lg:block"
      >
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={profile.media.portrait}
            alt={profile.fullName}
            fill
            priority
            sizes="38vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-obsidian via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/40 via-transparent to-transparent" />
        </div>
      </motion.div>
```

- [ ] **Step 3: Top meta row — recolor kickers, mobile avatar border**

Before:
```tsx
          <div className="relative h-9 w-9 flex-none overflow-hidden rounded-full border border-graphite/20 lg:hidden">
            <Image src={profile.media.portrait} alt={profile.fullName} fill sizes="36px" className="object-cover" />
          </div>
          <span className="kicker text-ink-muted">{profile.title}</span>
        </div>
        <span className="kicker hidden text-ink-muted md:block">{profile.location}</span>
```

After:
```tsx
          <div className="relative h-9 w-9 flex-none overflow-hidden rounded-full border border-paper/20 lg:hidden">
            <Image src={profile.media.portrait} alt={profile.fullName} fill sizes="36px" className="object-cover" />
          </div>
          <span className="kicker text-paper/60">{profile.title}</span>
        </div>
        <span className="kicker hidden text-paper/60 md:block">{profile.location}</span>
```

- [ ] **Step 4: Headline accent color**

Before:
```tsx
                className={`inline-block ${w === "signature." ? "italic text-gold-ink" : ""}`}
```

After:
```tsx
                className={`inline-block ${w === "signature." ? "italic text-gold" : ""}`}
```

- [ ] **Step 5: Subhead paragraph color**

Before:
```tsx
          className="measure mt-8 text-lg leading-relaxed text-graphite-soft md:text-xl"
```

After:
```tsx
          className="measure mt-8 text-lg leading-relaxed text-paper/70 md:text-xl"
```

- [ ] **Step 6: CTA buttons — recolor + relabel résumé button**

Before:
```tsx
          <Magnetic strength={0.4}>
            <a
              href="#projects"
              data-cursor="View"
              className="group inline-flex items-center gap-2 rounded-full bg-gold-ink px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-graphite"
            >
              View My Work
              <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <a
              href={profile.resumeUrl}
              download
              data-cursor="Download"
              className="inline-flex items-center gap-2 rounded-full border border-graphite/25 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-graphite transition-colors hover:bg-graphite hover:text-paper"
            >
              Download Résumé
            </a>
          </Magnetic>
        </motion.div>
```

After:
```tsx
          <Magnetic strength={0.4}>
            <a
              href="#projects"
              data-cursor="View"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-obsidian transition-colors hover:bg-paper"
            >
              View My Work
              <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <a
              href={profile.resumeUrl}
              download
              data-cursor="Download"
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper hover:text-obsidian"
            >
              View Resume
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 1.35 }}
          className="mt-6 flex items-center gap-5"
        >
          {profile.socials.map((s) => {
            const Icon = s.label === "LinkedIn" ? Linkedin : s.label === "Email" ? Mail : Phone;
            return (
              <Magnetic key={s.label} strength={0.3}>
                <a
                  href={s.href}
                  target={s.label === "LinkedIn" ? "_blank" : undefined}
                  rel={s.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                  data-cursor={s.label}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/25 text-paper/70 transition-colors hover:border-paper hover:text-paper"
                >
                  <Icon aria-hidden="true" size={15} strokeWidth={1.5} />
                </a>
              </Magnetic>
            );
          })}
        </motion.div>
```

Note the added `import { Linkedin, Mail, Phone } from "lucide-react";` in Step 8 — this new social-icon row replaces the removed bottom name/scroll row from Step 7 below.

- [ ] **Step 7: Remove the bottom name+scroll row**

Before:
```tsx
      {/* Bottom row: name + scroll cue */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="relative z-10 flex items-end justify-between"
      >
        <div className="flex items-baseline gap-3">
          <span className="font-display text-2xl md:text-3xl">{profile.fullName}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold-ink">
            {profile.credential}
          </span>
        </div>
        <a
          href="#ch1"
          data-cursor="Read"
          className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted"
        >
          Scroll
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block h-8 w-px bg-graphite/40"
          />
        </a>
      </motion.div>
    </section>
  );
}
```

After:
```tsx
    </section>
  );
}
```

- [ ] **Step 8: Add the icon import**

Before:
```tsx
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { profile } from "@/content/profile";
```

After:
```tsx
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Linkedin, Mail, Phone } from "lucide-react";
import { useRef } from "react";
import { profile } from "@/content/profile";
```

- [ ] **Step 9: Visual check**

Screenshot `localhost:3000` full Hero (desktop viewport ≥1280px wide). Confirm: dark background throughout, "signature." reads in gold italic, subhead readable at ~70% white, both CTA buttons legible (gold pill with dark text, outline pill with light text — "View Resume" label), 3 social icons visible under the buttons, large portrait bleeding off the right edge with a visible left-side fade into the dark background, "RMP" watermark faintly visible behind the portrait, no bottom name/scroll row. Also screenshot a narrow/mobile viewport and confirm the small circular avatar + top meta row still read correctly and the ghost watermark still drifts bottom-left (not clipped oddly) since the large portrait is hidden below `lg`.

- [ ] **Step 10: Commit**

```bash
git add src/components/chapters/Hero.tsx
git commit -m "feat: redesign Hero for dark ground — large portrait, repositioned watermark, social row"
```

---

### Task 5: `Summary.tsx` — recolor

**Files:**
- Modify: `src/components/chapters/Summary.tsx:12`

- [ ] **Step 1: Recolor the lede paragraph**

Before:
```tsx
        <Reveal className="measure text-lg leading-relaxed text-graphite-soft md:text-xl">
```

After:
```tsx
        <Reveal className="measure text-lg leading-relaxed text-paper/70 md:text-xl">
```

- [ ] **Step 2: Visual check**

Scroll to just below the Hero and screenshot — the summary paragraph should read as light text on the dark ground, not invisible dark-on-dark.

- [ ] **Step 3: Commit**

```bash
git add src/components/chapters/Summary.tsx
git commit -m "feat: recolor Summary for dark ground"
```

---

### Task 6: `Skills.tsx` — recolor

**Files:**
- Modify: `src/components/chapters/Skills.tsx:22,32,35,41,46,55`

- [ ] **Step 1: Kicker**

Before:
```tsx
        <Reveal className="kicker mb-10 text-gold-ink">{kicker}</Reveal>
```

After:
```tsx
        <Reveal className="kicker mb-10 text-gold">{kicker}</Reveal>
```

- [ ] **Step 2: Category card border/background**

Before:
```tsx
                className="group relative rounded-2xl border border-ink-15 bg-paper p-8 transition-all duration-500 hover:border-gold-ink/40 hover:bg-paper-dim"
```

After:
```tsx
                className="group relative rounded-2xl border border-paper/10 bg-paper/[0.03] p-8 transition-all duration-500 hover:border-gold/40 hover:bg-paper/[0.06]"
```

- [ ] **Step 3: Index number + icon**

Before:
```tsx
                  <span className="font-mono text-xs text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                  {Icon && (
                    <Icon
                      aria-hidden="true"
                      size={22}
                      strokeWidth={1.25}
                      className="text-gold-ink/40 transition-colors duration-500 group-hover:text-gold-ink"
                    />
                  )}
```

After:
```tsx
                  <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                  {Icon && (
                    <Icon
                      aria-hidden="true"
                      size={22}
                      strokeWidth={1.25}
                      className="text-gold/40 transition-colors duration-500 group-hover:text-gold"
                    />
                  )}
```

- [ ] **Step 4: Category label**

Before:
```tsx
                <span className="mt-6 block kicker text-ink-muted">{c.label}</span>
```

After:
```tsx
                <span className="mt-6 block kicker text-paper/60">{c.label}</span>
```

- [ ] **Step 5: Item pills**

Before:
```tsx
                      className="rounded-full border border-graphite/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-graphite-soft"
```

After:
```tsx
                      className="rounded-full border border-paper/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/70"
```

- [ ] **Step 6: Visual check**

Scroll to the Skills section and screenshot — cards should show a faint light border/tint against the dark ground (matching Journey's `StageCard` look), gold icons/numbers, readable pills.

- [ ] **Step 7: Commit**

```bash
git add src/components/chapters/Skills.tsx
git commit -m "feat: recolor Skills for dark ground"
```

---

### Task 7: `Work.tsx` — recolor + Carousel accent props

**Files:**
- Modify: `src/components/chapters/Work.tsx` (multiple lines, listed per step)

- [ ] **Step 1: Divider borders (3 occurrences)**

Before (line 37):
```tsx
    <div className="border-b border-ink-15">
```
After:
```tsx
    <div className="border-b border-paper/10">
```

Before (line 288):
```tsx
        <div className="border-t border-ink-15">
```
After:
```tsx
        <div className="border-t border-paper/10">
```

- [ ] **Step 2: Case study header — index, meta, tag, plus icon**

Before:
```tsx
        <span className="col-span-2 font-mono text-sm text-gold-ink md:col-span-1">{project.index}</span>
        <div className="col-span-10 md:col-span-7">
          <h3 className="font-display text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
            {project.name}
          </h3>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
            {company} · {role} · {duration}
          </p>
          {metrics.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {metrics.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-gold-ink/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-gold-ink"
                >
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>
        <span className="col-span-8 col-start-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted md:col-span-3 md:col-start-auto">
          {project.tag}
        </span>
        <span aria-hidden="true" className="col-span-2 flex justify-end md:col-span-1">
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.4 }} className="text-2xl text-gold-ink">
            +
          </motion.span>
        </span>
```

After:
```tsx
        <span className="col-span-2 font-mono text-sm text-gold md:col-span-1">{project.index}</span>
        <div className="col-span-10 md:col-span-7">
          <h3 className="font-display text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
            {project.name}
          </h3>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-paper/60">
            {company} · {role} · {duration}
          </p>
          {metrics.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {metrics.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-gold/30 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-gold"
                >
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>
        <span className="col-span-8 col-start-3 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 md:col-span-3 md:col-start-auto">
          {project.tag}
        </span>
        <span aria-hidden="true" className="col-span-2 flex justify-end md:col-span-1">
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.4 }} className="text-2xl text-gold">
            +
          </motion.span>
        </span>
```

- [ ] **Step 3: Gallery group labels + media containers (grouped gallery path)**

Before:
```tsx
                        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                          {group.label}
                        </p>
                        <Carousel
                          label={`${project.name} — ${group.label}`}
                          slideClassName="w-[85vw] max-w-[560px] md:w-[560px]"
                        >
                          {group.items.map((g, i) => (
                            <div key={g.src ?? g.video} className="h-full overflow-hidden border border-ink-15 bg-graphite">
```

After:
```tsx
                        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
                          {group.label}
                        </p>
                        <Carousel
                          label={`${project.name} — ${group.label}`}
                          accent="bg-gold"
                          slideClassName="w-[85vw] max-w-[560px] md:w-[560px]"
                        >
                          {group.items.map((g, i) => (
                            <div key={g.src ?? g.video} className="h-full overflow-hidden border border-paper/10 bg-graphite">
```

- [ ] **Step 4: Non-grouped gallery path**

Before:
```tsx
                  <Carousel label={`${project.name} gallery`} slideClassName="w-[85vw] max-w-[560px] md:w-[560px]">
                    {gallery!.map((g, i) => (
                      <div key={g.src} className="h-full overflow-hidden border border-ink-15 bg-graphite">
```

After:
```tsx
                  <Carousel label={`${project.name} gallery`} accent="bg-gold" slideClassName="w-[85vw] max-w-[560px] md:w-[560px]">
                    {gallery!.map((g, i) => (
                      <div key={g.src} className="h-full overflow-hidden border border-paper/10 bg-graphite">
```

- [ ] **Step 5: Single image/video fallback path + imageCaption**

Before:
```tsx
                    <div className="overflow-hidden border border-ink-15 bg-graphite">
```

After:
```tsx
                    <div className="overflow-hidden border border-paper/10 bg-graphite">
```

Before:
```tsx
                    {imageCaption && (
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
                        {imageCaption}
                      </p>
                    )}
```

After:
```tsx
                    {imageCaption && (
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-paper/60">
                        {imageCaption}
                      </p>
                    )}
```

- [ ] **Step 6: Problem / Responsibilities / Tools / Business Impact / Lessons fields**

Before:
```tsx
                {
                  label: "The Problem",
                  content: <p className="text-[15px] leading-relaxed text-graphite-soft">{project.problem}</p>,
                },
                {
                  label: "Responsibilities",
                  content: (
                    <ul className="space-y-1.5">
                      {project.responsibilities.map((r, i) => (
                        <li key={i} className="flex gap-2 text-[15px] leading-relaxed text-graphite-soft">
                          <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-graphite/40" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  ),
                },
                ...(tools && tools.length > 0
                  ? [
                      {
                        label: "Tools Used",
                        content: (
                          <div className="flex flex-wrap gap-2">
                            {tools.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-graphite/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-graphite-soft"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        ),
                      },
                    ]
                  : []),
                {
                  label: "Business Impact",
                  content: <p className="font-display text-xl text-gold-ink md:text-2xl">{project.outcome}</p>,
                },
                {
                  label: "Lessons Learned",
                  content: <p className="text-[15px] leading-relaxed text-graphite-soft">{project.takeaway}</p>,
                },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="font-mono text-[10px] text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">{f.label}</span>
                  </div>
                  {f.content}
                </motion.div>
              ))}
```

After:
```tsx
                {
                  label: "The Problem",
                  content: <p className="text-[15px] leading-relaxed text-paper/70">{project.problem}</p>,
                },
                {
                  label: "Responsibilities",
                  content: (
                    <ul className="space-y-1.5">
                      {project.responsibilities.map((r, i) => (
                        <li key={i} className="flex gap-2 text-[15px] leading-relaxed text-paper/70">
                          <span className="mt-[9px] h-1 w-1 flex-none rounded-full bg-paper/40" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  ),
                },
                ...(tools && tools.length > 0
                  ? [
                      {
                        label: "Tools Used",
                        content: (
                          <div className="flex flex-wrap gap-2">
                            {tools.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-paper/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-paper/70"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        ),
                      },
                    ]
                  : []),
                {
                  label: "Business Impact",
                  content: <p className="font-display text-xl text-gold md:text-2xl">{project.outcome}</p>,
                },
                {
                  label: "Lessons Learned",
                  content: <p className="text-[15px] leading-relaxed text-paper/70">{project.takeaway}</p>,
                },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <span className="font-mono text-[10px] text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">{f.label}</span>
                  </div>
                  {f.content}
                </motion.div>
              ))}
```

- [ ] **Step 7: Section kicker**

Before:
```tsx
        <Reveal className="kicker mb-10 text-gold-ink">{kicker}</Reveal>
```

After:
```tsx
        <Reveal className="kicker mb-10 text-gold">{kicker}</Reveal>
```

- [ ] **Step 8: Visual check**

Scroll to the Work section, screenshot the collapsed list (index/name/tag/metrics pills should read gold-on-dark), then click a case study open (`onToggle`) and screenshot the expanded panel — Problem/Responsibilities/Tools/Impact/Lessons text should be legible light text, gallery carousel's active-slide dot should render gold (not the muddy light-ground `gold-ink` default).

- [ ] **Step 9: Commit**

```bash
git add src/components/chapters/Work.tsx
git commit -m "feat: recolor Work for dark ground, fix Carousel accent prop"
```

---

### Task 8: Full-site regression pass

**Files:** none (verification only)

- [ ] **Step 1: Confirm the diff touched only the planned files**

```bash
git diff --stat a228967 HEAD -- src/
```
Expected: only `src/app/globals.css`, `src/app/layout.tsx`, `src/components/ui/Nav.tsx`, `src/components/chapters/Hero.tsx`, `src/components/chapters/Summary.tsx`, `src/components/chapters/Skills.tsx`, `src/components/chapters/Work.tsx`. `src/content/profile.ts`, `Journey.tsx`, `Achievements.tsx`, `Contact.tsx` must **not** appear.

- [ ] **Step 2: Full-page walkthrough**

With the dev server running, screenshot the page at these scroll positions and confirm no invisible (same-color-as-background) text anywhere, no leftover light-panel boxes, and consistent gold accent usage: top of page (Hero+Nav), Summary, Skills, Journey/Experience (unchanged, sanity check it still looks right next to the newly-dark neighbors), Work (collapsed and one expanded case study), Achievements (unchanged), Contact/footer (unchanged). Also re-check the mobile hamburger menu.

- [ ] **Step 3: Run lint/typecheck**

```bash
npm run lint
```
Expected: no new errors introduced (pre-existing warnings, if any, are out of scope).

- [ ] **Step 4: Confirm `profile.ts` is untouched**

```bash
git diff a228967 HEAD -- src/content/profile.ts
```
Expected: empty output.
