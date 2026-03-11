# elliotrmitchell — Portfolio Site

Personal portfolio site for Elliot Mitchell (Mobile/Android Engineer).

## Stack

- **Frontend:** Astro (static site generator), Node 24
- **Hosting:** Cloudflare Pages (free, unlimited bandwidth, auto SSL, global CDN)
- **Media storage:** Cloudflare R2 (HD photo storage, no egress fees)
- **Domain:** Cloudflare Registrar (transferred from Namecheap)
- **CI/CD:** Cloudflare Pages GitHub integration (auto-deploy on push to `master`)

## Routing

| URL           | File                         |
|---------------|------------------------------|
| `/`           | `src/pages/index.astro`      |
| `/creep`      | `src/pages/creep.astro`      |
| `/dragracing` | `src/pages/dragracing.astro` |
| `/photos`     | `src/pages/photos.astro`     |

---

## Roadmap

### ✅ Phase 1 — Astro Migration (complete)
- [x] Scaffold Astro project, remove all Rails/Ruby files
- [x] Migrate all pages 1:1 (`index`, `creep`, `dragracing`)
- [x] Copy all assets (images, JS, CSS, fonts) to `public/assets/`
- [x] Update README with dev/build instructions
- [x] Pin Node 24 via `.nvmrc`

---

### Phase 2 — Cloudflare Setup + CI/CD
Setting up Cloudflare Pages is the same step as CI/CD — once connected to GitHub, auto-deploy is on by default.

