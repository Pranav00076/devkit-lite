# portslug website

Promotional site for the [portslug](https://www.npmjs.com/package/portslug) npm package,
built with React + Vite in the dark developer-tool aesthetic.

The playground imports the **real** `slugify` implementation from `../src/slugify.js`,
so what you try in the browser is exactly what the package ships.

## Run

```bash
cd website
npm install
npm run dev      # dev server
npm run build    # production build to dist/
npm run preview  # serve the production build
```

## Structure

- `src/components/` — one file per page section (Navbar, Hero, Comparison, Features, HowItWorks, Playground, Docs, DevExperience, FinalCTA, Footer)
- `src/lib/highlight.js` — tiny static JS syntax highlighter for the code snippets
- `src/styles.css` — single stylesheet; dark theme tokens in `:root`

The package source (`../src`, `../types`) is never modified by the site.
