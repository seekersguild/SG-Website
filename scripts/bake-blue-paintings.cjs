// Bake `mix-blend-mode: luminosity` of the light painting over a flat band colour, at the layer's opacity,
// into an opaque image, so the browser never blends live. W3C compositing spec: SetLum(Cb, Lum(Cs)).
// Usage: node scripts/bake-blue-paintings.cjs public/images   (band colours and opacities below must match globals.css)
const sharp = require("sharp");
const dir = process.argv[2];
const bands = { blue: { hex: "#04419c", o: 0.32 }, royal: { hex: "#053576", o: 0.22 } };
const srcs = { 1400: "paint-light-1400.webp", 2000: "paint-light-2000.webp", 3000: "paint-light-3000.webp", tall: "paint-light-tall.webp" };
const lum = (r, g, b) => 0.3 * r + 0.59 * g + 0.11 * b;
function setLum(r, g, b, l) {
  const d = l - lum(r, g, b); r += d; g += d; b += d;
  const L = lum(r, g, b), n = Math.min(r, g, b), x = Math.max(r, g, b);
  if (n < 0) { r = L + ((r - L) * L) / (L - n); g = L + ((g - L) * L) / (L - n); b = L + ((b - L) * L) / (L - n); }
  if (x > 1) { r = L + ((r - L) * (1 - L)) / (x - L); g = L + ((g - L) * (1 - L)) / (x - L); b = L + ((b - L) * (1 - L)) / (x - L); }
  return [r, g, b];
}
(async () => {
  for (const [size, file] of Object.entries(srcs)) {
    const { data, info } = await sharp(`${dir}/${file}`).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    for (const [name, { hex, o }] of Object.entries(bands)) {
      const B = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
      const out = Buffer.alloc(data.length);
      for (let i = 0; i < data.length; i += 3) {
        const m = setLum(B[0], B[1], B[2], lum(data[i] / 255, data[i + 1] / 255, data[i + 2] / 255));
        for (let k = 0; k < 3; k++) out[i + k] = Math.round((B[k] * (1 - o) + m[k] * o) * 255);
      }
      const dest = `${dir}/paint-${name}-${size}.webp`;
      await sharp(out, { raw: info }).webp({ quality: 70, effort: 6 }).toFile(dest);
      console.log(dest, info.width + "x" + info.height);
    }
  }
})();
