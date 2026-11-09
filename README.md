# Manahil Pakeeza Portfolio

A static React and Vite portfolio. Portfolio content is kept in `src/data.js`; there is no custom backend, API, database, or server-side code.

## Run locally

```bash
npm install
npm run dev
```

Create and preview a production build with:

```bash
npm run build
npm run preview
```

## Contact form setup

The form uses Formspree when an endpoint is configured. Copy `.env.example` to `.env.local` and set `VITE_FORMSPREE_ENDPOINT` to the endpoint for Manahil’s Formspree form. Vite embeds this public endpoint in the static client bundle. Without it, the form opens the visitor’s email client as a fallback. No private API key or backend is used by this project.

## Static deployment

Deploy to Vercel, Netlify, or GitHub Pages as a static Vite site:

- Build command: `npm run build`
- Output directory: `dist`
- For GitHub Pages, configure a GitHub Actions workflow to install dependencies, build, and publish `dist`.
- Add `VITE_FORMSPREE_ENDPOINT` to the hosting provider’s build environment if direct form submissions are desired.

## Verify or replace before publishing

- The supplied personal photo is `public/Manahil-Pakeeza-Profile.jpeg` and appears in the hero section. The About collage has been removed.
- Review the skill level estimates in `src/data.js` (the CV does not provide percentages).
- Add project screenshots and verified repository/demo URLs. The current cards explicitly label both placeholders.
- Verify any leadership descriptions that should be expanded from the CV.
- The supplied CV is available at `public/Manahil-Pakeeza-CV.pdf` and the Download CV buttons point to it.

## Project files

```text
public/
  favicon.svg
  MP-Logo-Nude-Red.png (nude red site logo, recolored from the supplied MP Logo.png)
  Manahil-Pakeeza-CV.pdf
  Manahil-Pakeeza-Profile.jpeg
src/
  data.js
  main.jsx
  styles.css
index.html
README.md
```
