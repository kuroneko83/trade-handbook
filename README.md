# Trade Handbook

Trilingual (Português / English / 日本語) trade guide for importing agricultural products from Brazil to Japan.

Currently covers **soybeans**. The architecture supports expansion to other products (coffee, beef, chicken, corn, fruits, etc.).

## Live Site

https://kuroneko83.github.io/trade-handbook/

## Architecture

```
trade-handbook/
├── index.html          # Single-page app — all content in HTML, one section per product
├── css/
│   └── style.css       # Responsive design system (light/dark, mobile, cards, tables)
├── js/
│   ├── i18n.js         # Translation dictionary: { pt: {}, en: {}, ja: {} }
│   └── app.js          # Language switcher, sidebar toggle, scroll-spy TOC
├── assets/
│   └── *.pdf           # Verified guide PDFs (one per product)
└── README.md
```

## Content Architecture

- **HTML**: Each section in `index.html` represents a phase of the import process. Each product gets its own set of sections (phases).
- **i18n keys**: Every translatable element has a `data-i18n="key"` attribute. The `I18N` object in `i18n.js` maps keys to translations in PT, EN, and JA.
- **Language switching**: `app.js` reads `I18N[lang][key]` and sets `innerHTML`, preserving `<strong>`, `<br>`, `<small>`, `<a>` tags inside translations.

## How to Add a New Product

1. **Add HTML sections** in `index.html` — copy an existing product's sections (e.g. #fase1–#fase7) and update the content with that product's specific regulations. Use unique IDs (e.g. `#coffee-fase1`).

2. **Add TOC links** in the sidebar `<ul class="toc">`.

3. **Add translations** in `js/i18n.js` — add the new keys under all three languages (`pt`, `en`, `ja`).

4. **Add a PDF** to `assets/`.

5. **Update the flowchart** and risk section if the new product has a different process.

## i18n Key Naming Convention

| Prefix | Scope |
|--------|-------|
| `toc.*` | Sidebar table of contents |
| `hero.*` | Hero section |
| `s1.*`, `s2.*`... | Product phases (shared across products; use product-specific prefixes for new products) |
| `flow.*` | Flowchart steps |
| `laws.*` | Laws table |
| `sched.*` | Timeline table |
| `risk.*` | Risk cards |
| `src.*` | Sources grid |
| `footer.*` | Footer |

For multi-product projects, extend with product prefixes: `soja.*`, `cafe.*`, `carne.*`, etc.

## Style Guide

- **Font**: Inter (Google Fonts), JetBrains Mono for code/URLs
- **Colors**: Defined as CSS variables in `:root` — light/dark via `[data-theme="dark"]`
- **Cards**: `<div class="card">` — white rounded box with shadow; `.highlight` variant for emphasis
- **Callouts**: `<div class="callout warn">` — yellow warning box
- **Tables**: Wrap in `<div class="table-wrap">` for horizontal scroll on mobile
- **Flowchart**: `.flowchart` with `.flow-step` (colored by class: `.blue`, `.green`, `.purple`, etc.)
- **Risks**: `.risk-list` with `.risk-item` (`.high`, `.medium`, `.low`)
- **Sources**: `.sources-grid` with `.source-card` links

## Deployment

Hosted on GitHub Pages — push to `main`, and it's live at `https://<user>.github.io/<repo>/`.

## License

Educational reference only. Verify all data against official sources before real transactions.
