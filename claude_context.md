# Portfolio — Claude Context & Refactoring Plan

> Written: 2026-04-06  
> Purpose: Guide for refactoring and growing this portfolio into a scalable collection of mini-apps.

---

## 1. Current State Assessment

### Tech Stack (Current)
| Layer | Tool | Verdict |
|---|---|---|
| Framework | React 18 + TypeScript | **Keep** — solid, industry standard |
| Build tool | Vite + SWC | **Keep** — fastest option available |
| Styling | Tailwind CSS + component CSS files | **Keep, consolidate** |
| Routing | React Router v6 (HashRouter) | **Keep** — HashRouter is the right call for GitHub Pages |
| Linting | ESLint + Biome | **Simplify** — you have both; pick one |
| State | React `useState` + LocalStorage | **Keep** — right level of complexity for now |
| Deployment | GitHub Pages + gh-pages npm script | **Keep** |
| CI/CD | GitHub Actions | **Keep** |

**The current tech stack is good. Do not change it.** No need for Next.js, Remix, or anything heavier — GitHub Pages is a static host and the apps are client-side. The stack is fast, modern, and appropriate.

**One tool to drop:** Remove Biome (it's a formatter) and let ESLint + Prettier handle formatting, OR keep Biome and remove ESLint. Having both is redundant. Recommended: **keep Biome, drop ESLint** — Biome handles both linting and formatting in one tool with better performance.

---

## 2. Core Architecture Problem

The current structure does not scale. Adding a third or fourth app will immediately create inconsistency because:

- `screens/` and `applications/` are two separate concepts that both live at the top level
- The HomeScreen hardcodes navigation links — there is no registry, so every new app requires editing the home page manually
- No shared component library — each app reinvents buttons, layouts, headers
- No consistent app metadata shape — no way to render a "navigation tree" programmatically

---

## 3. Target Architecture — App Registry Pattern

The goal is a **self-registering app system**: each app declares its own metadata, and the home screen renders it automatically with no manual changes needed.

### Recommended Folder Structure

```
src/
├── apps/                          # Every mini-app lives here
│   ├── bang-duel-generator/
│   │   ├── index.ts               # App manifest (metadata export)
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── CreateGame.tsx
│   │   │   └── GameGenerator.tsx
│   │   └── screens/
│   │       ├── HomeScreen.tsx
│   │       └── GameScreen.tsx
│   ├── love-you/
│   │   ├── index.ts
│   │   ├── components/
│   │   │   └── LoveYou.tsx
│   │   └── screens/
│   │       └── LoveYouScreen.tsx
│   └── [future-app]/
│       ├── index.ts               # Just add this file — home page updates itself
│       └── ...
├── shared/                        # Shared UI components and utilities
│   ├── components/
│   │   ├── AppCard.tsx            # Navigation card for the home screen
│   │   ├── AppLayout.tsx          # Common header/back-button wrapper
│   │   └── Button.tsx
│   └── hooks/
│       └── useLocalStorage.ts
├── registry/
│   └── apps.ts                    # Central list of all app manifests
├── screens/
│   └── HomeScreen.tsx             # Reads from registry — no manual edits needed
├── main.tsx                       # Router — also reads from registry
└── index.css
```

### App Manifest Shape

Each app exports a typed manifest from its `index.ts`:

```typescript
// src/apps/bang-duel-generator/index.ts
import type { AppManifest } from '@/registry/types'

export const manifest: AppManifest = {
  id: 'bang-duel-generator',
  title: 'Bang! Duel Generator',
  description: 'Random character and game-type generator for the Bang! card game.',
  route: '/bang-duel-generator',
  icon: '🤠',            // or an SVG import
  tags: ['games', 'tools'],
  status: 'stable',      // 'stable' | 'beta' | 'wip'
}

// Routes internal to this app
export { router } from './router'
```

### Central Registry

```typescript
// src/registry/apps.ts
import { manifest as bangManifest, router as bangRouter } from '@/apps/bang-duel-generator'
import { manifest as loveManifest, router as loveRouter } from '@/apps/love-you'

export const appRegistry = [
  { manifest: bangManifest, router: bangRouter },
  { manifest: loveManifest, router: loveRouter },
]
```

### Home Screen (reads from registry, no hardcoding)

```typescript
// src/screens/HomeScreen.tsx
import { appRegistry } from '@/registry/apps'
import { AppCard } from '@/shared/components/AppCard'

export function HomeScreen() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {appRegistry.map(({ manifest }) => (
        <AppCard key={manifest.id} app={manifest} />
      ))}
    </div>
  )
}
```

### Router (reads from registry)

```typescript
// src/main.tsx
import { appRegistry } from '@/registry/apps'

const router = createHashRouter([
  { path: '/', element: <HomeScreen /> },
  ...appRegistry.flatMap(({ manifest, router }) =>
    router.map(route => ({ ...route, path: `${manifest.route}${route.path}` }))
  ),
])
```

**Adding a new app = create the folder + export a manifest. Zero changes elsewhere.**

---

## 4. Step-by-Step Refactoring Plan

### Phase 1 — Structural Cleanup (no behavior changes)
1. Rename `applications/` → `apps/` and flatten the nested `components/` inside each app
2. Move each app's screen files into `apps/[app-name]/screens/`
3. Delete the top-level `screens/` folder (screens belong to the app that owns them)
4. Create `src/shared/components/` — extract any reusable UI (buttons, wrappers)
5. Create `src/shared/hooks/useLocalStorage.ts` — extract the localStorage logic from bang app into a reusable hook

### Phase 2 — App Registry
6. Create `src/registry/types.ts` — define `AppManifest` interface
7. Create `index.ts` manifest for each existing app
8. Create `src/registry/apps.ts` — the central registry
9. Refactor `HomeScreen.tsx` to read from the registry and render `<AppCard>` components
10. Refactor `main.tsx` router to build routes from the registry

### Phase 3 — Shared Design System
11. Create `shared/components/AppCard.tsx` — consistent card component for the nav grid
12. Create `shared/components/AppLayout.tsx` — wrapper with a back button and app title (every app uses this)
13. Standardize Tailwind usage — remove standalone CSS files and migrate styles into Tailwind classes (or CSS Modules if you prefer scoping)

### Phase 4 — Tooling
14. Drop ESLint. Enable Biome's linting rules (`"linter": { "enabled": true }` in biome.json)
15. Add a `biome format --write` npm script
16. Add TypeScript path aliases (`@/` → `src/`) in `tsconfig.app.json` and `vite.config.ts` to avoid `../../..` imports

### Phase 5 — Optional Enhancements (only if apps grow complex)
- Add **Zustand** if an app needs shared state between components (don't add it preemptively)
- Add **Framer Motion** for smooth page transitions on the home screen navigation grid
- Add **React Query** only if you add an app that fetches from an external API

---

## 5. CSS Strategy — Consolidate to One Approach

Currently the repo mixes Tailwind utilities with plain CSS files. Pick one approach per scope:

| Scope | Recommended approach |
|---|---|
| Layout, spacing, colors, typography | Tailwind utility classes inline |
| Complex animations or pseudo-selectors that Tailwind can't express | Tailwind `@layer` block inside `index.css` |
| Truly isolated third-party-style scoping (e.g. Shadow DOM in love-you) | React Shadow + scoped CSS is fine |

Remove `CreateGame.css` and `GameGenerator.css` — migrate their styles to Tailwind. The only valid reason to keep a separate CSS file is if Tailwind can't express it.

---

## 6. App Ideas for Future Additions

These are categorized by complexity. Each would fit cleanly into the registry pattern above.

### Easy (a weekend each)
| App | Description |
|---|---|
| **Pomodoro Timer** | 25/5 min work-break cycles, custom intervals, session history in localStorage |
| **Color Palette Generator** | Pick or randomize a palette, display hex codes, one-click copy |
| **Unit Converter** | Length, weight, temperature, volume — clean tabbed UI |
| **Random Decision Picker** | Enter options, spin a wheel or draw — useful and fun to build |
| **Markdown Previewer** | Live-rendered markdown preview with copy button |

### Medium (a few weekends)
| App | Description |
|---|---|
| **Budget Tracker** | Add income/expense entries, categorize, show totals — persisted in localStorage |
| **Habit Tracker** | Daily checkbox grid per habit, streak counting, minimal calendar view |
| **Quiz / Trivia Builder** | Create a set of Q&A cards, self-test mode, score tracking |
| **Recipe Scaler** | Input a recipe and a target serving count, recalculates all quantities |
| **Workout Log** | Log sets/reps/weight per exercise, view history — localStorage persisted |

### Harder (but impressive in a portfolio)
| App | Description |
|---|---|
| **Drawing Canvas** | `<canvas>`-based paint app with color picker and brush size |
| **Chess Puzzle Trainer** | Hard-coded or fetched chess puzzles, chessboard UI (use `chess.js` + `react-chessboard`) |
| **Language Flashcards** | SRS (spaced repetition) card system, custom decks, progress tracking |
| **Music Interval Trainer** | Play two tones, user identifies the interval — good for learning Web Audio API |
| **Mini Spreadsheet** | Editable grid with basic formula support (`=SUM`, `=AVG`) — teaches you a lot |

---

## 7. Non-Negotiable Rules Going Forward

1. **Every new app gets an `index.ts` manifest.** The home screen never gets manually edited to add navigation links.
2. **Apps are self-contained.** An app should be deletable by removing its folder and one line from the registry.
3. **`shared/` is for truly shared code only.** Do not put app-specific logic in `shared/`.
4. **No new CSS files.** Use Tailwind. The only exception is app-specific animations that Tailwind cannot express.
5. **No new state management library** until a concrete use case requires it. `useState` + `useLocalStorage` hook is enough for the current and near-future apps.

# 8. Design System Strategy: The Obsidian Gallery

## 1. Overview & Creative North Star
**Creative North Star: The Obsidian Gallery**

This design system is built to transform a standard dashboard into a high-end editorial experience. We are moving away from the "SaaS-utility" look toward a "Curated Gallery" aesthetic. The goal is to treat every piece of data and every navigation link as a piece of art within a dark, cinematic space. 

By leveraging **intentional asymmetry**, we break the rigid 12-column grid. Large `display` typography should feel like a magazine header, while functional elements are tucked away into subtle glass containers. We rely on breathing room (whitespace) and tonal depth rather than structural lines to guide the eye.

## 2. Colors & Tonal Depth
The palette is rooted in a deep slate (`#0b1326`) with a vibrant, electric indigo (`#c0c1ff`) acting as the "source of light" within the interface.

### The "No-Line" Rule
Standard UI relies on 1px borders to separate content. In this system, **solid borders are prohibited for sectioning.** Boundaries must be defined through:
- **Background Shifts:** A `surface-container-low` section sitting directly on a `surface` background.
- **Negative Space:** Using the spacing scale to create distinct visual groupings.
- **Soft Tonal Transitions:** Using subtle gradients to suggest a change in context.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface tiers to create "nested" depth:
1.  **Base Layer:** `surface` (`#0b1326`) – The infinite floor.
2.  **Structural Containers:** `surface-container-low` (`#131b2e`) – For large layout blocks.
3.  **Active Elements:** `surface-container-high` (`#222a3d`) – For cards or modals that need to feel "closer" to the user.

### The Glass & Gradient Rule
To achieve the "high-end developer portfolio" feel, navigation and floating panels must utilize **Glassmorphism**. 
- **Recipe:** Use `surface-container` colors at 60% opacity with a `20px` to `40px` backdrop-blur. 
- **Signature Glow:** Apply a subtle linear gradient to Primary CTAs (from `primary` to `primary-container`) to provide a "soulful" luminosity that flat colors lack.

## 3. Typography: Editorial Authority
We use **Inter** as a precision tool. The hierarchy is designed to create a sense of scale and importance.

*   **Display & Headlines:** Use `display-lg` and `headline-lg` to ground the page. These should be tracked slightly tighter (-0.02em) to feel premium and intentional.
*   **The Power of Labels:** Use `label-md` and `label-sm` in all-caps with increased letter spacing (+0.05em) for category tags or metadata. This "editorial" treatment distinguishes functional text from content.
*   **Body Text:** `body-md` is the workhorse. Ensure it uses `on-surface-variant` (`#c7c4d7`) for secondary info to maintain a sophisticated low-contrast look that reduces eye strain.

## 4. Elevation & Depth
In this design system, depth is a feeling, not a drop-shadow effect.

*   **Tonal Layering:** Achievement of depth is primary through "stacking." A `surface-container-lowest` card placed on a `surface-container-low` section creates a natural "recessed" look without a single shadow.
*   **Ambient Shadows:** When an element must float (e.g., a dropdown), use an extra-diffused shadow. 
    *   *Parameters:* Blur: 32px, Spread: -4px, Opacity: 8%. 
    *   *Color:* Use a tinted shadow based on `background` rather than pure black to keep the dark mode feeling "airy."
*   **The Ghost Border Fallback:** If accessibility requires a container edge, use a "Ghost Border." Apply the `outline-variant` token at **15% opacity**. This provides a hint of structure without cluttering the visual field.

## 5. Components

### Navigation Tree (Glassmorphism)
The sidebar is the system's centerpiece. It should use a semi-transparent `surface-container` background with a heavy backdrop blur. Hover states for nav items should not use a background fill; instead, use a `primary` "light bar" (2px wide) on the left edge and a shift in text color to `on-primary-fixed`.

### Buttons
*   **Primary:** A gradient from `primary` to `primary-container`. `lg` corner radius (`0.5rem`). No border.
*   **Secondary:** No fill. A "Ghost Border" (15% `outline-variant`). Text in `primary`.
*   **Tertiary:** Purely typographic. Use `label-md` with an underline that only appears on hover.

### Cards & Lists
**Forbid the use of divider lines.** 
*   **Cards:** Use `surface-container-low` with `xl` (0.75rem) roundedness.
*   **Lists:** Separate items using 12px of vertical white space. Use a `surface-container-highest` background on hover to indicate interactivity.

### Input Fields
Inputs should feel integrated. Use `surface-container-lowest` as the fill color. On focus, the border doesn't just change color—the element should "glow" slightly by applying a 4px blur of the `primary` color as an outer shadow.

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts. Let the header text hang further left than the content cards to create an editorial rhythm.
*   **Do** use `tertiary` (`#ffb783`) for "human" elements—tooltips, success states, or highlights—to break the cool blue/indigo palette.
*   **Do** leverage the `full` roundedness scale for chips and status indicators to contrast against the `xl` cards.

### Don't
*   **Don't** use 100% white (#FFFFFF) for text. Always use `on-surface` or `on-surface-variant` to maintain the sophisticated "Obsidian" tone.
*   **Don't** use standard "Drop Shadows." If it looks like a default shadow from a 2010 UI kit, it's too heavy.
*   **Don't** use dividers. If two elements feel cluttered, add more space, don't add a line.


web application/stitch/projects/931626344000960973/screens/467f6cdd22fd46a59c17658dd4770409