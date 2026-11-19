/* The public address of the site, used for share previews, the sitemap and
   robots.txt. Set NEXT_PUBLIC_SITE_URL (e.g. https://seekersguild.example)
   in the hosting environment. On Vercel the production domain is picked up
   automatically; locally it falls back to localhost. */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/$/, "");