- [ ] Create a Cloudflare account at cloudflare.com (if you don't have one)
- [ ] Push this repo to GitHub (if not already public/pushed)
- [ ] In Cloudflare dashboard: Workers & Pages → Create → Pages → Connect to Git
- [ ] Select the GitHub repo (`elliotrmitchell`)
- [ ] Set build config:
  - Build command: `npm run build`
  - Output directory: `dist`
  - Node version: `24` (set via Environment Variables: `NODE_VERSION = 24`)
- [ ] Deploy — Cloudflare will build and host the site at a `*.pages.dev` URL
- [ ] Verify all routes work on the `*.pages.dev` URL (`/`, `/creep`, `/dragracing`)
- [ ] From this point on: every push to `master` auto-deploys

---

### Phase 3 — Domain Transfer (Namecheap → Cloudflare)
- [ ] Add site to Cloudflare (free plan) to get Cloudflare nameservers
- [ ] Update Namecheap nameservers to point to Cloudflare
- [ ] Initiate domain transfer from Namecheap to Cloudflare Registrar
  - Cloudflare charges at-cost (~$10/yr for .com) — no markup
  - Unlock domain at Namecheap, get EPP/auth code
  - Transfer in Cloudflare dashboard: Registrar → Transfer
- [ ] Once transferred: connect domain to Cloudflare Pages project
- [ ] Verify SSL auto-provisioned and all routes resolve on custom domain

**Why transfer to Cloudflare Registrar:** Everything (DNS, CDN, hosting, SSL, domain) lives in one dashboard. No separate DNS management needed, renewals at cost, seamless Pages integration.

---

### Phase 4 — Decommission Heroku
Do this after the domain is confirmed working on Cloudflare — don't delete Heroku before verifying the new setup is live.

- [ ] Confirm Cloudflare Pages deployment is live and domain resolves correctly
- [ ] Confirm all routes (`/`, `/creep`, `/dragracing`) work on the custom domain
- [ ] Delete the Heroku app (Heroku dashboard → app → Settings → Delete app)
- [ ] Remove any Heroku-related config, env vars, or CLI tooling if present locally
- [ ] Cancel/downgrade Heroku account if no other apps are running on it

---

### Phase 5 — Analytics
Replace the legacy UA Google Analytics tag with a modern, privacy-friendly setup.

- [ ] Decide on analytics platform:
  - **Google Analytics 4 (GA4)** — most common, free, pairs with existing Google account
  - **Cloudflare Web Analytics** — free, built into Cloudflare dashboard, privacy-first (no cookies, no GDPR banner needed), simpler
  - Recommendation: Cloudflare Web Analytics first (zero setup, already on Cloudflare), add GA4 later if you need deeper funnels
- [ ] If Cloudflare Web Analytics:
  - Enable in Cloudflare dashboard → Web Analytics → Add site
  - Add the `<script>` beacon to all Astro pages (or a shared layout)
  - Remove old UA Google Analytics tags from all pages
- [ ] If GA4:
  - Create GA4 property at analytics.google.com
  - Get the `G-XXXXXXX` measurement ID
  - Replace `UA-109855644-1` tag in `src/pages/index.astro` with GA4 tag
  - Add GA4 tag to `creep.astro` and `dragracing.astro` as well
- [ ] Verify analytics data flowing in after deploy

---

### Phase 6 — UI Modernization
Goal: completely redesign the portfolio with a modern, clean aesthetic. Replace the dated Bootstrap/jQuery template with purpose-built components.

- [ ] Pick a design direction (minimal dark theme, clean light, etc.) — decide before building
- [ ] Replace Bootstrap with Tailwind CSS (utility-first, no design debt)
- [ ] Rebuild nav as sticky, mobile-friendly component
- [ ] Redesign hero/welcome section (ditch Vegas slider, use a clean full-screen intro)
- [ ] Modernize Skills section — replace EasyPieChart circles with something cleaner (progress bars, tag cloud, or card grid)
- [ ] Update Skills content — remove outdated items, add current ones
- [ ] Modernize Portfolio section — card grid with hover effects, filter still works
- [ ] Update Portfolio content — add recent projects, remove stale ones
- [ ] Modernize Experience section — timeline layout
- [ ] Update Experience content — update Microsoft dates, add any new roles
- [ ] Modernize Contact section
- [ ] Update footer year (currently says 2021)
- [ ] Remove all legacy JS libs no longer needed after redesign (jQuery, Bootstrap JS, Vegas, etc.)
- [ ] Update Google Analytics from UA to GA4

---

### Phase 7 — Photo Gallery
Goal: a clean `/photos` page showcasing HD photography, with a simple private upload mechanism.

**Display:**
- [ ] Create `src/pages/photos.astro`
- [ ] Grid layout (masonry or fixed-ratio) with lightbox on click
- [ ] Photos served from Cloudflare R2 (not git repo)
- [ ] Lazy loading for performance

**Storage (Cloudflare R2):**
- [ ] Create R2 bucket (free tier: 10 GB storage, zero egress fees)
- [ ] Make bucket publicly readable (for serving photos via URL)
- [ ] R2 public URL pattern: `https://<bucket>.<accountid>.r2.cloudflarestorage.com/<filename>`
- [ ] Optional: add a custom subdomain for the R2 bucket (e.g. `photos.elliotrmitchell.com`)

**Upload mechanism (private admin page):**
- [ ] Create a simple private `/admin/photos` upload page
  - Options: password-protected static page that calls R2 API directly, or a small Cloudflare Worker that handles auth + upload
  - Recommended: Cloudflare Worker with a shared secret header — no database needed
- [ ] Upload flow: select photo on admin page → Worker validates secret → uploads to R2 → photo appears on `/photos`
- [ ] No build step needed to add photos — fully decoupled from the Astro site

**Photo list management:**
- [ ] Store photo manifest as a JSON file in R2 (list of filenames/captions)
- [ ] `/photos` page fetches manifest at build time (or runtime via client JS) and renders grid
- [ ] Adding a photo = upload file + update manifest JSON

---

## Conventions

- Misc pages (`/creep`, `/dragracing`) keep their vanilla JS as-is — do not rewrite
- Do not bloat the git repo with large image files — all photos go to R2
- Do not over-engineer — this is a personal static site
- All JS assets for misc pages live in `public/assets/` loaded via `<script is:inline>` tags

## Notes

- Phone number visible in contact section — decide if still desired to be public
- Google Analytics UA tag (`UA-109855644-1`) should be upgraded to GA4
- Resume PDF is in `public/assets/` — keep it accessible at `/assets/ElliotMitchell_Resume.pdf`
