import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");
const kitIcon = path.resolve("bensi_labs_brand_kit_v2/04_bensi_labs_icon_transparent.png");
const kitLogo = path.resolve("bensi_labs_brand_kit_v2/05_bensi_labs_logo_transparent.png");
const portraitCandidates = ["foto site.png", "foto.png"];
const portrait = portraitCandidates
  .map((file) => path.resolve(file))
  .find((file) => fs.existsSync(file));
const projectsDir = path.join(publicDir, "projects");

function kb(file) {
  return `${(fs.statSync(file).size / 1024).toFixed(1)} KB`;
}

async function toWebp(input, output, { width, quality = 78 } = {}) {
  let pipeline = sharp(input);
  if (width) pipeline = pipeline.resize({ width, withoutEnlargement: true });
  await pipeline.webp({ quality, alphaQuality: 90, effort: 6 }).toFile(output);
}

await toWebp(kitIcon, path.join(publicDir, "brand", "logo-icon.webp"), { width: 512, quality: 88 });
await toWebp(kitLogo, path.join(publicDir, "brand", "logo.webp"), { width: 640, quality: 88 });

await sharp(kitIcon).resize(32, 32).png({ compressionLevel: 9 }).toFile(path.join(publicDir, "brand", "favicon.png"));
await sharp(kitIcon).resize(180, 180).png({ compressionLevel: 9 }).toFile(path.join(publicDir, "brand", "apple-touch-icon.png"));

if (fs.existsSync(portrait)) {
  await toWebp(portrait, path.join(publicDir, "about", "gustavo-bensi.webp"), { width: 900, quality: 78 });
}

for (const slug of ["raquel-frizo", "sello-docs"]) {
  const png = path.join(projectsDir, `${slug}.png`);
  const webp = path.join(projectsDir, `${slug}.webp`);
  if (fs.existsSync(png)) {
    await toWebp(png, webp, { width: 1440, quality: 72 });
  }
}

const report = [
  "brand/logo-icon.webp",
  "brand/logo.webp",
  "brand/favicon.png",
  "brand/apple-touch-icon.png",
  "about/gustavo-bensi.webp",
  "projects/raquel-frizo.webp",
  "projects/sello-docs.webp",
];

console.log("Optimized public assets:");
for (const relative of report) {
  const file = path.join(publicDir, relative);
  if (fs.existsSync(file)) console.log(`  ${relative.padEnd(36)} ${kb(file)}`);
}
