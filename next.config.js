/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ["pages/", "components/", "src/", "utils/"],
  },
};

module.exports = nextConfig;
