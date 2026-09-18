/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * Keep the Resend SDK out of the server bundle. Bundled, it makes
   * `next build` fail while prerendering the 404 page with "<Html> should not
   * be imported outside of pages/_document"; required from node_modules at
   * runtime instead, the build is clean.
   */
  serverExternalPackages: ["resend"],
  images: {
    // Local assets only today. Add `remotePatterns` here if you ever host
    // project screenshots on a CDN.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
