# Dev Parmar — Portfolio

Personal portfolio for **Dev Parmar**, UI/UX Designer & Frontend Developer.
Built with the Next.js App Router, Tailwind CSS v4, and Framer Motion.

---

## Getting started

Requires **Node.js 18.18+** (Node 20 LTS recommended).

```bash
npm install
npm run dev       # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

---

## Editing your content

**All content lives in one file: [`data/portfolio.js`](data/portfolio.js).**
Nothing is hard-coded in the components — edit the data file and the whole
site follows.

### Things still to fill in

These were not on the resume, so they were deliberately left blank rather
than guessed at. Each one is marked with a `TODO` in the data file:

| What | Where | What happens while it's blank |
| --- | --- | --- |
| Campus Shoes copy | `projects[].description`, `.tech` | Card shows title, category and CTA only |
| GitHub URL | `socials` | The GitHub icon is hidden everywhere |
| Behance URL | `socials` | The Behance icon is hidden everywhere |
| Per-project Behance link | `projects[].behanceUrl` | The "Behance ↗" button is hidden |
| Project covers | `projects[].cover` | Cards show a blueprint plate + glyph |
| Education campus locations | `education[].location` | The location line is omitted |
| Certificate dates / credential URLs | `certifications[].date`, `.url` | "Issued …" and "Verify" are omitted |

Empty values are a supported state, not a broken one. Fill one in and the
matching UI appears automatically. There is deliberately no `github` field on
projects — repository links are not shown in cards or detail views.

### Project call-to-action rules

The CTA is derived from the data, never hardcoded:

| Condition | Button |
| --- | --- |
| A real `liveUrl` | ● **Live App ↗** — green live dot, opens the running app |
| A real `behanceUrl` | **View Case Study ↗** — opens the Behance gallery |
| No `behanceUrl` | **View Case Study ↗** — opens the in-site detail view |

The first applicable button is the primary one. A project with no URL shows no
dead link — the button simply isn't rendered.

### Current projects

| Project | Type | Links |
| --- | --- | --- |
| Apna PG | Live | Live app + Behance |
| Nescafé | Case study | Behance + local board |
| Competitive App Analysis — 10 Laws of UX | Case study | Local board |
| Kid Cab Booking App | Case study | Behance |
| Campus Shoes | Case study | Behance |
| History & Culture Map | Case study | In-site detail |

To add more, copy the template block at the top of the `projects` array in
`data/portfolio.js`. Only `slug`, `title`, `type` and `icon` are required —
everything else degrades gracefully when left blank.

### Preparing the case-study boards

The two case-study exports are tall and heavy, so they're processed before
use:

```bash
node scripts/prepare-case-studies.mjs
# or point it at the folder holding dd.png / kk.png:
node scripts/prepare-case-studies.mjs "C:\path\to\images"
```

For each board this writes a `-cover.webp` (card artwork) and a `-full.jpg`
(progressive JPEG for the detail view) into `public/images/projects/`. The
script prints the output dimensions — they should match `fullWidth` /
`fullHeight` in `data/portfolio.js`.

Progressive JPEG rather than WebP because WebP caps at 16,383px per side and
the NESCAFÉ board is taller than that.

### Hero photo

The hero shows your cut-out photo on a round backdrop, with a thought bubble
above. Skills from the `workflow` list in `data/portfolio.js` pass through the
bubble one at a time:

- **Design skills** — the bubble reads "Thinking", with a wireframe, lightbulb
  and pencil around your head.
- **Programming skills** — it reads "Computing", with code panels instead.

The backdrop, bubble border and doodles take the brand colour of the skill in
mind (Figma orange, JavaScript yellow, Python blue, and so on). Skills without
a brand of their own use Figma orange while thinking and VS Code blue while
computing. The photo itself is never altered.

To add or replace the photo (it needs a transparent background):

```bash
node scripts/prepare-photo.mjs "C:/path/to/photo.png"
```

That trims the empty space around you and writes `public/images/profile.png`.

### Adding project covers

Put images in `public/images/projects/` (1200 × 675 works well) and point at
them from `projects[].cover`. A cover image replaces the drawn cover art on
that card.

---

## Contact form

The form validates on the client, then:

- **With `NEXT_PUBLIC_FORM_ENDPOINT` set** — POSTs `{ name, email, message }`
  as JSON to that URL. Works with Formspree, a Resend-backed API route, or
  anything else that accepts JSON.
- **With nothing set** (the default) — opens the visitor's mail client with
  the message pre-filled, addressed to you.

To wire up Formspree:

```bash
cp .env.example .env.local
# then set NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

