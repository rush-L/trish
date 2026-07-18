# Trisha — Personal Brand Experience

An award-tier, single-page editorial brand experience for a **Registered Marketing
Professional**. Built as a 7-chapter scroll narrative, not a portfolio template.

## Run it

```bash
npm run dev      # http://localhost:3000
npm run build    # production build (currently fully static ○)
npm run start    # serve the production build
```

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Framer Motion 12 ·
GSAP · Lenis (smooth scroll) · Lucide · next/font (Fraunces + Inter + JetBrains Mono).

## The 7 chapters (`src/components/chapters/`)

| # | File | What it is |
|---|------|------------|
| — | `Hero.tsx` | Opening brand statement, masked headline, parallax ghost "RMP" |
| 01 | `Philosophy.tsx` | The mind behind the strategy — three operating tenets |
| 02 | `Journey.tsx` | Sticky, scroll-tracked career progression (student → Area Manager → RMP) |
| 03 | `Beyond.tsx` | Marketing beyond campaigns — editorial ledger rows |
| 04 | `Dashboard.tsx` | Power-BI-style analytics: animated radar, KPIs, trajectory line chart |
| 05 | `Work.tsx` | Case studies as expandable stories (Problem → Future Improvements) |
| 06 | `Thinking.tsx` | Frameworks + operating principles manifesto |
| 07 | `Human.tsx` | Beyond work — pull quote, facets, learning goals |
| — | `Contact.tsx` | Closing statement, magnetic CTA, oversized signature |

## ⚠️ ONE FILE TO EDIT: `src/content/profile.ts`

**Every factual detail lives in this one file.** There are **38 `🔶` markers** for
things only the résumé has. Search the file for `🔶` and replace. Priority order:

1. **Identity** — `firstName`, `lastName`, `fullName`, `location`, `email`, socials.
2. **Journey stages** — real `year`, `org` (employers), and the education institution/degree.
3. **Work projects** — real project `name`s and the `outcome` numbers (currently
   marked as `🔶 Quantified result…`). Real, verifiable metrics make this land.
4. **Dashboard** — `kpis` and `competencies` values; tune to the résumé.
5. **Human** — favorite quote, real hobbies, learning goals.
6. `metadataBase` URL in `src/app/layout.tsx` → the real domain.

The narrative copy is written as storytelling (per the brief) — rewrite freely, but
the structure will re-render automatically from whatever you put in `profile.ts`.

## Design system (`src/app/globals.css`)

Palette: `paper` (off-white), `graphite`, `navy`, `emerald` (signature), `gold`,
`cyan`, `obsidian` (immersive dark chapters). Type scale, easings, glassmorphism,
paper grain, and reduced-motion / focus-visible accessibility all defined there.

## Imagery

Currently zero photographs — pure typographic/editorial + data-viz, so it looks
finished without assets. Drop real photos into `public/` and wire them into the
relevant chapter when ready (portrait for Hero, imagery for Human/Work).

## Notes

- Custom cursor, magnetic buttons, and smooth scroll auto-disable on touch devices
  and when `prefers-reduced-motion` is set.
- Build is fully static → strong Lighthouse/SEO baseline. Person JSON-LD is injected
  in `layout.tsx`.
