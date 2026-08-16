import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, "../public/projects");

const sites = [
  {
    slug: "raquel-frizo",
    url: "https://www.raquelfrizo.com.br",
  },
  {
    slug: "sello-docs",
    url: "https://sellodocs.com.br",
  },
];

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

for (const site of sites) {
  console.log(`Capturing ${site.url}...`);
  await page.goto(site.url, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(2500);
  const png = await page.screenshot({ type: "png" });
  await sharp(png)
    .resize({ width: 1440, withoutEnlargement: true })
    .webp({ quality: 72, effort: 6 })
    .toFile(path.join(outputDir, `${site.slug}.webp`));
  console.log(`Saved ${site.slug}.webp`);
}

await browser.close();
console.log("Done.");
