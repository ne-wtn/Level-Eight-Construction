# Level Eight — construction company website

Marketing site for **Level Eight**, a Tanzanian construction firm.
React 19 + Vite + Tailwind CSS v4, client-side routed with React Router.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build
```

---

## Before this goes live

Everything below is a placeholder. Nothing else in the site is invented — all
other copy comes from Level Eight's own material.

| What | Where | Notes |
|---|---|---|
| **Contact details** | `src/data/site.js` → `site.contact` | Email, phone and address are dummies. The Contact page prints a visible "placeholder" note that disappears once you set `isPlaceholder: false`. |
| **Social links** | `src/data/site.js` → `site.socials` | All three point at `#`. |
| **Photography** | `src/data/images.js` | Curated Unsplash stand-ins. See below. |
| **Project names** | `src/data/projects.js` | Level Eight has not published named case studies, so nothing was invented — entries are built from the captions the company uses for its own site photography. Replace with real projects (client, location, year) when available. |
| **Testimonials** | `src/data/testimonials.js` | Level Eight publishes these flagged as placeholders, so the site carries that disclaimer. **Remove `testimonialsDisclaimer` only when the quotes are real and attributable.** |
| **Contact form endpoint** | `.env.local` | See "Contact form" below. |

There are deliberately **no headline statistics** ("500+ projects", "2M+ sq ft").
Level Eight has not published any, so the hero carries its three real
commitments instead of invented numbers.

### Swapping in real photography

Every image is referenced from `src/data/images.js` — no component hardcodes a
URL. Each entry pairs an id with its `alt` text, so the description follows the
image everywhere it is used.

To move to self-hosted assets, drop files into `public/images/` and change the
`src()` / `srcSet()` helpers at the top of that file. No component changes.

### Contact form

`src/features/contact/ContactForm.jsx` POSTs JSON to `VITE_CONTACT_ENDPOINT`.

With the variable **unset** (the default) the form validates fully and resolves
a simulated success, logging the payload to the console — so the site is
demoable with no backend. Set the variable in `.env.local` to send for real; it
works with Formspree, Web3Forms, a Netlify function, or your own API. See
`.env.example`.

---

## How it is put together

```
src/
├── data/          every string and image in the site — the only place to edit copy
├── components/
│   ├── layout/    Header (+ mobile drawer), Footer, scroll management
│   ├── ui/        Button, NotchCard, Photo, Accordion, Lightbox, Reveal, Section
│   └── sections/  composed page sections, reused across routes
├── features/
│   ├── projects/  filterable gallery
│   └── contact/   validated form
├── pages/         Home, About, Services, Projects, Contact, NotFound
└── styles/        design tokens (@theme), base layer, custom utilities
```

**Content is separated from presentation.** Changing the site's words means
editing `src/data/` — no JSX involved.

### Design system

Tailwind v4, configured in CSS (`src/styles/index.css`) via `@theme` — there is
no `tailwind.config.js`.

- **Palette** — warm concrete (`paper`, `surface`) against near-black `ink`,
  with safety-orange `accent`. Deliberately not pure black and white.
- **Type** — two families only: Archivo (display, set on its width axis) and
  Instrument Sans (body). Small labels, figures and step numbers are Archivo at
  weight 600, uppercase and tracked out — the `label` utility. Both self-hosted
  through `@fontsource`, so there is no external font request.
- **`notch-host` / `notch-action`** — the signature notched card. The arrow tile
  wears a thick ring of the *surrounding* colour, which reads as a bite cut out
  of the corner. Any card using it must pass `--notch-bg` matching the section
  behind it.
- **`blueprint`, `grain`** — the drawing-sheet grid and film-grain textures.

A note on the project gallery: tile counts are chosen so the grid packs with no
holes (15 projects = one 2×2 hero tile plus 14 uniform tiles; each category is a
multiple of three). Adding or removing projects can leave a gap — see the
comment in `src/features/projects/ProjectGallery.jsx`.

### Accessibility

Semantic landmarks and one `<h1>` per page; a skip link; visible focus rings;
keyboard-operable accordion, gallery filter and lightbox (Esc to close, arrows
to step, focus returned to the trigger); `aria-invalid` / `aria-describedby`
wiring on form errors; and `prefers-reduced-motion` suppressing all animation.

---

## Deployment

Static build. `dist/` can be served from anywhere, but because routing is
client-side, **the host must rewrite unknown paths to `index.html`** or a hard
refresh on `/projects` will 404. Configs for the common hosts are included:
`public/_redirects` (Netlify, Cloudflare Pages) and `vercel.json` (Vercel).

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 20.19+ or 22.12+ (pinned to 22 in `.node-version`) |

Two things that trip up a first deploy:

- **Output directory must be `dist`.** Pick a build preset that targets Vite. A
  generic "React" preset usually assumes Create React App and prefills `build`,
  which fails here.
- **Node version.** Vite 8 requires `^20.19.0 || >=22.12.0`. Hosts that still
  default to Node 18 will fail at install. `.node-version` pins this for
  Cloudflare Pages and Netlify; on Vercel set the Node version in project
  settings.

`VITE_CONTACT_ENDPOINT` must be set as an environment variable on the host if
the contact form should actually send (see "Contact form" above). Without it the
deployed form still validates and reports success, but nothing is delivered.

### Known advisory

`npm audit` reports a high-severity React Router advisory
(GHSA-qwww-vcr4-c8h2). It applies to **RSC mode** — server-side React Server
Components with server actions. This app is purely client-rendered with no
server actions, so the vulnerable path is not reachable. It was left unpatched
rather than pinning to an older router; re-evaluate if this ever moves to SSR.
