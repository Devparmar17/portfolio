/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local assets only today. Add `remotePatterns` here if you ever host
    // project screenshots on a CDN.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
