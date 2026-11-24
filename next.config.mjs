/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{
      source: "/images/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
    }];
  },
  images: {
    // Event covers come straight from the guild's Luma profile.
    remotePatterns: [{ protocol: "https", hostname: "images.lumacdn.com" }],
  },
};

export default nextConfig;
