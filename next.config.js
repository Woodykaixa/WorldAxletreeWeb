/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['wa-staging.xkein.cn', 'worldaxletree.xkein.cn', 'localhost', 'https://www.datocms-assets.com'],
  },
  experimental: {
    // appDir: true,
  },
  productionBrowserSourceMaps: true,
};