On Vercel, add the same variable under **Settings → Environment Variables**.

---

## Deploying to Vercel

1. Push this folder to a Git repository.
2. Import it at [vercel.com/new](https://vercel.com/new) — the framework is
   detected automatically, no build settings needed.
3. Nothing to set for URLs — `siteUrl` reads Vercel's production URL at build
   time. Add `NEXT_PUBLIC_SITE_URL` if you attach a custom domain.
4. Optionally add `NEXT_PUBLIC_FORM_ENDPOINT`.

---

## Project structure

```
app/
  layout.js              Fonts, SEO metadata, JSON-LD, theme provider
  page.js                Section composition
  globals.css            Design tokens + Tailwind theme mapping
  icon.png, apple-icon.png  Favicons, from the DEV logo
  opengraph-image.js     Generated OG/Twitter card
  sitemap.js, robots.js  SEO routes

components/
  Navbar.jsx             Sticky header, DEV logo + name, scroll spy, search, mobile menu
  Hero.jsx               Profile card: photo with skills in mind
  About.jsx              01 — intro + toolkit grid
  Skills.jsx             02 — grouped skills
  Experience.jsx         03 — timeline
  Projects.jsx           04 — filterable project grid
  Education.jsx          05 — degrees
  Certifications.jsx     06 — accolades
  Contact.jsx            07 — details + validated form
  Footer.jsx             Sign-off + copyright
  providers/
    ThemeProvider.jsx    next-themes wrapper
  ui/                    Section, SectionHeading, SectionDivider, GridOverlay,
                         Reveal, Button, Badge, TechIcon, SocialLinks,
                         ProjectCard, ProjectCover, CaseStudyModal, LogoMark,
                         MindPhoto, ThemeToggle, CommandPalette, MobileNav

data/portfolio.js        ← all content
lib/                     cn(), scroll helpers, useActiveSection hook
public/                  Resume PDF + images
```

---

## Brand-colour icon hover

Icons sit neutral at rest and fade to their own brand colour on hover, with a
subtle glow and scale, over 250ms.

- Colours live as CSS variables in `app/globals.css` (`--brand-linkedin`,
  `--brand-figma`, `--brand-claude`, …), so the monochrome marks — Next.js,
  Vercel, GitHub — can flip with the theme.
- `lib/brandColors.js` maps an icon key to its variable; `brandStyle(key)`
  returns the inline style that arms it.
- An icon opts in with the `brand-icon` class. It lights up when the icon
  itself, its enclosing `<a>`/`<button>`, or an element marked `.brand-hover`
  is hovered.
- Keys without a colour fall back to `--primary`, so non-brand items like
  "Wireframing" keep the original neutral hover.

Hover scopes are explicit rather than keyed to Tailwind's `.group` — a card
`group` would otherwise fire every nested icon at once.

## Design system

Tokens are defined once in `app/globals.css` and mapped into Tailwind via
`@theme inline`, so every colour is a single variable away from changing.

| Token | Light | Dark |
| --- | --- | --- |
| `background` | `#fdfdfd` | `#0c0c0e` |
| `foreground` | `#09090b` | `#ededed` |
| `card` | `#ffffff` | `#111113` |
| `muted` | `#f5f5f5` | `#1a1a1d` |
| `muted-foreground` | `#737373` | `#a1a1aa` |
| `border` | `#e5e5e5` | `#222225` |

Type is Geist Sans with Geist Mono for labels and eyebrows, both self-hosted
via the `geist` package (no runtime font fetch).

Dark is the default theme; the navbar toggle switches it and the choice
persists in `localStorage`.

---

## Accessibility & motion

- Semantic landmarks, a skip link, and a logical heading order (one `h1`).
- Visible focus rings on every interactive element; the mobile menu and
  command palette close on `Escape` and lock background scroll.
- Every animation checks `prefers-reduced-motion` — reduced-motion visitors
  get short fades instead of movement, and smooth scrolling turns off.
- Touch targets in the mobile menu are at least 48px tall.

---

## Search

The navbar search box (desktop) opens a jump-to-section palette. Inside it:

| Keys | Action |
| --- | --- |
| `↑` `↓` | Move through results |
| `Enter` | Jump to the selected section |
| `Esc` | Close the palette or mobile menu |

---

## Keeping dependencies current

Versions are pinned to known-good ranges. To move to the latest:

```bash
npm install next@latest react@latest react-dom@latest
npm install -D tailwindcss@latest @tailwindcss/postcss@latest
```
