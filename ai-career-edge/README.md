# AI Career Edge

An AI-powered career workspace for university students. Paste your experience, get polished resume content, then practise a tailored three-question mock interview with instant feedback.

Everything runs entirely in your browser — no accounts, no uploads, no data leaving your machine.

## Features

- **Resume Optimizer** — describe your skills, projects, coursework, or internships and a target job title, and AI Career Edge rewrites your experience into a professional summary, achievement-style highlights, and a matched skills list.
- **Mock Interview Agent** — three technical questions tailored to your target role, answer boxes for each, and instant scoring with per-answer feedback plus an overall concept-coverage score.
- **Private by design** — all simulation logic lives in a browser-safe career engine module, so your content never leaves the page.
- **Modern dark UI** — emerald glass panels, responsive layout, and interactive button states built with Tailwind CSS.

## Tech stack

- TanStack Start v1 (React 19, file-based routing)
- TypeScript
- Tailwind CSS v4 (semantic design tokens in `src/styles.css`)
- Vitest + Testing Library
- Bun (npm works too)

## Getting started

```sh
git clone <your-repository-url>
cd ai-career-edge
bun install        # or: npm install
bun run dev        # or: npm run dev
```

Open the printed local URL (by default `http://localhost:8080`).

## Scripts

| Command | What it does |
| --- | --- |
| `bun run dev` | Start the dev server |
| `bun run build` | Production build |
| `bun run preview` | Preview the production build |
| `bun run test` | Run the test suite |
| `bun run lint` | Lint with ESLint |
| `bun run format` | Format with Prettier |

## Project structure

```text
src/
  assets/          images used by the app
  components/ui/   shadcn/ui primitives
  lib/             career engine (resume + interview logic) and its tests
  routes/          file-based routes (index = the single-page workspace)
  styles.css       Tailwind v4 theme + semantic design tokens
  test/            Vitest setup and app-level tests
```

## Publishing to GitHub

Create an empty repository on GitHub (no README), then run:

```sh
git init
git add .
git commit -m "Initial commit: AI Career Edge"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```

`node_modules`, `dist`, and other generated files are already excluded by `.gitignore`.

## Built with

Lovable.
