// Bake the authored ring vectors once, so continuous rotation only moves images.
// Usage: node scripts/bake-compass-rings.cjs
// Requires a local Chrome/Edge installation, or CHROME_PATH. No browser ships to visitors.
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { spawnSync } = require("node:child_process");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..");
const candidates = [
  process.env.CHROME_PATH,
  path.join(process.env.PROGRAMFILES || "C:/Program Files", "Google/Chrome/Application/chrome.exe"),
  path.join(process.env["PROGRAMFILES(X86)"] || "C:/Program Files (x86)", "Microsoft/Edge/Application/msedge.exe"),
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser",
].filter(Boolean);
const chrome = candidates.find((candidate) => fs.existsSync(candidate));
if (!chrome) throw new Error("Set CHROME_PATH to a local Chrome or Edge executable.");

const scratchRoot = path.join(root, ".taste-skill");
fs.mkdirSync(scratchRoot, { recursive: true });
const scratch = fs.mkdtempSync(path.join(scratchRoot, "compass-bake-"));
const css = fs.readFileSync(path.join(root, "app/globals.css"), "utf8");
const font = fs.readFileSync(path.join(root, "public/fonts/Cinzel-latin.woff2")).toString("base64");
const output = path.join(root, "public/images");

(async () => {
  try {
    for (const name of ["bezel", "scan"]) {
      const svg = fs.readFileSync(path.join(__dirname, `assets/compass-${name}.svg`), "utf8");
      const html = path.join(scratch, `${name}.html`);
      const png = path.join(scratch, `${name}.png`);
      fs.writeFileSync(html, `<!doctype html><html><head><meta charset="utf-8"><style>${css}
        @font-face { font-family: GuildBake; src: url(data:font/woff2;base64,${font}) format('woff2'); font-weight: 400 900; }
        :root { --font-cinzel: GuildBake; }
        html, body { margin: 0; background: transparent !important; overflow: hidden; }
        *, *::before, *::after { animation: none !important; transition: none !important; }
        .mc-layer { position: relative; inset: auto; width: 1800px; height: 1800px; transform: none !important; will-change: auto !important; }
      </style></head><body><div class="mc-layer">${svg}</div></body></html>`);
      const rendered = spawnSync(chrome, [
        "--headless=new", "--no-first-run", "--no-default-browser-check",
        "--disable-background-networking", "--hide-scrollbars", "--force-device-scale-factor=1",
        "--default-background-color=00000000", "--window-size=2000,2000", "--virtual-time-budget=2000",
        `--user-data-dir=${path.join(scratch, `profile-${name}`)}`, `--screenshot=${png}`, pathToFileURL(html).href,
      ], { windowsHide: true, timeout: 30000, encoding: "utf8" });
      if (rendered.status !== 0 || !fs.existsSync(png)) throw new Error(`Could not render ${name}: ${rendered.stderr}`);
      const original = await sharp(png).extract({ left: 0, top: 0, width: 1800, height: 1800 }).png().toBuffer();
      for (const size of [600, 1200, 1800]) {
        const destination = path.join(output, `compass-${name}-${size}.webp`);
        // The artwork uses flat colours. A small RGBA palette keeps its edges
        // transparent without storing screenshot noise in nearly invisible pixels.
        const palette = await sharp(original).resize(size, size).png({ palette: true, colours: 128, dither: 0 }).toBuffer();
        await sharp(palette).webp({ lossless: true, effort: 6 }).toFile(destination);
        console.log(path.relative(root, destination), fs.statSync(destination).size, "bytes");
      }
    }
  } finally {
    // Resolve and verify this task's own scratch directory before recursive cleanup.
    const resolved = fs.realpathSync(scratch);
    if (path.dirname(resolved) !== fs.realpathSync(scratchRoot) || !path.basename(resolved).startsWith("compass-bake-")) {
      throw new Error("Refusing to clean an unexpected scratch path.");
    }
    fs.rmSync(resolved, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
