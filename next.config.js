const path = require("path");
const StylelintPlugin = require("stylelint-webpack-plugin");
const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");

dotenvLoad();
const withNextEnv = nextEnv();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    dirs: ["pages", "components", "context", "utils", "slices"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack(config) {
    config.plugins.push(new StylelintPlugin());
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = withNextEnv(nextConfig);
