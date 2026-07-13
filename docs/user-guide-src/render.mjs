// Rebuild the user-guide PDF from index.html. Run from the project root:
//   node docs/user-guide-src/render.mjs
// Requires Playwright's chromium (npx playwright install chromium).
import { chromium } from 'playwright'
import path from 'path'
import { fileURLToPath } from 'url'
const dir = path.dirname(fileURLToPath(import.meta.url))
const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('file://' + path.join(dir, 'index.html'), { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await page.pdf({
  path: path.join(dir, '..', 'Kind-Sisters-CMS-User-Guide.pdf'),
  format: 'A4', printBackground: true, preferCSSPageSize: true,
})
await browser.close()
console.log('PDF written to docs/Kind-Sisters-CMS-User-Guide.pdf')
