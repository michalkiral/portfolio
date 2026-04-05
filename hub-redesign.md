# Hub Redesign — Obsidian Gallery

Tracked tasks for turning the portfolio home screen into a high-end editorial central hub.
Design spec lives in `claude_context.md` § 8.

---

## Phase A — Design Token Foundation

Everything downstream depends on this. Do this first, touch nothing else.

- [ ] **A1. Extend `tailwind.config.js` with the full color palette**
  ```
  surface:                  #0b1326   (base layer — the infinite floor)
  surface-container-low:    #131b2e   (large structural blocks)
  surface-container:        #1a2235   (glassmorphism base at 60% opacity)
  surface-container-high:   #222a3d   (active cards, modals — "closer" layer)
  surface-container-highest:#2b3450   (hover state for list items)
  surface-container-lowest: #0d1628   (recessed elements, input fills)
  primary:                  #c0c1ff   (electric indigo — the "source of light")
  primary-container:        #4b4dab   (gradient endpoint for CTAs)
  on-surface:               #e2e0f0   (primary text — never pure white)
  on-surface-variant:       #c7c4d7   (secondary/body text)
  outline-variant:          #44475a   (ghost border base — apply at 15% opacity)
  tertiary:                 #ffb783   (warm accent for human/success elements)
  ```

- [ ] **A2. Add Inter font via `@fontsource/inter`**
  - `npm install @fontsource/inter`
  - Import in `index.css`: `@import '@fontsource/inter/variable.css'`
  - Set `fontFamily.sans` default to `['Inter var', 'Inter', ...defaultTheme.fontFamily.sans]` in tailwind config

- [ ] **A3. Add typography scale to tailwind config**
  ```
  fontSize:
    display-lg:  [4.5rem,  { lineHeight: '1.05', letterSpacing: '-0.02em' }]
    headline-lg: [2.25rem, { lineHeight: '1.15', letterSpacing: '-0.02em' }]
    headline-sm: [1.5rem,  { lineHeight: '1.3',  letterSpacing: '-0.01em' }]
    body-md:     [0.9375rem, { lineHeight: '1.6' }]
    label-md:    [0.75rem, { lineHeight: '1.4',  letterSpacing: '0.05em' }]
    label-sm:    [0.6875rem, { lineHeight: '1.4', letterSpacing: '0.05em' }]
  ```

- [ ] **A4. Add custom shadow tokens**
  ```
  boxShadow:
    ambient: '0 8px 32px -4px rgba(11, 19, 38, 0.08)'   (floating elements)
    glow-primary: '0 0 0 4px rgba(192, 193, 255, 0.15)'  (input focus glow)
  ```

- [ ] **A5. Set global defaults in `index.css`**
  - `background-color: theme('colors.surface')` on `html, body, #root`
  - `color: theme('colors.on-surface')` on `body`
  - `-webkit-font-smoothing: antialiased` on `body`
  - Remove the leftover `bg-gray-900` fallback

---

## Phase B — Shared Component Library

Build these before touching any page. Pages compose from these.

- [ ] **B1. Rewrite `AppCard.tsx` — Gallery Card**
  - Background: `surface-container-low`, rounded `xl` (0.75rem), no border
  - Left edge: 2px transparent → `primary` on hover (the "light bar", `transition-colors`)
  - App icon in a `full`-rounded chip: `surface-container-high` bg, `primary` text
  - Title: `text-headline-sm text-on-surface`
  - Description: `text-body-md text-on-surface-variant`
  - Tags: `label-sm` ALL CAPS chips with `full` roundedness, `surface-container-highest` bg
  - Status badge (beta/wip only): `tertiary` color, `full` rounded pill
  - Hover: background shifts to `surface-container-high` — no border appears
  - Ghost border fallback: `outline-variant` at 15% opacity (accessibility only)
  - No drop shadows. Depth from tonal layering only.

- [ ] **B2. Create `src/shared/components/Button.tsx` — three variants**
  - **Primary:** `bg-gradient-to-r from-primary to-primary-container text-surface rounded-lg px-4 py-2` — no border
  - **Secondary:** `border border-outline-variant/15 text-primary rounded-lg px-4 py-2` — no fill
  - **Tertiary:** plain text, `underline decoration-transparent hover:decoration-primary transition-colors` — no box

