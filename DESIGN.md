# Portfolio Redesign — Design Brief

## North Star Vision

The portfolio ships **multiple distinct visual themes** that share identical content. Every new visitor gets a randomly assigned theme. A subtle easter egg UI element lets visitors switch themes and express a preference — that preference data gets collected so we can learn which designs resonate.

Theme selection is driven at the edge (Cloudflare Worker or client-side) so it's fast and stateless. No login, no database — just a cookie/localStorage preference and a lightweight analytics event.

**Current phase: lock in content first. No UI decisions until content is settled.**

---

## Phase Order

1. ✅ **Content** — finalize every piece of copy and data that will appear on the site (this document, this phase)
2. **Theme A** — first visual design built on top of locked content
3. **Theme B** — second visual design, same content
4. **Theme C+** — additional themes as desired
5. **Theme switcher** — subtle easter egg component, preference tracking
6. **Cloudflare routing** — random theme assignment at the edge

---

## Content Spec (source of truth)

This is what every theme will render. Change it here, it flows to all themes.

---

### Headline & Sub-headline

**Name:** Elliot Mitchell

**Headline (draft):** Director of Mobile · Freelance Android Engineer

**Sub-headline:** Built Android apps for 15 years. Spent the last 4 leading teams, growing engineers, and obsessing over the gap between fast and good — and yes, I still write the code.

---


### Profile Photo

- 8 options available: `profile_1.jpg` through `profile_8.jpg` in `/public/assets/`
- Original files kept in `/profilepics/` for reference
- Pick one before building themes

---

### Portfolio / Work

Flat list — no hierarchy, no "featured" vs secondary. Themes decide how to visually weight them.

| Project | Type | Asset | Link | Note |
|---------|------|-------|------|------|
| Rill Social | Freelance | — | — | Launching soon — no assets yet |
| Lens Distortions | Freelance | `lensdistortions.png` | Play Store | Multi-million users |
| Mach Energy | Freelance | `mach.png` | machenergy.com | — |
| Lucra Sports | Full-time | — | — | Built Android app end-to-end |
| Microsoft Flip | Full-time | — | — | SDK across Teams, Xbox, Snapchat |
| LiveSafe | Full-time | `livesafe.png` | Play Store | — |
| Outdoorsy | Full-time | `outdoorsy.png` | Play Store | — |
| Cryptonomy | Side project | `cryptonomy.png` | Product Hunt | — |
| Varsity Tutors | Full-time | `varsitytutors.png` | Play Store | — |

> Question: anything to add or remove from this list?

---

### Skills / Capabilities

No pie charts. No percentages. Two buckets — tag/pill layout in all themes.

**Android Engineering**
- Jetpack Compose
- Kotlin & Coroutines
- XML/View-based UI & interop
- SDK Architecture & Publishing (Maven)
- Modular Build Systems
- Google Play Billing (subscriptions & IAP)
- CI/CD — Bitrise, GitHub Actions, GitLab CI, Jenkins
- Firebase, New Relic, App Center
- JUnit, Robolectric

**Leadership**
- Hiring & Technical Interviews
- Performance Management & Coaching
- Cross-org & Distributed Delivery
- Roadmap Ownership
- Inclusive Engineering Culture

> Question: anything missing or to remove?

---

### Work History (experience timeline)

Education removed entirely per decision.

| Dates | Company | Role | Note |
|-------|---------|------|------|
| Jul 2024–Present | Lucra Sports | Director of Mobile | Built Android app end-to-end in 6 months; architected SDK for third-party distribution |
| Jan 2021–Jul 2024 | Microsoft | Sr. Engineering Manager, Android | Led SDK across Teams, Xbox, Snapchat, GroupMe via Microsoft Flip |
| May 2017–Present | Freelance | Principal Android Engineer | Lens Distortions, Mach Energy — multi-million user scale |
| Apr 2020–Dec 2020 | LiveSafe | Sr. Android Engineer | Shipped to 350k+ devices |
| Jan 2020–Apr 2020 | Outdoorsy | Sr. Android Engineer | — |
| Nov 2018–Dec 2019 | Nerdery | Sr. Android Engineer | Bluetooth LE glucose monitoring |
| Jul 2017–Nov 2018 | Spreetail | Android Engineer | Offline-first fulfillment tooling |
| Apr 2016–Jul 2017 | Varsity Tutors | Android Engineer II | Live video tutoring |
| Jan 2014–Apr 2016 | Sandhills Publishing | Lead Android Engineer | — |

---

### Contact

- **Email:** elliot.r.mitchell@gmail.com
- **LinkedIn:** linkedin.com/in/elliotrmitchell
- **GitHub:** github.com/emitchel
- **Resume:** `/assets/ElliotMitchell_Resume.pdf` — download link in every theme

---

## Multi-Theme Architecture (future)

Once content is locked and themes are built:

### Theme switching
- Tiny, subtle easter egg button somewhere on the page (not obvious — fun for visitors who explore)
- Clicking it cycles through available themes with a smooth transition
- Selection stored in `localStorage`
- On next visit, stored preference is respected

### Preference data collection
- On theme switch or page load with a stored preference, fire a lightweight event
- Options (pick one when we get there):
  - Cloudflare Web Analytics custom event
  - Simple Cloudflare Worker that writes to a KV store
  - Just a query param that shows up in Cloudflare analytics

### Random assignment for new visitors
- No stored preference = randomly assign a theme on first load
- Options:
  - Client-side JS (simplest, slight flash of default before JS runs)
  - Cloudflare Worker (cleanest, zero flash — sets a cookie at the edge before HTML is served)
- Recommended: Cloudflare Worker sets `theme` cookie → Astro reads it at build time or client JS reads it

### Theme constraints
- All themes share the **exact same content spec** above
- Each theme is its own CSS/layout approach — could be entirely different structure
- Theme ideas to explore (not decided yet):
  - Dark, floating phone mockups, indigo accent (original concept)
  - Minimal light/off-white, editorial typography, no imagery
  - Bold typographic — massive text, almost no UI chrome
  - Terminal/code aesthetic — monospace, green-on-dark
  - Card-based, almost app-store-like layout

---

## Open Questions (must resolve before building)

| # | Question | Status |
|---|----------|--------|
| 1 | **Sub-headline** | ✅ Locked |
| 2 | **Bio copy** | ✅ Removed — sub-headline covers it |
| 3 | **Phone number** | ✅ Removed — email + socials only |
| 4 | **Portfolio list** — anything to add or cut from the work table? | ⏳ Pending |
| 5 | **Skills** — anything missing or outdated in either bucket? | ⏳ Pending |
| 6 | **First theme direction** — which aesthetic to build first? | ⏳ Pending (after content locked) |
