import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

// A small, deterministic fibre tile. The paper colour and coffee marks stay
// in CSS; this transparent texture supplies only uneven grain and fibres.
const size = 256;
const pixels = new Uint8Array(size * size * 4);
let seed = 1819;
const random = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
const fields = [12, 48].map(n => ({ n, values: Array.from({ length: n * n }, random) }));
function sample(field, x, y) {
  const u = x / size * field.n, v = y / size * field.n;
  const a = Math.floor(u), b = Math.floor(v), tx = u - a, ty = v - b;
  const at = (i, j) => field.values[(j % field.n) * field.n + i % field.n];
  return (at(a, b) * (1 - tx) + at(a + 1, b) * tx) * (1 - ty)
    + (at(a, b + 1) * (1 - tx) + at(a + 1, b + 1) * tx) * ty;
}
for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
  const i = (y * size + x) * 4;
  pixels.set([95, 81, 62, Math.round(2 + sample(fields[0], x, y) * 5 + sample(fields[1], x, y) * 5 + random() * 15)], i);
}
for (let fibre = 0; fibre < 1000; fibre++) {
  const x = random() * size, y = random() * size;
  const angle = random() * Math.PI * 2, length = 2 + random() * 16;
  const light = random() > .45;
  for (let t = 0; t < length; t += .5) {
    const px = (Math.round(x + Math.cos(angle) * t) + size) % size;
    const py = (Math.round(y + Math.sin(angle) * t + Math.sin(t / 4) * .6) + size) % size;
    const i = (py * size + px) * 4;
    const alpha = Math.round((light ? 48 : 25) * Math.sin(Math.PI * t / length));
    if (alpha > pixels[i + 3]) pixels.set(light ? [255, 255, 248, alpha] : [95, 81, 62, alpha], i);
  }
}
await mkdir('public/images', { recursive: true });
const result = await sharp(pixels, { raw: { width: size, height: size, channels: 4 } })
  .webp({ quality: 75, alphaQuality: 70, effort: 6 })
  .toFile('public/images/ticket-paper-fibres.webp');
console.log(`Paper texture: ${result.size} bytes`);
