// Smoke check for a running site: every page in the sitemap answers 200 with
// exactly one <h1>, and every internal link on those pages resolves, including
// its #section. No dependencies.
//   npm run smoke                     (checks http://localhost:3000)
//   npm run smoke -- http://localhost:3100
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const failures = [];
const pages = new Map();

const get = async (path) => {
  if (!pages.has(path)) {
    const res = await fetch(base + path, { redirect: "follow" });
    pages.set(path, { status: res.status, html: res.ok ? await res.text() : "" });
  }
  return pages.get(path);
};

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (!routes.length) failures.push("sitemap.xml lists no pages");

for (const route of routes) {
  const { status, html } = await get(route);
  if (status !== 200) { failures.push(`${route}: HTTP ${status}`); continue; }
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) failures.push(`${route}: ${h1} <h1> elements (expected 1)`);

  const links = new Set([...html.matchAll(/<a[^>]+href="([^"]+)"/g)].map((m) => m[1]).filter((h) => h.startsWith("/") || h.startsWith("#")));
  for (const href of links) {
    const url = new URL(href, base + route);
    const target = await get(url.pathname);
    if (target.status !== 200) { failures.push(`${route}: link ${href} -> HTTP ${target.status}`); continue; }
    const id = url.hash.slice(1);
    if (id && id !== "main" && !new RegExp(`id="${id}"`).test(target.html)) failures.push(`${route}: link ${href} has no #${id} on ${url.pathname}`);
  }
}

console.log(`Checked ${routes.length} pages and ${pages.size} distinct paths on ${base}`);
if (failures.length) {
  console.error(failures.map((f) => `  FAIL ${f}`).join("\n"));
  process.exit(1);
}
console.log("All pages and internal links OK");
