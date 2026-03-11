# elliotrmitchell — Portfolio Site

Personal portfolio site for Elliot Mitchell (Mobile/Android Engineer).

## Stack

- **Frontend:** Astro (static site generator), Node 24
- **Hosting:** Cloudflare Pages (free, unlimited bandwidth, auto SSL, global CDN)
- **Media storage:** Cloudflare R2 (HD photo storage, no egress fees)
- **Domain:** Namecheap (registrar) → Cloudflare (DNS/nameservers) → connected to Pages
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

### Phase 7 — UI Modernization
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
