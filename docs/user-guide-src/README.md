# Kind Sisters CMS User Guide — source

Editable source for `../Kind-Sisters-CMS-User-Guide.pdf`.

- `index.html` — the guide content and styling (Kind Sisters branded).
- `*.png` — admin screenshots + `ks-logo.png` (cover) + `gbit-logo.png` (credits page).
- `render.mjs` — regenerates the PDF.

## Rebuild the PDF
```bash
npx playwright install chromium   # first time only
node docs/user-guide-src/render.mjs
```

## Re-capture screenshots
Start the admin (`npm run dev`), then re-run the capture step (see session log
2026-07-13). Screenshots hide the Next dev indicator via injected CSS.

Author: GBIT Automation.
