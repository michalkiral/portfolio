# Portfolio

A collection of interactive mini-apps built with React, TypeScript, and Vite — deployed to GitHub Pages.

Live: https://snowskii.github.io/portfolio

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite + SWC |
| Styling | Tailwind CSS |
| Routing | React Router v6 (HashRouter) |
| Linting & Formatting | Biome |
| Deployment | GitHub Pages |

---

## Development

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

---

## Available Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Type-check + production build into `dist/` |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Run Biome — checks linting and formatting |
| `npm run format` | Run Biome formatter and auto-fix files |
| `npm run deploy` | Build and push to GitHub Pages |

---

## Deployment

Deployments are manual. Run:

```bash
npm run deploy
```

This does two things in sequence:
1. **Build** — runs `npm run build`, which type-checks and bundles the project into `dist/`
2. **Publish** — the `gh-pages` package force-pushes `dist/` to the `gh-pages` branch on GitHub

GitHub Pages serves the `gh-pages` branch. The live site updates within about a minute of pushing.

### First-time GitHub setup

If GitHub Pages isn't configured yet on the repository:

1. Go to the repository on GitHub
2. Settings → Pages
3. Under **Source**, select "Deploy from a branch"
4. Set branch to `gh-pages`, folder to `/ (root)`
5. Click Save

After that, `npm run deploy` is all you need for every subsequent deployment.

### CI pipeline

The CI pipeline (`.github/workflows/build.yml`) runs on every push to `main` and on all pull requests. It checks:

1. **Lint & Format** — `biome check .`
2. **Type Check** — `tsc -b --noEmit`
3. **Build** — `vite build` (only runs if lint and typecheck pass)

The pipeline validates but never deploys — that stays manual.

---

## Linting & Formatting (Biome)

This project uses [Biome](https://biomejs.dev/) for both linting and formatting. It replaces ESLint and Prettier in a single tool.

```bash
npm run lint      # check everything (no file changes)
npm run format    # auto-fix formatting in place
```

To apply safe lint fixes as well:

```bash
npx biome check --write .
```

### Configuration

Biome is configured in [`biome.json`](./biome.json). Key settings:

- Indent: 2 spaces
- Line width: 100 characters
- Quotes: double
- Linting: enabled with recommended rules for correctness, style, suspicious patterns, accessibility, and performance

### IDE Integration

Install the [Biome VS Code extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) and add this to `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports.biome": "explicit"
  }
}
```

---

## Project Structure

```
src/
├── apps/                   # Each mini-app (self-contained)
│   ├── bang-duel-generator/
│   │   ├── index.tsx       # App manifest — registers the app
│   │   ├── assets/
│   │   ├── components/
│   │   └── screens/
│   └── love-you/
│       ├── index.tsx
│       ├── components/
│       └── screens/
├── registry/
│   ├── types.ts            # AppManifest interface
│   └── apps.ts             # Central list — one import per app
├── shared/
│   ├── components/         # AppCard, AppLayout, Button, Input
│   ├── context/            # AppMetaContext (favorites)
│   └── hooks/              # useLocalStorage
├── HomeScreen.tsx
├── main.tsx                # Router — built from registry
└── index.css               # Tailwind directives + base styles
```

### Adding a new app

1. Create `src/apps/[name]/index.tsx` and export an `AppManifest`
2. Add one import line to `src/registry/apps.ts`

The home screen and router update automatically — nothing else changes.
