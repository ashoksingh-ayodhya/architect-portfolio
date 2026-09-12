# whoisashok.com

Ashok Singh's portfolio — a single-page, code-only site that demonstrates how a B2B growth system is built, rather than just describing it.

Built from the *Website Blueprint v1.0* and *Content Plan v1.0* (September 2026).

## Stack

- **HTML / CSS / JS** — no framework, no bundler, no build step.
- **GSAP 3 + ScrollTrigger** — vendored in `assets/vendor/` (pinned) for the pinned funnel, horizontal case-study gallery, and reveals.
- **Canvas 2D** — hero particle network, funnel lead particles, tool constellation, physics sim, confetti.
- **Zero images.** Every visual is generated with code. The OG image, touch icon and CV PDF are produced from SVG/HTML sources by `scripts/build-assets.mjs` — at deploy time in CI, so no binaries live in the repo.
- **Fonts** — Space Grotesk, Inter, JetBrains Mono via Google Fonts with `display=swap`.

## Structure

```
index.html            single-page site (all nine sections + case-study overlay)
styles.css            design tokens, layout, CSS animations, responsive + reduced-motion rules
js/
  main.js             entry point — wires every section
  utils.js            media queries, observers, canvas helpers
  loader.js           boot sequence (skipped on repeat visits + reduced motion)
  nav.js              nav glass, active links, mobile menu, funnel progress sidebar
  cursor.js           custom cursor (desktop, fine pointer only)
  hero.js             particle network, split-text headline, Konami game mode
  proof.js            proof-strip counters
  funnel.js           pinned, scroll-scrubbed SVG funnel + particle layer
  cases.js            horizontal gallery, mini charts, detail overlay
  constellation.js    tools data, force layout, canvas constellation, tag list
  timeline.js         origin-story timeline
  lab.js              scraper terminal + orbital sim
  contact.js          copy email, form validation/submit, confetti
  konami.js           easter-egg key listener
lab/                  standalone Physics Playground page
assets/               vendored GSAP, generated OG image / icon / CV
scripts/              cv.html (CV source) and build-assets.mjs
```

## Run locally

Any static server works (ES modules need `http://`, not `file://`):

```
npx serve .
# or
python3 -m http.server 8080
```

## Contact form

`index.html` points the form at `https://formspree.io/f/YOUR_FORM_ID`. Replace `YOUR_FORM_ID` with a real Formspree form ID. Until then the form falls back to opening the visitor's mail client with the message pre-filled.

## Generated assets (OG image, touch icon, CV PDF)

These are not committed. The deploy workflow generates them; to build them locally:

```
npm install --no-save playwright && npx playwright install chromium
node scripts/build-assets.mjs
```

Edit `scripts/cv.html` to update the CV, `assets/og-image.svg` for the social card.

## Deploy

Pushes to `main` generate the assets above and publish the repo root to GitHub Pages via `.github/workflows/deploy.yml`.

## Easter egg

↑ ↑ ↓ ↓ ← → ← → B A
