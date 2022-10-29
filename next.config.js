const withLess = require('next-with-less');

/** @type {import('next').NextConfig} */
module.exports = {
  ...withLess({
    lessLoaderOptions: {
      /* ... */
    },
  }),
  reactStrictMode: true,
  images: {
    domains: ['wa-staging.xkein.cn', 'worldaxletree.xkein.cn', 'localhost'],
  },
  experimental: {
    // appDir: true,
  },
};
