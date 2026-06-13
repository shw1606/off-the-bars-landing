<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Off the Bars — landing page

Marketing landing for the barcode-art design service. Single-page, mobile-first, static. See `README.md` for the overview.

## Where to edit
- **`src/lib/site.ts`** — single source of config: brand, contact email, pricing, lead time, business info, social links. Change here → the whole page updates. No env vars.
- Sample artwork lives in `src/assets/samples/` and renders via `next/image` static imports in `sections/gallery.tsx` (6 images) and `sections/hero.tsx` (reuses `magpie-brewing.jpg`). Originals: `~/Resources/barcode-art-ai/랜딩페이지_샘플/`.

## Architecture
- `src/app/layout.tsx` — Pretendard font (`<link>`), metadata/OG, Vercel `<Analytics />`
- `src/app/page.tsx` — section order: Nav → Hero → Authority → Gallery → Guarantee → Process → Pricing → About → Footer
- `src/components/sections/*` — one component per section
- `src/components/cta-button.tsx` — `"use client"`; fires Vercel Analytics custom events (`cta_mailto_click`, etc.) on click
- Theme tokens in `src/app/globals.css` via Tailwind v4 `@theme inline`: `ink / background / muted / line / card / accent`
- No shadcn/ui — hand-rolled Tailwind for a single static landing.

## Commands
`npm run dev` · `npm run build` · deploy on Vercel.
