# elliotrmitchell — Portfolio Site

Personal portfolio site for Elliot Mitchell (Mobile/Android Engineer).

## Stack

- **Frontend:** Astro (static site generator), Node 24
- **Hosting:** Cloudflare Pages (free, unlimited bandwidth, auto SSL, global CDN)
- **Media storage:** Cloudflare R2 (HD photo storage, no egress fees)
- **Domain:** Namecheap (registrar) → Cloudflare (DNS/nameservers) → connected to Pages
- **CI/CD:** Cloudflare Pages GitHub integration (auto-deploy on push to `master`)

## Routing

| URL           | File                              |
|---------------|-----------------------------------|
| `/`           | `src/pages/index.astro` — rewrites to active theme via `Astro.rewrite()` |
| `/1`          | `src/pages/1/index.astro` — Theme 1: Minimal White                       |
| `/2`          | `src/pages/2/index.astro` — Theme 2: (current active theme)              |
| `/3`          | `src/pages/3/index.astro` — Legacy site (old Bootstrap/jQuery page)      |
| `/creep`      | `src/pages/creep.astro`                                                   |
| `/dragracing` | `src/pages/dragracing.astro`                                              |
| `/photos`     | `src/pages/photos.astro`                                                  |

**To change the active theme:** edit the `Astro.rewrite()` path in `src/pages/index.astro`. No redirect, no flicker — Astro bakes the target theme's HTML into `index.html` at build time.

**When building a new theme iteration:**
- Single theme brief and source-of-truth reference: `PORTFOLIO_TEMPLATE.md`
- Shared theme content module: `src/content/portfolioContent.js`
- Theme log: `PORTFOLIO_TEMPLATE.md` → `## Theme Log`

---

## Roadmap

### ✅ Phase 1 — Astro Migration (complete)
- [x] Scaffold Astro project, remove all Rails/Ruby files
- [x] Migrate all pages 1:1 (`index`, `creep`, `dragracing`)
- [x] Copy all assets (images, JS, CSS, fonts) to `public/assets/`
- [x] Update README with dev/build instructions
- [x] Pin Node 24 via `.nvmrc`

---

### ✅ Phase 2 — Cloudflare Setup + CI/CD (complete)
- [x] Create a Cloudflare account at cloudflare.com
- [x] Push this repo to GitHub
- [x] Create Cloudflare Pages project, connect to GitHub repo
- [x] Set build command: `npm run build`, output dir: `dist`
- [x] Deploy — live at https://elliotrmitchell.pages.dev
- [x] Verify all routes work (`/`, `/creep`, `/dragracing`)
- [x] Auto-deploy on push to `master` confirmed

---

### ✅ Phase 3 — Domain Setup (Namecheap → Cloudflare DNS + Pages) (complete)
- [x] Add site to Cloudflare (free plan) to get Cloudflare nameservers
- [x] Update Namecheap nameservers to point to Cloudflare
- [x] Connect custom domain to Cloudflare Pages project (Workers & Pages → Custom Domains)
- [x] Add both apex (`elliotrmitchell.com`) and `www` variants
- [x] SSL auto-provisioned, both domains Active — confirmed via `curl` headers (`server: cloudflare`)

---

### ✅ Phase 4 — Decommission Heroku (complete)
- [x] Confirmed Cloudflare Pages + custom domain live
- [x] Deleted Heroku app

---

### ✅ Phase 5 — Analytics (complete)
- [x] Cloudflare Web Analytics enabled — auto-injected, no code changes needed
- [x] Tracking confirmed (visits + Core Web Vitals visible in dashboard)
- Note: LCP P90 is 15s due to Vegas.js slider — will be fixed in Phase 8 UI redesign

---

### ✅ Phase 6 — Cloudflare Hardening (Performance + Security) (complete)
- [x] SSL/TLS mode set to Full (strict)
- [x] Always Use HTTPS enabled
- [x] HSTS enabled (6 month max-age, includeSubDomains, No-Sniff header)
- [x] HTTP/2 + HTTP/3 confirmed enabled
- [x] Bot Fight Mode enabled
- [ ] Bot Fight Mode — Security → Bots → enable Bot Fight Mode (free, blocks scrapers)
- [ ] Redirect `www` → apex (or vice versa) for canonical URL — optional

