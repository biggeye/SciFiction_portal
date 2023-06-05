/** @type {import('next').NextConfig} */

  nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "pckovrpqrkyqinifydcs.supabase.co",
      }
    ],
  },
};
// next.config.js
module.exports = {
  serverRuntimeConfig: {
    // Increase max body size to 10MB (default is 1MB)
    maxBodySize: '4mb',
  },
};
