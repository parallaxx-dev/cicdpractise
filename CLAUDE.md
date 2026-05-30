# oci-portfolio — CLAUDE.md

## Project overview

A personal portfolio for Aaditya Pyarla built with **React 19 + Vite + TypeScript**, styled to exactly match the design language of the standalone HTML file (`Aaditya Pyarla _standalone_.html` in `~/Downloads`), extended with four hand-coded interactive browser games accessible via React Router.

---

## Tech stack

| Layer | Technology |
|---|---|
| Bundler | Vite 8 + `@vitejs/plugin-react` + `@tailwindcss/vite` |
| Framework | React 19 + TypeScript 6 |
| Routing | React Router DOM v7 |
| UI library | shadcn/ui (Card, Badge, Button, Separator — in `src/components/ui/`) |
| CSS | Tailwind CSS v4 (`@import "tailwindcss"` first in `index.css`) |
| Fonts | Inter (300–800), Instrument Serif (400 italic), JetBrains Mono (400–600) — Google Fonts CDN |

---

## Design system (must be preserved exactly)

### Color tokens — `--p-*` custom properties in `index.css`

```
--p-bg:       #07070b         (near-black background)
--p-ink:      #f4f3ee         (warm white text)
--p-muted:    #8b8a96         (muted/secondary text)
--p-line:     rgba(255,255,255,0.08)   (subtle borders)
--p-line-2:   rgba(255,255,255,0.14)   (slightly stronger borders)
--p-card:     rgba(255,255,255,0.025)  (card background)
--p-violet:   #8b5cf6
--p-indigo:   #6366f1
--p-cyan:     #22d3ee
--p-magenta:  #ec4899
--p-amber:    #fbbf24
--p-lime:     #a3e635
```

> **Rule**: always use `--p-*` tokens for portfolio colours. Do NOT use shadcn's `--card`, `--muted`, `--border`, etc. in portfolio components — those are only for shadcn internals.

### Heading gradient

```css
linear-gradient(135deg, #c4b5fd 0%, #f9a8d4 50%, #67e8f9 100%)
```

Applied via `.gradient-text` utility class (defined in `index.css`) or inline with `-webkit-background-clip: text`.

### Background layer stack (z-order)

| z-index | Element | Description |
|---|---|---|
| 0 | `Aurora` component | Three animated radial blobs (violet/cyan/magenta), `filter: blur(110px)`, `position: fixed` |
| 1 | `.grain` | SVG fractalNoise, `mix-blend-mode: overlay`, `opacity: 0.6` |
| 1 | `.vignette` | `radial-gradient` black edges |
| 2 | Content | All page content, `position: relative` |

### Typography rules

| Use case | Font | Weight | Letter-spacing |
|---|---|---|---|
| Large headings (hero name, section titles) | Inter | 700–800 | `-0.035em` to `-0.045em` |
| Gradient italic (name, section em words) | Instrument Serif italic | 400 | `-0.02em` |
| Labels, pills, code, section numbers | JetBrains Mono | 400–600 | varies |
| Body / paragraphs | Inter | 400 | default |

### Key UI patterns

- **Nav pill**: `backdrop-filter: blur(20px) saturate(150%)`, `border-radius: 100px`, `position: fixed; top: 24px`, centered via `left: 50%; transform: translateX(-50%)`
- **Cards**: `rgba(255,255,255,0.025)` bg + `1px solid rgba(255,255,255,0.08)` border + `border-radius: 16–24px`
- **Hover glow**: `box-shadow: 0 0 40–60px <accent-rgba>` + `translateY(-2px)` on hover
- **Avatar ring**: `conic-gradient(from 0deg, violet, cyan, magenta, amber, violet)` + `animation: ring-spin 18s linear infinite`; inner circle `inset: 6px`, `background: #07070b`
- **Section numbers**: JetBrains Mono 14px muted, pattern `/ 01`, `/ 02`, `/ 03`
- **Social cards** (contact section): `flex-direction: column`, icon box 32×32px with `border-radius: 8px`, label in mono uppercase 10px, handle 14px 500 weight

### Contact section structure (exact)

The contact section (`ContactSection.tsx`) has NO `SectionHead` — it goes directly into a `.contact-box` div:

1. `contact-box` — centered (`text-align: center`), `background: linear-gradient(180deg, rgba(139,92,246,0.08), rgba(34,211,238,0.04))`, `border-radius: 32px`, `padding: 72px 56px`
2. Radial violet glow pseudo-element at top center
3. Heading `Let's build something.` — `clamp(40px, 6vw, 72px)`, `font-weight: 700`
4. Sub-paragraph — muted, `max-width: 500px`, centered
5. Two CTA buttons centred: email (`btn-primary`) + GitHub (`btn-ghost`)
6. **Socials grid — 5 columns**: GitHub (`@parallaxx-dev`), LinkedIn (`aaditya-pyarla`), X (`@aadityap_003`), Codeforces (`pyarlax`), CodeChef (`pyarllax`)
7. **Footer** below the section: `© 2026 Aaditya Pyarla · made with ♥ in Mumbai` left + `parallaxx-dev/portfolio · v1.0` right

---

## Route map

