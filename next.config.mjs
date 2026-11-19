/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Event covers come straight from the guild's Luma profile.
    remotePatterns: [{ protocol: "https", hostname: "images.lumacdn.com" }],
  },
};

export default nextConfig;
