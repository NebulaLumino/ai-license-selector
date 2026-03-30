# CLAUDE.md

This is a Next.js 16 AI app project.

## Tech Stack
- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- DeepSeek API (via OPENAI_API_KEY env var)

## Key Files
- `src/app/page.tsx` — Main UI (form → /api/generate → result display)
- `src/app/api/generate/route.ts` — API route calling DeepSeek
- `src/app/globals.css` — Tailwind CSS imports
- `src/app/layout.tsx` — Root layout with Geist font

## Commands
```bash
npm install
npm run dev
npm run build
```