```
/                     → Portfolio.tsx       (full portfolio: Hero, Marquee, About, Stack, Work, Contact+Footer)
/games                → GamesHub.tsx        (4 game cards + ← back to portfolio link)
/games/dino           → DinoGame.tsx        (Canvas endless runner)
/games/tic-tac-toe    → TicTacToe.tsx       (Minimax AI)
/games/space-invaders → SpaceInvaders.tsx   (Canvas shooter)
/games/hangman        → Hangman.tsx         (SVG gallows + word bank)
```

---

## File structure

```
src/
├── main.tsx                          ← StrictMode + BrowserRouter + App
├── App.tsx                           ← Aurora + Nav + Routes (all 6 routes)
├── index.css                         ← Google Fonts @import (MUST be first line)
│                                        + Tailwind imports + shadcn imports
│                                        + --p-* design tokens + global keyframes
│
├── components/
│   ├── Aurora.tsx                    ← Three drift-animated blobs + .grain + .vignette
│   ├── Nav.tsx                       ← Frosted pill nav; shows anchor links only on /
│                                        Always shows brand (→ /) and Games (→ /games)
│   ├── GameLayout.tsx                ← Shared game page shell; breadcrumb: ← portfolio / ← games
│   └── portfolio/
│       ├── HeroSection.tsx           ← Hero grid (text left, avatar right)
│       │                                Avatar: spinning conic ring + hero.jpg + two floating tags
│       ├── Marquee.tsx               ← Infinite scrolling ticker (6 items doubled, CSS animation)
│       ├── SectionHead.tsx           ← `<SectionHead number title blurb>` + `<GradientEm>`
│       ├── AboutSection.tsx          ← Bio paragraphs + InfoCard aside + 4-stat grid
│       ├── StackSection.tsx          ← 12 tech cards, auto-fill grid, gradient level dots
│       ├── WorkSection.tsx           ← 6 project cards in 2-col grid; wide variant spans both cols
│       └── ContactSection.tsx        ← Exact replica of original: contact-box + 5 socials + footer
│
├── pages/
│   ├── Portfolio.tsx                 ← Composes Hero → Marquee → About → Stack → Work → Contact
│   └── games/
│       ├── GamesHub.tsx              ← ← back to portfolio + 4 game cards (2×2 grid)
│       ├── DinoGame.tsx              ← Canvas 800×200; physics jump, obstacle spawn, speed ramp
│       ├── TicTacToe.tsx             ← Pure React state; minimax AI; scoreboard; restart
│       ├── SpaceInvaders.tsx         ← Canvas 800×480; alien grid, wave system, lives, bullets
│       └── Hangman.tsx               ← SVG gallows 6 stages; 50-word bank; keyboard grid; score
│
├── assets/
│   ├── hero.jpg                      ← Real profile photo extracted from the standalone HTML bundle
│   └── hero.png                      ← Old placeholder (unused — do not import)
│
└── components/ui/                    ← shadcn generated: button.tsx, card.tsx, badge.tsx, separator.tsx
```

---

## tsconfig / build quirks

- `tsconfig.app.json` has `"ignoreDeprecations": "6.0"` — required because TypeScript 6 deprecated `baseUrl`, but it's still needed alongside `paths` for the `@/*` alias to work with Vite's bundler module resolution.
- `@import url("https://fonts.googleapis.com/...")` **must be the very first line** of `index.css` — CSS spec requires `@import url()` to precede all other rules; violating this causes a build warning.

---

## Dev commands

```bash
npm run dev      # Vite dev server on :5173
npm run build    # tsc -b && vite build (production)
npm run lint     # eslint
```

---

## Game implementation notes

| Game | Canvas size | Key mechanic |
|---|---|---|
| DinoGame | 800×200 | `GRAVITY = 0.6`, `JUMP_VEL = -13`; obstacles spawn from right, speed ramps every 500 score ticks |
| TicTacToe | DOM (no canvas) | Full minimax with depth; AI move fires after 280ms setTimeout for feel |
| SpaceInvaders | 800×480 | Alien step-speed = `max(4, 28 - liveAliens.length)` so it speeds up as you kill them; waves reset on clear |
| Hangman | DOM (SVG) | 50-word programming bank; 6 wrong guesses = loss; SVG draws head, body, arms, legs in order |

---

## Navigation / UX rules

- **Nav** always shows on every page (rendered in `App.tsx` above `<Routes>`)
- **Nav anchor links** (`About`, `Stack`, `Work`, `Contact`) only render when `location.pathname === '/'` — they are `href="#section"` anchors, not router links
- **Games hub** (`/games`): has `← back to portfolio` (→ `/`) at the top
- **Individual game pages**: breadcrumb `← portfolio` (→ `/`) · `← games` (→ `/games`) — both clickable

---

## Important constraints

- **No git commands** — user manages git separately
- **Design must exactly match** `Aaditya Pyarla _standalone_.html` — when in doubt, extract and decode the `__bundler/template` script tag (JSON-encoded HTML) to check the original markup and CSS
- **`--p-*` tokens** for all portfolio colours; shadcn tokens (`--card`, `--muted`, `--border`) are only for shadcn component internals
- **`hero.jpg`** is the correct profile photo (extracted from the bundle); `hero.png` is the old Vite placeholder — never import it in portfolio components
- **Games are self-contained** — no external game libraries; Canvas games use `requestAnimationFrame` loops; React games use pure state
- **shadcn components** installed: `button`, `card`, `badge`, `separator` — add more via `npx shadcn@latest add <name>`