---

### ⚠️ Optional Future Task — Transfer Registrar from Namecheap to Cloudflare
**Not required. Do this at next renewal if desired.**

Keeping the domain at Namecheap is totally fine as long as Cloudflare controls the nameservers (done in Phase 3). This is purely an admin consolidation task.

**Why you might want to:** Everything (DNS, CDN, hosting, SSL, domain renewal) in one dashboard. Cloudflare charges at-cost (~$10/yr for .com, no markup) vs Namecheap's ~$13-14/yr.

**Steps when ready:**
1. Namecheap → Domain List → Manage → Sharing & Transfer → turn off **Domain Lock**
2. Get the **EPP/auth code** (emailed to you)
3. Cloudflare → Domain Registration → Transfer Domains → paste auth code → pay ~$10
4. Approve the transfer confirmation email — takes 5-7 days, site stays live throughout

---

### Phase 7 — Theme Building (in progress)

**References (read these before touching anything):**
- `PORTFOLIO_TEMPLATE.md` — single source of truth for theme rules, content reference, dos/don'ts, and theme log
- `src/content/portfolioContent.js` — shared theme content consumed by theme pages

---

**7A — Theme building (ongoing)**

Each session: describe or reference a design direction → a new theme gets built at `/N`.
No content decisions needed unless `PORTFOLIO_TEMPLATE.md` or `src/content/portfolioContent.js` changes.
Theme log lives in `PORTFOLIO_TEMPLATE.md` → `## Theme Log`.

- [x] Content locked — shared theme content lives in `src/content/portfolioContent.js`
- [x] Theme 1 built → `/1` (minimal white, rounded cards, phone mockups, staggered pills)
- [x] Theme 2 built → `/2` (Field Notes — warm editorial, profile-led hero, dense work grid)
- [ ] Theme 4, 5, N… — describe a direction each session, one at a time

---

