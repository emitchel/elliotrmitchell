# Portfolio Theme Template

Single source of truth for building portfolio themes.

Use this file to understand:
- how themes should be built
- what content exists
- what not to do
- where theme content must come from
- what themes already exist

`CLAUDE.md` is for project memory, progress, and next steps.

---

## Core Rule

Theme data should come from `src/content/portfolioContent.js` whenever possible.

Do not recreate portfolio content inline inside a theme if the data already exists in the shared content module.

Any new readable strings or numeric values introduced for a theme must be added to `src/content/portfolioContent.js` — either merged into an existing export (e.g. appended to a list) or defined as a new named export with a pragmatic, specific name. For theme-specific editorial copy that doesn't belong in a shared list, export it as `theme{N}Content` (e.g. `theme2Content`, `theme3Content`). Do not hardcode readable content inline in a page.

---

## How To Build A New Theme

1. Read this file first.
2. Review `src/content/portfolioContent.js` — all exports are available for use.
3. Create `src/pages/<n>/index.astro` using the next available number. `/3` is taken (legacy page) — start at `/4` for the next new theme.
4. Import shared content from `src/content/portfolioContent.js`.
5. Import `ThemeSwitcher` from `src/components/ThemeSwitcher.astro` and place it just before `</body>`.
6. Pass the theme's `themeNumber`, `fontFamily`, `primaryColor`, and `accentColor` props to `ThemeSwitcher`.
7. Add the new theme to the Theme Log in this file — include the color/font values used.
8. Add the new theme entry to `src/pages/portfolioindex/index.astro` `themes` array using those same values.

---

## Shared Content Module

Primary content source:
- `src/content/portfolioContent.js`

All exports are available for any theme to use freely. Use whatever makes sense for the theme's design.

| Template section | Export in `src/content/portfolioContent.js` |
|---|---|
| Name, headline, subheadline | `portfolioIdentity` |
| Dynamic year counts | `portfolioMetrics` |
| Profile image options | `profileImages` |
| Portfolio projects | `workItems` |
| Open source links | `openSourceLinks` |
| Writing/articles | `writingArticles` |
| Skills | `skillTags` |
| Experience timeline | `experienceTimeline` |
| Contact/social links | `contactDetails` |
| Theme-specific editorial copy | `theme2Content`, `theme{N}Content` |

Key `portfolioMetrics` fields:
- `portfolioMetrics.yearsBuildingAndroid` — calculated from 2012 to the current year
- `portfolioMetrics.recentLeadershipYears` — calculated from 2020 to the current year
- `portfolioMetrics.projectsShownCount` — length of `workItems`

Key `portfolioIdentity` fields:
- `portfolioIdentity.name`
- `portfolioIdentity.headline`
- `portfolioIdentity.subheadline` — full sentence referencing year counts

Current contact exports expected in themes:
- `contactDetails.email`
- `contactDetails.stackOverflow`
- `contactDetails.github`
- `contactDetails.linkedin`

---

## Do Not Do These Things

- Do not add a standalone resume CTA or button such as `See resume` or `Download resume`
- Do not add standalone hero/contact CTA buttons that directly say `Contact me` or expose the email outside the grouped contact/social links
- Do not describe Elliot as being open or available for freelance work, or otherwise sell availability in page copy
- Do not modify `src/pages/index.astro` (the active theme router) or `src/pages/3/index.astro` (legacy page) as part of theme work unless explicitly requested
- Do not create a second source of truth for portfolio content outside `src/content/portfolioContent.js`
- Do not rebuild already-shared data structures inside individual themes
- Do not hardcode readable strings or numbers inline in a theme page — add them to `src/content/portfolioContent.js` first

---

## Do These Things

- Every theme should include a contact/social links area somewhere on the page
- That contact/social links area should include Email, Stack Overflow, GitHub, and LinkedIn
- Themes should include most major content sections: identity/hero, portfolio/work, skills, experience, and contact at minimum. Writing and open source can be included at the theme's discretion.
- Import shared content from `src/content/portfolioContent.js`
- Pick a profile image freely — all 8 are available (`profileImages.profile1` through `profile8`), pick whichever fits the theme's tone
- Keep each theme visually independent even though the content is shared
- Build mobile responsive layouts
- Keep theme files self-contained unless there is an existing shared component worth reusing
- **Every theme must include the `ThemeSwitcher` component** — place it just before `</body>`, pass `themeNumber`, `fontFamily`, `primaryColor`, `accentColor`

