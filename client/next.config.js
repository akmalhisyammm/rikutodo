/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['src'],
  },
});
