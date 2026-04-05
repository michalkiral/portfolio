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
| `npm run deploy` | Build and deploy to GitHub Pages |

---

## Linting & Formatting (Biome)

This project uses [Biome](https://biomejs.dev/) for both linting and formatting. It replaces ESLint and Prettier in a single tool.

### Check everything (lint + format)

```bash
npm run lint
```

This runs `biome check .` which reports both lint violations and formatting issues without modifying files. The CI pipeline runs this on every push and pull request.

### Auto-format files

```bash
npm run format
```

This runs `biome format --write .` and rewrites files in place to match the style rules.

### Auto-fix lint issues

```bash
npx biome check --write .
```

This applies safe lint fixes and formats at the same time.

### Configuration

Biome is configured in [`biome.json`](./biome.json). Key settings:

- Indent: 2 spaces
- Line width: 100 characters
- Quotes: double
- Linting: enabled with recommended rules for correctness, style, suspicious patterns, accessibility, and performance

### IDE Integration

Install the [Biome VS Code extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) to get inline lint errors and format-on-save.

Add this to your `.vscode/settings.json`:

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

## Deployment

Deployments to GitHub Pages are manual:

```bash
npm run deploy
```

This builds the project and pushes the `dist/` folder to the `gh-pages` branch. The live site updates within a minute.

The CI pipeline (`.github/workflows/build.yml`) runs lint + build checks on every push to `main` and on all pull requests, but does **not** auto-deploy.

---

## Project Structure

```
src/
├── applications/       # Each mini-app (self-contained)
├── screens/            # Top-level page components
├── main.tsx            # Router and app entry point
└── index.css           # Tailwind directives
```

See [`claude_context.md`](./claude_context.md) for the full architecture plan and roadmap.