**Theme inspiration sources:**
- [developer-portfolios](https://github.com/emmabostian/developer-portfolios) — curated list of dev portfolio sites, good for reference and new ideas
- [lamine.cc](https://lamine.cc/) — design reference
- [nareshkhatri.site](https://www.nareshkhatri.site/) — design reference
- Add more here over time as you find them

---

**Theme ideas backlog (unbuilt):**

**Instagram-like feed theme**
- "Stories" row at the top — each story is a portfolio project, story thumbnail is the project asset image
- Below that, a scrollable "feed" of photo posts — each post uses one of the profile photos as a full-bleed background with a `rgba(0,0,0,0.5)` overlay
- Normal portfolio content sections (identity, skills, experience, contact) are rendered as post overlays on top of the photo — so it looks like posts in a feed but surfaces all the standard content
- Feels like an Instagram profile page but the content is the portfolio

**Compact two-panel theme**
- Two main regions of the screen, everything compact and straight to the point — no scroll padding, no long sections
- Both panels visible at once (or near it), dense but clean
- Details TBD — explore layout options when building

---

**7B — Theme switcher easter egg (design decided, wiring deferred)**

The goal: every theme page has a subtle, unobtrusive floating component that lets visitors know what they're looking at, shuffle to a different theme, and optionally lock in their preference. New visitors always get a random theme.

**Component behavior (to build — `src/components/ThemeSwitcher.astro`):**
- Floats subtly on every theme page — small, corner-positioned, not obvious
- Shows: `Theme #N` label
- Has a shuffle button → picks a random different `/N` and navigates there
- Has a "stay here" toggle → writes `preferred_theme=N` to `localStorage`
- On page load: if `localStorage` has a preference, show it subtly ("your saved theme")
- Hover to reveal, or always-visible but minimal — exact treatment up to the theme

**Random assignment for new visitors:**
- No `localStorage` preference = randomly pick a theme number and redirect on load
- Implementation options (pick one when building):
  - **Client-side JS** (simplest): on `index.astro` load, read localStorage or pick random N, redirect to `/N`. Small flash risk.
  - **Cloudflare Worker** (cleanest): intercepts request to `/`, sets a `theme` cookie at the edge, serves the right page with zero flash. No redirect needed.
- Recommendation: start with client-side JS at `/` for now, upgrade to Worker later

**Analytics — what to track:**
- Theme viewed on page load (which `/N` was visited)
- Shuffle event (from which theme, to which theme)
- Preference saved event (which theme was locked in)

**Analytics implementation options (pick one when building):**
- **Cloudflare Web Analytics custom events** — free, already installed, just call `window.cfAnalytics.pushEvent(...)` — simplest
- **Cloudflare Worker + KV** — Worker receives a POST with event data, writes to KV store — queryable later, slightly more setup
- **Query param on shuffle** — append `?from=1&to=3` on shuffle navigations — shows up in Cloudflare Analytics path data automatically, zero code

**Open questions before building 7B:**
- [ ] How visible should the switcher be? Hover-only tooltip vs always-visible small badge?
- [ ] Should "shuffle" be instant navigate or a smooth CSS transition between themes?
- [ ] Which analytics approach? (recommendation: Cloudflare custom events — already wired up)
- [ ] How many themes need to exist before wiring up random assignment at `/`?

---

### Phase 8 — Photo Gallery
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

## DNS / CNAME ELI5

### The big picture
When someone types `elliotrmitchell.com` in a browser, the browser has no idea where that is. It asks a DNS server — basically a giant phone book for the internet — "what's the address for elliotrmitchell.com?" The DNS server looks it up and says "go here." That lookup is what all these DNS records control.

### Record types

**A record** — maps a domain name directly to an IP address (a numbered server address).
> `elliotrmitchell.com → 192.64.119.71`
> "The building is at this street address."
> We deleted this — it was pointing to Heroku's IP.

**CNAME record** — maps a domain name to *another* domain name (not an IP). It's a redirect at the DNS level.
> `elliotrmitchell.com → elliotrmitchell.pages.dev`
> "I don't know the street address, but follow signs to elliotrmitchell.pages.dev and they'll know."
> This is what we use now — Cloudflare Pages manages the actual IP behind `pages.dev`.

**Why CNAME is better here:** If Cloudflare ever changes their servers' IP addresses, the CNAME still works. An A record would break.

**MX record** — tells email servers where to deliver mail for your domain.
> `elliotrmitchell.com mail → Google's mail servers`
> "Letters for this address go to the post office on Main St."
> We left these alone — they handle your Gmail.

**TXT record** — arbitrary text attached to a domain, used for verification.
> "Google put a secret code here to prove you own this domain."

### The CNAME apex problem
Normally you can't put a CNAME on the root/apex domain (`elliotrmitchell.com`) — only on subdomains (`www.elliotrmitchell.com`). This is an old DNS rule. Cloudflare gets around it with **CNAME flattening**: internally they resolve the CNAME to an IP and serve an A record to the outside world, but you manage it as a CNAME. That's what that warning message was about — totally normal.

### What we set up
```
elliotrmitchell.com   → CNAME → elliotrmitchell.pages.dev  (Cloudflare flattens this)
www.elliotrmitchell.com → CNAME → elliotrmitchell.pages.dev
```
Both go to Cloudflare Pages. Cloudflare Pages then checks "which project handles this domain?" and serves your Astro site.

### Nameservers
Nameservers are who's *in charge* of your domain's phone book. Before: Namecheap ran your phone book (`dns1.registrar-servers.com`). Now: Cloudflare runs it (`bailey.ns.cloudflare.com`). That's why you updated them in Namecheap — you handed over control of the phone book to Cloudflare, while Namecheap still holds the deed to the domain name.

---

## Conventions

- Misc pages (`/creep`, `/dragracing`) keep their vanilla JS as-is — do not rewrite
- Do not bloat the git repo with large image files — all photos go to R2
- Do not over-engineer — this is a personal static site
- All JS assets for misc pages live in `public/assets/` loaded via `<script is:inline>` tags

## Notes

- Phone number visible in contact section — decide if still desired to be public
- Resume PDF is in `public/assets/` — keep it accessible at `/assets/ElliotMitchell_Resume.pdf`

## Helpers

- If GitHub push fails with `RPC failed; HTTP 400 curl 22` on this repo, increase the git HTTP post buffer before retrying:
  `git config http.postBuffer 524288000`
