# Photo Gallery — Technical Proposal

**Branch:** `claude/photo-gallery-proposal-HTYQD`
**Status:** Proposal — not yet implemented
**Scope:** `/photos` page, R2 storage, secure upload, soft photo protection, optional second domain

---

## Overview

This proposal covers a fully Cloudflare-native photo gallery built on the existing Astro + Cloudflare Pages stack. No new third-party services are required. Everything described here uses tools already in the stack (Cloudflare Pages, R2, Workers) or tools available for free on the Cloudflare free tier.

The implementation is broken into four areas:

1. [Storage Architecture](#1-storage-architecture-cloudflare-r2) — where photos and metadata live
2. [Upload Flow](#2-upload-flow-secure-admin) — how you get photos in (secure, private)
3. [Gallery Page](#3-gallery-page-photosastro) — how photos are displayed (`/photos`)
4. [Photo Protection](#4-photo-protection) — watermarking and soft download prevention
5. [Optional: Second Domain](#5-optional-second-domain) — pointing a new domain at the same site

---

## 1. Storage Architecture (Cloudflare R2)

### Why R2

R2 is Cloudflare's S3-compatible object storage. Free tier is 10 GB storage and **zero egress fees** — meaning serving photos to visitors costs nothing beyond storage. For 1–20 MB photos, 10 GB covers ~500–10,000 photos before you'd need to think about it.

### Bucket Structure

One R2 bucket: `elliotrmitchell-photos`

```
elliotrmitchell-photos/
├── originals/
│   ├── 2024-06-01_lake-tahoe.jpg        ← original full-res upload
│   ├── 2024-08-14_yosemite-falls.jpg
│   └── ...
├── display/
│   ├── 2024-06-01_lake-tahoe.jpg        ← web-optimized version (see note below)
│   └── ...
└── manifest.json                        ← photo index with all metadata
```

**originals/** — your raw uploads, never served directly to visitors.
**display/** — resized/compressed versions for gallery display (see [Image Optimization](#image-optimization) below).
**manifest.json** — the single source of truth for what's in the gallery.

### manifest.json Schema

```json
[
  {
    "id": "2024-06-01_lake-tahoe",
    "filename": "2024-06-01_lake-tahoe.jpg",
    "title": "Lake Tahoe, June",
    "description": "Morning light on the north shore.",
    "takenAt": "2024-06-01T07:43:00Z",
    "uploadedAt": "2024-06-02T14:00:00Z",
    "width": 4032,
    "height": 3024,
    "aspectRatio": 1.333
  },
  ...
]
```

- `takenAt` is what drives sort order in the gallery (newest first).
- `width`/`height`/`aspectRatio` let the grid reserve the right amount of space before images load (prevents layout shift).
- If EXIF data is available from your camera, `takenAt` can be extracted automatically during upload. If not, it defaults to upload time.

### Image Optimization

**The problem:** 20 MB RAW/JPEG photos will destroy load time on a gallery page.
**The solution:** Generate a display copy on upload.

Two approaches — pick one:

#### Option A: Cloudflare Images (recommended if budget allows)
Cloudflare Images costs $5/month and gives you on-demand image transformations via URL parameters. You store the original once, and Cloudflare serves it at any size/format on demand:
```
https://imagedelivery.net/<account>/<image-id>/w=800,format=webp
https://imagedelivery.net/<account>/<image-id>/w=400,format=webp,q=80
```
This means the gallery can request the exact size needed per device. Clean, no manual work.

#### Option B: Worker-side resize on upload (free, slightly more complex)
The upload Worker (described below) uses the `@cf/image-resizing` API to generate a display copy (e.g. max 2000px wide, 85% quality JPEG or WebP) and stores it in `display/` at upload time. Visitors always get the pre-resized version. No per-request processing cost.

**Recommendation:** Start with Option B (free). Add Cloudflare Images later if you want per-device sizing.

---

## 2. Upload Flow (Secure Admin)

### Goal

You take a photo on your camera, connect to the site on your laptop or phone, upload through a password-protected UI, and the photo appears in the gallery immediately. No Cloudflare dashboard, no manual JSON editing.

### Architecture: Cloudflare Worker + Private Admin Page

```
[Your browser]  →  /admin/photos  (Astro static page, password-gated)
      ↓
[Upload form]  →  POST /api/upload  (Cloudflare Worker)
      ↓                                    ↓
[Worker validates secret]        [Worker reads EXIF if available]
      ↓                                    ↓
[Writes original to R2]          [Generates display copy]
      ↓                                    ↓
[Updates manifest.json in R2]    [Returns success to UI]
```

### Admin Page (`/admin/photos`)

A static Astro page — no server-side auth needed because the page itself is just a form. The real security gate is the Worker.

The page contains:
- A file input (accepts JPEG/HEIC/PNG/RAW)
- A title field (optional — can be auto-named from filename or EXIF)
- A description field (optional)
- A "taken at" date picker (optional — auto-filled from EXIF if available)
- A submit button

The page is **not linked from anywhere** — it only exists at `/admin/photos`. Anyone who navigates there will see the form, but they can't successfully upload without the secret.

**Important:** Do not add this page to any nav or sitemap. Obscurity is the first layer.

### Upload Worker (`/api/upload`)

A Cloudflare Worker that handles the actual upload. Deployed alongside the Pages project.

**Authentication — shared secret header:**

```
POST /api/upload
X-Upload-Secret: <your-secret-token>
Content-Type: multipart/form-data
```

The Worker checks for the `X-Upload-Secret` header. If missing or wrong → `403`. If correct → proceed.

The secret is stored as a Cloudflare Worker environment secret (not in the repo). You set it once in the Cloudflare dashboard under Workers → Settings → Variables & Secrets. It never appears in code or git.

**How the admin page sends the secret:**
The secret is entered into a password field on the admin page before submitting. The JS on the page attaches it as a request header. The field value is never stored to `localStorage` — you type it each session.

> **Security note:** This is not enterprise-grade auth, but it's very solid for a personal site. The secret is 32+ character random string. Even if someone finds the `/admin/photos` URL, they can't upload without the secret. No accounts, no OAuth, no database.

**Worker logic:**

```
1. Validate X-Upload-Secret header → 403 if wrong
2. Parse multipart form body → extract file, title, description, takenAt
3. Extract EXIF takenAt from image bytes if takenAt not provided
4. Generate unique filename: <ISO-date>_<slugified-title>.jpg
5. Resize/compress image for display copy (max 2000px wide, 85% quality)
6. Write original to R2: originals/<filename>
7. Write display copy to R2: display/<filename>
8. Read manifest.json from R2
9. Append new photo entry to manifest array
10. Write updated manifest.json back to R2
11. Return { success: true, id: filename } to the browser
```

**EXIF extraction:** The Worker can parse EXIF from JPEG/HEIC using a small EXIF parsing library (e.g. `exifr` bundled into the Worker). This lets you skip filling in the date manually — it reads it from the camera's metadata.

**Rate limiting:** Worker can enforce a hard limit (e.g. max 5 uploads per hour per IP) using Cloudflare's built-in rate limiting. Stops abuse even if the URL is discovered.

### Upload UX

After a successful upload, the admin page shows a thumbnail preview and a link to `/photos` so you can immediately verify it appears. The gallery page always fetches `manifest.json` fresh, so no rebuild is needed — photos appear instantly.

---

## 3. Gallery Page (`/photos`)

### Data Fetching Strategy

Since the site is statically built on Cloudflare Pages, there are two options:

#### Option A: Client-side fetch (recommended)
The `/photos` page is a static shell. On load, browser JS fetches `manifest.json` from R2, then renders the grid client-side.

- **Pros:** Photos appear immediately after upload with no site rebuild. Gallery is always live.
- **Cons:** A very brief loading state is visible (easy to design around with a skeleton UI).

#### Option B: Build-time SSG
`manifest.json` is fetched at Astro build time and baked into the page HTML.

- **Pros:** No JS required, instant render, great for SEO.
- **Cons:** New photos only appear after a site rebuild (push to master). Not ideal for a decoupled upload flow.

**Recommendation:** Option A (client-side fetch). The gallery is a personal showcase, not a blog — SEO is secondary. Photos showing up instantly after upload is more important.

### Grid Layout

The grid supports three density modes, switchable via a floating control:

| Mode | Description |
|---|---|
| **Large** | 1–2 columns, photos shown big, breathing room |
| **Medium** | 3 columns (default), balanced |
| **Compact** | 5–6 columns, dense, thumbnail-style |

Grid is CSS Grid with `auto-fill` and a minimum column size that adapts per mode:

```css
/* Medium (default) */
.grid { grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); }

/* Large */
.grid { grid-template-columns: repeat(auto-fill, minmax(480px, 1fr)); }

/* Compact */
.grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); }
```

All photos in the grid maintain a fixed aspect ratio container — the actual image fills it with `object-fit: cover`. This avoids layout reflow as images load.

**Masonry consideration:** True masonry (staggered heights by photo aspect ratio) looks great but is harder to implement without JS. CSS has `masonry` support behind a flag in some browsers but not widely available yet. For now, a uniform-ratio grid is recommended for reliability. Can revisit masonry later.

### Grid Sorting

Photos are sorted by `takenAt` (newest first) by default. The manifest is already an array — just sort client-side:

```js
const sorted = manifest.sort((a, b) => new Date(b.takenAt) - new Date(a.takenAt));
```

No server-side logic needed.

### Lazy Loading

All grid images use `loading="lazy"` and the browser handles the rest. Photos outside the viewport don't load until the user scrolls near them. This is critical given photo sizes.

For extra performance: use low-quality inline placeholder SVGs (tiny blurred `data:` URI) while the real image loads. These can be generated at upload time.

### Floating Density Control

A small floating UI element (bottom-right, similar to the ThemeSwitcher pattern already in the codebase):

```
[ ⊞ ]  [ ⊟ ]  [ ▤ ]
 SM     MD     LG
```

Clicking a mode switches the grid CSS class. Selected mode is saved to `localStorage` so the next visit remembers it.

### Metadata Display

In **grid view**: photo title appears on hover as an overlay (dark gradient at bottom of tile + white text). On mobile it's always visible.

In **lightbox view**: full metadata shown:
- Title (large)
- Description
- Date taken (formatted: "June 1, 2024")
- No technical EXIF (lens, aperture, etc.) unless you want it

### Lightbox / Viewer

Click any photo → lightbox opens. Full-screen dark overlay with the photo centered and sized to fit.

Navigation:
- Arrow keys (left/right) to traverse
- Swipe left/right on mobile
- Click outside or press Escape to close
- Previous/Next arrow buttons overlaid on the photo

The lightbox shows the **display copy** from R2 (same as the grid), not the original. No exposure of the original path.

Photo in the lightbox is constrained to `max-width: 90vw, max-height: 90vh` — it doesn't stretch beyond the actual image dimensions.

### Performance Notes

- `manifest.json` is fetched once and cached in memory for the session
- R2 is served via Cloudflare's CDN — photos are edge-cached globally
- The static page shell (HTML/CSS/JS) is on Cloudflare Pages CDN — zero latency
- `loading="lazy"` means only above-fold photos load on arrival
- Display copies are pre-sized to ~2000px max — not 20 MB originals
- `aspect-ratio` on grid cells prevents layout shift before images load

---

## 4. Photo Protection

### Philosophy

You want **soft protection**, not DRM. The goal is:
- Reduce casual "right-click → Save As" downloads
- Watermark photos so unprotected copies are at least attributed
- Not make the experience annoying for legitimate viewers

None of this is unbreakable — a determined person with dev tools can always get the image. That's acceptable.

### Watermarking

**Approach: Canvas overlay at display time**

Photos in the lightbox are rendered onto a `<canvas>` element instead of a plain `<img>`. After the image loads, a small watermark is drawn onto the canvas in JS:

```
"© Elliot Mitchell"
```

Positioning: bottom-right corner, subtle sans-serif, ~12px, white text with a soft dark shadow. Opacity around 0.5 — visible on inspection but not distracting.

The canvas is what the user sees and what gets saved if they try to screenshot-capture. The underlying `<img>` element with the real URL is not displayed (hidden or removed after canvas paint).

In grid view, the same canvas rendering can be applied but it's less critical — grid thumbnails are small enough that watermarking them is optional.

**What this protects against:**
- Right-click → Save (they save the canvas as PNG, with watermark)
- Inspect Element to find the URL → they can still find it, but watermark is baked into what they see

**What it does not protect against:**
- Someone manually navigating to the R2 URL they find in dev tools
- Screenshot without canvas (the watermark is still visible in the rendered UI)

### Additional Soft Protections

**Context menu suppression on photos:**
```js
img.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('contextmenu', e => e.preventDefault());
```
Disables right-click on photo elements. Easy to work around, but blocks the casual user.

**CSS pointer-events and user-select:**
```css
img, canvas {
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none; /* applied to img, not canvas */
}
```
Prevents drag-to-desktop on desktop browsers.

**No direct R2 URL exposure:**
The manifest stores filenames, not full R2 URLs. The full URL is assembled in client JS. This isn't security through obscurity — anyone with dev tools can find it — but it means the URL isn't sitting in plain HTML source.

**Hotlink protection (optional):**
A Cloudflare Transform Rule can block requests to R2 display photos that don't originate from your domain. Anyone trying to embed your photos on another site would get a 403. Low effort, meaningful for the use case.

### What the Watermark Does Not Need to Be

- You don't need to server-side watermark originals — that would be overkill and irreversible
- You don't need to use `<canvas>` on grid thumbnails — the hover overlay + title is protection enough there
- You don't need to convert photos to WebP with embedded watermark at upload time — canvas is simpler

---

## 5. Optional: Second Domain

### Can You Point a Second Domain to the Same Cloudflare Pages Project?

**Yes, completely supported.** Cloudflare Pages lets you add multiple custom domains to the same Pages project. You've already done this pattern with both `elliotrmitchell.com` and `www.elliotrmitchell.com`.

### How It Would Work

Say you want `elliotphotos.com` (or `elmitchell.photos`, or whatever):

1. Register the new domain (Namecheap or Cloudflare Registrar, ~$10–15/yr for `.com`)
2. Add it to Cloudflare (free plan — same account)
3. Update its nameservers to Cloudflare
4. In Cloudflare Pages → your project → Custom Domains → Add Domain → `elliotphotos.com`
5. Cloudflare provisions SSL automatically

Now `elliotphotos.com` serves the exact same Astro site as `elliotrmitchell.com`. Same HTML, same CSS, same pages.

### Routing to `/photos` on a Dedicated Domain

If you want `elliotphotos.com` to go directly to the photos page (not the portfolio homepage), use a Cloudflare Redirect Rule:

```
If: hostname equals elliotphotos.com AND path does not start with /photos
Then: redirect to https://elliotphotos.com/photos (301)
```

This is a one-click Cloudflare dashboard rule — no code change needed. The new domain always lands on the gallery.

### Is It Worth It?

**For sharing:** A short domain like `elliotphotos.com` is much easier to tell someone verbally than `elliotrmitchell.com/photos`. If you share photos a lot, this is worth the $10/yr.

**For branding:** Keeps the photos experience feel separate from the portfolio, even though it's the same infra.

**For infra:** Zero extra cost or complexity. One Cloudflare account, one Pages project.

---

## Implementation Phases

### Phase A — Storage + Manifest (foundation, no UI yet)

1. Create R2 bucket `elliotrmitchell-photos`
2. Make bucket publicly readable (R2 → Bucket → Settings → Public Access)
3. Add a CORS policy to the bucket allowing requests from `elliotrmitchell.com`
4. Create an empty `manifest.json` (`[]`) and upload it to the bucket root
5. Note the public R2 URL (looks like `https://pub-<hash>.r2.dev/`)
6. Optionally: set up a custom subdomain (`photos-cdn.elliotrmitchell.com → R2 bucket`) for cleaner URLs

---

### Phase B — Upload Worker (get photos in first)

1. Create a Cloudflare Worker (`workers/upload-worker.js`) in the repo
2. Configure Worker routing: `/api/upload` → Worker
3. Set `UPLOAD_SECRET` as a Worker environment secret in Cloudflare dashboard
4. Bind the R2 bucket to the Worker (`R2_BUCKET` binding)
5. Implement upload logic: validate secret → parse form → resize → write to R2 → update manifest
6. Create `src/pages/admin/photos.astro` — simple HTML form that POSTs to `/api/upload` with the secret header
7. Test: upload a photo via the admin page, verify it appears in manifest.json and R2

Dependencies: `exifr` (EXIF parsing), `@cf/image-resizing` (Cloudflare Workers image API — no npm needed, built in)

---

### Phase C — Gallery Page (make photos visible)

1. Create `src/pages/photos.astro` — static shell page
2. Write `public/assets/photos.js` — client-side JS that:
   - Fetches `manifest.json` from R2
   - Renders the grid with skeleton loaders
   - Implements density switcher (SM/MD/LG)
   - Implements lightbox with keyboard + swipe navigation
   - Implements canvas watermark on lightbox open
   - Implements context menu suppression
3. Write `public/assets/photos.css` — grid, lightbox, density modes, hover overlays
4. Connect the `/photos` link from the portfolio (add to nav/contact area on active theme)

---

### Phase D — Protection Polish

1. Canvas watermark tested and positioned correctly
2. Context menu suppression tested
3. CSS drag prevention applied
4. R2 hotlink protection rule set up in Cloudflare (optional but easy)
5. Verify right-click → Save As saves the canvas version with watermark

---

### Phase E — Optional: Second Domain

1. Register domain
2. Add to Cloudflare + Pages project
3. Add redirect rule if desired

---

## Security Model for a Public Repository

This repo is public on GitHub. That changes some defaults — everything in the repo is visible to anyone. Here is exactly what can and cannot live in the repo:

### What stays OUT of the repo (never committed)

| Secret | Where it lives instead |
|---|---|
| `UPLOAD_SECRET` (the shared upload token) | Cloudflare Worker environment secret — set once in Cloudflare dashboard → Workers → Settings → Variables & Secrets |
| R2 bucket name / account ID | Cloudflare Worker binding — configured in the Cloudflare dashboard, not in `wrangler.toml` if that file is public |
| Any future API keys | Same: Cloudflare dashboard secrets only |

The Worker source code in the repo only reads from `env.UPLOAD_SECRET` — the actual value never appears anywhere in git history, source files, or comments.

### What CAN live in the repo (safe to be public)

- Worker source code (`workers/upload-worker.js`) — logic only, no values
- Admin page HTML/JS (`src/pages/admin/photos.astro`) — the form, the fetch call structure
- R2 public CDN base URL (this is already public — it's how browsers load photos)
- `manifest.json` structure definition

### GitHub Secrets (for CI/CD if needed)

If Cloudflare Pages auto-deploys from GitHub via the GitHub integration (which it already does), and if the upload Worker is deployed via GitHub Actions in the future, the Worker deploy step would reference secrets like:

```yaml
# .github/workflows/deploy-worker.yml — example only
env:
  CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
  CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

Those values are stored in GitHub → Settings → Secrets and Variables → Actions. They are never in any file that gets committed. The workflow YAML file itself is safe to commit — it only references secret names, not values.

**For Phase B (initial Worker deploy):** The Worker can be deployed manually via the Cloudflare dashboard (paste the source, set the secrets there) — no GitHub Actions needed at all. This is the simplest path for a personal site.

### Admin Page Security in a Public Repo

The admin page at `/admin/photos` is a static HTML form. Because the repo is public, anyone can read the source of this page. That is fine — the page itself does nothing dangerous. The only thing that matters is the secret header value the form sends, which:

1. Is never in the source (user types it into a password field each session)
2. Is validated only inside the Worker (which is also readable but has no secret value embedded)
3. Is the actual secret stored only in Cloudflare's secrets vault

Someone reading the repo sees: "there is a form at `/admin/photos` that sends a header called `X-Upload-Secret`." They still cannot upload without knowing the secret value. The security lives entirely in Cloudflare, not in the source.

### Extra Obscurity Layer (optional but easy)

Move the admin page to a non-obvious path, e.g. `/em-internal/upload` instead of `/admin/photos`. Configure this path in a Cloudflare Pages `_redirects` file or just by placing the `.astro` file at that path. There is no canonical "admin" path to guess.

Additionally, a Cloudflare WAF rule (free tier available) can block requests to the upload endpoint from any IP outside a specific country or CIDR range — trivial to set up, adds meaningful friction.

---

## Open Questions Before Building

- [ ] **Cloudflare Images ($5/mo) or free resize-on-upload?** Recommendation: start free, upgrade if needed.
- [ ] **Watermark text:** "© Elliot Mitchell" or just "EM" or a small icon?
- [ ] **Grid default density:** Medium (3 columns) recommended as default.
- [ ] **Photos per page:** Load all from manifest at once, or paginate? Recommendation: load all (manifest is JSON, small). Lazy loading handles performance.
- [ ] **Admin page URL:** `/admin/photos` — is that OK or do you want it at a more obscure path?
- [ ] **Subdomain for R2 CDN:** Do you want `photos-cdn.elliotrmitchell.com` pointing at the bucket, or is the default R2 `.dev` URL fine?
- [ ] **Second domain:** Do you want to register one now or keep it as an option?

---

## What Does Not Change

- No changes to `master` until this is approved and tested
- No changes to existing themes or portfolio pages
- No changes to `src/content/portfolioContent.js`
- The Astro site remains static (`output: 'static'`)
- The upload Worker is the only server-side component added

---

## Summary

| Feature | Approach | Cost |
|---|---|---|
| Photo storage | Cloudflare R2 | Free (10 GB) |
| Photo delivery / CDN | Cloudflare (R2 served via CDN edge) | Free (no egress) |
| Metadata | `manifest.json` in R2 | Free |
| Image resize on upload | Cloudflare Worker built-in image API | Free |
| Upload auth | Shared secret header + Cloudflare Worker | Free |
| Admin page | Static Astro page at `/admin/photos` | Free |
| Gallery page | `/photos` — Astro page + client-side JS | Free |
| Watermark | Canvas overlay in browser JS | Free |
| Second domain | Additional Pages custom domain | ~$10–15/yr for domain |
| Cloudflare Images (optional upgrade) | On-demand sizing/format | $5/month |

Total **required** cost: **$0/month** beyond the domain you already have.
Optional upgrade (Cloudflare Images): $5/month if you want dynamic per-device sizing.