---

## Theme Rules

- Every theme lives at `src/pages/<n>/index.astro`
- Themes should be standalone `.astro` pages
- No Bootstrap, no jQuery, no CSS frameworks
- Vanilla CSS and minimal JS only
- Google Fonts are fine
- Scroll-based reveal behavior should use `IntersectionObserver`
- Mobile responsive is required
- If using phone-framed project screenshots, use the shared `PhoneMockup` component instead of re-implementing it

---

## ThemeSwitcher Component

Lives at `src/components/ThemeSwitcher.astro`.

Every theme page must include this component. It renders as a small floating "EM" circular button (fixed bottom-right on desktop, anchored below content on mobile). Clicking it shows a short blurb with a link to `/portfolioindex`.

Example:

```astro
---
import ThemeSwitcher from '../../components/ThemeSwitcher.astro';
---

<ThemeSwitcher
  themeNumber={1}
  fontFamily="'Inter', system-ui, sans-serif"
  primaryColor="#f9f9f7"
  accentColor="#0a0a0a"
/>
```

Props:
- `themeNumber` — integer, the theme's route number
- `fontFamily` — CSS font-family string, used to flavor the button label
- `primaryColor` — theme's primary background color (used as button text color)
- `accentColor` — theme's accent color (used as button background)

When adding a new theme, also add its metadata to the `themes` array in `src/pages/portfolioindex/index.astro`.

---

## PhoneMockup Component

Lives at `src/components/PhoneMockup.astro`.

Example:

```astro
---
import PhoneMockup from '../../components/PhoneMockup.astro';
---

<PhoneMockup src="/assets/portfolio_rill.png" alt="Rill Social" />
```

Props:
- `src` - image path
- `alt` - alt text
- `width` - optional width in px, defaults to `200`

The component owns its own frame CSS. Do not override `.phone-frame` styles from the page.

---

## Content Reference

This section exists so a theme author can quickly understand the portfolio without guessing.
The canonical editable version of this content is still `src/content/portfolioContent.js`.

### Identity

- Name: Elliot Mitchell
- Headline: Director of Mobile / Android Engineer
- Subheadline: `portfolioIdentity.subheadline` — references `yearsBuildingAndroid` and `recentLeadershipYears`
- Dynamic year count: `portfolioMetrics.yearsBuildingAndroid`, calculated from 2012

### Profile Photos

- Available shared image keys: `profile1` through `profile8`
- Backed by `/public/assets/profile_1.jpg` through `/public/assets/profile_8.jpg`
- Pick freely — no assigned usage per theme

### Portfolio / Work

Flat list. No featured hierarchy is required.

Projects are provided by `workItems`.

### Open Source

Provided by `openSourceLinks`. Array of GitHub URLs — render as a simple link list.

### Writing

Provided by `writingArticles`.

### Skills

Provided by `skillTags`.

### Work History

Provided by `experienceTimeline`.

### Contact

Provided by `contactDetails`.

Required links in theme contact sections:
- Email
- Stack Overflow
- GitHub
- LinkedIn

---

## Theme Architecture

### URL Structure

| Route | Description |
|---|---|
| `/` | Active theme router — `Astro.rewrite('/2')`. Do not treat as a page. |
| `/1` | Theme 1 — Minimal White |
| `/2` | Theme 2 — Field Notes (current default) |
| `/3` | Legacy site — original Bootstrap/jQuery page, kept for historical reference. Do not touch. |
| `/portfolioindex` | Directory of all themes |
| `/<n>` | Next new theme starts at `/4` |

### Constraints

- Themes should render the same underlying portfolio data
- Structure and styling can vary heavily between themes
- Shared content should come from `src/content/portfolioContent.js`

---

## Theme Log

| # | Direction / Reference | Colors | Font | Status |
|---|---|---|---|---|
| 1 | Minimal white — rounded section cards, CSS phone mockups for portfolio, staggered skill pills | bg `#f9f9f7`, accent `#0a0a0a` | Inter | Built at `/1` |
| 2 | Field Notes — warm editorial minimalism, profile-led hero, dense work grid with side rail | bg `#f3efe7`, accent `#9f6848` | Manrope / Newsreader | Built at `/2` (default) |
| 3 | Legacy — original Bootstrap/jQuery site | bg `#1a1a2e`, accent `#e94560` | system-ui | Preserved at `/3`, not a design theme |
