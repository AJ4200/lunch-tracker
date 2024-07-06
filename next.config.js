/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  // other options
});

const nextConfig = {
  // your existing Next.js configuration
};

module.exports = withPWA(nextConfig);
    