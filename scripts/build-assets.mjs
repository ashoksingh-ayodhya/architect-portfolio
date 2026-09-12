// Generates the code-built binary assets committed to the repo:
//   assets/og-image.png        (1200×630, from assets/og-image.svg)
//   assets/apple-touch-icon.png (180×180, from favicon.svg)
//   assets/Ashok-Singh-CV.pdf   (A4, from scripts/cv.html)
//
// Usage:  node scripts/build-assets.mjs
// Requires Playwright with Chromium available (npx playwright install chromium).

import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fileUrl = (p) => pathToFileURL(path.join(root, p)).href;

const browser = await chromium.launch();

// OG image
{
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(fileUrl('assets/og-image.svg'));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(root, 'assets/og-image.png'), type: 'png' });
  await page.close();
}

// Apple touch icon
{
  const page = await browser.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 });
  await page.setContent(`<style>html,body{margin:0;background:#0c0e12}img{display:block;width:180px;height:180px}</style><img src="${fileUrl('favicon.svg')}">`);
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(root, 'assets/apple-touch-icon.png'), type: 'png' });
  await page.close();
}

// CV PDF
{
  const page = await browser.newPage();
  await page.goto(fileUrl('scripts/cv.html'));
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: path.join(root, 'assets/Ashok-Singh-CV.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
  await page.close();
}

await browser.close();
console.log('Built assets/og-image.png, assets/apple-touch-icon.png, assets/Ashok-Singh-CV.pdf');
