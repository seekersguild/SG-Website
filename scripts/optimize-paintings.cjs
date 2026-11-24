// Derive lightweight atmospheric backgrounds; keep the authored sources intact.
// Run with: node scripts/optimize-paintings.cjs
const sharp = require("sharp");
const fs = require("node:fs/promises");
const path = require("node:path");

async function main() {
  const directory = path.join(__dirname, "../public/images");
  for (const tone of ["dark", "light"]) {
    for (const [source, width, label] of [[tone === "dark" ? 1200 : 1400, 1200, "small"], [2000, 1600, "medium"], [3000, 2400, "large"], ["tall", 1200, "portrait"]]) {
      const original = tone === "dark" && source === 3000 ? 2880 : source;
      const input = path.join(directory, `paint-${tone}-${original}.webp`);
      const output = path.join(directory, `atmosphere-${tone}-${label}.webp`);
      const buffer = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 62, effort: 6 }).toBuffer();
      await fs.writeFile(output, buffer);
      console.log(`${path.basename(output)}: ${buffer.length} bytes`);
    }
  }
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
