# elliotrmitchell

Personal portfolio site for Elliot Mitchell — built with [Astro](https://astro.build), hosted on [Cloudflare Pages](https://pages.cloudflare.com).

## Pages

| URL | File |
|-----|------|
| `/` | `src/pages/index.astro` — portfolio |
| `/creep` | `src/pages/creep.astro` — LoL minion farming game |
| `/dragracing` | `src/pages/dragracing.astro` — drag racing browser game |

## Development

Install dependencies:
```bash
npm install
```

Start local dev server (http://localhost:4321):
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Deployment

This site auto-deploys via Cloudflare Pages on every push to `master`.

Build config:
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 20

## Assets

Static assets (images, JS, CSS, fonts) live in `public/assets/` and are served at `/assets/*`.
