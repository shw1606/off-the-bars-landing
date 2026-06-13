# Off the Bars

> Scannable barcode art for product packaging — the mandatory barcode you can't remove, redrawn in your brand's style and guaranteed to scan at retail POS.

Marketing landing page for **Off the Bars**, a barcode-art design service. We keep the spec barcode (bars, quiet zone, contrast) untouched and wrap it in brand-tone illustration — so it stays scannable while looking like part of the design. Built for Korean indie beauty & craft-beer brands.

**Live:** https://offthebars.com

---

## What this is

A single-page, mobile-first landing built to be fast, minimal, and trustworthy. Its one job: show the product, remove the buyer's main objection (scan guarantee), and make getting in touch frictionless — a prefilled `mailto:`, no forms.

Sections: hero → credibility strip → sample gallery → scan-guarantee banner → process → pricing → about → footer.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — theme tokens via `@theme inline`
- **Pretendard** (Korean body type) + Geist Mono (barcode numerals)
- **Vercel Web Analytics** — cookieless, with custom CTA click events
- Deployed on **Vercel** (automatic HTTPS)

No component library — hand-rolled with Tailwind for a single static landing.

## Project structure

```
src/
  app/
    layout.tsx        # fonts, metadata/OG, <Analytics />
    page.tsx          # section composition
    globals.css       # theme tokens (Tailwind v4 @theme inline)
  assets/
    samples/          # real sample artwork (next/image static imports)
  components/
    cta-button.tsx    # client component; fires Analytics events on click
    site-nav.tsx
    sections/         # hero, gallery, guarantee, pricing, footer, ...
  lib/
    site.ts           # single source of config — edit values here
    mailto.ts         # prefilled mailto builder
```

## Configuration

All editable values live in **`src/lib/site.ts`** — brand name, contact email, pricing, lead time, business info, and social links. Change them there and the whole page updates; there are no environment variables to set.

Sample artwork lives in `src/assets/samples/` and is rendered with `next/image` static imports in the gallery and hero sections.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the production build
```

## Deployment

Import the repo on [Vercel](https://vercel.com/new) (zero config), or use the CLI:

```bash
vercel             # preview deployment
vercel --prod      # production
```

Web Analytics runs automatically on Vercel with no extra setup.

---

© 2026 Off the Bars. All rights reserved.
