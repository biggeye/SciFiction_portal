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
        hostname: "xqdkoozsrecjixhnpoou.supabase.co",
      }
    ],
  },
};
// next.config.js
module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add the alias for the root directory
    config.resolve.alias['@'] = path.join(__dirname, '/');

    return config;
  },
  serverRuntimeConfig: {
    // Increase max body size to 10MB (default is 1MB)
    maxBodySize: '4mb',
  },
};