- [ ] **B3. Create `src/shared/components/Input.tsx`**
  - Fill: `surface-container-lowest`
  - Border: ghost (`outline-variant/15`), no change on focus
  - Focus ring: `shadow-glow-primary` (4px primary blur, no solid outline)
  - Text: `on-surface`, placeholder: `on-surface-variant/50`

- [ ] **B4. Rewrite `AppLayout.tsx` — Glassmorphism Shell**
  - Outer wrapper: `surface` background, full height grid
  - Header: `bg-surface-container/60 backdrop-blur-xl` — glassmorphism strip
  - No bottom border on header — separation from content via tonal shift only
  - Back button → Secondary variant from B2 (ghost border, primary text)
  - Title: `text-headline-sm text-on-surface`

---

## Phase C — The Hub (HomeScreen)

This is the centrepiece. Should feel like opening a portfolio magazine.

- [ ] **C1. Layout structure — intentional asymmetry**
  - Full `surface` background, generous padding (`px-12 py-16` or more on desktop)
  - Two visual zones:
    1. **Editorial header** (left-anchored, wider than the cards below it)
    2. **App gallery grid** (slightly inset to the right, creating the asymmetric hang)

- [ ] **C2. Editorial header**
  - Your name or "Portfolio" in `text-display-lg text-on-surface` with tight tracking
  - One-line tagline in `text-body-md text-on-surface-variant`
  - Optional: a 1–2 word `label-sm` ALL-CAPS category label above the display text (e.g. `SELECTED WORK`) in `tertiary`
  - No decorative lines, boxes, or cards around the header — it floats on `surface`

- [ ] **C3. App gallery grid**
  - Responsive: 1 col → 2 col (md) → 3 col (lg)
  - Gap driven by negative space (`gap-5` or `gap-6`), no dividers between cards
  - Cards sit slightly right of center relative to the display header to create the asymmetric offset

- [ ] **C4. Ambient glow accent (optional but high-impact)**
  - A `primary` radial gradient at very low opacity (3–5%) behind the header area
  - Implemented as a `position: absolute` `div` with `bg-[radial-gradient(ellipse_at_top_left,_rgba(192,193,255,0.05),_transparent_60%)]`
  - Must not affect layout — `pointer-events-none`

---

## Phase D — Token Cleanup & Rule Enforcement

After B and C are done, sweep the existing components.

- [ ] **D1. Audit all `text-white` usages → replace with `text-on-surface`**
- [ ] **D2. Audit all `bg-gray-*` usages → replace with surface tokens**
- [ ] **D3. Audit all `border-white/*` usages → replace with `outline-variant/15` ghost borders or remove entirely**
- [ ] **D4. Audit all `shadow-*` usages → replace with `shadow-ambient` or remove**
- [ ] **D5. Replace `bg-black/70` glassmorphism in CreateGame → use `bg-surface-container/60 backdrop-blur-xl`**
- [ ] **D6. Replace GameGenerator card border (`border-white/20`) → tonal background shift only**
- [ ] **D7. Replace all button styles in apps with the shared Button component from B2**
- [ ] **D8. Replace all input styles in CreateGame with the shared Input component from B3**

---

## Phase E — AppManifest Enhancement

The cards can only show what the manifest provides.

- [ ] **E1. Add `color` field to `AppManifest` (optional accent override per-app)**
  - Type: `string` (CSS color or Tailwind token name)
  - Used for the icon chip background and light bar color
  - Default falls back to `primary`

- [ ] **E2. Add `thumbnail` field to `AppManifest` (optional)**
  - Type: `string` (image URL or import)
  - If present, AppCard shows a small preview strip above the text content
  - If absent, shows the icon chip layout

- [ ] **E3. Update existing manifests** (bang-duel-generator, love-you) with any new fields

---

## Sequence

```
A (tokens) → B (components) → C (hub) → D (cleanup) → E (manifest)
```

Do not start B until A is merged. Do not start C until B1 and B4 are done.
Each phase is one commit (or a few if large).
