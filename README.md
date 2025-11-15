# Bearblog stuff

This repo contains all the files related to my blog(s) on [Bearblog.dev](https://bearblog.dev).

## Structure

- `src/` - Source files (CSS, optional JS, HTML snippets)
  - `src/css/` - Stylesheets
  - `src/html/` - HTML snippets (e.g., head includes)
  - `src/main.js` - (Optional) Main JS entry point for bundling
- `dist/` - Built and minified assets
  - `dist/style.min.css` - Minified and bundled CSS
  - `dist/script.min.js` - Minified and bundled JavaScript (only if main.js exists)
  - `dist/html/` - HTML snippets (copied from src)

## Development

### Local build

Install dependencies:
```bash
npm install
```

Build assets (minify and bundle):
```bash
npm run build
```

Watch mode (rebuilds on changes):
```bash
npm run dev
```

### Automated builds

Assets are automatically built and minified via GitHub Actions when changes are pushed to the `main` branch. The workflow:
1. Detects changes in `src/` directory
2. Installs dependencies and runs the build
3. Commits the generated `dist/` files back to the repository

## Usage

Include the bundled assets in your Bearblog configuration:
- CSS: Link to `dist/bundle.css`
- JavaScript: Link to `dist/bundle.js` (only if you have `src/main.js`)
- HTML snippets: Use files from `dist/html/` as needed

### Adding JavaScript

Currently, the build only processes CSS. To add JavaScript bundling:

1. Create `src/main.js` (you can use `src/main.js.example` as a template)
2. Import your CSS and any JS files:
   ```javascript
   import './css/style.css';
   import './js/yourscript.js';
   ```
3. Run `npm run build`

This will generate both `dist/bundle.css` and `dist/bundle.js`
