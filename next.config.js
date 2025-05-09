/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.pexels.com'], // Allow images from Pexels
    formats: ['image/webp'],
  },
  webpack: (config) => {
    // Disable webpack caching to prevent file system errors
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;